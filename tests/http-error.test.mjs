import test from "node:test";
import assert from "node:assert/strict";
import { getPublicErrorContent } from "../utils/http-error.js";

test("une 404 affiche un message de contenu introuvable", () => {
  assert.deepEqual(getPublicErrorContent(404), {
    heading: "Page introuvable",
    title: "Page introuvable - Le Pooncast",
    description: "Cette page du Pooncast n’existe pas ou a été déplacée.",
  });
});

test("une 503 affiche un message temporaire sans détail backend", () => {
  const content = getPublicErrorContent(503);

  assert.equal(content.heading, "Le contenu est temporairement indisponible.");
  assert.equal(JSON.stringify(content).includes("Firestore"), false);
  assert.equal(JSON.stringify(content).includes("stack"), false);
});
