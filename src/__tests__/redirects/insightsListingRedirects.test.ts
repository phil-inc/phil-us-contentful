import fs from "fs";
import path from "path";

/**
 * The News & Insights listings (/insights/<section>/ and their /n/ pages) are no
 * longer built; netlify.toml 301s them to the pages that replace them. These
 * tests read netlify.toml and check those rules, and that the pages still built
 * under /insights/ (the case studies and /insights/search/) are not redirected.
 *
 * netlify.toml is parsed with a small reader instead of a TOML library, because
 * the repo declares no TOML dependency.
 */

type Redirect = {
  from: string;
  to: string;
  status?: number;
  force?: boolean;
};

const netlifyTomlPath = path.resolve(__dirname, "../../../netlify.toml");

const readRedirects = (): Redirect[] => {
  const source = fs.readFileSync(netlifyTomlPath, "utf8");
  const blocks = source.split(/^\[\[redirects\]\]\s*$/m).slice(1);

  return blocks.map((block) => {
    // Stop at the next table header so a block never absorbs the following one.
    const body = block.split(/^\[/m)[0];
    const readString = (key: string): string | undefined =>
      new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m").exec(body)?.[1];

    const status = /^status\s*=\s*(\d+)/m.exec(body);
    const force = /^force\s*=\s*(true|false)/m.exec(body);

    return {
      from: readString("from") ?? "",
      to: readString("to") ?? "",
      status: status ? Number(status[1]) : undefined,
      force: force ? force[1] === "true" : undefined,
    };
  });
};

const redirects = readRedirects();
const insightsRules = redirects.filter((rule) => rule.from.startsWith("/insights"));

test.each([
  ["/insights/", "/resources/"],
  ["/insights/resources/*", "/resources/"],
  ["/insights/phil-blog/*", "/resources/?type=blog"],
  ["/insights/events/*", "/resources/?type=webinar"],
  ["/insights/press-releases/*", "/press/"],
  ["/insights/case-studies/", "/customer-success/"],
])("%s 301s to %s, forced", (from, to) => {
  expect(insightsRules.filter((rule) => rule.from === from)).toEqual([{ from, to, status: 301, force: true }]);
});

test("no rule catches the case studies or /insights/search/, which are still built", () => {
  // Only these six rules may match under /insights/, and none is a catch-all.
  expect(insightsRules.map((rule) => rule.from).sort()).toEqual([
    "/insights/",
    "/insights/case-studies/",
    "/insights/events/*",
    "/insights/phil-blog/*",
    "/insights/press-releases/*",
    "/insights/resources/*",
  ]);
});
