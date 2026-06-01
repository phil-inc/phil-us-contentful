# SPEC — /contact (Contact Us)

## Scope
New static page — no Contentful.

## Route
`/contact`

## Layout
Shared Layout (header + footer).

## Components
All new, inline in page file.

## Form behavior
None.

## Responsive
- Band art hidden at ≤900px
- Cards stack to 1-col at ≤1000px
- Mobile padding adjustments at ≤600px

## Assets
None — circles decorative art implemented as inline SVG (no PNG from design bundle available).

## Deviation log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Circles art | PNG mask-image via UUID `29c18ce0-...` | Inline SVG circles | Design bundle PNG not extractable |
