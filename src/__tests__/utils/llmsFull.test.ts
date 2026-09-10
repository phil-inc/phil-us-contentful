import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import {
  buildLlmsFull,
  extractPage,
  pagePathFromFile,
  renderLlmsFull,
} from "../../utils/llmsFull";

/**
 * Tests for the llms-full.txt generator (MRTG-1425).
 *
 * gatsby-node.ts calls buildLlmsFull from onPostBuild, after every page has
 * been rendered into public/. Working from the built HTML means the file sees
 * what a crawler sees: hand-coded pages and Contentful pages alike, with each
 * template's own noindex decision already applied. The fixtures below mimic
 * the shape of Gatsby's output, including the GTM noscript and page scripts
 * that surround every page body.
 */

function gatsbyHtml({ head = "", body }: { head?: string; body: string }): string {
  return (
    `<!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/>${head}</head>` +
    `<body><noscript><iframe title="GTM"></iframe></noscript>` +
    `<div id="___gatsby"><div id="gatsby-focus-wrapper">${body}</div></div>` +
    `<script id="gatsby-script-loader">window.pagePath="/";</script></body></html>`
  );
}

function contentOf(body: string): string {
  const result = extractPage(gatsbyHtml({ body }), "/example/");
  if (result.kind !== "page") {
    throw new Error(`expected an included page, got "${result.kind}"`);
  }
  return result.page.content;
}

describe("extractPage", () => {
  it.each(["noindex", "noindex,nofollow"])(
    "skips a page whose robots meta is %s",
    (robots) => {
      const html = gatsbyHtml({
        head: `<meta name="robots" content="${robots}"/>`,
        body: "<p>Gated copy</p>",
      });
      expect(extractPage(html, "/gated/").kind).toBe("noindex");
    }
  );

  it("reads the title and builds the production URL from the page path", () => {
    const html = gatsbyHtml({
      head: "<title>Pharma | PHIL</title>",
      body: "<p>Brand copy</p>",
    });
    expect(extractPage(html, "/pharma/")).toEqual({
      kind: "page",
      page: {
        path: "/pharma/",
        url: "https://phil.us/pharma/",
        title: "Pharma | PHIL",
        content: "Brand copy",
      },
    });
  });

  it("drops site chrome marked with data-llms-skip", () => {
    expect(
      contentOf(
        '<header data-llms-skip="true"><a href="/demo/">Book Demo</a></header>' +
          "<p>Page copy</p>" +
          '<div data-llms-skip="true">Terms of Use</div>'
      )
    ).toBe("Page copy");
  });

  it("drops scripts, styles, icons, navigation, and forms", () => {
    expect(
      contentOf(
        "<style>.hero{color:red}</style>" +
          '<nav aria-label="Pagination"><a>Next page</a></nav>' +
          "<svg><title>Chevron</title></svg>" +
          "<form><label>Work email</label></form>" +
          "<p>Kept</p>"
      )
    ).toBe("Kept");
  });

  it("keeps text hidden only by CSS, such as collapsed FAQ answers", () => {
    expect(
      contentOf(
        '<button aria-expanded="false">How do I send a prescription?</button>' +
          '<div class="qaAWrap"><p>Search for PHILRx, LLC.</p></div>'
      )
    ).toBe("How do I send a prescription?\n\nSearch for PHILRx, LLC.");
  });

  it("keeps closed Mantine accordion panels, which Collapse marks aria-hidden", () => {
    expect(
      contentOf(
        '<button aria-expanded="false">Is PHIL a pharmacy?</button>' +
          '<div aria-hidden="true" style="display:none;height:0;overflow:hidden">' +
          "<p>PHILRx routes prescriptions to partner pharmacies.</p></div>"
      )
    ).toBe("Is PHIL a pharmacy?\n\nPHILRx routes prescriptions to partner pharmacies.");
  });

  it("drops lines repeated on the same page, such as looping carousel clones", () => {
    expect(
      contentOf(
        "<h3>Dermatology</h3><p>2x+ covered dispenses</p>" +
          "<h3>Migraine</h3><p>3x+ refill adherence</p>" +
          '<div aria-hidden="true"><h3>Dermatology</h3><p>2x+ covered dispenses</p></div>'
      )
    ).toBe(
      "#### Dermatology\n\n2x+ covered dispenses\n\n#### Migraine\n\n3x+ refill adherence"
    );
  });

  it("writes headings one level below the page title and list items as bullets", () => {
    expect(
      contentOf(
        "<h1>Access</h1><p>Intro</p><h2>How it works</h2>" +
          "<ul><li>Intake</li><li><div>Prior</div><div>authorization</div></li></ul>" +
          "<p>After the list</p>"
      )
    ).toBe(
      "## Access\n\nIntro\n\n### How it works\n\n- Intake\n- Prior authorization\n\nAfter the list"
    );
  });

  it("joins inline text split by React and separates block-level text", () => {
    expect(
      contentOf(
        "<div><span>2x</span>+ patient starts</div>" +
          "<div>3x<!-- -->+ refill adherence</div>"
      )
    ).toBe("2x+ patient starts\n\n3x+ refill adherence");
  });

  it("decodes entities and collapses whitespace", () => {
    expect(
      contentOf("<p>Patients &amp; providers&nbsp;&nbsp;\n   use PHIL&#x27;s platform</p>")
    ).toBe("Patients & providers use PHIL's platform");
  });

  it("reports a page with no text left after cleanup as empty", () => {
    const html = gatsbyHtml({ body: '<header data-llms-skip="true">Menu</header>' });
    expect(extractPage(html, "/blank/").kind).toBe("empty");
  });
});

describe("pagePathFromFile", () => {
  const publicDir = path.join("site", "public");

  it.each([
    [path.join(publicDir, "index.html"), "/"],
    [path.join(publicDir, "pharma", "index.html"), "/pharma/"],
    [path.join(publicDir, "solution", "hub", "index.html"), "/solution/hub/"],
  ])("maps %s to %s", (file, expected) => {
    expect(pagePathFromFile(publicDir, file)).toBe(expected);
  });
});

describe("renderLlmsFull", () => {
  const llmsTxt =
    "# PHIL\n\n> Summary.\n\nIntro paragraph.\n\n## Important distinctions\n\n- Detail\n";

  const page = (pagePath: string, title: string) => ({
    path: pagePath,
    url: `https://phil.us${pagePath}`,
    title,
    content: `${title} copy`,
  });

  it("opens with the llms.txt header up to its first section, then points back to llms.txt", () => {
    const output = renderLlmsFull(llmsTxt, []);

    expect(output.startsWith("# PHIL\n\n> Summary.\n\nIntro paragraph.\n\n")).toBe(true);
    expect(output).not.toContain("Important distinctions");
    expect(output).toContain("https://phil.us/llms.txt");
  });

  it("writes a titled, sourced section per page: home first, then shallow before deep", () => {
    const output = renderLlmsFull(llmsTxt, [
      page("/solution/hub/", "Hub"),
      page("/pharma/", "Pharma"),
      page("/", "Home"),
      page("/approach/", "Approach"),
    ]);

    const headings = Array.from(output.matchAll(/^# (.+)$/gm), (match) => match[1]);
    expect(headings).toEqual(["PHIL", "Home", "Approach", "Pharma", "Hub"]);
    expect(output).toContain(
      "# Pharma\n\nSource: https://phil.us/pharma/\n\nPharma copy\n"
    );
  });
});

describe("buildLlmsFull", () => {
  let publicDir: string;

  beforeEach(() => {
    publicDir = fs.mkdtempSync(path.join(os.tmpdir(), "llms-full-"));
  });

  afterEach(() => {
    fs.rmSync(publicDir, { recursive: true, force: true });
  });

  function writePage(pagePath: string, html: string): void {
    const dir = path.join(publicDir, ...pagePath.split("/").filter(Boolean));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  }

  it("includes indexable pages and skips noindex, excluded, and empty ones", async () => {
    fs.writeFileSync(path.join(publicDir, "llms.txt"), "# PHIL\n\n> Summary.\n");
    writePage("/", gatsbyHtml({ head: "<title>Home</title>", body: "<p>Welcome</p>" }));
    writePage(
      "/pharma/",
      gatsbyHtml({ head: "<title>Pharma</title>", body: "<p>Brand copy</p>" })
    );
    writePage(
      "/gated/",
      gatsbyHtml({
        head: '<meta name="robots" content="noindex"/>',
        body: "<p>Gated copy</p>",
      })
    );
    writePage(
      "/404/",
      gatsbyHtml({ head: "<title>Not found</title>", body: "<p>Missing page</p>" })
    );
    writePage("/blank/", gatsbyHtml({ body: "" }));

    const result = await buildLlmsFull(publicDir);

    expect(result.text).toContain("# Home\n\nSource: https://phil.us/\n\nWelcome\n");
    expect(result.text).toContain("# Pharma\n\nSource: https://phil.us/pharma/\n\nBrand copy\n");
    expect(result.text).not.toContain("Gated copy");
    expect(result.text).not.toContain("Missing page");
    expect(result.counts).toEqual({ included: 2, noindex: 1, excluded: 1, empty: 1 });
  });
});
