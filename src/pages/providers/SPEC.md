# SPEC: /providers (HCP Page)

## Scope
New static page, no Contentful.

## Route
`/providers`

## Layout
Shared `Layout` (site navbar + footer).

## Sections
1. **Hero** — eyebrow "For Healthcare Providers", H1 + PHILRx accent squiggle, lead text, "Read FAQs" CTA (anchor to `#faq`), contact info block (phone + email). Visual: SVG bullseye rings + workflow card with 3 checkmarks.
2. **Trust Strip** — eyebrow + H2, Trustpilot carousel widget (same business unit ID as /patients).
3. **Steps** — H2 "How to Prescribe to PHILRx", 3 numbered cards.
4. **Video** — YouTube `Fkq1ncdE2ug`.
5. **Testimonials** — 2-column synchronized rotator: "What Patients Say" / "What Providers Say". Auto-advances every ~3s. Below: Trustpilot horizontal widget.
6. **FAQ** — sidebar category nav (8 categories) + scroll-spy + accordion items. "Visit Help Center" button.
7. **Footer CTA** — "Get MD Support from the PHILRx Team", "Contact PHILRx Support" → `https://phil.us/contact/`.

## Interactivity
- Testimonials: `useState` for shared index, `useInterval` pattern for auto-advance, pause on hover, dot click to jump.
- FAQ accordion: `useState<number | null>` for open item.
- FAQ sidebar: scroll-spy via `scroll` event listener + `getBoundingClientRect`, smooth scroll on click.

## Styling
CSS Module (`providers.module.css`). Shares design language with `/patients`.

## Assets
No images. All SVGs inline (bullseye rings, squiggle, checkmark icons).

## Deviations from design

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Hero background | `#0E5E4E` solid | Radial gradient overlays on dark green | Matches /patients hero pattern, adds depth |
| Container class | `.wrap` | `xl-container` | Site standard per patterns |
| Fonts via @font-face with UUID src | UUID blob URLs | CSS variables + Raleway/Lato already loaded by Layout | Fonts already loaded globally |
| `wf-pill-2` hidden element | `display:none` | Omitted | Unused in design |
