/**
 * Paths of a paginated listing: page 1 is the listing's own path and page n is
 * `<base>page/n/`, e.g. /resources/ and /resources/page/2/.
 *
 * Each page is a static page built by gatsby-node.ts, so a crawler following
 * the pagination links gets that page's items in the HTML; a `?page=n` query
 * would be served the listing's single index.html.
 */

/** 1 → `base`, n → `<base>page/n/`. `base` has leading and trailing slashes. */
export function pagedPath(base: string, page: number): string {
  return Number.isInteger(page) && page > 1 ? `${base}page/${page}/` : base;
}

/** The page number a path of the listing at `base` stands for; 1 for anything else. */
export function pageFromPagedPath(base: string, pathname: string): number {
  const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`^${escaped}page/(\\d+)/?$`).exec(pathname);
  return match && Number(match[1]) > 1 ? Number(match[1]) : 1;
}
