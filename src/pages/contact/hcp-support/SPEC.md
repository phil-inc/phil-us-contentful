# SPEC — /hcp-support (HCP Support)

## Scope
New static page — no Contentful.

## Route
`/hcp-support`

## Layout
Shared Layout (header + footer).

## Form
HubSpot `hs-form-frame` embed:
- Script: `https://js.hsforms.net/forms/embed/48612742.js`
- Portal ID: `48612742`
- Form ID: `7a894767-6fea-4780-83bd-489380512a48`
- Region: `na1`

Script loaded client-side via `useEffect` for SSR compatibility.

## Responsive
- Padding reduced at ≤720px
- 2-col form fields stack to 1-col at ≤640px (handled by HubSpot's own responsive behavior)

## Deviation log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| HubSpot CSS overrides | Inline `<style>` in HTML | CSS module scoped to `.formWrap` | CSS modules pattern used across codebase |
