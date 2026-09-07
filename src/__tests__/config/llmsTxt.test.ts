import * as fs from "fs";
import * as path from "path";

/**
 * Tests for static/llms.txt (MRTG-1422).
 *
 * llms.txt is an AI-agent-facing summary of the site, served at
 * https://phil.us/llms.txt. Gatsby copies everything under static/ to the
 * public/ root verbatim, so the file's location is the whole deploy mechanism —
 * there is no plugin or build step to break, only the path.
 *
 * The file is read as text rather than parsed as Markdown. It has no runtime
 * consumer inside the app, so the only regressions worth guarding are the ones
 * a human introduces by hand: moving the file, dropping a section the ticket's
 * acceptance criteria require, or pasting a link that points somewhere other
 * than canonical production.
 */

const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");
const LLMS_TXT_PATH = path.join(REPO_ROOT, "static", "llms.txt");
const FAQ_CONTENT_PATH = path.join(REPO_ROOT, "src", "data", "faq-content.ts");

/** Matches the site URL declared as `siteUrl` in gatsby-config.ts. */
const CANONICAL_ORIGIN = "https://phil.us";

function readLlmsTxt(): string {
  return fs.readFileSync(LLMS_TXT_PATH, "utf8");
}

function readFaqContent(): string {
  return fs.readFileSync(FAQ_CONTENT_PATH, "utf8");
}

/**
 * Removes separators sitting between two digits, so that a phone number written
 * as 888-975-0603 and the same number written as (888) 975-0603 both normalize
 * to 8889750603. faq-content.ts uses both styles for the same numbers, and
 * llms.txt uses a third, so a literal comparison would be brittle for reasons
 * that have nothing to do with the values being correct.
 *
 * The lookahead leaves the trailing digit unconsumed, which lets a single pass
 * collapse every separator in a run.
 */
function collapseDigitSeparators(source: string): string {
  return source.replace(/(\d)[\s().-]+(?=\d)/g, "$1");
}

/** Every Markdown link target in the document, in source order. */
function linkTargets(source: string): string[] {
  const targets: string[] = [];
  const pattern = /\[[^\]]*\]\(([^)\s]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    targets.push(match[1]);
  }

  return targets;
}

describe("static/llms.txt", () => {
  it("exists at the path Gatsby serves from the site root", () => {
    expect(fs.existsSync(LLMS_TXT_PATH)).toBe(true);
  });

  it("opens with an H1 naming the site", () => {
    const [firstLine] = readLlmsTxt().split("\n");

    expect(firstLine).toBe("# PHIL");
  });

  it("carries a blockquote summary directly under the H1", () => {
    // The llms.txt format puts a one-paragraph summary in a blockquote so an
    // agent that reads nothing else still learns what the site is.
    expect(readLlmsTxt()).toMatch(/^# PHIL\n\n> \S/);
  });

  it("covers every section the acceptance criteria require", () => {
    const source = readLlmsTxt();

    // Company description — the prose between the summary and the first H2.
    expect(source).toMatch(/PHIL, Inc\. is a healthcare technology company/);

    // Key services.
    expect(source).toContain("## Core solution");
    expect(source).toContain(`${CANONICAL_ORIGIN}/solution/hub/`);
    expect(source).toContain(`${CANONICAL_ORIGIN}/solution/direct/`);

    // Important page URLs, by audience.
    expect(source).toContain("## Who PHIL serves");
    for (const audience of ["pharma", "patients", "providers"]) {
      expect(source).toContain(`${CANONICAL_ORIGIN}/${audience}/`);
    }

    // Contact info.
    expect(source).toContain("## Contact");
    expect(source).toContain(`${CANONICAL_ORIGIN}/contact/`);

    // The AC counts the corporate address as contact info.
    expect(source).toContain("14500 N Northsight Blvd");
  });

  it("states the PHIL / PHILRx distinction as an extractable list", () => {
    // Agents conflating the company with the patient-facing platform, or
    // concluding that PHIL prescribes, are the two failure modes this section
    // exists to prevent. Prose buried these facts; bullets surface them.
    const source = readLlmsTxt();

    expect(source).toContain("## Important distinctions");
    expect(source).toMatch(/PHIL does not prescribe/);
    expect(source).toMatch(/\*\*PHILRx\*\* is the prescription access/);
  });

  it("keeps the skippable section named exactly `## Optional`", () => {
    // "Optional" is a convention in the llms.txt format: it marks links an
    // agent may skip when it needs a shorter context. Renaming the heading to
    // something more descriptive silently discards that signal, so pin it.
    expect(readLlmsTxt()).toContain("\n## Optional\n");
  });

  it("links to the sitemap index rather than a bare sitemap.xml", () => {
    // gatsby-plugin-sitemap emits sitemap-index.xml; sitemap.xml 404s. Same
    // trap that MRTG-1421 fixed in robots.txt.
    const source = readLlmsTxt();

    expect(source).toContain(`${CANONICAL_ORIGIN}/sitemap-index.xml`);
    expect(source).not.toContain(`${CANONICAL_ORIGIN}/sitemap.xml`);
  });

  it("contains at least one link", () => {
    // Guards the link assertions below against silently passing on an empty set.
    expect(linkTargets(readLlmsTxt()).length).toBeGreaterThan(0);
  });

  it("uses absolute URLs for every link", () => {
    // Agents fetch llms.txt on its own and resolve links without a base
    // document, so a relative path is not reliably resolvable.
    const relative = linkTargets(readLlmsTxt()).filter(
      (target) => !/^https?:\/\//.test(target)
    );

    expect(relative).toEqual([]);
  });

  it("points every phil.us link at canonical production over https", () => {
    const offenders = linkTargets(readLlmsTxt()).filter((target) =>
      /(^http:\/\/|localhost|127\.0\.0\.1|netlify\.app|\/\/www\.phil\.us)/.test(
        target
      )
    );

    expect(offenders).toEqual([]);
  });

  it("gives every internal page link a trailing slash", () => {
    // Gatsby's canonical URLs and the sitemap both carry trailing slashes;
    // omitting one costs the agent a redirect. Files such as
    // sitemap-index.xml are exempt.
    const offenders = linkTargets(readLlmsTxt()).filter((target) => {
      if (!target.startsWith(`${CANONICAL_ORIGIN}/`)) {
        return false;
      }

      const pathname = target.slice(CANONICAL_ORIGIN.length);

      return !pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(pathname);
    });

    expect(offenders).toEqual([]);
  });
});

/**
 * llms.txt repeats the PHILRx e-prescribing identifiers so an agent can answer
 * "how do I send a prescription to PHILRx" without following a link — likely the
 * highest-volume factual question asked about the company, and the reason the
 * file exists at all.
 *
 * Duplicating the values buys that directness at the cost of drift: the source
 * of truth is src/data/faq-content.ts, which drives the published /faqs/ page.
 * These assertions close that gap. Changing an identifier there fails the build
 * until llms.txt is updated to match.
 */
describe("static/llms.txt e-prescribing identifiers", () => {
  /** Values as published on /faqs/, keyed by what they identify. */
  const IDENTIFIERS: Array<{ label: string; value: string }> = [
    { label: "pharmacy name", value: "PHILRx, LLC" },
    { label: "pharmacy ZIP", value: "43235" },
    { label: "pharmacy NPI", value: "1487163598" },
    { label: "prescription fax", value: "8889750603" },
    { label: "verbal prescription line", value: "8559770975" },
  ];

  it.each(IDENTIFIERS)(
    "keeps the $label in step with faq-content.ts",
    ({ value }) => {
      const faq = collapseDigitSeparators(readFaqContent());
      const llms = collapseDigitSeparators(readLlmsTxt());

      // Asserting both sides catches the value being changed in either file.
      expect(faq).toContain(value);
      expect(llms).toContain(value);
    }
  );
});
