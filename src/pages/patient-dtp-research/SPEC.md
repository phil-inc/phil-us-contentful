# /patient-dtp-research Page Spec — MRTG-1462

Gated landing page for "The DTP Imperative", PHIL's March 2026 survey of 1,049 U.S. patients. It replaces the Contentful page `/dtp-research/`. Design: `Patient DTP Report.dc.html`. Shared layout, behaviours and the deviation log: `src/components/ResearchReport/SPEC.md`.

## Route
`/patient-dtp-research/`, file-based: `src/pages/patient-dtp-research/index.tsx`. The old `/dtp-research` and `/dtp-research/` return a forced 301 to it (`netlify.toml`). The Contentful page "dtp-research" still exists, so `handleRegularPage` in `GenerateMainPages.ts` skips that slug; without the guard it would be rebuilt over the redirect. `REMOVED_PAGE_REDIRECTS` in `getLink.ts` sends Contentful links to the old slug here. Do not remove either.

## SEO and AI search
- **Title** (59 chars): The DTP Imperative: Patient Direct-to-Patient Report | PHIL
- **Description** (153 chars): PHIL surveyed 1,049 U.S. patients: 96% want price transparency before committing to a medication. Get the 2026 patient direct-to-patient research report.
- Neither is in the design; both were written for this page and need marketing's review.
- Canonical `/patient-dtp-research/`, `og:type` article, default social image. Indexed and in the sitemap; only the PDF stays out of search.
- **JSON-LD:** a `FAQPage` (the design's) built from the four questions in `_data.ts`. No publication date is declared: none was given.
- Headings: one h1; h2 for Overview, the CTA band and FAQs; h3 for each finding.
- `static/llms.txt` lists the report.

## Sections (copy verbatim from the design, kept in `_data.ts`)
1. **Hero:** pill "2026 Patient Research Report"; h1 "The *DTP Imperative:*" / "Building Direct-to-Patient Programs That Exceed Patient Expectations"; intro; a "Download Report →" button shown only at 820px and narrower.
2. **Stats card:** 1 in 3 / 96% / 95%.
3. **Overview:** "Patient Expectations Have Changed. *This Research Reveals What Patients Want from Pharma's Direct-to-Patient Programs.*" and a paragraph.
4. **What's Inside:** three numbered rows: The Awareness-to-Access Gap, The Pricing Imperative, High Standards for Experience.
5. **Quote carousel:** Deepak Thomas, Sahil Naik, Allison Bridges, Chander Viswanathan (`QuoteCarousel`; photos in `assets/`).
6. **CTA band:** "See What's Possible" / "Ready to Build a Best-in-Class DTP Program?" / "Book Demo →" to `/demo/`.
7. **FAQs:** four native `<details>` accordions, the first open; the last answer links to the form.
- **Form card:** "Get the full report", the HubSpot form, the privacy line.

## Form and gated download
- HubSpot embed: portal `20880193`, form `8dcb0178-552c-446b-8fe6-08e4fc48c33d` (the design's), HubSpot's own CSS off.
- Report ID `patient-dtp-research`; the file is released as described in the shared SPEC.
- **Where the PDF lives:** the HubSpot file "DTP Patient Research Report - UPDATED OCTOBER 2026.pdf" (from the ticket), set to **Public - noindex**. Its URL is in the Netlify variable `PATIENT_DTP_REPORT_URL`, never in this repo.

## Placements on other pages (links repointed from the old URL)
Resources nav menu card (`MegaNav.tsx`), Home insights strip (`pages/home/_data.ts`), `/approach/` barrier links (`pages/approach/_data.ts`), `/solution/direct/` Research and Thought Leadership strips, `/resources/` featured card and grid row, `static/llms.txt`, `MARKUP-CONTEXT.md`. Card titles are unchanged: only the links moved.

## Assets
`assets/*.webp`: the four speaker photos, cropped to a square and scaled to 120px from the design's 2 to 5 MB originals. The PDF is **not** in the repo.

## Testing (Jest)
- `__tests__/api/downloadReport.test.ts`: a valid `patient-dtp-research` token redirects to `PATIENT_DTP_REPORT_URL`, never to another report's file; a missing variable answers 500.
- `__tests__/redirects/researchReportRedirects.test.ts`, `__tests__/strategies/generateMainPagesResearchGuards.test.ts`, `__tests__/utils/getLinkSolutionRemap.test.ts`, `__tests__/links/researchReportLinkIntegrity.test.ts`: the redirects, the guard, the remap and a source audit for the old path.
- Not testable in Jest (presentational, CSS modules): the page. Check it on the Netlify deploy preview.

## Outside the code, before launch
- HubSpot: set the patient PDF to **Public - noindex**. Check the form `8dcb0178-...` is the one marketing wants.
- Netlify: add `PATIENT_DTP_REPORT_URL` with the **Builds** scope, for Production and Deploy Previews, then redeploy. `DOWNLOAD_TOKEN_SECRET` already exists.
- Local testing of the download: add `DOWNLOAD_TOKEN_SECRET` and `PATIENT_DTP_REPORT_URL` to `.env.development`.
- The old Contentful PDF for `/dtp-research/` stays public until marketing unpublishes that asset in Contentful.
- Go-live: merge on 11/4 (the site is static, so the merge is the release).
