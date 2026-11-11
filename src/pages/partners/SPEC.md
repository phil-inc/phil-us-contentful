# SPEC: /partners (Pharma Partners)

## Scope
Code-driven page that **replaces** the Contentful page at `/partners`. Built from the "Pharma Partners (Standalone)" design export.

## Route
`/partners/` → `src/pages/partners/index.tsx`.

### Contentful override
`handleRegularPage` in `src/strategies/GenerateMainPages.ts` skips the `partners` slug, so the Contentful entry no longer builds a page at this route.

## SEO
- Title (54 chars): `Pharma Partners — Accelerate Brand Success with PhilRx`
- Description (154 chars): `Partner with PhilRx, the digital hub trusted by industry-leading brands, to improve patient access, payer coverage, and gross-to-net for your pharma brand.`
- `Head` follows `src/pages/providers/index.tsx` (`SeoMeta` + `JsonLd` web-page schema).

## Layout
Shared `Layout` (site navbar + footer). The design's own header and footer are dropped.

## Data
`_data.ts` holds the SEO constants and the card arrays: `VALUE_CARDS`, `PARTNER_TYPES`, `RESOURCES`. Patient quotes are reused from `PATIENT_QUOTES` in `src/pages/pharma/_data.ts`.

## Sections (top → bottom)
1. **Hero** — eyebrow "For Life Sciences Manufacturers", H1 "Accelerate Brand Success with PhilRx", lead, CTAs "Book Demo" → `/demo/` and "Calculate GTN Potential" → `/gtn/`, decorative graphic on the right.
2. **Intro** — H2 "Maximize Value for Your Brand" beside a lead paragraph.
3. **Why Partner with Phil** (`#value`) — 3 value cards, each with an icon.
4. **Partners We Work With** (`#partners`) — Expert Alliance (light) and Technology Alliance (dark) cards, "Get in Touch" → `/demo/`.
5. **What Our Patients Say** — 3 patient quote cards, "Read reviews on Trustpilot" link.
6. **Resources from Phil** (`#resources`) — webinar, report (`/pharma-dtp-research/`) and blog post cards.
7. **Interested in Partnering?** — gradient CTA band, "Book Demo" → `/demo/`.

## Interactions
- Hero copy rises in on load (`riseIn` keyframe).
- Section titles and cards fade up on scroll (`IntersectionObserver`, 0 / 120 / 240 ms stagger). Elements are hidden only after the observer mounts, so content stays visible without JS.
- Cards lift on hover.
- All motion is off under `prefers-reduced-motion`.

## Responsive
The design's own breakpoints: grids are `repeat(auto-fit, minmax(300px, 1fr))`, headings use `clamp()`. Section padding steps 100px → 64px (≤720px) → 44px (≤480px).

## Assets
Extracted from the design export into `src/pages/partners/assets/`:
- `hero-graphic.png` — decorative hero graphic, floats on the right of the hero (`floaty` keyframe).
- `icon-journey.png`, `icon-coverage.png`, `icon-insight.png` — 72px icons on the three value cards, in `VALUE_CARDS` order.

The design's PHIL logo belongs to its own header and footer, which the shared `Layout` replaces, so it is not used.

## Deviation log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Header / footer | Standalone page header and footer | Shared site `Layout` | Ticket asks for the shared header and footer |
| Container | `clamp(24px,6vw,100px)` side padding | `xl-container` | Site standard |
| Section padding | `clamp(64px,8vw,120px)` | `100px` / `64px` / `44px` | Site vertical-rhythm standard |
| Patient quotes | Quote text in the design | `PATIENT_QUOTES` from `/pharma/` | Reuses the approved quotes already on the site |
| Report card title | Redacted title in the export | Title used by `/resources/` for `/pharma-dtp-research/` | Matches the existing card for the same report |
| Internal links | Absolute `https://phil.us/...` | Relative paths | Site rule for internal links |
| Fonts | `@font-face` blob URLs | Raleway / Lato loaded by `Layout` | Fonts already loaded globally |
