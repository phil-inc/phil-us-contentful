import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import Pagination from "../../components/common/Pagination/Pagination";

// Jest has no CSS transform; the class names don't matter here.
jest.mock("../../components/common/Pagination/pagination.module.css", () => ({}));

/**
 * Crawlers follow <a href> but never click buttons, so the Resources listing
 * passes getPageHref to get links. /press/ passes nothing and keeps buttons.
 */

const render = (props: Partial<React.ComponentProps<typeof Pagination>> = {}) =>
  renderToStaticMarkup(
    <Pagination currentPage={2} totalPages={12} onPageChange={() => undefined} {...props} />,
  );

const hrefs = (html: string) => Array.from(html.matchAll(/<a [^>]*href="([^"]*)"/g), (match) => match[1]);

describe("Pagination", () => {
  test("without getPageHref it renders buttons and no links, as before", () => {
    const html = render();

    expect(html).toContain("<button");
    expect(html).not.toContain("<a ");
  });

  test("with getPageHref every reachable page is a crawlable link", () => {
    const html = render({ getPageHref: (page) => `/resources/page/${page}/` });

    expect(html).not.toContain("<button");
    // Previous, the page range around page 2, the last page, and next.
    expect(hrefs(html)).toEqual([
      "/resources/page/1/",
      "/resources/page/1/",
      "/resources/page/2/",
      "/resources/page/3/",
      "/resources/page/12/",
      "/resources/page/3/",
    ]);
    expect(html).toContain('aria-current="page"');
  });

  test("an unreachable previous or next is not a link", () => {
    const first = render({ currentPage: 1, getPageHref: (page) => `/p/${page}/` });
    const last = render({ currentPage: 12, getPageHref: (page) => `/p/${page}/` });

    const previous = first.match(/<a [^>]*aria-label="Previous page"[^>]*>/)?.[0] ?? "";
    const next = last.match(/<a [^>]*aria-label="Next page"[^>]*>/)?.[0] ?? "";

    expect(previous).toContain('aria-disabled="true"');
    expect(previous).not.toContain("href=");
    expect(next).toContain('aria-disabled="true"');
    expect(next).not.toContain("href=");
    expect(hrefs(first)).not.toContain("/p/0/");
    expect(hrefs(last)).not.toContain("/p/13/");
  });
});
