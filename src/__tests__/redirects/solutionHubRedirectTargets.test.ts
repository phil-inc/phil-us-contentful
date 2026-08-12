import fs from "fs";
import path from "path";

/**
 * MRTG-1444 — a redirect must end at a page that the build produces.
 *
 * The sibling test solutionHubRedirects.test.ts checks the rule text. These
 * tests check the rule against the file based pages, so a rule that points at a
 * route with no page cannot pass. They also check the rule order, because
 * netlify applies the first matching rule.
 */

const repoRoot = path.resolve(__dirname, "../../..");
const netlifyTomlPath = path.join(repoRoot, "netlify.toml");
const pagesRoot = path.join(repoRoot, "src", "pages");

type Redirect = { from: string; to: string; status?: number; force?: boolean };

const parseRedirects = (): Redirect[] => {
  const source = fs.readFileSync(netlifyTomlPath, "utf8");

  return source
    .split(/^\[\[redirects\]\]\s*$/m)
    .slice(1)
    .map((block) => {
      const body = block.split(/^\[/m)[0];
      const read = (key: string): string | undefined =>
        new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m").exec(body)?.[1];
      const status = /^status\s*=\s*(\d+)/m.exec(body);
      const force = /^force\s*=\s*(true|false)/m.exec(body);

      return {
        from: read("from") ?? "",
        to: read("to") ?? "",
        status: status ? Number(status[1]) : undefined,
        force: force ? force[1] === "true" : undefined,
      };
    });
};

const redirects = parseRedirects();

/** Collect every route that a file based page under src/pages produces. */
const collectFilePageRoutes = (
  directory: string,
  prefix = "",
  found: string[] = [],
): string[] => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      // A directory that starts with "_" holds page parts, not a route.
      if (entry.name.startsWith("_")) return;
      collectFilePageRoutes(entryPath, `${prefix}/${entry.name}`, found);
      return;
    }

    if (entry.name === "index.tsx" || entry.name === "index.ts") {
      found.push(`${prefix}/`);
    }
  });

  return found;
};

const filePageRoutes = collectFilePageRoutes(pagesRoot);

describe("MRTG-1444 — the redirect target is a real page", () => {
  test("src/pages produces the /solution/hub/ route and not the old route", () => {
    // Guards the route reader itself.
    expect(filePageRoutes.length).toBeGreaterThan(5);
    expect(filePageRoutes).toContain("/solution/hub/");
    expect(filePageRoutes).toContain("/solution/direct/");
    expect(filePageRoutes).not.toContain("/solution/core/");
    expect(filePageRoutes).not.toContain("/solution/");
  });

  test("every rule for an old solution path targets the built hub route", () => {
    const solutionRules = redirects.filter((rule) =>
      /^\/solution(\/|$)/.test(rule.from),
    );

    expect(solutionRules.length).toBe(5);
    solutionRules.forEach((rule) => {
      expect(filePageRoutes).toContain(rule.to);
      expect(rule.status).toBe(301);
    });
  });

  test("the hub route serves the page while the old route redirects", () => {
    const matches = (from: string, requestPath: string): boolean => {
      const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`^${escaped.replace(/\\\*/g, "(?:.*)")}$`).test(
        requestPath,
      );
    };

    // No rule may catch the new route, or the page would never render.
    const hubRules = redirects.filter(
      (rule) =>
        !rule.from.startsWith("http") && matches(rule.from, "/solution/hub/"),
    );
    expect(hubRules).toEqual([]);

    // The old route must have a rule that sends the visitor to the new route.
    const oldRouteRule = redirects.find(
      (rule) => !rule.from.startsWith("http") && matches(rule.from, "/solution/core/"),
    );
    expect(oldRouteRule).toBeDefined();
    expect(oldRouteRule!.to).toBe("/solution/hub/");
  });

  test("a forced rule for the old path comes before any wildcard that matches it", () => {
    const wildcardIndex = redirects.findIndex(
      (rule) => rule.from === "/solution/core/*",
    );

    // The wildcard rule must exist; otherwise a deep old URL gives a 404.
    expect(wildcardIndex).toBeGreaterThanOrEqual(0);
    expect(redirects[wildcardIndex].force).toBe(true);

    // A path level rule earlier in the file would win and break the move.
    const shadowing = redirects
      .slice(0, wildcardIndex)
      .filter((rule) => rule.from.startsWith("/"))
      .filter((rule) => {
        const escaped = rule.from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const matcher = new RegExp(`^${escaped.replace(/\\\*/g, "(?:.*)")}$`);
        return (
          matcher.test("/solution/core/") ||
          matcher.test("/solution/core") ||
          matcher.test("/solution/core/anything")
        );
      })
      .map((rule) => rule.from);

    expect(shadowing).toEqual([]);
  });

  test("no rule sends the old path to a 200 rewrite, which would keep the old URL", () => {
    // A 200 rewrite keeps /solution/core/ in the address bar and splits SEO.
    const coreRules = redirects.filter((rule) =>
      rule.from.startsWith("/solution/core"),
    );

    expect(coreRules.length).toBeGreaterThan(0);
    coreRules.forEach((rule) => {
      expect(rule.status).not.toBe(200);
      expect(rule.status).not.toBe(302);
    });
  });

  test("the old path cannot chain through a second rule", () => {
    // The target of a core rule must not match another rule, or netlify would
    // need a second hop and could loop.
    const coreRules = redirects.filter((rule) =>
      rule.from.startsWith("/solution/core"),
    );

    expect(coreRules.map((rule) => rule.from)).toEqual([
      "/solution/core/*",
      "/solution/core/",
      "/solution/core",
    ]);

    coreRules.forEach((rule) => {
      const nextHop = redirects.find((candidate) => {
        const escaped = candidate.from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const matcher = new RegExp(`^${escaped.replace(/\\\*/g, "(?:.*)")}$`);
        return candidate.from.startsWith("/") && matcher.test(rule.to);
      });

      expect(nextHop).toBeUndefined();
    });
  });
});
