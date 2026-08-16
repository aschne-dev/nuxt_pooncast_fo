import test from "node:test";
import assert from "node:assert/strict";
import {
  fetchBlogDocumentById,
  fetchPooncastDocumentById,
} from "../utils/firestore-content.js";

function createFirestoreMock(documents) {
  const reads = [];
  const firestoreApi = {
    doc: (_firestore, collectionName, id) => ({ collectionName, id }),
    getDoc: async (reference) => {
      reads.push(`${reference.collectionName}/${reference.id}`);
      const data = documents[`${reference.collectionName}/${reference.id}`];

      return {
        id: reference.id,
        exists: () => Boolean(data),
        data: () => data,
      };
    },
  };

  return { firestoreApi, reads };
}

test("un article est recherché par son ID avec une seule lecture", async () => {
  const { firestoreApi, reads } = createFirestoreMock({
    "blogs/article-1": { title: "Article" },
  });

  const article = await fetchBlogDocumentById({}, "article-1", firestoreApi);

  assert.deepEqual(article, { id: "article-1", title: "Article" });
  assert.deepEqual(reads, ["blogs/article-1"]);
});

test("un épisode et son libellé de saison nécessitent deux lectures directes", async () => {
  const { firestoreApi, reads } = createFirestoreMock({
    "pooncasts/episode-1": { titre: "Épisode", saison: 5 },
    "seasons/5": { title: "Les animaux" },
  });

  const episode = await fetchPooncastDocumentById({}, "episode-1", firestoreApi);

  assert.deepEqual(episode, {
    id: "episode-1",
    titre: "Épisode",
    saison: 5,
    seasonName: "Les animaux",
  });
  assert.deepEqual(reads, ["pooncasts/episode-1", "seasons/5"]);
});

test("un document absent reste une absence et non une erreur backend", async () => {
  const { firestoreApi, reads } = createFirestoreMock({});

  assert.equal(await fetchBlogDocumentById({}, "absent", firestoreApi), null);
  assert.equal(await fetchPooncastDocumentById({}, "absent", firestoreApi), null);
  assert.deepEqual(reads, ["blogs/absent", "pooncasts/absent"]);
});

test("une erreur Firestore est propagée pour permettre une réponse 503", async () => {
  const firestoreApi = {
    doc: () => ({}),
    getDoc: async () => {
      throw new Error("backend unavailable");
    },
  };

  await assert.rejects(
    fetchBlogDocumentById({}, "article-1", firestoreApi),
    /backend unavailable/,
  );
});
