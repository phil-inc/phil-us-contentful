/**
 * Render tests for the /press All Coverage grid (MRTG-1447).
 *
 * The repository installs no browser test environment, so the test renders the
 * pure AllCoverageGrid component to static markup with react-dom/server. The
 * page passes the same items to the same component, so these tests prove the
 * card markup that a visitor sees, and not a regular expression on a source file.
 */

import * as fs from "fs";
import * as path from "path";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { AllCoverageGrid } from "../../pages/press/_AllCoverageGrid";
import { FEATURED_THOUGHT, ITEMS_PER_PAGE, getPageItems } from "../../pages/press/_data";
import type { PressItem } from "../../pages/press/_data";

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const PRESS_PAGE = path.join(REPO_ROOT, "src", "pages", "press", "index.tsx");

const NEW_URL = "https://dimesociety.org/newsroom/blog/deep-dive/how-phil-is-rewriting-the-rules-of-direct-to-patient/";
const NEW_TITLE = "PHIL is Rewriting the Rules of Direct-to-Patient";
const NEW_OUTLET = "Digital Medicine Society";

type Anchor = {
  tag: string;
  href: string;
  target: string;
  rel: string;
};

function render(items: PressItem[]): string {
  return renderToStaticMarkup(<AllCoverageGrid items={items} />);
}

function attribute(tag: string, name: string): string {
  const match = new RegExp(`${name}="([^"]*)"`).exec(tag);

  return match === null ? "" : match[1];
}

function anchors(markup: string): Anchor[] {
  return (markup.match(/<a\b[^>]*>/g) ?? []).map((tag) => ({
    tag,
    href: attribute(tag, "href"),
    target: attribute(tag, "target"),
    rel: attribute(tag, "rel"),
  }));
}

describe("All Coverage grid renders the new card", () => {
  const markup = render(getPageItems(1));
  const cards = anchors(markup);

  test("renders one card for every item on page 1", () => {
    expect(cards).toHaveLength(ITEMS_PER_PAGE);
  });

  test("renders the new card first", () => {
    expect(cards[0].href).toBe(NEW_URL);
  });

  test("renders the new title and the new outlet as text", () => {
    expect(markup).toContain(`>${NEW_OUTLET}<`);
    expect(markup).toContain(`>${NEW_TITLE}<`);
  });

  test("opens the new card in a new tab", () => {
    expect(cards[0].target).toBe("_blank");
  });

  test("adds rel=noopener noreferrer to the new card", () => {
    expect(cards[0].rel).toBe("noopener noreferrer");
  });

  test("opens every card in a new tab with the same rel value", () => {
    cards.forEach((card) => {
      expect(card.target).toBe("_blank");
      expect(card.rel).toBe("noopener noreferrer");
    });
  });

  test("renders the outlet above the title, like the other cards", () => {
    expect(markup.indexOf(NEW_OUTLET)).toBeLessThan(markup.indexOf(NEW_TITLE));
  });

  test("renders the exact url, with no query string and no extra path", () => {
    expect(cards[0].href).toBe(NEW_URL);
    expect(cards[0].href).not.toContain("?");
    expect(cards[0].href).not.toContain("&amp;");
  });

  test("renders one card for every item, with a unique href", () => {
    const hrefs = cards.map((card) => card.href);

    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toEqual(getPageItems(1).map((item) => item.url));
  });

  test("renders no card for an empty list", () => {
    expect(anchors(render([]))).toHaveLength(0);
  });

  test("renders the new card in the Featured Thought Leadership list too", () => {
    expect(FEATURED_THOUGHT[0].url).toBe(NEW_URL);
    expect(anchors(render(FEATURED_THOUGHT))[0].href).toBe(NEW_URL);
  });

  test("escapes a title that holds a special character", () => {
    const item: PressItem = {
      title: "A & B <script>",
      outlet: "Test Outlet",
      type: "Thought Leadership",
      url: "https://example.com/a",
    };

    const escaped = render([item]);

    expect(escaped).toContain("A &amp; B &lt;script&gt;");
    expect(escaped).not.toContain("<script>");
  });
});

describe("the press page renders the All Coverage grid component", () => {
  test("passes the current page items to the component", () => {
    const source = fs.readFileSync(PRESS_PAGE, "utf8");

    expect(source).toMatch(/import \{ AllCoverageGrid \} from "\.\/_AllCoverageGrid"/);
    expect(source).toMatch(/<AllCoverageGrid items=\{paged\} \/>/);
    expect(source).toMatch(/const paged = getPageItems\(currentPage\);/);
  });
});
