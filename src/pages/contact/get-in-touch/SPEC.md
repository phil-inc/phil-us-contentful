# SPEC — /get-in-touch (Get in Touch)

## Scope
New static page — no Contentful.

## Route
`/get-in-touch`

## Layout
Shared Layout (header + footer).

## Form
HubSpot v2 embed via `HubSpotFormV2` component:
- Portal ID: `20880193`
- Form ID: `d58c1cad-ced8-4002-9d00-ba01deada3f3`
- Region: `na1`

## Responsive
Same as `/hcp-support`.

## Deviation log

| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| HubSpot CSS overrides | Inline `<style>` in HTML | CSS module scoped to `.formWrap` | CSS modules pattern used across codebase |
