# SPEC: /partners (Partners Page)

## Scope
New code-driven page that **replaces** the existing Contentful page at `/partners`.
Source: the "Pharma Partners (Standalone)" design export attached to the ticket.

## Route
- `/partners/` → `src/pages/partners/index.tsx`

### Contentful override
`handleRegularPage` in `src/strategies/GenerateMainPages.ts` skips the Contentful
`partners` slug so this file-based page owns the route. Do not remove that guard.

## SEO
- Title: `Partner with PHIL — Digital Hub for Life Sciences Brands` (56 chars)
- Description: `Partner with PHIL to improve patient access, payer coverage, and GTN for your brand with a digital hub trusted by industry-leading life sciences manufacturers.` (159 chars)
- The ticket left both as placeholders, so they were written for this page;
  marketing may replace them.
- One `<h1>` (hero); every section heading is an `<h2>`, card titles are `<h3>`.

## Layout
Shared `Layout` (site header + footer). The design's own header (logo, anchor
nav, Patient Login / Book Demo buttons) and footer are dropped.

## Sections (top → bottom)
1. **Hero** — eyebrow, H1, lead, "Book Demo" → `/demo/`, "Calculate GTN Potential" → `/gtn/`.
   Decorative hero graphic floats on the right (`floaty` keyframes); copy rises in (`riseIn`).
2. **Intro** — "Maximize Value for Your Brand" H2 + body, two auto-fit columns.
3. **Why Partner with Phil** (`id="value"`) — 3 icon cards (`VALUE_CARDS`).
4. **Partners We Work With** (`id="partners"`) — 2 cards (`PARTNER_CARDS`, light and dark),
   "Get in Touch" → `/demo/`.
5. **What Our Patients Say** — 3 quote cards (`PATIENT_QUOTES`), "Read reviews on Trustpilot →".
6. **Resources from Phil** (`id="resources"`) — 3 resource cards (`RESOURCE_CARDS`).
7. **Closing CTA** — "Interested in Partnering?" + "Book Demo" → `/demo/`.

## Data
`_data.ts` holds the copy, link constants and card arrays. `PATIENT_QUOTES` is
the `patients` group of `VOICES` from `src/pages/customer-success/_data.ts`.

## Interactions
- Scroll reveal: elements with `data-reveal="<ms>"` fade and rise in once they
  are 15% visible, after their own delay (0 / 120 / 240 ms per card). Off under
  `prefers-reduced-motion`.
- Hover: cards lift 6px with a soft green shadow; the white hero button lifts 3px.

## Responsive
The design's own behaviour: auto-fit grids (`minmax(280px|300px, 1fr)`) and
`clamp()` heading sizes. Section padding follows the site rhythm: 100px, 64px
at ≤720px, 44px at ≤480px.

## Assets (`assets/`)
| File | Used in |
|---|---|
| `hero-graphic.png` | Hero, decorative |
| `icon-patient-access.png` | Why Partner card 1 |
| `icon-payer-coverage.png` | Why Partner card 2 |
| `icon-drug-channel.png` | Why Partner card 3 |

The design's logo is skipped (the shared header has it). Its fonts are skipped
(Raleway/Lato are loaded by the site).

**Damaged in the export:** `hero-graphic.png` (515×1080) fails its PNG data
checksum and is cut short, so it may not display. It is placed as the design
places it; a clean copy is needed from design. The three icons open cleanly.

## Deviations from design

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Header / footer | Design's own | Shared `Layout` | Ticket asks for the shared header and footer |
| Container | Inline `clamp(24px,6vw,100px)` side padding | `xl-container` | Site standard |
| Section padding | `clamp(64px,8vw,120px)` (hero `clamp(64px,9vw,140px)`) | 100px / 64px ≤720px / 44px ≤480px | Site section rhythm |
| Internal links | Absolute `https://phil.us/...` | Relative paths | Site rule for internal links |
| Patient quotes | Quotes and names in the export | The patient quotes already published on `/customer-success/` | Avoids copying patient details from the export; reuses approved copy |
| Quote attribution | Name, with "Patient" on a second line | "Name, Patient" on one line | Format of the reused quotes |
| Report card title | Contains a redaction marker | "Direct‑to‑Patient" | The export's text was redacted; the report's real title uses this term |
| Trustpilot link | Same tab | New tab | External site |
