export const SITE_URL = "https://lepooncast.com";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/logo_og.jpeg`;

export function slugify(value = "") {
  return value
    .trim()
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stripHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateDescription(value = "", maxLength = 160) {
  const text = stripHtml(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, "")}…`;
}

export function toIsoDate(value) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  return null;
}

export function normalizeContentDocument(document) {
  const normalizedDocument = { ...document };

  for (const field of ["createdAt", "updatedAt"]) {
    const isoDate = toIsoDate(document[field]);

    if (isoDate) {
      normalizedDocument[field] = isoDate;
    }
  }

  return normalizedDocument;
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function formatFrenchDate(value) {
  const isoDate = toIsoDate(value);

  if (!isoDate) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(isoDate));
}
