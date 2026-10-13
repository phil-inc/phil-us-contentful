#!/usr/bin/env node
// Converts one Contentful blog/webinar page (public page-data.json) into a candidate
// static page. Writes ONLY to --out (a scratch directory), never to src/.
//
//   node scripts/convert.mjs <slug> [--out <dir>] [--download] [--allow-large]
//        [--page-data <file>] [--html <file>] [--sitemap <file>] [--no-head]
//
// Outputs in --out: index.tsx (candidate page), body.jsx, meta.json, assets.json, report.md
// Exit codes: 0 ok | 2 unsupported archetype, unknown node/mark/embed, or name collision
//             3 Gate A (self-check) failed
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import {
  REPO, SITE, parseArgs, fetchText, fetchBuffer, headStatus, contentLength, collapse, pathOf,
  loadRedirects, loadSitemapPaths, rewriteHref, isCtfUrl, normalizeCtfUrl,
  sanitizeFileName, readHead, readBody, requireFromRepo,
} from "./lib/shared.mjs";

const { flags, positional } = parseArgs(process.argv.slice(2), ["out", "page-data", "html", "sitemap"]);
const slug = positional[0];
if (!slug) {
  console.error("usage: node scripts/convert.mjs <slug> [--out <dir>] [--download] [--allow-large]");
  process.exit(2);
}

class Unsupported extends Error {}
const fail = (msg) => {
  console.error(`STOP: ${msg}`);
  process.exit(2);
};

// ------------------------------------------------------------------ inputs

const pageData = JSON.parse(
  flags["page-data"] ? fs.readFileSync(flags["page-data"], "utf8") : await fetchText(`${SITE}/page-data/${slug}/page-data.json`),
);
if (!/templates-blog-tsx$/.test(pageData.componentChunkName || "")) {
  fail(`${slug} uses ${pageData.componentChunkName || "an unknown template"}, not the blog template. Not covered by this skill.`);
}
const r = pageData.result?.data?.contentfulResource;
if (!r?.body?.raw) fail(`${slug}: page-data has no contentfulResource.body`);

const liveHtml = flags.html ? fs.readFileSync(flags.html, "utf8") : await fetchText(`${SITE}/${slug}/`);
const live = readHead(liveHtml);
const liveBody = readBody(live.root);

const redirects = loadRedirects();
let sitemap = null;
try {
  sitemap = await loadSitemapPaths({ file: flags.sitemap });
} catch (e) {
  console.error(`warning: sitemap not loaded (${e.message}); link rule 4 (unlisted targets) is skipped`);
}

const outDir = path.resolve(flags.out || path.join(os.tmpdir(), "migrate-subpage", slug));
if (outDir.startsWith(path.join(REPO, "src") + path.sep)) fail(`--out must not be inside src/ (got ${outDir})`);
fs.mkdirSync(outDir, { recursive: true });

// ------------------------------------------------------------------ assets

const assets = new Map(); // remote url -> { url, kind, name, localFile, localUrl, from: Set }

function registerAsset(rawUrl, from) {
  const url = normalizeCtfUrl(rawUrl);
  const base = url.split("/").pop();
  const name = sanitizeFileName(base);
  const ext = (name.split(".").pop() || "").toLowerCase();
  let kind;
  if (ext === "pdf") kind = "pdf";
  else if (["png", "jpg", "jpeg", "svg", "webp", "gif"].includes(ext)) kind = "image";
  else throw new Unsupported(`asset with unsupported type ".${ext}": ${url}`);
  const localFile = kind === "pdf" ? `static/pdf/${name}` : `static/images/blog/${name}`;
  const localUrl = kind === "pdf" ? `/pdf/${name}` : `/images/blog/${name}`;
  for (const a of assets.values()) {
    if (a.localFile === localFile && a.url !== url) {
      throw new Unsupported(`name collision: ${url} and ${a.url} both map to ${localFile}`);
    }
  }
  if (!assets.has(url)) assets.set(url, { url, kind, name, localFile, localUrl, from: new Set() });
  assets.get(url).from.add(from);
  return assets.get(url);
}

// ------------------------------------------------------------------ rich text -> JSX

const refs = new Map((r.body.references || []).map((x) => [x.contentful_id, x]));
const HEADING = { "heading-2": "BlogH2", "heading-3": "BlogH3", "heading-4": "BlogH4" };
// The live template uses the rich-text renderer's defaults: <b>, <i>, <u>. Do not "upgrade"
// these to <strong>/<em>: on this site's CSS a <strong> inside a 700-weight heading computes
// to weight 900 while <b> stays 700, which makes migrated headings visibly heavier.
const MARK = { bold: "b", italic: "i", underline: "u" };
const TAG_TO_HTML = { BlogP: "p", BlogH2: "h2", BlogH3: "h3", BlogH4: "h4" };

function youTubeId(url) {
  // Same patterns as src/utils/links.ts getYouTubeId.
  const patterns = [/youtu.be\/([^#&?]{11})/, /\?v=([^#&?]{11})/, /&v=([^#&?]{11})/, /embed\/([^#&?]{11})/, /\/v\/([^#&?]{11})/];
  for (const p of patterns) {
    const m = String(url).match(p);
    if (m?.[1]) return m[1];
  }
  return "";
}

// Invisible or non-ASCII whitespace (notably U+00A0, which the CMS text contains) is emitted
// as an explicit \uXXXX escape: identical at runtime, but visible in review and safe from
// editors and formatters that normalise it to a plain space.
const INVISIBLE = "[\\u00a0\\u1680\\u2000-\\u200b\\u2028\\u2029\\u202f\\u205f\\u3000\\ufeff]";
const HAS_INVISIBLE = new RegExp(INVISIBLE);
const INVISIBLE_G = new RegExp(INVISIBLE, "g");

function jsonLiteral(value) {
  return JSON.stringify(value).replace(INVISIBLE_G, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`);
}

const attr = (name, value) =>
  /["\\\n{}]/.test(value) || HAS_INVISIBLE.test(value) ? `${name}={${jsonLiteral(value)}}` : `${name}="${value}"`;

// A long run of one invisible character (one post has 4,102 non-breaking spaces in a row) is
// emitted as "<char>".repeat(N): the count is computed here, so nobody has to copy or count it.
const RUN_MIN = 16;
function stringExpr(value) {
  const parts = [];
  let buf = "";
  for (let i = 0; i < value.length; ) {
    const ch = value[i];
    let j = i;
    while (j < value.length && value[j] === ch) j++;
    const n = j - i;
    if (n >= RUN_MIN && HAS_INVISIBLE.test(ch)) {
      if (buf) {
        parts.push(jsonLiteral(buf));
        buf = "";
      }
      parts.push(`${jsonLiteral(ch)}.repeat(${n})`);
    } else buf += value.slice(i, j);
    i = j;
  }
  if (buf || !parts.length) parts.push(jsonLiteral(buf));
  return parts.join(" + ");
}

function textExpr(value) {
  if (value === "") return "<br />"; // matches the live template's renderText
  // Raw JSX text cannot carry a line break: JSX folds it into a space. So a carriage return, like a
  // newline, forces the escaped-string form (where it survives as \r).
  const plain = /^[^\s{}<>&\\]([^\n\r{}<>&\\]*[^\s{}<>&\\])?$/.test(value) && !HAS_INVISIBLE.test(value);
  return plain ? value : `{${stringExpr(value)}}`;
}

// `names` picks the primitives: the article body uses BlogP/BlogA; an author bio uses
// AuthorBioP/AuthorBioA (the live AuthorBlock styles its text differently) and may only
// contain paragraphs and links, which are the only nodes the live AuthorBlock handles.
const BODY_NAMES = { p: "BlogP", a: "BlogA", bioOnly: false };
const BIO_NAMES = { p: "AuthorBioP", a: "AuthorBioA", bioOnly: true };

function makeEmitter(ctx, names = BODY_NAMES) {
  const inline = (node) => {
    switch (node.nodeType) {
      case "text": {
        let out = textExpr(node.value);
        for (const m of node.marks || []) {
          const tag = MARK[m.type];
          if (!tag) throw new Unsupported(`unknown text mark "${m.type}"`);
          out = `<${tag}>${out}</${tag}>`;
        }
        return out;
      }
      case "hyperlink": {
        const uri = node.data.uri;
        let href;
        let notes = [];
        let flag = null;
        if (isCtfUrl(uri)) {
          const a = registerAsset(uri, "body link");
          href = a.localUrl;
          notes = ["asset localised"];
        } else {
          const rw = rewriteHref(uri, { redirects, sitemap });
          ({ href, notes, flag } = rw);
        }
        ctx.links.push({ raw: uri, href, notes, flag });
        ctx.used.add(names.a);
        return `<${names.a} ${attr("href", href)}>${(node.content || []).map(inline).join("")}</${names.a}>`;
      }
      case "entry-hyperlink":
        return (node.content || []).map(inline).join("");
      default:
        throw new Unsupported(`unknown inline node "${node.nodeType}"`);
    }
  };

  const block = (node, depth) => {
    const pad = "  ".repeat(depth);
    const kids = node.content || [];
    if (names.bioOnly && node.nodeType !== "paragraph") {
      throw new Unsupported(`author bio contains a "${node.nodeType}" node; only paragraphs and links are supported`);
    }
    switch (node.nodeType) {
      case "paragraph": {
        ctx.used.add(names.p);
        ctx.counts.paragraph++;
        return kids.length ? `${pad}<${names.p}>${kids.map(inline).join("")}</${names.p}>` : `${pad}<${names.p} />`;
      }
      case "heading-2":
      case "heading-3":
      case "heading-4": {
        const tag = HEADING[node.nodeType];
        ctx.used.add(tag);
        ctx.counts[node.nodeType]++;
        return `${pad}<${tag}>${kids.map(inline).join("")}</${tag}>`;
      }
      case "unordered-list":
      case "ordered-list": {
        const tag = node.nodeType === "unordered-list" ? "BlogUL" : "BlogOL";
        ctx.used.add(tag);
        ctx.counts[node.nodeType]++;
        return `${pad}<${tag}>\n${kids.map((k) => block(k, depth + 1)).join("\n")}\n${pad}</${tag}>`;
      }
      case "list-item": {
        ctx.used.add("BlogLI");
        ctx.counts["list-item"]++;
        return `${pad}<BlogLI>\n${kids.map((k) => block(k, depth + 1)).join("\n")}\n${pad}</BlogLI>`;
      }
      case "hr":
        ctx.used.add("BlogHR");
        ctx.counts.hr++;
        return `${pad}<BlogHR />`;
      case "embedded-entry-block": {
        const id = node.data?.target?.sys?.id;
        const ref = refs.get(id);
        if (!ref || !/YoutubeEmbedResource/.test(ref.__typename || "")) {
          throw new Unsupported(`embedded entry ${id} is "${ref?.__typename || "unresolved"}", not a YouTube embed`);
        }
        const videoId = youTubeId(ref.youtubeVideoUrl);
        if (!videoId) throw new Unsupported(`cannot read a YouTube id from "${ref.youtubeVideoUrl}"`);
        ctx.used.add("BlogYouTube");
        ctx.counts.embed++;
        ctx.embeds.push({ videoId, title: ref.title || "", url: ref.youtubeVideoUrl });
        return `${pad}<BlogYouTube ${attr("videoId", videoId)} ${attr("title", ref.title || "YouTube video")} />`;
      }
      case "embedded-asset-block": {
        const id = node.data?.target?.sys?.id;
        const ref = refs.get(id);
        const gi = ref?.gatsbyImageData;
        const src = gi?.images?.fallback?.src;
        if (!ref || ref.__typename !== "ContentfulAsset" || !src) {
          throw new Unsupported(`embedded asset ${id} has no image data (PDF or video?): stop and ask`);
        }
        const a = registerAsset(src, "body image");
        ctx.used.add("BlogImage");
        ctx.counts.image++;
        const dims = gi.width && gi.height ? ` width="${Math.round(gi.width)}" height="${Math.round(gi.height)}"` : "";
        return `${pad}<BlogImage ${attr("src", a.localUrl)} ${attr("alt", ref.description || "")}${dims} />`;
      }
      default:
        throw new Unsupported(`unknown block node "${node.nodeType}"`);
    }
  };
  return { inline, block };
}

function emitDocument(rawJson, names = BODY_NAMES) {
  const doc = JSON.parse(rawJson);
  const ctx = {
    used: new Set(), links: [], embeds: [],
    counts: { paragraph: 0, "heading-2": 0, "heading-3": 0, "heading-4": 0, "unordered-list": 0, "ordered-list": 0, "list-item": 0, hr: 0, embed: 0, image: 0 },
  };
  const em = makeEmitter(ctx, names);
  const jsx = (doc.content || []).map((n) => em.block(n, 0)).join("\n");
  return { doc, jsx, ctx };
}

// ------------------------------------------------------------------ Gate A helpers

/** Reads back the restricted JSX we emit (independent of the emitter). */
function scanJsx(src) {
  const blocks = [];
  const links = [];
  const embeds = [];
  const counts = {};
  let cur = null;
  let i = 0;
  const readJsonString = () => {
    // at `{"`: scan to the closing `"}` honouring backslash escapes
    let j = i + 2;
    while (j < src.length) {
      if (src[j] === "\\") j += 2;
      else if (src[j] === '"') break;
      else j++;
    }
    const literal = src.slice(i + 1, j + 1);
    i = j + 2; // past `"}`
    return JSON.parse(literal);
  };
  // A text expression: "a" + "b".repeat(N) + "c", as emitted by stringExpr().
  const readStringExpr = () => {
    i += 1; // past `{`
    let out = "";
    for (;;) {
      let j = i + 1;
      while (j < src.length) {
        if (src[j] === "\\") j += 2;
        else if (src[j] === '"') break;
        else j++;
      }
      let lit = JSON.parse(src.slice(i, j + 1));
      i = j + 1;
      const rep = src.slice(i).match(/^\.repeat\((\d+)\)/);
      if (rep) {
        lit = lit.repeat(Number(rep[1]));
        i += rep[0].length;
      }
      out += lit;
      const more = src.slice(i).match(/^\s*\+\s*(?=")/);
      if (!more) break;
      i += more[0].length;
    }
    if (src[i] !== "}") throw new Error(`scanJsx: expected } after a string expression near "${src.slice(i, i + 30)}"`);
    i += 1;
    return out;
  };
  while (i < src.length) {
    if (src[i] === "<") {
      i++;
      const closing = src[i] === "/";
      if (closing) i++;
      let name = "";
      while (/[A-Za-z0-9]/.test(src[i])) name += src[i++];
      const attrs = {};
      let selfClose = false;
      while (i < src.length) {
        while (/\s/.test(src[i])) i++;
        if (src[i] === "/" && src[i + 1] === ">") { selfClose = true; i += 2; break; }
        if (src[i] === ">") { i++; break; }
        let an = "";
        while (/[A-Za-z]/.test(src[i])) an += src[i++];
        if (src[i] !== "=") throw new Error(`scanJsx: bad attribute near "${src.slice(i, i + 30)}"`);
        i++;
        if (src[i] === '"') {
          const end = src.indexOf('"', i + 1);
          attrs[an] = src.slice(i + 1, end);
          i = end + 1;
        } else if (src[i] === "{" && src[i + 1] === '"') {
          attrs[an] = readJsonString();
        } else throw new Error(`scanJsx: unsupported attribute value near "${src.slice(i, i + 30)}"`);
      }
      if (closing) {
        if (TAG_TO_HTML[name] && cur) {
          blocks.push({ tag: TAG_TO_HTML[name], text: collapse(cur.text), raw: cur.text });
          cur = null;
        }
      } else {
        counts[name] = (counts[name] || 0) + 1;
        if (TAG_TO_HTML[name]) {
          cur = { text: "" };
          if (selfClose) { blocks.push({ tag: TAG_TO_HTML[name], text: "", raw: "" }); cur = null; }
        }
        if (name === "BlogA") links.push(attrs.href);
        if (name === "BlogYouTube") embeds.push({ videoId: attrs.videoId, title: attrs.title });
      }
    } else if (src[i] === "{" && src[i + 1] === '"') {
      const t = readStringExpr();
      if (cur) cur.text += t;
    } else {
      let j = i;
      while (j < src.length && src[j] !== "<" && !(src[j] === "{" && src[j + 1] === '"')) j++;
      const t = src.slice(i, j);
      i = j;
      if (cur && !(t.trim() === "" && t.includes("\n"))) cur.text += t;
    }
  }
  return { blocks, links, embeds, counts };
}

const richTextPlain = (n) => (n.nodeType === "text" ? n.value : (n.content || []).map(richTextPlain).join(""));

function walkExpected(doc) {
  const blocks = [];
  const links = [];
  const counts = {};
  const visit = (n) => {
    counts[n.nodeType] = (counts[n.nodeType] || 0) + 1;
    if (n.nodeType === "hyperlink") links.push(n.data.uri);
    if (n.nodeType === "paragraph") blocks.push({ tag: "p", text: collapse(richTextPlain(n)), raw: richTextPlain(n) });
    if (HEADING[n.nodeType]) blocks.push({ tag: n.nodeType.replace("heading-", "h"), text: collapse(richTextPlain(n)), raw: richTextPlain(n) });
    (n.content || []).forEach(visit);
  };
  visit(doc);
  return { blocks, links, counts };
}

const sameBlocks = (a, b) => a.length === b.length && a.every((x, i) => x.tag === b[i].tag && x.text === b[i].text);
function firstDiffs(a, b, n = 3) {
  const out = [];
  for (let i = 0; i < Math.max(a.length, b.length) && out.length < n; i++) {
    const x = a[i], y = b[i];
    if (!x || !y || x.tag !== y.tag || x.text !== y.text) {
      out.push(`#${i}: ${x ? `<${x.tag}> "${x.text.slice(0, 70)}"` : "(none)"}  vs  ${y ? `<${y.tag}> "${y.text.slice(0, 70)}"` : "(none)"}`);
    }
  }
  return out;
}

// ------------------------------------------------------------------ convert

let body;
try {
  body = emitDocument(r.body.raw);
} catch (e) {
  if (e instanceof Unsupported) fail(`${slug}: ${e.message}`);
  throw e;
}

// hero + author
let hero = null;
if (r.asset?.file?.url) {
  try {
    const a = registerAsset(r.asset.file.url, "hero");
    const base = a.name.replace(/\.[^.]+$/, "");
    hero = { remote: a.url, name: a.name, src: a.localUrl, liveAlt: r.asset.title || "", ogLocalUrl: `/images/blog/og/${base}.png`, ogLocalFile: `static/images/blog/og/${base}.png` };
  } catch (e) {
    if (e instanceof Unsupported) fail(`${slug}: ${e.message}`);
    throw e;
  }
}

let author = null;
if (r.author) {
  let bio = "";
  let bioCtx = null;
  if (r.author.bio?.raw) {
    try {
      const b = emitDocument(r.author.bio.raw, BIO_NAMES);
      bio = b.jsx;
      bioCtx = b.ctx;
      for (const t of b.ctx.used) body.ctx.used.add(t);
      body.ctx.links.push(...b.ctx.links.map((l) => ({ ...l, author: true })));
    } catch (e) {
      if (e instanceof Unsupported) fail(`${slug}: author bio: ${e.message}`);
      throw e;
    }
  }
  const gi = r.author.avatar?.gatsbyImageData;
  const avatarSrc = gi?.images?.fallback?.src || gi?.images?.sources?.[0]?.srcSet?.split(" ")[0] || "";
  let avatar = null;
  if (avatarSrc && isCtfUrl(avatarSrc)) {
    const a = registerAsset(avatarSrc, "author avatar");
    avatar = { remote: a.url, src: a.localUrl };
  }
  author = { name: r.author.name || "", title: r.author.authorTitle || "", bio, avatar, hasBio: Boolean(bioCtx) };
}

// head values: live head is the oracle; page-data must agree
const checks = [];
const check = (name, ok, detail = "") => checks.push({ name, ok, detail });

const title = collapse(r.heading);
check("title equals live <title>", live.title === title, live.title === title ? "" : `live "${live.title}" vs page-data "${title}"`);
const liveDesc = collapse(live.description || "");
const pdDesc = collapse(r.metaDescription || "");
check("live meta description present", Boolean(liveDesc), liveDesc ? "" : "no <meta name=description> on live page");
const descSource = pdDesc ? "page-data metaDescription" : "derived by the live template (first three sentences)";
if (pdDesc) check("description equals page-data metaDescription", liveDesc === pdDesc, liveDesc === pdDesc ? "" : `live "${liveDesc.slice(0, 80)}" vs page-data "${pdDesc.slice(0, 80)}"`);
check("live canonical is the page URL", live.canonical === `${SITE}${pathOf(slug)}`, live.canonical || "none");
check("live robots absent (indexable)", !live.robots, live.robots || "");

// body: emitted JSX vs rich text vs live DOM
const scan = scanJsx(body.jsx);
const expected = walkExpected(body.doc);
check("every text block matches the rich text", sameBlocks(scan.blocks, expected.blocks), firstDiffs(scan.blocks, expected.blocks).join(" | "));
const rawMismatch = scan.blocks.map((b, i) => (b.raw === expected.blocks[i]?.raw ? null : i)).filter((i) => i !== null);
check(
  "text is byte-identical to the rich text (non-breaking spaces and all)",
  rawMismatch.length === 0 && scan.blocks.length === expected.blocks.length,
  rawMismatch.slice(0, 3).map((i) => `#${i}: ${JSON.stringify(scan.blocks[i]?.raw?.slice(-24))} vs ${JSON.stringify(expected.blocks[i]?.raw?.slice(-24))}`).join(" | "),
);
check("every hyperlink survives (count and order)", scan.links.length === expected.links.length, `${scan.links.length} emitted vs ${expected.links.length} in rich text`);
const emittedHrefs = body.ctx.links.filter((l) => !l.author).map((l) => l.href);
check("emitted hrefs equal the rewritten link list", JSON.stringify(scan.links) === JSON.stringify(emittedHrefs));
const TAG_FOR_NODE = {
  paragraph: "BlogP", "heading-2": "BlogH2", "heading-3": "BlogH3", "heading-4": "BlogH4",
  "unordered-list": "BlogUL", "ordered-list": "BlogOL", "list-item": "BlogLI", hr: "BlogHR",
  "embedded-entry-block": "BlogYouTube", "embedded-asset-block": "BlogImage", hyperlink: "BlogA",
};
const countMismatches = Object.entries(TAG_FOR_NODE)
  .filter(([node, tag]) => (expected.counts[node] || 0) !== (scan.counts[tag] || 0))
  .map(([node, tag]) => `${tag} ${scan.counts[tag] || 0} vs ${node} ${expected.counts[node] || 0}`);
check("element counts match the rich text node counts", countMismatches.length === 0, countMismatches.join(", "));
const liveBlocksFiltered = liveBody.blocks;
check("body text equals the live page DOM", sameBlocks(scan.blocks, liveBlocksFiltered), firstDiffs(scan.blocks, liveBlocksFiltered).join(" | "));
const EMPHASIS = ["b", "strong", "i", "em", "u"];
const emittedInline = Object.fromEntries(EMPHASIS.map((t) => [t, scan.counts[t] || 0]));
const liveInline = Object.fromEntries(EMPHASIS.map((t) => [t, liveBody.inline?.[t] || 0]));
check(
  "emphasis elements (b, strong, i, em, u) equal the live page DOM",
  JSON.stringify(emittedInline) === JSON.stringify(liveInline),
  `emitted ${JSON.stringify(emittedInline)} vs live ${JSON.stringify(liveInline)}`,
);
const liveHrefs = liveBody.links.map((l) => l.href);
check("body links equal the live page DOM", JSON.stringify(expected.links) === JSON.stringify(liveHrefs), `${expected.links.length} in rich text vs ${liveHrefs.length} on live`);
check("one <h1> on live page", liveBody.h1Count === 1, `${liveBody.h1Count}`);

// unlisted link targets: confirm with HEAD
const unlisted = [...new Set(body.ctx.links.filter((l) => l.flag === "unlisted").map((l) => l.href))];
const decisions = [];
for (const href of unlisted) {
  const status = flags["no-head"] ? null : await headStatus(`${SITE}${href.split("#")[0]}`);
  decisions.push({ href, status });
}
const needsDecision = decisions.filter((d) => d.status !== 200);

// ------------------------------------------------------------------ download (opt-in)

const downloaded = [];
if (flags.download) {
  for (const a of assets.values()) {
    const dest = path.join(REPO, a.localFile);
    const size = await contentLength(a.url.startsWith("http") ? a.url : `https:${a.url}`);
    if (size && size > 1024 * 1024 && !flags["allow-large"]) {
      downloaded.push({ file: a.localFile, result: `SKIPPED ${(size / 1048576).toFixed(1)} MB, rerun with --allow-large after telling the user` });
      continue;
    }
    let buf;
    try {
      buf = await fetchBuffer(a.url);
    } catch (e) {
      downloaded.push({ file: a.localFile, result: `FAILED ${e.message}` });
      continue;
    }
    if (fs.existsSync(dest)) {
      const same = crypto.createHash("sha256").update(fs.readFileSync(dest)).digest("hex") === crypto.createHash("sha256").update(buf).digest("hex");
      downloaded.push({ file: a.localFile, result: same ? "exists, identical" : "COLLISION: a different file already has this name" });
      continue;
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    downloaded.push({ file: a.localFile, result: `downloaded ${(buf.length / 1024).toFixed(0)} KB` });
  }
  if (hero) {
    const src = path.join(REPO, `static/images/blog/${hero.name}`);
    const dest = path.join(REPO, hero.ogLocalFile);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      const sharp = requireFromRepo("sharp");
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      await sharp(src, { density: 300 }).resize(1200, 630, { fit: "contain", background: "#ffffff" }).png().toFile(dest);
      downloaded.push({ file: hero.ogLocalFile, result: "GENERATED 1200x630 OG image: show it to the user once (shared by many posts)" });
    } else if (fs.existsSync(dest)) {
      downloaded.push({ file: hero.ogLocalFile, result: "exists" });
    }
  }
}

// ------------------------------------------------------------------ candidate page

const used = [...body.ctx.used].filter((t) => /^(Blog|AuthorBio)/.test(t)).sort();
const date = new Date().toISOString().slice(0, 10);
const q = (s) => JSON.stringify(s);
const indent = (s, n) => s.split("\n").map((l) => (l ? " ".repeat(n) + l : l)).join("\n");

const videoNodes = body.ctx.embeds.map((e) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: e.title || title,
  description: liveDesc,
  thumbnailUrl: `https://i.ytimg.com/vi/${e.videoId}/hqdefault.jpg`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${e.videoId}`,
}));

const articleArgs = [`path: PATH`, `headline: TITLE`, `description: DESCRIPTION`];
if (hero) articleArgs.push(`image: OG_IMAGE`);
if (author?.name) articleArgs.push(`authorName: ${q(author.name)}`);
const articleCall = `articleSchema({ ${articleArgs.join(", ")} })`;
const jsonLdData = videoNodes.length
  ? `[\n        ${articleCall},\n${videoNodes.map((n) => "        " + JSON.stringify(n)).join(",\n")},\n      ]`
  : articleCall;

const authorConst = author
  ? `\nconst AUTHOR = {\n  name: ${q(author.name)},\n  title: ${q(author.title)},\n${author.avatar ? `  imageSrc: ${q(author.avatar.src)},\n` : ""}  bio: (\n    <>\n${indent(author.bio, 6)}\n    </>\n  ),\n};\n`
  : "";

const layoutProps = [`title={TITLE}`];
if (hero) layoutProps.push(`hero={{ src: ${q(hero.src)}, alt: "" }}`);
if (author) layoutProps.push(`author={AUTHOR}`);

const page = `// Migrated from Contentful resource "${slug}" (Gatsby node ${r.id}) on ${date}.
// Source: ${SITE}/page-data/${slug}/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout${used.length ? ", " + used.join(", ") : ""} } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = ${q(pathOf(slug))};
const TITLE = ${q(title)};
const DESCRIPTION = ${q(liveDesc)};
${hero ? `const OG_IMAGE = ${q(SITE + hero.ogLocalUrl)};\n` : ""}${authorConst}
export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article"${hero ? " image={OG_IMAGE}" : ""} />
    <JsonLd data={${jsonLdData}} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout ${layoutProps.join(" ")}>
${indent(body.jsx, 4)}
  </StaticBlogLayout>
);

export default Page;
`;

// ------------------------------------------------------------------ outputs

const gateA = checks.every((c) => c.ok);
const rewrites = body.ctx.links.filter((l) => l.notes.length);
const assetList = [...assets.values()].map((a) => ({ ...a, from: [...a.from] }));

fs.writeFileSync(path.join(outDir, "body.jsx"), body.jsx + "\n");
fs.writeFileSync(path.join(outDir, "index.tsx"), page);
fs.writeFileSync(path.join(outDir, "assets.json"), JSON.stringify(assetList, null, 2) + "\n");
fs.writeFileSync(
  path.join(outDir, "meta.json"),
  JSON.stringify(
    {
      slug, path: pathOf(slug), title, description: liveDesc, descriptionSource: descSource,
      liveOgImage: live.og.image, hero, author: author && { ...author, bio: undefined }, embeds: body.ctx.embeds,
      counts: body.ctx.counts, usedPrimitives: used, gatsbyNodeId: r.id,
    },
    null,
    2,
  ) + "\n",
);

const md = [];
md.push(`# ${slug}`, "");
md.push(`Gate A: **${gateA ? "PASS" : "FAIL"}**  |  description source: ${descSource}`, "");
md.push("| check | result |", "|---|---|");
for (const c of checks) md.push(`| ${c.name} | ${c.ok ? "ok" : "**FAIL**"}${c.detail && !c.ok ? ": " + c.detail.replace(/\|/g, "/") : ""} |`);
md.push("", `Counts: ${Object.entries(body.ctx.counts).filter(([, v]) => v).map(([k, v]) => `${k} ${v}`).join(", ")}`);
md.push(`Links: ${body.ctx.links.length} (${body.ctx.links.filter((l) => /^https?:/.test(l.href)).length} external)  |  YouTube embeds: ${body.ctx.embeds.length}  |  author: ${author ? author.name : "none"}`, "");
md.push("## Tier 2 link rewrites", "");
if (rewrites.length) {
  md.push("| from | to | rule |", "|---|---|---|");
  const seen = new Set();
  for (const l of rewrites) {
    const k = `${l.raw}->${l.href}`;
    if (seen.has(k)) continue;
    seen.add(k);
    md.push(`| ${l.raw} | ${l.href} | ${l.notes.join("; ")} |`);
  }
} else md.push("none");
md.push("", "## Needs a decision (do not guess)", "");
const external = body.ctx.links.filter((l) => l.flag === "external-redirect");
if (needsDecision.length || external.length) {
  for (const d of needsDecision) md.push(`- ${d.href}: not in the sitemap and ${d.status === null ? "not checked (--no-head)" : "answers HTTP " + d.status}`);
  for (const l of external) md.push(`- ${l.raw}: ${l.notes.join("; ")}`);
} else md.push("none");
if (decisions.some((d) => d.status === 200)) md.push("", `Unlisted but live (HTTP 200): ${decisions.filter((d) => d.status === 200).map((d) => d.href).join(", ")}`);
md.push("", "## Assets", "");
if (assetList.length) {
  md.push("| remote | kind | local file | used by |", "|---|---|---|---|");
  for (const a of assetList) md.push(`| ${a.url} | ${a.kind} | ${a.localFile} | ${a.from.join(", ")} |`);
  if (hero) md.push("", `Hero live alt "${hero.liveAlt}" -> alt="" (Tier 2). OG image: ${hero.ogLocalFile} (exists: ${fs.existsSync(path.join(REPO, hero.ogLocalFile))})`);
} else md.push("none");
if (downloaded.length) {
  md.push("", "## Download", "");
  for (const d of downloaded) md.push(`- ${d.file}: ${d.result}`);
} else if (assetList.length) md.push("", "Not downloaded yet: rerun with --download (tell the user the size of anything over 1 MB first).");
if (author) md.push("", "## Author", "", `The page has an author (${author.name}). The shell's \`author\` slot is required; build it on this post and show the user.`);
if (body.ctx.embeds.length) md.push("", "## Webinar", "", `${body.ctx.embeds.length} YouTube embed(s): the candidate emits a server-side iframe via BlogYouTube plus VideoObject JSON-LD. No uploadDate is set (unknown).`);
fs.writeFileSync(path.join(outDir, "report.md"), md.join("\n") + "\n");

console.log(`${slug}: Gate A ${gateA ? "PASS" : "FAIL"} | blocks ${scan.blocks.length} | links ${scan.links.length} | embeds ${scan.embeds.length} | assets ${assetList.length} | needs-decision ${needsDecision.length + external.length}`);
for (const c of checks.filter((x) => !x.ok)) console.log(`  FAIL ${c.name}: ${c.detail}`);
console.log(`  wrote ${outDir}`);
const downloadProblems = downloaded.filter((d) => /^(FAILED|COLLISION|SKIPPED)/.test(d.result));
for (const d of downloadProblems) console.log(`  DOWNLOAD PROBLEM ${d.file}: ${d.result}`);
// 0 ok | 3 Gate A failed | 4 an asset could not be downloaded (rerun; the page is not complete)
process.exit(gateA ? (downloadProblems.length ? 4 : 0) : 3);
