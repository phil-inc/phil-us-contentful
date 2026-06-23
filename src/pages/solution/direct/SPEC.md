# /solution/direct/ — PHIL Direct (Direct-to-Patient) Page

Source design: `~/Desktop/PHIL Direct Page/PHIL Direct Page.html` (+ `colors_and_type.css`)

## Scope

New code-driven marketing landing page. No Contentful. Built fresh from the
design. Mirrors the sibling `/solution/core/` page's structure and conventions.

## Route

`/solution/direct/` → `src/pages/solution/direct/index.tsx`. Gatsby file-based
routing handles the nested slug. Chosen per user (sibling to `/solution/core/`).

**Route conflict resolved:** a Contentful entry already published at slug
`solution/direct` ("PHIL Direct DTP 2.0…"), which shadowed the new file-based
page. `src/strategies/GenerateMainPages.ts` now skips Contentful page creation
for `solution/direct` (`if (page.slug === "solution/direct") return;`) — the same
mechanism used for `solution/core`, `patients`, `providers`, etc. The old
Contentful page is effectively replaced by this static page.

## SEO

- Title: `Direct-to-Patient | PHIL`
- Description: `PHIL Direct delivers a proven, ecommerce-like Direct-to-Patient experience — combining intake, fulfillment, and analytics into one flexible solution that expands affordable medication access.`
- One `<h1>` (hero). h2/h3 hierarchy preserved across sections.

## Layout

Wrapped in shared `src/layouts/Layout` (site header + footer + global CInfoBar
slot). Design's standalone header/footer dropped.

## File structure

```
src/pages/solution/direct/
  index.tsx              page composition + Head SEO
  direct.css             all section styles, scoped under .scope (global side-effect import)
  interactions.ts        ported design behavior, single attach() entry, re-attach-safe
  SPEC.md
  _sections/
    Hero.tsx             section 1 (animated ecommerce phone art)
    ThoughtLeadership.tsx section 7 (resources marquee + 3 pillars + CTA bar)
    Telemedicine.tsx     section 4 (3-journey interactive phone selector)
    Funnel.tsx           section 5 (tabbed full-funnel insights dashboard)
    Research.tsx         section 8 (2 report cards + coverflow stat carousel)
    VideoBand.tsx        section 3 (gradient + YouTube thumbnail)
    FinalCta.tsx         section 9 (book demo banner)
```

Section render order matches the design's DOM order (note: the design's section
*numbers* are out of order — 1, 7, 4, 5, 8, 3, 9 — but DOM/visual order is
preserved exactly).

Each section returns static JSX (hardcoded copy at section level — content-driven,
not data-driven). All interactive behavior is centralized in `interactions.ts`,
invoked from a single `useEffect` in `index.tsx` on mount. The ported script uses
`document.querySelector` / `getElementById` against rendered DOM (IDs/classes
preserved from the source).

CSS: a single global `direct.css`, machine-transformed from the design `<style>`
block via a one-shot Python pass (`/tmp/transform_css.py`) that prefixes every
selector with a **page-unique root class `.scope-direct`** (applied on the page
root wrapper), maps `html`/`body` resets onto it, drops the design's footer
rules, replaces `.wrap` with the site-standard global `.xl-container`, and
preserves `@keyframes` / `:root` token blocks. Tokens (`:root`) inlined from the
design's `colors_and_type.css`. Raleway/Lato load site-wide via the Mantine
theme, so no `@font-face` needed.

> **Why `.scope-direct`, not `.scope`:** the sibling `solution/core` page scopes
> under `.scope`. Gatsby bundles all side-effect CSS imports into a shared
> `commons.css` loaded on every page, so a generic `.scope` root would let
> `core.css` rules bleed onto this page (and vice versa) wherever class names
> collide (`.video-band`, `.vb-copy`, `.section-head`, `.hero-inner`, …). That
> caused white-on-white video copy here (core's teal-band rule
> `.scope .video-band .vb-copy h2 { color: white }` won on specificity) plus
> layout drift. Each static landing page MUST use a unique scope root.

## Section list

| # (DOM) | Name | Behavior |
|---|---|---|
| 1 | Hero | Eyebrow, h1 with foliage italic, lead, "Book Demo" CTA. Right: SVG spinning ring + floating ship/savings cards + ecommerce checkout phone. Price/savings count-up on scroll-in. |
| 2 | Thought Leadership | Auto-scrolling resources marquee (8 cards, cloned for loop, prev/next stepping, hover-pause); 3 numbered pillars (sequential badge pop-in); full-library CTA bar. |
| 3 | Telemedicine | 3 journey tabs (Telemed / In-Office / Patient Request). Each is a phone-mockup selector: rows on the right swap the center phone, animate progress bar, swap copy, "next step/section" button. Step-number pop-in on first journey. In-office building/calendar pop animation. |
| 4 | Full-Funnel Visibility | Insights card with 3 pill tabs (Journey funnel / Key Metrics / AI Insights). Funnel segments animate in + checklist checks cascade; metrics count-up + staggered reveal; AI panel typewriter. IO fires the active panel's animation on scroll-in. |
| 5 | Patient & Provider Needs | 2 research report cards + center coverflow stat carousel (auto-advance 4.6s, count-up, prev/next/dots/keyboard, hover-pause). |
| 6 | Video band | Copy left, YouTube thumbnail right (opens `youtube.com/watch?v=WmuyIuwHkgM` in new tab — external, kept absolute). |
| 7 | Final CTA | Gradient banner + white "Book Demo" pill → `/demo/`. |

## Component reuse

None. All sections bespoke (design is purpose-built; no existing component is an
exact match). `Head` SEO export adapted from `src/pages/providers/index.tsx` /
`solution/core` template.

## Forms

None. The "questionnaire" / "checkout" / dropdowns are non-functional visual
mockups inside the phone art. CTAs link to `/demo/`, `/solution/core/`,
`/resources/?topic=direct`, `/dtp-research/`, `/hcp-research/`, a case-study URL,
and external press/feature articles.

## Interactions ported

| Behavior | Mechanism |
|---|---|
| Hero price/savings count-up | `IntersectionObserver` + `requestAnimationFrame` (easeOutCubic) |
| Hero ring / floats / pops | Pure CSS keyframes |
| Resources marquee | RAF translateX loop, nodes cloned for seamless wrap, prev/next step, hover-pause |
| Pillar badge pop-in | `IntersectionObserver` + staggered class toggle |
| Telemed selector + journey tabs | Row click swaps active phone/copy/progress; tab click swaps journey; next-step button; clones phones into thumbnails |
| Telemed step-number pop-in | `IntersectionObserver` (journey 0 only) |
| Telemed in-office pop | class toggle `.pop` on `.ipv-scene` |
| Social-ad CTA pop | `IntersectionObserver` re-trigger of `.ig-pop` |
| Funnel tabs | class toggle + `[hidden]` panel swap; per-panel animation on select + first scroll-in |
| Funnel segment / check / metric reveal | class toggles + timeouts; count-up via `requestAnimationFrame` |
| AI typewriter | char-by-char insert, replays after 10s; reduced-motion renders full text |
| Stat coverflow carousel | absolute transforms by offset, auto-advance interval, count-up |
| tcd phone-mock radio-pick | `window.tcdPick` wired via JSX `onClick`/`onKeyDown` on `.tcd-option` |
| Smooth in-page anchors | single page-level handler (no in-page anchors currently, kept for parity) |

All wrapped in a re-attach-safe `attachSolutionDirectInteractions()`:
module-level `attached` guard (StrictMode double-effect safe) + shadowed
`setTimeout`/`setInterval`/`IntersectionObserver` and patched
`addEventListener` so the returned cleanup tears down timers/observers/listeners
on unmount. `@ts-nocheck` (ported plain JS, logic unchanged from source).

## Reduced motion

`prefers-reduced-motion: reduce` honored throughout (count-ups render final
values, carousel auto-advance off, typewriter renders full text, marquee static,
pop-ins skipped, copy swaps instant) — inherited from the design's own guards.

## Responsive

Design's own breakpoints preserved (1100 / 980 / 920 / 880 / 760 / 720 / 620 /
480 / 360). Key behaviors: hero stacks at 920px; telemed showcase stacks phones
vertically at 760px (copy/rail hidden); funnel tabs wrap; report grid stacks at
760px; CTA band stacks at 720px.

## Assets

None copied. Every phone/dashboard mockup is pure CSS + inline SVG. The only
image is the remote YouTube thumbnail (`img.youtube.com/...`, no local copy).
The design's footer logo lives in the shared Layout footer.

## Trustpilot

None. The design includes the Trustpilot bootstrap `<script>` tag but has no
`.trustpilot-widget` mount in the body, so the loader was dropped (unlike
`solution/core`, which has two widget mounts).

## Branch & deploy

- Branch: `direct-page-static` (existing, per user — work added here)
- PR base: `develop`

## Deviation log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Header | Custom standalone header (none rendered in design body) | Shared `Layout` header | Site-wide nav managed via Contentful/Layout |
| Footer | Custom `.site-footer` (logo + 4 links + ©) | Shared `Layout` footer | Same reason; footer rules dropped from CSS |
| Container | `.wrap` (1256px → 1536px ≥1680px, 48px pad) | Site-standard global `.xl-container` | Matches sibling `solution/core`; `.wrap` sizing rules dropped, markup uses `xl-container` |
| Internal links | Absolute `https://phil.us/...` with `target="_blank"` | Relative Gatsby `<Link>`, same-tab | Skill rule 10; SPA nav for internal routes |
| External links | Absolute, `target="_blank"` | Unchanged (kept absolute + `rel="noopener"`) | External destinations (businesswire, drugchannels, youtube, etc.) |
| Research section stray `</div>` | Extra unbalanced `</div>` after `.report-grid` | Removed | Source markup typo; JSX must balance |
| Telemed thumb stray `>` | `aria-label="…">></button>` (extra `>`) | Removed | Source markup typo |
| Section rhythm | `section.band { padding: 110px 0 }` + per-section overrides | Preserved exactly (user override of skill 100/64/44 default, matching `solution/core`) | Keep designer's vertical rhythm consistent with sibling page |

## Risks & TODOs

- **interactions.ts cleanup is best-effort**: the ported design code uses
  `requestAnimationFrame` loops (marquee, count-ups) that are not tracked for
  teardown; on SPA unmount they run until the next full load. Fine for a
  marketing page; revisit if this becomes a frequently-navigated flow.
- **`@ts-nocheck` on interactions.ts**: ported plain JS, not type-annotated;
  logic is unchanged from the source `<script>` blocks.
- **Double-attach guard**: module-level `attached` flag prevents StrictMode
  double-bind. If a deliberate re-attach is ever needed, clear the flag first.
- **`it-dot` "reach" panel**: the dots row includes a `data-panel="reach"` dot
  with no matching panel (carried from the design). Harmless — clicking it
  matches nothing. Left as-is to match the design.
- **Dead CSS carried from design**: the design `<style>` defined rules for
  sections not present in this page's body (`program-cols` / section 4,
  `coverage-grid` / `cov-card` / section 6, `bento` masonry). The transform kept
  them (~16 rule-groups). Harmless — no markup references them. Left in to keep
  the stylesheet a faithful transform of the source; can be pruned later.
- **Static phone-mock dropdowns**: the telemed questionnaire's `tin-*-trigger`
  selects are display-only (no list elements, no wiring), matching the rest of the
  mock (e.g. `tin-input` is a static div). The unused `window.tinToggleDrop/
  tinSelectOpt/tinConfirm` handlers were removed.
- **Performance**: page is heavy (multiple animated SVGs, marquee RAF, 3 cloned
  journeys). Consider lazy-loading below-the-fold sections if LCP regresses.
  Out of scope for this PR.
- **Verification**: `npx tsc --noEmit` passes (no errors from this page; the 3
  reported errors are pre-existing missing `@types` for `dompurify`,
  `mixpanel-browser`, `react-pdf`). Visual review pending on the Netlify preview.
```
