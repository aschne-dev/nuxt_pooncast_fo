import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("les chapitres d’article sont de vrais H2 et la date est sémantique", async () => {
  const source = await readSource("components/Blog/BlogDetail.vue");

  assert.match(source, /<h2[^>]*>\{\{ chapter\.name \}\}<\/h2>/);
  assert.match(source, /<time v-if="blog\.createdAt" :datetime="blog\.createdAt"/);
  assert.doesNotMatch(source, /<h2[^>]*>Sommaire<\/h2>/);
});

test("une page article charge les articles connexes pendant le SSR", async () => {
  const source = await readSource("pages/poonblog/[slugTitle]/[id].vue");

  assert.match(source, /await callOnce\('blogs', \(\) => blogStore\.fetchBlogs\(\)\)/);
});

test("les liens internes du listing PoonBlog utilisent la version canonique sans slash final", async () => {
  const sources = await Promise.all([
    readSource("components/Blog/BlogDetail.vue"),
    readSource("components/Home/IntroBlog.vue"),
    readSource("pages/poonblog/[slugTitle]/[id].vue"),
  ]);

  for (const source of sources) {
    assert.doesNotMatch(source, /to="\/poonblog\/"/);
  }
});

test("la page épisode renvoie vers le catalogue sans dupliquer son titre en H3", async () => {
  const [pageSource, cardSource] = await Promise.all([
    readSource("pages/pooncast/[slugTitle]/[id].vue"),
    readSource("components/Pooncast/Pooncast.vue"),
  ]);

  assert.match(pageSource, /to="\/pooncast\/episodes"/);
  assert.match(cardSource, /<h3 v-if="showDetailLink"/);
  assert.match(cardSource, /:aria-labelledby="showDetailLink \?/);
});

test("le staging reste noindex dans les métadonnées, les en-têtes et robots.txt", async () => {
  const [seoSource, middlewareSource, robotsSource] = await Promise.all([
    readSource("composables/usePooncastSeo.ts"),
    readSource("server/middleware/staging-noindex.ts"),
    readSource("scripts/write-robots.mjs"),
  ]);

  assert.match(seoSource, /config\.public\.stagingNoIndex \? "noindex, nofollow" : "index, follow"/);
  assert.match(middlewareSource, /setHeader\(event, "x-robots-tag", "noindex, nofollow"\)/);
  assert.match(robotsSource, /"User-agent: \*\\nDisallow: \/\\n"/);
});
