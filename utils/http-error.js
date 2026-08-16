export function getPublicErrorContent(statusCode) {
  if (Number(statusCode) === 503) {
    return {
      heading: "Le contenu est temporairement indisponible.",
      title: "Contenu temporairement indisponible - Le Pooncast",
      description: "Le contenu demandé est temporairement indisponible. Veuillez réessayer plus tard.",
    };
  }

  return {
    heading: "Page introuvable",
    title: "Page introuvable - Le Pooncast",
    description: "Cette page du Pooncast n’existe pas ou a été déplacée.",
  };
}
