#!/usr/bin/env node
// Build-free check of the route grouping. Evaluates the page-creator entries in
// gatsby-config.ts against the real src/pages tree using gatsby-plugin-page-creator's own
// path functions (validatePath, ignorePath, createPath), then asserts:
//   1. nothing is served under /_posts/            (the `_posts/**` ignore is in place)
//   2. no URL is claimed by more than one file     (no duplicate routes)
//   3. every slug in MIGRATED_STATIC_SLUGS is served at /<slug> by exactly one page,
//      and that page lives in src/pages/_posts/
//
//   node scripts/route-check.mjs
//
// Exit codes: 0 all hold | 1 a check failed | 2 could not evaluate the config
// It reads gatsby-config.ts only; it does not need Contentful credentials or a build.
import fs from "node:fs";
import path from "node:path";
import { REPO, requireFromRepo, readMigratedSlugs } from "./lib/shared.mjs";

const ts = requireFromRepo("typescript");
const { validatePath, ignorePath, createPath } = requireFromRepo("gatsby-page-utils");
const globby = requireFromRepo("globby");

function loadConfig(file) {
  const source = fs.readFileSync(file, "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  // The config builds its paths from __dirname, which must be the repo root.
  new Function("require", "module", "exports", "__dirname", "__filename", js)(
    requireFromRepo,
    mod,
    mod.exports,
    REPO,
    file,
  );
  return mod.exports.default || mod.exports;
}

// ROUTE_CHECK_CONFIG points at an alternative config file (used to prove the check can fail).
const configFile = process.env.ROUTE_CHECK_CONFIG || path.join(REPO, "gatsby-config.ts");

let config;
try {
  config = loadConfig(configFile);
} catch (e) {
  console.error(`Could not evaluate gatsby-config.ts: ${e.message}`);
  process.exit(2);
}

const creators = (config.plugins || [])
  .filter((p) => p && typeof p === "object" && p.resolve === "gatsby-plugin-page-creator")
  .map((p) => p.options);

const urls = new Map();
for (const opts of creators) {
  if (!fs.existsSync(opts.path)) {
    console.error(`page-creator path does not exist (the build would fail): ${opts.path}`);
    process.exit(1);
  }
  for (const file of globby.sync("**/*.{ts,tsx,js,jsx}", { cwd: opts.path })) {
    if (!validatePath(file) || ignorePath(file, opts.ignore)) continue;
    const abs = path.join(opts.path, file);
    if (/[{[]/.test(abs)) continue; // collection and client-only routes are not relevant here
    const url = createPath(file) || "/";
    if (!urls.has(url)) urls.set(url, []);
    urls.get(url).push(path.relative(REPO, abs));
  }
}

const problems = [];
console.log(`page-creator instances: ${creators.length} | URLs from file routing: ${urls.size}`);

const underPosts = [...urls.keys()].filter((u) => u === "/_posts" || u.startsWith("/_posts/"));
if (underPosts.length) problems.push(`served under /_posts/: ${underPosts.join(", ")}`);

for (const [url, files] of urls) {
  if (files.length > 1) problems.push(`${url} is claimed by ${files.length} files: ${files.join(", ")}`);
}

const slugs = readMigratedSlugs();
for (const slug of slugs) {
  const files = urls.get(`/${slug}`) || [];
  const expected = `src/pages/_posts/${slug}/index.tsx`;
  if (files.length !== 1) problems.push(`/${slug} is served by ${files.length} page(s), expected 1`);
  else if (files[0] !== expected) problems.push(`/${slug} is served by ${files[0]}, expected ${expected}`);
}
console.log(`migrated slugs checked: ${slugs.length}`);

if (problems.length) {
  console.log("\nFAIL");
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log("PASS: nothing under /_posts/, no duplicate URLs, every migrated slug served once from _posts");
