# /resources Page Spec

## Route
`/resources/` is page 1 of the grid. Pages 2+ are `/resources/page/n/`: static pages that `gatsby-node.ts` (`onCreatePage`) builds from this same component, up to `RESOURCES_TOTAL_PAGES` (in `_urlFilters.ts`, grows with `RESOURCES_DATA`). The page number comes from the path; filters (`topic`, `type`, `search`) stay in the query string, e.g. `/resources/page/2/?topic=direct`. `netlify.toml` 301s the old `/resources/?page=n` to `/resources/page/n/`; the page then drops the leftover `?page` from the URL.

## SEO
- **Title:** Resources | PHIL on page 1; `Resources – Page n of N | PHIL` on page 2+ (static `Head`). On the client, an active topic/type filter changes `document.title` too (`titleForSelection`).
- **Description:** Explore PHIL's library of reports, webinars, blogs, and press coverage on patient access, direct-to-patient programs, and pharmaceutical commercialization.
- **Canonical:** each page is its own canonical (`/resources/page/n/`), never page 1, so crawlers keep the cards only that page shows. Filter query strings are never part of it: the static HTML behind them is unfiltered. JSON-LD is `CollectionPage`, named after the page's title.

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
- `RESOURCES_PER_PAGE` (9) items per page
- Reuses `Pagination` with `getPageHref`, so pages are `<a href>` links crawlers can follow; each link keeps the active filters
- Moving between pages of the listing keeps the scroll position (`shouldUpdateScroll` in `gatsby-browser.tsx`)
- Editing the search on page 2+ returns to `/resources/`, handing the typed value and focus to the new page

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
