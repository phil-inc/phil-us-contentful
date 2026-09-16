/**
 * Production origin used for canonical links, og:url and schema.org @ids.
 *
 * Deliberately hardcoded rather than read from GATSBY_DEPLOY_URL (as
 * getOgImage does): on a Netlify deploy preview that variable names the preview
 * host, and a canonical pointing there would tell crawlers the preview is the
 * authoritative copy. Matches `siteUrl` in gatsby-config.ts.
 */
export const SITE_URL = "https://phil.us";

/**
 * @id of the sitewide Organization node emitted from gatsby-ssr.tsx. Page-level
 * schema references the company with `{ "@id": ORGANIZATION_ID }` instead of
 * restating it, so the graph holds one Organization rather than one per page.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** @id of the sitewide WebSite node that page-level WebPage nodes belong to. */
export const WEBSITE_ID = `${SITE_URL}/#website`;
