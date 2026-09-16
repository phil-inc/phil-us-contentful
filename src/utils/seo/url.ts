import { SITE_URL } from "./constants";

/**
 * Builds the absolute page URL from a Contentful slug or a pathname.
 *
 * Slugs are stored inconsistently in Contentful — some carry a leading slash,
 * some do not — and the origin used to be concatenated onto the raw value.
 * A slug of "partners" therefore produced "https://phil.uspartners", naming a
 * host that does not exist.
 *
 * The trailing slash is normalized for the same reason: gatsby-config.ts sets
 * `trailingSlash: 'always'` and the sitemap lists pages with one, so omitting it
 * pointed the canonical at a URL that redirects.
 */
export function toAbsoluteUrl(slug: string): string {
  const withLeadingSlash = slug.startsWith("/") ? slug : `/${slug}`;
  const normalized = withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return `${SITE_URL}${normalized}`;
}
