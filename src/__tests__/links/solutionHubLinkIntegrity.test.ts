import fs from "fs";
import path from "path";

/**
 * MRTG-1444 — repository wide checks for the move of the Digital Hub page from
 * /solution/core/ to /solution/hub/.
 *
 * The sibling test solutionHubLinks.test.ts audits src only, and it reads .ts,
 * .tsx and .css files only. These tests widen the audit to the whole repository,
 * so a stale path in a document, a config file, a netlify function or a static
 * asset cannot pass unseen.
 */

const repoRoot = path.resolve(__dirname, "../../..");

const IGNORED_DIRECTORIES = new Set([
  ".git",
  ".cache",
  "node_modules",
  "public",
  "coverage",
  ".netlify",
  ".yarn",
]);

/** Files that may name the old path, with the reason each one needs it. */
const ALLOWED_FILES = [
  // The 301 rules for the old path live here.
  "netlify.toml",
  // The remap key for the old Contentful slug.
  path.join("src", "utils", "getLink.ts"),
  // The slug guard for a stale Contentful entry.
  path.join("src", "strategies", "GenerateMainPages.ts"),
];

const isTestFile = (relativePath: string): boolean =>
  relativePath.split(path.sep).includes("__tests__");

const collectRepoFiles = (
  directory: string,
  found: string[] = [],
): string[] => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) return;
      collectRepoFiles(entryPath, found);
      return;
    }

    if (!entry.isFile()) return;
    found.push(entryPath);
  });

  return found;
};

/** Read a file as text. A binary file gives text that holds no path string. */
const readText = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
};

const repoFiles = collectRepoFiles(repoRoot).filter(
  (filePath) => !isTestFile(path.relative(repoRoot, filePath)),
);

const relative = (filePath: string): string => path.relative(repoRoot, filePath);

describe("MRTG-1444 — the whole repository drops the old hub path", () => {
  test("only netlify.toml, getLink.ts and GenerateMainPages.ts name /solution/core", () => {
    // The scan must read a real file set, so an empty scan cannot pass.
    expect(repoFiles.length).toBeGreaterThan(200);

    const offenders = repoFiles
      .filter((filePath) => {
        const relativePath = relative(filePath);
        return !ALLOWED_FILES.includes(relativePath);
      })
      .filter((filePath) => readText(filePath).includes("/solution/core"))
      .map(relative);

    expect(offenders).toEqual([]);
  });

  test("no file names the old page directory src/pages/solution/core", () => {
    const offenders = repoFiles
      .filter((filePath) => readText(filePath).includes("pages/solution/core"))
      .map(relative);

    expect(offenders).toEqual([]);
    expect(fs.existsSync(path.join(repoRoot, "src/pages/solution/core"))).toBe(
      false,
    );
  });

  test("every hub link target uses the trailing slash form", () => {
    // Gatsby sets trailingSlash: 'always'. A link without the slash costs an
    // extra hop, so each link target must end with "/" or with "/#anchor".
    // The scan reads link targets only: an href, a `to` prop or an href key.
    const linkPattern =
      /(?:href|to)\s*(?:=\s*\{?|:\s*)["'`]([^"'`]*\/solution\/hub[^"'`]*)["'`]/g;

    const offenders: string[] = [];
    let linkCount = 0;

    repoFiles.forEach((filePath) => {
      const text = readText(filePath);

      for (const match of text.matchAll(linkPattern)) {
        const target = match[1];
        linkCount += 1;

        if (/^(?:https:\/\/phil\.us)?\/solution\/hub\/(?:#[a-z0-9-]+)?$/.test(target)) {
          continue;
        }

        offenders.push(`${relative(filePath)}: ${target}`);
      }
    });

    // The move touched many link targets. A zero count would hide a broken scan.
    expect(linkCount).toBeGreaterThanOrEqual(8);
    expect(offenders).toEqual([]);
  });
});
