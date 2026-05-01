# GTN Landing Page — Build Spec

## Routes

- `/gtn` → new static landing page (file-based: `src/pages/gtn/index.tsx`)
- `/gtn/calculator` → existing ROI calculator (Contentful slug changed from `gtn` to `gtn/calculator`)

## Layout

Uses shared `Layout` component (full header/footer). Two-column grid:
- **Left**: editorial content (hero, stats, benchmarks, opportunity cards, pull quote, CTA banner)
- **Right**: sticky form rail with HubSpot embed

Collapses to single column on mobile (≤1080px), form becomes static.

## Components (all in `src/components/common/`)

| Component | Props | Notes |
|---|---|---|
| `Eyebrow` | `text: string` | Uppercase label with left dash line |
| `StatBanner` | `label: string`, `stats: { value: number, suffix?: string, decimals?: number, label: string, sublabel?: string, highlight?: boolean }[]` | Green card, animated count-up on scroll via IntersectionObserver |
| `CheckList` | `items: { title: string, description: string }[]` | Green checkmark circles, hover: scale + color shift |
| `OpportunityCard` | `tag: string`, `title: string`, `description: string`, `visual?: ReactNode`, `spotlight?: boolean`, `bigNumber?: { value: number, suffix: string }` | Hover: lift + shadow + border color. Spotlight variant: green bg, big animated number |
| `PullQuote` | `quote: string`, `author: string`, `role?: string` | Left green border, quote mark |
| `CtaBanner` | `title: string`, `description: string`, `buttonText: string`, `buttonHref: string` | Dark green bg, decorative watermark, hover on button |
| `StickyFormCard` | `eyebrow: string`, `title: string`, `description: string`, `portalId: string`, `formId: string`, `onSubmit: () => void` | Wraps `HubspotFormV2`, CSS overrides for design match |

Each component: PascalCase directory, `.tsx` + `.module.css`.

## Form Behavior

1. `StickyFormCard` embeds `HubspotFormV2` with portal/form IDs (from existing Contentful modal config)
2. `onFormSubmitted` callback: sets `ROI_EMAIL_SUBMITTED` in sessionStorage → `navigate("/gtn/calculator")`
3. Calculator page sees session key → skips its own modal → renders immediately

## Animations

- **Count-up numbers**: IntersectionObserver triggers on `StatBanner` stats and `OpportunityCard` spotlight number. Ease-out cubic, ~1.4s duration.
- **Hover effects** (CSS only):
  - OpportunityCard: `translateY(-4px)`, box-shadow, border-color change
  - CheckList items: checkmark `scale(1.08)` + darken, title color change
  - Buttons: bg/color swap

## Assets

Copy from design export to `src/assets/images/`:
- `p-dots-dark.png` — StatBanner watermark
- `p-dots-light.png` — CtaBanner watermark

Inline SVGs for OpportunityCard visuals (dot grids, bar charts, circle chains) — passed as `visual` prop.

## Contentful Change Required

Change GTN page slug from `gtn` to `gtn/calculator`.

### Temporary slug override (remove after Contentful change)

Until the Contentful slug is updated, a one-line override in `src/strategies/GenerateMainPages.ts` → `handleRegularPage` forces the GTN calculator to `/gtn/calculator`:

```typescript
const slug = page.title === "GTN" ? "gtn/calculator" : page.slug;
```

**TODO**: Once the Contentful slug is changed to `gtn/calculator`, revert this line back to `const slug = page.slug;`.

## ADR

See `docs/adr/0001-gtn-form-hubspot-embed.md` for the HubSpot embed decision.
