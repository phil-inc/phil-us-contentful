import fs from "fs";
import path from "path";

/**
 * MRTG-1462 — the patient and HCP research reports moved from /dtp-research/ and /hcp-research/ to
 * /patient-dtp-research/ and /hcp-dtp-research/. A link to an old path would still work (netlify.toml 301s
 * it) but costs a redirect hop and keeps the old URL in circulation, so no source file should name one.
 */

const repoRoot = path.resolve(__dirname, "../../..");

/** Files that name an old path on purpose, with the reason each one does. */
const ALLOWED_FILES = [
  // The remap key for the old Contentful slug.
  path.join("src", "utils", "getLink.ts"),
  // The slug guard for the stale Contentful entries.
  path.join("src", "strategies", "GenerateMainPages.ts"),
  // A comment saying why these reports are not looked up as Contentful assets.
  path.join("src", "utils", "gatedReports.ts"),
  // The specs say what the new pages replaced, and the pharma spec compares itself with the old Contentful pages.
  path.join("src", "pages", "pharma-dtp-research", "SPEC.md"),
  path.join("src", "pages", "patient-dtp-research", "SPEC.md"),
  path.join("src", "pages", "hcp-dtp-research", "SPEC.md"),
  path.join("src", "components", "ResearchReport", "SPEC.md"),
  // Comments that describe the old Contentful page-builder sections these pages were built from.
  path.join("src", "components", "section", "ReferencedSection", "ReferencedSectionBody.tsx"),
  path.join("src", "components", "LeftRigtContainer", "FloorContainer", "FloorContainer.module.css"),
  path.join("src", "components", "LeftRigtContainer", "LeftRightContainer.module.css"),
  path.join("src", "components", "LeftRigtContainer", "GridContainer", "gridContainer.module.css"),
];

const collect = (directory: string, found: string[] = []): string[] => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__tests__") return;
      collect(entryPath, found);
    } else if (entry.isFile() && /\.(?:tsx?|css|md|txt)$/.test(entry.name)) {
      found.push(entryPath);
    }
  });
  return found;
};

const files = [...collect(path.join(repoRoot, "src")), ...collect(path.join(repoRoot, "static"))];

// "/pharma-dtp-research", "/patient-dtp-research" and "/hcp-dtp-research" never contain "/dtp-research" or "/hcp-research".
const OLD_PATH = /\/(?:dtp|hcp)-research\b/;

describe("MRTG-1462: no source file links to an old research report path", () => {
  test("only the guard, the remap and a few comments name /dtp-research or /hcp-research", () => {
    // The scan must read a real file set, so an empty scan cannot pass.
    expect(files.length).toBeGreaterThan(100);

    const offenders = files
      .map((file) => path.relative(repoRoot, file))
      .filter((file) => !ALLOWED_FILES.includes(file))
      .filter((file) => OLD_PATH.test(fs.readFileSync(path.join(repoRoot, file), "utf8")));

    expect(offenders).toEqual([]);
  });

  test("the llms.txt entries use the new addresses", () => {
    const llms = fs.readFileSync(path.join(repoRoot, "static", "llms.txt"), "utf8");

    expect(llms).toContain("https://phil.us/patient-dtp-research/");
    expect(llms).toContain("https://phil.us/hcp-dtp-research/");
  });
});
