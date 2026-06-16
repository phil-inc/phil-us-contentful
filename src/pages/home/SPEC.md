# Home Page Spec

## Scope

Replace Contentful-driven `/` with a static, code-driven home page. File-based `src/pages/index.tsx` overrides the Contentful-generated route automatically (Gatsby priority).

## Route

`/` — served by `src/pages/index.tsx`, imports from `./home/` directory for data, styles, and sub-components.

## Layout

Uses shared `Layout` component (MegaNav + MegaFooter).

## File Structure

```
src/pages/
├── index.tsx              # Page component (route: /)
└── home/
    ├── SPEC.md            # This file
    ├── _data.ts           # All page content/data constants
    ├── home.module.css    # All styles (CSS module)
    └── components/        # Section components (if needed for size)
```

## Sections (7 total)

### 1. Hero (split layout)
- H1: "The Simple Path to Affordable Medication Access" with SVG underline on "Simple Path"
- Subtitle paragraph
- 3 audience chips (Pharma → /pharma/, Patients → /patients/, Providers → /providers/)
- Each chip: tag label, description, CTA arrow link
- Decorative orb backgrounds (CSS pseudo-elements)
- Draw animation on underline SVG

### 2. Outcomes Banner (full-width, dark bg)
- Heading: "Helping Pharma Brands Grow"
- 4 stats with count-up animation (IntersectionObserver triggered):
  - 2X+ Patient Starts
  - 3X+ Covered Dispenses
  - 3X+ Adherence
  - 4.8/5.0 Patient Satisfaction
- Trustpilot widget embed (real, using business unit ID `60e5837e95cb800001e58b14`)

### 3. Solution Carousel (tabbed)
- Heading + subtitle
- 4 pill tab buttons: Digital Access, PA & Coverage, Dispense Network, Data & Insights
- Carousel of cards, each with:
  - Rich SVG visualization (phone mockup, PA form, USA map, dashboard)
  - Tag, H3, body copy
  - 2-3 stats with count-up
- Keyboard navigation (ArrowLeft/Right on pills)
- Click peeking cards to navigate
- "Explore Our Solution →" link below

### 4. Trusted Partner / Voices
- Heading + subtitle
- 3 testimonial cards: Pharma, Patients, Providers
- Each card: rotating quotes (3 per card), auto-advance 7s timer
- Progress bar animation per cycle
- Dot navigation (manual click)
- Hover pauses rotation
- All cards advance in lockstep
- "Explore Customer Stories →" link

### 5. Commitment / Insights
- Heading + subtitle
- 3 insight cards (horizontal scroll):
  - DTP Research report
  - HCP Research report
  - 5 Key Success Factors report
- Each card: decorative SVG rings, wave background, tag, title, CTA
- "Explore Resources →" link

### 6. End CTA
- Eyebrow: "Ready to simplify medication access?"
- H2: "Accelerate Access, Affordability, and Adherence"
- Body copy
- "Book Demo →" button linking to /demo/

## Component List

| Component | Status | Notes |
|---|---|---|
| Layout | Reuse | Shared header/footer |
| Hero section | New | Inline in page or extracted component |
| Outcomes banner | New | Count-up animation hook |
| Solution carousel | New | Tab state + card transitions |
| Voices / testimonials | New | Auto-rotating quotes with timer |
| Insights cards | New | Horizontal scroll track |
| End CTA | New | Simple section |

All new components are page-specific, built inline or in `src/pages/home/components/`.

## Animations

- **Reveal on scroll**: IntersectionObserver, `.reveal` → `.in` class, `rootMargin: '0px 0px -10% 0px'`, `threshold: 0.05`
- **Count-up counters**: Triggered on scroll into view, animate from 0 to target with configurable decimals/suffix
- **Hero underline draw**: CSS path animation on load
- **Quote rotation**: 7s interval, shared timer across all voice cards, pause on hover
- **Solution carousel**: CSS transitions between active/prev/next cards
- **Prefers-reduced-motion**: Respects `prefers-reduced-motion: reduce` — disables all animations

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| > 1100px | Full desktop layout |
| ≤ 1100px | Navigation collapses, grids adjust |
| ≤ 1000px | Solution cards stack, voices grid → single column |
| ≤ 900px | Hero stacks vertically, outcomes 2-col → 1-col |
| ≤ 800px | Container padding reduces, text sizes scale down |

## SEO

- Title: "PHIL — Medication Access, Simplified." (42 chars)
- Description: "PHIL is the digital hub and direct-to-patient platform that helps pharma brands maximize starts, coverage, adherence, and commercial performance." (145 chars)
- Canonical: https://phil.us/
- OG image: default via `getOgImage(null)`
- Schema.org WebPage JSON-LD
- One `<h1>`, heading levels sequential

## Links (all relative)

- /pharma/
- /patients/
- /providers/
- /solution/
- /demo/
- /customer-success/
- /dtp-research/
- /hcp-research/
- /key-success-factors-to-drive-brand-excellence/
- /resources/

## Trustpilot Integration

Embed using standard Trustpilot widget script. Data attributes from design:
- `data-locale="en-US"`
- `data-template-id="5419b6ffb0d04a076446a9af"`
- `data-businessunit-id="60e5837e95cb800001e58b14"`
- `data-token="825768d4-bb04-42e7-84a3-df76f9202ad6"`
- `data-theme="dark"`

Load Trustpilot bootstrap script in Head or via useEffect.

## Risks / Notes

- Contentful still generates a `/` page via GenerateMainPages → Default template. Gatsby file-based pages take priority, so no conflict. HOME constant is imported but unused in GenerateMainPages logic — no code change needed there.
- No forms on this page.
- No Contentful dependency — fully static.
- USA map in Dispense Network card: design uses a bundled image (UUID reference). Need to extract from design archive or recreate as SVG/static image.

## Deviation Log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Provider chip `<br>` | `PA<br>tools` | Natural text wrap | React text content, wraps naturally at same point |
| Tweaks panel | Interactive layout switcher | Omitted | Dev-only debug tool in design, not production content |
| Nav/footer | Design's lite nav/footer | Shared Layout MegaNav + MegaFooter | Site-level chrome, design omitted as placeholder |
| Voice progress bar | Present but `display: none !important` in v3 CSS | Not rendered | Design's own CSS hides it |
