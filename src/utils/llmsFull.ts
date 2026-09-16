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
const EXCLUDED_PATHS = new Set([
  "/404/",
  "/dev-404-page/",
  "/field/",
  "/ask-phil-ai/",
  // Shown only after a form is submitted. The demo pages are also noindex, but
  // /gtn/calculator/ is not, so the list is what keeps it out.
  "/demo/thank-you/",
  "/demo/schedule/",
  "/gtn/calculator/",
]);

/**
 * Elements that carry no page content. Chrome repeated on every page (the
 * MegaNav header and the footer) opts out with `data-llms-skip`, because it has
 * no stable selector of its own: page bodies use <header> as well, and the
 * footer's class names are hashed by CSS modules.
 *
 * aria-hidden and hidden are deliberately not on this list. Mantine's Collapse
 * sets aria-hidden on every closed accordion panel, and hand-built tabs (such as
 * the /solution/direct/ insights card) ship inactive panels with `hidden` until
 * a script reveals them; removing either would drop real copy. The carousel
 * clones aria-hidden also marks are caught by dropHiddenCopies instead.
 *
 * Count-up stats render 0 until a script animates them, so each one pairs a
 * visually hidden copy of its real value with a data-llms-skip placeholder.
 */
const NON_CONTENT_SELECTOR = [
  "[data-llms-skip]",
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

interface Line {
  text: string;
  /** Every character of the line came from inside an aria-hidden="true" subtree. */
  hidden: boolean;
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
function toLines(element: HTMLElement, markdown: boolean, inHidden = false): Line[] {
  const lines: Line[] = [];
  let pending = "";
  let pendingVisible = false;

  const flush = () => {
    const text = collapseWhitespace(pending);
    if (text) lines.push({ text, hidden: !pendingVisible });
    pending = "";
    pendingVisible = false;
  };

  const visit = (node: Node, hidden: boolean) => {
    if (node instanceof TextNode) {
      pending += node.text;
      if (!hidden && node.text.trim()) pendingVisible = true;
      return;
    }
    if (!(node instanceof HTMLElement)) return;

    const tag = (node.rawTagName ?? "").toLowerCase();
    const heading = /^h([1-6])$/.exec(tag);
    const nodeHidden = hidden || node.getAttribute("aria-hidden") === "true";

    if (markdown && (heading || tag === "li")) {
      flush();
      const inner = toLines(node, false, nodeHidden);
      const text = inner.map((line) => line.text).join(" ");
      if (text) {
        const prefix = heading ? "#".repeat(Math.min(Number(heading[1]) + 1, 6)) : "-";
        lines.push({ text: `${prefix} ${text}`, hidden: inner.every((line) => line.hidden) });
      }
      return;
    }

    if (tag === "br") {
      pending += " ";
      return;
    }

    const isBlock = BLOCK_TAGS.has(tag);
    if (isBlock) flush();
    node.childNodes.forEach((child) => visit(child, nodeHidden));
    if (isBlock) flush();
  };

  element.childNodes.forEach((child) => visit(child, inHidden));
  flush();
  return lines;
}

/**
 * Drops aria-hidden copies of text the page already shows. Looping carousels
 * and marquees render their slides twice and mark the second set aria-hidden;
 * that copy tells an agent nothing new, wherever it sits in the markup.
 *
 * Visible lines are never dropped, even when repeated: two stats can share a
 * figure ("2X+") and two sections can share a heading, and removing the second
 * would detach its label or merge the sections.
 */
function dropHiddenCopies(lines: Line[]): string[] {
  const visible = new Set(lines.filter((line) => !line.hidden).map((line) => line.text));
  const seenHidden = new Set<string>();
  return lines
    .filter(({ text, hidden }) => {
      if (!hidden) return true;
      if (visible.has(text) || seenHidden.has(text)) return false;
      seenHidden.add(text);
      return true;
    })
    .map((line) => line.text);
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

  const content = joinLines(dropHiddenCopies(toLines(body, true)));
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

/** Paths of phil.us pages linked from a Markdown block, in the order they appear. */
function linkedPagePaths(markdown: string): string[] {
  return Array.from(markdown.matchAll(/\]\(([^)\s]+)\)/g), (match) => match[1])
    .filter((target) => target.startsWith(`${SITE_ORIGIN}/`))
    .map((target) => target.slice(SITE_ORIGIN.length));
}

/**
 * Orders pages the way llms.txt prioritises them: home first, then every page
 * llms.txt links to in the order it lists them, then everything it doesn't
 * mention, alphabetically. Pages linked under `## Optional` go last, since
 * llmstxt.org defines that section as skippable. Path depth is no guide here:
 * blog posts live at root paths, the same depth as /pharma/.
 */
function sortByLlmsTxtPriority(llmsTxt: string, pages: LlmsFullPage[]): LlmsFullPage[] {
  const optionalStart = llmsTxt.search(/^## Optional\s*$/m);
  const curated = linkedPagePaths(optionalStart === -1 ? llmsTxt : llmsTxt.slice(0, optionalStart));
  const optional = optionalStart === -1 ? [] : linkedPagePaths(llmsTxt.slice(optionalStart));

  const rankOf = (pagePath: string): [group: number, position: number] => {
    if (pagePath === "/") return [0, 0];
    if (curated.includes(pagePath)) return [1, curated.indexOf(pagePath)];
    if (optional.includes(pagePath)) return [3, optional.indexOf(pagePath)];
    return [2, 0];
  };

  return [...pages].sort((a, b) => {
    const [groupA, positionA] = rankOf(a.path);
    const [groupB, positionB] = rankOf(b.path);
    return groupA - groupB || positionA - positionB || a.path.localeCompare(b.path);
  });
}

export function renderLlmsFull(llmsTxt: string, pages: LlmsFullPage[]): string {
  // Everything in llms.txt before its first section: the H1, summary, and intro.
  const firstSection = llmsTxt.search(/^## /m);
  const preamble = (firstSection === -1 ? llmsTxt : llmsTxt.slice(0, firstSection)).trim();

  const sorted = sortByLlmsTxtPriority(llmsTxt, pages);

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
