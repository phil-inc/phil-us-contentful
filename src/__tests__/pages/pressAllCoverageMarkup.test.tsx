/**
 * Adversarial markup tests for the /press All Coverage grid (MRTG-1447).
 *
 * pressAllCoverageGrid.test.tsx proves the href, the target, and the rel of
 * each card. This suite attacks 3 gaps that the other suite leaves open.
 *
 * 1. The class contract. The refactor moved the card JSX out of
 *    src/pages/press/index.tsx into src/pages/press/_AllCoverageGrid.tsx. A
 *    renamed or dropped class breaks the layout but breaks no href assertion.
 *    These tests pin every class name, and they check each name against
 *    press.module.css, so a typo cannot pass.
 * 2. The markup parity. The component must emit the same tree as the inline
 *    JSX on origin/main. These tests hold that tree as a literal string.
 * 3. The component contract under a hostile item. The component takes any
 *    PressItem, so these tests feed it a long title, an empty list, and a
 *    duplicate url.
 *
 * The suite renders with react-dom/server, the same way the sibling suite does.
 * jest.config.ts maps press.module.css to jest/cssModuleStub.cjs, which returns
 * each key as its own class name, so a class name appears verbatim in the
 * markup.
 */

import * as fs from "fs";
import * as path from "path";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { AllCoverageGrid } from "../../pages/press/_AllCoverageGrid";
import AllCoverageGridDefault from "../../pages/press/_AllCoverageGrid";
import { FEATURED_THOUGHT, PRESS_DATA, getPageItems } from "../../pages/press/_data";
import type { PressItem } from "../../pages/press/_data";

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const PRESS_CSS = path.join(REPO_ROOT, "src", "pages", "press", "press.module.css");
const GRID_FILE = path.join(REPO_ROOT, "src", "pages", "press", "_AllCoverageGrid.tsx");

const NEW_URL = "https://dimesociety.org/newsroom/blog/deep-dive/how-phil-is-rewriting-the-rules-of-direct-to-patient/";
const NEW_TITLE = "PHIL is Rewriting the Rules of Direct-to-Patient";
const NEW_OUTLET = "Digital Medicine Society";

/** The 6 class names that one All Coverage card and its wrapper use. */
const CARD_CLASSES = ["pressGrid", "pressCard", "pressArt", "pressBody", "pressLogo", "pressCardTitle"];

function render(items: PressItem[]): string {
  return renderToStaticMarkup(<AllCoverageGrid items={items} />);
}

/** Reads every class selector that press.module.css declares. */
function cssClassNames(): Set<string> {
  const css = fs.readFileSync(PRESS_CSS, "utf8");

  return new Set((css.match(/\.[A-Za-z][A-Za-z0-9_-]*/g) ?? []).map((selector) => selector.slice(1)));
}

describe("the All Coverage card keeps its class contract", () => {
  const markup = render(getPageItems(1));

  test("renders no undefined class, which a broken CSS module stub would produce", () => {
    // A class value of undefined means the test renders an unstyled page and
    // proves nothing about the layout that a visitor sees.
    expect(markup).not.toContain('class="undefined"');
    expect(markup).not.toContain("class=\"\"");
    expect(markup).toContain("class=");
  });

  test("renders every one of the 6 card classes", () => {
    CARD_CLASSES.forEach((name) => {
      expect(markup).toContain(`class="${name}"`);
    });
  });

  test("declares every rendered class in press.module.css", () => {
    const declared = cssClassNames();

    CARD_CLASSES.forEach((name) => {
      expect(declared).toContain(name);
    });
  });

  test("declares every classes.* name that the component reads in press.module.css", () => {
    const source = fs.readFileSync(GRID_FILE, "utf8");
    const used = Array.from(new Set((source.match(/classes\.[A-Za-z0-9_]+/g) ?? []).map((hit) => hit.slice(8))));
    const declared = cssClassNames();

    expect(used.length).toBeGreaterThan(0);
    used.forEach((name) => {
      expect(declared).toContain(name);
    });
  });

  test("wraps the cards in one pressGrid container and nothing else", () => {
    expect(markup.match(/class="pressGrid"/g)).toHaveLength(1);
    expect(markup.startsWith('<div class="pressGrid">')).toBe(true);
    expect(markup.endsWith("</div>")).toBe(true);
  });

  test("gives each of the 6 cards one pressCard anchor and one art block", () => {
    expect(markup.match(/class="pressCard"/g)).toHaveLength(6);
    expect(markup.match(/class="pressArt"/g)).toHaveLength(6);
    expect(markup.match(/class="pressLogo"/g)).toHaveLength(6);
    expect(markup.match(/class="pressCardTitle"/g)).toHaveLength(6);
  });
});

describe("the component emits the same markup as the deleted inline JSX", () => {
  test("renders the new card exactly as origin/main rendered a card", () => {
    // The literal below repeats the tree that the inline JSX on origin/main
    // produced: an anchor, an empty art div, and a body div that holds the
    // outlet div and the h4 title.
    const expected =
      '<div class="pressGrid">' +
      `<a class="pressCard" href="${NEW_URL}" target="_blank" rel="noopener noreferrer">` +
      '<div class="pressArt"></div>' +
      '<div class="pressBody">' +
      `<div class="pressLogo">${NEW_OUTLET}</div>` +
      `<h4 class="pressCardTitle">${NEW_TITLE}</h4>` +
      "</div></a></div>";

    expect(render([PRESS_DATA[0]])).toBe(expected);
  });

  test("prints the title inside an h4, so the heading level stays the same", () => {
    expect(render([PRESS_DATA[0]])).toMatch(
      new RegExp(`<h4 class="pressCardTitle">${NEW_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</h4>`),
    );
  });

  test("prints the outlet in a div and never inside the heading", () => {
    const cardMarkup = render([PRESS_DATA[0]]);

    expect(cardMarkup).toContain(`<div class="pressLogo">${NEW_OUTLET}</div>`);
    expect(cardMarkup).not.toContain(`<h4 class="pressCardTitle">${NEW_OUTLET}`);
  });

  test("renders the art block empty, because the card shows a gradient only", () => {
    expect(render([PRESS_DATA[0]])).toContain('<div class="pressArt"></div>');
  });

  test("renders no description text, even for an item that declares one", () => {
    const withDescription = PRESS_DATA.find((item) => item.description !== undefined);

    expect(withDescription).toBeDefined();
    expect(render([withDescription as PressItem])).not.toContain(String(withDescription?.description));
  });

  test("exports the same component as a named export and as the default export", () => {
    expect(AllCoverageGridDefault).toBe(AllCoverageGrid);
    expect(renderToStaticMarkup(<AllCoverageGridDefault items={[PRESS_DATA[0]]} />)).toBe(render([PRESS_DATA[0]]));
  });
});

describe("the component survives a hostile item list", () => {
  test("renders an empty grid container for an empty list, and no anchor", () => {
    expect(render([])).toBe('<div class="pressGrid"></div>');
  });

  test("renders one card for a one item list", () => {
    expect(render([PRESS_DATA[0]]).match(/<a /g)).toHaveLength(1);
  });

  test("renders every item of a list longer than one page", () => {
    expect(render(PRESS_DATA).match(/<a /g)).toHaveLength(PRESS_DATA.length);
  });

  test("escapes a url that holds a quote, so no attribute can break out", () => {
    const item: PressItem = {
      title: "Quote",
      outlet: "Outlet",
      type: "Release",
      url: 'https://example.com/a"onmouseover="alert(1)',
    };

    const markup = render([item]);

    expect(markup).not.toContain('"onmouseover="');
    expect(markup).toContain("&quot;");
  });

  test("keeps target and rel on a card whose title holds markup", () => {
    const item: PressItem = {
      title: "<img src=x onerror=alert(1)>",
      outlet: "<b>Outlet</b>",
      type: "Thought Leadership",
      url: "https://example.com/b",
    };

    const markup = render([item]);

    expect(markup).not.toContain("<img");
    expect(markup).not.toContain("<b>");
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener noreferrer"');
  });

  test("renders an empty title and an empty outlet without a crash", () => {
    const item: PressItem = { title: "", outlet: "", type: "Release", url: "https://example.com/c" };

    expect(() => render([item])).not.toThrow();
    expect(render([item])).toContain('<h4 class="pressCardTitle"></h4>');
  });

  test("renders a very long title in full, so the grid never truncates the text", () => {
    const long = "A".repeat(400);
    const item: PressItem = { title: long, outlet: "Outlet", type: "Release", url: "https://example.com/d" };

    expect(render([item])).toContain(long);
  });

  test("keeps the same markup on a second render, so the component holds no state", () => {
    expect(render(getPageItems(1))).toBe(render(getPageItems(1)));
    expect(render(FEATURED_THOUGHT)).toBe(render(FEATURED_THOUGHT));
  });

  test("mutates no input array and no input item", () => {
    const items = getPageItems(1);
    const before = JSON.stringify(items);

    render(items);

    expect(JSON.stringify(items)).toBe(before);
    expect(PRESS_DATA).toHaveLength(14);
    expect(PRESS_DATA[0].url).toBe(NEW_URL);
  });
});

describe("every rendered card links out safely", () => {
  test("adds target and rel to every card on every page", () => {
    for (let page = 1; page <= 3; page += 1) {
      const anchors = render(getPageItems(page)).match(/<a\b[^>]*>/g) ?? [];

      expect(anchors.length).toBeGreaterThan(0);
      anchors.forEach((tag) => {
        expect(tag).toContain('target="_blank"');
        expect(tag).toContain('rel="noopener noreferrer"');
      });
    }
  });

  test("uses no javascript url and no relative url in PRESS_DATA", () => {
    PRESS_DATA.forEach((item) => {
      expect(item.url.toLowerCase().startsWith("javascript:")).toBe(false);
      expect(item.url.toLowerCase().startsWith("data:")).toBe(false);
      expect(item.url.startsWith("https://")).toBe(true);
    });
  });

  test("renders every href of PRESS_DATA unchanged, with no encoding drift", () => {
    const markup = render(PRESS_DATA);

    PRESS_DATA.forEach((item) => {
      expect(markup).toContain(`href="${item.url}"`);
    });
  });

  test("keeps rel=noopener noreferrer in that exact order and with no extra token", () => {
    const anchors = render(getPageItems(1)).match(/rel="([^"]*)"/g) ?? [];

    expect(anchors).toHaveLength(6);
    anchors.forEach((rel) => {
      expect(rel).toBe('rel="noopener noreferrer"');
    });
  });
});
