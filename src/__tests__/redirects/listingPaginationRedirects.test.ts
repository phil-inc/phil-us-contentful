import fs from "fs";
import path from "path";

/**
 * The Resources and Press listings' pages moved from <listing>/?page=n to
 * static pages at <listing>/page/n/. These tests read netlify.toml and check
 * the 301s for the old query form, including the rules that must NOT exist.
 *
 * netlify.toml is parsed with a small reader instead of a TOML library, because
 * the repo declares no TOML dependency.
 */

type Redirect = {
  from: string;
  to: string;
  status?: number;
  force?: boolean;
  query?: string;
  order: number;
};

const netlifyTomlPath = path.resolve(__dirname, "../../../netlify.toml");

const readRedirects = (): Redirect[] => {
  const source = fs.readFileSync(netlifyTomlPath, "utf8");
  const blocks = source.split(/^\[\[redirects\]\]\s*$/m).slice(1);

  return blocks.map((block, index) => {
    // Stop at the next table header so a block never absorbs the following one.
    const body = block.split(/^\[/m)[0];
    const readString = (key: string): string | undefined =>
      new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m").exec(body)?.[1];

    const status = /^status\s*=\s*(\d+)/m.exec(body);
    const force = /^force\s*=\s*(true|false)/m.exec(body);
    const query = /^query\s*=\s*(\{[^}]*\})/m.exec(body);

    return {
      from: readString("from") ?? "",
      to: readString("to") ?? "",
      status: status ? Number(status[1]) : undefined,
      force: force ? force[1] === "true" : undefined,
      query: query?.[1].replace(/\s+/g, ""),
      order: index,
    };
  });
};

const redirects = readRedirects();
const pageRules = redirects.filter((rule) => rule.query === '{page=":page"}');

describe.each(["/resources/", "/press/"])("netlify.toml — %s?page=n to %spage/n/", (listing) => {
  const rules = pageRules.filter((rule) => rule.from === listing);

  test("?page=n redirects to the page's path with a 301", () => {
    expect(rules).toHaveLength(1);
    expect(rules[0].to).toBe(`${listing}page/:page/`);
    expect(rules[0].status).toBe(301);
  });

  test("the rule is forced, since the listing's index.html would otherwise be served", () => {
    expect(rules[0].force).toBe(true);
  });

  test("no rule without a query condition claims the listing path before it", () => {
    const earlier = redirects.filter(
      (rule) =>
        rule.order < rules[0].order &&
        rule.query === undefined &&
        (rule.from === listing || rule.from === listing.slice(0, -1)),
    );

    expect(earlier).toEqual([]);
  });

  test("no rule redirects a page/ path, which would loop with the query pass-through", () => {
    expect(redirects.filter((rule) => rule.from.startsWith(`${listing}page`))).toEqual([]);
  });
});

test("the reader finds the redirect table and keeps blocks separate", () => {
  // Guards the parser itself: a broken parser would make the tests above pass
  // for the wrong reason.
  expect(redirects.length).toBeGreaterThan(50);
  redirects.forEach((rule) => {
    expect(rule.from).not.toBe("");
    expect(rule.to).not.toBe("");
  });
});
