import * as fs from "fs";
import * as path from "path";

import {
  FEATURED_RELEASES,
  FEATURED_RELEASE_SLOTS,
  FEATURED_THOUGHT,
  FEATURED_THOUGHT_SLOTS,
  ITEMS_PER_PAGE,
  PRESS_DATA,
  RESOURCE_PRESS_ITEMS,
  RESOURCE_PRESS_SLOTS,
  TOTAL_PAGES,
  getPageItems,
} from "../../pages/press/_data";
import type { PressItem } from "../../pages/press/_data";
import { RESOURCES_DATA } from "../../pages/resources/_data";

/**
 * Adversarial tests for MRTG-1447.
 *
 * pressData.test.ts checks the new entry and the derived lists. This suite
 * attacks the refactor itself. The refactor moved 5 formulas out of
 * src/pages/press/index.tsx and 1 formula out of src/pages/resources/index.tsx
 * into src/pages/press/_data.ts. A refactor test must prove that the moved code
 * produces the same output as the code it replaced. These tests therefore hold
 * golden values that come from the pre-refactor formulas on origin/main, and
 * they re-run the old inline formulas against the new PRESS_DATA array.
 *
 * The suite also probes the input domain of getPageItems, the purity of the
 * data module, and the aliasing between the exported arrays.
 */

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const DATA_FILE = path.join(REPO_ROOT, "src", "pages", "press", "_data.ts");
const PRESS_PAGE = path.join(REPO_ROOT, "src", "pages", "press", "index.tsx");
const RESOURCES_PAGE = path.join(REPO_ROOT, "src", "pages", "resources", "index.tsx");

const NEW_URL = "https://dimesociety.org/newsroom/blog/deep-dive/how-phil-is-rewriting-the-rules-of-direct-to-patient/";

/**
 * The 3 Latest Announcements urls that /press rendered before this branch.
 * The ticket adds a Thought Leadership item, so this list must not change.
 */
const MAIN_FEATURED_RELEASE_URLS = [
  "https://www.businesswire.com/news/home/20260421670832/en/PHIL-Invests-in-State-of-the-Art-Cash-Dispense-Capabilities-Expanding-Direct-to-Patient-Fulfillment-for-Pharma",
  "https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable",
  "https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html",
];

/** The 3 Featured Thought Leadership urls that /press rendered before this branch. */
const MAIN_FEATURED_THOUGHT_URLS = [
  "https://www.pharmaceuticalcommerce.com/view/the-critical-layer-for-pharmas-growing-direct-to-patient-play",
  "https://www.drugchannels.net/2026/05/protecting-gross-to-net-performance.html",
  "https://www.fiercepharma.com/sponsored/hidden-gtn-drain-why-specialty-lite-brands-need-streamline-their-pa-process-optimal",
];

/** The 4 "In the news" urls that /resources rendered before this branch. */
const MAIN_RESOURCE_PRESS_URLS = [
  "https://www.pharmaceuticalcommerce.com/view/the-critical-layer-for-pharmas-growing-direct-to-patient-play",
  "https://www.drugchannels.net/2026/05/protecting-gross-to-net-performance.html",
  "https://www.fiercepharma.com/sponsored/hidden-gtn-drain-why-specialty-lite-brands-need-streamline-their-pa-process-optimal",
  "https://www.lifescienceleader.com/doc/pharma-direct-to-patient-from-experiment-to-imperative-0001",
];

/** PRESS_DATA held 13 items on origin/main. */
const MAIN_PRESS_DATA_LENGTH = 13;

// ─── The pre-refactor formulas, copied verbatim from origin/main ─────────────
// Each helper repeats one expression that this branch deleted from a page. The
// helper reads the current PRESS_DATA array, so it shows what the old page code
// would render today. The new export must equal the helper output.

const oldFeaturedReleases = (data: PressItem[]): PressItem[] => data.filter((d) => d.type === "Release").slice(0, 3);

const oldFeaturedThought = (data: PressItem[]): PressItem[] =>
  data.filter((d) => d.type === "Thought Leadership").slice(0, 3);

const OLD_ITEMS_PER_PAGE = 6;

const oldTotalPages = (data: PressItem[]): number => Math.ceil(data.length / OLD_ITEMS_PER_PAGE);

const oldPageSlice = (data: PressItem[], page: number): PressItem[] =>
  data.slice((page - 1) * OLD_ITEMS_PER_PAGE, page * OLD_ITEMS_PER_PAGE);

const oldResourcePressItems = (data: PressItem[]): PressItem[] =>
  data.filter((d) => d.type === "Thought Leadership").slice(0, 4);

function readSource(file: string): string {
  return fs.readFileSync(file, "utf8");
}

/** Strips the scheme, the www prefix, the case, and the trailing slash. */
function normalizeUrl(url: string): string {
  return url
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

describe("refactor parity: the moved formulas keep their old output", () => {
  test("FEATURED_RELEASES equals the formula the press page deleted", () => {
    expect(FEATURED_RELEASES).toEqual(oldFeaturedReleases(PRESS_DATA));
  });

  test("FEATURED_THOUGHT equals the formula the press page deleted", () => {
    expect(FEATURED_THOUGHT).toEqual(oldFeaturedThought(PRESS_DATA));
  });

  test("TOTAL_PAGES equals the formula the press page deleted", () => {
    expect(TOTAL_PAGES).toBe(oldTotalPages(PRESS_DATA));
  });

  test("RESOURCE_PRESS_ITEMS equals the formula the resources page deleted", () => {
    expect(RESOURCE_PRESS_ITEMS).toEqual(oldResourcePressItems(PRESS_DATA));
  });

  test("getPageItems equals the old inline slice on every real page", () => {
    for (let page = 1; page <= TOTAL_PAGES; page += 1) {
      expect(getPageItems(page)).toEqual(oldPageSlice(PRESS_DATA, page));
    }
  });

  test("ITEMS_PER_PAGE keeps the value 6 that the press page hardcoded", () => {
    expect(ITEMS_PER_PAGE).toBe(OLD_ITEMS_PER_PAGE);
  });

  test("the slot constants keep the numbers the two pages hardcoded", () => {
    expect(FEATURED_RELEASE_SLOTS).toBe(3);
    expect(FEATURED_THOUGHT_SLOTS).toBe(3);
    expect(RESOURCE_PRESS_SLOTS).toBe(4);
  });
});

describe("golden values from origin/main", () => {
  test("PRESS_DATA grows by exactly one item", () => {
    expect(PRESS_DATA).toHaveLength(MAIN_PRESS_DATA_LENGTH + 1);
  });

  test("Latest Announcements renders the same 3 urls as before the ticket", () => {
    expect(FEATURED_RELEASES.map((d) => d.url)).toEqual(MAIN_FEATURED_RELEASE_URLS);
  });

  test("Featured Thought Leadership prepends the new url and drops the third old url", () => {
    expect(FEATURED_THOUGHT.map((d) => d.url)).toEqual([NEW_URL, ...MAIN_FEATURED_THOUGHT_URLS.slice(0, 2)]);
    expect(FEATURED_THOUGHT.map((d) => d.url)).not.toContain(MAIN_FEATURED_THOUGHT_URLS[2]);
  });

  test("the In the news strip prepends the new url and drops the fourth old url", () => {
    expect(RESOURCE_PRESS_ITEMS.map((d) => d.url)).toEqual([NEW_URL, ...MAIN_RESOURCE_PRESS_URLS.slice(0, 3)]);
    expect(RESOURCE_PRESS_ITEMS.map((d) => d.url)).not.toContain(MAIN_RESOURCE_PRESS_URLS[3]);
  });

  test("TOTAL_PAGES stays 3, because 14 items still need 3 pages of 6", () => {
    expect(oldTotalPages(PRESS_DATA.slice(0, MAIN_PRESS_DATA_LENGTH))).toBe(3);
    expect(TOTAL_PAGES).toBe(3);
  });

  test("the 14th item makes the last page hold 2 cards instead of 1", () => {
    expect(getPageItems(TOTAL_PAGES)).toHaveLength(2);
    expect(oldPageSlice(PRESS_DATA.slice(0, MAIN_PRESS_DATA_LENGTH), 3)).toHaveLength(1);
  });

  test("every url that origin/main rendered still exists in PRESS_DATA", () => {
    const urls = PRESS_DATA.map((d) => d.url);

    [...MAIN_FEATURED_RELEASE_URLS, ...MAIN_RESOURCE_PRESS_URLS].forEach((url) => {
      expect(urls).toContain(url);
    });
  });
});

describe("getPageItems input domain", () => {
  test("returns an empty array for page 0, which the old slice also did", () => {
    expect(getPageItems(0)).toEqual([]);
    expect(getPageItems(0)).toEqual(oldPageSlice(PRESS_DATA, 0));
  });

  test("returns an empty array one page past the end", () => {
    expect(getPageItems(TOTAL_PAGES + 1)).toEqual([]);
  });

  test("returns an empty array for a very large page and for Infinity", () => {
    expect(getPageItems(Number.MAX_SAFE_INTEGER)).toEqual([]);
    expect(getPageItems(Number.POSITIVE_INFINITY)).toEqual([]);
  });

  test("returns an empty array for NaN", () => {
    expect(getPageItems(Number.NaN)).toEqual([]);
  });

  test("mirrors the old slice for a negative page, so the refactor adds no new guard", () => {
    // Array.prototype.slice counts a negative index from the end, so a negative
    // page returns cards. parsePageFromSearch in index.tsx rejects any value
    // below 1, so the page never passes a negative number. The assertion pins
    // the shared behaviour of the old and the new code.
    [-1, -2, -5].forEach((page) => {
      expect(getPageItems(page)).toEqual(oldPageSlice(PRESS_DATA, page));
    });
    expect(getPageItems(-1).length).toBeGreaterThan(0);
  });

  test("mirrors the old slice for a fractional page", () => {
    expect(getPageItems(1.5)).toEqual(oldPageSlice(PRESS_DATA, 1.5));
  });

  test("the press page guards the page number before it calls getPageItems", () => {
    const source = readSource(PRESS_PAGE);

    // The parser rejects a non-integer and a value below 1, and the clamp caps
    // the value at TOTAL_PAGES. Together they keep getPageItems inside 1..3.
    expect(source).toMatch(/Number\.isInteger\(parsed\) && parsed >= 1 \? parsed : 1/);
    expect(source).toMatch(/const currentPage = Math\.min\(page, TOTAL_PAGES\)/);
    expect(source).toMatch(/getPageItems\(currentPage\)/);
  });

  test("every page number that the guarded range allows returns cards", () => {
    [1, 2, 3, 42, -0].forEach((requested) => {
      const clamped = Math.min(Math.max(requested, 1), TOTAL_PAGES);

      expect(getPageItems(clamped).length).toBeGreaterThan(0);
      expect(getPageItems(clamped).length).toBeLessThanOrEqual(ITEMS_PER_PAGE);
    });
  });

  test("returns a new array on each call, so a caller cannot corrupt PRESS_DATA", () => {
    const first = getPageItems(1);

    expect(first).not.toBe(getPageItems(1));

    first.pop();

    expect(getPageItems(1)).toHaveLength(ITEMS_PER_PAGE);
    expect(PRESS_DATA).toHaveLength(14);
  });
});

describe("derived export consistency", () => {
  test("each derived list is a distinct array instance", () => {
    expect(FEATURED_THOUGHT).not.toBe(RESOURCE_PRESS_ITEMS);
    expect(FEATURED_THOUGHT).not.toBe(FEATURED_RELEASES);
    expect(FEATURED_RELEASES).not.toBe(PRESS_DATA);
    expect(RESOURCE_PRESS_ITEMS).not.toBe(PRESS_DATA);
  });

  test("each derived item is the same object that PRESS_DATA holds", () => {
    [...FEATURED_RELEASES, ...FEATURED_THOUGHT, ...RESOURCE_PRESS_ITEMS].forEach((item) => {
      expect(PRESS_DATA.indexOf(item)).toBeGreaterThanOrEqual(0);
    });
  });

  test("the 3 press cards are the first 3 of the 4 resources cards", () => {
    expect(RESOURCE_PRESS_ITEMS.slice(0, FEATURED_THOUGHT_SLOTS)).toEqual(FEATURED_THOUGHT);
  });

  test("the Latest Announcements list shares no item with the Thought Leadership list", () => {
    FEATURED_RELEASES.forEach((item) => {
      expect(FEATURED_THOUGHT).not.toContain(item);
      expect(RESOURCE_PRESS_ITEMS).not.toContain(item);
    });
  });

  test("each slot count fits the data, so no section renders short", () => {
    const thought = PRESS_DATA.filter((d) => d.type === "Thought Leadership");
    const releases = PRESS_DATA.filter((d) => d.type === "Release");

    expect(thought.length).toBeGreaterThanOrEqual(RESOURCE_PRESS_SLOTS);
    expect(thought.length).toBeGreaterThanOrEqual(FEATURED_THOUGHT_SLOTS);
    expect(releases.length).toBeGreaterThanOrEqual(FEATURED_RELEASE_SLOTS);
    expect(FEATURED_THOUGHT).toHaveLength(FEATURED_THOUGHT_SLOTS);
    expect(FEATURED_RELEASES).toHaveLength(FEATURED_RELEASE_SLOTS);
    expect(RESOURCE_PRESS_ITEMS).toHaveLength(RESOURCE_PRESS_SLOTS);
  });

  test("TOTAL_PAGES stays at least 1, because Pagination always renders a page button", () => {
    expect(TOTAL_PAGES).toBeGreaterThanOrEqual(1);
    expect(PRESS_DATA.length).toBeGreaterThan(ITEMS_PER_PAGE * (TOTAL_PAGES - 1));
    expect(PRESS_DATA.length).toBeLessThanOrEqual(ITEMS_PER_PAGE * TOTAL_PAGES);
  });

  test("every rendered list uses unique urls, because each card keys on the url", () => {
    const lists: PressItem[][] = [FEATURED_RELEASES, FEATURED_THOUGHT, RESOURCE_PRESS_ITEMS];

    for (let page = 1; page <= TOTAL_PAGES; page += 1) {
      lists.push(getPageItems(page));
    }

    lists.forEach((list) => {
      const urls = list.map((d) => d.url);

      expect(new Set(urls).size).toBe(urls.length);
    });
  });
});

describe("the data module stays pure and deterministic", () => {
  test("imports nothing, so no CSS module or React import can break a test", () => {
    const source = readSource(DATA_FILE);

    expect(source).not.toMatch(/^\s*import\s/m);
    expect(source).not.toMatch(/require\(/);
  });

  test("uses no clock and no random source", () => {
    const source = readSource(DATA_FILE);

    expect(source).not.toMatch(/new Date|Date\.now|Math\.random/);
  });

  test("returns the same values after a fresh module load", () => {
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const reloaded = require("../../pages/press/_data");

    expect(reloaded.PRESS_DATA).toEqual(PRESS_DATA);
    expect(reloaded.TOTAL_PAGES).toBe(TOTAL_PAGES);
    expect(reloaded.FEATURED_THOUGHT).toEqual(FEATURED_THOUGHT);
    expect(reloaded.RESOURCE_PRESS_ITEMS).toEqual(RESOURCE_PRESS_ITEMS);
    expect(reloaded.getPageItems(1)).toEqual(getPageItems(1));
  });

  test("declares each derived export exactly one time", () => {
    const source = readSource(DATA_FILE);
    const names = [
      "ITEMS_PER_PAGE",
      "FEATURED_RELEASE_SLOTS",
      "FEATURED_THOUGHT_SLOTS",
      "FEATURED_RELEASES",
      "FEATURED_THOUGHT",
      "TOTAL_PAGES",
      "RESOURCE_PRESS_SLOTS",
      "RESOURCE_PRESS_ITEMS",
    ];

    names.forEach((name) => {
      expect(source.match(new RegExp(`export const ${name}\\b`, "g"))).toHaveLength(1);
    });
    expect(source.match(/export function getPageItems\b/g)).toHaveLength(1);
  });

  test("keeps the deleted formulas out of the two pages", () => {
    const pressSource = readSource(PRESS_PAGE);
    const resourcesSource = readSource(RESOURCES_PAGE);

    expect(pressSource).not.toMatch(/PRESS_DATA\./);
    expect(pressSource).not.toMatch(/Math\.ceil\(/);
    expect(pressSource).not.toMatch(/const FEATURED_(RELEASES|THOUGHT) =/);
    expect(resourcesSource).not.toMatch(/PRESS_DATA/);
    expect(resourcesSource).not.toMatch(/\.slice\(0, 4\)/);
  });
});

describe("new entry hygiene", () => {
  test("adds no near duplicate url, after the scheme, www, case, and slash drop out", () => {
    const normalized = PRESS_DATA.map((d) => normalizeUrl(d.url));

    expect(new Set(normalized).size).toBe(normalized.length);
  });

  test("adds no near duplicate title, after the case and the spacing drop out", () => {
    const normalized = PRESS_DATA.map((d) => d.title.toLowerCase().replace(/\s+/g, " ").trim());

    expect(new Set(normalized).size).toBe(normalized.length);
  });

  test("uses a url that survives a decode and encode round trip", () => {
    PRESS_DATA.forEach((item) => {
      expect(encodeURI(decodeURI(item.url))).toBe(item.url);
      expect(item.url).not.toMatch(/\s/);
    });
  });

  test("keeps html and html entities out of every visible field", () => {
    PRESS_DATA.forEach((item) => {
      const text = `${item.title}${item.outlet}${item.description ?? ""}`;

      expect(text).not.toMatch(/<[^>]+>/);
      expect(text).not.toMatch(/&(amp|lt|gt|quot|nbsp|#\d+);/);
      expect(text).not.toMatch(/[\n\r\t]/);
    });
  });

  test("keeps the new title short enough for a 3 card grid row", () => {
    const newItem = PRESS_DATA[0];
    const longest = Math.max(...PRESS_DATA.map((d) => d.title.length));

    expect(newItem.title.length).toBeLessThanOrEqual(longest);
    expect(newItem.title.length).toBeLessThanOrEqual(120);
  });

  test("names a real outlet, because the Thought Leadership card prints the outlet", () => {
    const newItem = PRESS_DATA[0];

    expect(newItem.outlet).not.toBe("Press Release");
    expect(newItem.outlet).toBe("Digital Medicine Society");
  });

  test("omits the optional description, like the other 2 featured Thought Leadership items", () => {
    // The /press featured card renders the outlet and the title only, so a
    // description would never appear. The 2 sibling featured items omit it.
    expect(PRESS_DATA[0].description).toBeUndefined();
    FEATURED_THOUGHT.forEach((item) => {
      expect(item.description).toBeUndefined();
    });
  });

  test("every Release item uses the Press Release outlet, and no Thought Leadership item does", () => {
    PRESS_DATA.forEach((item) => {
      if (item.type === "Release") {
        expect(item.outlet).toBe("Press Release");
      } else {
        expect(item.outlet).not.toBe("Press Release");
      }
    });
  });
});

describe("the In the news strip and the resources filter grid", () => {
  test("draws every strip card from PRESS_DATA, not from RESOURCES_DATA", () => {
    RESOURCE_PRESS_ITEMS.forEach((item) => {
      expect(PRESS_DATA).toContain(item);
    });
  });

  test("adds no duplicate url inside RESOURCES_DATA", () => {
    const urls = RESOURCES_DATA.map((d) => d.url);

    expect(new Set(urls).size).toBe(urls.length);
  });

  test("leaves RESOURCES_DATA untouched, so the filter grid keeps its 13 press rows", () => {
    // The ticket changes the strip only. The new article has no RESOURCES_DATA
    // row, so the /resources filter grid does not list it. The Sprout release
    // shows the same gap on origin/main.
    expect(RESOURCES_DATA.filter((d) => d.type === "press")).toHaveLength(13);
    expect(RESOURCES_DATA.map((d) => d.url)).not.toContain(NEW_URL);
  });
});
