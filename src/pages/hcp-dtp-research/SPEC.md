# /hcp-dtp-research Page Spec — MRTG-1462

Gated landing page for "The DTP Bridge", PHIL's April 2026 survey of 207 U.S. healthcare providers. It replaces the Contentful page `/hcp-research/`. Design: `HCP DTP Report.dc.html`. Shared layout, behaviours and the deviation log: `src/components/ResearchReport/SPEC.md`.

## Route
`/hcp-dtp-research/`, file-based: `src/pages/hcp-dtp-research/index.tsx`. The old `/hcp-research` and `/hcp-research/` return a forced 301 to it (`netlify.toml`). The Contentful page "hcp-research" still exists, so `handleRegularPage` in `GenerateMainPages.ts` skips that slug; without the guard it would be rebuilt over the redirect. `REMOVED_PAGE_REDIRECTS` in `getLink.ts` sends Contentful links to the old slug here. Do not remove either.

## SEO and AI search
- **Title** (60 chars): The DTP Bridge: HCP Direct-to-Patient Research Report | PHIL
- **Description** (153 chars): PHIL surveyed 207 U.S. healthcare providers: 1 in 2 lack confidence patients can navigate out-of-pocket costs. Get the 2026 HCP direct-to-patient report.
- Neither is in the design; both were written for this page and need marketing's review.
- Canonical `/hcp-dtp-research/` (the design's canonical was the old `/hcp-research/` URL), `og:type` article, default social image. Indexed and in the sitemap; only the PDF stays out of search.
- **JSON-LD:** a `FAQPage` (the design's) built from the four questions in `_data.ts`. No publication date is declared: none was given.
- Headings: one h1; h2 for Overview, the CTA band and FAQs; h3 for each finding.
- `static/llms.txt` lists the report.

## Sections (copy verbatim from the design, kept in `_data.ts`)
1. **Hero:** pill "2026 HCP Research Report"; h1 "The *DTP Bridge:*" / "Integrating HCP Perspectives into Digital Access Programs"; intro; a "Download Report →" button shown only at 820px and narrower. The hero uses the blue-teal gradient of this design.
2. **Stats card:** 1 in 2 / 70% / #1.
3. **Overview:** "HCPs Are Ready to Prescribe Through Digital Channels. *Is Your Access Program Built to Earn Their Trust?*" and a paragraph.
4. **What's Inside:** two numbered rows: Patient Affordability is the #1 Priority, Utilization Management Support Drives Adoption.
5. **Quote:** Lirys Crawford, VP HCP Engagement (`QuoteSolo`; one quote, no carousel).
6. **CTA band:** "See What's Possible" / "Ready to Build a Best-in-Class Access Program?" / "Book Demo →" to `/demo/`.
7. **FAQs:** four native `<details>` accordions, the first open; the last answer links to the form.
- **Form card:** "Get the full report", the HubSpot form, the privacy line.

## Form and gated download
- HubSpot embed: portal `20880193`, form `c640ef90-48f7-4d85-9fad-ca740848302b` (the design's), HubSpot's own CSS off.
- Report ID `hcp-dtp-research`; the file is released as described in the shared SPEC.
- The confirmation says "The report has opened in a new tab." (the design's wording; this design does not name the report).
- **Where the PDF lives:** the HubSpot file "DTP HCP Research Report - UPDATED OCTOBER 2026.pdf" (from the ticket), set to **Public - noindex**. Its URL is in the Netlify variable `HCP_DTP_REPORT_URL`, never in this repo.

## Placements on other pages (links repointed from the old URL)
Home insights strip (`pages/home/_data.ts`), `/approach/` barrier link (`pages/approach/_data.ts`), `/solution/direct/` Research and Thought Leadership strips, `/resources/` featured card and grid row, `static/llms.txt`, `MARKUP-CONTEXT.md`. The HCP card is not in the Resources nav menu. Card titles are unchanged: only the links moved.

## Assets
`assets/lirys-crawford.webp`: the speaker photo, scaled to 120px from the design's 800px original. The PDF is **not** in the repo.

## Testing (Jest)
- `__tests__/api/downloadReport.test.ts`: a valid `hcp-dtp-research` token redirects to `HCP_DTP_REPORT_URL`, never to another report's file; a missing variable answers 500.
- The redirect, guard, remap and link-audit tests listed in `src/pages/patient-dtp-research/SPEC.md` cover this page too.
- Not testable in Jest (presentational, CSS modules): the page. Check it on the Netlify deploy preview.

## Outside the code, before launch
- HubSpot: set the HCP PDF to **Public - noindex**. Check the form `c640ef90-...` is the one marketing wants.
- Netlify: add `HCP_DTP_REPORT_URL` with the **Builds** scope, for Production and Deploy Previews, then redeploy.
- Local testing of the download: add `HCP_DTP_REPORT_URL` to `.env.development`.
- The old Contentful PDF for `/hcp-research/` stays public until marketing unpublishes that asset in Contentful.
- Go-live: merge on 11/4.
