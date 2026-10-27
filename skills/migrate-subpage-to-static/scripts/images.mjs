#!/usr/bin/env node
// Image weight check for the migrated posts (src/pages/_posts/*/index.tsx). Reads only; never edits a page.
//
//   node scripts/images.mjs            check; exit 1 on a problem
//   node scripts/images.mjs --convert  also write a .webp beside every referenced PNG/JPEG/GIF (or heavy SVG)
//                                      and print the page edits to make (use the Edit tool, then rerun the check)
//
// Rules (SKILL.md, Phase 3):
//   1. every local /images/blog/ and /pdf/ path a page uses exists under static/
//   2. a hero, body image or avatar is WebP, or an SVG of at most 100 KB; a link target (<BlogA href>) is a download and may be anything
//   3. no hero, body image or avatar is over 200 KB
//   4. a <BlogImage> width/height has the aspect ratio of its file, and is not wider than 840
//   5. a social card (/images/blog/og/*) is WebP, 1200x630 and under the same 200 KB budget (visitors never download
//      it, so this is repo and crawler weight, not page speed)
// An image under static/images/blog/ that no page uses is reported as a warning.
import fs from "node:fs";
import path from "node:path";
import { REPO, requireFromRepo, SVG_RASTERISE_BYTES, WEBP_MAX_PX, webpName, toWebp } from "./lib/shared.mjs";

const convert = process.argv.includes("--convert");
const sharp = requireFromRepo("sharp");
const postsDir = path.join(REPO, "src/pages/_posts");
const BUDGET = 200 * 1024;
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

// ---- collect references: { file, ref, role, line, width, height }
const refs = [];
for (const slug of fs.readdirSync(postsDir).sort()) {
  const f = path.join(postsDir, slug, "index.tsx");
  if (!fs.existsSync(f)) continue;
  fs.readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    // A site path starts a string literal or follows https://phil.us; "/pdf/..." inside another host's URL is not ours.
    for (const m of line.matchAll(/(?:https:\/\/phil\.us|(?<=["'`]))(\/(?:images\/blog|pdf)\/[A-Za-z0-9._/-]+)/g)) {
      const ref = m[1];
      let role = "other";
      if (ref.startsWith("/images/blog/og/")) role = "og";
      else if (/<BlogA\b[^>]*href=/.test(line) && line.includes(`href="${ref}`)) role = "link";
      else if (/hero=\{\{\s*src:/.test(line)) role = "hero";
      else if (/<BlogImage\b/.test(line)) role = "body image";
      else if (/imageSrc:/.test(line)) role = "author avatar";
      const w = line.match(/\bwidth="(\d+)"/), h = line.match(/\bheight="(\d+)"/);
      refs.push({ slug, ref, role, line: i + 1, width: w && +w[1], height: h && +h[1] });
    }
  });
}

const problems = [], warnings = [];
const used = new Set(refs.map((r) => r.ref));
const toDisk = (ref) => path.join(REPO, "static", ref);
const metaCache = new Map();
const meta = async (p) => metaCache.get(p) ?? metaCache.set(p, await sharp(p).metadata()).get(p);

let bytes = 0;
const counted = new Set();
const todo = new Map(); // ref -> { role, slugs }

for (const r of refs) {
  const disk = toDisk(r.ref);
  const where = `${r.slug} line ${r.line}`;
  if (!fs.existsSync(disk)) {
    problems.push(`${where}: ${r.ref} does not exist under static/`);
    continue;
  }
  const size = fs.statSync(disk).size;
  const ext = path.extname(disk).slice(1).toLowerCase();
  if (r.ref.startsWith("/pdf/") || r.role === "link") continue;

  if (r.role === "og") {
    const m = await meta(disk);
    if (m.width !== 1200 || m.height !== 630) problems.push(`${where}: social card ${r.ref} is ${m.width}x${m.height}, must be 1200x630`);
    if (ext !== "webp") {
      problems.push(`${where}: social card ${r.ref} is ${kb(size)} ${ext.toUpperCase()}; store it as WebP (--convert)`);
      if (!todo.has(r.ref)) todo.set(r.ref, { role: "og", slugs: new Set() });
      todo.get(r.ref).slugs.add(r.slug);
    } else if (size > BUDGET) {
      problems.push(`${where}: social card ${r.ref} is ${kb(size)}, over the ${kb(BUDGET)} budget`);
    }
    continue;
  }

  if (!counted.has(r.ref)) {
    counted.add(r.ref);
    bytes += size;
  }
  const raster = ["png", "jpg", "jpeg", "gif"].includes(ext);
  const heavySvg = ext === "svg" && size > SVG_RASTERISE_BYTES;
  if (raster || heavySvg) {
    problems.push(`${where}: ${r.role} ${r.ref} is ${kb(size)} ${ext.toUpperCase()}; store it as WebP (--convert)`);
    if (!todo.has(r.ref)) todo.set(r.ref, { role: r.role, slugs: new Set() });
    todo.get(r.ref).slugs.add(r.slug);
  } else if (size > BUDGET) {
    problems.push(`${where}: ${r.role} ${r.ref} is ${kb(size)}, over the ${kb(BUDGET)} budget`);
  }

  if (r.role === "body image" && r.width && r.height) {
    const m = await meta(disk);
    const off = Math.abs(r.width / r.height - m.width / m.height) / (m.width / m.height);
    if (off > 0.015) problems.push(`${where}: width/height ${r.width}x${r.height} does not match the file ${m.width}x${m.height}`);
    if (r.width > WEBP_MAX_PX["body image"]) problems.push(`${where}: width ${r.width} is above ${WEBP_MAX_PX["body image"]} (the wrapper is 420 px)`);
  }
}

// ---- unused files
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const f of walk(path.join(REPO, "static/images/blog"))) {
  const ref = "/" + path.relative(path.join(REPO, "static"), f).split(path.sep).join("/");
  if (!used.has(ref)) warnings.push(`${ref} (${kb(fs.statSync(f).size)}) is not used by any page`);
}

// ---- convert
if (convert) {
  for (const [ref, { role, slugs }] of todo) {
    const src = toDisk(ref);
    const out = toDisk(path.posix.join(path.posix.dirname(ref), webpName(path.posix.basename(ref))));
    const max = role === "og" ? null : WEBP_MAX_PX[role] || WEBP_MAX_PX.hero; // a social card keeps its 1200x630
    const { data, info } = await toWebp(src, max);
    fs.writeFileSync(out, data);
    const rel = (p) => "/" + path.relative(path.join(REPO, "static"), p).split(path.sep).join("/");
    console.log(`${ref} ${kb(fs.statSync(src).size)} -> ${rel(out)} ${kb(data.length)} (${info.width}x${info.height}${max ? `, max ${max}` : ""})`);
    console.log(`   edit in: ${[...slugs].join(", ")}${role === "body image" ? `   (set width="${info.width}" height="${info.height}")` : ""}`);
  }
}

console.log(`${refs.length} image/PDF references in ${new Set(refs.map((r) => r.slug)).size} pages | ${counted.size} hero/body/avatar files, ${kb(bytes)} in total`);
for (const w of warnings) console.log(`warning: ${w}`);
if (problems.length) {
  for (const p of problems) console.log(`PROBLEM: ${p}`);
  console.log(`FAIL: ${problems.length} problem(s)`);
  process.exit(convert ? 0 : 1); // --convert only prepares the files; the check is the gate
}
console.log("PASS: every referenced file exists, hero/body/avatar images are WebP or light SVG and under budget, social cards are 1200x630 WebP");
