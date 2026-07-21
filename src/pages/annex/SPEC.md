# Consumer Annex Page — SPEC

## Scope
New static legal page at `/annex` (MRTG-1443). Hosts three consumer
health-data / privacy annexes and a link that reopens the CookieYes consent
banner.

## Route
`/annex` — file-based Gatsby page at `src/pages/annex/index.tsx`.

## Component List
- **New:** `src/pages/annex/index.tsx` (page component)
- **New:** `src/pages/annex/_data.ts` (SEO constants, link URLs, list content)
- **New:** `src/pages/annex/annex.module.css` (all styles)
- **Reused:** `Layout` (shared header/footer), `PageContext`, `getOgImage`
- **Modified:** `megaFooter.tsx` (add "Consumer Annex" to `LEGAL_LINKS`)

## SEO
- Title: "Consumer Annex | PHIL"
- Description: supplemental U.S. consumer health data privacy statement,
  authorization, and supplemental U.S. privacy notice.
- Canonical + OpenGraph + Twitter + JSON-LD `WebPage` schema (matches the
  patients / pharma / approach page pattern).

## Navigation Changes
- **MegaFooter:** Add "Consumer Annex" to `LEGAL_LINKS`, linking to `/annex`,
  beside the HIPAA Notice.

## Sections (in order)
1. Annex A — Supplemental U.S. Consumer Health Data Privacy Statement (`#annex-a`)
2. Annex B — Consumer Health Data Authorization (`#annex-b`)
3. Annex C — Supplemental U.S. Privacy Notice (`#annex-c`)

## CookieYes Integration
Annex B references the consent banner. Each "cookie banner" mention renders as a
`<button>` whose `onClick` calls `window.revisitCkyConsent()` — the global the
live CookieYes banner exposes to reopen its preference center. (The older
`.cky-banner-element` class does nothing in the CookieYes version on phil.us.)
The banner is injected through GTM (not in this repo) and is absent on
localhost, so the click is a no-op in dev — the reopen behavior must be verified
on staging/prod.

## Open Items (legal / non-code)
- **Banner label mismatch:** Annex B copy says "Personalize marketing" /
  "Save my choices" / "Decline all"; the live CookieYes banner uses
  "Advertising and Marketing" / "Save My Preferences" / "Reject Optional
  Cookies". Legal to reconcile copy vs. banner before publish (built verbatim
  from the source doc per request).
- **Terms / Privacy / HIPAA content updates** are Contentful (CMS) work, not part
  of this page.
