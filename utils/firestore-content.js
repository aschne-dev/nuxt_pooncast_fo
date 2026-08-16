import { doc, getDoc } from "firebase/firestore/lite";
import { normalizeContentDocument } from "./content.js";

export async function fetchDocumentById(
  firestore,
  collectionName,
  id,
  firestoreApi = { doc, getDoc },
) {
  const reference = firestoreApi.doc(firestore, collectionName, String(id));
  const snapshot = await firestoreApi.getDoc(reference);

  if (!snapshot.exists()) {
    return null;
  }

  return normalizeContentDocument({ ...snapshot.data(), id: snapshot.id });
}

export function fetchBlogDocumentById(firestore, id, firestoreApi) {
  return fetchDocumentById(firestore, "blogs", id, firestoreApi);
}

export async function fetchPooncastDocumentById(firestore, id, firestoreApi) {
  const episode = await fetchDocumentById(firestore, "pooncasts", id, firestoreApi);

  if (!episode) {
    return null;
  }

  const season = await fetchDocumentById(
    firestore,
    "seasons",
    episode.saison,
    firestoreApi,
  );

  return {
    ...episode,
    seasonName: season?.title || `Saison ${episode.saison}`,
  };
}
