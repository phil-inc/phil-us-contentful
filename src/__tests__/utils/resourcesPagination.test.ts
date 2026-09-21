import { RESOURCES_DATA } from "../../pages/resources/_data";
import {
  RESOURCES_PER_PAGE,
  RESOURCES_TOTAL_PAGES,
  buildResourcesUrl,
  pageFromResourcesPath,
  parseResourcesLocation,
  resourcesPagePath,
  serializeFiltersToSearch,
  titleForSelection,
} from "../../pages/resources/_urlFilters";

/**
 * The Resources listing's page number lives in the path (/resources/page/n/),
 * so each page is a static page with its own cards; the filters stay in the
 * query string.
 */

const none = { topic: "", type: "", search: "" };

describe("resources page paths", () => {
  test("page 1 is the listing root; later pages sit under /page/n/", () => {
    expect(resourcesPagePath(1)).toBe("/resources/");
    expect(resourcesPagePath(2)).toBe("/resources/page/2/");
    expect(resourcesPagePath(12)).toBe("/resources/page/12/");
  });

  test("an invalid page number falls back to the listing root", () => {
    [0, -1, 1.5, Number.NaN].forEach((page) => expect(resourcesPagePath(page)).toBe("/resources/"));
  });

  test("reads the page back from its path, with or without the trailing slash", () => {
    expect(pageFromResourcesPath("/resources/")).toBe(1);
    expect(pageFromResourcesPath("/resources/page/2/")).toBe(2);
    expect(pageFromResourcesPath("/resources/page/12")).toBe(12);
  });

  test("any path that is not a later page reads as page 1", () => {
    ["/", "/press/", "/resources/page/", "/resources/page/0/", "/resources/page/abc/", "/resources/phil-blog/"].forEach(
      (pathname) => expect(pageFromResourcesPath(pathname)).toBe(1),
    );
  });

  test("path and page number round-trip for every page of the listing", () => {
    for (let page = 1; page <= RESOURCES_TOTAL_PAGES; page++) {
      expect(pageFromResourcesPath(resourcesPagePath(page))).toBe(page);
    }
  });
});

describe("resources page count", () => {
  test("covers every resource at nine per page", () => {
    expect(RESOURCES_PER_PAGE).toBe(9);
    expect(RESOURCES_TOTAL_PAGES).toBe(Math.ceil(RESOURCES_DATA.length / 9));
    expect((RESOURCES_TOTAL_PAGES - 1) * RESOURCES_PER_PAGE).toBeLessThan(RESOURCES_DATA.length);
    expect(RESOURCES_TOTAL_PAGES * RESOURCES_PER_PAGE).toBeGreaterThanOrEqual(RESOURCES_DATA.length);
  });
});

describe("resources URLs", () => {
  test("the page goes in the path and the filters in the query", () => {
    expect(buildResourcesUrl({ ...none, page: 1 })).toBe("/resources/");
    expect(buildResourcesUrl({ ...none, page: 3 })).toBe("/resources/page/3/");
    expect(buildResourcesUrl({ ...none, topic: "direct", page: 2 })).toBe("/resources/page/2/?topic=direct");
    expect(buildResourcesUrl({ topic: "direct", type: "blog", search: " gtn ", page: 1 })).toBe(
      "/resources/?topic=direct&type=blog&search=gtn",
    );
  });

  test("the page is never written to the query string any more", () => {
    expect(serializeFiltersToSearch({ ...none, page: 4 })).toBe("");
    expect(serializeFiltersToSearch({ ...none, topic: "data", page: 4 })).toBe("?topic=data");
  });

  test("parses the page from the path and the filters from the query", () => {
    expect(parseResourcesLocation("/resources/page/2/", "?topic=direct")).toEqual({ ...none, topic: "direct", page: 2 });
    expect(parseResourcesLocation("/resources/", "")).toEqual({ ...none, page: 1 });
  });

  test("a leftover ?page=n, which Netlify passes through its redirect, is ignored", () => {
    expect(parseResourcesLocation("/resources/page/3/", "?page=3").page).toBe(3);
    expect(parseResourcesLocation("/resources/page/3/", "?page=7").page).toBe(3);
    expect(parseResourcesLocation("/resources/", "?page=2").page).toBe(1);
  });

  test("a URL built from a parsed location is stable", () => {
    ["/resources/", "/resources/page/5/", "/resources/page/2/?topic=direct&type=blog"].forEach((url) => {
      const [pathname, search = ""] = url.split(/(?=\?)/);
      expect(buildResourcesUrl(parseResourcesLocation(pathname, search))).toBe(url);
    });
  });
});

describe("resources page titles", () => {
  test("page 1 keeps its existing titles", () => {
    expect(titleForSelection({ topic: "", type: "" })).toBe("Resources | PHIL");
    expect(titleForSelection({ topic: "", type: "", page: 1, totalPages: 12 })).toBe("Resources | PHIL");
    expect(titleForSelection({ topic: "direct", type: "", page: 1 })).toBe("Direct-to-Patient Resources | PHIL");
  });

  test("later pages name the page, so no two pages share a title", () => {
    expect(titleForSelection({ topic: "", type: "", page: 2, totalPages: 12 })).toBe("Resources – Page 2 of 12 | PHIL");
    expect(titleForSelection({ topic: "direct", type: "", page: 2, totalPages: 3 })).toBe(
      "Direct-to-Patient Resources – Page 2 of 3 | PHIL",
    );

    const titles = Array.from({ length: RESOURCES_TOTAL_PAGES }, (_, i) =>
      titleForSelection({ topic: "", type: "", page: i + 1, totalPages: RESOURCES_TOTAL_PAGES }),
    );
    expect(new Set(titles).size).toBe(RESOURCES_TOTAL_PAGES);
  });
});
