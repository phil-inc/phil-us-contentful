# Partners Page — SPEC

## Scope
New code-driven page at `/partners/` for pharma brand partners. It replaces the Contentful page at the same route.

## Route
`/partners/` — file-based via `src/pages/partners/index.tsx`. The Contentful `partners` entry is skipped in
`handleRegularPage` (`src/strategies/GenerateMainPages.ts`).

## SEO
- Title: "Pharma Partners — Accelerate Brand Success with PhilRx" (54 chars)
- Description: "Partner with PhilRx, the digital hub trusted by leading brands. Improve patient access, payer coverage and GTN, and turn channel data into brand insight." (153 chars)
- One `<h1>` (hero); sections use `<h2>`, cards `<h3>`
- `Head` export follows the providers page (`SeoMeta` + `JsonLd`)

## Layout
Shared `Layout` (MegaNav + MegaFooter). Content width uses `xl-container`.

## Sections
1. **Hero** — badge, h1 with drawn underline, lead, Book Demo + "Calculate GTN Potential" (anchors to `#gtn`), phone mock-up with rotating messages, two floating stat cards, mouse parallax/spotlight
2. **GTN calculator teaser** (`#gtn`) — copy, three count-up stats, sticky "Run Your Numbers" card linking to `/gtn/`
3. **Marquee** — looping word strip
4. **Value + outcomes** — intro pair, PhilRx vs. traditional bar card
5. **Digital Hub** — copy + rotating orbit of six nodes around the PHIL logo
6. **Why Partner** (`#platform`) — three cards: animated journey chips, coverage rows, insight bars
7. **Access paths** (`#paths`) — "New Prescription" tree with three paths
8. **How It Works** (`#journey`) — four steps with a scroll-driven progress line
9. **Partners We Work With** (`#partners`) — Expert / Technology Alliance cards
10. **GTN banner** — links to `/gtn/`
11. **Testimonials** — four quotes, auto-rotating every 6.5s, dot navigation
12. **Resources** (`#resources`) — three cards + "View all resources"
13. **Final CTA** — Book Demo (`/demo/`) + Get in Touch (`/contact/`)

## Data shape
`_data.ts` holds SEO strings and content arrays: `HERO_MESSAGES`, `GTN_STATS`, `MARQUEE_WORDS`, `OUTCOMES`,
`HUB_NODES`, `JOURNEY_CHIPS`, `COVERAGE_ROWS`, `INSIGHT_BARS`, `ACCESS_PATHS`, `JOURNEY_STEPS`, `QUOTES`,
`RESOURCES`. Icons are mapped to images in `index.tsx`.

## Interactions
- Scroll reveal on `[data-reveal]` elements (IntersectionObserver, per-element delay)
- Hero messages, journey chips and quotes cycle on timers
- GTN stats count up once the section is in view
- Journey line fills with scroll
- All motion is disabled under `prefers-reduced-motion`

## Responsive approach
Design breakpoints as CSS media queries: ≤1023px GTN and paths grids stack and the GTN card stops being sticky;
≤759px Why cards stack; ≤559px phone scales to 0.82, hero buttons share one row, path tree loses its connectors
and stacks; ≤479px floating hero cards hide; ≤359px smaller hero buttons.

## Assets
- `assets/phone-philrx-logo.png` — PHILRx logo in the phone mock-up
- `assets/hub-center-logo.png` — PHIL logo in the orbit centre
- `assets/dots-accent.png` — dot motif (outcomes card, technology partner card, strategy resource card)
- `assets/icon-patient-journey.png`, `icon-hcps.png`, `icon-manufacturers.png`, `icon-pharmacy.png`, `icon-insurance.png` — orbit nodes
- `assets/icon-coverage.png`, `icon-check.png` — coverage card
- `assets/icon-copay.png`, `icon-medication-access.png`, `icon-partner.png` — access paths / partner card
- `src/assets/images/p-dots-light.png` (shared) — dot motif on the first Why card and the report resource card

## Deviation log
| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Header, announcement bar, footer | Custom in-page header with anchor nav, "New" research bar, minimal footer | Shared MegaNav / MegaFooter via Layout | Site consistency (ticket defaults) |
| GTN form | Embedded HubSpot form | "Calculate Your Potential" button to `/gtn/` | Forms are out of scope by default; needs HubSpot IDs confirmed |
| Section padding | 100 / 60 / 45px at 1024 / 768px | 100 / 64 / 44px at 720 / 480px | Skill section-spacing rule |
| Width wrapper | `max-width:1300px` + `--sx` side padding | `xl-container` | Codebase convention |
| Refill, data and insights icons; circles motif; GTN background graphic | Shown | Omitted (empty slot) | Pictures in the design export are corrupt (IDAT checksum mismatch or truncated); need replacements |
| Patient names | Named demo patient, doctor and testimonial authors | Generic "Hi there!", "Your doctor", "PHIL Patient" | Names removed from the design source |
| Internal links | Absolute `https://phil.us/...` | Relative paths | Skill rule |
