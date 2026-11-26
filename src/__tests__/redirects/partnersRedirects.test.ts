import fs from "fs";
import path from "path";

/**
 * The /partners/ page (the Contentful "Partners" page) is retired, and its address now 301s to the
 * home page. These tests read netlify.toml and check the old address, with and without the trailing
 * slash, and that the redirect does not catch other pages whose address starts with "partners".
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

describe("netlify.toml: the retired /partners/ page redirects to the home page", () => {
  test.each(["/partners", "/partners/"])("%s redirects to / with a forced 301", (oldPath) => {
    const rule = resolve(oldPath);

    expect(rule).toBeDefined();
    expect(rule!.to).toBe("/");
    expect(rule!.status).toBe(301);
    // Forced, so a cached copy of the old page, or a code page built at /partners/ later, cannot win.
    expect(rule!.force).toBe(true);
  });

  test("only the retired page redirects, not other pages whose address starts with partners", () => {
    expect(resolve("/partners/")).toBeDefined();
    expect(resolve("/partners-in-patient-access-drive-value-for-your-biopharma-clients-with/")).toBeUndefined();
  });
});
