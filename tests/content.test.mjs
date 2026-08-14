import test from "node:test";
import assert from "node:assert/strict";
import {
  formatFrenchDate,
  normalizeContentDocument,
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
