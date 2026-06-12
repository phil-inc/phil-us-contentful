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

## Full-Screen Behavior
`/demo` is a dedicated full-screen landing page. The shared `MegaNav` (the
navbar **and** the promo banner above it) is hidden via `Layout`'s
`canHideHeader` prop, and the hero fills the full viewport (`height: 100vh`).
This reverses the original "wrap in shared Layout with header" decision (see
Deviation Log) so the page matches the standalone single-screen design intent.
The shared footer (`StaticFooter`) is still rendered below the fold.

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
- `static/images/demo-phil-logo-white.png` — white PHIL logo shown in the hero
  (copied from design `assets/phil-logo-white.png`). The shared Layout header
  also shows the green PHIL logo — both kept intentionally (see deviation log).

## Risks / Workarounds
- Embedded HubSpot form is skinned to match the design via scoped `:global`
  overrides on `.hsForm` in `demo.module.css` (inputs, labels, validation,
  submit button). These override the app's generic global `.hs-*` styles.
- Old Contentful "Demo Page" entry is now orphaned (not deleted) — same as the
  other static-page migrations.

## Deviation Log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Layout / header | Standalone 100vh single screen, own white logo | Wrapped in shared `Layout`, but `MegaNav` (navbar + promo banner) is hidden via `canHideHeader`. Footer still renders below the fold. White hero logo is the only logo shown | Reverted to full-screen per request: hide navbar + banner above it |
| Form | Custom branded fields + client validation + in-card success screen | Standard embedded HubSpot form, skinned via `.hsForm` `:global` overrides to match the design inputs/labels/validation/button | Requested during grill (lead capture must hit HubSpot); restyled per follow-up |
| Post-submit | In-card "You're all set" success state | Navigate to `/sharpen-your-access-and-commercialization-efforts` | `HubspotForm` component default behavior |
| Route / canonical | `/book-demo` | `/demo` | Replaces existing demo page; all site CTAs already point to `/demo` |
| Container | `.bd-A-grid` max-width 1240 / 72px pad | `.xl-container` (1320 / 32px pad) + grid | Skill mandates `xl-container` for content width |
| Hero height | `height: 100vh; min-height: 680px` (standalone) | `min-height: 100vh` at >= 861px with the design's native, full-size type/spacing (no compression) now that the navbar + banner are hidden. Anchors content to the top; grows past 100vh instead of clipping. Mobile (<861px) keeps natural flow | Page is a true full-screen landing replicating the design; navbar/banner hidden so the full-size layout fits |
| Headline source | Screenshots show alternate copy | directionA.jsx copy | Grill decision — runnable JSX is source of truth |
| Form/bullets offset | `translateY(5%)` / `translateY(-5%)` | Same — `.formCol` `translateY(5%)`, `.bullets` `translateY(-5%)` at >= 861px | Restored to match the design now that the page is full-screen |
| Design tokens | Global `colors_and_type.css` | 7 tokens scoped on `.hero` | That CSS file isn't in the app; tokens declared per-page like approach.module.css |
