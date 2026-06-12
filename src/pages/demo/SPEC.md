# Book a Demo Page — SPEC

## Scope
New code-driven page that **replaces the Contentful "Demo Page"** at `/demo`.
Built from the design export `Book a Demo` (directionA.jsx + app.css).

## Route
`/demo` — file-based Gatsby page at `src/pages/demo/index.tsx`.

Served via the same file-based-override pattern as home/pharma/patients/providers:
`GenerateMainPages.ts` → `handleRegularPage` now skips the Contentful page when
`page.slug === "demo"`, so the file-based page owns the route. The old Contentful
"Demo Page" entry stays in the CMS but is intentionally not built. All existing
site CTAs (`<Link to="/demo">`) keep working unchanged.

## Component List
- **New:** `src/pages/demo/index.tsx` (page + inline hooks/stat components)
- **New:** `src/pages/demo/_data.ts` (all content + HubSpot ids)
- **New:** `src/pages/demo/demo.module.css` (all styles, ported from `app.css`)
- **Reused:** `Layout` (shared header/footer + `HubspotProvider`)
- **Reused:** `HubspotForm` (`components/common/HubspotForm/HubspotForm`)
- **Modified:** `src/strategies/GenerateMainPages.ts` (one-line route guard)

## Form Behavior
Embedded standard HubSpot form via the shared `HubspotForm` component.
- `portalId`: `20880193` (PHIL HubSpot account)
- `formId`: `ccd3ffde-09ef-492c-8f91-a500255d2735` (demo request form, region na1)
- On submit, `HubspotForm` navigates to
  `/sharpen-your-access-and-commercialization-efforts` (component default).

## SEO
- Title: "Book a Demo | PHIL — Patient Access Platform for Pharma Brands"
- Description: from the design `<head>` meta description.
- Canonical: `https://phil.us/demo` (the live route — design HTML said
  `/book-demo`, corrected to the real route).
- One `<h1>` (hero headline), `<h2>` for the form card heading.

## Responsive Approach
- Two-column grid (content + 520px form) → single column at `max-width: 860px`.
- Stat row: 5-across → wraps at 860px → single column at 520px.
- Decorative circles/orbs hidden below 860px.

## Assets
- `static/images/demo-sidebar-circles.png` — decorative motif (copied from the
  design `assets/sidebar-circles.png`).
- Floating orbs + gradients: pure CSS.
- Stat/check/Trustpilot icons: inline SVG.
- PHIL logo: provided by shared Layout header (design's in-hero white logo dropped).

## Risks / Workarounds
- Embedded HubSpot form is not restyled to match the design's custom inputs;
  it renders HubSpot's default field markup inside the white card. Restyle via
  the `.hsForm` cssClass hook if pixel-matching the inputs is required.
- Old Contentful "Demo Page" entry is now orphaned (not deleted) — same as the
  other static-page migrations.

## Deviation Log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Layout | Standalone 100vh single screen, own white logo | Wrapped in shared `Layout` (global header/footer), hero is a flowing section, in-hero logo dropped | Requested during grill; avoids duplicate logo + gives site nav |
| Form | Custom branded fields + client validation + in-card success screen | Standard embedded HubSpot form | Requested during grill (lead capture must hit HubSpot) |
| Post-submit | In-card "You're all set" success state | Navigate to `/sharpen-your-access-and-commercialization-efforts` | `HubspotForm` component default behavior |
| Route / canonical | `/book-demo` | `/demo` | Replaces existing demo page; all site CTAs already point to `/demo` |
| Container | `.bd-A-grid` max-width 1240 / 72px pad | `.xl-container` (1320 / 32px pad) + grid | Skill mandates `xl-container` for content width |
| Hero height | `height: 100vh; min-height: 680px` | Natural flow with `72px 0` section padding | Cannot 100vh-lock inside Layout |
| Headline source | Screenshots show alternate copy | directionA.jsx copy | Grill decision — runnable JSX is source of truth |
| Form/bullets offset | `translateY(5%)` / `translateY(-5%)` | none | Offsets don't translate cleanly into Layout flow; negligible visual impact |
| Design tokens | Global `colors_and_type.css` | 7 tokens scoped on `.hero` | That CSS file isn't in the app; tokens declared per-page like approach.module.css |
