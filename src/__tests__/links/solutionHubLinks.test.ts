import fs from "fs";
import path from "path";
import { SOLUTION } from "../../pages/home/_data";
import { PHARMA_FAQ_GROUPS } from "../../data/faq-content";

/**
 * MRTG-1444 — every internal link to the Digital Hub must point to
 * /solution/hub/. Data modules are imported directly. Component files are read
 * as text, because they import Gatsby and browser-only modules that Jest
 * cannot resolve in the node test environment.
 */

const srcRoot = path.resolve(__dirname, "../..");

const collectSourceFiles = (directory: string, found: string[] = []): string[] => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "__tests__" || entry.name === "node_modules") return;
      collectSourceFiles(entryPath, found);
      return;
    }

    if (/\.(ts|tsx|css)$/.test(entry.name)) found.push(entryPath);
  });

  return found;
};

const sourceFiles = collectSourceFiles(srcRoot);

const readFile = (relativePath: string): string =>
  fs.readFileSync(path.join(srcRoot, relativePath), "utf8");

describe("internal links point to /solution/hub/", () => {
  test("the home page solution CTA links to the new path", () => {
    expect(SOLUTION.cta.href).toBe("/solution/hub/");
  });

  test("the pharma FAQ answer links to the new path", () => {
    const answers = PHARMA_FAQ_GROUPS.flatMap((group) =>
      group.items.map((item) => item.answer),
    );
    const hubAnswers = answers.filter((answer) => answer.includes("Digital Hub</a>"));

    expect(hubAnswers.length).toBeGreaterThan(0);
    hubAnswers.forEach((answer) => {
      expect(answer).toContain('href="/solution/hub/"');
    });
  });

  test("no FAQ answer keeps a link to the old path", () => {
    const allAnswers = PHARMA_FAQ_GROUPS.flatMap((group) =>
      group.items.map((item) => item.answer),
    );

    allAnswers.forEach((answer) => {
      expect(answer).not.toContain("/solution/core");
    });
  });

  test.each([
    ["layouts/Layout/MegaNav/MegaNav.tsx", 2],
    ["layouts/Layout/MegaFooter/megaFooter.tsx", 1],
    ["pages/approach/index.tsx", 1],
    ["pages/pharma/index.tsx", 1],
    ["components/text-text-columnsv2/index.tsx", 1],
    ["components/section/BasicSection/BasicSection.tsx", 1],
    ["pages/solution/direct/_sections/Telemedicine.tsx", 3],
  ])("%s links to /solution/hub/ %i time(s)", (relativePath, expectedCount) => {
    const source = readFile(relativePath);
    const matches = source.match(/\/solution\/hub\//g) ?? [];

    expect(matches).toHaveLength(expectedCount);
    expect(source).not.toContain("/solution/core");
  });

  test("the Funnel CTA keeps its #data anchor on the new path", () => {
    const source = readFile("pages/solution/direct/_sections/Funnel.tsx");

    expect(source).toContain('to="/solution/hub/#data"');
    expect(source).not.toContain("/solution/core");
  });

  test("the #data anchor target still exists on the hub page", () => {
    const source = readFile("pages/solution/hub/_sections/DataTabs.tsx");

    expect(source).toContain('id="data"');
  });

  test("getLink remaps both old solution slugs to the new path", () => {
    const source = readFile("utils/getLink.ts");

    expect(source).toContain('solution: "/solution/hub/"');
    expect(source).toContain('"solution/core": "/solution/hub/"');
    // The old path appears only as a remap key, never as a link target.
    expect(source).not.toContain('"/solution/core');
  });

  test("no source file outside netlify.toml links to the old path", () => {
    const allowedFiles = [
      // The slug guard for the old Contentful entry.
      path.join("strategies", "GenerateMainPages.ts"),
      // The remap key for the old Contentful slug.
      path.join("utils", "getLink.ts"),
    ];

    const offenders = sourceFiles.filter((filePath) => {
      if (allowedFiles.some((allowed) => filePath.endsWith(allowed))) return false;

      return fs.readFileSync(filePath, "utf8").includes("/solution/core");
    });

    expect(offenders.map((filePath) => path.relative(srcRoot, filePath))).toEqual([]);
  });

  test("the audit reads a real file set, so it cannot pass on an empty scan", () => {
    expect(sourceFiles.length).toBeGreaterThan(100);
    const hubLinks = sourceFiles.filter((filePath) =>
      fs.readFileSync(filePath, "utf8").includes("/solution/hub/"),
    );

    expect(hubLinks.length).toBeGreaterThanOrEqual(8);
  });
});

describe("the hub page directory and SEO metadata", () => {
  test("the page lives at src/pages/solution/hub and the old directory is gone", () => {
    expect(fs.existsSync(path.join(srcRoot, "pages/solution/hub/index.tsx"))).toBe(true);
    expect(fs.existsSync(path.join(srcRoot, "pages/solution/core"))).toBe(false);
  });

  test("all moved page files are present", () => {
    const expectedFiles = [
      "pages/solution/hub/index.tsx",
      "pages/solution/hub/core.css",
      "pages/solution/hub/interactions.ts",
      "pages/solution/hub/assets/network-map.png",
      "pages/solution/hub/_sections/Hero.tsx",
      "pages/solution/hub/_sections/StatBand.tsx",
      "pages/solution/hub/_sections/Pillars.tsx",
      "pages/solution/hub/_sections/Journey.tsx",
      "pages/solution/hub/_sections/DataTabs.tsx",
      "pages/solution/hub/_sections/Support.tsx",
      "pages/solution/hub/_sections/Roi.tsx",
      "pages/solution/hub/_sections/FinalCta.tsx",
    ];

    expectedFiles.forEach((relativePath) => {
      expect(fs.existsSync(path.join(srcRoot, relativePath))).toBe(true);
    });
  });

  test("the canonical URL and the JSON-LD id use the new path", () => {
    const source = readFile("pages/solution/hub/index.tsx");

    expect(source).toContain('const CORE_URL = "https://phil.us/solution/hub/"');
    // The canonical link, og:url and schema @id all read CORE_URL.
    expect(source).toContain('<link rel="canonical" href={CORE_URL} />');
    expect(source).toContain('"@id": CORE_URL');
  });

  test("the page still imports its own CSS and interactions", () => {
    const source = readFile("pages/solution/hub/index.tsx");

    expect(source).toContain('import "./core.css"');
    expect(source).toContain('from "./interactions"');
  });

  test("the section imports resolve inside the new directory", () => {
    const relativeImports =
      readFile("pages/solution/hub/index.tsx").match(/from "\.\/[^"]+"/g) ?? [];

    expect(relativeImports.length).toBeGreaterThan(0);
    relativeImports.forEach((statement) => {
      const target = statement.replace(/^from "\.\//, "").replace(/"$/, "");
      const candidates = [
        `pages/solution/hub/${target}`,
        `pages/solution/hub/${target}.tsx`,
        `pages/solution/hub/${target}.ts`,
      ];

      expect(
        candidates.some((candidate) => fs.existsSync(path.join(srcRoot, candidate))),
      ).toBe(true);
    });
  });

  test("the hub asset import resolves after the move", () => {
    const heroSource = readFile("pages/solution/hub/_sections/Hero.tsx");

    expect(heroSource).toContain("'../assets/network-map.png'");
    expect(
      fs.existsSync(path.join(srcRoot, "pages/solution/hub/assets/network-map.png")),
    ).toBe(true);
  });

  test("the page CSS scroll-margin comment names the new path", () => {
    const css = readFile("pages/solution/hub/core.css");

    expect(css).toContain("/solution/hub/#data");
    expect(css).not.toContain("/solution/core");
  });
});
