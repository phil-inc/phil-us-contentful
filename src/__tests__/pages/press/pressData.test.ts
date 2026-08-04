import { PRESS_DATA, PressItem } from "../../../pages/press/_data";

describe("PRESS_DATA", () => {
  // ─── Total count ───────────────────────────────────────────────────────────

  test("should contain exactly 14 entries after additions", () => {
    expect(PRESS_DATA).toHaveLength(14);
  });

  // ─── New entries positioning ───────────────────────────────────────────────

  test("first entry should be the new Thought Leadership item", () => {
    expect(PRESS_DATA[0].title).toBe(
      "Designing a Transformative Direct-to-Patient Program to Drive Brand Growth"
    );
    expect(PRESS_DATA[0].type).toBe("Thought Leadership");
    expect(PRESS_DATA[0].outlet).toBe("Case Study");
  });

  test("second entry should be the new Release item", () => {
    expect(PRESS_DATA[1].title).toBe(
      "Why brands fail as a medical service. Phil will help you"
    );
    expect(PRESS_DATA[1].type).toBe("Release");
    expect(PRESS_DATA[1].outlet).toBe("Press Release New");
  });

  // ─── Type field correctness ────────────────────────────────────────────────

  test("all entries should have type 'Release' or 'Thought Leadership'", () => {
    PRESS_DATA.forEach((item, i) => {
      expect(["Release", "Thought Leadership"]).toContain(item.type);
    });
  });

  // ─── Required fields ──────────────────────────────────────────────────────

  test("every entry should have a non-empty title", () => {
    PRESS_DATA.forEach((item, i) => {
      expect(item.title).toBeTruthy();
      expect(item.title.trim().length).toBeGreaterThan(0);
    });
  });

  test("every entry should have a non-empty outlet", () => {
    PRESS_DATA.forEach((item, i) => {
      expect(item.outlet).toBeTruthy();
      expect(item.outlet.trim().length).toBeGreaterThan(0);
    });
  });

  test("every entry should have a valid URL starting with https://", () => {
    PRESS_DATA.forEach((item, i) => {
      expect(item.url).toMatch(/^https:\/\/.+/);
    });
  });

  // NOTE: Duplicate URLs are intentionally allowed per ticket TP-32 (confirmed as intentional).
  // The new Release at index 1 reuses an existing URL — this is expected.

  // ─── No duplicate titles ──────────────────────────────────────────────────

  test("should not have duplicate titles", () => {
    const titles = PRESS_DATA.map((item) => item.title);
    const duplicates = titles.filter((t, i) => titles.indexOf(t) !== i);
    expect(duplicates).toEqual([]);
  });

  // ─── Featured releases logic ──────────────────────────────────────────────

  describe("Featured Releases (first 3 Release items)", () => {
    const featuredReleases = PRESS_DATA.filter((d) => d.type === "Release").slice(0, 3);

    test("should yield exactly 3 featured releases", () => {
      expect(featuredReleases).toHaveLength(3);
    });

    test("new Release entry should be in featured releases (at position 0 or 1)", () => {
      const newRelease = featuredReleases.find(
        (item) => item.title === "Why brands fail as a medical service. Phil will help you"
      );
      expect(newRelease).toBeDefined();
    });
  });

  // ─── Featured thought leadership logic ─────────────────────────────────────

  describe("Featured Thought Leadership (first 3 Thought Leadership items)", () => {
    const featuredThought = PRESS_DATA.filter(
      (d) => d.type === "Thought Leadership"
    ).slice(0, 3);

    test("should yield exactly 3 featured thought leadership items", () => {
      expect(featuredThought).toHaveLength(3);
    });

    test("new Thought Leadership entry should be in featured thought leadership", () => {
      const newThought = featuredThought.find(
        (item) =>
          item.title ===
          "Designing a Transformative Direct-to-Patient Program to Drive Brand Growth"
      );
      expect(newThought).toBeDefined();
    });

    test("new Thought Leadership entry should be first in featured", () => {
      expect(featuredThought[0].title).toBe(
        "Designing a Transformative Direct-to-Patient Program to Drive Brand Growth"
      );
    });
  });

  // ─── Pagination math ──────────────────────────────────────────────────────

  describe("Pagination", () => {
    const ITEMS_PER_PAGE = 6;
    const TOTAL_PAGES = Math.ceil(PRESS_DATA.length / ITEMS_PER_PAGE);

    test("should require 3 pages for 14 items at 6 per page", () => {
      expect(TOTAL_PAGES).toBe(3);
    });

    test("last page should have 2 items", () => {
      const lastPageItems = PRESS_DATA.slice(
        (TOTAL_PAGES - 1) * ITEMS_PER_PAGE,
        TOTAL_PAGES * ITEMS_PER_PAGE
      );
      expect(lastPageItems).toHaveLength(2);
    });

    test("first page should have exactly 6 items", () => {
      const firstPageItems = PRESS_DATA.slice(0, ITEMS_PER_PAGE);
      expect(firstPageItems).toHaveLength(6);
    });
  });

  // ─── Data integrity: new entries URLs point to correct domains ─────────────

  test("new Thought Leadership entry URL should point to phil.us domain", () => {
    expect(PRESS_DATA[0].url).toMatch(/^https:\/\/phil\.us\//);
  });

  test("new Release entry URL should point to businesswire.com", () => {
    expect(PRESS_DATA[1].url).toMatch(/^https:\/\/www\.businesswire\.com\//);
  });

  // ─── Type distribution sanity check ───────────────────────────────────────

  test("should have reasonable distribution of types", () => {
    const releases = PRESS_DATA.filter((d) => d.type === "Release");
    const thought = PRESS_DATA.filter((d) => d.type === "Thought Leadership");

    expect(releases.length).toBeGreaterThanOrEqual(3);
    expect(thought.length).toBeGreaterThanOrEqual(3);
    expect(releases.length + thought.length).toBe(PRESS_DATA.length);
  });

  // ─── URL format validation (no trailing spaces, well-formed) ──────────────

  test("URLs should not contain spaces or whitespace", () => {
    PRESS_DATA.forEach((item) => {
      expect(item.url).not.toMatch(/\s/);
    });
  });

  test("URLs should be valid URL format", () => {
    PRESS_DATA.forEach((item) => {
      expect(() => new URL(item.url)).not.toThrow();
    });
  });
});
