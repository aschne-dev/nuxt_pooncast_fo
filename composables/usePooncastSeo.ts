import type { MaybeRefOrGetter } from "vue";
import { DEFAULT_SOCIAL_IMAGE, SITE_URL } from "~/utils/content";

interface PooncastSeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
  publishedTime?: string | null;
  modifiedTime?: string | null;
}

export function usePooncastSeo(options: MaybeRefOrGetter<PooncastSeoOptions>) {
  const config = useRuntimeConfig();
  const seo = computed(() => toValue(options));
  const canonical = computed(() => new URL(seo.value.path, SITE_URL).toString());
  const image = computed(() => seo.value.image || DEFAULT_SOCIAL_IMAGE);
  const defaultRobots = computed(() =>
    config.public.stagingNoIndex ? "noindex, nofollow" : "index, follow",
  );

  useSeoMeta({
    title: () => seo.value.title,
    description: () => seo.value.description,
    robots: () => seo.value.robots || defaultRobots.value,
    ogTitle: () => seo.value.title,
    ogDescription: () => seo.value.description,
    ogImage: () => image.value,
    ogUrl: () => canonical.value,
    ogType: () => seo.value.type || "website",
    ogSiteName: "Le Pooncast",
    ogLocale: "fr_FR",
    articlePublishedTime: () => seo.value.publishedTime || undefined,
    articleModifiedTime: () => seo.value.modifiedTime || undefined,
    twitterCard: "summary_large_image",
    twitterTitle: () => seo.value.title,
    twitterDescription: () => seo.value.description,
    twitterImage: () => image.value,
  });

  useHead(() => ({
    link: [{ rel: "canonical", href: canonical.value }],
  }));

  return { canonical };
}
