---
name: migrate-subpage-to-static
description: Use when a blog post or webinar page linked from the /resources/ hub still comes from Contentful and must become a code-driven static page under src/pages/. One page per run. Not for new posts built from a design file, downloadable reports, case studies, or page-builder pages.
---

# Migrate Sub-page to Static

Moves one Contentful-driven blog or webinar page to `src/pages/_posts/<slug>/index.tsx` with **the same URL, the same copy and the same SEO**, then marks the route as code-owned so Contentful stops building it. The file sits in the `_posts` group folder to keep `src/pages/` tidy, but it is served at `/<slug>/`, never `/_posts/<slug>/` (Phase 0, item 3).

**Core rule: nothing is retyped and nothing is redesigned.** Content comes from the page's public `page-data.json`. The live page is the parity oracle. The only permitted differences are the logged Tier 2 items below.

A brand-new post from a design file is a different job: use `skills/implement-from-design/SKILL.md`.

## Scope (v1)

| Live page signature | Archetype | Action |
|---|---|---|
| `<h1>` class starts `blog-module--` (includes webinars) | blog / webinar | **this skill** |
| `downloadableResource-module--` | downloadable report | stop, not covered |
| `caseStudy-module--` | case study | stop, not covered |
| `gridContainer-module--` | page-builder page | stop, not covered |

`node scripts/next.mjs --inspect <slug>` prints the archetype. If it is not blog/webinar, report it and stop. Do not improvise a recipe.

## Rules

1. **URL never changes.** Do not edit `src/pages/resources/_data.ts` or `src/pages/press/_data.ts` for a migrated page: the card already points here. Only exception: normalise that card's `url` to the relative `/<slug>/` when it is `www.phil.us/...` or lacks the trailing slash.
2. **Source is `https://phil.us/page-data/<slug>/page-data.json`.** Never type copy by hand and never reword. An unknown node type, mark, or embed means stop and ask.
3. **Edit/Write tools only** for repo files. Bash is for fetching, downloading binaries, and running the scripts.
4. **No git state changes without an explicit yes per command.** Do not `git add`, commit, branch, or push on your own. Approval of this plan is not approval of those commands.
5. **No new dependency.** Scripts use Node built-ins plus packages already in `package.json` (`node-html-parser`, `sharp`). Do not use `jsdom`: it fails to load on Node 18.18.
6. **Never run `gatsby build` headless.** Gate B (below) needs a build the user runs.
7. **Never tell anyone to edit a migrated entry in Contentful.** It renders nowhere once guarded (AGENTS.md §3).

## Phase 0: Foundation (first run only)

Skip if `src/components/Blog/StaticBlogLayout/StaticBlogLayout.tsx` exists. Build these together with the first post and show them as one reviewable unit.

1. **`src/components/Blog/StaticBlogLayout/`** (`StaticBlogLayout.tsx`, `staticBlogLayout.module.css`, `SPEC.md`). Contentful-free. Styles copied from `src/templates/blog.module.css` and `Container size="xl"` as in `src/templates/blog.tsx`. Props: `title`, optional `hero {src, alt}`, optional `author {name, title, imageSrc?, bio: ReactNode}`, `children`. Wraps the body in `<article>`, renders the existing `components/Blog/SocialShare/SocialShare`, then the CTA banner. Exports the body primitives: `BlogP`, `BlogH2`, `BlogH3`, `BlogH4`, `BlogH6`, `BlogA`, `BlogUL`, `BlogOL`, `BlogLI`, `BlogHR`, `BlogImage`, `BlogYouTube`.
   - `BlogA` bakes in `target="_blank"` and `referrerPolicy="no-referrer"` (the live template sets both on every link, internal ones included).
   - `BlogImage` renders `<img loading="lazy" decoding="async" src alt width height>` with `max-width: 100%`. The live page uses a responsive GatsbyImage; the local file is a plain WebP (Tier 2, Phase 3 "Image weight"). The hero `<img>` is `loading="eager" fetchPriority="high" decoding="async"` (it is above the fold) and takes **no** `width`/`height` attributes: its box is fixed and the flex row stretches it to 240px, which a `height` attribute would stop.
   - `BlogYouTube` renders a **server-side `<iframe>`** on `youtube-nocookie.com` with a `title`. The live `YouTubeVideo` is client-only and ships "Loading..." in the HTML, which crawlers and `llms-full.txt` see.
   - The `author` prop is not built until the first post that has an author (2 of 72).
2. **`src/components/Blog/StaticBlogCtaBanner/`**. Heading "Ready to learn more?", body paragraph, "Contact us" button opening a Mantine `Modal` with the existing `HubspotFormModal`. Re-read the real values from any post's page-data (`allContentfulResource.nodes[*].banners`) and confirm portal and form IDs are unchanged. Wrap in `Expanded` with the same props as `bannerFactory` in `components/common/Banner/Banner.tsx`. `HubspotFormModal` expects the Contentful rich-text shape and reads the form ids out of the script text, so build that shape by hand rather than changing the shared component.
3. **Route grouping in `gatsby-config.ts`**, which lets posts live in `src/pages/_posts/` yet serve at `/<slug>/`:
   - Add `` `_posts/**` `` to the `ignore` list of the existing `src/pages` page-creator instance. Without it every post is built **twice**, at `/_posts/<slug>/` and `/<slug>/` (duplicate content).
   - Add a second `gatsby-plugin-page-creator` instance with `path: `${__dirname}/src/pages/_posts``. The plugin roots URLs at its own `path`, so `_posts/<slug>/index.tsx` becomes `/<slug>/`.
   - The plugin **panics the build** when its `path` does not exist, so this config change and the first post land in the same commit.
   - Both behaviours were verified on a scratch Gatsby build (with the `ignore` entry: `/<slug>/` only; without it: both URLs). `Head` exports and underscore-prefixed files such as `_data.ts` behave as on any other page.
   - Verify without a build: `node scripts/route-check.mjs` evaluates the real config against the real tree and fails if anything is served under `/_posts/`, a URL is claimed twice, or a migrated slug is not served exactly once from `src/pages/_posts/`.
   - A dev server only reads `gatsby-config.ts` at startup. One that was already running will keep serving the post at `/_posts/<slug>/` and 404 `/<slug>/` until the user restarts it.
4. **`src/constants/migratedStaticSlugs.ts`**: `export const MIGRATED_STATIC_SLUGS = new Set<string>([...])`, slugs without slashes.
5. **Guard in `src/strategies/GenerateStaticPages.ts`**: after the related-page branch and before `createPage`, `if (MIGRATED_STATIC_SLUGS.has(path.replace(/^\/+|\/+$/g, ""))) return;` with a comment naming `src/pages/_posts/<slug>/index.tsx`, in the style of `handleRegularPage`. Strategies use relative imports. It cannot be unit-tested (the strategy imports CSS modules through the templates); Gate B on a real build is its check.
6. **Drift test** `src/__tests__/constants/migratedStaticSlugs.test.ts`, written before the constant so it fails first. Three assertions: every entry is a plain `^[a-z0-9]+(-[a-z0-9]+)*$` slug; every entry has `src/pages/_posts/<slug>/index.tsx`; every folder under `src/pages/_posts/` is listed. It lists directories and checks existence only (AGENTS.md §6 forbids reading source as text), and it stays that size. A `Set` cannot hold duplicates, so there is no uniqueness assertion.
7. **`MARKUP-CONTEXT.md`**: add a "Static blog and webinar posts" section under the code-driven pages stating these routes are edited in code, not Contentful, and that **file path and URL differ** for them (`src/pages/_posts/<slug>/` serves `/<slug>/`); and carve them out of the "Individual blog posts" bullet in the Contentful list. Say the same in the shell's `SPEC.md`. AGENTS.md §4 assumes file path equals route, so tell the user it is now an exception; do not edit AGENTS.md yourself (§9).

## Phase 1: Pick the page

```bash
node scripts/next.mjs            # supported pages not yet migrated, hub order (newest first)
node scripts/next.mjs --all      # also migrated, unsupported and nested-path entries
node scripts/next.mjs --inspect <slug>
```

It reads `RESOURCES_DATA` and `MIGRATED_STATIC_SLUGS` and looks up each pending page's template from its page-data, so unsupported archetypes never come back as "next". Take the first, or the slug the user names. Pages marked `[normalise card url]` need the one-line card edit in Phase 5.

## Phase 2: Fetch and convert

```bash
node scripts/convert.mjs <slug> --out <scratchpad>/<slug>             # convert + Gate A, no downloads
node scripts/convert.mjs <slug> --out <scratchpad>/<slug> --download  # then fetch assets (Phase 3)
```

Writes to the scratchpad, never to `src/`: `index.tsx` (the complete candidate page), `body.jsx`, `meta.json`, `assets.json`, `report.md` (Gate A table, node counts, rewritten links, assets, anything that needs a decision). Exit codes: `0` ok, `2` unsupported (stop and report), `3` Gate A failed.

The script fails loudly on any node outside the contract below and runs **Gate A**: it reads the emitted JSX back and checks that every text block, link and element count equals the rich text **and** the live page DOM, that the text is byte-identical to the rich text (non-breaking spaces included), that title and description equal the live `<head>`, and that the canonical is the page URL. The pages with an auto-derived description keep the live one. Unlisted link targets are checked with a HEAD request (`--no-head` skips it).

### Converter contract

| Rich-text node | Emit |
|---|---|
| paragraph | `<BlogP>`; a text node with `""` becomes `<br />` (the live template does this) |
| heading-2 / 3 / 4 / 6 | `<BlogH2/H3/H4/H6>`, **level preserved** (Tier 1). heading-1 and heading-5 are not supported yet and stop the converter (the Contentful template has a `heading5` style with weight 400; copy it into the shell if a page needs it) |
| unordered-list / ordered-list / list-item | `<BlogUL>` / `<BlogOL>` / `<BlogLI>` |
| hyperlink | `<BlogA href>` (`BlogA` carries `target="_blank"` and `referrerPolicy="no-referrer"`, as the live template does); `href` rewritten per link rules; a `ctfassets.net` target becomes a local `/pdf/<name>` or image path |
| marks bold / italic / underline | `<b>` / `<i>` / `<u>`, the live renderer's defaults. **Not** `<strong>` / `<em>`: on this site's CSS a `<strong>` inside a 700-weight heading computes to 900, so migrated headings look too bold |
| hr | `<BlogHR />` |
| embedded-entry-block (`ContentfulYoutubeEmbedResource`) | `<BlogYouTube videoId title />` |
| entry-hyperlink | children only (as the template) |
| embedded-asset-block with image data | `<BlogImage src alt width height />`; `alt` is the asset description, `src` the local `.webp`, `width`/`height` the size of that WebP (the live constrained size scaled to at most 840px) |
| embedded-asset-block without image data (PDF, video), anything else | **stop and ask** |

### Link rules (all Tier 2, each rewrite listed in `report.md`)

1. `https?://(www.)?phil.us/<path>` becomes `/<path>/` (relative, trailing slash).
2. A target that hits a `netlify.toml` redirect is rewritten to the final destination. Keep any query string. A rule that carries a `query = {...}` condition (the listing pagination rules, `from = "/resources/"` with `query = {page = ":page"}`) only fires for URLs that have that parameter, so it is never applied to a plain link. `loadRedirects` marks those rules and `matchRule` skips them; without that, a link to `/resources/` became `/resources/page/:page/`.
3. `%23` in a path becomes `#`.
4. A target that is not in the live sitemap, has no redirect, and does not answer 200 is **left as is and reported**. Ask the user. Never invent a destination.
5. A `*.ctfassets.net` link target becomes the downloaded copy (`/pdf/<name>` or `/images/blog/<name>`), with `<name>` run through `sanitizeFileName` (so `DataGuide__1_.pdf` is `DataGuide_1_.pdf`). `parity.mjs` applies the same rule when it compares link targets.

Head strings (`<title>`, description, `og:*`, `twitter:*`, `Article.headline`, `Article.description`) are trimmed and have runs of whitespace collapsed; a trailing space or a double space in a CMS field is not content. `parity.mjs` compares them collapsed.

## Phase 3: Assets

Everything the page references on `*.ctfassets.net` must end up local.

| Asset | Destination | Notes |
|---|---|---|
| Images (hero, body image, author avatar) | `static/images/blog/<name>.webp` | Stored as WebP, resized (see "Image weight" below). A light SVG (at most 100 KB) stays an SVG. Reuse an existing file of the same name. A different file with the same name: stop and ask. |
| Image that is only a link target (`<BlogA href>`) | `static/images/blog/<name>` | A download: original format and size. |
| PDFs | `static/pdf/<name>` | The repo's existing PDF folder, served at `/pdf/<name>`. Tell the user the size before downloading anything over 1 MB. |
| Social card (made from the hero) | `static/images/blog/og/<name>.webp`, exactly **1200x630** | `SeoMeta` always declares `og:image:width/height` 1200/630. The converter generates it once with `sharp` (the image centred on white), from the downloaded original; show the user the result once; it is shared by many posts. |

`convert.mjs --download` does this: it sanitises filenames to `[A-Za-z0-9._-]`, strips image-API query params, converts images to WebP (below), skips files already present when identical, **stops on a same-name different-content collision**, and refuses to store anything over 1 MB without `--allow-large` (tell the user the size, then rerun). A large image that becomes a small WebP is not refused; the report says what was downloaded and what was stored. It also generates the 1200x630 OG PNG with `sharp` when missing (from the downloaded original, not from the WebP), and the report says `GENERATED`: look at the image and show it to the user once. The shared hero (`6-Company_News.svg`, on 63 of 72 posts) is downloaded once and reused.

### Image weight (page speed)

Images are the heaviest thing on these pages, so the converter stores them as **WebP, sized for what the layout shows**:

| Where the image is used | Longest side | Why |
|---|---|---|
| hero (`hero.src`) | 600 px | shown 240px tall in a 300px box, about 2x for dense screens |
| author avatar | 600 px | shown 100px; the same rule keeps one number |
| body image (`<BlogImage>`) | 840 px | the wrapper is 420px wide, 2x |

- Quality 82, alpha kept, never enlarged. Real result on 11 files: 1,976 KB became 165 KB (a 1.4 MB SVG portrait became 34 KB, a 2400px JPEG became 22 KB).
- **An SVG stays an SVG when it is light** (at most 100 KB): it is already smaller than any WebP of it, and it is crisp at every size. A heavy SVG (it embeds a photo) becomes a WebP. The converter downloads each SVG to measure it (a HEAD request is not enough: for a compressible file the CDN answers without a `content-length`, which first made a 1.3 MB SVG look unknown and keep its `.svg` name), so an offline run (`--page-data`) cannot see it and keeps the `.svg` name.
- **The social card (`static/images/blog/og/`) is a 1200x630 WebP too.** Visitors never download it, so this saves repo and crawler weight (8 cards: 2,052 KB as PNG, 139 KB as WebP), not page speed. The live site already served its `og:image` as WebP (`fm=webp`), so this matches what platforms were already fetching. It has not been tested against each platform's link preview: after the first deploy, paste one post URL into the LinkedIn Post Inspector or the Facebook Sharing Debugger.
- Loading: the hero is `eager` with `fetchPriority="high"`; body images and the avatar are `lazy`; the YouTube iframe is `lazy`. Body images carry `width` and `height` so their space is reserved. The hero does not (see Phase 0).
- `node scripts/images.mjs` checks all of it (below). For images that are already in the repo as PNG or JPEG, `node scripts/images.mjs --convert` writes a `.webp` next to each, prints the page edits to make (use the Edit tool), and the originals are deleted once no page uses them.
- Cache headers for `/images/*` in `netlify.toml` are not set here: files under `static/` are not fingerprinted, so a long immutable cache could serve a stale image after a replacement. That is a deploy-config decision for the user.

## Phase 4: Write the page

Read `<scratchpad>/<slug>/index.tsx` (the converter's candidate), then create `src/pages/_posts/<slug>/index.tsx` from it with the Write tool, changing nothing except what the report says needs a decision. The folder name `<slug>` is the URL, so it must equal the Contentful slug exactly. The candidate has this shape:

```tsx
// Migrated from Contentful resource <contentful_id> on <YYYY-MM-DD>.
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogP, BlogH3 /* ...only what is used */ } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/<slug>/";
const TITLE = "<heading>";
const DESCRIPTION = "<meta description>";
const OG_IMAGE = "https://phil.us/images/blog/og/<name>.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} image={OG_IMAGE} type="article" />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
    {/* webinars: one VideoObject JsonLd per embed, see SEO and GEO */}
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/<hero>", alt: "" }}>
    {/* body.jsx */}
  </StaticBlogLayout>
);

export default Page;
```

**Write the candidate verbatim, then prove it.** The CMS text contains non-breaking spaces (21 in the first post). The converter emits each one as a six-character escape (backslash, then `u00a0`) so it stays visible in review. The Write and Edit tools usually decode that escape in their input, so the file on disk holds the real character (occasionally a page keeps the escape; both are the same text inside a string expression). That is correct, but a plain `diff` against the candidate then shows every escape as a difference. Verify by decoding both sides first:

```bash
node scripts/verify-written.mjs <scratchpad> <slug> [<slug> ...]   # candidates live at <scratchpad>/<slug>/index.tsx
node scripts/verify-written.mjs <scratchpad>                        # every folder under src/pages/_posts/
```

It decodes the escapes on both sides, compares byte for byte, and prints the first differing line and column. Exit `1` means a page was mistyped: fix it with Edit and rerun. Do not skip it: a transcription silently turns non-breaking spaces into plain ones.

A run of 16 or more identical invisible characters is emitted as `"<char>".repeat(N)` with `N` computed by the converter, never as N copies. One post has 4,102 non-breaking spaces in a row, which nobody can count by eye.

When converting many pages in one loop, retry a page whose exit code is `1` (a network failure such as `ENOTFOUND`) and stop on `2`, `3` or `4`, which are real results. Run the loop in the background; a long foreground loop is killed by the tool timeout.

Import through root aliases, never `../../`. Use `PATH`, never `location`. Do not add `datePublished`: none of the 72 posts has `publishDate`, and fabricating one is wrong. If the page-data has an `author`, the shell's `author` slot is needed: build it on the first post that has one (2 of 72) and show the user.

## Phase 5: Register and document

1. Append the slug to `MIGRATED_STATIC_SLUGS` **and add the post's Gatsby node id and path to `MIGRATED_STATIC_PATHS`** in `src/constants/migratedStaticPaths.ts` (`report.md` prints both lines; the id is also in the first line of the page). Contentful content links to an entry by id, and `getLink` finds its page by looking that id up in `useInternalPaths`; a code page has no `pageContext.id`, so without the map every such link (for example the three "Read Spotlight" buttons on `/company/`) resolves to `#` and only reloads the page it is on. `src/__tests__/constants/migratedStaticPaths.test.ts` fails if the two lists differ.
2. Add the slug under "Static blog and webinar posts" in `MARKUP-CONTEXT.md`.
3. If the hub card `url` needs normalising (Rules, item 1), edit that one line.
4. Record per-page Tier 2 items and decisions in the commit message body. The family-wide ones (hero `alt=""`, `<article>`, SSR YouTube iframe, local OG image) live once in the shell's `SPEC.md`.

## SEO and GEO

**Tier 1, parity (must match live):** URL and trailing slash, `<title>`, meta description, canonical, `og:*`, `twitter:*`, robots (absent), Article JSON-LD `headline` / `description` / `url` / `mainEntityOfPage` / publisher `@id`, exactly one `<h1>`, heading levels, body text, link set, link attributes, and the emphasis elements (`b`, `i`, `u`; the tag matters, not just the look of the word).

**Tier 2, additive and logged (never silent):** the link rules above, `<article>`, hero `alt=""`, SSR YouTube iframe with `title`, local OG image, local WebP images and their loading attributes (Phase 3 "Image weight"), and `VideoObject` JSON-LD for each YouTube embed (`name`, `embedUrl`, `thumbnailUrl` `https://i.ytimg.com/vi/<id>/hqdefault.jpg`). **Omit `uploadDate` unless known.** Never invent it.

**Opt-in only (ask per page):** normalising heading levels, dropping empty spacer paragraphs, opening internal links in the same tab, adding visible captions.

**Why GEO needs server-rendered copy:** `src/utils/llmsFull.ts` builds `llms-full.txt` from the built HTML in `public/` and drops iframes, scripts and `data-llms-skip` nodes. Anything painted by `useEffect`, or a "Loading..." placeholder, is invisible to it and to most AI crawlers.

## Build and test

Run in this order and stop at the first failure. Report what ran and what did not; never imply a step passed that was skipped.

**1. Unit tests** (agent, no build). Run `npx jest` once on the base commit first, then after the change, and report both counts. The drift test from Phase 0 is the only test this skill adds. The converter and parity scripts are validated by their own gates, not by Jest.

**2. Types** (agent). `npx tsc --noEmit -p . --types node,jest,react,react-dom`, reading only errors in files you touched. The plain `npx tsc --noEmit` stops at three `TS2688` errors and checks nothing.

**2b. Route grouping** (agent, no build). `node scripts/route-check.mjs` must print `PASS`. Run it after any change to `gatsby-config.ts`, the `_posts` folder, or `MIGRATED_STATIC_SLUGS`.

**2c. Images** (agent, no build). `node scripts/images.mjs` must print `PASS`. It fails on: a `/images/blog/` or `/pdf/` path a page uses that is not under `static/`; a hero, body image or avatar that is a PNG, JPEG, GIF or an SVG over 100 KB (run `--convert`); one over 200 KB; a `<BlogImage>` `width`/`height` that does not match its file or is wider than 840; a social card that is not a 1200x630 WebP under 200 KB. It warns about a file under `static/images/blog/` that no page uses (delete it). Run it after every batch and after anything that touches `static/images/blog/`.

**3. Gate A** (agent, every page). `convert.mjs` exits `0`. Exit `3` means the page does not match live: fix the cause, never edit the output by hand.

**4. Dev server** (agent or user, every page). `npm start` serves `http://localhost:3000/<slug>/`. Check the shell and hero, that the banner's "Contact us" opens the form modal, that a webinar's video loads, and that the share buttons render. This is a visual check only: dev does not emit the SSR head or body. If a dev server is already running on port 3000 it is the user's: do not kill it, and do not start a second one in the same project folder (they share `.cache`). Ask the user to restart theirs after a `gatsby-config.ts` change.

**5. Production build** (user runs it; the agent never starts it headless, Rule 6). Two routes, ask which the user wants:
- **Local build.** Netlify builds this site fine, so the local-build workaround is **not in the repo and must not be added to it or committed**. It is stored as reference in `LOCAL-BUILD.md` (next to this file): the `jsdom` webpack-externals hunk for `gatsby-node.ts` and `scripts/build-local.sh`, taken from commit `f0299ec` on `build-fix`, which picks an installed Node 22 or 20 (>= 20.19.5) for that process only. Use it only when the user asks for a local build: apply it to the working tree as `LOCAL-BUILD.md` describes, build, run Gate B, then remove it again and confirm `git status` is back to the intended changes. Every git command in that flow needs the user's yes (Rule 4). Expect minutes of build time, a rewrite of `public/` and `.cache` (git-ignored), and the Contentful environment named in `.env.production`.
- **Deploy preview.** The user pushes the branch (a git operation they run) and Netlify builds it with `npm run build`. This needs no local Node setup, and Gate B can run against the preview URL.

**6. Gate B** (agent, once per batch; suggest 10 pages). One of:
```bash
node scripts/parity.mjs --all-migrated --built public
node scripts/parity.mjs --all-migrated --preview https://<deploy-preview-host>
```
It exits `1` on any Tier 1 failure. For each migrated page it checks Tier 1 items against live, plus: JSON-LD parses with one Organization and one WebSite node; `canonical` equals `og:url`; **no `ctfassets.net` in the HTML** (the measurable "off Contentful" criterion; the site-wide `<link rel="preconnect" href="https://images.ctfassets.net">` that `gatsby-source-contentful` adds to every page is a connection hint, not content, and is not counted); no `Loading...` text; the URL is in `sitemap-0.xml` and the title is in `llms-full.txt`; and nothing is served under `/_posts/`.

If no build or preview is available, say **"Gate B was not run"** and list the pages as unverified for SEO and GEO.

**7. After the first build**, also look at the build log and `public/` for the route grouping: the page-creator must not warn about duplicate paths, and `public/_posts/` must not exist.

## Hand-off

1. Read the whole diff, hunk by hunk.
2. Report: page, Gate A result, Tier 2 items, link targets that need a decision, assets added (names, and original versus stored size for each image), the `images.mjs` result, Jest count, and Gate B status.
3. **Stop.** Propose the commit as a bash block and wait for a yes. One commit per page: `feat(static): migrate <slug> off Contentful`.

## Red flags

| Thought | Reality |
|---|---|
| "I'll tidy the wording while I'm here" | Copy changes belong to marketing. Parity first. |
| "The dev server looks right, so SEO is fine" | Dev does not emit the SSR head or body. Run Gate B or say it was not run. |
| "That unknown node is probably just a paragraph" | Stop and ask. A silent fallback drops copy. |
| "I'll add `datePublished` from the creation date" | `createdAt` reflects a bulk migration. No `publishDate` means no date. |
| "I'll fix the card in `_data.ts` to the new page" | The card already points here. Leave it, except a `www.phil.us` URL or a missing trailing slash (Rules, item 1). |
| "Two posts share a filename, I'll overwrite" | Different content with the same name: stop and ask. |
| "I'll commit it so it's not lost" | Rule 4. Propose the command and wait. |
| "Simpler to put it at `src/pages/<slug>/`" | Posts live in `_posts/`. A page directly under `src/pages/` clutters the folder the grouping exists to keep tidy. |
| "The `_posts` folder will serve itself" | It will, at `/_posts/<slug>/`, unless the `ignore` entry is in place. Run `route-check.mjs`, and check `public/` after a build. |
| "`<strong>` is more semantic than `<b>`" | Not on this site: inside a heading `strong` computes to weight 900 and `b` to 700. Match the live tag; Gate A compares emphasis elements. |
| "The computed style of the heading matches, so it looks the same" | The bold sat in an inner element. Compare the inner element's weight and width too. |
| "I'll retype the body, it's short" | Retyping loses non-breaking spaces. Write the candidate and run the verbatim check. |
| "Port 3000 is busy, I'll kill it" | That is the user's dev server. Leave it and ask. |
| "The page renders and its own links work, so it is done" | Links to it from Contentful pages go by entry id, not URL. A post missing from `MIGRATED_STATIC_PATHS` looks fine on its own URL and breaks every Contentful button or card that points at it. After a batch, compare the links to the migrated posts on a Contentful page (for example `/company/`) between live and the preview. |
| "I'll keep the PNG, it is only 80 KB" | It becomes about 10 KB as a WebP, on every page that shows it. Let `convert.mjs --download` store it, and run `images.mjs`. |
| "The social card can stay a PNG, nobody downloads it" | Right that it costs visitors nothing, but eight PNG cards were 2 MB in the repo and in every crawler fetch, and 139 KB as WebP. The live site already served WebP there. `convert.mjs` makes it a WebP; `images.mjs` fails on a PNG card. |
| "I'll turn the small SVG hero into a WebP" | A light SVG is already smaller than its WebP and sharp at any size. Only a heavy SVG (over 100 KB) is converted. |
| "Lazy-load everything, it is faster" | Not the hero: it is above the fold, and `lazy` delays the largest thing on screen. The hero is `eager` with `fetchPriority="high"`. |
| "I'll add `width`/`height` to the hero like the body images" | A `height` attribute stops the flex row stretching the hero to 240px, and the image overflows its box. Measure in a browser before touching hero attributes. |
