import fs from "fs";
import path from "path";

/**
 * MRTG-1462 — the patient and HCP research report pages moved from /dtp-research/ and /hcp-research/
 * to /patient-dtp-research/ and /hcp-dtp-research/. These tests read netlify.toml and check that the old
 * paths, with and without the trailing slash, 301 to the new pages.
 *
 * netlify.toml is read with a small parser, because the repo declares no TOML dependency.
 */

type Redirect = { from: string; to: string; status?: number; force?: boolean };

const netlifyToml = fs.readFileSync(path.resolve(__dirname, "../../../netlify.toml"), "utf8");

const redirects: Redirect[] = netlifyToml
  .split(/^\[\[redirects\]\]\s*$/m)
  .slice(1)
  .map((block) => {
    // Stop at the next table header so a block never absorbs the following one.
    const body = block.split(/^\[/m)[0];
    const read = (key: string) => new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m").exec(body)?.[1] ?? "";
    const status = /^status\s*=\s*(\d+)/m.exec(body);
    const force = /^force\s*=\s*(true|false)/m.exec(body);
    return { from: read("from"), to: read("to"), status: status ? Number(status[1]) : undefined, force: force ? force[1] === "true" : undefined };
  });

const matches = (from: string, requestPath: string): boolean => {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\*/g, ".*");
  return new RegExp(`^${escaped}$`).test(requestPath);
};

/** The first rule that matches is the one Netlify applies. */
const resolve = (requestPath: string) => redirects.find((rule) => matches(rule.from, requestPath));

describe("netlify.toml: the research reports moved to new URLs (MRTG-1462)", () => {
  test.each([
    ["/dtp-research", "/patient-dtp-research/"],
    ["/dtp-research/", "/patient-dtp-research/"],
    ["/hcp-research", "/hcp-dtp-research/"],
    ["/hcp-research/", "/hcp-dtp-research/"],
  ])("%s redirects to %s with a forced 301", (oldPath, newPath) => {
    const rule = resolve(oldPath);

    expect(rule).toBeDefined();
    expect(rule!.to).toBe(newPath);
    expect(rule!.status).toBe(301);
    // Forced, so a cached copy of the old page cannot win over the redirect.
    expect(rule!.force).toBe(true);
  });

  test("the new paths are not redirected anywhere", () => {
    ["/patient-dtp-research/", "/hcp-dtp-research/", "/pharma-dtp-research/"].forEach((livePath) => {
      expect(resolve(livePath)).toBeUndefined();
    });
  });

  test("no redirect points back at an old path", () => {
    expect(redirects.filter((rule) => /\/(?:dtp|hcp)-research\/?$/.test(rule.to))).toEqual([]);
  });
});
