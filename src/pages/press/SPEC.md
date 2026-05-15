# /press Page Spec

## Route
`/press`

## SEO
- **Title:** Press | PHIL
- **Description:** Read PHIL's latest news, announcements, and thought leadership on pharmacy innovation and direct-to-patient programs.

## Layout
Shared site Layout (header + footer).

## Data
Hardcoded TypeScript array at page level (`PRESS_DATA: PressItem[]`), passed as props to section components. Source of truth: `PHIL Press Library - Updated 5_11 - PHIL Press Releases.csv`.

```ts
interface PressItem {
  title: string;
  description?: string;
  outlet: string;
  type: "Release" | "Thought Leadership";
  url: string;
}
```

## Component List

| Component | Location | New/Reused |
|---|---|---|
| `Pagination` | `src/components/common/Pagination/` | **New — reusable** |
| `DemoCta` | `src/components/common/DemoCta/` | **New — reusable** |
| Press page | `src/pages/press/index.tsx` | **New** |

## Sections (top to bottom)
1. **Hero** — "PHIL in the press" headline, subtitle, abstract CSS/SVG art with spinning rings
2. **Latest Announcements** — 3 heritage-gradient featured cards (most recent releases)
3. **Featured Thought Leadership** — 3 gradient cards (tidewater, meadow, forest)
4. **All Coverage** — Paginated grid of all 11 press cards (6 per page), client-side pagination
5. **DemoCta** — Reusable tidewater gradient CTA with "Book A Demo" linking to `/demo`

## Pagination Component
- Props: `currentPage: number`, `totalPages: number`, `onPageChange: (page: number) => void`
- Renders prev/next arrows + numbered page buttons
- Active state styling, disabled state on boundaries

## DemoCta Component
- Props: `eyebrow?: string`, `heading: string`, `description?: string`, `ctaLabel?: string`, `ctaHref?: string`
- Tidewater gradient background with decorative radial blurs
- Internal link via Gatsby `Link`

## Form Behavior
None.

## Responsive Approach
- Single breakpoint at `$phil-breakpoint-lg` (80em / 1280px) — matches navbar collapse
- Below 80em: single-column grids, reduced padding, stacked layout

## Colors (raw hex, matching project convention)
- Foliage: `#00827E`
- Forest: `#00615E`
- Pitch: `#0A0A0A`
- Gunmetal: `#525252`
- Mortar: `#9E9E9E`
- Base: `#D7DCDC`
- Slime: `#D5F1F0`
- Pure: `#FFFFFF`

## Assets
All visuals are CSS gradients + inline SVG. No external images to import.

## Interactions
- Featured cards: `translateY(-3px)` + shadow on hover
- CTA arrows: gap widens on hover
- Hero art: CSS keyframe spin animation on rings (80s/60s duration)
- Pagination buttons: background/border color transition on hover/active

## Risks / Workarounds
None — fully self-contained, no Contentful, no shared component modifications.

## Deviation Log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Responsive breakpoint | 1000px | 80em (1280px) | Match navbar collapse breakpoint for consistency |
| Demo CTA link | `https://phil.us/demo` | `/demo` | Internal routing preferred |
| Font loading | Base64 embedded in HTML | Site's existing Raleway/Lato | Already available via Mantine theme |
| CSS custom properties | `--phil-*` variables | Raw hex values | Match existing project convention (see gtn page) |
| Featured "Beyond DTP 2.0" card | Present in design HTML | Removed | Not in CSV source of truth |
| Data source | Inline HTML | Typed TS constant from CSV | Cleaner, maintainable, props-driven |
