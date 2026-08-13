import * as fs from "fs";
import * as path from "path";

import { PRESS_DATA } from "../../pages/press/_data";
import type { PressItem } from "../../pages/press/_data";

/**
 * Tests for the press library data (MRTG-1447).
 *
 * The repository installs no jsdom environment and no React testing library, so
 * these tests exercise the data module and re-derive the exact expressions that
 * src/pages/press/index.tsx and src/pages/resources/index.tsx use. A few tests
 * read the page sources to confirm the derivation constants still hold, because
 * a change to ITEMS_PER_PAGE or to a style cycle length would silently break the
 * expectations below. The dependabot test in this suite sets the precedent for
 * reading a repository file inside a test.
 */

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const PRESS_PAGE = path.join(REPO_ROOT, "src", "pages", "press", "index.tsx");
const RESOURCES_PAGE = path.join(REPO_ROOT, "src", "pages", "resources", "index.tsx");
const DATA_FILE = path.join(REPO_ROOT, "src", "pages", "press", "_data.ts");

/** The entry the ticket adds, exactly as the approved plan states it. */
const NEW_ITEM = {
  title: "PHIL is Rewriting the Rules of Direct-to-Patient",
  outlet: "Digital Medicine Society",
  type: "Thought Leadership" as const,
  url: "https://dimesociety.org/newsroom/blog/deep-dive/how-phil-is-rewriting-the-rules-of-direct-to-patient/",
};

/** Every key PressItem declares. */
const ALLOWED_KEYS = ["title", "description", "outlet", "type", "url"];

/** The two type values PressItem allows. */
const ALLOWED_TYPES = ["Release", "Thought Leadership"];

// Constants that the page modules define. The source checks below keep them true.
const ITEMS_PER_PAGE = 6;
const FEATURED_THOUGHT_SLOTS = 3;
const RESOURCE_CARD_SLOTS = 4;

const thoughtLeadership = (): PressItem[] => PRESS_DATA.filter((d) => d.type === "Thought Leadership");

/** Mirrors FEATURED_THOUGHT in src/pages/press/index.tsx. */
const featuredThought = (): PressItem[] => thoughtLeadership().slice(0, FEATURED_THOUGHT_SLOTS);

/** Mirrors FEATURED_RELEASES in src/pages/press/index.tsx. */
const featuredReleases = (): PressItem[] => PRESS_DATA.filter((d) => d.type === "Release").slice(0, 3);

/** Mirrors PRESS_CARDS in src/pages/resources/index.tsx. */
const pressCards = (): PressItem[] => thoughtLeadership().slice(0, RESOURCE_CARD_SLOTS);

/** Mirrors TOTAL_PAGES in src/pages/press/index.tsx. */
const totalPages = (): number => Math.ceil(PRESS_DATA.length / ITEMS_PER_PAGE);

/** Mirrors the paged slice in src/pages/press/index.tsx. */
const pageItems = (page: number): PressItem[] =>
  PRESS_DATA.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

function readSource(file: string): string {
  return fs.readFileSync(file, "utf8");
}

describe("PRESS_DATA new Digital Medicine Society entry", () => {
  test("sits at the head of the array", () => {
    expect(PRESS_DATA[0]).toEqual(NEW_ITEM);
  });

  test("carries the exact title the ticket states", () => {
    expect(PRESS_DATA[0].title).toBe("PHIL is Rewriting the Rules of Direct-to-Patient");
  });

  test("credits Digital Medicine Society as the outlet", () => {
    expect(PRESS_DATA[0].outlet).toBe("Digital Medicine Society");
  });

  test("uses the Thought Leadership type and not Release", () => {
    expect(PRESS_DATA[0].type).toBe("Thought Leadership");
    expect(PRESS_DATA[0].type).not.toBe("Release");
  });

  test("points at the exact approved url", () => {
    expect(PRESS_DATA[0].url).toBe(NEW_ITEM.url);
  });

  test("uses an https url on the dimesociety.org host", () => {
    const url = new URL(PRESS_DATA[0].url);

    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("dimesociety.org");
  });

  test("keeps the trailing slash the source url uses", () => {
    expect(PRESS_DATA[0].url.endsWith("/")).toBe(true);
  });

  test("adds no query string and no fragment, so no tracking parameter leaks", () => {
    const url = new URL(PRESS_DATA[0].url);

    expect(url.search).toBe("");
    expect(url.hash).toBe("");
  });

  test("declares only keys that PressItem allows", () => {
    Object.keys(PRESS_DATA[0]).forEach((key) => {
      expect(ALLOWED_KEYS).toContain(key);
    });
  });

  test("appears exactly one time in the array", () => {
    const byUrl = PRESS_DATA.filter((d) => d.url === NEW_ITEM.url);
    const byTitle = PRESS_DATA.filter((d) => d.title === NEW_ITEM.title);

    expect(byUrl).toHaveLength(1);
    expect(byTitle).toHaveLength(1);
  });
});

describe("PRESS_DATA array shape", () => {
  test("holds 14 items after the insert", () => {
    expect(PRESS_DATA).toHaveLength(14);
  });

  test("keeps every url unique, because each card uses the url as its React key", () => {
    const urls = PRESS_DATA.map((d) => d.url);

    expect(new Set(urls).size).toBe(urls.length);
  });

  test("keeps every title unique", () => {
    const titles = PRESS_DATA.map((d) => d.title);

    expect(new Set(titles).size).toBe(titles.length);
  });

  test("gives every item a non-empty title, outlet, and url", () => {
    PRESS_DATA.forEach((item, index) => {
      expect(item.title.trim().length).toBeGreaterThan(0);
      expect(item.outlet.trim().length).toBeGreaterThan(0);
      expect(item.url.trim().length).toBeGreaterThan(0);
      expect(typeof item.title).toBe("string");
      expect(index).toBeLessThan(PRESS_DATA.length);
    });
  });

  test("uses no leading or trailing whitespace in any field", () => {
    PRESS_DATA.forEach((item) => {
      expect(item.title).toBe(item.title.trim());
      expect(item.outlet).toBe(item.outlet.trim());
      expect(item.url).toBe(item.url.trim());
    });
  });

  test("gives every item an allowed type", () => {
    PRESS_DATA.forEach((item) => {
      expect(ALLOWED_TYPES).toContain(item.type);
    });
  });

  test("gives every item an absolute https url that URL can parse", () => {
    PRESS_DATA.forEach((item) => {
      expect(item.url.startsWith("https://")).toBe(true);
      expect(() => new URL(item.url)).not.toThrow();
    });
  });

  test("adds a non-empty description when it declares one", () => {
    PRESS_DATA.forEach((item) => {
      if (item.description !== undefined) {
        expect(item.description.trim().length).toBeGreaterThan(0);
      }
    });
  });

  test("preserves the previous order of the 13 earlier items", () => {
    const previousOrder = [
      "Compliance-By-Design: The Critical Layer for Pharma's Direct-to-Patient Play",
      "Protecting Gross-to-Net Performance Through Single-Channel Ecosystems",
      "PHIL Invests in State-of-the-Art Cash Dispense Capabilities, Expanding Direct-to-Patient Fulfillment for Pharma",
      "Tenpoint Therapeutics Ltd and PHIL Partner to Launch YUVEZZI™ Direct-to-Patient Cash Program",
      "Sprout Pharmaceuticals and PHIL Expand Their Affordable Direct-to-Patient Access Program for Addyi",
      "The Hidden GTN Drain: Why Specialty-Lite Brands Need To Streamline The PA Process",
      "Pharma Direct-To-Patient 2.0: From Experiment To Imperative",
      "Harnessing the Power of Comprehensive Data to Drive GTN",
      "Redefining Commercial Success in Specialty-Lite",
      "Bridging Data Gaps that Impact Retail and Specialty-Lite Success",
      "PHIL Launches Direct-to-Patient 2.0 Platform to Transform Access, Affordability, and Adherence in Pharma",
      "Phil Secures $60 Million Growth Capital Facility from K2 HealthVentures to Accelerate AI Integration",
      "Phil Inc. Adds Duchesnay USA’s Women’s Healthcare Product to Its Patient Access Platform",
    ];

    expect(PRESS_DATA.slice(1).map((d) => d.title)).toEqual(previousOrder);
  });

  test("keeps 8 Thought Leadership items and 6 Release items", () => {
    expect(thoughtLeadership()).toHaveLength(8);
    expect(PRESS_DATA.filter((d) => d.type === "Release")).toHaveLength(6);
  });
});

describe("press page Featured Thought Leadership list", () => {
  test("puts the new entry first", () => {
    expect(featuredThought()[0]).toEqual(NEW_ITEM);
  });

  test("holds exactly 3 items", () => {
    expect(featuredThought()).toHaveLength(FEATURED_THOUGHT_SLOTS);
  });

  test("holds the 3 newest Thought Leadership outlets in order", () => {
    expect(featuredThought().map((d) => d.outlet)).toEqual([
      "Digital Medicine Society",
      "Pharmaceutical Commerce",
      "Drug Channels",
    ]);
  });

  test("drops the item that the insert pushed out of the third slot", () => {
    const titles = featuredThought().map((d) => d.title);

    expect(titles).not.toContain(
      "PHIL Invests in State-of-the-Art Cash Dispense Capabilities, Expanding Direct-to-Patient Fulfillment for Pharma",
    );
    expect(titles).not.toContain("The Hidden GTN Drain: Why Specialty-Lite Brands Need To Streamline The PA Process");
  });

  test("holds no Release item, because the filter selects Thought Leadership only", () => {
    featuredThought().forEach((item) => {
      expect(item.type).toBe("Thought Leadership");
    });
  });

  test("uses 3 unique urls, so the React keys stay unique", () => {
    const urls = featuredThought().map((d) => d.url);

    expect(new Set(urls).size).toBe(FEATURED_THOUGHT_SLOTS);
  });

  test("fits the 3 gradient classes that the page declares", () => {
    const source = readSource(PRESS_PAGE);
    const match = /const THOUGHT_GRADIENTS: string\[\] = \[([^\]]*)\]/.exec(source);

    expect(match).not.toBeNull();

    const gradientCount = String(match?.[1]).split(",").filter((entry) => entry.trim().length > 0).length;

    expect(gradientCount).toBe(FEATURED_THOUGHT_SLOTS);
    expect(featuredThought().length).toBeLessThanOrEqual(gradientCount);
  });

  test("leaves the Latest Announcements list unchanged", () => {
    expect(featuredReleases().map((d) => d.title)).toEqual([
      "PHIL Invests in State-of-the-Art Cash Dispense Capabilities, Expanding Direct-to-Patient Fulfillment for Pharma",
      "Tenpoint Therapeutics Ltd and PHIL Partner to Launch YUVEZZI™ Direct-to-Patient Cash Program",
      "Sprout Pharmaceuticals and PHIL Expand Their Affordable Direct-to-Patient Access Program for Addyi",
    ]);
  });
});

describe("press page All Coverage pagination", () => {
  test("reports 3 pages", () => {
    expect(totalPages()).toBe(3);
  });

  test("shows the new entry first on page 1", () => {
    expect(pageItems(1)[0]).toEqual(NEW_ITEM);
  });

  test("fills page 1 and page 2 with 6 items each", () => {
    expect(pageItems(1)).toHaveLength(ITEMS_PER_PAGE);
    expect(pageItems(2)).toHaveLength(ITEMS_PER_PAGE);
  });

  test("puts the remaining 2 items on the last page", () => {
    expect(pageItems(totalPages())).toHaveLength(2);
  });

  test("leaves no page empty", () => {
    for (let page = 1; page <= totalPages(); page += 1) {
      expect(pageItems(page).length).toBeGreaterThan(0);
    }
  });

  test("shows every item exactly one time across the pages", () => {
    const paged: PressItem[] = [];

    for (let page = 1; page <= totalPages(); page += 1) {
      paged.push(...pageItems(page));
    }

    expect(paged).toEqual(PRESS_DATA);
  });

  test("returns an empty slice past the last page, which the currentPage clamp prevents", () => {
    expect(pageItems(totalPages() + 1)).toHaveLength(0);

    const requestedPage = 99;

    expect(Math.min(requestedPage, totalPages())).toBe(3);
    expect(pageItems(Math.min(requestedPage, totalPages()))).toHaveLength(2);
  });

  test("pushes the item that page 1 dropped to the head of page 2", () => {
    expect(pageItems(2)[0].title).toBe(
      "The Hidden GTN Drain: Why Specialty-Lite Brands Need To Streamline The PA Process",
    );
  });
});

describe("resources page press cards", () => {
  test("puts the new entry first", () => {
    expect(pressCards()[0]).toEqual(NEW_ITEM);
  });

  test("holds exactly 4 items", () => {
    expect(pressCards()).toHaveLength(RESOURCE_CARD_SLOTS);
  });

  test("holds the 4 newest Thought Leadership outlets in order", () => {
    expect(pressCards().map((d) => d.outlet)).toEqual([
      "Digital Medicine Society",
      "Pharmaceutical Commerce",
      "Drug Channels",
      "Fierce Pharma",
    ]);
  });

  test("holds no Release item", () => {
    pressCards().forEach((item) => {
      expect(item.type).toBe("Thought Leadership");
    });
  });

  test("fits the 4 art classes that the page declares", () => {
    const source = readSource(RESOURCES_PAGE);
    const match = /const PRESS_ART_CYCLE = \[([^\]]*)\]/.exec(source);

    expect(match).not.toBeNull();

    const artCount = String(match?.[1]).split(",").filter((entry) => entry.trim().length > 0).length;

    expect(artCount).toBe(RESOURCE_CARD_SLOTS);
    expect(pressCards().length).toBeLessThanOrEqual(artCount);
  });

  test("gives every card a defined art class, so no card renders an undefined class name", () => {
    const source = readSource(RESOURCES_PAGE);
    const match = /const PRESS_ART_CYCLE = \[([^\]]*)\]/.exec(source);
    const artClasses = String(match?.[1])
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);

    pressCards().forEach((_card, index) => {
      expect(artClasses[index]).toBeDefined();
    });
  });
});

describe("press data module derivation contract", () => {
  test("the press page still derives its lists from PRESS_DATA", () => {
    const source = readSource(PRESS_PAGE);

    expect(source).toMatch(/import \{ PRESS_DATA \} from "\.\/_data"/);
    expect(source).toMatch(/PRESS_DATA\.filter\(\(d\) => d\.type === "Thought Leadership"\)\.slice\(0, 3\)/);
    expect(source).toMatch(/const ITEMS_PER_PAGE = 6;/);
    expect(source).toMatch(/Math\.ceil\(PRESS_DATA\.length \/ ITEMS_PER_PAGE\)/);
  });

  test("the resources page still derives its cards from PRESS_DATA", () => {
    const source = readSource(RESOURCES_PAGE);

    expect(source).toMatch(/import \{ PRESS_DATA \} from "\.\.\/press\/_data"/);
    expect(source).toMatch(/\.filter\(\(d\) => d\.type === "Thought Leadership"\)/);
    expect(source).toMatch(/\.slice\(0, 4\)/);
  });

  test("the data file exports one PRESS_DATA array and the PressItem type", () => {
    const source = readSource(DATA_FILE);
    const exportCount = (source.match(/export const PRESS_DATA/g) ?? []).length;

    expect(exportCount).toBe(1);
    expect(source).toMatch(/export interface PressItem/);
    expect(Array.isArray(PRESS_DATA)).toBe(true);
  });

  test("the data file keeps LF line endings and one trailing newline", () => {
    const source = readSource(DATA_FILE);

    expect(source).not.toMatch(/\r/);
    expect(source.endsWith("\n")).toBe(true);
    expect(source.endsWith("\n\n")).toBe(false);
  });
});
