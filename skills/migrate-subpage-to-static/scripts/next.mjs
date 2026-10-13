#!/usr/bin/env node
// Lists hub-linked internal pages that are not yet migrated, or inspects one page's archetype.
//
//   node scripts/next.mjs                    supported pending pages, hub order (newest first)
//   node scripts/next.mjs --all              also show migrated and unsupported pages
//   node scripts/next.mjs --json             machine-readable
//   node scripts/next.mjs --no-network       skip the archetype lookup (lists every pending page)
//   node scripts/next.mjs --inspect <slug>   archetype from the live page-data.json
//
// Exit codes: 0 ok / supported archetype, 2 unsupported archetype or page not found.
import fs from "node:fs";
import path from "node:path";
import { REPO, SITE, parseArgs, fetchText, readMigratedSlugs } from "./lib/shared.mjs";

const { flags } = parseArgs(process.argv.slice(2), ["inspect", "data"]);

const ARCHETYPES = [
  { match: /templates-blog-tsx$/, name: "blog / webinar", supported: true },
  { match: /templates-downloadable-resource/, name: "downloadable report", supported: false },
  { match: /templates-case-study/, name: "case study", supported: false },
  { match: /templates-event-registration/, name: "event registration", supported: false },
  { match: /templates-page-tsx$/, name: "page-builder page", supported: false },
];

async function archetypeOf(slug) {
  const json = JSON.parse(await fetchText(`${SITE}/page-data/${slug}/page-data.json`));
  const chunk = json.componentChunkName || "(none)";
  const hit = ARCHETYPES.find((a) => a.match.test(chunk));
  let name = hit ? hit.name : `unknown (${chunk})`;
  const refs = json.result?.data?.contentfulResource?.body?.references || [];
  if (hit?.supported && refs.some((r) => /Youtube/i.test(r.__typename || ""))) name = "blog / webinar (YouTube embed)";
  return { chunk, name, supported: Boolean(hit?.supported) };
}

async function inspect(slug) {
  let a;
  try {
    a = await archetypeOf(slug);
  } catch (e) {
    console.error(`Could not read ${SITE}/page-data/${slug}/page-data.json: ${e.message}`);
    process.exit(2);
  }
  console.log(`${slug}\n  template: ${a.chunk}\n  archetype: ${a.name}\n  supported by this skill: ${a.supported ? "yes" : "NO, stop and report"}`);
  process.exit(a.supported ? 0 : 2);
}

function readHubEntries(file) {
  const text = fs.readFileSync(file, "utf8");
  const re = /\{[^{}]*?title:\s*"((?:[^"\\]|\\.)*)"[^{}]*?type:\s*"([^"]+)"[^{}]*?url:\s*"([^"]+)"[^{}]*?\}/g;
  return [...text.matchAll(re)].map((m) => ({ title: m[1], type: m[2], url: m[3] }));
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

if (flags.inspect) {
  await inspect(String(flags.inspect));
} else {
  const dataFile = flags.data || path.join(REPO, "src/pages/resources/_data.ts");
  const entries = readHubEntries(dataFile);
  if (!entries.length) {
    console.error(`No entries parsed from ${dataFile}`);
    process.exit(2);
  }
  const migrated = new Set(readMigratedSlugs());
  const rows = [];
  for (const e of entries) {
    let p;
    let cardNeedsNormalising = false;
    if (e.url.startsWith("/")) p = e.url;
    else {
      let u;
      try {
        u = new URL(e.url);
      } catch {
        continue;
      }
      if (!/^(www\.)?phil\.us$/i.test(u.hostname)) continue; // external card
      p = u.pathname;
      // Absolute apex URLs with a trailing slash are fine as they are (SKILL.md Rules, item 1).
      cardNeedsNormalising = /^www\./i.test(u.hostname) || !u.pathname.endsWith("/");
    }
    const segments = p.split("/").filter(Boolean);
    const slug = segments.join("/");
    rows.push({
      slug, type: e.type, title: e.title, url: e.url, archetype: null,
      status: migrated.has(slug) ? "migrated" : segments.length === 1 ? "pending" : "out-of-scope (nested path)",
      cardNeedsNormalising,
    });
  }

  if (!flags["no-network"]) {
    const todo = rows.filter((r) => r.status === "pending");
    await mapLimit(todo, 6, async (r) => {
      try {
        const a = await archetypeOf(r.slug);
        r.archetype = a.name;
        if (!a.supported) r.status = `unsupported (${a.name})`;
      } catch (e) {
        r.status = `unreachable (${e.message.slice(0, 40)})`;
      }
    });
  }

  const count = (pred) => rows.filter(pred).length;
  const shown = flags.all ? rows : rows.filter((r) => r.status === "pending");
  if (flags.json) {
    console.log(JSON.stringify(shown, null, 2));
  } else {
    console.log(
      `Hub entries: ${entries.length} | internal: ${rows.length} | migrated: ${count((r) => r.status === "migrated")} | ` +
        `pending: ${count((r) => r.status === "pending")} | unsupported/other: ${count((r) => r.status !== "pending" && r.status !== "migrated")}`,
    );
    if (flags["no-network"]) console.log("(archetypes not checked: --no-network)");
    console.log("");
    shown.forEach((r, i) => {
      const note = r.cardNeedsNormalising && r.status === "pending" ? "  [normalise card url, SKILL Rules 1]" : "";
      console.log(`${String(i + 1).padStart(3)}  ${r.status.padEnd(10).slice(0, 38).padEnd(10)}  ${r.type.padEnd(8)} ${r.slug}${note}`);
    });
  }
}
