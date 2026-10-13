#!/usr/bin/env node
// Gate B: compares a migrated page (built HTML) with the live Contentful page.
//
//   node scripts/parity.mjs <slug> --built <publicDir>
//   node scripts/parity.mjs --all-migrated --built <publicDir>
//   node scripts/parity.mjs --all-migrated --preview https://deploy-preview-123--site.netlify.app
//   node scripts/parity.mjs <slug> --local-html <file> [--live-html <file>]
//
// Needs real build output, either a local production build (--built) or a Netlify deploy
// preview (--preview): `gatsby develop` does not emit the SSR head/body that crawlers see,
// so do not run this against the dev server and call it SEO parity.
// Exit codes: 0 all Tier 1 checks pass | 1 at least one Tier 1 check failed | 2 usage / missing file
import fs from "node:fs";
import path from "node:path";
import {
  SITE, parseArgs, fetchText, headStatus, collapse, pathOf, loadRedirects, rewriteHref, readHead, readBody,
  readMigratedSlugs, isCtfUrl, normalizeCtfUrl, sanitizeFileName,
} from "./lib/shared.mjs";

const { flags, positional } = parseArgs(process.argv.slice(2), ["built", "preview", "local-html", "live-html", "live-base"]);
const liveBase = flags["live-base"] || SITE;
const built = flags.built ? path.resolve(flags.built) : null;
const preview = flags.preview ? String(flags.preview).replace(/\/+$/, "") : null;

let slugs = positional;
if (flags["all-migrated"]) slugs = readMigratedSlugs();
if (!slugs.length) {
  console.error("usage: node scripts/parity.mjs <slug>|--all-migrated (--built <publicDir> | --preview <url> | --local-html <file>)");
  process.exit(2);
}
if (!built && !preview && !flags["local-html"]) {
  console.error("need --built <publicDir>, --preview <url>, or --local-html <file>");
  process.exit(2);
}

const redirects = loadRedirects();
// A link to a Contentful asset points, on the migrated page, at the copy convert.mjs downloaded
// (same file name rule as registerAsset in convert.mjs). Everything else follows rewriteHref.
const normalise = (href) => {
  if (isCtfUrl(href)) {
    const name = sanitizeFileName(normalizeCtfUrl(href).split("/").pop());
    const ext = (name.split(".").pop() || "").toLowerCase();
    if (ext === "pdf") return `/pdf/${name}`;
    if (["png", "jpg", "jpeg", "svg", "webp", "gif"].includes(ext)) return `/images/blog/${name}`;
  }
  return rewriteHref(href, { redirects }).href;
};
// Head strings: the converter trims and collapses runs of whitespace (a trailing space or a
// double space in a CMS field is not content), so compare them the way "meta description" is.
const text = (v) => (v == null ? null : collapse(v));

const articleNode = (jsonld) => jsonld.find((n) => n["@type"] === "Article" || n["@type"] === "BlogPosting");
const idOf = (v) => (v && typeof v === "object" ? v["@id"] : v) ?? null;

function compare(slug, liveHtml, localHtml, extras) {
  const rows = [];
  const t1 = (name, a, b) => rows.push({ tier: 1, name, ok: JSON.stringify(a) === JSON.stringify(b), live: a, local: b });
  const t1ok = (name, ok, detail) => rows.push({ tier: 1, name, ok, live: detail, local: "" });
  const info = (name, live, local) => rows.push({ tier: 2, name, ok: true, live, local });

  const L = readHead(liveHtml);
  const N = readHead(localHtml);
  const LB = readBody(L.root);
  const NB = readBody(N.root);

  // Tier 1: head
  t1("title", L.title, N.title);
  t1("meta description", collapse(L.description || ""), collapse(N.description || ""));
  t1("canonical", L.canonical, N.canonical);
  t1("canonical equals og:url", N.canonical, N.og.url);
  t1("robots", L.robots, N.robots);
  for (const k of ["title", "description", "type", "url"]) t1(`og:${k}`, text(L.og[k]), text(N.og[k]));
  for (const k of ["card", "title", "description"]) t1(`twitter:${k}`, text(L.twitter[k]), text(N.twitter[k]));

  // Tier 1: Article JSON-LD
  const la = articleNode(L.jsonld);
  const na = articleNode(N.jsonld);
  if (!na) t1ok("Article JSON-LD present", false, "none found");
  else {
    for (const k of ["headline", "description", "url"]) t1(`Article.${k}`, text(la?.[k]), text(na[k]));
    t1("Article.mainEntityOfPage", idOf(la?.mainEntityOfPage), idOf(na.mainEntityOfPage));
    t1("Article.publisher @id", idOf(la?.publisher), idOf(na.publisher));
    t1("Article.author", la?.author?.name ?? null, na.author?.name ?? null);
    t1ok("Article has no datePublished/dateModified", !na.datePublished && !na.dateModified, `${na.datePublished || ""} ${na.dateModified || ""}`.trim());
  }
  const countType = (t) => N.jsonld.filter((n) => n["@type"] === t).length;
  t1ok("exactly one Organization and one WebSite node", countType("Organization") === 1 && countType("WebSite") === 1, `Organization ${countType("Organization")}, WebSite ${countType("WebSite")}`);
  t1ok("JSON-LD parses", !N.jsonld.some((n) => n["@type"] === "__unparseable__"), "");

  // Tier 1: body
  t1ok("exactly one <h1>", NB.h1Count === 1, `${NB.h1Count}`);
  t1("h1 text", LB.h1, NB.h1);
  t1("heading levels and text", LB.headings, NB.headings);
  const sameBlocks = JSON.stringify(LB.blocks) === JSON.stringify(NB.blocks);
  rows.push({
    tier: 1, name: `body text blocks (${LB.blocks.length} live / ${NB.blocks.length} local)`, ok: sameBlocks,
    live: sameBlocks ? "" : firstDiff(LB.blocks, NB.blocks), local: "",
  });
  const liveLinks = LB.links.map((l) => normalise(l.href));
  const localLinks = NB.links.map((l) => normalise(l.href));
  const sameLinks = JSON.stringify(liveLinks) === JSON.stringify(localLinks);
  rows.push({
    tier: 1, name: `link targets after Tier 2 rules (${liveLinks.length} live / ${localLinks.length} local)`, ok: sameLinks,
    live: sameLinks ? "" : liveLinks.map((h, i) => (h === localLinks[i] ? null : `#${i}: ${h} vs ${localLinks[i] ?? "(none)"}`)).filter(Boolean).slice(0, 3).join(" | "), local: "",
  });
  t1("emphasis elements (b, strong, i, em, u)", LB.inline, NB.inline);
  t1("link attributes (target, referrerpolicy)", LB.links.map((l) => [l.target, l.referrerpolicy]), NB.links.map((l) => [l.target, l.referrerpolicy]));

  // Gate B extras: crawlability / off-Contentful
  // gatsby-source-contentful adds <link rel="preconnect" href="https://images.ctfassets.net"> to
  // every page while the plugin is installed. That connection hint is site-wide, not content,
  // so it is not counted; any other reference (an <img>, a link, JSON-LD) is.
  const withoutHints = localHtml.replace(/<link\b[^>]*\brel=["'](?:preconnect|dns-prefetch)["'][^>]*>/gi, "");
  const ctf = (withoutHints.match(/ctfassets\.net/g) || []).length;
  t1ok("no ctfassets.net in the HTML (site-wide preconnect hint excluded)", ctf === 0, `${ctf} occurrence(s)`);
  t1ok('no "Loading..." placeholder in the HTML', !/Loading\.\.\./.test(N.root.text), "");
  if (extras) {
    t1ok("in sitemap-0.xml", extras.inSitemap, extras.sitemapNote);
    t1ok("title appears in llms-full.txt", extras.inLlms, extras.llmsNote);
    t1ok("nothing built under _posts/", extras.noPostsDir, "");
  }

  // Tier 2 (informational: expected to differ or to be additions)
  info("og:image", L.og.image, N.og.image);
  info("Article.image", la?.image ?? null, na?.image ?? null);
  info("VideoObject nodes", L.jsonld.filter((n) => n["@type"] === "VideoObject").length, N.jsonld.filter((n) => n["@type"] === "VideoObject").length);
  info("<article> element", /<article[\s>]/.test(liveHtml), /<article[\s>]/.test(localHtml));
  return rows;
}

function firstDiff(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const x = a[i], y = b[i];
    if (!x || !y || x.tag !== y.tag || x.text !== y.text) {
      return `#${i}: live ${x ? `<${x.tag}> "${x.text.slice(0, 60)}"` : "(none)"} vs local ${y ? `<${y.tag}> "${y.text.slice(0, 60)}"` : "(none)"}`;
    }
  }
  return "";
}

let anyFail = false;
for (const slug of slugs) {
  console.log(`\n== ${slug}`);
  let liveHtml;
  let localHtml;
  try {
    liveHtml = flags["live-html"] ? fs.readFileSync(flags["live-html"], "utf8") : await fetchText(`${liveBase}${pathOf(slug)}`);
  } catch (e) {
    console.log(`  FAIL could not load live page: ${e.message}`);
    anyFail = true;
    continue;
  }
  if (preview && !flags["local-html"]) {
    try {
      localHtml = await fetchText(`${preview}${pathOf(slug)}`);
    } catch (e) {
      console.log(`  FAIL page not served by the preview at ${pathOf(slug)}: ${e.message}`);
      anyFail = true;
      continue;
    }
  } else {
    const localFile = flags["local-html"] || path.join(built, slug, "index.html");
    if (!fs.existsSync(localFile)) {
      console.log(`  FAIL ${localFile} does not exist (page not built at /${slug}/)`);
      anyFail = true;
      continue;
    }
    localHtml = fs.readFileSync(localFile, "utf8");
  }

  let extras = null;
  if (preview && !flags["local-html"]) {
    const grab = async (p) => {
      try {
        return await fetchText(`${preview}${p}`);
      } catch {
        return null;
      }
    };
    const smText = await grab("/sitemap-0.xml");
    const llmsText = await grab("/llms-full.txt");
    const title = readHead(localHtml).title || "";
    extras = {
      inSitemap: smText ? smText.includes(`<loc>${SITE}${pathOf(slug)}</loc>`) : false,
      sitemapNote: smText ? "" : "sitemap-0.xml not served by the preview",
      inLlms: llmsText ? llmsText.includes(title) : false,
      llmsNote: llmsText ? "" : "llms-full.txt not served by the preview",
      noPostsDir: (await headStatus(`${preview}/_posts/${slug}/`)) === 404,
    };
  } else if (built) {
    const sm = path.join(built, "sitemap-0.xml");
    const smText = fs.existsSync(sm) ? fs.readFileSync(sm, "utf8") : null;
    const llms = path.join(built, "llms-full.txt");
    const llmsText = fs.existsSync(llms) ? fs.readFileSync(llms, "utf8") : null;
    const title = readHead(localHtml).title || "";
    extras = {
      inSitemap: smText ? smText.includes(`<loc>${SITE}${pathOf(slug)}</loc>`) : false,
      sitemapNote: smText ? "" : "sitemap-0.xml not found in build",
      inLlms: llmsText ? llmsText.includes(title) : false,
      llmsNote: llmsText ? "" : "llms-full.txt not found in build",
      noPostsDir: !fs.existsSync(path.join(built, "_posts")),
    };
  }

  const rows = compare(slug, liveHtml, localHtml, extras);
  const failed = rows.filter((r) => r.tier === 1 && !r.ok);
  if (failed.length) anyFail = true;
  for (const r of rows.filter((x) => x.tier === 1)) {
    console.log(`  ${r.ok ? "PASS" : "FAIL"} ${r.name}${r.ok ? "" : `\n         live:  ${show(r.live)}\n         local: ${show(r.local)}`}`);
  }
  console.log("  Tier 2 (informational):");
  for (const r of rows.filter((x) => x.tier === 2)) console.log(`       ${r.name}: live ${show(r.live)} | local ${show(r.local)}`);
  console.log(`  => ${failed.length ? `${failed.length} Tier 1 FAILURE(S)` : "Tier 1 parity OK"}`);
}

function show(v) {
  const s = typeof v === "string" ? v : JSON.stringify(v);
  return s && s.length > 160 ? s.slice(0, 157) + "..." : s;
}

console.log(`\n${anyFail ? "RESULT: FAIL" : "RESULT: PASS"} (${slugs.length} page${slugs.length === 1 ? "" : "s"})`);
process.exit(anyFail ? 1 : 0);
