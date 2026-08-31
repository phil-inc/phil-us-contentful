# AGENTS.md — phil-us-contentful

Marketing website for [phil.us](https://phil.us). Gatsby 5 SSG + Contentful CMS + Mantine v7, hosted on Netlify.

This file is the operating contract for automated agents working in this repo (PDQ executor, Claude Code, Kiro). Humans: read [README.md](./README.md) and [CONTEXT.md](./CONTEXT.md) instead.

**The two rules that matter most, before anything else:**

1. Many tickets filed against this site are **not code changes** — they are Contentful (CMS) or Ashby edits. Route the ticket before you write code (§3).
2. **`gatsby build` cannot run here.** The build needs Contentful credentials that no agent has. Your verification signal is `npx jest`, not the build (§1).

---

## 0. Read this first

Agents in read-only phases (clarify, plan, review) can read files but cannot run shell commands. Everything you need is a file. Read in this order:

| File | What it gives you | Read it when |
|---|---|---|
| `AGENTS.md` (this file) | Rules, commands, definition of done | Always, first |
| [`CONTEXT.md`](./CONTEXT.md) | Architecture: page generation strategies, template factory, section dispatch, Contentful model, conventions, gotchas — and the note that the site is **migrating off Contentful** (§3) | Always, second |
| [`MARKUP-CONTEXT.md`](./MARKUP-CONTEXT.md) | Page-by-page inventory of the live site and **where each thing is edited** (Contentful vs. code vs. Ashby) | Before deciding the ticket is a code change |
| `src/pages/<route>/SPEC.md` | The per-page spec: route, SEO title/description, layout, data shape, section-by-section content | **Always, before editing any code-driven page.** Most code-driven pages have one. |
| `docs/adr/` | Architecture decision records | When touching something an ADR covers |
| `skills/*/SKILL.md` | Human-driven workflows | See §11 — most are interactive-only |

Do not `grep` blindly for orientation. `CONTEXT.md` names the entry points: `gatsby-node.ts`, `src/factories/templateFactory.ts`, `src/components/section/Section.tsx`, `src/templates/page.tsx`.

---

## 1. Environment and commands

The runtime you get is a Linux container with **Node 20, npm, and git** — no `yarn`, no `bun`, no `nvm`, no browser, and **no Contentful credentials**: `.env.development` is git-ignored, so your clone does not have it and nothing from the Netlify environment is set.

`gh` is installed but **may not be authenticated** — the GitHub token is available to `git` through a credential helper, not to `gh`. Push with `git`. If `gh` fails on auth, do not try to log it in or hunt for a token: report the branch you pushed and let the orchestrator open the PR.

Humans use Yarn (`yarn.lock` is the committed lockfile) on Node 18.18.0. Node 20 is fine for tests and typechecking; do not try to install `nvm` or switch Node versions.

### Install

```bash
npm install --legacy-peer-deps --no-audit --no-fund
```

WHEN installing dependencies:
- The `--legacy-peer-deps` flag is **required**. Plain `npm install` fails with `ERESOLVE` (`gatsby-plugin-preload-fonts` declares a `gatsby@^3` peer against this repo's `gatsby@^5`). This is a known, accepted upstream conflict — do not "fix" it, do not upgrade or remove the plugin, do not open a ticket about it.
- npm writes a `package-lock.json`. **Delete it before committing.** This repo's lockfile is `yarn.lock`; nothing enforces this automatically, so it is on you to check your own diff.
- Never modify `yarn.lock` or `bun.lockb`. You cannot regenerate them without Yarn/Bun.

### What you can and cannot run

| Command | Works headless | Use it for |
|---|---|---|
| `npx jest` | ✅ ~15s | **The verification signal.** All unit tests. |
| `npx jest src/__tests__/utils/foo.test.ts` | ✅ | Iterating on one test |
| `npx tsc --noEmit` | ⚠️ see below | Typechecking your own changes |
| `npm run build` / `gatsby build` | ❌ | Nothing. Requires `CONTENTFUL_SPACE_ID` + `CONTENTFUL_ACCESS_TOKEN`. It will fail, and it will burn your entire time budget. |
| `npm start` / `gatsby develop` | ❌ | Nothing. Same reason, plus it never exits. |
| `npm run lint` / `npm run format` | ❌ | Nothing. `.eslintrc` and `.prettierrc.js` are **empty stub files**. There is no configured linter. Do not add one, and do not run `prettier --write` across the repo — it will produce a diff of hundreds of untouched files. |

WHEN running `npx tsc --noEmit`:
- **It always exits non-zero on a clean checkout.** Verified on a fresh install, `main` at rest emits exactly three pre-existing errors and exit code 2:
  ```
  error TS2688: Cannot find type definition file for 'dompurify'.
  error TS2688: Cannot find type definition file for 'mixpanel-browser'.
  error TS2688: Cannot find type definition file for 'react-pdf'.
  ```
  These come from three deprecated `@types/*` stub packages picked up implicitly via `typeRoots` in `tsconfig.json`. They are a known repo condition, **not your bug and not a review finding.**
- Read the output, ignore those three lines, and fix only errors in files **you changed**. A non-zero exit from `tsc` alone does not mean your change is broken — `npx jest` is the pass/fail signal.
- Do not "fix" this by editing `tsconfig.json` or removing those devDependencies unless that is literally the ticket.

### Time budget

The execution timeout is 40 minutes for the whole task, including install (~2-4 min). Budget accordingly: read narrowly, change narrowly, test narrowly. If you are 30 minutes in and not converging, stop and report `blocked` with what you learned — a clear blocker is worth more than a half-finished branch.

---

## 2. Definition of done

**Acceptance criteria must be checkable in this environment.** WHEN proposing or approving acceptance criteria, never write one that depends on a successful Gatsby build, a rendered page, or a browser — nothing downstream can ever satisfy it, and a later stage will block on it forever. Write *"`npx jest` passes and the new entry is present in the data module"*, not *"the build passes and the page shows the card"*. Visual confirmation belongs to the human on the Netlify deploy preview and must be stated as such, not as a criterion an agent can meet.

BEFORE reporting an implementation task complete:

- [ ] `npx jest` passes — full suite, not just your new file. Run it **once on the base commit before you change anything** and compare counts, so you know your branch added tests rather than broke them
- [ ] `npx tsc --noEmit` shows no **new** errors in files you touched (the three `TS2688` errors are pre-existing — see §1)
- [ ] Every acceptance criterion **that is testable under §6** has a test that fails on the base commit and passes on your branch. Criteria about how a page looks or renders are **not** testable here — name them in the PR body for the human to check on the deploy preview, and do not invent a test to cover them
- [ ] No `package-lock.json`, no `node_modules/`, no `.cache/`, no `public/` in the diff
- [ ] No new runtime dependency (§7)
- [ ] `MARKUP-CONTEXT.md` updated if you changed a route, an internal link, or a hub card (§8)
- [ ] The page's `SPEC.md` updated if you changed its route, SEO strings, data shape, or sections (§4)
- [ ] The diff contains only what the approved plan asked for

---

## 3. Route the ticket before you write code

This is the highest-value rule in this file. The most common failure mode on this repo is an agent hardcoding into React something that marketing edits in the CMS.

Every change to phil.us lands in exactly one of three places:

| Destination | Who changes it | Agent action |
|---|---|---|
| **Contentful (CMS)** | Marketing, directly | **BLOCK.** Do not implement. Report that this is a CMS edit and no code change is needed. |
| **Code (this repo)** | Engineering, via PR | Implement. |
| **Ashby (careers ATS)** | Hiring, in Ashby | **BLOCK.** Job postings are pulled live; they are not in this repo. |

WHEN a ticket asks to change copy, an image, or a section on a page:
1. Find the page in `MARKUP-CONTEXT.md`. It states, page by page, whether that page is code-driven or Contentful-driven.
2. Code-driven pages live under `src/pages/` as `.tsx` files (e.g. `src/pages/press/`, `src/pages/solution/`, `src/pages/approach/`, `src/pages/patients/`). If the copy is in a `.tsx` or `src/data/*.ts` file, it is a code change.
3. Contentful-driven pages render through `src/templates/*` from `allContentfulPage` data. Their copy exists in **no file in this repo**. If you cannot find the string in the codebase, that is the answer: it is a CMS edit. **Do not create a code-driven page to satisfy a copy ticket.**

### The site is migrating off Contentful — code wins where they overlap

New pages are built in code under `src/pages/`. Contentful pages remain, but the direction of travel is one-way: **never create a new Contentful-driven page**, and never propose moving a code page back into the CMS.

Where a code page and a Contentful entry claim the same route, the code page wins — by an explicit kill list in `handleRegularPage` at `src/strategies/GenerateMainPages.ts`:

```ts
// /patients is served by the static file-based page at src/pages/patients/index.tsx
if (page.slug === "patients") return;
```

The Contentful entry still exists; the build simply refuses to make a page from it. Consequences you must respect:

- **That guard list is the authoritative answer on who owns a route.** Read it before `MARKUP-CONTEXT.md`, which is hand-maintained and says so itself ("This file … lags behind the site"). If a slug is guarded, the page is code — no matter what any doc says.
- **Never tell anyone to edit a guarded page in Contentful.** They would edit an entry that renders nowhere and see no change on the live site. For a guarded route, a copy change is a code ticket.
- **Never delete a guard.** Some guard routes that no longer exist (`solution`, `solution/core`). Removing one lets a stale Contentful entry resurrect the page and silently defeat the `netlify.toml` redirect.
- **Creating a new code page at a route Contentful already has? Add a guard in the same PR**, with a comment naming the file that now serves it — match the existing style. Without it, both try to claim the path.

WHEN a ticket touches a hub page (a page showing a list of cards that link elsewhere — `/press`, `/insights`, `/resources`):
- Adding, removing, reordering, or retitling **a card** is a **code** change (the list is hardcoded, e.g. `src/pages/press/_data.ts`).
- Changing the **destination page** the card links to is usually a **Contentful** change.
- A request containing a destination URL is still a code ticket if the ask is "add a card". Do not follow the URL and start editing the destination.

WHEN a ticket touches `/terms/`, `/privacy/`, `/hipaa/`, or `/annex/`:
- These are ordinary code changes, **but the copy requires legal review before shipping.** Implement if asked, and state prominently in the PR description that legal sign-off is required before merge.

WHEN the routing is genuinely ambiguous:
- Ask during clarification. Do not guess. "Which page is this on, and is that page Contentful-driven?" is a legitimate clarifying question with a recommended answer.

---

## 4. Where things live

| Change | File(s) |
|---|---|
| New code-driven page | `src/pages/<route>/index.tsx` + co-located `*.module.css` + `SPEC.md` |
| Page content for a code-driven page | `src/data/*.ts` or a `_data.ts` next to the page |
| The spec for a code-driven page | `src/pages/<route>/SPEC.md` |
| Which template a Contentful page uses | `src/factories/templateFactory.ts` (matches on page **title**, not slug) |
| Which pages get generated | `src/strategies/` (5 strategies, called from `gatsby-node.ts`) |
| Suppressing a Contentful page so a code page owns the route | `handleRegularPage` in `src/strategies/GenerateMainPages.ts` (§3) |
| Section rendering | `src/components/section/Section.tsx` (switches on `sectionType`) |
| Shared UI | `src/components/common/` |
| Internal link resolution | `src/utils/getLink.ts` — including `REMOVED_PAGE_REDIRECTS` for renamed/moved pages |
| Route constants | `src/constants/routes.ts`, `src/constants/page.ts` |
| Redirects / headers / edge function routes | `netlify.toml` |
| Theme, breakpoints, fonts | `src/layouts/Layout/theme.ts` |
| SEO metadata | `src/layouts/SEO/` |
| Edge functions (careers API, Gemini chat) | `netlify/edge-functions/` |

WHEN you change a code-driven page:
- Read its `SPEC.md` first. It is the stated intent for that page — route, SEO strings, data shape, section content. If the ticket contradicts the spec, that is a clarification question, not something to silently resolve.
- Update `SPEC.md` in the same commit if you changed anything it documents (route, SEO title/description, data shape, sections). A stale spec is worse than none.

WHEN you move or rename a page:
1. Move the directory under `src/pages/`.
2. Update **every** internal link to the old path (search the whole repo, including `src/data/`, `src/constants/`, component files, and `MARKUP-CONTEXT.md`).
3. Add 301 redirects in `netlify.toml` for the old path — both with and without the trailing slash.
4. Add the old slug to `REMOVED_PAGE_REDIRECTS` in `src/utils/getLink.ts`, so Contentful entries still pointing at the old page resolve client-side.
5. Add a test that the old path no longer appears anywhere in `src/`.

---

## 5. Code conventions

- **Imports use root path aliases** — `import X from "components/..."`, `"hooks/..."`, `"utils/..."`, `"types/..."`, `"constants/..."`. Never write relative `../../` paths across directories.
- **Components**: PascalCase directory with a matching `.tsx` and a co-located lowercase `*.module.css` (e.g. `Banner/Banner.tsx` + `Banner/banner.module.css`). Never inline styles for anything a CSS module can express.
- **UI primitives are Mantine** — `Box`, `Container`, `Grid`, `Title`, `Text`, `Button`, `Flex`, `Stack`, `Group`, `Anchor`. Do not hand-roll a component Mantine already provides, and do not introduce another UI library.
- **Responsive**: Mantine `visibleFrom`/`hiddenFrom` and the hooks in `src/hooks/` (`useIsSmallDevice`, `useView`, …). Breakpoints come from `theme.ts` — do not hardcode pixel media queries that duplicate them.
- **Images**: `GatsbyImage` with `gatsbyImageData`. Do not add raw `<img>` for Contentful assets.
- **Rich text**: `renderRichText` from `gatsby-source-contentful/rich-text` with custom `BLOCKS`/`INLINES` options — copy the pattern from an existing template.
- **Genuinely shared logic belongs in `src/utils/`** — a function used by more than one page or component. **Page-local logic stays in the page**: derived lists, per-page slices, and constants that only that page uses are defined at the top of its `index.tsx`, not hoisted into a module. Testability is never a reason to move code (§6).
- Match the surrounding file. Do not reformat, reorder imports, or "modernize" code you were not asked to change.

---

## 6. Testing

Jest 30 + ts-jest. Config: `jest.config.ts`. Tests live in `src/__tests__/`, mirroring the source tree.

**The constraint that shapes every test here:** `testEnvironment` is **`node`**, and there is **no `moduleNameMapper`**. That means:

- ❌ You cannot import a component that imports a `.module.css` file — Jest will fail parsing the CSS.
- ❌ There is no jsdom, no `@testing-library/react`, no `document`.
- ✅ You can import and test anything pure: `src/utils/`, `src/data/`, `src/strategies/`, `src/constants/`.
- ⚠️ `react-dom/server` technically runs here, but rendering a component is **not** a licence to create a CSS-free component so you can render it. See the hard rule below and "never test presentational markup".

### The hard rule: the test bends to the code, never the reverse

**If a behavior cannot be tested with the repo as it stands, it does not get a unit test.** Say so in your report and move on. That is a complete, acceptable answer.

You MUST NOT, in order to make something testable:

- Modify `jest.config.ts` — no `moduleNameMapper`, no `testEnvironment` change, no transformer
- Add a CSS-module stub, `jsdom`, `@testing-library/*`, or any test dependency
- **Restructure production code** — extracting a component or hoisting a page-local constant into a module *so a test can import it* is a production change the ticket did not ask for
- Compile TypeScript at test runtime, read source files as text, or re-implement the function inside the test

**One existing test breaks this rule and is allowed to stay:** `src/__tests__/strategies/generateMainPagesSolutionGuards.test.ts` transpiles its subject at runtime, because `GenerateMainPages.ts` currently fails to import under ts-jest (type errors at lines 105, 109, 123 that `npx tsc --noEmit` does not report). Leave it alone and do not report it as a finding — it is known debt, not a pattern. If you need a new test in `src/strategies/`, fix those type errors and import the module normally.

This is not hypothetical. On branch `pdq/mrtg-1447-add-link-to-press-library`, a one-row press-library addition (**6 lines** of `_data.ts`, which is what actually merged) grew to ~2,100 lines: a CSS stub, a `moduleNameMapper`, a `_AllCoverageGrid.tsx` extracted purely for testability, page derivations hoisted into `_data.ts`, and runtime TS compilation. A maintainer deleted **all of it**, including the production refactors, in a single commit. Each step was a reasonable-looking response to a reviewer finding of "untestable". The correct response to "untestable" here is: *"correct — it is presentational markup on a page; it is verified on the Netlify deploy preview, not in Jest."*

Page-local derivations (`FEATURED_RELEASES`, `TOTAL_PAGES`, per-page slices) belong **inline in the page**. `_data.ts` holds the data array and its type — nothing else.

WHEN writing tests:
- Every test must **fail on the base commit** and pass on your branch. If it passes on both, it is not testing your change.
- Test behavior and real values, not the formula. Pin expected edge values as literals.
- **A data-only change gets a data-only test.** Adding a row to `PRESS_DATA`, `RESOURCES_DATA`, or `faq-content.ts` warrants asserting that the row is present and well-formed. It does not warrant testing the page that renders it.
- **Keep tests proportional.** Rough ceiling: the test diff should not exceed the production diff by more than about 5×. Past that, you are testing the repo, not your change. If a reviewer finding pushes you over it, push back in your report instead of complying.
- **Never test presentational markup** — class names, element order, `rel`/`target` attributes, card grids. That is what the Netlify deploy preview is for.
- Name files `<subject>.test.ts` and place them under the matching `src/__tests__/<area>/` directory.

Existing suites worth imitating: `src/__tests__/utils/getLinkSolutionRemap.test.ts` (pure util), `src/__tests__/redirects/solutionHubRedirects.test.ts` (parses `netlify.toml`), `src/__tests__/links/solutionHubLinkIntegrity.test.ts` (repo-wide audit of a stale path).

---

## 7. Dependencies

- **Do not add a runtime dependency.** Solve it with what is installed: Mantine, `clsx`/`classnames`, `date-fns-tz`, `marked`, `slugify`, `js-search`, `decimal.js`, `isomorphic-dompurify`. This site is a static marketing build and every package lands in the client bundle.
- If a change genuinely cannot be made without a new package, **stop and report it as a blocker** with the package name, size, and why nothing installed suffices. Let a human decide.
- Never bump versions of `gatsby*`, `@mantine/*`, `react`, or `typescript`. Those upgrades are their own tickets.
- Never edit `.github/dependabot.yml` unless the ticket is about Dependabot.

---

## 8. Git, branches, and PRs

- **Base branch:** `main` (the repo default) unless the ticket specifies otherwise.
- **Branch name:** `pdq/<ticket-key-lowercase>-<slug>` — e.g. `pdq/mrtg-1444-change-url-of-solution-page`.
- **Never commit to `main` or `develop`.** Never force-push a branch you did not create.
- **Commit messages:** `<TICKET-KEY>: <what changed and why>` — e.g. `MRTG-1444: move the Digital Hub page to /solution/hub/ and add redirects`.
- **Clean the history before you open the PR.** Your tooling may write periodic `WIP checkpoint (periodic)` autosave commits during the run — they are not yours to prevent, but they are yours to remove. Before opening the PR, squash the branch into commits that each describe one complete, coherent change. This is not cosmetic: the squash-merge commit body concatenates every message, so unsquashed `WIP checkpoint` lines land in `main`'s log permanently (see `8a52372`).
- **PR title:** `[PDQ] <TICKET-KEY>: <ticket summary>`.
- **PR body:** follow `.github/pull_request_template.md`. Fill in the JIRA link, Description, and Type of Change. In the Checklist, check only what is actually true — you cannot check "tested locally" if you never rendered the page. State explicitly:
  - which pages/routes are affected,
  - that `npx jest` passes (with the count),
  - that the Gatsby build was **not** run (no credentials) and needs the Netlify deploy preview for visual verification,
  - any new dependency (there should be none),
  - legal review requirement, for legal pages.

WHEN your change alters a route, an internal link, or a hub card:
- Update `MARKUP-CONTEXT.md` in the same PR. It is the routing map the marketing team's tooling reads; a stale entry there causes misrouted tickets. This is the **only** harness file you should update without being asked.

WHEN a change is visual (layout, spacing, new section, responsive behavior):
- Say so in the PR body and ask for review on the Netlify deploy preview. You cannot see the page render; do not claim visual correctness you did not verify.

---

## 9. Never touch

Unless the ticket explicitly asks for it:

- `AGENTS.md`, `CONTEXT.md`, `skills/`, `docs/adr/` — the harness (exception: `MARKUP-CONTEXT.md`, per §8)
- `yarn.lock`, `bun.lockb`, `package.json` dependency ranges
- `.env.development` or any `.env*` file; never print, log, or commit a credential, token, or API key
- `netlify.toml` beyond the specific redirect/header your ticket needs — the `[context.*]` environment mapping is deployment infrastructure
- `node_modules/`, `.cache/`, `public/` — build output, all git-ignored; if they show in your diff, your `.gitignore` handling is wrong
- `.husky/`, `tsconfig.json`, `jest.config.ts`, `gatsby-config.ts`
- Analytics/tracking IDs (GTM, Mixpanel, FullStory, LinkedIn, ZoomInfo)

---

## 10. When to stop

**A review finding you cannot satisfy is a finding to answer, not a finding to obey.** WHEN a reviewer asks for something this file forbids — coverage of presentational markup, a passing Gatsby build, a test that requires changing `jest.config.ts` — reply with the rule and the reason and leave the code alone. Complying is the worse failure: on MRTG-1447, four review cycles of "untestable" findings turned a 6-line data edit into ~2,100 lines that a maintainer deleted by hand. Repeating a finding does not make it satisfiable.

**The approved plan's `out_of_scope` list binds every later phase, including testing.** If the plan says a change gets no new test file, it gets no new test file.

Emit a blocker instead of improvising WHEN:

- The ticket is a **Contentful or Ashby edit**, not a code change (§3)
- The plan turns out to be unimplementable as written — report which step and why; do not work around it
- The change requires a **new dependency** (§7)
- The change requires **Contentful credentials, a live build, or a browser** to verify
- The ticket asks to change a page you cannot find in the codebase — that usually means it is CMS-driven
- The requirement conflicts with a rule in this file

A blocker naming the exact conflict is a successful outcome. A merged PR that hardcodes CMS content, adds a dependency, or breaks a route is not.

---

## 11. Skills

`skills/` holds workflows written for **interactive** sessions with a human at the keyboard:

| Skill | Use headless? |
|---|---|
| `grill-me` | ❌ No. It asks one question at a time and waits. The clarification phase already covers this. |
| `implement-from-design` | ⚠️ Only if the ticket attaches a design export and you can read it. It has interactive checkpoints — skip those, apply the conventions. |
| `update-copy-from-design` | ⚠️ Same. |
| `local-setup` | ❌ No. Human dev-environment setup; it assumes Yarn, nvm, and Contentful credentials. |

Read a skill for its conventions when relevant, but never block waiting for input that will not come.
