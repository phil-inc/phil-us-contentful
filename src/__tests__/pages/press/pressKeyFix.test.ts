import * as fs from "fs";
import * as path from "path";
import { PRESS_DATA } from "../../../pages/press/_data";

/**
 * Adversarial tests for the duplicate-key fix in src/pages/press/index.tsx.
 *
 * The fix changed `key={item.url}` to `key={`${item.url}-${i}`}` in two map() calls.
 * This ensures React won't produce duplicate keys when entries share URLs.
 */
describe("Press page duplicate-key fix (index.tsx)", () => {
  let pressPageSource: string;

  beforeAll(() => {
    const filePath = path.resolve(
      __dirname,
      "../../../pages/press/index.tsx"
    );
    pressPageSource = fs.readFileSync(filePath, "utf-8");
  });

  // ─── Verify the fix is applied ─────────────────────────────────────────────

  test("should use index-based key pattern in FEATURED_RELEASES.map", () => {
    // Find the FEATURED_RELEASES map section
    const featuredSection = pressPageSource.match(
      /FEATURED_RELEASES\.map\(([\s\S]*?)\)\s*\)}/
    );
    expect(featuredSection).not.toBeNull();
    // The key should include the index
    expect(featuredSection![1]).toContain("item, i");
    expect(featuredSection![0]).toMatch(/key=\{`\$\{item\.url\}-\$\{i\}`\}/);
  });

  test("should use index-based key pattern in paged.map", () => {
    // Find the paged map section
    const pagedSection = pressPageSource.match(
      /paged\.map\(([\s\S]*?)\)\s*\)}/
    );
    expect(pagedSection).not.toBeNull();
    expect(pagedSection![1]).toContain("item, i");
    expect(pagedSection![0]).toMatch(/key=\{`\$\{item\.url\}-\$\{i\}`\}/);
  });

  test("should NOT have bare key={item.url} without index anywhere in .map calls", () => {
    // Ensure no map callback still uses the old pattern
    const oldPattern = /\.map\(\(item\)\s*=>\s*[\s\S]*?key=\{item\.url\}/;
    expect(pressPageSource).not.toMatch(oldPattern);
  });

  // ─── Verify the duplicate URL scenario that motivates the fix ──────────────

  test("PRESS_DATA[1] and PRESS_DATA[3] should share the same URL (intentional)", () => {
    expect(PRESS_DATA[1].url).toBe(PRESS_DATA[3].url);
  });

  test("PRESS_DATA[1] and PRESS_DATA[3] should have different titles", () => {
    expect(PRESS_DATA[1].title).not.toBe(PRESS_DATA[3].title);
  });

  test("duplicate URL items are both of type Release", () => {
    expect(PRESS_DATA[1].type).toBe("Release");
    expect(PRESS_DATA[3].type).toBe("Release");
  });

  // ─── Key uniqueness simulation ─────────────────────────────────────────────

  describe("Simulated key uniqueness (url-index pattern)", () => {
    test("FEATURED_RELEASES keys should all be unique with url-index pattern", () => {
      const featuredReleases = PRESS_DATA.filter((d) => d.type === "Release").slice(0, 3);
      const keys = featuredReleases.map((item, i) => `${item.url}-${i}`);
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(keys.length);
    });

    test("all pages of PRESS_DATA should have unique keys with url-index pattern", () => {
      const ITEMS_PER_PAGE = 6;
      const TOTAL_PAGES = Math.ceil(PRESS_DATA.length / ITEMS_PER_PAGE);

      for (let page = 1; page <= TOTAL_PAGES; page++) {
        const paged = PRESS_DATA.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
        const keys = paged.map((item, i) => `${item.url}-${i}`);
        const uniqueKeys = new Set(keys);
        expect(uniqueKeys.size).toBe(keys.length);
      }
    });

    test("without index, FEATURED_RELEASES would have duplicate keys", () => {
      // This proves the fix was necessary
      const featuredReleases = PRESS_DATA.filter((d) => d.type === "Release").slice(0, 3);
      const keysWithoutIndex = featuredReleases.map((item) => item.url);
      const uniqueKeys = new Set(keysWithoutIndex);
      // PRESS_DATA[1] and PRESS_DATA[3] share URLs, and both are Release type,
      // so they'd both appear in featured releases at positions 0 and 1
      expect(uniqueKeys.size).toBeLessThan(keysWithoutIndex.length);
    });
  });

  // ─── Thought Leadership keys shouldn't need index (but it doesn't hurt) ───

  test("FEATURED_THOUGHT items have unique URLs (no duplicates in TL category)", () => {
    const featuredThought = PRESS_DATA.filter(
      (d) => d.type === "Thought Leadership"
    ).slice(0, 3);
    const urls = featuredThought.map((item) => item.url);
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});
