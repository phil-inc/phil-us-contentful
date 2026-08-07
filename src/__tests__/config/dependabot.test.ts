import * as fs from "fs";
import * as path from "path";

/**
 * Adversarial tests for .github/dependabot.yml
 *
 * Validates:
 * - File exists in the correct location
 * - Valid YAML structure (line-based parsing)
 * - Correct Dependabot v2 schema structure
 * - Required fields are present and have valid values
 * - Configuration aligns with repo conventions (target-branch, ecosystem, etc.)
 * - Security PR behavior is documented
 */

const DEPENDABOT_PATH = path.resolve(
  __dirname,
  "../../../.github/dependabot.yml"
);

describe(".github/dependabot.yml", () => {
  let fileContent: string;

  beforeAll(() => {
    fileContent = fs.readFileSync(DEPENDABOT_PATH, "utf-8");
  });

  describe("File existence and basic validity", () => {
    it("exists at .github/dependabot.yml", () => {
      expect(fs.existsSync(DEPENDABOT_PATH)).toBe(true);
    });

    it("is not an empty file", () => {
      expect(fileContent.trim().length).toBeGreaterThan(0);
    });

    it("does not contain tab characters (YAML best practice)", () => {
      expect(fileContent).not.toMatch(/\t/);
    });

    it("ends with a newline", () => {
      expect(fileContent.endsWith("\n")).toBe(true);
    });
  });

  describe("Dependabot schema version", () => {
    it("has version: 2 at top level", () => {
      const nonCommentLines = fileContent
        .split("\n")
        .filter((l) => !l.startsWith("#") && l.trim() !== "");
      expect(nonCommentLines[0]).toBe("version: 2");
    });
  });

  describe("NPM update entry", () => {
    it("has exactly one package-ecosystem entry", () => {
      const matches = fileContent.match(/package-ecosystem:/g);
      expect(matches).not.toBeNull();
      expect(matches!.length).toBe(1);
    });

    it("uses npm as the package-ecosystem", () => {
      expect(fileContent).toMatch(/package-ecosystem:\s*"npm"/);
    });

    it("targets root directory '/'", () => {
      expect(fileContent).toMatch(/directory:\s*"\/"/);
    });

    it("has a weekly schedule interval", () => {
      expect(fileContent).toMatch(/interval:\s*"weekly"/);
    });

    it("targets the develop branch (integration branch per README)", () => {
      expect(fileContent).toMatch(/target-branch:\s*"develop"/);
    });

    it("does NOT target main or master branch", () => {
      expect(fileContent).not.toMatch(/target-branch:\s*"main"/);
      expect(fileContent).not.toMatch(/target-branch:\s*"master"/);
    });
  });

  describe("Cooldown configuration", () => {
    it("has a cooldown block", () => {
      expect(fileContent).toMatch(/cooldown:/);
    });

    it("has default-days set to 14 or more", () => {
      const match = fileContent.match(/default-days:\s*(\d+)/);
      expect(match).not.toBeNull();
      const days = parseInt(match![1], 10);
      expect(days).toBeGreaterThanOrEqual(14);
    });

    it("cooldown default-days is reasonable (not more than 90)", () => {
      const match = fileContent.match(/default-days:\s*(\d+)/);
      expect(match).not.toBeNull();
      const days = parseInt(match![1], 10);
      expect(days).toBeLessThanOrEqual(90);
    });
  });

  describe("Security considerations", () => {
    it("does not contain registries configuration", () => {
      const nonCommentLines = fileContent
        .split("\n")
        .filter((l) => !l.startsWith("#"));
      const joined = nonCommentLines.join("\n");
      expect(joined).not.toMatch(/^registries:/m);
    });

    it("does not enable insecure-external-code-execution", () => {
      expect(fileContent).not.toMatch(/insecure-external-code-execution/);
    });

    it("documents that security PRs arrive independently of this config", () => {
      // The ticket requires acknowledging that security alerts work without config
      expect(fileContent.toLowerCase()).toMatch(/security/);
    });
  });

  describe("YAML formatting quality", () => {
    it("uses consistent 2-space indentation", () => {
      const lines = fileContent.split("\n");
      for (const line of lines) {
        if (line.trim() === "" || line.startsWith("#")) continue;
        const leadingWhitespace = line.match(/^(\s*)/)?.[1] || "";
        expect(leadingWhitespace.length % 2).toBe(0);
      }
    });

    it("does not contain trailing whitespace", () => {
      const lines = fileContent.split("\n");
      for (const line of lines) {
        expect(line).not.toMatch(/\s+$/);
      }
    });

    it("does not use YAML anchors or aliases", () => {
      expect(fileContent).not.toMatch(/&\w+/);
      expect(fileContent).not.toMatch(/\*\w+/);
    });
  });
});
