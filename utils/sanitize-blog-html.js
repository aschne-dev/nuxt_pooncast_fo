import sanitizeHtml from "sanitize-html";

const BLOG_ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "h2",
  "h3",
  "blockquote",
  "a",
];

const BLOG_ALLOWED_LINK_PROTOCOL = /^(?:https?:|mailto:)/i;

export function sanitizeBlogHtml(value = "") {
  return sanitizeHtml(value, {
    allowedTags: BLOG_ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    nonTextTags: [
      "script",
      "style",
      "textarea",
      "option",
      "iframe",
      "object",
      "embed",
      "svg",
      "math",
    ],
    transformTags: {
      a: (tagName, attributes) => {
        const sanitizedAttributes = { ...attributes };
        const href = sanitizedAttributes.href?.trim();

        if (!href || !BLOG_ALLOWED_LINK_PROTOCOL.test(href)) {
          delete sanitizedAttributes.href;
        } else {
          sanitizedAttributes.href = href;
        }

        if (sanitizedAttributes.target === "_blank") {
          sanitizedAttributes.rel = "noopener noreferrer";
        }

        return { tagName, attribs: sanitizedAttributes };
      },
    },
  });
}
