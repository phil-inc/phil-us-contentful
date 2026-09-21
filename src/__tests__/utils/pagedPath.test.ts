import { pagedPath, pageFromPagedPath } from "../../utils/pagedPath";
import { PRESS_DATA, PRESS_PER_PAGE, PRESS_TOTAL_PAGES } from "../../pages/press/_data";

/**
 * Paginated listings (/resources/, /press/) put the page number in the path,
 * so each page is a static page with its own items in the HTML.
 */

describe("pagedPath", () => {
  test("page 1 is the listing itself; later pages sit under page/n/", () => {
    expect(pagedPath("/press/", 1)).toBe("/press/");
    expect(pagedPath("/press/", 2)).toBe("/press/page/2/");
  });

  test("an invalid page number falls back to the listing", () => {
    [0, -1, 1.5, Number.NaN].forEach((page) => expect(pagedPath("/press/", page)).toBe("/press/"));
  });
});

describe("pageFromPagedPath", () => {
  test("reads the page back, with or without the trailing slash", () => {
    expect(pageFromPagedPath("/press/", "/press/")).toBe(1);
    expect(pageFromPagedPath("/press/", "/press/page/3/")).toBe(3);
    expect(pageFromPagedPath("/press/", "/press/page/3")).toBe(3);
  });

  test("only counts paths of its own listing", () => {
    expect(pageFromPagedPath("/press/", "/resources/page/3/")).toBe(1);
    expect(pageFromPagedPath("/press/", "/press-releases/page/3/")).toBe(1);
    expect(pageFromPagedPath("/press/", "/press/page/0/")).toBe(1);
    expect(pageFromPagedPath("/press/", "/press/page/abc/")).toBe(1);
  });
});

describe("press pages", () => {
  test("cover every press item at six per page", () => {
    expect(PRESS_PER_PAGE).toBe(6);
    expect(PRESS_TOTAL_PAGES).toBe(Math.ceil(PRESS_DATA.length / 6));
    expect((PRESS_TOTAL_PAGES - 1) * PRESS_PER_PAGE).toBeLessThan(PRESS_DATA.length);
  });

  test("path and page number round-trip for every page", () => {
    for (let page = 1; page <= PRESS_TOTAL_PAGES; page++) {
      expect(pageFromPagedPath("/press/", pagedPath("/press/", page))).toBe(page);
    }
  });
});
