import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

import { ITEMS_PER_PAGE, PRESS_DATA, TOTAL_PAGES, getPageItems } from "../../pages/press/_data";
import type { PressItem } from "../../pages/press/_data";

/**
 * Adversarial tests for the /press page-number guard (MRTG-1447).
 *
 * A reviewer called the guard untestable. The refactor moved getPageItems into
 * the pure data module, but the guard itself still lives in
 * src/pages/press/index.tsx, next to a React import and a CSS module import.
 * The jest environment is "node" and maps no CSS module, so a test cannot
 * import that page.
 *
 * The other 2 press suites therefore assert the guard with a regular
 * expression, which proves that the text exists but not that it works. This
 * suite extracts the guard functions from the real page source, compiles them,
 * and runs them. It then feeds the guard output into getPageItems, which is the
 * exact chain the page runs. A regular expression cannot catch an off-by-one in
 * the clamp; this chain can.
 *
 * The suite also pins the getPageItems edge values as literals. The
 * pressDataDerivations suite compares getPageItems against a copy of the old
 * inline slice, so both sides share any slice mistake. Literal values do not.
 */

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const PRESS_PAGE = path.join(REPO_ROOT, "src", "pages", "press", "index.tsx");
const PAGINATION = path.join(REPO_ROOT, "src", "components", "common", "Pagination", "Pagination.tsx");

/** Returns the full text of one top level function declaration. */
function extractFunction(source: string, name: string): string {
  const start = source.indexOf(`function ${name}`);

  if (start < 0) {
    throw new Error(`${name} no longer exists in the source file`);
  }

  const open = source.indexOf("{", start);
  let depth = 0;

  for (let i = open; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;

      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  throw new Error(`${name} has no closing brace`);
}

/**
 * Compiles the named functions out of a page file and returns them.
 * The snippet holds function declarations only, so it runs no import and no
 * React code.
 */
function loadFunctions(file: string, names: string[]): Record<string, (...args: never[]) => unknown> {
  const source = fs.readFileSync(file, "utf8");
  const snippet = names.map((name) => extractFunction(source, name)).join("\n\n");
  const js = ts.transpileModule(`${snippet}\nmodule.exports = { ${names.join(", ")} };`, {
    compilerOptions: { target: ts.ScriptTarget.ES2019, module: ts.ModuleKind.CommonJS },
  }).outputText;
  const shim = { exports: {} as Record<string, (...args: never[]) => unknown> };

  // eslint-disable-next-line no-new-func
  new Function("module", "exports", js)(shim, shim.exports);

  return shim.exports;
}

const pressGuards = loadFunctions(PRESS_PAGE, ["parsePageFromSearch", "serializePageToSearch"]);
const paginationHelpers = loadFunctions(PAGINATION, ["getPageRange"]);

const parsePageFromSearch = pressGuards.parsePageFromSearch as unknown as (search: string) => number;
const serializePageToSearch = pressGuards.serializePageToSearch as unknown as (page: number) => string;
const getPageRange = paginationHelpers.getPageRange as unknown as (
  current: number,
  total: number,
) => (number | "ellipsis")[];

/** Repeats the clamp that the press page applies before it renders the grid. */
function renderedPage(search: string): number {
  return Math.min(parsePageFromSearch(search), TOTAL_PAGES);
}

/** Runs the whole chain that the press page runs for one url. */
function renderedItems(search: string): PressItem[] {
  return getPageItems(renderedPage(search));
}

/** Query strings that a user, a crawler, or an attacker can put in the url. */
const HOSTILE_SEARCHES = [
  "",
  "?",
  "?page=",
  "?page=1",
  "?page=2",
  "?page=3",
  "?page=4",
  "?page=999",
  "?page=0",
  "?page=-1",
  "?page=-999",
  "?page=1.5",
  "?page=2.9999",
  "?page=abc",
  "?page=null",
  "?page=undefined",
  "?page=NaN",
  "?page=Infinity",
  "?page=-Infinity",
  "?page=1e1",
  "?page=0x2",
  "?page=03",
  "?page=%202",
  "?page=+2",
  "?page=2&page=3",
  "?page[]=2",
  "?PAGE=2",
  "?foo=bar",
  "?page=9007199254740993",
  "?page=<script>alert(1)</script>",
  "?page=' OR 1=1--",
  "?page=../../etc/passwd",
  "%%%",
];

describe("the real guard in press/index.tsx, compiled and executed", () => {
  test("returns page 1 for every input that is not a whole number of at least 1", () => {
    const rejected = [
      "",
      "?",
      "?page=",
      "?page=0",
      "?page=-1",
      "?page=-999",
      "?page=1.5",
      "?page=2.9999",
      "?page=abc",
      "?page=null",
      "?page=undefined",
      "?page=NaN",
      "?page=Infinity",
      "?page=-Infinity",
      "?page=<script>alert(1)</script>",
      "?foo=bar",
      "?PAGE=2",
      "?page[]=2",
    ];

    rejected.forEach((search) => {
      expect(parsePageFromSearch(search)).toBe(1);
    });
  });

  test("accepts each real page number", () => {
    expect(parsePageFromSearch("?page=1")).toBe(1);
    expect(parsePageFromSearch("?page=2")).toBe(2);
    expect(parsePageFromSearch("?page=3")).toBe(3);
  });

  test("accepts a number above the last page and leaves the clamp to cap it", () => {
    expect(parsePageFromSearch("?page=999")).toBe(999);
    expect(renderedPage("?page=999")).toBe(TOTAL_PAGES);
    expect(renderedItems("?page=999")).toEqual(getPageItems(TOTAL_PAGES));
  });

  test("takes the first value when the url repeats the page parameter", () => {
    expect(parsePageFromSearch("?page=2&page=3")).toBe(2);
    expect(renderedItems("?page=2&page=3")).toEqual(getPageItems(2));
  });

  test("never hands getPageItems a value outside 1..TOTAL_PAGES", () => {
    HOSTILE_SEARCHES.forEach((search) => {
      const page = renderedPage(search);

      expect(Number.isInteger(page)).toBe(true);
      expect(page).toBeGreaterThanOrEqual(1);
      expect(page).toBeLessThanOrEqual(TOTAL_PAGES);
    });
  });

  test("never renders an empty All Coverage grid, whatever the url holds", () => {
    HOSTILE_SEARCHES.forEach((search) => {
      const items = renderedItems(search);

      expect(items.length).toBeGreaterThan(0);
      expect(items.length).toBeLessThanOrEqual(ITEMS_PER_PAGE);
      items.forEach((item) => {
        expect(PRESS_DATA).toContain(item);
      });
    });
  });

  test("shows the new Digital Medicine Society card first for every rejected url", () => {
    ["", "?", "?page=0", "?page=-1", "?page=1.5", "?page=abc", "?page=1"].forEach((search) => {
      expect(renderedItems(search)[0].outlet).toBe("Digital Medicine Society");
    });
  });

  test("survives a url that URLSearchParams cannot decode", () => {
    // The guard wraps the parse in a try block, so a bad escape returns page 1.
    expect(parsePageFromSearch("%%%")).toBe(1);
    expect(parsePageFromSearch("?page=%E0%A4%A")).toBe(1);
    expect(renderedItems("%%%")).toHaveLength(ITEMS_PER_PAGE);
  });

  test("round trips every real page through the url and back", () => {
    for (let page = 1; page <= TOTAL_PAGES; page += 1) {
      const search = serializePageToSearch(page);

      expect(parsePageFromSearch(search)).toBe(page);
      expect(getPageItems(parsePageFromSearch(search))).toEqual(getPageItems(page));
    }
  });

  test("writes no query string for page 1, so /press stays the canonical url", () => {
    expect(serializePageToSearch(1)).toBe("");
    expect(serializePageToSearch(0)).toBe("");
    expect(serializePageToSearch(-5)).toBe("");
    expect(serializePageToSearch(2)).toBe("?page=2");
    expect(serializePageToSearch(TOTAL_PAGES)).toBe(`?page=${TOTAL_PAGES}`);
  });
});

describe("the real Pagination range, compiled and executed", () => {
  test("lists every page and no ellipsis while TOTAL_PAGES stays 3", () => {
    for (let current = 1; current <= TOTAL_PAGES; current += 1) {
      expect(getPageRange(current, TOTAL_PAGES)).toEqual([1, 2, 3]);
    }
  });

  test("every numbered button leads to a full or partly full grid", () => {
    const buttons = getPageRange(1, TOTAL_PAGES).filter((entry): entry is number => entry !== "ellipsis");

    expect(buttons).toHaveLength(TOTAL_PAGES);
    buttons.forEach((page) => {
      expect(getPageItems(page).length).toBeGreaterThan(0);
    });
  });

  test("every enabled arrow click leads to a page that holds cards", () => {
    for (let current = 1; current <= TOTAL_PAGES; current += 1) {
      if (current > 1) {
        expect(getPageItems(current - 1).length).toBeGreaterThan(0);
      }

      if (current < TOTAL_PAGES) {
        expect(getPageItems(current + 1).length).toBeGreaterThan(0);
      }
    }
  });

  test("the disabled arrows matter, because the pages beyond the ends hold nothing", () => {
    // The component disables Previous at page 1 and Next at the last page. If a
    // future edit drops either guard, the grid renders empty.
    expect(getPageItems(0)).toEqual([]);
    expect(getPageItems(TOTAL_PAGES + 1)).toEqual([]);
  });
});

describe("getPageItems edge values, pinned as literals", () => {
  /** Reads the outlet of each card, which the All Coverage card prints. */
  const outlets = (page: number): string[] => getPageItems(page).map((item) => item.outlet);

  test("page 1 holds the 6 cards the ticket expects, with the new outlet first", () => {
    expect(outlets(1)).toEqual([
      "Digital Medicine Society",
      "Pharmaceutical Commerce",
      "Drug Channels",
      "Press Release",
      "Press Release",
      "Press Release",
    ]);
  });

  test("page 2 holds 6 cards and page 3 holds the last 2", () => {
    expect(outlets(2)).toEqual([
      "Fierce Pharma",
      "Life Science Leader",
      "Drug Channels",
      "Biopharma Dive",
      "Biopharma Dive",
      "Press Release",
    ]);
    expect(outlets(3)).toEqual(["Press Release", "Press Release"]);
  });

  test("page 0 returns nothing", () => {
    expect(getPageItems(0)).toEqual([]);
    expect(getPageItems(-0)).toEqual([]);
  });

  test("the fraction 0.5 returns nothing, because the slice start passes the slice end", () => {
    expect(getPageItems(0.5)).toEqual([]);
  });

  test("a fraction just below 1 returns a short 5 card window, so the guard must reject it", () => {
    // The start index is a small negative number. Array.prototype.slice
    // truncates it toward zero, so the window starts at the first item but ends
    // one item early. A page like this would render a ragged grid.
    [0.9, 0.99, 0.999_999].forEach((page) => {
      expect(outlets(page)).toEqual([
        "Digital Medicine Society",
        "Pharmaceutical Commerce",
        "Drug Channels",
        "Press Release",
        "Press Release",
        "Press Release",
      ].slice(0, 5));
    });
    expect(getPageItems(0.999_999)).toHaveLength(ITEMS_PER_PAGE - 1);
    expect(parsePageFromSearch("?page=0.999999")).toBe(1);
    expect(renderedItems("?page=0.999999")).toHaveLength(ITEMS_PER_PAGE);
  });

  test("a page past the last page returns nothing", () => {
    [TOTAL_PAGES + 1, 5, 42, 1e6, Number.MAX_SAFE_INTEGER, Number.POSITIVE_INFINITY].forEach((page) => {
      expect(getPageItems(page)).toEqual([]);
    });
  });

  test("NaN returns nothing", () => {
    expect(getPageItems(Number.NaN)).toEqual([]);
  });

  test("a negative page slices from the end, which is why the guard rejects it", () => {
    // Array.prototype.slice reads a negative index from the end of the array.
    // The guard in index.tsx never passes a negative number, so no user sees
    // this. The literals record the raw behaviour of the exported function.
    expect(outlets(-1)).toEqual([
      "Drug Channels",
      "Press Release",
      "Press Release",
      "Press Release",
      "Fierce Pharma",
      "Life Science Leader",
    ]);
    expect(outlets(-2)).toEqual(["Digital Medicine Society", "Pharmaceutical Commerce"]);
    expect(getPageItems(-3)).toEqual([]);
    expect(getPageItems(-1e6)).toEqual([]);
  });

  test("a fraction above 1 slices a shifted window, which is why the guard rejects it", () => {
    expect(outlets(1.5)).toEqual([
      "Press Release",
      "Press Release",
      "Press Release",
      "Fierce Pharma",
      "Life Science Leader",
      "Drug Channels",
    ]);
    expect(getPageItems(2.5)).toHaveLength(5);
    expect(getPageItems(3.5)).toEqual([]);
    expect(getPageItems(1.5)).not.toEqual(getPageItems(1));
    expect(getPageItems(1.5)).not.toEqual(getPageItems(2));
  });

  test("no edge input ever returns more than one page of cards", () => {
    [-3, -2, -1, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 99, Number.NaN].forEach((page) => {
      expect(getPageItems(page).length).toBeLessThanOrEqual(ITEMS_PER_PAGE);
    });
  });

  test("no edge input ever returns an item that PRESS_DATA does not hold", () => {
    [-3, -2, -1, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 99].forEach((page) => {
      getPageItems(page).forEach((item) => {
        expect(PRESS_DATA).toContain(item);
      });
    });
  });
});
