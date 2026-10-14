# /pharma-dtp-research Page Spec — MRTG-1461

Gated research report "The DTP Breakthrough", plus links to it from five places on the site. Launch: **9am ET, Monday October 20, 2026**. The site is static, so merging to `main` is the go-live.

Design sources: `Manufacturer DTP Report.dc.html` (page), `PHIL Header Banner.html`, `PHIL Navigation Menu.html`, `PHIL Home Page.html`, `PHIL DTP Page.html`, `PHIL Resource Hub.html`.

## Route
`/pharma-dtp-research/`, file-based: `src/pages/pharma-dtp-research/index.tsx`. The path returned 404 on phil.us on 2026-10-14 and no Contentful page uses the slug, so `handleRegularPage` needs no guard.

## SEO and AI search
- **Title** (60 chars): The DTP Breakthrough: Pharma Direct-to-Patient Report | PHIL
- **Description** (152 chars): PHIL surveyed 74 U.S. life sciences leaders: 3 in 4 call direct-to-patient (DTP) a mission-critical or very important priority. Get the 2026 DTP report.
- Canonical `/pharma-dtp-research/`, `og:type` article, default social image. The page is indexed and in the sitemap; only the PDF stays out of search.
- **Publication date** `2026-10-20T09:00:00-04:00` (`PUBLISHED_AT` in `_data.ts`): in `<meta property="article:published_time">` and in the JSON-LD only, **not shown on the page**. Update it if the launch moves.
- **JSON-LD:** a `WebPage` (with `datePublished`) whose `mainEntity` is a `Report` (`#report`): headline, description, `datePublished`, PHIL as author and publisher, `about`, `keywords`, and an `abstract` that states the three headline numbers with their source and date.
- Headings: one h1; h2 for Overview, the CTA band and FAQs; h3 for each key finding.
- `static/llms.txt` lists the report next to the other two.

## Layout
Shared Layout (header + footer). Two columns: content on the left, the form card on the right, sticky below the site header. The columns stack when the content column can't fit beside the form; the form then sits at the bottom of the page.

## Sections (top to bottom, copy verbatim from the design, kept in `_data.ts`)
1. **Hero** — pill "2026 Industry Research Report"; h1 "The *DTP Breakthrough:*" / "A Deep Dive on Pharma's Direct-to-Patient Next Generation"; intro; a "Download Report →" button shown only at ≤820px. A full-width green gradient band sits behind the hero and ends halfway down the stats card.
2. **Stats card** (`_sections/StatsCard.tsx`) — three findings (3 in 4 / 70% / 89%), auto-advancing every 4s, with progress bars, previous/next buttons and swipe/drag. All three are in the HTML; only one is visible at a time.
3. **Overview** — heading and paragraph.
4. **Key findings** (`_sections/KeyFindings.tsx`) — three numbered rows; the row nearest the middle of the screen has its number highlighted.
5. **Perspective** (`_sections/Perspective.tsx`) — Deepak Thomas quote with photo; its three sentences light up as they scroll into view.
6. **CTA band** — "Accelerate DTP Success" / "Build The DTP Program that Lasts" / "Book Demo →" to `/demo/`.
7. **FAQs** — four native `<details>` accordions, the first open. The last answer links to the form.
- **Form card** (`_sections/ReportForm.tsx`) — "Get The Report", the HubSpot form, the privacy line. Every `#download` link scrolls to it (below the sticky header), makes it glow for 2s and focuses the first field.
- **Page effects** — slow background colour blooms and a thin scroll-progress bar at the top.

## Form and gated download
- HubSpot embed: portal `20880193`, form `8445e59d-c99c-4646-be0f-8831f50ae311`, HubSpot's own CSS off (`disableHubspotCss`), styled as in the design.
- **On submit** (HubSpot's `onFormSubmit`, still inside the visitor's click): the page opens a blank tab, asks `/api/issue-download-token` for a token for report `pharma-dtp-research`, and points the tab at `/api/download-report/pharma-dtp-research/<token>`, which redirects to the PDF.
- **After HubSpot confirms:** the card shows "Your report is ready." with an "Open Report →" button, the fallback if the browser blocked the tab. If the token is older than 9 minutes the button fetches a fresh one and opens the report in the same tab.
- No memory of the submission across reloads, as in the design.
- **Where the PDF lives:** a HubSpot file set to **Public - noindex**. Its URL is kept only in the Netlify environment variable `PHARMA_DTP_REPORT_URL`, never in this repo (public on GitHub) and never in page code or data.
- **Server:** `src/utils/gatedReports.ts` maps report IDs hosted outside Contentful to their environment variable. `src/api/download-report/[id]/[token].ts` checks that map before its Contentful lookup; if the variable is missing it answers 500. `/dtp-research/` and `/hcp-research/` are unchanged.
- **Protection level:** the same as `/dtp-research/`. Casual visitors must use the form, nothing crawlable links to the PDF, and the file is marked noindex. A technical visitor can still get the file without the form, and anyone who downloads it can share the link.

## Placements on other pages
| Where | Files | Change |
|---|---|---|
| Header banner (every page, including this one) | `layouts/Layout/MegaNav/megaNav.config.ts`, `MegaNav.tsx`, `megaNav.module.css` | NEW tag, "Exclusive research from 74 life sciences leaders reveals the future of DTP success", pill "Read report →" to `/pharma-dtp-research/`. Pastel gradient, one shine sweep 0.5s after load, underline + arrow nudge on hover. Still hidden on `/patients/` and `/faqs/`. |
| Nav "Resources" menu | `MegaNav.tsx`, `megaNav.module.css` | Feature cards: new "Pharma Perspectives on Direct-to-Patient: The Future of DTP Success" (`pastel` variant, `isNew`), then Patient Perspectives. The HCP card left the menu. The mobile menu shows no feature cards and is unchanged. |
| Home page | `pages/home/_data.ts`, `pages/index.tsx`, `home.module.css` | "Our Commitment" cards: new card (`new` variant, NEW tag), Patient Perspectives, HCP Perspectives. "5 Key Success Factors" left this row. |
| DTP page (`/solution/direct/`) | `_sections/ThoughtLeadership.tsx`, `direct.css` | New first card in the "Our Proven Approach to DTP Success" marquee (`.bt-report-new`): NEW, "Research Report", "74 life sciences leaders surveyed", "Exclusive research reveals the future of DTP success.", "Read report →". The rest of the marquee is unchanged. |
| Resource hub | `pages/resources/index.tsx`, `resources.module.css`, `_data.ts` | Featured row: new card (`.pastel`, NEW tag), Patient Perspectives, HCP Perspectives. "5 Key Success Factors" left the featured row and stays in the grid. Grid: new first row, type Report, topic Direct-to-Patient, link `/pharma-dtp-research/`. `isInternal` now also accepts root-relative paths. |
| Routing map | `MARKUP-CONTEXT.md` | New page, banner, nav, home, DTP and hub cards. |

## Components
- **New, page-local** (`_sections/`): `StatsCard`, `KeyFindings`, `Perspective`, `ReportForm`, and the `useScrollMeasure` hook they share. Page styles: `pharmaDtpResearch.module.css`.
- **Reused:** `Layout`, `SeoMeta`, `JsonLd`, `HubspotFormV2`, `articleSchema` / `webPageSchema`.
- **Modified shared:** `HubspotFormV2` takes two optional props, `onFormSubmit` (pre-submit callback) and `disableHubspotCss`. Existing callers pass neither and are unaffected. `articleSchema` accepts `type: "Report"`.
- **New shared:** `components/common/NewBadge`, the "NEW" tag used by the banner, nav, home, DTP page and resource hub.

## Assets
- `assets/deepak-thomas.png`, scaled from the design's 2329px original to 480px, rendered with `StaticImage` at 60px.
- `p-dots-light.png` is the existing `src/assets/images/` file (identical to the design's).
- The PDF is **not** in the repo.

## Testing (Jest)
- `__tests__/api/downloadReport.test.ts`: a valid `pharma-dtp-research` token redirects to `PHARMA_DTP_REPORT_URL` with `noindex`; a missing variable answers 500; a Contentful asset ID and `constructor` still go to the Contentful lookup.
- `__tests__/pages/resourcesData.test.ts`: the hub row is present once, well formed, with filter keys the page knows.
- `__tests__/utils/seoSchema.test.ts`: `articleSchema` emits `Report`.
- Not testable in Jest (presentational, CSS modules): the page, banner, nav and cards. Checked on the dev server; to be checked again on the Netlify deploy preview.

## Deviation log
| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Content width | `max(1320px, 82.5vw)`, side padding from 16px | `xl-container` (1320px, 1600px from 1680px wide; 32px sides) | Repo convention for page width |
| Heading levels | h1, then h3 for Overview and FAQs, h2 for the CTA; findings are divs | h1; h2 for Overview, CTA and FAQs; h3 for findings | One h1, no skipped levels, clearer outline for search and AI readers |
| H1 first line on phones | `calc(clamp(26px, 6.6cqi, 200px) + 8px)`, no wrap | Same, capped at `9cqi` | At 375px wide the design's size ran off the screen |
| Background blooms | `position: fixed` | Sticky inside the page, clipped to it | A fixed layer painted over the site footer |
| Links | `https://phil.us/...` | Relative paths | Internal links are relative |
| Sticky form offset | `top: 24px` | Below the site header + 24px | The site header is sticky |
| Scroll-progress bar | Always on | Only in browsers that support scroll-driven animation | Elsewhere it would show as a full, static bar |
| Stats card | Always auto-advances | Pauses while hovered; no auto-advance with reduced motion | Accessibility (moving content needs a way to stop) |
| Motion | Always on | Blooms, shine and transitions off for visitors who ask for reduced motion | Accessibility |
| Styling | Inline styles | CSS modules | AGENTS.md §5 |
| Quote photo | Raw 1.8 MB `<img>` | `StaticImage` from a 480px source | Page weight |
| PDF link | `assets/DTP-Pharma-Research-Report.pdf` | Token link through `/api/download-report/` | Gating |
| Header banner on phones | Only a 1280px preview; the flex row stacks into three rows (115px) at 375px | Below 640px the tag, text and link flow as one paragraph (78px); 13px text below 1280px as before | Keeps the sticky header short on phones |
| Nav feature card size | 328px tall, 20px radius | The nav's existing card size (360px, 16px) | Matches the other cards in the same menu |
| DTP marquee start | Holds 2.5s, then scrolls from the new card centred | The existing marquee script, which starts on the first card | Marquee behaviour unchanged for the other cards |

## Outside the code, before launch
- HubSpot: set the file to **Public - noindex**, optionally re-uploaded under a random name.
- Netlify: add `PHARMA_DTP_REPORT_URL` (production and deploy previews). `DOWNLOAD_TOKEN_SECRET` already exists there.
- Local testing of the download: add `DOWNLOAD_TOKEN_SECRET` and `PHARMA_DTP_REPORT_URL` to `.env.development`.
- Go-live: merge shortly before 9am ET on October 20, or pause Netlify auto-publishing and publish the ready deploy at 9:00.
