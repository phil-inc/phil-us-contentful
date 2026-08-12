import * as fs from "fs";
import * as path from "path";

/**
 * Tests for .github/dependabot.yml (SEC-25).
 *
 * js-yaml is present in node_modules as a transitive dependency and ships no
 * @types package, so it is loaded with require() and cast to a narrow shape.
 * This avoids adding a new dependency to package.json. The installed major
 * version depends on hoisting: js-yaml 3 exposes safeLoad and js-yaml 4 exposes
 * load. Both reject a duplicate key, so the parser call accepts either name.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml = require("js-yaml") as {
  load?: (input: string) => unknown;
  safeLoad?: (input: string) => unknown;
};

function parseYaml(input: string): unknown {
  const parse = yaml.safeLoad ?? yaml.load;

  if (typeof parse !== "function") {
    throw new Error("js-yaml exposes neither safeLoad nor load");
  }

  return parse(input);
}

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const CONFIG_PATH = path.join(REPO_ROOT, ".github", "dependabot.yml");

/** Dependabot package-ecosystem values that are valid for a JavaScript repo. */
const VALID_NPM_ECOSYSTEM = "npm";

/** Dependabot accepts these schedule intervals. */
const VALID_INTERVALS = ["daily", "weekly", "monthly", "quarterly", "semiannually", "yearly"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readRawConfig(): string {
  return fs.readFileSync(CONFIG_PATH, "utf8");
}

function loadConfig(): Record<string, unknown> {
  const parsed = parseYaml(readRawConfig());

  if (!isRecord(parsed)) {
    throw new Error("dependabot.yml did not parse into a YAML mapping");
  }

  return parsed;
}

function loadUpdateEntries(): Record<string, unknown>[] {
  const { updates } = loadConfig();

  if (!Array.isArray(updates)) {
    throw new Error("dependabot.yml has no updates array");
  }

  return updates.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`updates[${index}] is not a YAML mapping`);
    }

    return entry;
  });
}

describe("dependabot.yml file location", () => {
  test("exists at the exact path GitHub reads", () => {
    expect(fs.existsSync(CONFIG_PATH)).toBe(true);
  });

  test("is a file and not a directory", () => {
    expect(fs.statSync(CONFIG_PATH).isFile()).toBe(true);
  });

  test("uses the .yml extension and the lowercase name GitHub requires", () => {
    const entries = fs.readdirSync(path.join(REPO_ROOT, ".github"));

    expect(entries).toContain("dependabot.yml");
    expect(entries).not.toContain("dependabot.yaml");
    expect(entries).not.toContain("Dependabot.yml");
  });

  test("does not sit in an unread location such as the repository root", () => {
    expect(fs.existsSync(path.join(REPO_ROOT, "dependabot.yml"))).toBe(false);
  });
});

describe("dependabot.yml file hygiene", () => {
  test("is not empty", () => {
    expect(readRawConfig().trim().length).toBeGreaterThan(0);
  });

  test("uses no tab characters, which YAML forbids for indentation", () => {
    expect(readRawConfig()).not.toMatch(/\t/);
  });

  test("uses LF line endings only", () => {
    expect(readRawConfig()).not.toMatch(/\r/);
  });

  test("ends with a single trailing newline", () => {
    const raw = readRawConfig();

    expect(raw.endsWith("\n")).toBe(true);
    expect(raw.endsWith("\n\n")).toBe(false);
  });

  test("parses as YAML, so it has no duplicate keys and no syntax error", () => {
    expect(() => loadConfig()).not.toThrow();
  });
});

describe("dependabot.yml top-level schema", () => {
  test("sets version to the number 2 and not the string \"2\"", () => {
    const config = loadConfig();

    expect(config.version).toBe(2);
    expect(typeof config.version).toBe("number");
  });

  test("declares updates as a non-empty array", () => {
    const config = loadConfig();

    expect(Array.isArray(config.updates)).toBe(true);
    expect(loadUpdateEntries().length).toBeGreaterThan(0);
  });

  test("declares exactly one update entry", () => {
    expect(loadUpdateEntries()).toHaveLength(1);
  });

  test("declares only the version and updates top-level keys", () => {
    expect(Object.keys(loadConfig()).sort()).toEqual(["updates", "version"]);
  });
});

describe("dependabot.yml npm update entry", () => {
  test("targets the npm package ecosystem", () => {
    expect(loadUpdateEntries()[0]["package-ecosystem"]).toBe(VALID_NPM_ECOSYSTEM);
  });

  test("points at the repository root directory", () => {
    expect(loadUpdateEntries()[0].directory).toBe("/");
  });

  test("points at a directory that holds a package.json manifest", () => {
    const directory = loadUpdateEntries()[0].directory;

    expect(typeof directory).toBe("string");

    const manifestDir = path.join(REPO_ROOT, String(directory));

    expect(fs.existsSync(path.join(manifestDir, "package.json"))).toBe(true);
  });

  test("schedules a weekly interval", () => {
    const schedule = loadUpdateEntries()[0].schedule;

    expect(isRecord(schedule)).toBe(true);
    expect((schedule as Record<string, unknown>).interval).toBe("weekly");
  });

  test("uses an interval value that Dependabot accepts", () => {
    const schedule = loadUpdateEntries()[0].schedule as Record<string, unknown>;

    expect(VALID_INTERVALS).toContain(schedule.interval);
  });

  test("declares interval as the only schedule key", () => {
    const schedule = loadUpdateEntries()[0].schedule as Record<string, unknown>;

    expect(Object.keys(schedule)).toEqual(["interval"]);
  });

  test("opens pull requests against the develop branch", () => {
    expect(loadUpdateEntries()[0]["target-branch"]).toBe("develop");
  });

  test("does not target main, which the branching strategy reserves for production", () => {
    const targetBranch = loadUpdateEntries()[0]["target-branch"];

    expect(targetBranch).not.toBe("main");
    expect(targetBranch).not.toBe("master");
  });

  test("sets a cooldown of 14 default days", () => {
    const cooldown = loadUpdateEntries()[0].cooldown;

    expect(isRecord(cooldown)).toBe(true);
    expect((cooldown as Record<string, unknown>)["default-days"]).toBe(14);
  });

  test("declares cooldown default-days as a number inside the accepted 1 to 90 range", () => {
    const cooldown = loadUpdateEntries()[0].cooldown as Record<string, unknown>;
    const defaultDays = cooldown["default-days"];

    expect(typeof defaultDays).toBe("number");
    expect(Number.isInteger(defaultDays)).toBe(true);
    expect(defaultDays as number).toBeGreaterThanOrEqual(1);
    expect(defaultDays as number).toBeLessThanOrEqual(90);
  });

  test("declares default-days as the only cooldown key", () => {
    const cooldown = loadUpdateEntries()[0].cooldown as Record<string, unknown>;

    expect(Object.keys(cooldown)).toEqual(["default-days"]);
  });

  test("declares only the five keys the ticket requires", () => {
    expect(Object.keys(loadUpdateEntries()[0]).sort()).toEqual([
      "cooldown",
      "directory",
      "package-ecosystem",
      "schedule",
      "target-branch",
    ]);
  });
});
