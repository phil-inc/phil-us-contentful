#!/usr/bin/env node
// Proves that each page written under src/pages/_posts/<slug>/ is the converter's candidate,
// byte for byte, and nothing else. Run it after writing pages (Phase 4).
//
//   node scripts/verify-written.mjs <candidatesDir> [slug ...]
//
// <candidatesDir> holds <slug>/index.tsx as produced by convert.mjs --out <candidatesDir>/<slug>.
// With no slugs it checks every folder under src/pages/_posts/.
//
// The Write and Edit tools usually decode a four-digit unicode escape in their input, so a page
// written through them holds the real character where the candidate holds the escape, but not
// always: a page can come out with the escape kept. Inside a string expression the two are the
// same text, so both sides are decoded before comparing and neither form is reported.
// Exit codes: 0 all identical | 1 a page differs or has no candidate | 2 usage
import fs from "node:fs";
import path from "node:path";
import { REPO } from "./lib/shared.mjs";

const [candidatesDir, ...only] = process.argv.slice(2);
if (!candidatesDir) {
  console.error("usage: node scripts/verify-written.mjs <candidatesDir> [slug ...]");
  process.exit(2);
}

const postsDir = path.join(REPO, "src/pages/_posts");
const esc = "\\" + "u00a0";
const NBSP = String.fromCharCode(160);

const slugs = only.length
  ? only
  : fs.readdirSync(postsDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);

let identical = 0;
const problems = [];
for (const slug of slugs) {
  const pageFile = path.join(postsDir, slug, "index.tsx");
  const candFile = path.join(candidatesDir, slug, "index.tsx");
  if (!fs.existsSync(pageFile)) {
    problems.push(`${slug}: page not written`);
    continue;
  }
  if (!fs.existsSync(candFile)) {
    problems.push(`${slug}: no candidate in ${candidatesDir}`);
    continue;
  }
  const cand = fs.readFileSync(candFile, "utf8").split(esc).join(NBSP);
  const page = fs.readFileSync(pageFile, "utf8").split(esc).join(NBSP);
  if (cand === page) {
    identical++;
    continue;
  }
  const a = cand.split("\n");
  const b = page.split("\n");
  let msg = `${slug}: DIFFERENT (${cand.length} vs ${page.length} characters)`;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] === b[i]) continue;
    const x = a[i] ?? "(none)";
    const y = b[i] ?? "(none)";
    let j = 0;
    while (j < x.length && j < y.length && x[j] === y[j]) j++;
    const clip = (s) => JSON.stringify(s.slice(Math.max(0, j - 25), j + 40));
    msg += `\n   line ${i + 1}, col ${j}\n     candidate ...${clip(x)}\n     written   ...${clip(y)}`;
    break;
  }
  problems.push(msg);
}

console.log(`checked ${slugs.length} | identical ${identical} | problems ${problems.length}`);
for (const p of problems) console.log(p);
process.exit(problems.length ? 1 : 0);
