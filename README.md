# Phil.us Marketing Website

Marketing website for [phil.us](https://phil.us), built with Gatsby 5, Contentful, and Mantine v7. Hosted on Netlify.

> For full architecture details, content model, and conventions, see [CONTEXT.md](./CONTEXT.md).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Gatsby 5.13.6 / React 18.3.1 / TypeScript 5.5.3 |
| CMS | Contentful (GraphQL at build time) |
| UI | Mantine 7.6.0 |
| Styling | CSS Modules + PostCSS |
| Testing | Jest 30 + ts-jest |
| Hosting | Netlify |
| Package Manager | Yarn |

## Getting Started

### Prerequisites

- Node.js 18.18.0 (see `.nvmrc`)
- Yarn
- Contentful credentials (request from Phil team)

### Setup

```bash
# Clone
git clone git@github.com:phil-inc/phil-us-contentful.git
cd phil-us-contentful

# Use correct Node version
nvm use

# Install dependencies
yarn install

# Create env file — copy from .env.example or set manually:
# CONTENTFUL_SPACE_ID=<from Contentful API keys>
# CONTENTFUL_ACCESS_TOKEN=<from Contentful API keys>
# CONTENTFUL_ENVIRONMENT=<develop|master|stage>
cp .env.example .env.development  # if .env.example exists, otherwise create manually

# Start dev server
yarn start
```

Open [http://localhost:3000](http://localhost:3000).

### Getting Contentful Credentials

1. Log in to [Contentful](https://app.contentful.com)
2. Select the target environment (top-right dropdown)
3. Go to **Settings → API keys**
4. Select the API key for your environment
5. Copy `Space ID` → `CONTENTFUL_SPACE_ID`
6. Copy `Content Delivery API - access token` → `CONTENTFUL_ACCESS_TOKEN`
7. Go to **Settings → Environments** for the `CONTENTFUL_ENVIRONMENT` value

## Scripts

| Command | Description |
|---|---|
| `yarn start` | Start dev server (localhost:3000) |
| `yarn build` | Production build |
| `yarn serve` | Serve production build locally |
| `yarn clean` | Clear Gatsby cache (run after Contentful changes) |
| `yarn test` | Run tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:coverage` | Run tests with coverage |

## Branching Strategy

```
main (production) → develop (integration) → feature/<name> or fix/<name>
```

| Git Branch | Contentful Environment | Netlify |
|---|---|---|
| `main` | `master` | Production deploy |
| `develop` | `develop` | Preview deploy |
| `feature/*` / `fix/*` | `develop` | Preview deploy |

## Architecture Overview

Pages are generated at build time from Contentful data via 5 strategy functions called from `gatsby-node.ts`. Each Contentful `Page` entry has a `title` that maps to a Gatsby template via `templateFactory`. The default template (`page.tsx`) renders an array of sections, each dispatched by `Section.tsx` to the appropriate component based on `sectionType`.

```
Contentful Page → gatsby-node.ts → templateFactory → Template → Section.tsx → Component
```

See [CONTEXT.md](./CONTEXT.md) for the full content model, template mapping, section types, and component conventions.

## Contentful Workflow

- **Always run `yarn clean` after making changes in Contentful** — Gatsby caches data aggressively.
- When working locally with Contentful, clone the `master` environment to create a new one. Assign it to the `master` alias once changes are verified.
- Changes merged to `main` reflect in the `master` Contentful environment (production).

## GraphQL Explorer

Available at [http://localhost:3000/___graphql](http://localhost:3000/___graphql) during development.

## Documentation

- [CONTEXT.md](./CONTEXT.md) — Full architecture, content model, conventions, and gotchas for AI-assisted development
- [Marketing-Phil Documentation](https://docs.google.com/document/d/1bud4I2aCPJBOtauzsQEWD6uc_Q0J6XW_g6_X68FvTVQ/edit?usp=sharing) — Original team documentation
