# Pharma Page — SPEC

## Scope
New static page at `/pharma/` targeting pharmaceutical manufacturers.

## Route
`/pharma/` — file-based via `src/pages/pharma/index.tsx`

## Layout
Shared `Layout` component (MegaNav + MegaFooter). Content uses `xl-container` for width.

## Sections (8)
1. **Hero** — eyebrow, h1 with `<em>` accent, lead paragraph, horizontal stat marquee (6 cards, duplicated for seamless loop)
2. **Our Partners** — 3 pill-tabs (Supporting Brands / Products & TAs / Outcomes), each shows copy panel. Book Demo + Learn CTAs.
3. **Our Platform** — Two video cards (PHIL Core + PHIL Direct) with "+" combiner. Thumbnails link to YouTube. Explore text-link CTAs.
4. **How We Help You (Stakeholders)** — Left rail with 5 tabs (Brand, Access, Trade, Hub, Innovation). Right panel shows icon, title, Problem/Solve columns, Learn More CTA.
5. **PHIL Support** — 3-card grid: patient quotes (rotating), feature CTA card, provider quotes (rotating). Trustpilot widget strip below.
6. **FAQ** — Two-column: sticky side-nav (4 categories) + accordion items with scroll-spy.
7. **Final CTA** — Tidewater gradient banner, headline, Book Demo button.
8. **Footer** — Handled by shared Layout.

## Interactions
- Stat marquee: CSS `@keyframes` infinite scroll, pauses on hover, respects `prefers-reduced-motion`
- Partner tabs: click to switch active panel (fade animation)
- Stakeholder tabs: left rail → right panel switch with slide-up transition
- Review cards: auto-rotating quotes (6s interval), dot navigation, pause on hover
- FAQ accordion: click to toggle, `max-height` transition, scroll-spy side-nav with sliding marker

## Assets
- `assets/phil-core-thumb.jpg` — PHIL Core video thumbnail
- `assets/phil-direct-thumb.jpg` — PHIL Direct video thumbnail
- `assets/phil-logo.png` — (not needed, Layout handles logo)

## SEO
- Title: "Pharma · PHIL" (~12 chars)
- Description: "PHIL is the all-in-one access platform for retail and specialty lite pharma brands to maximize outcomes and drive measurable performance." (~145 chars)
- One `<h1>`, proper heading hierarchy
- Head export pattern from providers page

## Component Structure
All section components defined inline in `index.tsx` (same pattern as providers/patients pages). Data constants in `_data.ts`. Styles in `pharma.module.css`.

## Responsive Approach
Full responsive from design CSS:
- Desktop (>1100px): full layout
- Tablet (720–1100px): 2-col grids collapse, stakeholder tabs stack
- Mobile (≤720px): single column, FAQ side-nav hidden (inline category labels), marquee keeps scrolling with smaller cards
- Small phone (≤480px): fluid type via clamp(), full-width buttons

## Deviation Log
| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Footer | Minimal custom footer | Shared MegaFooter via Layout | Site consistency, per user decision |
| Header | Removed | Shared MegaNav via Layout | Site consistency, per user decision |
| `.wrap` container | Custom 1256px wrapper | `xl-container` class | Codebase convention per skill rules |
