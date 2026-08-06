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

Content matches the July 15 2026 Markdown export (Annex A/B/C). The earlier
duplicate Annex B was consolidated into a single version in that export.

## CookieYes Integration
Annex B references the consent banner. Each "cookie banner" mention renders as a
`<button>` whose `onClick` calls `window.revisitCkyConsent()` — the global the
live CookieYes banner exposes to reopen its preference center. (The older
`.cky-banner-element` class does nothing in the CookieYes version on phil.us.)
The banner is injected through GTM (not in this repo) and is absent on
localhost, so the click is a no-op in dev — the reopen behavior must be verified
on staging/prod.

## Annex C Overview Table
The "Overview of Personal Information Collected, Disclosed, Sold, and/or Shared"
section is a 3-column table (Category / Disclosed-to for a business purpose /
Sold-or-shared-to), 18 category rows, driven by `PI_TABLE_ROWS` in `_data.ts`.
On desktop it renders as a table in a horizontally scrollable wrapper
(`.tableWrap`); under 768px it collapses to stacked cards (one per category,
column names shown per cell via `data-label`). Content verified against the
Markdown export of the source doc. Two rows have `N/A` in the sold/shared column
(financial account credentials; contents of mail/email/text).

## Open Items (legal / non-code)
- **Button labels now match** the live banner ("Save my preferences" /
  "Reject Optional Cookies"). Two small mismatches remain in the source doc:
  the category is written "Personalize Maketing" (typo for "Marketing") and the
  live CookieYes category is currently "Advertising and Marketing" — rename the
  banner category and/or fix the doc typo so they line up. Rendered verbatim from
  the doc per request.
- **Terms / Privacy / HIPAA content updates** are Contentful (CMS) work, not part
  of this page. (The HIPAA Notice V26.2 is separate content for `/hipaa`.)
