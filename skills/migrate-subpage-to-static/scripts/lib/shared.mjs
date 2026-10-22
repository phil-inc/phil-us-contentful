// Shared helpers for the migrate-subpage-to-static scripts.
// Node built-ins plus node-html-parser (already a project dependency). No new packages.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

export const SITE = "https://phil.us";

const here = path.dirname(fileURLToPath(import.meta.url));
/** skills/migrate-subpage-to-static/scripts/lib -> repo root */
export const REPO = path.resolve(here, "../../../..");

const require = createRequire(path.join(REPO, "package.json"));
export const { parse: parseHtml } = require("node-html-parser");
/** Loads a package installed in the repo (used for `sharp`, which only --download needs). */
export const requireFromRepo = (id) => require(id);

// ---------------------------------------------------------------- CLI / IO

/** Minimal flag parser: `--flag`, `--key value`, and positionals. */
export function parseArgs(argv, valueFlags = []) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      if (valueFlags.includes(key)) flags[key] = argv[++i];
      else flags[key] = true;
    } else positional.push(a);
  }
  return { flags, positional };
}

/** Retries transient failures (timeouts, resets) with backoff. HTTP error statuses are final. */
async function withRetry(fn, tries = 4) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (e.noRetry) break;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1) ** 2));
    }
  }
  throw last;
}

const httpError = (method, url, status) => {
  const e = new Error(`${method} ${url} -> HTTP ${status}`);
  e.noRetry = true;
  return e;
};

export async function fetchText(url, { method = "GET" } = {}) {
  return withRetry(async () => {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      headers: { "user-agent": "phil-migrate-subpage/1.0" },
    });
    if (!res.ok) throw httpError(method, url, res.status);
    return method === "HEAD" ? "" : res.text();
  });
}

export async function fetchBuffer(url) {
  return withRetry(async () => {
    const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "phil-migrate-subpage/1.0" } });
    if (!res.ok) throw httpError("GET", url, res.status);
    return Buffer.from(await res.arrayBuffer());
  });
}

export async function headStatus(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      headers: { "user-agent": "phil-migrate-subpage/1.0" },
    });
    return res.status;
  } catch {
    return 0;
  }
}

export async function contentLength(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    const n = Number(res.headers.get("content-length"));
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- text

export const collapse = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
export const pathOf = (slug) => `/${slug}/`;

// ---------------------------------------------------------------- netlify redirects

/** Reads [[redirects]] blocks from netlify.toml. Only from/to/status are needed. */
export function loadRedirects(repo = REPO) {
  const text = fs.readFileSync(path.join(repo, "netlify.toml"), "utf8");
  const rules = [];
  let cur = null;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("[[redirects]]")) {
      if (cur) rules.push(cur);
      cur = {};
      continue;
    }
    if (line.startsWith("[")) {
      if (cur) rules.push(cur);
      cur = null;
      continue;
    }
    if (!cur || line.startsWith("#")) continue;
    const m = line.match(/^(from|to|status|query)\s*=\s*(.+)$/);
    if (m) cur[m[1]] = m[2].replace(/\s+#.*$/, "").replace(/^"|"$/g, "").trim();
  }
  if (cur) rules.push(cur);
  return rules
    .filter((r) => r.from && r.to)
    // `query` marks a rule that only fires when the URL carries that parameter (the listing
    // pagination rules: from "/resources/" with query {page = ":page"}). matchRule skips them.
    .map((r) => ({ from: r.from, to: r.to, status: Number(r.status || 301), query: r.query !== undefined }));
}

const trimSlash = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/** First matching 3xx rule for a plain pathname (exact or `/*` splat). */
function matchRule(rules, pathname) {
  for (const r of rules) {
    if (r.status < 300 || r.status >= 400) continue;
    if (r.query || r.from.includes("?") || r.from.includes(":")) continue; // query / placeholder rules are out of scope
    if (r.from.endsWith("/*")) {
      const prefix = r.from.slice(0, -1); // keeps trailing slash
      if (pathname.startsWith(prefix)) {
        return { rule: r, splat: pathname.slice(prefix.length) };
      }
      if (trimSlash(pathname) === trimSlash(prefix)) return { rule: r, splat: "" };
    } else if (trimSlash(r.from) === trimSlash(pathname)) {
      return { rule: r, splat: "" };
    }
  }
  return null;
}

/** Follows internal 3xx rules. Returns { final, hops, external } where `final` is a path. */
export function resolveRedirect(pathname, rules, maxHops = 3) {
  let current = pathname;
  const hops = [];
  for (let i = 0; i < maxHops; i++) {
    const hit = matchRule(rules, current);
    if (!hit) break;
    const to = hit.rule.to.replace(":splat", hit.splat);
    hops.push({ from: current, to, status: hit.rule.status });
    if (/^https?:\/\//i.test(to)) return { final: to, hops, external: true };
    current = to;
  }
  return { final: current, hops, external: false };
}

// ---------------------------------------------------------------- sitemap

export async function loadSitemapPaths({ file, base = SITE } = {}) {
  const xml = file ? fs.readFileSync(file, "utf8") : await fetchText(`${base}/sitemap-0.xml`);
  const set = new Set();
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      set.add(new URL(m[1]).pathname);
    } catch {
      /* ignore malformed */
    }
  }
  return set;
}

// ---------------------------------------------------------------- links

export const isCtfUrl = (u) => /^(https?:)?\/\/(images|assets|downloads|videos)\.ctfassets\.net\//i.test(u);

export function normalizeCtfUrl(u) {
  let out = u.startsWith("//") ? `https:${u}` : u;
  out = out.split("#")[0].split("?")[0];
  return out;
}

const hasFileExtension = (p) => /\.[A-Za-z0-9]{2,5}$/.test(p.split("/").pop() || "");

/**
 * Applies the skill's link rules (all Tier 2) to one hyperlink target.
 * Returns { href, notes, flag } where `flag` is "unlisted" when the destination is an
 * internal path that is neither in the sitemap nor a redirect (decision needed).
 */
export function rewriteHref(uri, { redirects = [], sitemap = null } = {}) {
  const notes = [];
  const raw = String(uri ?? "").trim();
  if (!raw || raw.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(raw)) {
    return { href: raw, notes, flag: null };
  }

  let pathname;
  let search = "";
  let hash = "";
  if (/^https?:\/\//i.test(raw) || raw.startsWith("//")) {
    let url;
    try {
      url = new URL(raw.startsWith("//") ? `https:${raw}` : raw);
    } catch {
      return { href: raw, notes, flag: null };
    }
    if (!/^(www\.)?phil\.us$/i.test(url.hostname)) return { href: raw, notes, flag: null };
    pathname = url.pathname;
    search = url.search;
    hash = url.hash;
    notes.push("absolute phil.us -> relative");
  } else if (raw.startsWith("/")) {
    const u = new URL(raw, SITE);
    pathname = u.pathname;
    search = u.search;
    hash = u.hash;
  } else {
    return { href: raw, notes, flag: null }; // relative without slash: leave alone
  }

  if (/%23/i.test(pathname)) {
    pathname = pathname.replace(/%23/gi, "#");
    const i = pathname.indexOf("#");
    hash = pathname.slice(i);
    pathname = pathname.slice(0, i);
    notes.push("%23 -> #");
  }

  if (!pathname.endsWith("/") && !hasFileExtension(pathname)) {
    pathname += "/";
    notes.push("trailing slash");
  }

  let flag = null;
  const r = resolveRedirect(pathname, redirects);
  if (r.hops.length) {
    if (r.external) {
      notes.push(`redirects externally to ${r.final} (left as is)`);
      flag = "external-redirect";
    } else {
      const dest = new URL(r.final, SITE);
      pathname = dest.pathname;
      if (dest.search) search = dest.search;
      if (dest.hash) hash = dest.hash;
      if (!pathname.endsWith("/") && !hasFileExtension(pathname)) pathname += "/";
      notes.push(`redirect hop removed (${r.hops.map((h) => h.from).join(" -> ")} -> ${r.final})`);
    }
  } else if (sitemap && pathname !== "/" && !hasFileExtension(pathname) && !sitemap.has(pathname)) {
    flag = "unlisted";
  }

  return { href: `${pathname}${search}${hash}`, notes, flag };
}

// ---------------------------------------------------------------- live DOM helpers

export function metaContent(root, selector) {
  const el = root.querySelector(selector);
  return el ? el.getAttribute("content") ?? null : null;
}

export function readHead(html) {
  const root = parseHtml(html);
  const jsonld = [];
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const j = JSON.parse(s.text);
      for (const n of j["@graph"] || [j]) jsonld.push(n);
    } catch {
      jsonld.push({ "@type": "__unparseable__" });
    }
  }
  const canonical = root.querySelector('link[rel="canonical"]');
  const title = root.querySelector("title");
  return {
    root,
    title: title ? collapse(title.text) : null,
    description: metaContent(root, 'meta[name="description"]'),
    canonical: canonical ? canonical.getAttribute("href") : null,
    robots: metaContent(root, 'meta[name="robots"]'),
    og: Object.fromEntries(
      ["title", "description", "type", "url", "image"].map((k) => [k, metaContent(root, `meta[property="og:${k}"]`)]),
    ),
    twitter: Object.fromEntries(
      ["card", "title", "description", "image"].map((k) => [k, metaContent(root, `meta[name="twitter:${k}"]`)]),
    ),
    jsonld,
  };
}

/**
 * Locates the article body in a rendered page (live Contentful template or the static shell).
 * Both put the <h1> and the body under one wrapper; the body is the wrapper child with the
 * most text that is not the <h1>.
 */
export function readBody(root) {
  const h1s = root.querySelectorAll("h1");
  const h1 = h1s[0] || null;
  if (!h1) return { h1Count: 0, h1: null, blocks: [], headings: [], links: [], inline: {} };
  const wrapper = h1.parentNode;
  let body = null;
  let best = -1;
  for (const child of wrapper.childNodes) {
    if (child.nodeType !== 1 || child === h1 || child.rawTagName === "style") continue;
    if (/floatingImage/.test(child.getAttribute("class") || "")) continue;
    if (/Share this article on/.test(child.text)) continue;
    const len = child.text.length;
    if (len > best) {
      best = len;
      body = child;
    }
  }
  const scope = body || wrapper;
  const blocks = [];
  const headings = [{ level: 1, text: collapse(h1.text) }];
  for (const el of scope.querySelectorAll("p, h2, h3, h4, h6")) {
    const tag = el.rawTagName.toLowerCase();
    const text = collapse(el.text);
    if (tag === "p" && text === "Loading...") continue; // client-only embed placeholder on live
    blocks.push({ tag, text });
    if (tag !== "p") headings.push({ level: Number(tag[1]), text });
  }
  const links = scope.querySelectorAll("a").map((a) => ({
    href: a.getAttribute("href") || "",
    target: a.getAttribute("target") || "",
    referrerpolicy: a.getAttribute("referrerpolicy") || "",
    text: collapse(a.text),
  }));
  // Emphasis elements are not interchangeable here: on this site's CSS a <strong> inside a
  // 700-weight heading computes to 900 while a <b> stays 700, so the tag itself is compared.
  const inline = {};
  for (const el of scope.querySelectorAll("b, strong, i, em, u")) {
    const tag = el.rawTagName.toLowerCase();
    inline[tag] = (inline[tag] || 0) + 1;
  }
  return { h1Count: h1s.length, h1: collapse(h1.text), blocks, headings, links, inline };
}

// ---------------------------------------------------------------- misc

export function sanitizeFileName(name) {
  let n = name;
  try {
    n = decodeURIComponent(name);
  } catch {
    /* keep as is */
  }
  return n.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_{2,}/g, "_");
}

export function readMigratedSlugs(repo = REPO) {
  const file = path.join(repo, "src/constants/migratedStaticSlugs.ts");
  if (!fs.existsSync(file)) return [];
  const text = fs
    .readFileSync(file, "utf8")
    .split("\n")
    .filter((l) => !l.trim().startsWith("//") && !l.trim().startsWith("*") && !l.trim().startsWith("/*"))
    .join("\n");
  const body = text.match(/new Set(?:<[^>]*>)?\(\s*\[([\s\S]*?)\]\s*\)/);
  if (!body) return [];
  return [...body[1].matchAll(/["'`]([a-z0-9-]+)["'`]/g)].map((m) => m[1]);
}
