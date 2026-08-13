# PHIL.us Markup Context (for Markup Chat Assistant)

> This file is consumed by the **Markup** browser extension's chat feature. Markup
> lets marketers annotate copy changes and screenshot UI issues directly on the
> live site, then files them as Jira tickets. Before those tickets go out, this
> chat feature answers questions against (a) the annotations/screenshots about to
> be sent and (b) this file, so the marketing team can catch conflicts, duplicate
> asks, or "that's actually a CMS edit not a code ticket" issues before they hit
> engineering.
>
> This file describes **what's actually on the live site, page by page** — the
> content, sections, and where things link to — not the underlying tech. For
> engineering architecture, see [`CONTEXT.md`](./CONTEXT.md) alongside this file.

## The one fact that matters most for routing a ticket

Every page on phil.us is edited in **one of a few places**:

| Source | How to change it |
|---|---|
| **Contentful (CMS)** | Marketing edits it directly, no ticket needed |
| **Code** (this repo) | Needs a Jira ticket, someone edits code and deploys |
| **Ashby (careers ATS)** | Job listings themselves are pulled live from Ashby, PHIL's applicant tracking system — not Contentful, not this repo. The Careers page shell/design is Contentful, but adding, editing, or removing an actual job posting happens in Ashby, by whoever manages hiring, not marketing or engineering. |

The inventory below is organized by page so the chat can tell, for any
annotation, which bucket it falls into.

### The card vs. the page it links to — read this before routing anything

Several code-driven pages are **hubs**: they show a list of cards, and each card
links out to some other page. The card and its destination are edited in
different places, and confusing them is the single most common misrouting:

| Thing being changed | Where it's edited |
|---|---|
| **The card / list row itself** on a code-driven hub — adding one, removing one, or editing its title, label, tag, order, or link URL | **Code.** File a Jira ticket. |
| **The destination page** the card links to — the words on the page you land on after clicking | Usually Contentful. |

So: *"add a press card titled X linking to Y"* is a **code ticket**, full stop.
It stays a code ticket even though the URL `Y` points at a Contentful page —
the marketer is asking for a new row in a hardcoded list, not for edits to the
article at the other end. **The presence of a destination URL in the request is
not evidence of a Contentful edit.** Only route to Contentful when the change
is to copy that lives *on the destination page*.

This applies to every hub listed below — `/press/`, `/resources/`,
`/customer-success/` — and to the insight/resource card strips embedded on
`/`, `/solution/direct/`, and elsewhere.

---

## Pages editable in code (need a Jira ticket for any change)

### Home — `/`
Landing page. Hero headline ("The Simple Path to Affordable Medication
Access") with three audience chips linking to Pharma, Patients, Providers.
Below: an outcomes stat banner (Patient Starts, Covered Dispenses, Adherence,
Patient Satisfaction rating) with a Trustpilot widget, a tabbed "Our Solution"
carousel (Digital Access / PA & Coverage / Dispense Network / Data &
Insights), a rotating testimonials section (Pharma / Patients / Providers
quotes), an insights/resources card strip (DTP Research, HCP Research, 5 Key
Success Factors reports), and a closing "Book Demo" banner.

### Pharma — `/pharma/`
Landing page for pharma brand audiences. Hero with a scrolling stat marquee,
an "Our Partners" tabbed section (Supporting Brands / Products & TAs /
Outcomes), a two-video "Our Platform" section (PHIL Core + PHIL Direct),
a 5-tab "How We Help You" stakeholder section (Brand, Access, Trade, Hub,
Innovation), a support section with rotating patient/provider quotes and a
Trustpilot strip, an FAQ accordion, and a closing "Book Demo" banner.

### Patients — `/patients/`
Landing page for patients. Hero, Trustpilot review strip, a 3-step
"how it works" section, an embedded YouTube video, a testimonials carousel,
an FAQ accordion, and a closing CTA banner. Links out to the patient login
portal and the PHIL help center.

### Providers — `/providers/`
Landing page for healthcare providers (HCPs). Hero ("For Healthcare
Providers") with contact phone/email, a Trustpilot strip, a 3-step
"How to Prescribe to PHILRx" section, an embedded YouTube video, a
side-by-side "What Patients Say" / "What Providers Say" testimonial rotator,
an FAQ with sidebar category navigation, and a closing support CTA linking
to `/contact/`.

### Approach & Outcomes — `/approach/`
Explains PHIL's approach to Access / Affordability / Adherence. Hero with
three challenge/solution columns, a 7-step interactive "Patient Journey"
walkthrough, a "Our Solutions" section (PHIL Digital Hub's 4 pillars nested
with PHIL Direct-to-Patient), a Trustpilot + HCP testimonials section, 4
customer success story cards, an ROI calculator promo banner, and a closing
CTA.

### Our Solution — PHIL Digital Hub — `/solution/core/`
Deep-dive on the PHIL "Core Hub" product. Hero, a stat band with Trustpilot,
a 4-card pillars grid, a 7-step "Prescription Journey" scroll-driven
walkthrough, a 4-tab "Data & Insights" dashboard showcase, a patient/HCP
support section with rotating reviews, a video band, an ROI calculator promo
(links to `/gtn/`), and a closing "Book Demo" banner.

### Our Solution — PHIL Direct — `/solution/direct/`
Deep-dive on the Direct-to-Patient product. Hero with an animated
e-commerce-style phone mockup, a thought-leadership resources section
(reports/whitepapers), a 3-journey interactive telemedicine selector, a
tabbed full-funnel insights dashboard, a research/report card section, a
video band, and a closing "Book Demo" banner.

### GTN Landing — `/gtn/`
Top-of-funnel page for the Gross-to-Net calculator tool. Editorial content
(stats, benchmarks, "opportunity" cards, a pull quote, a CTA banner) next to
a sticky lead-capture form. Submitting the form routes to the calculator
itself.

### GTN Calculator — `/gtn/calculator/`
The actual interactive ROI/GTN calculator tool. **Distinct page from
`/gtn/`** — always confirm which one an annotation refers to before filing.
(Note: this one's underlying content record actually still lives in
Contentful, but the route/slug is controlled in code — copy edits inside the
tool go through Contentful, but anything about the surrounding page shell or
routing is code.)

### Customer Success Stories — `/customer-success/`
Case-study proof-point hub. Hero with an animated rotating metric ticker,
a tabbed "Results" section (Access / Affordability / Adherence / Adoption)
linking out to individual case studies, a "Recent Client News" press card
strip, rotating testimonials, a Trustpilot comparison strip, an ROI banner
(links to `/gtn/`), and a closing "Book Demo" banner.
**Note:** this page is the index/hub only — the individual case study detail
pages it links to (e.g. a specific brand's story) are still edited in
Contentful.

### Press — `/press/`
Press coverage hub. Hero, a "Latest Announcements" featured card section, a
"Featured Thought Leadership" card section, a paginated "All Coverage" grid
of every press item, and a closing "Book Demo" CTA.

**This page has no Contentful involvement whatsoever.** Every press item is a
hardcoded entry in a content list that lives in the site repo (currently synced
from a press-library spreadsheet). Adding a press card, removing one, or
editing any part of one — title, outlet, description, label, type, or its link
URL — **is a code change and needs a Jira ticket.** Route it as a normal code
ticket even when the card's URL points at an article or announcement page.
Never mark a `/press/` annotation as "Contentful, not code".

### Resources — `/resources/`
Resource Hub. Hero, a search + filter bar (by content type and theme tag),
and a paginated grid of ~100 resources (reports, webinars, blogs, press),
each linking out to its own content page. Above the grid sit three featured
resource cards. Lower down, an "In the news" strip reuses the same press
items that appear on `/press/` — so a change to a press item shows up on both
pages, and two annotations about "that press item" on the two different pages
are usually the same underlying fix.

**This page has no Contentful involvement whatsoever.** The resource grid is a
hardcoded content list in the site repo (synced from a resource-hub
spreadsheet). Adding a resource card, removing one, or editing any part of one
— title, type, topic/theme tags, button label, or its link URL — **is a code
change and needs a Jira ticket.** This is true no matter what the card's
label says: a card tagged "Press", "Report", "Webinar", or "Blog" is still just
a row in this hardcoded list. Never mark a `/resources/` annotation as
"Contentful, not code".

Careful with the word "resource" here — a request to "add a resource to this
page" means *add a card to this grid* (code). It does **not** mean the
"individual downloadable resource page" listed in the Contentful section below,
which is the separate gated-content page a card might link to.

### FAQs — `/faqs/`
Consolidated FAQ page covering Pharma, Patients, and general platform
questions. Hero with jump-to-section pills, nested category accordions, a
flat accordion for patient-specific questions, a phone-number list for
foreign-language support, and a closing "Contact Us" CTA.

### Book a Demo — `/demo/`
Full-screen lead-capture landing page (no site nav/footer bar shown above the
fold). Headline + supporting stats/bullets next to an embedded demo-request
form. This is the destination for every "Book Demo" button sitewide.

- **`/demo/schedule/`** — confirmation page shown after form submission, but
  only for submitters whose email domain is a recognized target account.
  Shows a HubSpot meeting scheduler so they can pick a time.
- **`/demo/thank-you/`** — confirmation page shown after form submission for
  everyone else (non-target-account emails). Shows a "we'll be in touch" thank
  you message and a demo video to watch while waiting.

### Contact Us — `/contact/`
Contact page with no form — just contact info cards.

- **`/contact/get-in-touch/`** — general contact form (HubSpot embed).
- **`/contact/hcp-support/`** — HCP-specific support contact form (separate
  HubSpot embed from the general one above).

### Consumer Annex — `/annex/`
Legal page hosting three consumer health-data/privacy annexes (Annex A, B,
C) plus a link that reopens the cookie consent banner. Includes a detailed
table of what personal information is collected/disclosed/sold. **Legal
copy — route any content change through legal review, not just marketing.**

### Terms of Service — `/terms/`
Full Terms of Service. **Legal copy — route through legal review.**

### Privacy Notice — `/privacy/`
Full Privacy Notice, including a table of contents (Updates, Personal Info
Collected, How We Use It, How We Disclose It, Your Privacy Choices & Rights,
International Transfers, Data Security & Retention, Children's Info,
Third-Party Sites, Contact Us). **Legal copy — route through legal review.**

### HIPAA Notice — `/hipaa/`
HIPAA Notice of Privacy Practices, including permissible uses/disclosures of
health information and contact info (phone, `HIPAA@phil.us`). **Legal
copy — route through legal review.**

### Addyi — `/addyi/`
Standalone campaign microsite for the Addyi product — its own header, hero,
benefits section, "About Addyi," how-to-prescribe info, an EMR
search/send section, and a safety information accordion. Visually and
structurally independent from the rest of the site (own branding/theme) —
treat annotations here as isolated from the rest of the site's shared
components.

### Channel Comparison tool — `/channel-comparision/`
Multi-step interactive tool/form: user fills in brand economics, gets a
personalized channel comparison report via email. Includes AICPA SOC 2 and
HIPAA compliance badges.

---

## Pages editable in Contentful (no ticket needed — just edit the CMS entry)

Any **whole page** not listed above is managed in Contentful. This is a rule
about *pages*, not about pieces of pages: a card, list row, link, or section
that sits **on** one of the code-driven pages above is code, even if it isn't
individually named in this file. Do not reach for Contentful just because a
specific card or item wasn't enumerated.

The Contentful pages are:

- **`/company/`** — About/company overview page, linked from the "About" group
  in the main nav and from the footer.
- **`/leadership/`** — Leadership team page (exec bios and photos), same nav
  group as above.
- **`/careers/`** — the page **shell/design**: headline, layout, and the copy
  around the job listings. The listings themselves are Ashby — see the section
  below.
- **`/dtp-research/`** and **`/hcp-research/`** — the two research report
  landing pages. Linked from the main nav, from the Home page insights strip,
  and from the featured cards on `/resources/`. The *cards* pointing at them
  are code; these destination pages are Contentful.
- Individual blog posts
- Individual case study detail pages — the ones linked from
  `/customer-success/`
- Individual downloadable resource / gated-content pages — meaning the
  destination page a `/resources/` card links **to**, not the card itself
- Event registration pages
- Copy inside the GTN calculator tool itself (see note under `/gtn/calculator/`)

**Exception:** if the request is about how a whole category of these pages
*looks or behaves* (e.g. "every case study page should show the metrics in a
different order"), that's a template-level change and does need a code
ticket — it's the difference between changing one page's words vs. changing
the mold every page of that type is stamped from.

## Careers listings — a third bucket, not Contentful and not code

**A specific job posting** (title, description, location, requirements) is
**neither a CMS edit nor a code ticket** — it's managed directly in Ashby,
PHIL's hiring system. If an annotation flags a typo or outdated info in an
actual job listing, it should go to whoever manages the Ashby account, not
to marketing-in-Contentful or engineering-in-Jira. Only flag it as a code
ticket if the issue is with the Careers page's surrounding layout/design
itself, not the listing content.

---

## Ambiguous cases — always confirm before filing

- **"The GTN page" / "the GTN calculator"** — `/gtn/` (landing/lead-capture,
  all code) vs. `/gtn/calculator/` (the tool itself, copy inside it is
  Contentful). Different pages, different owners. Extra trap: the **nav link
  labelled "GTN Calculator" actually goes to `/gtn/`**, so a marketer who
  clicked it and says "the GTN calculator page" may well mean the landing
  page. Check the annotation's `url`.
- **A specific case study or blog post reached via a code-driven index**
  (e.g. clicking through from `/customer-success/`) — if the marketer is
  standing **on that destination page** and annotating its copy, that's
  Contentful, even though the hub they clicked from is code. Check the `url`
  on the annotation: the URL of the page they were actually on when they
  annotated is what decides this — not a URL they typed inside the comment.
  If they were on the hub (`/press/`, `/resources/`, `/customer-success/`) and
  are describing a card, it's code. See "The card vs. the page it links to"
  above.
- **"The chat" on the site** — there's an existing AI FAQ chat widget for site
  visitors (separate from this Markup tool). If an annotation mentions "the
  chat," confirm whether it means that visitor-facing widget or something
  else — don't file it as a Markup-tool bug by mistake.

## Worked routing examples

Use these to calibrate. The first three are cases that have been misrouted
before.

| Annotation | Correct verdict | Why |
|---|---|---|
| On `/resources/`: "Add a new resource to this page. Top label is 'Press'. Title: 'Phil secures funding worth 3 million'. Link: `https://phil.us/phil-secures-funding`" | **code ticket** (not `wrong_route`) | New row in the hardcoded resource list. The word "resource" and the destination URL are both red herrings. |
| On `/press/`: "Insert another press card at the top. Label: Press. Title: 'Why brands fail in medicine'. URL: `https://www.phil.us/fail-brands`" | **code ticket** (not `wrong_route`) | New entry in the hardcoded press list, plus an ordering change. Both are code. |
| On `/press/`: "This outlet name is spelled wrong on the third card" | **code ticket** | Editing an existing hardcoded list entry. |
| Standing on `https://www.phil.us/fail-brands` itself: "Second paragraph should say 'adherence' not 'compliance'" | **`wrong_route` → Contentful** | The marketer is on the destination page, editing its body copy. |
| On `/resources/`: "Every card should show the publish date under the title" | **code ticket** | Changes the card component for all rows. |
| On `/careers/`: "The salary range in the Senior Engineer listing is out of date" | **`wrong_route` → Ashby** | Listing content lives in Ashby. |

## Shared elements that show up on many pages

Several things repeat sitewide — if an annotation flags one of these, it
likely affects every page it appears on, so check whether other similar
annotations in the same batch are actually the same underlying fix:

- **Site header/navigation and footer** — same on nearly every code-driven
  page above.
- **"Book Demo" buttons** — appear on nearly every page, all point to `/demo/`.
- **Trustpilot review widgets** — appear on Home, Pharma, Patients, Providers,
  Approach, Customer Success, and both Solution pages. Each instance may show
  a different rating/review set, so confirm whether the issue is with the
  widget generally or one page's specific reviews.
- **FAQ accordions** — appear on Pharma, Providers, and the dedicated `/faqs/`
  page, each with different question sets — don't assume a fix to one applies
  to the others.

## How the nav labels map to pages

Marketers usually name a page by its **nav label**, which often isn't the
page's title. Use this to resolve a loosely-named page before asking them to
clarify.

Main nav (dropdown menus):

| Menu | Label shown | Page |
|---|---|---|
| Who We Serve | Pharma / Patients / Providers | `/pharma/`, `/patients/`, `/providers/` |
| Our Solution | Digital Hub | `/solution/core/` |
| Our Solution | Direct-to-Patient | `/solution/direct/` |
| Our Solution → "Why PHIL" | Our Approach and Outcomes | `/approach/` |
| Our Solution → "Why PHIL" | Customer Success Stories | `/customer-success/` |
| Our Solution → "Why PHIL" | **GTN Calculator** | `/gtn/` — the landing page, **not** `/gtn/calculator/` |
| Resources | Resource Hub | `/resources/` |
| Resources | Press | `/press/` |
| About Us | Company / Leadership / Careers / Contact / FAQ | `/company/`, `/leadership/`, `/careers/`, `/contact/`, `/faqs/` |

The **Our Solution** and **Resources** menus also show large promo cards on
the right-hand side: a GTN promo under Our Solution, and the two research
reports (`/dtp-research/`, `/hcp-research/`) under Resources. The **About Us**
menu shows two featured press announcements linking to external newswire
sites. These promo cards are part of the nav component — editing one is a
code change, and it changes the card on every page.

Footer columns use slightly different wording again — "Approach & Impact" for
`/approach/`, "Customer Stories" for `/customer-success/`, "Press Library" for
`/press/`. A legal row at the bottom links `/terms/`, `/privacy/`, `/hipaa/`,
`/annex/`.

Not in the nav or footer at all — reached from in-page CTAs or campaign
links: `/demo/`, `/gtn/calculator/`, `/channel-comparision/`, `/addyi/`.
