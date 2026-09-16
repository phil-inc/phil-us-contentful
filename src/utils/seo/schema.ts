import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from "./constants";
import { toAbsoluteUrl } from "./url";

/** A schema.org JSON-LD node, ready for JSON.stringify. */
export type JsonLd = Record<string, unknown>;

type Maybe<T> = T | null | undefined;

const SCHEMA_CONTEXT = "https://schema.org";

/**
 * Pages reference the company and the site by @id rather than restating them.
 * Both nodes are emitted once, sitewide; an inline copy on a page would be read
 * as a second, competing entity.
 */
const organizationRef = () => ({ "@id": ORGANIZATION_ID });
const webSiteRef = () => ({ "@id": WEBSITE_ID });

/**
 * Drops top-level properties with no real value. Contentful returns blank
 * strings for unfilled fields, and an empty `description` or `image` reads as
 * broken markup to consumers — leaving the property out is the honest signal.
 */
function withoutEmpty(node: JsonLd): JsonLd {
  return Object.fromEntries(
    Object.entries(node).filter(([, value]) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      return true;
    }),
  );
}

/** The sitewide company entity every page-level node points to. */
export function organizationSchema(): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "PHIL",
    legalName: "Phil, Inc.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icons/icon-512x512.png`,
      width: 512,
      height: 512,
    },
    description:
      "PHIL simplifies the prescription journey for patients and providers — solving medication access and GTN challenges for pharma brands.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14500 N Northsight Blvd, Suite 307",
      addressLocality: "Scottsdale",
      addressRegion: "AZ",
      postalCode: "85260",
      addressCountry: "US",
    },
    sameAs: ["https://www.linkedin.com/company/phil-inc-"],
  };
}

/** The sitewide website entity that page-level WebPage nodes belong to. */
export function webSiteSchema(): JsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: toAbsoluteUrl("/"),
    name: "PHIL",
    publisher: organizationRef(),
  };
}

type WebPageInput = {
  /** CollectionPage for listings, ContactPage for contact forms. */
  type?: "WebPage" | "CollectionPage" | "ContactPage";
  path: string;
  name: string;
  description?: Maybe<string>;
  image?: Maybe<string>;
};

export function webPageSchema({
  type = "WebPage",
  path,
  name,
  description,
  image,
}: WebPageInput): JsonLd {
  const url = toAbsoluteUrl(path);

  return withoutEmpty({
    "@context": SCHEMA_CONTEXT,
    "@type": type,
    "@id": url,
    url,
    name,
    description,
    image,
    isPartOf: webSiteRef(),
    publisher: organizationRef(),
  });
}

type ArticleInput = {
  /** BlogPosting for blog posts; Article for case studies and other long-form. */
  type?: "Article" | "BlogPosting";
  path: string;
  headline: string;
  description?: Maybe<string>;
  image?: Maybe<string>;
  /**
   * Editor-set publication date only. Contentful's `createdAt` reflects content
   * migrations, not publication. There is deliberately no dateModified:
   * `updatedAt` moves on bulk republishes, so it would claim edits that never
   * happened.
   */
  datePublished?: Maybe<string>;
  authorName?: Maybe<string>;
};

export function articleSchema({
  type = "Article",
  path,
  headline,
  description,
  image,
  datePublished,
  authorName,
}: ArticleInput): JsonLd {
  const url = toAbsoluteUrl(path);

  return withoutEmpty({
    "@context": SCHEMA_CONTEXT,
    "@type": type,
    headline,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image,
    datePublished,
    publisher: organizationRef(),
    author: authorName?.trim()
      ? { "@type": "Person", name: authorName }
      : undefined,
  });
}
