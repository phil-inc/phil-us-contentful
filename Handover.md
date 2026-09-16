# Handover

## 2026-09-16 — feat/structured-schema
Done: Reviewed MRTG-1423 ticket and the 3 branch commits (sitewide Organization @id, Article dates, canonical trailing slashes). No code changes made. Jest: 176/176 pass. tsc reported no errors in touched files. Gatsby build not run (needs Contentful creds).
Left: AC not yet met: FAQPage on /faqs/ (Head has no JSON-LD), Service schema on /solution/hub/ and /solution/direct/ (still WebPage), and Rich Results validation. /solution/ now redirects to /solution/hub/ (netlify.toml:221-229), so that AC is stale.
Bugs/debt: The Organization @id is only referenced from /press/ and /resources/. Blog, case-study and about 16 static pages still inline `publisher: {"@type":"Organization"}` without @id, which is the duplicate-node problem the new comments describe.
Files: none touched (review only)
Next: Switch the inline publishers to `{ "@id": "https://phil.us/#organization" }`, then add FAQPage and Service schema.

## 2026-09-16 — feat/structured-schema (codebase-wide SEO review)
Done: Audited every Head export (33 files) plus the Sep 14 build in public/ (326 HTML pages). No code changes made.
Left: Findings not yet acted on. (1) The blog, case-study, resources, contact, downloadable-resource and event-registration templates have no canonical tag, and career.tsx only renders one when domain !== "phil.us", so it never appears in the built HTML. (2) The sitemap lists noindex pages (/field/*, /demo/schedule/, /demo/thank-you/). (3) Pages with no JSON-LD: /faqs/, /pharma/, /approach/, plus the event, downloadable and contact templates. (4) 11 pages have an empty meta description, and case-study Article emits "description": "".
Bugs/debt: About 20 hand-copied Head blocks with ~15 meta tags each, which is how canonical tags went missing. FAQ content is reused on /patients/, /providers/ and /pharma/, so FAQPage markup belongs only on /faqs/.
Files: none touched (review only)
Next: Add a shared src/utils/seo module (SITE_URL, ORG_ID, toAbsoluteUrl, schema builders, JsonLd and SeoMeta components), then migrate templates onto it.

## 2026-09-16 — feat/structured-schema (step 1a: shared SEO constants and URL helper)
Done: Added src/utils/seo/constants.ts (SITE_URL, ORGANIZATION_ID, WEBSITE_ID) and src/utils/seo/url.ts (toAbsoluteUrl, moved out of Head.tsx). Head.tsx, gatsby-ssr.tsx, press and resources now import them. Tests written first and confirmed failing; Jest now 184/184 pass (8 new). tsc shows only 3 pre-existing missing @types errors (dompurify, mixpanel-browser, react-pdf). ESLint cannot parse any TS file in the repo (the same error on untouched src/utils/getTitle.ts), so lint is unverified. Gatsby build not run. Nothing committed; approved step by step by the user.
Left: Step 1b (schema builders), 1c (SeoMeta and JsonLd components), 1d (migrate pages, including the ~18 inline Organization publishers). Then step 2 (FAQPage and Service).
Bugs/debt: The repo's ESLint config is broken for TypeScript (pre-existing). llmsFull.ts keeps its own SITE_ORIGIN copy on purpose, since it belongs to MRTG-1425.
Files: src/utils/seo/constants.ts, src/utils/seo/url.ts, src/__tests__/utils/seoUrl.test.ts, src/components/common/Head/Head.tsx, gatsby-ssr.tsx, src/pages/press/index.tsx, src/pages/resources/index.tsx
Next: Explain 1b to the user and wait for approval before writing code.

## 2026-09-16 — feat/structured-schema (step 1b: schema builders)
Done: Added src/utils/seo/schema.ts with organizationSchema, webSiteSchema, webPageSchema (WebPage, CollectionPage, ContactPage) and articleSchema (Article, BlogPosting). Rules built in: company and website always referenced by @id, URLs via toAbsoluteUrl, blank or null values omitted, dateModified only when datePublished exists. gatsby-ssr.tsx now calls organizationSchema(); a script compared the output with the Sep 14 public/index.html and it is byte-identical. Tests written first and confirmed failing; Jest 199/199 pass (15 new).
Left: 1c (SeoMeta and JsonLd components), 1d (migrate pages and emit the WebSite node sitewide).
Bugs/debt: gatsby-ssr.tsx is NOT in tsconfig "include", so `tsc -p .` never type-checks it. Reading the diff caught an import/local name clash there (renamed the local element to organizationSchemaScript). Consider adding gatsby-ssr.tsx and gatsby-browser to the include list (not done; out of scope).
Files: src/utils/seo/schema.ts, src/__tests__/utils/seoSchema.test.ts, gatsby-ssr.tsx
Next: Explain 1c to the user and wait for approval.

## 2026-09-16 — feat/structured-schema (date data check, commit f2dd9c7)
Done: Pulled real dates from Contentful master (production, per netlify.toml:26) through the read-only Delivery API. Case studies: 5 entries, 4 indexable, all createdAt 2025-05-21 or 2025-05-22, and 3 share updatedAt 2026-06-17, so the case-study.tsx comment saying dates are "spread across authoring dates" is false. Blog/static resources: 163 indexable, only 2 have publishDate (two 2023 press releases). createdAt clusters on 2022-10-21 (55 entries) and 2023-02-22 (59) confirm a migration. The 2 dated press releases have updatedAt 30 seconds apart on 2026-04-22 (a bulk touch). Neither template shows a date on the page.
Left: Awaiting the user's decision: remove case-study dates, and possibly dateModified. 1c is still pending approval.
Bugs/debt: The blog date code is correct but only affects 2 pages until editors fill in publishDate.
Files: none (analysis only; scripts in the session scratchpad)
Next: Get the user's decision on dates, then 1c.

## 2026-09-16 — feat/structured-schema (date removal, user-approved)
Done: Case-study Article no longer sends datePublished or dateModified; createdAt and updatedAt removed from its single-entry query and from the CaseStudy type. Blog Article keeps datePublished from publishDate but no longer sends dateModified; updatedAt removed from the query and TResource (resource.ts is now identical to main). The articleSchema recipe dropped its dateModified input: the test "never emits dateModified" failed first, then passed. Jest 200/200; tsc shows no new errors. The featured-items sort by createdAt in case-study.tsx (already on main, not SEO) is untouched.
Left: 1c (SeoMeta and JsonLd components) awaiting approval. Content-team asks: fill publishDate on blogs, add publishDate to case studies, show dates on the page.
Bugs/debt: none new.
Files: src/templates/case-study.tsx, src/templates/blog.tsx, src/types/resource.ts, src/utils/seo/schema.ts, src/__tests__/utils/seoSchema.test.ts
Next: Get the user's approval for 1c.

## 2026-09-16 — feat/structured-schema (step 1c: SeoMeta and JsonLd components)
Done: Added src/components/common/Seo/SeoMeta.tsx (title, description, canonical, og:*, twitter:*, robots; blank description omits the 3 description tags; noindex adds robots and drops canonical, the user-approved default) and JsonLd.tsx (one script per node, escaping <, >, &, U+2028 and U+2029). Tests first (failed on missing module), then 15/15 pass. A mutation check confirmed the separator test fails without the escaping. Full Jest 215/215; tsc shows no new errors. New files use relative imports because Jest has no alias mapping.
Finding: Gatsby's Head SSR handler (gatsby/cache-dir/head/head-export-handler-for-ssr.js:83-90) re-parses head HTML and writes script bodies from entity-decoded text. A simulation confirmed the CURRENT pattern `<script type="application/ld+json">{JSON.stringify(x)}</script>` outputs a raw `</script>` when content contains one. That corrects my earlier claim that the pattern was safe. JsonLd output survives the same pipeline with JSON intact.
Left: 1d (migrate pages). Nothing uses the components yet.
Bugs/debt: git status shows earlier changes as staged (A/M in the index). I ran no git add; the user or tooling staged them.
Files: src/components/common/Seo/SeoMeta.tsx, src/components/common/Seo/JsonLd.tsx, src/__tests__/components/seo.test.tsx
Next: Explain 1d batch 1 (press, resources, blog, case-study, plus the WebSite node) and wait for approval.

## 2026-09-16 — feat/structured-schema (step 1d batch 1: first pages on SeoMeta/JsonLd)
Done: gatsby-ssr.tsx emits Organization and WebSite through JsonLd. /press/ and /resources/ use SeoMeta plus webPageSchema(CollectionPage). The blog and case-study templates use SeoMeta plus articleSchema, which gives them a canonical tag (only when indexable) and drops empty description tags; they no longer import layouts/SEO/SEO. Blog stays "Article", NOT "BlogPosting" as proposed, because the template also renders press releases, webinars and /field/ FAQ entries. Jest 215/215.
CORRECTION: `npx tsc --noEmit -p .` stops at the 3 TS2688 errors (empty stub packages @types/dompurify, @types/mixpanel-browser, @types/react-pdf) and checks NO files; a deliberate-error probe went unreported. Every earlier "tsc: no errors in touched files" entry above is invalid. The working command is `npx tsc --noEmit -p . --types node,jest,react,react-dom` (probe reported). It shows 406 errors repo-wide, none in the new SEO files or in the Head sections of blog/case-study. The case-study.tsx sort error (`b.createdAt` on TDownloadableResource | CaseStudy) is pre-existing: main has the same code and types.
Left: Gatsby build not run. Batch 2 (~14 static pages with inline Organization), Head.tsx template, then step 2 (FAQPage and Service).
Bugs/debt: Type check effectively disabled repo-wide by the stub @types packages (406 hidden errors). The staged state from earlier was unstaged by someone else; nothing committed.
Files: gatsby-ssr.tsx, src/pages/press/index.tsx, src/pages/resources/index.tsx, src/templates/blog.tsx, src/templates/case-study.tsx
Next: Ask the user whether to run `npm run build` (runs gatsby clean, rewrites public/ and .cache; .env.production points at a non-master Contentful environment), then batch 2.

## 2026-09-16 — build-fix (verified the user's build of batch 1)
Done: The user built on branch build-fix (commit 0ffd99b = the SEO work, plus 10567a5 = the Node 20 / jsdom externals build fix). I scanned public/ (built 17:08, 326 index.html pages, read-only). All JSON-LD parses; no raw U+2028/2029; exactly 1 Organization and 1 WebSite node per page; no duplicate canonicals; no empty content="" meta; canonical always equals og:url. Blog template: 224 pages, 159 canonical, 65 noindex, 0 with neither. Case-study template: 5 pages, 4 canonical, 1 noindex. All 229 Articles use publisher @id; none has dateModified.
Left: 62 indexable pages still lack a canonical, all outside batch 1: resources listing template 27, downloadable-resource 21, event-registration 7, plus 404, addyi, careers, channel-comparision, gtn, insights/search, leadership. /field/ (Head.tsx) has noindex AND canonical; main has the same Head.tsx code, so it is pre-existing. The home page WebPage still inlines publisher (batch 2).
Bugs/debt: Only 2 of 229 Articles have datePublished, which matches production Contentful (see the date data check entry): editors have not filled publishDate. Commit 0ffd99b includes Handover.md, and its message claims "33+ template files", which overstates the 4 migrated pages.
Files: none in repo (scan script in scratchpad)
Next: Batch 2 (standalone pages with inline Organization, plus Head.tsx), after the user approves.

## 2026-09-16 — feat/structured-schema (step 1d batch 2: static pages + Head.tsx)
Done: Moved 12 static pages (home, contact, contact/hcp-support, contact/get-in-touch, hipaa, demo, patients, providers, privacy, annex, customer-success, terms) and components/common/Head/Head.tsx (used by the page, roi and demo-book templates) onto SeoMeta + JsonLd + webPageSchema. Page URL constants became paths (HIPAA_PATH etc., including in the hipaa/demo/annex/terms/privacy _data files; home SEO.url -> SEO.path). HCP_URL is kept, derived via toAbsoluteUrl, because HubSpot's pageUri uses it. Type stays WebPage (ContactPage not applied; scope). Only solution/hub and solution/direct still inline Organization (step 2).
Verified: Jest 215/215. tsc (--types node,jest,react,react-dom) total 406, unchanged; errors in these files are outside Head code. A scratchpad harness (renderHeads.js) rendered every migrated Head from HEAD and the working tree and diffed the tags. All 12 pages have identical meta/link/title tags; JSON-LD changes only publisher (inline -> @id) and adds isPartOf. Head.tsx: noindex now drops the canonical (fixes /field/), and a blank description drops the 3 empty description tags and the "" in JSON-LD. The harness gave false results twice (it stubbed page modules, then ./url) before it was fixed; the final run is the one to trust.
Left: Gatsby build of batch 2 not run. Step 2 (FAQPage on /faqs/, Service on solution hub/direct, which also removes the last inline Organization). Canonicals for the resources, downloadable-resource, event-registration, career and contact templates (separate ticket).
Bugs/debt: Nothing committed. ESLint still broken repo-wide.
Files: src/components/common/Head/Head.tsx, src/pages/{index,contact/index,contact/hcp-support/index,contact/get-in-touch/index,hipaa/index,demo/index,patients/index,providers/index,privacy/index,annex/index,customer-success/index,terms/index}.tsx, src/pages/{hipaa,demo,annex,terms,privacy,home}/_data.ts
Next: The user runs a build; rerun scratchpad check.js on public/ and expect /field/ without canonical and noCanonical still 62.

## 2026-09-16 — feat/structured-schema (demo post-submit pages out of sitemap)
Done: gatsby-config.ts sitemap `excludes` now includes /demo/thank-you and /demo/schedule. Running gatsby-plugin-sitemap's own defaultFilterPages + minimatch against the edited config: /demo/thank-you/ and /demo/schedule/ are excluded; /demo/ and /demo/thank-you-extra/ are kept.
Left: The user chose sitemap-only. robots.txt AI-crawler blocks and the X-Robots-Tag header were proposed and declined; do not add them. Both pages already had noindex, follow, and llms-full.txt already skips noindex pages. Build not run, so the sitemap XML itself is unverified.
Bugs/debt: The other noindex pages (/field/* entries) are still in the sitemap; see the separate "Exclude noindex pages from sitemap" task.
Files: gatsby-config.ts
Next: The user builds; check public/sitemap-0.xml has no /demo/thank-you/ or /demo/schedule/, then run the batch 2 head check.

## 2026-09-16 — feat/structured-schema (step 2: FAQPage and Service)
Done: schema.ts gains faqPageSchema (FAQPage replaces the page's WebPage node; answers flattened by the new utils/seo/htmlToText.ts), serviceSchema (@id `<page url>#service`, provider = organization @id), and webPageSchema `mainEntity` (referenced by @id). /faqs/ moved to SeoMeta + FAQPage with all 32 questions in page order (FAQ_URL -> FAQ_PATH). /solution/hub/ and /solution/direct/ moved to SeoMeta + [WebPage -> mainEntity, Service]; this removes the last inline Organization. FAQPage is only on /faqs/, not on patients/providers/pharma, which show subsets of the same questions. Service names "PHIL Digital Hub" / "PHIL Direct-to-Patient" come from the hero eyebrows. A BusinessAudience "Pharmaceutical brands" was added, then removed at the user's request: the wording was not from the page copy and Google does not use Service markup, so do not re-add it.
Verified: Jest 228/228 (new seoHtmlToText tests, including every real FAQ answer leaving no tags or entities; new schema tests; solutionHubLinks test updated from the hand-written CORE_URL strings to CORE_PATH). The first run failed 1 test (source line breaks inside a <p> became line breaks); fixed in htmlToText. tsc total 406, unchanged; the hub Trustpilot TS2717 is pre-existing. The scratchpad renderStep2.js rendered all 3 Heads from HEAD and the working tree: meta/link/title tags identical, JSON-LD differs only as intended.
Left: Gatsby build not run for step 2. Rich-result eligibility: Google shows FAQ rich results only for authoritative government/health sites, so the gain is mainly for machine readers; validate on the Rich Results Test after deploy.
Bugs/debt: Nothing committed. Answer text drops link URLs (link text is kept).
Files: src/utils/seo/schema.ts, src/utils/seo/htmlToText.ts, src/pages/faqs/{index.tsx,_data.ts}, src/pages/solution/{hub,direct}/index.tsx, src/__tests__/utils/{seoSchema,seoHtmlToText}.test.ts, src/__tests__/links/solutionHubLinks.test.ts
Next: The user builds; then step 3 (post-build check: extend check.js for FAQPage/Service and zero inline Organization).

## 2026-09-16 — feat/structured-schema (GTN calculator decision, sitemap exclusion)
Done: Step 3 on the user's build of 9bbb015 passed (check.js clean, step3.js 35/35). /gtn/calculator/ (Contentful "GTN" entry, slug `gtn`, moved by the GenerateMainPages override) has canonical https://phil.us/gtn/. The user decided this is intended: the calculator is meant to be reached only after the /gtn/ form. A Head.tsx change to location.pathname was tried and reverted; do not "fix" this canonical. gatsby-config.ts sitemap excludes now include /gtn/calculator. gatsby-plugin-sitemap's defaultFilterPages against the 322 URLs of the current build excludes /gtn/calculator/ (plus the demo pages), keeps /gtn/. Jest 228/228.
Then, at the user's request, static/llms.txt no longer links the GTN Calculator; the line now links only https://phil.us/gtn/. llmsTxt and llmsFull tests 39/39. The current public/llms-full.txt has no /gtn/calculator/ section (its Source lines don't include it; the "calculator" text there comes from other pages), so nothing to remove there.
Then, at the user's request, llmsFull.ts EXCLUDED_PATHS gained /demo/thank-you/, /demo/schedule/ and /gtn/calculator/ (all shown only after a form), so it again mirrors the sitemap excludes. New test "leaves out the pages shown only after a form, even without noindex" failed first (the pages were included), then passed. Jest 229/229; tsc 406 unchanged. Running buildLlmsFull from HEAD and from the working tree on the current public/: identical text and Source list; counts moved from noindex 70 / excluded 2 / empty 6 to noindex 68 / excluded 5 / empty 5. So before, the calculator stayed out only because its HTML has no text, not by rule.
Left: Not rebuilt, so the sitemap XML and the new llms-full.txt are unverified in a real build. The /gtn/ landing page has no Head export (no title, description, canonical); no decision yet.
Files: gatsby-config.ts, static/llms.txt, src/utils/llmsFull.ts, src/__tests__/utils/llmsFull.test.ts, Handover.md
Next: The user rebuilds if they want the sitemap confirmed, then opens the PR from feat/structured-schema.
