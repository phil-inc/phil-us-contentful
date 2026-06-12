# Customer Success Stories Page — Build Spec

Source design: `docs/adr/Customer Success Page/Customer Success.html` (+ `assets/tokens.css`).

## Scope

New code-driven page that **replaces** the existing Contentful-driven page at `/insights/case-studies/`. This is the "Customer Success Stories" landing/index that the MegaNav and MegaFooter already link to.

## Route

- `/insights/case-studies/` → file-based page at `src/pages/insights/case-studies/index.tsx`
- Per-case-study children (`/insights/case-studies/<slug>`) are still generated from Contentful by `GenerateCaseStudyPages` — unaffected (they are child paths, no collision with the index).

### Contentful override (required)

A Contentful page currently serves `/insights/case-studies/`. To let the file-based page win, a guard is added to `src/strategies/GenerateMainPages.ts` → `handleRegularPage`, matching the existing `providers` / `pharma` pattern:

```ts
// /insights/case-studies is served by the static file-based page
if (page.slug === "insights/case-studies") return;
```

**TODO**: if the Contentful slug is not exactly `insights/case-studies`, update the guard to match the real slug (a duplicate-page build warning would reveal a mismatch).

## Layout

Uses the shared `Layout` (site `MegaNav` header + `MegaFooter` footer + info bar). The design's own nav / announcement bar / footer markup is unused and intentionally dropped. Page content is a vertical stack of sections, each wrapped in `xl-container`.

## Sections (top → bottom)

1. **Hero (centered)** — eyebrow, h1 with accent, lead, two CTAs (Read Proof → `#case-studies`, Book Demo → `/demo`), and an animated **metric ticker** that rotates 4 metrics with a count-up.
2. **Results / case studies** (`id="case-studies"`) — heading + 4 tabs (Access / Affordability / Adherence / Adoption). Each panel: Challenge/Solution copy + two count-up metrics + "Read the full story" link. "View All Case Studies" text CTA → `/resources/`.
3. **Recent Client News** — 3 press cards linking to external press releases. "View All Coverage" → `/press/`.
4. **Testimonials** — 3 rotating quote cards (Pharma / Patients / Providers), advance together on a shared timer, click/dots to navigate, pause on hover.
5. **Trustpilot strip** — PHIL-vs-industry rating comparison bars (animated fill on scroll) + Trustpilot slider widget.
6. **ROI banner** — "Measure the Impact…" with mini calculator preview cards + CTA → `/gtn/`.
7. **Footer CTA** — "Streamline the Medication Access Experience" + Book Demo → `/demo`.

## Component / file structure

Mirrors `src/pages/providers/`:

| File | Purpose |
|---|---|
| `index.tsx` | Page + in-file section components + `Head` (SEO) export |
| `_data.ts` | Content arrays: hero metrics, case-study tabs, press cards, testimonials, trust ratings, ROI preview |
| `customerSuccess.module.css` | All page styles (translated from the design's `<style>` block; unused sections omitted) |

Content lives at page/data level and is passed into the section components. No Contentful.

## Interactions (ported from design JS to React hooks)

- **Tab switcher** — `useState` for active tab; switching re-triggers count-up for the active panel.
- **Count-up** — `IntersectionObserver` in `useEffect`; respects `prefers-reduced-motion`; integers vs decimals handled.
- **Hero metric ticker** — interval rotation (3.6s), dot controls, pause on hover, count-up per slot.
- **Testimonials rotation** — shared 7s interval advancing all cards together; dot + card-click navigation; pause on hover.
- **Trustpilot** — bootstrap script loaded once, `loadFromElement` on the widget (same pattern as `/providers`).

## Links

Internal links use relative paths (per skill rule 10); genuinely external links stay absolute.

| Design link | Implemented as |
|---|---|
| Book Demo / footer CTA | `/demo` |
| Read Proof | `#case-studies` |
| ROI "Calculate Your Potential" | `/gtn/` |
| View All Case Studies | `/resources/` |
| View All Coverage | `/press/` |
| Case-study "Read the full story" | `/insights/case-studies/<slug>/` |
| Press cards | businesswire.com / prnewswire.com (absolute, external) |
| Trustpilot | trustpilot.com (absolute, external) |

## SEO (Head export)

Modeled on `src/pages/providers/index.tsx`.
- Title ~50–60 chars, description ~150–160 chars.
- `canonical` = `https://phil.us/insights/case-studies/`.
- One `<h1>` (hero), no skipped heading levels.

## Assets

None. The page body references no image files — the hero uses the animated metric ticker and every other graphic is inline SVG / CSS gradient.

## Deviation log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Site chrome | Design's own nav + announcement bar + footer | Shared `Layout` (MegaNav/MegaFooter) | Site-level consistency; design chrome was placeholder |
| Content width wrapper | `.wrap` (max 1256/1536px, 40px pad) | `.xl-container` (max 1320/1600px, 32px pad) | Project standard per skill |
| ROI CTA target | `phil.us/gtn-calculator/` | `/gtn/` | No `/gtn-calculator` route in repo; `/gtn/` is the calculator landing |
| Case-study links (Neuro, Women's DTP) | Both pointed to the women's-health telemedicine URL (placeholder duplication) | Correct distinct slugs from `approach/_data.ts` | Fix likely copy-paste error in design |
| Internal link URLs | Absolute `https://phil.us/...` | Relative paths | Skill rule 10 |
| Metric ticker labels | A couple use `<br>` for forced line breaks | Plain strings, wrap within 260px max-width | Keeps `_data.ts` content clean; visually equivalent |
| `btnText` CTA arrow | No arrow movement on hover | Arrow nudges 4px on hover | Minor consistency polish with other arrow CTAs |
