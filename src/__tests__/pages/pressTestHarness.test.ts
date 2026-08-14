/**
 * Adversarial tests for the test harness that MRTG-1447 adds, and for the
 * Gatsby page invariant of the new component file.
 *
 * The branch adds 2 pieces of infrastructure that no test covered:
 *
 * 1. jest/cssModuleStub.cjs, plus the moduleNameMapper entry in jest.config.ts.
 *    The stub feeds a class name to every component that a test renders. A
 *    silent stub failure makes the render tests assert on unstyled markup, so
 *    a class rename would pass unnoticed. These tests assert on the stub
 *    itself, and they run the real ts-jest interop path that a source file uses.
 * 2. src/pages/press/_AllCoverageGrid.tsx. Gatsby creates one page per file
 *    under src/pages. The leading underscore must stop that. These tests call
 *    the real validatePath function from gatsby-page-utils, the same function
 *    that gatsby-plugin-page-creator calls, instead of trusting the comment in
 *    the component file.
 */

import * as fs from "fs";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { validatePath } = require("gatsby-page-utils/validate-path") as { validatePath: (p: string) => boolean };

import * as pressClasses from "../../pages/press/press.module.css";
import * as resourceClasses from "../../pages/resources/resources.module.css";

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const JEST_CONFIG = path.join(REPO_ROOT, "jest.config.ts");
const STUB_FILE = path.join(REPO_ROOT, "jest", "cssModuleStub.cjs");
const PRESS_DIR = path.join(REPO_ROOT, "src", "pages", "press");

describe("the CSS module stub gives a rendered component a real class name", () => {
  test("returns the key name for a class that press.module.css declares", () => {
    // A namespace import compiles to a __importStar call. If the stub breaks
    // that interop, every class becomes undefined and every class assertion in
    // the render suites turns into a no-op.
    expect(pressClasses.pressGrid).toBe("pressGrid");
    expect(pressClasses.pressCard).toBe("pressCard");
    expect(pressClasses.pressCardTitle).toBe("pressCardTitle");
  });

  test("returns a string and never undefined for any class name", () => {
    ["pressArt", "pressBody", "pressLogo", "featCard", "heritage", "tidewater"].forEach((name) => {
      const value = (pressClasses as unknown as Record<string, unknown>)[name];

      expect(typeof value).toBe("string");
      expect(value).toBe(name);
    });
  });

  test("serves every CSS module in the repository, not the press one alone", () => {
    expect(resourceClasses.pressCard).toBe("pressCard");
    expect((resourceClasses as unknown as Record<string, string>).pressArtA).toBe("pressArtA");
  });

  test("returns a distinct value per key, so 2 classes never collide", () => {
    expect(pressClasses.pressCard).not.toBe(pressClasses.pressCardTitle);
    expect(pressClasses.pressGrid).not.toBe(pressClasses.pressCard);
  });

  test("survives a String call and a template string, which React and Jest use", () => {
    expect(() => String(pressClasses.pressCard)).not.toThrow();
    expect(`${pressClasses.pressCard} extra`).toBe("pressCard extra");
    expect(() => JSON.stringify({ value: pressClasses.pressCard })).not.toThrow();
  });

  test("maps a *.module.css path in jest.config.ts", () => {
    const config = fs.readFileSync(JEST_CONFIG, "utf8");

    expect(config).toMatch(/moduleNameMapper/);
    expect(config).toMatch(/\\\\\.module\\\\\.css\$/);
    expect(config).toMatch(/<rootDir>\/jest\/cssModuleStub\.cjs/);
  });

  test("keeps the stub out of the ts-jest transform, because the file uses the .cjs extension", () => {
    expect(fs.existsSync(STUB_FILE)).toBe(true);
    expect(path.extname(STUB_FILE)).toBe(".cjs");

    const stub = fs.readFileSync(STUB_FILE, "utf8");

    expect(stub).toMatch(/module\.exports/);
    expect(stub).not.toMatch(/^\s*import\s/m);
  });

  test("adds no npm dependency, so the stub replaces identity-obj-proxy", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    const all = { ...pkg.dependencies, ...pkg.devDependencies };

    expect(all["identity-obj-proxy"]).toBeUndefined();
    expect(all["jest-environment-jsdom"]).toBeUndefined();
  });

  test("keeps the node test environment, so no test needs a browser", () => {
    const config = fs.readFileSync(JEST_CONFIG, "utf8");

    expect(config).toMatch(/testEnvironment: "node"/);
  });
});

describe("Gatsby builds no page from the new component file", () => {
  test("rejects _AllCoverageGrid.tsx, because the name starts with an underscore", () => {
    expect(validatePath("press/_AllCoverageGrid.tsx")).toBe(false);
  });

  test("rejects _data.ts the same way, which is the precedent the file follows", () => {
    expect(validatePath("press/_data.ts")).toBe(false);
  });

  test("accepts press/index.tsx, so /press still exists", () => {
    expect(validatePath("press/index.tsx")).toBe(true);
  });

  test("rejects every script file in the press folder except index.tsx", () => {
    // gatsby-plugin-page-creator globs the script extensions only, so it never
    // hands a .css file or a .md file to validatePath. The filter repeats that
    // glob, and the assertion covers every file that the plugin does read.
    const scripts = fs
      .readdirSync(PRESS_DIR)
      .filter((name) => /\.(js|jsx|ts|tsx)$/.test(name))
      .filter((name) => name !== "index.tsx");

    expect(scripts).toContain("_AllCoverageGrid.tsx");
    expect(scripts).toContain("_data.ts");
    scripts.forEach((name) => {
      expect(validatePath(`press/${name}`)).toBe(false);
    });
  });

  test("keeps the component file inside src/pages/press, next to the page it serves", () => {
    expect(fs.existsSync(path.join(PRESS_DIR, "_AllCoverageGrid.tsx"))).toBe(true);
    expect(fs.readdirSync(PRESS_DIR).sort()).toEqual(
      ["SPEC.md", "_AllCoverageGrid.tsx", "_data.ts", "index.tsx", "press.module.css"].sort(),
    );
  });

  test("needs no new page-creator ignore rule for the component file", () => {
    const config = fs.readFileSync(path.join(REPO_ROOT, "gatsby-config.ts"), "utf8");

    expect(config).not.toMatch(/_AllCoverageGrid/);
  });
});
