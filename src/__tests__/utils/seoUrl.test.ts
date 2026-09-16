import { toAbsoluteUrl } from "../../utils/seo/url";
import {
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
} from "../../utils/seo/constants";

/**
 * Canonical, og:url and schema.org @id values all come from toAbsoluteUrl, so a
 * wrong result here points search engines at a URL that does not exist or that
 * redirects. Slugs arrive from Contentful with and without a leading slash, and
 * gatsby-config.ts sets `trailingSlash: 'always'`, so every output must carry
 * both slashes.
 */
describe("toAbsoluteUrl", () => {
  test("adds the leading slash a bare Contentful slug is missing", () => {
    expect(toAbsoluteUrl("partners")).toBe("https://phil.us/partners/");
  });

  test("adds the trailing slash Gatsby serves pages with", () => {
    expect(toAbsoluteUrl("/partners")).toBe("https://phil.us/partners/");
  });

  test("leaves an already-normalized path unchanged", () => {
    expect(toAbsoluteUrl("/partners/")).toBe("https://phil.us/partners/");
  });

  test("normalizes nested paths", () => {
    expect(toAbsoluteUrl("/a/b")).toBe("https://phil.us/a/b/");
  });

  test("maps the home page slug to the site root", () => {
    expect(toAbsoluteUrl("/")).toBe("https://phil.us/");
  });

  test("maps an empty slug to the site root", () => {
    expect(toAbsoluteUrl("")).toBe("https://phil.us/");
  });
});

describe("SEO constants", () => {
  test("site URL is production, with no trailing slash", () => {
    expect(SITE_URL).toBe("https://phil.us");
  });

  test("entity ids are fragments of the site root", () => {
    expect(ORGANIZATION_ID).toBe("https://phil.us/#organization");
    expect(WEBSITE_ID).toBe("https://phil.us/#website");
  });
});
