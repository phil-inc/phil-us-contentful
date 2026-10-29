# ResearchReport — shared layout for gated research report pages (MRTG-1462)

The layout behind `/patient-dtp-research/` and `/hcp-dtp-research/`. Each page passes its copy, its colours and its
HubSpot form; everything else is here. `/pharma-dtp-research/` (MRTG-1461) was built first and is **not** on this module:
its page-local copy is untouched. This module started as a copy of that page's components and stylesheet, then took the
two newer designs ("Patient DTP Report.dc.html", "HCP DTP Report.dc.html").

## Components
| File | What it is |
|---|---|
| `ResearchReportPage.tsx` | The page: site `Layout`, page effects, hero, stats card, overview, findings, a quote slot, CTA band, FAQs, sticky form card. Props are all copy and the theme (`"patient"` or `"hcp"`). Every `#download` link scrolls to the form (below the sticky header), makes it glow for 2s and focuses its first field |
| `StatsCard.tsx` | The hero card cycling through three findings every 4s, with progress bars, previous/next buttons and swipe/drag. All findings are in the HTML; one is visible |
| `KeyFindings.tsx` | The numbered "What's Inside" rows; the row nearest the middle of the screen has its number highlighted |
| `Quotes.tsx` | `QuoteSolo` (one quote, as on the HCP page) and `QuoteCarousel` (several, as on the patient page: auto-advance every 8s, pause while a mouse is over the quote, swipe, dots, arrows; every quote is in the HTML) |
| `ReportForm.tsx` | The HubSpot form and the gated download (below) |
| `researchReport.module.css` | All styles. Per-page colours are variables set by `.themePatient` / `.themeHcp` |
| `types.ts` | The props' shapes |

## Themes
The only things that differ in look: the hero gradient and its two glows, the gradient on the stats numbers, the third background bloom, and the size of the first title line (`--rr-*` variables on `.page`). The values are the designs'.

## Form and gated download
Same behaviour as `/pharma-dtp-research/`:
- **On submit** (HubSpot's `onFormSubmit`, still inside the visitor's click) the page opens a blank tab and asks `/api/issue-download-token` for a token for the report's ID (`FormConfig.reportId`).
- **The report is released only after HubSpot confirms** (`onFormSubmitted`) and the token has arrived: the waiting tab then goes to `/api/download-report/<id>/<token>`, which redirects to the file. If HubSpot has not confirmed within 20s, or the token request fails, the tab is closed and no PDF is delivered.
- **Confirmation panel:** "Your report is ready." with an "Open Report →" button; the text says the report "has opened in a new tab" only when it did. The button opens it again (asking for a fresh token if the last is older than 9 minutes).
- **Remembered until the tab closes:** `sessionStorage` key `researchReportFormSubmitted_<reportId>`, the same pattern as the other research pages.
- **The email field** reads "Business Email" (label and placeholder), as in the designs. HubSpot's own label is replaced in `onFormReady`, which `HubspotFormV2` now passes through (see below).
- **Where each PDF lives:** a HubSpot file set to **Public - noindex**. Its URL is kept only in a Netlify environment variable read by `src/utils/gatedReports.ts` (`PATIENT_DTP_REPORT_URL`, `HCP_DTP_REPORT_URL`), never in this repo, which is public on GitHub. The variable must be a literal `process.env.NAME` there and must be available to Netlify **builds**; changing it takes a new deploy.
- **Protection level:** the same as the pharma report: casual visitors must use the form, nothing crawlable links to the PDF, the file is noindex. A technical visitor can still get the file without the form, and anyone who downloads it can share the link.

## Shared code this changed
- `components/common/HubspotForm/HubspotFormV2.tsx`: new optional `onFormReady` prop (HubSpot's own embed option, passed through only when given). Existing callers pass nothing and are unaffected.
- `src/@types/svg.d.ts`: `*.webp` module declaration, for the quote photos.

## Deviation log
Applies to both pages. Page-specific differences are in each page's `SPEC.md`.

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Content width | `max(1320px, 82.5vw)`, side padding from 16px | `xl-container` (1320px, 1600px from 1680px wide; 32px sides) | Repo convention for page width |
| Heading levels | h1, then h3 for Overview and FAQs, h2 for the CTA; findings are divs | h1; h2 for Overview, CTA and FAQs; h3 for findings | One h1, no skipped levels |
| First title line on phones | `calc(clamp(26px, 6.6cqi, 200px) + 10px)` (HCP: `clamp(28px, 6.2cqi, 180px)`), no wrap | Same, capped at `9cqi` | At 375px wide the design's size runs off the screen. The pharma page's first line was later made 5% smaller after review; these pages follow their designs, so expect the same comment |
| Background blooms | `position: fixed` | Sticky inside the page, clipped to it | A fixed layer painted over the site footer |
| Links | `https://phil.us/demo` | `/demo/` | Internal links are relative |
| Sticky form offset | `top: 24px` | Below the site header + 24px | The site header is sticky |
| Scroll-progress bar | Always on | Only in browsers that support scroll-driven animation | Elsewhere it would show as a full, static bar |
| Stats card and quote carousel | Auto-advance always | Stats card pauses while a mouse hovers it; neither advances for visitors who ask for reduced motion | Accessibility (moving content needs a way to stop) |
| After submit | PDF opens immediately on submit | PDF opens once HubSpot confirms the submission | No report without a saved lead |
| PDF link | `assets/DTP-Pharma-Research-Report.pdf` (a placeholder) | Token link through `/api/download-report/` to a HubSpot file | Gating |
| Mobile "Download Report" button | Shown by a JS `matchMedia` | CSS media query at 820px | No layout flash |
| Motion | Always on | Blooms, shine and transitions off for visitors who ask for reduced motion | Accessibility |
| Styling | Inline styles | CSS modules | AGENTS.md §5 |
| Quote photos | Raw 0.9 to 4.9 MB images | 120px square WebP (about 3 KB each), shown at 60px | Page weight; the originals were already square, so the design's `object-position` has no effect |
| Structured data | A hand-written FAQPage | The same four questions and answers, written once in `_data.ts` and emitted with `faqPageSchema` | The page and its markup cannot drift |
| Canonical | `https://phil.us/<path>/` in a `<helmet>` | `SeoMeta` (canonical and `og:url` from the same value) | Repo convention. The HCP design's canonical was the old `/hcp-research/` URL; the ticket's new URL is used |
| Title and description | not in the design | written for each page (59 to 60 and 153 characters) | A page needs them; marketing should review the wording |
| "Use the button below to open ..." | not in the design | shown when the report could not open itself | Truthful confirmation when pop-ups are blocked |
