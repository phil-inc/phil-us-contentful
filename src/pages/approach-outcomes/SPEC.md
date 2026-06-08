# Approach & Outcomes Page — SPEC

## Scope
New page at `/approach-outcomes`.

## Route
`/approach-outcomes` — file-based Gatsby page at `src/pages/approach-outcomes/index.tsx`.

## Component List
- **New:** `src/pages/approach-outcomes/index.tsx` (page component)
- **New:** `src/pages/approach-outcomes/approachOutcomes.module.css` (all styles)
- **Reused:** `Layout` (shared header/footer)
- **Modified:** `MegaNav.tsx` (add nav link under Why PHIL)
- **Modified:** `megaFooter.tsx` (add footer link under Our Solution)

## SEO
- Title: "Our Approach & Outcomes | PHIL"
- Description: "PHIL's platform removes barriers to branded prescriptions by solving access, affordability, and adherence — driving measurable commercial outcomes for pharma brands."

## Navigation Changes
- **MegaNav:** Add "Our Approach and Outcomes" as first item under Our Solution → Why PHIL, linking to `/approach-outcomes/`
- **MegaFooter:** Add "Approach & Impact" under Our Solution, linking to `/approach-outcomes/`

## Sections (in order)
1. Hero — headline + 3 gradient challenge/solution columns (Access, Affordability, Adherence)
2. Patient Journey — 7-step interactive stepper with expandable detail panels
3. Our Solutions — Stacked cards: PHIL Digital Hub (4 pillars) + nested PHIL Direct-to-Patient
4. Satisfaction Proof — Real Trustpilot widget + 3 HCP testimonial cards
5. Customer Success Stories — 4 gradient case study cards
6. ROI Calculator — Heritage gradient banner with mini stat cards
7. Final CTA — Tidewater gradient banner (match pharma page CTA behavior)
8. Footer — via shared Layout

## Form Behavior
None — all CTAs are plain `<Link>` navigations.

## Trustpilot
Embed real widget with:
- `data-businessunit-id="60e5837e95cb800001e58b14"`
- `data-token="cc8ca450-b390-4863-a7eb-202050a1044e"`
- External script loaded in useEffect

## Responsive Approach
- Mobile breakpoints at 1100px, 980px, 720px, 480px
- Grid collapses to single column on mobile
- Journey stepper: 4-col → 2-col on mobile, titles hidden at 480px
- Stat row: 4-col → 2×2 on mobile → single column at 480px

## Assets
- Fonts: Raleway Bold + Lato 400/700 (already loaded globally via Mantine theme)
- PHIL logo: uses shared Layout (no local logo needed)
- All icons: inline SVGs (no external image assets)

## Risks / Workarounds
- Trustpilot widget requires external JS — loaded via `useEffect` with cleanup
- No Contentful dependency — fully code-driven page

## Deviation Log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Header/Footer | Custom standalone | Shared Layout component | Site consistency; nav update requested |
| `.wrap` max-width container | Custom `.wrap` class | `xl-container` class | Project convention per SKILL.md |
| External links (phil.us/*) | Absolute URLs | Relative paths | Internal routing per SKILL.md |
| "Calculate Your Potential" href | `GTN Landing Page.html` | `/gtn` | User specified |
| Fonts | Embedded base64 in CSS | Global Mantine theme fonts | Already available site-wide |
| Final CTA section | Design's own CTA style | Match pharma page CTA CSS/behavior | User requested |
