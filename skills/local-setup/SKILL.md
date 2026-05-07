---
name: local-development-setup
description: How to set up and run the phil.us marketing site locally. Use when setting up the dev environment, troubleshooting build errors, or starting the Gatsby dev server.
---

# Local Development Setup

When the user asks to set up or run the project locally, execute these steps:

## 1. Switch to Node 18.18.0

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 18.18.0 || nvm install 18.18.0
```

## 2. Ensure `.env.development` exists

Check if `.env.development` exists in the project root. If not, ask the user for their Contentful credentials and create it with:

```
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_SPACE_ID=<ask user>
CONTENTFUL_ACCESS_TOKEN=<ask user>
```

Do not hardcode credentials. Always ask the user.

## 3. Ensure `.yarnrc.yml` exists with `nodeLinker: node-modules`

Gatsby 5 does not work with Yarn PnP. Before installing, check that `.yarnrc.yml` exists in the project root with:

```
nodeLinker: node-modules
```

If the file is missing, create it with that content.

## 4. Install dependencies

```bash
yarn install
```

## 5. Kill existing process on port 3000

```bash
lsof -ti :3000 | xargs kill -9 2>/dev/null
```

## 6. Start the dev server

Run the dev server in the background so you don't block on it:

```bash
nohup yarn start > /tmp/gatsby-dev.log 2>&1 &
```

Then print the local URL to indicate success:

```
Dev server starting at http://localhost:3000
```

Do NOT wait for the server to finish starting. Just print the URL and move on.

## Known Issues

### Yarn PnP + Gatsby compatibility

Gatsby 5 does not work with Yarn PnP mode. If you see:

```
TypeError [ERR_INVALID_ARG_TYPE]: The "list[1]" argument must be an instance of Buffer or Uint8Array
```

Fix: ensure `.yarnrc.yml` has `nodeLinker: node-modules` and re-run `yarn install`.

### pdfjs-dist worker path

pdfjs-dist v5 uses `.mjs` extensions. If the dev build fails with:

```
Can't resolve 'pdfjs-dist/build/pdf.worker.min.js'
```

Update the import in `gatsby-browser.tsx` to use `pdf.worker.min.mjs` instead of `pdf.worker.min.js`.

### Node version mismatch

The project requires Node 18. If Gatsby starts with a different Node version (e.g., v20), you may get a blank page with 404s on JS/CSS bundles. Always confirm with `node --version` before running.

### Port conflicts

The dev server runs on port 3000. If that port is in use, kill the existing process first:

```
lsof -ti :3000 | xargs kill -9
```

### Contentful data

When Contentful content changes, run `yarn clean` before `yarn start` to fetch fresh data.
