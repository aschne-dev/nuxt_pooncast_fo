import { getApp, getApps, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { SITE_URL, slugify, toIsoDate } from "~/utils/content";

const staticRoutes = [
  "/",
  "/pooncast/episodes",
  "/poonblog",
  "/participez-au-pooncast",
  "/inscrivez-vous-au-pooncast",
  "/legal",
  "/legal/politique-confidentialite",
  "/legal/termes-et-conditions",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event).public;

  if (!config.firebaseProjectId || !config.firebaseApiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: "Service Unavailable",
      message: "Sitemap temporairement indisponible",
    });
  }

  const appName = "pooncast-sitemap";
  const app = getApps().some((candidate) => candidate.name === appName)
    ? getApp(appName)
    : initializeApp(
        {
          apiKey: config.firebaseApiKey,
          authDomain: config.firebaseAuthDomain,
          projectId: config.firebaseProjectId,
          appId: config.firebaseAppId,
        },
        appName,
      );
  const firestore = getFirestore(app);
  let episodesSnapshot;
  let blogsSnapshot;

  try {
    [episodesSnapshot, blogsSnapshot] = await Promise.all([
      getDocs(collection(firestore, "pooncasts")),
      getDocs(collection(firestore, "blogs")),
    ]);
  } catch (error) {
    console.error("Sitemap Firestore query failed", error);
    throw createError({
      statusCode: 503,
      statusMessage: "Service Unavailable",
      message: "Sitemap temporairement indisponible",
    });
  }

  const routes = [
    ...staticRoutes.map((path) => ({ path, lastmod: null })),
    ...episodesSnapshot.docs.map((document) => {
      const episode = document.data();
      return {
        path: `/pooncast/${slugify(episode.titre)}/${document.id}`,
        lastmod: toIsoDate(episode.createdAt),
      };
    }),
    ...blogsSnapshot.docs.map((document) => {
      const blog = document.data();
      return {
        path: `/poonblog/${slugify(blog.title)}/${document.id}`,
        lastmod: toIsoDate(blog.updatedAt || blog.createdAt),
      };
    }),
  ];

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  setHeader(event, "cache-control", "public, s-maxage=3600, stale-while-revalidate=86400");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map(({ path, lastmod }) => [
      "  <url>",
      `    <loc>${escapeXml(new URL(path, SITE_URL).toString())}</loc>`,
      ...(lastmod ? [`    <lastmod>${escapeXml(lastmod)}</lastmod>`] : []),
      "  </url>",
    ].join("\n")),
    "</urlset>",
  ].join("\n");
});
