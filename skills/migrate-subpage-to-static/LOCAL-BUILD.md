# Local production build: stored reference

**This fix is NOT part of the repo and must not be committed.** Netlify builds the site
successfully without it (deploy previews and production run `npm run build` on their own
environment). It exists only so that a human who asks for a **local** production build, for
example to run Gate B (`scripts/parity.mjs --built public`) before pushing, has working code to
hand instead of rediscovering it.

- **Source:** commit `f0299ec` "build fix locally" (Sanjeev Rai, 2026-09-03) on branch `build-fix`.
  It touches exactly three files: `gatsby-node.ts`, `package.json`, `scripts/build-local.sh`.
- **Checked 2026-10-13:** the two tracked-file hunks below apply cleanly to `feat/static-sub-pages`
  (`git apply --check`, a dry run that changes nothing). The branch's other commit (`70d9d4f`,
  an earlier pagination implementation) is unrelated and superseded; do not bring it in.
- **Why a local build needs it** (from the commit's own comments): `.nvmrc` pins Node 18.18.0, but
  `isomorphic-dompurify` -> `jsdom` -> `undici` need Node >= 20.19.5; and webpack cannot bundle
  `jsdom` (it reads `default-stylesheet.css` relative to `__dirname`, and `undici` requires
  `node:sqlite`), so the SSR step fails. Treat the externals change and the newer Node as a pair.

## When and how to use it

Only when the user asks for a local build. Do not apply it for any other reason, and never
commit it. The user's rule applies: ask before any state-changing git command.

1. Add the **externals hunk** (section 1) to `gatsby-node.ts` in the working tree.
2. Create `scripts/build-local.sh` from section 3 and make it executable. The `package.json`
   script (section 2) is optional: run the script directly instead and leave `package.json` alone.
3. Run it (flags below), then run Gate B:
   ```bash
   ./scripts/build-local.sh                 # clean build, takes minutes
   node skills/migrate-subpage-to-static/scripts/parity.mjs --all-migrated --built public
   ```
4. **Remove everything afterwards** and confirm `git status` shows only the intended changes:
   reverse the `gatsby-node.ts` hunk (`git apply -R` with the section 1 diff, which reverses only
   that hunk and is safe even if the file has other edits), delete `scripts/build-local.sh`.
   `public/` and `.cache/` are git-ignored build output; leave or `gatsby clean` them.

**Scratch copy instead of the working tree.** When a `gatsby develop` is running (it restarts when
`gatsby-node.ts` changes and `gatsby clean` wipes its `.cache`), build a copy: copy
`git ls-files -co --exclude-standard`, add the git-ignored `.env.production`, symlink `node_modules`,
apply the section 1 hunk and drop in section 3 there, and run the script in that directory. Delete
the copy (including its `.env.production`) afterwards. One side effect: `gatsby clean` follows the
`node_modules` symlink and removes the shared `node_modules/.cache/{babel-loader,terser-webpack-plugin}`,
which are caches and are rebuilt on the next run.

Script flags: `--no-clean` reuses `.cache` (much faster), `--serve` serves `public/` on
`http://localhost:9292` after building, `NODE_VERSION=20.20.0 ./scripts/build-local.sh` forces a
version. With no flag it prefers the highest installed Node 22, then 20, that is >= 20.19.5. It
sets that Node for its own process only; `.nvmrc` and your shell are untouched.

On this machine (2026-10-13) nvm has v20.20.0, v22.18.0, v22.22.2 and v22.23.2 installed, so the
script would pick 22.23.2. Check with `ls ~/.nvm/versions/node`.

The build reads the Contentful environment from `.env.production`. The 2026-09-16 Handover entry
noted that file points at a non-`master` environment, so check which one is active before
treating build output as production-equivalent. Migrated pages do not depend on Contentful, but
the surrounding site does.

## 1. `gatsby-node.ts`: webpack externals (required)

Inside `onCreateWebpackConfig`, in the `stage === 'build-html' || stage === 'develop-html'` block.

```diff
diff --git a/gatsby-node.ts b/gatsby-node.ts
index c72b843..1d37830 100644
--- a/gatsby-node.ts
+++ b/gatsby-node.ts
@@ -90,6 +90,24 @@ export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ act
 
     if (stage === 'build-html' || stage === 'develop-html') {
         actions.setWebpackConfig({
+            // `isomorphic-dompurify` pulls in `jsdom` for server-side sanitization, and jsdom
+            // cannot survive being bundled by webpack:
+            //   - it reads `browser/default-stylesheet.css` relative to `__dirname`, which
+            //     webpack rewrites, producing ENOENT at render time;
+            //   - its `undici` dependency has a `require('node:sqlite')` that webpack cannot
+            //     resolve, which breaks the SSR bundle outright.
+            // Leaving both external means Node `require`s them from node_modules at render
+            // time, so `__dirname` and lazy builtin resolution behave normally.
+            externals: [
+                ({ request }, callback) => {
+                    if (request === 'isomorphic-dompurify' || request === 'jsdom') {
+                        callback(null, `commonjs ${request}`);
+                        return;
+                    }
+
+                    callback();
+                },
+            ],
             module: {
                 rules: [
                     {
```

## 2. `package.json`: npm script (optional)

```diff
diff --git a/package.json b/package.json
index 3908b64..24a9749 100644
--- a/package.json
+++ b/package.json
@@ -10,6 +10,7 @@
     "test:watch": "jest --watch",
     "test:coverage": "jest --coverage",
     "build": "gatsby clean && gatsby build",
+    "build:local": "./scripts/build-local.sh",
     "clean": "gatsby clean",
     "start": "gatsby develop -p 3000",
     "serve": "gatsby serve -p 9292",
```

## 3. `scripts/build-local.sh` (required, verbatim; save with mode 0755)

```bash
#!/usr/bin/env bash
#
# Build the site locally using a Node version new enough for the current
# dependency tree, without changing anything permanent.
#
# WHY THIS EXISTS
#   .nvmrc pins Node 18.18.0, but `isomorphic-dompurify` -> `jsdom` -> `undici`
#   now all require Node >= 20.19.5. On Node 18 the build dies in the SSR stage
#   with a misleading `node:sqlite` webpack error.
#
# WHAT IT DOES NOT TOUCH
#   .nvmrc, .tool-versions, your nvm default alias, or your shell. The Node
#   version is scoped to this script's own PATH and disappears when it exits.
#
# USAGE
#   ./scripts/build-local.sh                 # clean build, same as CI
#   ./scripts/build-local.sh --no-clean      # reuse .cache, much faster
#   ./scripts/build-local.sh --serve         # build, then serve on :9292
#   NODE_VERSION=20.20.0 ./scripts/build-local.sh    # force a version
#
set -euo pipefail

MIN_NODE="20.19.5"
# Majors in preference order. 22 and 20 are the ones verified against this
# project; newer majors are not selected automatically because Gatsby 5.13 has
# not been validated on them.
PREFERRED_MAJORS=(22 20)

NVM_NODE_DIR="${NVM_DIR:-$HOME/.nvm}/versions/node"

RUN_CLEAN=1
RUN_SERVE=0

for arg in "$@"; do
  case "$arg" in
    --no-clean|--fast) RUN_CLEAN=0 ;;
    --serve) RUN_SERVE=1 ;;
    -h|--help) awk 'NR > 1 { if ($0 !~ /^#/) exit; sub(/^# ?/, ""); print }' "$0"; exit 0 ;;
    *) echo "error: unknown option '$arg' (try --help)" >&2; exit 2 ;;
  esac
done

# Return 0 when version $1 >= version $2.
version_ge() {
  [ "$(printf '%s\n%s\n' "$2" "$1" | sort -V | head -n1)" = "$2" ]
}

# Highest installed version within major $1 that also satisfies MIN_NODE.
highest_in_major() {
  local major="$1" dir version best=""
  for dir in "$NVM_NODE_DIR"/v"$major".*; do
    [ -x "$dir/bin/node" ] || continue
    version="${dir##*/v}"
    version_ge "$version" "$MIN_NODE" || continue
    if [ -z "$best" ] || version_ge "$version" "$best"; then
      best="$version"
    fi
  done
  [ -n "$best" ] || return 1
  printf '%s' "$best"
}

resolve_node_version() {
  # An explicit request wins, but still has to exist and be new enough.
  if [ -n "${NODE_VERSION:-}" ]; then
    local requested="${NODE_VERSION#v}"
    if [ ! -x "$NVM_NODE_DIR/v$requested/bin/node" ]; then
      echo "error: Node $requested is not installed. Run: nvm install $requested" >&2
      return 1
    fi
    if ! version_ge "$requested" "$MIN_NODE"; then
      echo "error: Node $requested is older than the required $MIN_NODE." >&2
      return 1
    fi
    printf '%s' "$requested"
    return 0
  fi

  local major found
  for major in "${PREFERRED_MAJORS[@]}"; do
    if found="$(highest_in_major "$major")"; then
      printf '%s' "$found"
      return 0
    fi
  done

  echo "error: no installed Node >= $MIN_NODE in a supported major (${PREFERRED_MAJORS[*]})." >&2
  echo "       Install one with: nvm install 22" >&2
  if [ -d "$NVM_NODE_DIR" ]; then
    echo "       Currently installed: $(ls "$NVM_NODE_DIR" | tr '\n' ' ')" >&2
  else
    echo "       No nvm installation found at $NVM_NODE_DIR" >&2
  fi
  return 1
}

if [ ! -d "$NVM_NODE_DIR" ]; then
  echo "error: expected nvm's node directory at $NVM_NODE_DIR" >&2
  echo "       Set NVM_DIR if your nvm lives elsewhere." >&2
  exit 1
fi

NODE_TO_USE="$(resolve_node_version)"

# Scope the version to this process only. Nothing outside it is affected.
export PATH="$NVM_NODE_DIR/v$NODE_TO_USE/bin:$PATH"

cd "$(dirname "$0")/.."

echo "==> Node $(node -v) (temporary; .nvmrc still says $(tr -d '\n' < .nvmrc))"
echo "==> Project $(pwd)"

if [ "$RUN_CLEAN" -eq 1 ]; then
  echo "==> gatsby clean"
  npx --no-install gatsby clean
else
  echo "==> skipping clean, reusing .cache"
fi

echo "==> gatsby build"
npx --no-install gatsby build

echo
echo "==> Build succeeded. Output is in ./public"

if [ "$RUN_SERVE" -eq 1 ]; then
  echo "==> Serving on http://localhost:9292 (Ctrl+C to stop)"
  npx --no-install gatsby serve -p 9292
else
  echo "    Preview it with: ./scripts/build-local.sh --serve"
fi
```
