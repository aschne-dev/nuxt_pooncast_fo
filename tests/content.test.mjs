import test from "node:test";
import assert from "node:assert/strict";
import {
  createFaqSchema,
  formatFrenchDate,
  getMetaDescription,
  getSeoTitle,
  hasEpisodeSeoContent,
  normalizeContentDocument,
  normalizeEpisodeSeoContent,
  normalizeFaq,
  resolveRelatedContent,
  serializeJsonLd,
  slugify,
  stripHtml,
  truncateDescription,
} from "../utils/content.js";
import { sanitizeBlogHtml } from "../utils/sanitize-blog-html.js";

test("slugify produit des slugs stables pour les titres français", () => {
  assert.equal(
    slugify("Pourquoi l’œuf éclot-il en été ?"),
    "pourquoi-l-oeuf-eclot-il-en-ete",
  );
  assert.equal(slugify("L’æschne et la forêt"), "l-aeschne-et-la-foret");
});

test("les descriptions HTML deviennent du texte court", () => {
  assert.equal(stripHtml("<p>Une histoire &amp; une réponse</p>"), "Une histoire & une réponse");
  assert.ok(truncateDescription("mot ".repeat(80)).length <= 160);
});

test("les champs SEO explicites ont un fallback rétrocompatible", () => {
  const oldArticle = { title: "Titre historique", intro: "Introduction historique" };
  const enrichedArticle = {
    ...oldArticle,
    seoTitle: "Titre SEO distinct",
    metaDescription: "Description SEO distincte",
  };

  assert.equal(getSeoTitle(oldArticle, `${oldArticle.title} - Le PoonBlog`), "Titre historique - Le PoonBlog");
  assert.equal(getMetaDescription(oldArticle, oldArticle.intro), "Introduction historique");
  assert.equal(getSeoTitle(enrichedArticle, oldArticle.title), "Titre SEO distinct");
  assert.equal(getMetaDescription(enrichedArticle, oldArticle.intro), "Description SEO distincte");
});

test("un ancien épisode n’active aucun bloc éditorial supplémentaire", () => {
  assert.equal(hasEpisodeSeoContent(undefined), false);
  assert.deepEqual(normalizeEpisodeSeoContent(undefined), {
    shortAnswer: "",
    sections: [],
    keyFacts: [],
    activity: { title: "", content: "" },
  });
  assert.equal(hasEpisodeSeoContent({ shortAnswer: "Une réponse SSR" }), true);
});

test("FAQPage existe uniquement pour une FAQ complète et visible", () => {
  const pageUrl = "https://lepooncast.com/poonblog/test/id";
  assert.equal(createFaqSchema([], pageUrl), null);
  assert.deepEqual(normalizeFaq([{ question: "Incomplète", answer: "" }]), []);

  const schema = createFaqSchema([{ question: " Pourquoi ? ", answer: " Parce que. " }], pageUrl);
  assert.equal(schema['@type'], "FAQPage");
  assert.equal(schema.mainEntity[0].name, "Pourquoi ?");
  assert.equal(schema.mainEntity[0].acceptedAnswer.text, "Parce que.");
});

test("les contenus associés résolvent des URLs fondées sur les titres historiques", () => {
  const links = resolveRelatedContent(
    [
      { type: "blog", id: "article-1" },
      { type: "pooncast", id: "episode_1" },
      { type: "blog", id: "absent" },
    ],
    [{ id: "article-1", title: "Titre historique de l’article", seoTitle: "Autre titre SEO" }],
    [{ id: "episode_1", titre: "Titre historique de l’épisode", seoTitle: "Autre titre SEO" }],
  );

  assert.deepEqual(links.map(({ path }) => path), [
    "/poonblog/titre-historique-de-l-article/article-1",
    "/pooncast/titre-historique-de-l-episode/episode_1",
  ]);
});

test("les timestamps Firestore sont sérialisés pour Pinia", () => {
  const document = normalizeContentDocument({
    title: "Exemple",
    createdAt: { toDate: () => new Date("2026-01-02T03:04:05.000Z") },
    updatedAt: { toDate: () => new Date("2026-01-03T03:04:05.000Z") },
  });

  assert.deepEqual(document, {
    title: "Exemple",
    createdAt: "2026-01-02T03:04:05.000Z",
    updatedAt: "2026-01-03T03:04:05.000Z",
  });
});

test("les dates éditoriales sont stables en heure de Paris", () => {
  assert.equal(formatFrenchDate("2026-01-02T23:30:00.000Z"), "03/01/2026");
  assert.equal(formatFrenchDate("date-invalide"), "");
});

test("le JSON-LD ne peut pas fermer sa balise script", () => {
  const json = serializeJsonLd({ title: "</script><script>alert(1)</script>" });

  assert.equal(json.includes("</script>"), false);
  assert.deepEqual(JSON.parse(json), {
    title: "</script><script>alert(1)</script>",
  });
});

test("le HTML riche du blog supprime les balises et attributs dangereux", () => {
  assert.equal(sanitizeBlogHtml("<script>alert(1)</script>"), "");
  assert.equal(sanitizeBlogHtml("<img src=x onerror=alert(1)>"), "");
  assert.equal(
    sanitizeBlogHtml('<a href="javascript:alert(1)">test</a>'),
    "<a>test</a>",
  );
  assert.equal(
    sanitizeBlogHtml('<p class="danger" style="color:red" onclick="alert(1)">Texte</p>'),
    "<p>Texte</p>",
  );
  assert.equal(sanitizeBlogHtml("<svg><script>alert(1)</script></svg>"), "");
});

test("le HTML riche du blog conserve l’éditorial autorisé et sécurise les liens", () => {
  assert.equal(
    sanitizeBlogHtml('<a href="https://example.com" target="_blank">test</a>'),
    '<a href="https://example.com" target="_blank" rel="noopener noreferrer">test</a>',
  );
  assert.equal(
    sanitizeBlogHtml('<a href="http://example.com">HTTP</a><a href="mailto:test@example.com">Mail</a>'),
    '<a href="http://example.com">HTTP</a><a href="mailto:test@example.com">Mail</a>',
  );
  assert.equal(
    sanitizeBlogHtml("<p><strong>Texte valide</strong></p>"),
    "<p><strong>Texte valide</strong></p>",
  );
});
