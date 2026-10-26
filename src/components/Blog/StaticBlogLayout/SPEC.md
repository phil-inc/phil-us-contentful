# SPEC: Static blog and webinar post shell

## Scope
The shared layout for blog and webinar posts that have been moved off Contentful.
Nothing here depends on Contentful. The Contentful template it replaces is
`src/templates/blog.tsx`.

## Where posts live, and what URL they get
`src/pages/_posts/<slug>/index.tsx`, served at **`/<slug>/`**.

This is an exception to "file path equals route" (AGENTS.md §4). It is done with a
second `gatsby-plugin-page-creator` instance rooted at `src/pages/_posts` in
`gatsby-config.ts`, plus `_posts/**` in the first instance's `ignore` list. Without
the `ignore` entry every post is built twice, at `/_posts/<slug>/` and `/<slug>/`.
The plugin fails the build if `src/pages/_posts` does not exist.

`src/constants/migratedStaticSlugs.ts` lists the posts, and `GenerateStaticPages`
skips any Contentful entry on that list. `src/__tests__/constants/
migratedStaticSlugs.test.ts` fails when the list and the folder disagree.

## What the shell renders
1. `<article>` wrapper (`Container size="xl"`), then the `<h1>` title.
2. Optional floating hero image, right-aligned from the `sm` breakpoint.
3. The post body, built from the `Blog*` primitives.
4. The existing `SocialShare` row.
5. Optional `StaticBlogAuthor` (the `author` prop): a divider, an "Author" heading, a
   100px avatar, then name, title and bio. Two posts use it.
6. `StaticBlogCtaBanner`: "Ready to learn more?", copy, and a "Contact us" button
   opening the HubSpot form in a modal (portal 20880193, form
   ccd3ffde-09ef-492c-8f91-a500255d2735).

Body primitives, one per rich-text node: `BlogP`, `BlogH2`, `BlogH3`, `BlogH4`, `BlogH6`,
`BlogA`, `BlogUL`, `BlogOL`, `BlogLI`, `BlogHR`, `BlogImage`, `BlogYouTube`. A bio is
built from `AuthorBioP` and `AuthorBioA`, re-exported from the same module so a post
imports everything from one place.

## Deviation log
Applies to every post. Per-post deviations go in that post's commit message.

| What changed | Live (Contentful) value | Static value | Why |
|---|---|---|---|
| Wrapper element | `<div>` | `<article>` | Semantics for crawlers and assistive tech |
| Hero `alt` | the asset's file title, e.g. "6-Company News" | `""` | The graphic is decorative; the title was a filename |
| YouTube embed | client-only player, "Loading..." in the HTML | server-rendered `<iframe>` (youtube-nocookie) | Crawlers and `llms-full.txt` read the HTML |
| Body image | responsive `GatsbyImage` | plain `<img>`, same size and max width, `loading="lazy"` `decoding="async"`, `width`/`height` of the local file | The file is local and small; the attributes reserve the space so nothing jumps when it arrives |
| Hero image loading | `GatsbyImage` default (lazy) | `loading="eager"` `fetchPriority="high"` `decoding="async"`, no `width`/`height` attributes | The hero is above the fold, right under the title, so lazy loading only delays it. No attributes because the box is a fixed 300px and the flex row stretches the image to 240px tall; a `height` attribute stops that stretch |
| Image files | JPEG, PNG or SVG from the Contentful CDN | WebP in `static/images/blog/` (hero and avatar at most 600px on the long side, body images at most 840px), so a 1.4 MB SVG portrait is 34 KB. A light SVG (at most 100 KB) stays SVG | Page weight. About 2x the displayed size, never enlarged. `scripts/images.mjs` enforces it |
| OG / `Article.image` | Contentful image API URL (SVG rendered to webp) | local 1200x630 WebP in `static/images/blog/og/` | Drops the Contentful dependency; the declared 1200x630 is now true. The live URL was WebP too (`fm=webp`) |
| Absolute `phil.us` links | `https://phil.us/...` | relative, with trailing slash | Internal links stay crawlable without a redirect hop |
| Links that hit a redirect | the old URL | the final destination | Removes a hop |
| Links to Contentful PDFs | `https://assets.ctfassets.net/.../<file>.pdf` | `/pdf/<file>.pdf`, name sanitized (`__` becomes `_`) | The file is in `static/pdf/`; drops the Contentful dependency |
| Whitespace in title and description | raw CMS value, including trailing and double spaces | trimmed, runs collapsed | A stray space is not content; the visible title and body are unchanged |
| Banner copy paragraph | `<p>` inside `<p>` (invalid nesting) | one `<p>` | Valid HTML; the banner is 5px shorter than live at the same viewport |
| Author avatar | image inset by 2px, renders 98px | 100px, flush, `loading="lazy"` | Mantine `Avatar` has no inset; the block's height and text column are otherwise equal to live. The author block is at the end of the article |

## Images and page weight
- The social card (`static/images/blog/og/<name>.webp`, 1200x630) is a **WebP** too. Visitors never download it, so this is repo and crawler weight (8 cards: 2,052 KB as PNG, 139 KB as WebP), not page speed. Not yet checked in a platform's link-preview tool; do that once after the first deploy.
- The YouTube `<iframe>` is `loading="lazy"`.
- Do not add `width`/`height` to the hero (see the table). Do add them to a body image.
- A link whose target is an image file (`<BlogA href="/images/blog/...">`) is a download and keeps its original format and size.
- `node skills/migrate-subpage-to-static/scripts/images.mjs` must print PASS before a batch is committed.

## Not changed on purpose
Heading levels (blog bodies go h1 to h3), empty spacer paragraphs, `target="_blank"`
and `referrerPolicy="no-referrer"` on every link including internal ones, and the
copy itself. Changing any of these is a per-page opt-in, not part of a migration.
