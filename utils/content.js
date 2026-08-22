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

function cleanPlainText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeFaq(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => ({
      question: cleanPlainText(item?.question),
      answer: cleanPlainText(item?.answer),
    }))
    .filter((item) => item.question && item.answer)
    .slice(0, 50);
}

export function normalizeRelatedContent(value) {
  if (!Array.isArray(value)) return [];

  const seen = new Set();

  return value
    .map((item) => ({
      type: item?.type === "blog" || item?.type === "pooncast" ? item.type : "",
      id: cleanPlainText(item?.id),
    }))
    .filter((item) => {
      if (!item.type || !/^[A-Za-z0-9_-]{1,256}$/.test(item.id)) return false;
      const key = `${item.type}:${item.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 20);
}

export function normalizeEpisodeSeoContent(value) {
  const activity = value?.activity || {};

  return {
    shortAnswer: cleanPlainText(value?.shortAnswer),
    sections: Array.isArray(value?.sections)
      ? value.sections
          .map((section) => ({
            title: cleanPlainText(section?.title),
            content: cleanPlainText(section?.content),
          }))
          .filter((section) => section.title && section.content)
          .slice(0, 50)
      : [],
    keyFacts: Array.isArray(value?.keyFacts)
      ? value.keyFacts.map(cleanPlainText).filter(Boolean).slice(0, 50)
      : [],
    activity: {
      title: cleanPlainText(activity.title),
      content: cleanPlainText(activity.content),
    },
  };
}

export function hasEpisodeSeoContent(value) {
  const content = normalizeEpisodeSeoContent(value);
  return Boolean(
    content.shortAnswer ||
    content.sections.length ||
    content.keyFacts.length ||
    (content.activity.title && content.activity.content)
  );
}

export function getSeoTitle(document, legacyTitle) {
  return cleanPlainText(document?.seoTitle) || legacyTitle;
}

export function getMetaDescription(document, legacyDescription, maxLength = 160) {
  const explicitDescription = cleanPlainText(document?.metaDescription);
  return explicitDescription || truncateDescription(legacyDescription, maxLength);
}

export function createFaqSchema(value, pageUrl) {
  const faq = normalizeFaq(value);
  if (faq.length === 0) return null;

  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function resolveRelatedContent(value, blogs = [], pooncasts = []) {
  return normalizeRelatedContent(value).flatMap((item) => {
    if (item.type === 'blog') {
      const blog = blogs.find((candidate) => candidate.id === item.id);
      return blog
        ? [{ ...item, label: blog.title, path: `/poonblog/${slugify(blog.title)}/${blog.id}` }]
        : [];
    }

    const pooncast = pooncasts.find((candidate) => candidate.id === item.id);
    return pooncast
      ? [{ ...item, label: pooncast.titre, path: `/pooncast/${slugify(pooncast.titre)}/${pooncast.id}` }]
      : [];
  });
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
