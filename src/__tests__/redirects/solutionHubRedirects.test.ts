import fs from "fs";
import path from "path";

/**
 * MRTG-1444 — the Digital Hub page moved from /solution/core/ to /solution/hub/.
 * These tests read netlify.toml and check the 301 redirects for the old paths.
 *
 * netlify.toml is parsed with a small reader instead of a TOML library, because
 * the repo declares no TOML dependency.
 */

type Redirect = {
  from: string;
  to: string;
  status?: number;
  force?: boolean;
  order: number;
};

const netlifyTomlPath = path.resolve(__dirname, "../../../netlify.toml");

const readRedirects = (): Redirect[] => {
  const source = fs.readFileSync(netlifyTomlPath, "utf8");
  const blocks = source.split(/^\[\[redirects\]\]\s*$/m).slice(1);

  return blocks.map((block, index) => {
    // Stop at the next table header so a block never absorbs the following one.
    const body = block.split(/^\[/m)[0];
    const readString = (key: string): string | undefined => {
      const match = new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m").exec(body);
      return match?.[1];
    };

    const status = /^status\s*=\s*(\d+)/m.exec(body);
    const force = /^force\s*=\s*(true|false)/m.exec(body);

    return {
      from: readString("from") ?? "",
      to: readString("to") ?? "",
      status: status ? Number(status[1]) : undefined,
      force: force ? force[1] === "true" : undefined,
      order: index,
    };
  });
};

/** Convert a Netlify `from` pattern into a regular expression. */
const toMatcher = (from: string): RegExp => {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const withSplat = escaped.replace(/\\\*/g, "(?:.*)");
  return new RegExp(`^${withSplat}$`);
};

const redirects = readRedirects();

/** First rule that matches the path, which is the rule Netlify applies. */
const resolve = (requestPath: string): Redirect | undefined =>
  redirects.find((rule) => toMatcher(rule.from).test(requestPath));

describe("netlify.toml — /solution/core/ to /solution/hub/", () => {
  const oldPaths = [
    "/solution/core",
    "/solution/core/",
    "/solution/core/anything",
    "/solution/core/deep/nested/path",
    "/solution/core/?utm_source=email",
  ];

  test.each(oldPaths)("%s redirects to /solution/hub/ with a 301", (oldPath) => {
    const rule = resolve(oldPath);

    expect(rule).toBeDefined();
    expect(rule!.to).toBe("/solution/hub/");
    expect(rule!.status).toBe(301);
  });

  test("every /solution/core rule is forced, so a cached old page cannot win", () => {
    const coreRules = redirects.filter((rule) =>
      rule.from.startsWith("/solution/core"),
    );

    expect(coreRules).toHaveLength(3);
    coreRules.forEach((rule) => {
      expect(rule.force).toBe(true);
    });
  });

  test("the removed /solution/ overview still redirects, now to /solution/hub/", () => {
    ["/solution", "/solution/"].forEach((oldPath) => {
      const rule = resolve(oldPath);

      expect(rule).toBeDefined();
      expect(rule!.to).toBe("/solution/hub/");
      expect(rule!.status).toBe(301);
    });
  });

  test("no redirect points to the old /solution/core path any more", () => {
    const stale = redirects.filter((rule) => rule.to.includes("/solution/core"));

    expect(stale).toEqual([]);
  });

  test("the new page path matches no redirect rule, so there is no loop", () => {
    ["/solution/hub/", "/solution/hub"].forEach((newPath) => {
      expect(resolve(newPath)).toBeUndefined();
    });
  });

  test("the /solution/direct/ sibling page keeps working", () => {
    ["/solution/direct/", "/solution/direct"].forEach((siblingPath) => {
      expect(resolve(siblingPath)).toBeUndefined();
    });
  });

  test("the wildcard /solution/core/* rule cannot shadow /solution/direct/", () => {
    const wildcard = redirects.find((rule) => rule.from === "/solution/core/*");

    expect(wildcard).toBeDefined();
    expect(toMatcher(wildcard!.from).test("/solution/direct/")).toBe(false);
    expect(toMatcher(wildcard!.from).test("/solution/hub/")).toBe(false);
  });

  test("no other rule matches an old core path before the core rules", () => {
    const firstCoreRule = redirects.find((rule) =>
      rule.from.startsWith("/solution/core"),
    );
    const earlierMatch = redirects
      .filter((rule) => rule.order < firstCoreRule!.order)
      .find((rule) => toMatcher(rule.from).test("/solution/core/"));

    expect(earlierMatch).toBeUndefined();
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
});
