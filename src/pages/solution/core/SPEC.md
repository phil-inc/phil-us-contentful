# /solution/core/ — PHIL Core Hub Page

Source design: `~/Desktop/PHIL Core Page/Solutions Page v2.html`

## Scope

New code-driven marketing landing page. No Contentful. Built fresh from the design.

## Route

`/solution/core/` → `src/pages/solution/core/index.tsx`. Gatsby file-based routing handles the nested slug.

## SEO

- Title: `Core Hub | PHIL`
- Description: `PHIL combines a flexible digital hub, integrated pharmacy network, and script-level data to maximize patient access, adherence, and brand performance.`
- One `<h1>` (hero); h2/h3 hierarchy preserved across sections.

## Layout

Wrapped in shared `src/layouts/Layout` (site header + footer + global CInfoBar slot). Design's standalone header/footer dropped.

## File structure

```
src/pages/solution/core/
  index.tsx              page composition + Trustpilot loader + Head SEO
  core.css               all section styles, scoped under .scope (global side-effect import)
  interactions.ts        ported design behavior (~880 lines), single attach() entry
  SPEC.md
  assets/
    network-map.png      hero hub + journey step 5
  _sections/
    Hero.tsx             section 1 (hub animation)
    StatBand.tsx         section 2 (count-up + Trustpilot)
    Pillars.tsx          section 3 (4-card grid)
    Journey.tsx          section 4 (pinned scroll, 7 steps)
    DataTabs.tsx         section 5 (4 dashboard tabs)
    Support.tsx          section 6 (tiles + connector + reviews)
    VideoBand.tsx        section 7 (gradient + YouTube)
    Roi.tsx              section 8 (calculator banner)
    FinalCta.tsx         section 9 (book demo)
```

Each section returns static JSX (hardcoded copy lives at section level — page is content-driven, not data-driven). All interactive behavior is centralized in `interactions.ts`, which exports `attachSolutionCoreInteractions()` and is invoked from a single `useEffect` in `index.tsx` on mount. The ported script uses `document.getElementById` / `document.querySelector` against rendered DOM (IDs preserved on the source nodes).

CSS: a single global `core.css` file scoped under `.scope` — the page root wrapper applies the class so every selector is descendant-scoped. The design CSS was machine-transformed via a one-shot Python pass that prefixes every selector with `.scope`, drops the design's own header/footer rules, strips `html`/`body` resets, and preserves `@keyframes` and `:root` token blocks.

## Section list

| # | Name | Behavior |
|---|---|---|
| 1 | Hero | Eyebrow, h1 with foliage italic, lead, "Book Demo" CTA. Right side: SVG ring + 4 floating cards (phone, network map, NRx dashboard, AI insights popup). Looping sequence: phone fills → map dots wave → bars pop → AI typewriter. |
| 2 | Stat band | 5 stats with IO-triggered count-up. Last stat embeds Trustpilot horizontal widget. |
| 3 | Pillars | 4-card grid. CTA link `href="#"` (placeholder per design). |
| 4 | Prescription Journey | Pinned section (~480vh track). 7-step rail on right, copy on left, center frame swaps mock per step. IO drives active step on scroll. Rail clicks jump. Skip link → `#data`. Each step's mock auto-plays an internal animation when active. |
| 5 | Data & Insights | 4 pill tabs above carousel of 4 dashboard cards. Click pill OR card → swap active w/ slide. Each card has table/viz + "PHIL AI Insights" popup that types body text in. Tab 1 (AI Insights) also has typewriter for the answer. |
| 6 | Support | 2 tiles (Patient, HCP) with animated SVG connector between them (orbiting dots, rings, pulsing core). Then 3 review cards, each rotating through a 3-quote set every 6.5s in sync. Then Trustpilot widget. |
| 7 | Video band | Gradient teal background, copy left, YouTube thumbnail right (link opens `https://www.youtube.com/watch?v=7Oyyt-tjrsE` in new tab). |
| 8 | ROI | Banner with copy + 4 mini-stat cards. CTA to `/gtn/`. |
| 9 | Final CTA | Gradient banner with copy + white "Book Demo" pill button → `/demo`. Mirrors home page `EndCtaSection` — same `.endcta-bg` gradient, twin radial-glow decorations, and reveal-on-scroll IntersectionObserver. Reduced-motion: instant. |

## Component reuse

None. All sections bespoke. `Head` SEO export copied from `src/pages/providers/index.tsx` template.

## Forms

None. CTAs: `/demo`, `/gtn/`, in-page anchors (`#data`).

## Interactions ported

| Behavior | Mechanism |
|---|---|
| Hero hub cycle | CSS keyframes for orbit + `useEffect` for AI typewriter loop |
| Stat count-up | `IntersectionObserver` + `requestAnimationFrame` (easeOutCubic) |
| Journey pinning | CSS sticky + tall track; `IntersectionObserver` on trigger bands sets active step |
| Journey rail click | Scroll-to-trigger center; mute IO 450ms to avoid flicker |
| Journey skip | Smooth-scroll to `#data` |
| Per-step animations | Class toggle `.is-playing` when step becomes active, MutationObserver on `.is-active` |
| Network map (step 5) | RAF-driven `strokeDashoffset` along polyline, dot pulse cascade |
| Dashboard tab swap | Class toggle `.is-active / .is-prev / .is-next`, CSS transform slide |
| Dashboard typewriter | Char-by-char insert into `.tq-body` and `.aid-answer` |
| Review rotation | `setInterval(6500)` cycles 3 quote sets in sync; fade class during swap |
| Final CTA reveal | `IntersectionObserver` (rootMargin `0px 0px -10% 0px`, threshold `0.05`) adds `.endcta-reveal-in` to fade up the banner; ported from home page `useReveal` hook (`src/pages/index.tsx`) |
| Support connector | Pure CSS animation, no JS |
| Smooth in-page anchors | Single page-level handler with 84px header offset |

## Reduced motion

`prefers-reduced-motion: reduce` honored everywhere:
- Hub: static cards, no orbit, AI answer renders fully
- Stats: render final values
- Journey: scroll works, no copy fade
- Dashboard: instant swap, no typewriter
- Reviews: instant text swap
- Connector: static
- Network map: full lines, no draw animation

## Responsive

Follow design's existing breakpoints. Key behaviors:
- Hero hub clamps to small size at `max-width: 900px`, opacity 0.5
- Journey: under `max-width: 820px`, scroll-pin is disabled (mqMobile check in IO), rail becomes stacked
- Stat band: 5 cols → wrap → stack
- Pillars: 4 cols → 2 → 1
- Support connector: hidden on mobile
- Dashboard: pills wrap, viz scales

## Assets

| Source | Destination |
|---|---|
| `assets/screens/05-network-map.png` | `src/pages/solution/core/assets/network-map.png` (used in hero hub + journey step 5) |
| `https://img.youtube.com/vi/7Oyyt-tjrsE/maxresdefault.jpg` | Remote URL (no copy) |
| `assets/phil-logo-green.png` | Skipped (footer logo lives in shared Layout) |

## Trustpilot

Script tag added once via `Head` export:
```
<script async src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"></script>
```

Two widget mounts (stat band + reviews bar), each with `data-businessunit-id="60e5837e95cb800001e58b14"` and `data-template-id="5406e65db0d04a09e042d5fc"`. Tokens preserved from design. After mount, call `window.Trustpilot?.loadFromElement(ref.current, true)` in `useEffect`.

## Branch & deploy

- Branch: `core-page-static` (existing, per user)
- PR base: `develop`

## Deviation log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Header | Custom sticky header w/ Pharma/Patients/Providers/Solution/Case Studies/Book Demo nav | Shared `Layout` header | Site-wide nav is managed via Contentful; design header was preview-only |
| Footer | Custom minimal footer w/ logo + 6 links + © | Shared `Layout` footer | Same reason as header |
| Container | `.wrap` (1256px → 1536px ≥1680px, 48px side padding) | Site-standard `.xl-container` (1320px → 1600px ≥1680px, 32px side padding) | Per user follow-up: switch to site standard. `.wrap` rules removed; positional/grid rules that depended on the wrap (hero, stat-bar, final-cta) rewritten to target `.xl-container` |
| Section padding | Varied: hero 96+100, pillars top 48, video 78, others 110 | Match design exactly (user override of skill default 100/64/44) | User chose to preserve designer's rhythm |
| Pillar CTA href | `#` | `#` (left as anchor; future `/solution/direct-to-patient/`) | Per user: keep design's placeholder |
| URLs `phil.us/demo`, `phil.us/gtn/` | Absolute | Relative (`/demo`, `/gtn/`) | Skill rule 10 |
| Title | `Solutions · PHIL` | `Core Hub \| PHIL` | Page-specific, per user |
| Footer copyright year | `© 2026 PHIL, Inc.` | N/A (shared Layout owns) | Layout footer |

## Risks & TODOs

- **Journey pinning + shared Layout sticky header**: shared header may be sticky. Verify on first preview that the active-step trigger math (`rootMargin: -50% 0px -50% 0px`) doesn't get offset by an overlapping header. If it does, adjust `rootMargin` in `interactions.ts` to compensate.
- **interactions.ts cleanup is best-effort**: the ported design script attaches IntersectionObservers, MutationObservers, intervals, and timeouts via IIFEs. Cleanup is not exhaustive — on SPA unmount these will leak until the next full page load. Fine for marketing pages; revisit if this page becomes part of a frequently-navigated flow.
- **Double-attach guard**: `interactions.ts` uses a module-level `attached` flag so React StrictMode's double-effect doesn't double-bind. Side effect: if you ever need to re-attach (e.g. after a soft reset), the flag must be cleared first.
- **`@ts-nocheck` on `interactions.ts`**: the ported design code is plain JS and not type-annotated. The module is type-checked-off; logic is otherwise unchanged from the source.
- **Trustpilot SSR**: `window.Trustpilot` only available client-side. The page-level `useEffect` handles script-tag injection on first mount, then re-runs `loadFromElement` on every widget node with no `data-initialized` attribute.
- **Performance**: page is heavy (~4.4k LOC, multiple animated SVGs, scroll-pinned section). Consider lazy-loading sections below the fold later if LCP regresses. Out of scope for this PR.
