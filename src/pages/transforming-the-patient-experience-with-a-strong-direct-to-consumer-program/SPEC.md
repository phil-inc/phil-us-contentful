# SPEC: Transforming the Patient Experience with a Strong Direct-to-Consumer Program

## Scope
New code-driven static page. No Contentful. All content hardcoded.

## Route
`/transforming-the-patient-experience-with-a-strong-direct-to-consumer-program/`

## Layout
Shared `<Layout>` (standard phil.us nav + footer).

## Everything hardcoded
No shared blog components used. All sections — body, social share, bottom banner — are implemented inline from the design HTML.

## Sections
1. Hero image (Blog_Posts.svg floating right)
2. Intro paragraphs
3. **Keeping Pace with Evolving Patient Expectations**
4. **Defining DTC in Pharma** (4-item unordered list)
5. **Evaluating the Efficacy of DTC** (4 sub-categories with bullet lists)
6. **Building Blocks of a DTC Program** (5-item ordered list)
7. **Transforming Patient Care with DTC** (closing + CTA)
8. Social share buttons (Facebook, LinkedIn, X, Link)
9. Bottom banner — "Ready to learn more?" CTA

## Deviation log
| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Nav / footer | Design-specific header/footer in HTML file | Standard phil.us `<Layout>` | Site wrapper, not page content |
