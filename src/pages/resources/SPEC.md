# /resources Page Spec

## Route
`/resources`

## SEO
- **Title:** Resources | PHIL
- **Description:** Explore PHIL's library of reports, webinars, blogs, and press coverage on patient access, direct-to-patient programs, and pharmaceutical commercialization.

## Layout
Shared site Layout (header + footer).

## Data
Hardcoded TypeScript array at page level (`RESOURCES_DATA: ResourceItem[]`), 97 items from CSV. Source of truth: `Resource Hub - Updated 5_11 - Resource Hub.csv`.

```ts
interface ResourceItem {
  title: string;
  description?: string;
  type: "Report" | "Press" | "Webinar" | "Blog";
  tags: string[];
  url: string;
  buttonLabel: string;
}
```

## Component List

| Component | Location | New/Reused |
|---|---|---|
| `Pagination` | `src/components/common/Pagination/` | **Reused** |
| `DemoCta` | `src/components/common/DemoCta/` | **Reused** |
| Resources page | `src/pages/resources/index.tsx` | **New** |

## Sections (top to bottom)
1. **Hero** — "Resource Hub" headline, subtitle, abstract CSS/SVG art
2. **Filter bar** — Search input + Type filter buttons + Theme tag pills (page-specific)
3. **Resource grid** — 3-column grid of cards, paginated (9 per page)
4. **Pagination** — Reused component
5. **DemoCta** — Reused component

## Filtering & Search
- **Search:** Client-side, case-insensitive match on title + description
- **Type filter:** Toggle buttons (Report, Press, Webinar, Blog). Multiple active. No selection = show all.
- **Theme filter:** OR logic — show items that have any selected tag
- **Combined:** Search AND Type AND Theme all apply together. Pagination resets to page 1 on filter change.

## Links
- Internal (`phil.us/*`): Strip domain, use Gatsby `Link` with relative path
- External: `<a>` with `target="_blank" rel="noopener noreferrer"`

## Pagination
- 9 items per page
- Reuses `Pagination` component

## Responsive Approach
- Breakpoint at `$phil-breakpoint-lg` (80em / 1280px)
- Below 80em: single-column grid, stacked filters, reduced padding

## Interactions
- Resource cards: `translateY(-3px)` + shadow on hover
- Filter buttons: background/border transition on active/hover
- Hero art: CSS keyframe spin animation on rings
- Search input: standard focus styles

## Deviation Log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Responsive breakpoint | 1000px | 80em (1280px) | Match navbar collapse breakpoint |
| Internal links | Full `https://phil.us/...` URLs | Relative paths via Gatsby Link | Internal routing preferred |
| Font loading | Base64 embedded | Site's existing Raleway/Lato | Already available |
| CSS custom properties | `--phil-*` variables | Raw hex values | Match project convention |
