# Patients Page — Build Spec

## Route
`/patients` — file-based: `src/pages/patients/index.tsx`

## Contentful Conflict
Contentful "patients" page exists → skip in `GenerateMainPages.ts`:
```ts
if (page.slug === "patients") return;
```

## Layout
Shared `<Layout>` component (MegaNav + CInfoBar + StaticFooter).
`PageContext.Provider value={{ title: "Patients" }}`.

## Sections (in order)
| Section | Component |
|---|---|
| Hero | `components/HeroSection/` |
| Trustpilot strip | `components/TrustpilotReviewsStrip/` |
| 3-step how-it-works | `components/StepsSection/` |
| YouTube video | `components/VideoSection/` |
| Testimonials carousel | `components/TestimonialsCarousel/` |
| FAQ accordion | `components/FaqSection/` |
| Footer CTA banner | `components/FooterCta/` |

No shared components reused — all sections are unique enough to build fresh per design.

## Component List
Each: `ComponentName.tsx` + `ComponentName.module.css` in `src/pages/patients/components/ComponentName/`.

## TrustPilot
Reuse existing `src/components/common/TrustpilotWidget/TrustPilotWidget.tsx`.
Render `<TrustpilotWidget />` once in page root (handles script load + init).

Two widget divs from design:
- Carousel (template `53aa8912dec7e10d38f59f36`, h=240px) in TrustpilotReviewsStrip
- Horizontal bar (template `5406e65db0d04a09e042d5fc`, h=28px) below testimonials carousel

## Interactions
All converted to React:
- **Carousel**: `useState` for page index, `useEffect` for autoplay (6.5s), resize handler for perPage (1 on ≤640px, 3 otherwise)
- **FAQ**: `useState` open item set, `onClick` toggle
- **Phone hero**: `useState` hover state, `useEffect` for auto-play on mount (600ms delay)

## Responsive
CSS from design ported to CSS modules. Breakpoints: 1100px, 980px, 880px, 820px, 640px, 380px.

## Assets
No images. All SVGs inline. TrustPilot external.

## Links (hardcoded, from design)
- Patient Login: `https://my.phil.us/?_gl=1*1w3p6v6*...`
- Help Center: `https://philhelp.zendesk.com/hc/en-us/p/faq`
- Video: `https://www.youtube-nocookie.com/embed/-yW2FBSAtd8?rel=0`
- TrustPilot business: `60e5837e95cb800001e58b14`

## Deviations from Design
| What | Design | Implementation | Why |
|---|---|---|---|
| Nav | Custom nav in HTML | Shared MegaNav via Layout | Site consistency |
| Footer | Custom footer in HTML | Shared StaticFooter via Layout | Site consistency |
| JS interactions | Plain JS | React state/effects | Framework requirement |
| Font loading | @font-face in `<style>` | Existing site fonts (already loaded) | Avoid duplication |
| Anno bar | Custom anno bar in HTML | None (layout handles it) | MegaNav includes announcement |
