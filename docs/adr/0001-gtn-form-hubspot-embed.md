# GTN landing page form uses HubSpot embed, not a custom form

The GTN landing page (`/gtn`) has a sticky lead capture form in the right rail. We embed the same HubSpot form used elsewhere in the project (via `HubspotFormV2` + `@aaronhayes/react-use-hubspot-form`) and style it with CSS overrides to match the design, rather than building a custom form that submits to HubSpot's Forms REST API.

## Considered Options

- **HubSpot embed + CSS overrides (chosen)**: HubSpot controls form fields, validation, and submission. We override styles via CSS Modules. Lead routing, workflows, and analytics stay in HubSpot with zero custom integration code.
- **Custom form + HubSpot Forms API**: Full control over markup for pixel-perfect design match. Requires managing portal/form IDs, API submission, error handling, and keeping field definitions in sync with HubSpot manually.

## Consequences

- The form's field layout is controlled by HubSpot — if the HubSpot form definition changes, the page changes. This is a feature (marketing can update fields without a deploy) and a risk (styling may break if fields are added).
- CSS overrides for HubSpot forms are fragile — HubSpot can change their embed markup. The project already accepts this risk (`src/assets/css/hubspot-form.css` exists for this purpose).
- A future reader seeing heavy CSS overrides on a HubSpot embed should understand this was deliberate — not a shortcut.
