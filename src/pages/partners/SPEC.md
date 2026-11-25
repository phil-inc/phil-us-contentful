# SPEC: /partners (Pharma Partners Page)

## Scope
New code-driven page that replaces the Contentful `partners` page. The Contentful entry still exists;
`handleRegularPage` in `src/strategies/GenerateMainPages.ts` skips the `partners` slug so this file owns the route.

## Route
`/partners/`

## SEO
- Title: "Pharma Partners — Accelerate Brand Success with PhilRx" (54 characters)
- Description: "Partner with PhilRx, the digital hub trusted by leading brands. Improve patient access, payer coverage and GTN, and turn channel data into brand insight." (153 characters)

## Layout
Shared `Layout` (site navbar, top banner and footer).

## Data
Content arrays live in `_data.ts` (hero messages, GTN stats, marquee words, outcomes, hub nodes, chips, coverage rows,
insight bars, access paths, journey steps, quotes, resource cards). SEO constants are in `index.tsx`.

## Sections
1. **Hero** (`#hero`) — pill "For Life Sciences Manufacturers", H1 with animated underline on "PhilRx", lead, "Book Demo" (`/demo/`) and "Calculate GTN Potential" (`#gtn`). Phone mockup with cycling chat messages and two floating stat cards; mouse parallax and spotlight.
2. **GTN form** (`#gtn`) — eyebrow, H2, lead, three count-up stat tiles that animate when the section enters view; beside them a "Run Your Numbers" card with the HubSpot form (portal `20880193`, form `a416c378-bb01-401d-a2d0-5c7d9369c8ee`) via the shared `HubSpotFormV2`, sticky from 1024px, stacked below it.
3. **Marquee** — scrolling outcome words.
4. **Intro + outcomes** — H2 and lead, then a forest card with PhilRx vs. traditional bar comparisons.
5. **Digital hub** — H2, lead and a rotating orbit of six stakeholder nodes around a PHIL mark.
6. **Why partner** (`#platform`) — three cards: journey chips that light up in turn, coverage rows, insight bar chart.
7. **Access paths** (`#paths`) — "New Prescription" tree branching to Insured / Self-Pay / Other Non-Commercial.
8. **How it works** (`#journey`) — four numbered steps with a progress line that fills on scroll.
9. **Partner types** (`#partners`) — Expert Alliance and Technology Alliance cards.
10. **GTN banner** — links to `/gtn/`.
11. **Testimonials** — auto-rotating quote (6.5s) with dot controls.
12. **Resources** (`#resources`) — three cards and "View all resources" (`/resources/`).
13. **Closing CTA** — "Book Demo" (`/demo/`) and "Get in Touch" (`/contact/`).

## Interactivity
- `[data-reveal]` elements fade in via IntersectionObserver; content stays visible without JS.
- Timers: hero messages (3.2s), journey chips (1.6s), testimonials (6.5s).
- Reduced motion disables animations and transitions.

## Responsive
Follows the design's breakpoints: 1024px (access paths stack), 760px (why cards stack), 560px (phone scales to 82%,
hero buttons share a row, access tree stacks), 480px (floating cards hidden), 360px (smaller hero buttons).
Section padding: 100px, 64px at 720px, 44px at 480px.

## Assets
In `assets/`: `philrx-logo.png`, `hub-center-logo.png`, `dots-accent.png`, `icon-network.png`,
`icon-patient-journey.png`, `icon-providers.png`, `icon-manufacturers.png`, `icon-insurance.png`, `icon-coverage.png`,
`icon-check.png`, `icon-copay.png`, `icon-medication-access.png`, `icon-partner.png`, `icon-refill.png` ("Free Rx delivery" card, "Quick start" path),
`icon-data.png` ("Insights" orbit node),
`circles-primary.png` (hero, journey, GTN banner, CTA and webinar card decoration).
Reused from `src/assets/images/`: `p-dots-light.png`, `p-dots-dark.png` (same pictures as in the design).

## Deviations from design

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Header, top banner, footer | Own sticky header with in-page nav and mobile menu, own footer | Shared `Layout` | Site standard |
| Data and insights pictures | Packed in the design | Data icon rebuilt from its intact top rows, with the lost lower axis drawn to match the upright one; no icon on the Technology Alliance card | The packed files are damaged mid-image |
| Circles picture | Packed in the design | Rebuilt from the intact rows; the last 34 rows repeat the identical top circle | The packed file is damaged near its end |
| Phone chat greeting | Named patient and doctor | Generic greeting and "Your doctor" | No personal names in page copy |
| Patient quote attribution | Patient names | "PHILRx Patient" | No personal names in page copy |
| Report card title | Redacted in the export | Title used for the same report in `src/pages/resources/_data.ts` | Export text was incomplete |
| Absolute phil.us links | `https://phil.us/...` | Relative paths | Internal links are relative |
| Section padding | 100px / 75px, 60px at 768px, 45px below | 100px, 64px at 720px, 44px at 480px | Site section spacing rule |
| Container | 1300px max width with 100/48/20px side padding | `xl-container` | Site standard |
| Fonts | Packed font files | Raleway/Lato loaded by Layout | Fonts already loaded globally |
