# Phil.us Marketing Website — AI Context

## Overview

Marketing website for [phil.us](https://phil.us). Gatsby 5 SSG + Contentful CMS + Mantine v7 UI. Hosted on Netlify.

> **Migration in progress:** New pages are code-driven (file-based in `src/pages/`), not Contentful-driven. Existing Contentful pages remain but new content should be managed in code.

## Skills

Reusable workflows for common tasks live in `skills/`:

| Skill | Description |
|---|---|
| [`implement-from-design`](./skills/implement-from-design/SKILL.md) | Implement or update any page/component from a design export |
| [`update-copy-from-design`](./skills/update-copy-from-design/SKILL.md) | Update existing page copy from a design |
| [`grill-me`](./skills/grill-me/SKILL.md) | Grill relentlessly until 100% clarity on a plan |
| [`local-setup`](./skills/local-setup/SKILL.md) | Dev environment setup |

## Tech Stack

- **Framework**: Gatsby 5.13.6, React 18.3.1, TypeScript 5.5.3
- **CMS**: Contentful (gatsby-source-contentful 8.13.2), queried via GraphQL at build time
- **UI**: Mantine 7.6.0 (core, hooks, form, carousel)
- **Styling**: CSS Modules + PostCSS (postcss-preset-mantine, postcss-simple-vars)
- **Testing**: Jest 30 + ts-jest (utility tests only, in `src/__tests__/utils/`)
- **Hosting**: Netlify with gatsby-adapter-netlify
- **Package Manager**: Yarn
- **Node**: 18.18.0 (.nvmrc)

## Directory Structure

```
├── gatsby-node.ts              # Page generation — calls 5 strategy functions
├── gatsby-config.ts            # Gatsby plugins, Contentful source config
├── gatsby-browser.tsx          # MantineProvider wrapper, PDF.js worker
├── gatsby-ssr.tsx              # GTM script, resource hints, Mantine ColorSchemeScript
├── netlify.toml                # Edge functions, redirects, headers, env mapping
├── netlify/edge-functions/     # Career listings API, Gemini AI chat
├── src/
│   ├── strategies/             # 5 page generation strategies (gatsby-node.ts)
│   ├── factories/              # templateFactory (title→template), redirectFactory
│   ├── templates/              # Gatsby page templates (page.tsx, blog.tsx, career.tsx, etc.)
│   ├── pages/                  # File-based pages (404, channel-comparision, addyi/, insights/search)
│   ├── components/
│   │   ├── section/            # Section.tsx dispatcher + BasicSection, ReferencedSection, SectionGroup
│   │   ├── common/             # ~60 shared UI components
│   │   ├── text-text-columns/  # Text & Text Columns component
│   │   ├── LeftRigtContainer/  # Left-right layout
│   │   ├── Blog/               # Blog components
│   │   ├── ChannelComparision/ # Multi-step comparison form
│   │   ├── Roi/                # ROI calculator
│   │   └── ...                 # Other feature directories
│   ├── layouts/
│   │   ├── Layout/             # AppShell, Header, Footer, theme.ts (Mantine config)
│   │   └── SEO/                # SEO component
│   ├── hooks/                  # useIsSmallDevice, useView, useSessionModal, useInternalPaths, etc.
│   ├── contexts/               # PageContext, HeaderProvider, ContactFormContext
│   ├── types/                  # TypeScript types for Contentful models
│   ├── constants/              # Page titles, routes, section config, analytics
│   ├── enum/                   # ProgramType, INPUT_TYPE, BASIC_SECTION_COMPONENTS
│   ├── config/                 # Feature flags, ROI assumptions
│   ├── hoc/                    # withBasicSectionSwitch
│   ├── utils/                  # Link resolution, analytics, formatting, ROI calculations
│   ├── assets/                 # Global CSS, static images
│   ├── api/                    # Gatsby serverless functions
│   ├── @types/                 # Custom type declarations (css.d.ts, svg.d.ts)
│   └── __tests__/              # Jest tests (utils only)
```

## Architecture: Page Generation

### Strategy Pattern (gatsby-node.ts)

Five strategies in `src/strategies/` generate all pages:

| Strategy | Contentful Query | Route Pattern |
|---|---|---|
| `GenerateMainPages` | `allContentfulPage` | `/{slug}` — uses `templateFactory` to pick template by page title |
| `GenerateStaticPages` | `allContentfulResource` (where `generateStaticPage: true`) | `/{section}/{slug}` or `/{slug}` |
| `GenerateDownloadableResourcePages` | `allContentfulDownloadableResource` | `/{slug}` |
| `GenerateEventRegistrationPages` | `allContentfulEventRegistration` | `/{slug}` |
| `GenerateCaseStudyPages` | `allContentfulCaseStudy` | `/insights/case-studies/{slug}` |

### Template Factory (src/factories/templateFactory.ts)

Maps Contentful page `title` to template file:

```
Careers        → templates/career.tsx
Leadership     → templates/leadership.tsx
Insights       → templates/resources.tsx (paginated sub-pages)
Contact        → templates/contact.tsx
Demo Page      → templates/demo-book/demoBook.template.tsx
DTPChat        → templates/dtpChat/dtpChat.tsx
GTN            → templates/roi/roi.tsx
CaseStudy      → templates/case-study.tsx
Blog           → templates/blog.tsx
EventRegistration → templates/event-registration.tsx
DownloadableResource → templates/downloadable-resource.tsx
(default)      → templates/page.tsx
```

### Section Rendering (src/components/section/Section.tsx)

The default `page.tsx` template iterates a page's `sections[]` and renders each via `Section.tsx`, which switches on `sectionType`:

| sectionType | Component | Notes |
|---|---|---|
| `Basic Section` | `BasicSection` | Rich text + image. `withBasicSectionSwitch` HOC swaps variants by `componentType`. |
| `Referenced Section` | `ReferencedSection` | Renders referenced resources. Layout varies by `referenceType` enum (30+ types). |
| `Text and Text Columns` | `TextAndTextColumns` / `V2` | V2 used for "Our Solution" and "Phil Direct" pages. |
| `Section Group` | `SectionGroup` | Groups sections with shared background. |
| `Text and Text Columns with Footer` | `LeftRightContainer` | Used on resources page. |

## Contentful Content Model

| Model | Purpose | Key Fields |
|---|---|---|
| **Page** | Top-level page | slug, title, displayTitle, description, noindex, sections[] |
| **Section** | Basic section | header, body (rich text), asset, embedForm, stylingOptions, componentType |
| **ReferencedSection** | Section with references | header, references[] (union), referenceType, referenceSecond/Third/Fourth[] |
| **SectionGroup** | Section container | sections[], backgroundImage |
| **Resource** | Blog/article/testimonial | heading, body, asset, author, metadata, generateStaticPage, slug |
| **DownloadableResource** | Gated content | title, slug, asset, hubspotForm |
| **EventRegistration** | Event page | title, slug, speakers, dates, hubspotForm |
| **CaseStudy** | Case study | title, slug, metrics, testimonials, keyTakeaways |
| **Modal** | Page modal | content, trigger |
| **List** | List items | items with icons |
| **Link / Hyperlink** | Links | internal/external references |
| **ButtonGroup** | Button pairs | buttons[] |
| **MediaItem** | Media | youtubeLink, embedForm |

### GraphQL Query Pattern

```graphql
query PageQuery($id: String!) {
  contentfulPage(id: { eq: $id }) {
    title
    slug
    sections {
      ... on ContentfulSection { id, header, body { raw, references { ... } }, sectionType, componentType }
      ... on ContentfulReferencedSection { id, header, referenceType, references { ... } }
      ... on ContentfulSectionGroup { id, sections { ... } }
    }
  }
}
```

Rich text: use `renderRichText` from `gatsby-source-contentful/rich-text` with custom BLOCKS/INLINES options.

## Styling

- **Mantine theme** (`src/layouts/Layout/theme.ts`): breakpoints (xs: 22.5em, sm: 48em, md: 64em, lg: 85em, xl: 120em), brand color `philBranding` (teal/green), fonts Raleway (headings) / Lato (body) / Inter (UI).
- **CSS Modules**: every component has a co-located `.module.css` file.
- **PostCSS**: Mantine breakpoint variables available in CSS via `postcss-simple-vars`.
- **Responsive**: Mantine `visibleFrom`/`hiddenFrom` props, custom hooks (`useIsSmallDevice`, `useIsMediumDevice`, `useIsLaptop`, `useView`).
- **clsx** for conditional class composition.

## Conventions

- **Component naming**: PascalCase directories with matching `.tsx` + `.module.css` (e.g., `Banner/Banner.tsx` + `Banner/banner.module.css`).
- **Imports**: Root-level path aliases — `import X from "components/..."`, `"hooks/..."`, `"utils/..."`, `"types/..."`. Never use relative `../../` paths.
- **Mantine primitives**: Use `Box`, `Container`, `Grid`, `Title`, `Text`, `Button`, `Flex`, `Stack`, `Group`, `Anchor`, etc.
- **Images**: `GatsbyImage` with `gatsbyImageData` from Contentful asset queries.

## Environment Variables

### Build-time (.env.development / .env.production)

- `CONTENTFUL_SPACE_ID` — Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` — Contentful delivery API token
- `CONTENTFUL_ENVIRONMENT` — Contentful environment (master, develop, stage)

### Client-side (GATSBY_ prefix)

- `GATSBY_GTM_ID` — Google Tag Manager
- `GATSBY_LINKEDIN_PARTNER_ID` — LinkedIn Insight tag
- `GATSBY_ZI_PROJECT_KEY` — ZoomInfo tracking
- `GATSBY_MIXPANEL_TOKEN` — Mixpanel analytics
- `GATSBY_FULLSTORY_ORG_ID` — FullStory
- `GATSBY_DEPLOY_URL` — Netlify deploy URL (previews)

## Branch → Contentful Environment Mapping

| Git Branch | Contentful Environment |
|---|---|
| `main` | `master` (production) |
| `develop` | `develop` |
| `feature/*` / `fix/*` | `develop` |

Workflow: `main` → `develop` → `feature/<name>` or `fix/<name>`

## Key Files to Read First

1. `gatsby-node.ts` — page generation entry point
2. `src/factories/templateFactory.ts` — page title → template mapping
3. `src/components/section/Section.tsx` — section type dispatching
4. `src/templates/page.tsx` — default page template (largest, most complex)
5. `src/layouts/Layout/Layout.tsx` — main layout wrapper
6. `src/layouts/Layout/theme.ts` — Mantine theme config
7. `src/types/section.ts` — core TypeScript types for sections
8. `src/constants/page.ts` — page title constants

## Flagged ambiguities

- "GTN page" can mean either the **GTN Landing Page** (static, `/gtn`) or the **GTN Calculator** (Contentful-driven ROI tool, `/gtn/calculator`). Resolved: these are distinct pages. The landing page is the top-of-funnel entry; the calculator is the tool itself.

## Gotchas

1. **Contentful is the source of truth.** Code changes alone won't add pages — you must create corresponding Contentful entries.
2. **Run `yarn clean` after Contentful changes.** Gatsby caches aggressively. Always `yarn clean` then `yarn start` after CMS edits.
3. **Template assignment is by page title, not slug.** `templateFactory` matches on the `title` field. Unmatched titles fall back to `page.tsx`.
4. **`sectionType` drives rendering.** New section types require: update `Section.tsx` switch, create component, add type in Contentful.
5. **`referenceType` on ReferencedSection controls layout.** 30+ types, each renders differently. Check `ReferencedSection.tsx` before adding new ones.
6. **Path aliases are configured.** Import from `components/...`, `hooks/...`, etc. directly.
7. **No `.env.example` exists.** Get Contentful credentials from the Phil team.
8. **The Addyi page (`/addyi/`) is standalone** — own theme, components, assets, not Contentful-driven.
9. **Rich text needs custom renderers.** Always use `renderRichText` with custom BLOCKS/INLINES options. Check existing templates for the pattern.
10. **Netlify env mapping is automatic.** `netlify.toml` maps branches to Contentful environments — don't hardcode.
