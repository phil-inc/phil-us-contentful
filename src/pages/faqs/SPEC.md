# FAQ Page — SPEC

## Scope
**Update** — replacing the existing `/faqs/` route (currently a Netlify redirect to `/insights/faqs/`) with a new code-driven page at `src/pages/faqs/index.tsx`.

## Route
`/faqs/`

## SEO
- **Title:** Frequently Asked Questions
- **Description:** Find answers about PHILRx for pharma partners, patients, and providers. Learn about our platform, prior authorization, prescriptions, delivery, and more.
- **H1:** "Frequently Asked Questions about PHILRx"

## Layout
- Uses shared Layout (MegaNav + MegaFooter)
- No sticky help banner (already exists globally)

## Component List

| Component | Status | Notes |
|-----------|--------|-------|
| Hero (eyebrow, title with squiggle, jump pills) | New | Page-level JSX, not extracted |
| Jump pill nav | New | Anchor links with smooth scroll, active state on click only |
| Accordion (outer category level) | New | React state, multi-open, aria-expanded |
| Q&A accordion (inner nested level) | New | Same pattern, nested inside outer |
| Flat accordion (Patients section) | New | Single-level, body is plain copy |
| Phone list table | New | Styled `<ul>` for foreign-language support numbers |
| Bottom CTA banner | New | Green gradient section, "Contact Us" link |
| Decorative orbs | New | CSS-only radial-gradient positioned spans |

## Form Behavior
None — no forms on this page.

## Responsive Approach
- Design provides full responsive CSS with breakpoints at 900px and 600px
- Orbs scale down / hide on mobile
- Jump pills wrap and shrink
- Accordion padding/font-size reduces
- Bottom CTA stacks to single column
- Phone list rows stack vertically on narrow screens

## Assets
- No images to import — all visual elements are CSS (gradients, SVG inline icons)
- Fonts already loaded globally via `@fontsource/raleway` and `@fontsource/lato`

## Netlify Changes
- Remove redirect rule: `/faqs/*` → `/insights/faqs/` (line ~188–191 in netlify.toml)
- Keep redirect: `/resources/faqs` → new page will handle naturally

## Risks / Workarounds
- The old `/insights/faqs/` Contentful page may still exist — removing the redirect means it'll still be accessible at its original URL. No action needed unless explicitly asked to remove it.
- Nav links in MegaNav and MegaFooter already point to `/faqs/` — no changes needed.

## Deviation Log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Sticky help banner | Included | Omitted | Already exists globally per dev instruction |
| Font loading | Base64 embedded in HTML | `@fontsource/*` packages | Fonts already loaded site-wide via gatsby-browser |
| Container width | `max-width: 1256px` on `.page` | `xl-container` class | Site standard per SKILL.md principles |
