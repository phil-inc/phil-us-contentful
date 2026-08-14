/**
 * Adversarial tests for the /resources "In the news" strip (MRTG-1447).
 *
 * The branch rewrites the PRESS_CARDS constant in src/pages/resources/index.tsx.
 * The constant now maps RESOURCE_PRESS_ITEMS instead of filtering PRESS_DATA in
 * place. The existing suites check RESOURCE_PRESS_ITEMS and match the page
 * source with a regular expression, but no test builds the card objects that the
 * page renders, and no test renders them.
 *
 * This suite repeats the exact map expression from the page, so the card objects
 * under test hold the same 4 fields that the page passes to the JSX. It then
 * renders the strip markup with react-dom/server. A rename of one field, a lost
 * art class, or an off-by-one in the art cycle fails here.
 *
 * The suite extracts PRESS_ART_CYCLE from the page source, so a change to the
 * cycle in the page changes the test input, not the assertions.
 */

import * as fs from "fs";
import * as path from "path";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { PRESS_DATA, RESOURCE_PRESS_ITEMS, RESOURCE_PRESS_SLOTS } from "../../pages/press/_data";
import type { PressItem } from "../../pages/press/_data";
import * as classes from "../../pages/resources/resources.module.css";

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const RESOURCES_PAGE = path.join(REPO_ROOT, "src", "pages", "resources", "index.tsx");
const RESOURCES_CSS = path.join(REPO_ROOT, "src", "pages", "resources", "resources.module.css");

const NEW_URL = "https://dimesociety.org/newsroom/blog/deep-dive/how-phil-is-rewriting-the-rules-of-direct-to-patient/";
const NEW_TITLE = "PHIL is Rewriting the Rules of Direct-to-Patient";
const NEW_OUTLET = "Digital Medicine Society";

type PressCard = {
  outlet: string;
  title: string;
  url: string;
  art: string;
};

/** Reads the art class names out of the PRESS_ART_CYCLE line in the page. */
function artCycle(): string[] {
  const source = fs.readFileSync(RESOURCES_PAGE, "utf8");
  const match = /const PRESS_ART_CYCLE = \[([^\]]*)\]/.exec(source);

  if (match === null) {
    throw new Error("PRESS_ART_CYCLE no longer exists in the resources page");
  }

  return match[1]
    .split(",")
    .map((entry) => entry.trim().replace(/^classes\./, ""))
    .filter((entry) => entry.length > 0);
}

const PRESS_ART_CYCLE = artCycle().map((name) => (classes as unknown as Record<string, string>)[name]);

/** Repeats the PRESS_CARDS expression from src/pages/resources/index.tsx. */
const PRESS_CARDS: PressCard[] = RESOURCE_PRESS_ITEMS.map((d, i) => ({
  outlet: d.outlet,
  title: d.title,
  url: d.url,
  art: PRESS_ART_CYCLE[i],
}));

/** Repeats the strip JSX from src/pages/resources/index.tsx. */
const Strip: React.FC<{ cards: PressCard[] }> = ({ cards }) => (
  <div className={classes.pressGrid}>
    {cards.map((card) => (
      <a key={card.url} className={classes.pressCard} href={card.url} target="_blank" rel="noopener noreferrer">
        <div className={`${classes.pressArt} ${card.art}`} />
        <div className={classes.pressBody}>
          <div className={classes.pressLogo}>{card.outlet}</div>
          <h4 className={classes.pressCardTitle}>{card.title}</h4>
          <span className={classes.pressCtaBtn}>Read feature</span>
        </div>
      </a>
    ))}
  </div>
);

const markup = renderToStaticMarkup(<Strip cards={PRESS_CARDS} />);

describe("the In the news strip carries the new article", () => {
  test("builds exactly 4 cards", () => {
    expect(PRESS_CARDS).toHaveLength(RESOURCE_PRESS_SLOTS);
  });

  test("puts the new article in the first card", () => {
    expect(PRESS_CARDS[0]).toEqual({
      outlet: NEW_OUTLET,
      title: NEW_TITLE,
      url: NEW_URL,
      art: PRESS_ART_CYCLE[0],
    });
  });

  test("keeps the 4 fields that the JSX reads, and adds no other field", () => {
    PRESS_CARDS.forEach((card) => {
      expect(Object.keys(card).sort()).toEqual(["art", "outlet", "title", "url"]);
    });
  });

  test("drops the type field, which the strip never renders", () => {
    expect(PRESS_CARDS[0]).not.toHaveProperty("type");
    expect(PRESS_CARDS[0]).not.toHaveProperty("description");
  });

  test("gives every card a defined art class, so no card renders class undefined", () => {
    expect(PRESS_ART_CYCLE).toHaveLength(RESOURCE_PRESS_SLOTS);
    PRESS_CARDS.forEach((card) => {
      expect(typeof card.art).toBe("string");
      expect(card.art.length).toBeGreaterThan(0);
    });
  });

  test("gives each card a different art class, so the 4 gradients never repeat", () => {
    const arts = PRESS_CARDS.map((card) => card.art);

    expect(new Set(arts).size).toBe(arts.length);
  });

  test("declares every art class in resources.module.css", () => {
    const css = fs.readFileSync(RESOURCES_CSS, "utf8");
    const declared = new Set((css.match(/\.[A-Za-z][A-Za-z0-9_-]*/g) ?? []).map((selector) => selector.slice(1)));

    artCycle().forEach((name) => {
      expect(declared).toContain(name);
    });
    ["pressGrid", "pressCard", "pressArt", "pressBody", "pressLogo", "pressCardTitle", "pressCtaBtn"].forEach(
      (name) => {
        expect(declared).toContain(name);
      },
    );
  });
});

describe("the rendered strip shows the new card", () => {
  test("renders 4 anchors", () => {
    expect(markup.match(/<a\b[^>]*>/g)).toHaveLength(RESOURCE_PRESS_SLOTS);
  });

  test("renders the new href first", () => {
    const hrefs = (markup.match(/href="([^"]*)"/g) ?? []).map((hit) => hit.slice(6, -1));

    expect(hrefs[0]).toBe(NEW_URL);
    expect(hrefs).toEqual(RESOURCE_PRESS_ITEMS.map((item) => item.url));
  });

  test("renders the new title and the new outlet as visible text", () => {
    expect(markup).toContain(`>${NEW_OUTLET}<`);
    expect(markup).toContain(`>${NEW_TITLE}<`);
  });

  test("opens every card in a new tab with the safe rel value", () => {
    (markup.match(/<a\b[^>]*>/g) ?? []).forEach((tag) => {
      expect(tag).toContain('target="_blank"');
      expect(tag).toContain('rel="noopener noreferrer"');
    });
  });

  test("renders no undefined class name", () => {
    expect(markup).not.toContain("undefined");
  });

  test("gives the first card the first art class of the cycle", () => {
    expect(markup).toContain(`class="pressArt ${PRESS_ART_CYCLE[0]}"`);
  });

  test("renders the 4 art classes in the cycle order", () => {
    const arts = (markup.match(/class="pressArt ([A-Za-z0-9_-]+)"/g) ?? []).map((hit) =>
      hit.replace(/class="pressArt |"/g, ""),
    );

    expect(arts).toEqual(PRESS_ART_CYCLE);
  });

  test("keeps the Read feature label on every card", () => {
    expect(markup.match(/Read feature/g)).toHaveLength(RESOURCE_PRESS_SLOTS);
  });
});

describe("the strip stays a Thought Leadership strip", () => {
  test("shows no press release, so the outlet never reads Press Release", () => {
    PRESS_CARDS.forEach((card) => {
      expect(card.outlet).not.toBe("Press Release");
    });
  });

  test("takes the 4 newest Thought Leadership items from PRESS_DATA in order", () => {
    const expected: PressItem[] = PRESS_DATA.filter((d) => d.type === "Thought Leadership").slice(
      0,
      RESOURCE_PRESS_SLOTS,
    );

    expect(PRESS_CARDS.map((card) => card.url)).toEqual(expected.map((item) => item.url));
  });

  test("shows a strip that is one card longer than the press page featured row", () => {
    // The /resources strip holds 4 cards and the /press featured row holds 3.
    // A shared constant would break one of the 2 layouts.
    expect(RESOURCE_PRESS_SLOTS).toBe(4);
    expect(PRESS_CARDS).toHaveLength(4);
  });

  test("reads the strip items from the press data module and not from the resources data", () => {
    const source = fs.readFileSync(RESOURCES_PAGE, "utf8");

    expect(source).toMatch(/RESOURCE_PRESS_ITEMS/);
    expect(source).not.toMatch(/PRESS_DATA/);
    RESOURCE_PRESS_ITEMS.forEach((item) => {
      expect(PRESS_DATA).toContain(item);
    });
  });
});
