import { promises as fs } from "fs";
import * as path from "path";
import { parse, HTMLElement, Node, TextNode } from "node-html-parser";

/**
 * Generates llms-full.txt (MRTG-1425): the text of every indexable page on
 * phil.us in a single file, for AI agents that would rather read the whole
 * site than follow the links in llms.txt.
 *
 * gatsby-node.ts runs this from onPostBuild, so it reads the HTML Gatsby has
 * just written to public/ instead of querying Contentful. That covers the
 * hand-coded pages under src/pages as well as CMS pages, and it reuses each
 * template's own noindex decision rather than re-implementing it: a page is
 * left out exactly when its HTML tells crawlers not to index it.
 */

const SITE_ORIGIN = "https://phil.us";

/**
 * Pages left out whatever their robots meta says. Mirrors the
 * gatsby-plugin-sitemap `excludes` in gatsby-config.ts, plus /ask-phil-ai/,
 * which robots.txt disallows.
 */
const EXCLUDED_PATHS = new Set(["/404/", "/dev-404-page/", "/field/", "/ask-phil-ai/"]);

/**
 * Elements that carry no page content. Chrome repeated on every page (the
 * MegaNav header and the footer) opts out with `data-llms-skip`, because it has
 * no stable selector of its own: page bodies use <header> as well, and the
 * footer's class names are hashed by CSS modules.
 *
 * aria-hidden is deliberately not on this list: Mantine's Collapse sets it on
 * every closed accordion panel, so removing it would drop collapsed answers.
 * The carousel clones it also marks are caught by dropRepeatedLines instead.
 */
const NON_CONTENT_SELECTOR = [
  "[data-llms-skip]",
  "[hidden]",
  "script",
  "style",
  "noscript",
  "template",
  "iframe",
  "svg",
  "nav",
  "form",
].join(", ");

/** Elements that start a new line of text when rendered. */
const BLOCK_TAGS = new Set([
  "address", "article", "aside", "blockquote", "button", "dd", "details", "dialog",
  "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "header", "hr",
  "li", "main", "ol", "p", "pre", "section", "summary", "table", "tbody", "td",
  "tfoot", "th", "thead", "tr", "ul", "h1", "h2", "h3", "h4", "h5", "h6",
]);

export interface LlmsFullPage {
  path: string;
  url: string;
  title: string;
  content: string;
}

export type ExtractResult =
  | { kind: "page"; page: LlmsFullPage }
  | { kind: "noindex" }
  | { kind: "empty" };

export interface LlmsFullBuild {
  text: string;
  counts: { included: number; noindex: number; excluded: number; empty: number };
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Flattens an element into lines of text. Inline text is concatenated as-is,
 * since React's server renderer splits adjacent expressions into separate text
 * nodes ("3x" + "+") that must not gain a space between them; block elements
 * end the current line.
 *
 * With `markdown` on, headings and list items become Markdown. Headings drop
 * one level so every page's own title can sit above them as an H1.
 */
function toLines(element: HTMLElement, markdown: boolean): string[] {
  const lines: string[] = [];
  let pending = "";

  const flush = () => {
    const line = collapseWhitespace(pending);
    if (line) lines.push(line);
    pending = "";
  };

  const visit = (node: Node) => {
    if (node instanceof TextNode) {
      pending += node.text;
      return;
    }
    if (!(node instanceof HTMLElement)) return;

    const tag = (node.rawTagName ?? "").toLowerCase();
    const heading = /^h([1-6])$/.exec(tag);

    if (markdown && (heading || tag === "li")) {
      flush();
      const text = toLines(node, false).join(" ");
      if (text) {
        const prefix = heading ? "#".repeat(Math.min(Number(heading[1]) + 1, 6)) : "-";
        lines.push(`${prefix} ${text}`);
      }
      return;
    }

    if (tag === "br") {
      pending += " ";
      return;
    }

    const isBlock = BLOCK_TAGS.has(tag);
    if (isBlock) flush();
    node.childNodes.forEach(visit);
    if (isBlock) flush();
  };

  element.childNodes.forEach(visit);
  flush();
  return lines;
}

/**
 * Keeps only the first occurrence of each line on a page. Looping carousels
 * render cloned slides, and some sections render desktop and mobile variants
 * side by side; either way the second copy tells an agent nothing new.
 */
function dropRepeatedLines(lines: string[]): string[] {
  const seen = new Set<string>();
  return lines.filter((line) => {
    if (seen.has(line)) return false;
    seen.add(line);
    return true;
  });
}

/** Consecutive list items stay on adjacent lines; everything else is a paragraph. */
function joinLines(lines: string[]): string {
  return lines
    .map((line, index) => {
      if (index === 0) return line;
      const inList = line.startsWith("- ") && lines[index - 1].startsWith("- ");
      return (inList ? "\n" : "\n\n") + line;
    })
    .join("");
}

export function extractPage(html: string, pagePath: string): ExtractResult {
  const root = parse(html);

  const robots = root.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";
  if (/\bnoindex\b/i.test(robots)) return { kind: "noindex" };

  const body = root.querySelector("body") ?? root;
  body.querySelectorAll(NON_CONTENT_SELECTOR).forEach((element) => element.remove());

  const content = joinLines(dropRepeatedLines(toLines(body, true)));
  if (!content) return { kind: "empty" };

  return {
    kind: "page",
    page: {
      path: pagePath,
      url: `${SITE_ORIGIN}${pagePath}`,
      title: collapseWhitespace(root.querySelector("title")?.text ?? "") || pagePath,
      content,
    },
  };
}

/** public/solution/hub/index.html → /solution/hub/ */
export function pagePathFromFile(publicDir: string, file: string): string {
  const directory = path.relative(publicDir, path.dirname(file));
  const segments = directory.split(path.sep).filter(Boolean);
  return segments.length ? `/${segments.join("/")}/` : "/";
}

function pathDepth(pagePath: string): number {
  return pagePath.split("/").filter(Boolean).length;
}

export function renderLlmsFull(llmsTxt: string, pages: LlmsFullPage[]): string {
  // Everything in llms.txt before its first section: the H1, summary, and intro.
  const firstSection = llmsTxt.search(/^## /m);
  const preamble = (firstSection === -1 ? llmsTxt : llmsTxt.slice(0, firstSection)).trim();

  const sorted = [...pages].sort(
    (a, b) => pathDepth(a.path) - pathDepth(b.path) || a.path.localeCompare(b.path)
  );

  const sections = sorted.map(
    (page) => `# ${page.title}\n\nSource: ${page.url}\n\n${page.content}\n`
  );

  return [
    `${preamble}\n\nThis file contains the text of every indexable page on phil.us, ` +
      `generated from the production build. For a curated overview with key links, ` +
      `see ${SITE_ORIGIN}/llms.txt.\n`,
    ...sections,
  ].join("\n---\n\n");
}

async function findIndexFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return findIndexFiles(fullPath);
      return Promise.resolve(entry.name === "index.html" ? [fullPath] : []);
    })
  );
  return nested.flat();
}

export async function buildLlmsFull(publicDir: string): Promise<LlmsFullBuild> {
  const llmsTxt = await fs.readFile(path.join(publicDir, "llms.txt"), "utf8");
  const counts = { included: 0, noindex: 0, excluded: 0, empty: 0 };
  const pages: LlmsFullPage[] = [];

  for (const file of await findIndexFiles(publicDir)) {
    const pagePath = pagePathFromFile(publicDir, file);
    if (EXCLUDED_PATHS.has(pagePath)) {
      counts.excluded += 1;
      continue;
    }

    const result = extractPage(await fs.readFile(file, "utf8"), pagePath);
    if (result.kind === "page") {
      pages.push(result.page);
      counts.included += 1;
    } else {
      counts[result.kind] += 1;
    }
  }

  return { text: renderLlmsFull(llmsTxt, pages), counts };
}
