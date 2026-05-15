---
name: implement-from-design
description: Implement or update any page/component from a design export (HTML/CSS). Use when the user has a design file from Claude/marketing and wants to build a new page, update an existing page's structure, or modify shared components (navbar, footer) on the phil.us marketing site.
---

# Implement from Design

## Phase 1: Extract and Understand the Design

### Entry path A — zip/tarball with multiple pages

1. Extract the archive:
   ```bash
   curl -sL -o /tmp/design.tar.gz "<url>"
   tar xzf /tmp/design.tar.gz -C /tmp/design_output
   ```
2. List all HTML files found.
3. Ask the user which HTML file is the target. Wait for answer.

### Entry path B — single HTML file

User provides the file path directly.

### Analysis (both paths)

Read the HTML, CSS, and assets. Then present a **brief summary** (3-5 sentences) confirming you understand the design — what it is, how many sections, general layout. Don't enumerate every detail.

Then immediately proceed to Phase 2 (Grill). Any unknowns, ambiguities, component reuse questions, and responsive gaps get resolved there.

## Phase 2: Grill

Run the `grill-me` skill (`skills/grill-me/SKILL.md`) against this implementation plan.

**CRITICAL: Ask ONE question at a time. Never batch. Ask one, wait for the answer, then ask the next. Even if you have 20 questions, go one by one.**

For each question, provide your recommended answer. If a question can be answered by exploring the codebase, explore the codebase instead of asking.

Seed topics (starting points, not the full scope — keep going until 100% clarity):

- **Scope** — is this a new page, an update to an existing page, or a shared component change (navbar, footer)?
- **Route** — what URL? Check for conflicts with existing Contentful slugs and file-based pages.
- **Layout** — use shared Layout (header/footer) or standalone?
- **Forms** — does the design have a form? HubSpot embed or custom? Portal/form IDs?
- **Interactions** — animations, hover states, scroll-triggered behaviors.
- **Assets** — what to copy, inline, or skip.
- **Component reuse** — which existing components match exactly? Which need new builds?
- **Responsive behavior** — mobile/tablet views covered in design? If not, what's expected at each breakpoint?
- **Blast radius** — surface any risk of changing existing routes, touching Contentful, or modifying shared components. Minimize. If unavoidable, the dev decides.

## Phase 3: Write the Spec

Once the grill produces full clarity, write a `SPEC.md` co-located with the change:
- New page: `src/pages/<slug>/SPEC.md`
- Existing page update: `src/pages/<slug>/SPEC.md` (update existing or create)
- Shared component: `src/layouts/Layout/SPEC.md` or alongside the component

This is the output artifact of the grill — a lightweight summary of decisions made:

- Scope (new page / update / shared component)
- Route (if applicable)
- Component list (new vs reused vs modified)
- Form behavior (if any)
- Responsive approach
- Assets
- Any risks or temporary workarounds (with TODOs)

### Deviation log

Any time the implementation differs from the design HTML, log it:

| What changed | Design value | Implementation value | Why |
|---|---|---|---|

If there's no good reason for a deviation, it shouldn't exist — match the design. If there is a reason (framework constraints, site-level layout, accessibility), log it so it's reviewable.

## Phase 4: Build

### Before building

Ask: "Should I create a new branch off `main`, or add to an existing branch/PR?" Wait for answer.

**New branch:**
```bash
git checkout main && git pull origin main
git checkout -b feature/<slug>-$(date +%s)
```

**Existing branch:**
```bash
git checkout <branch> && git pull origin <branch>
```

### Principles

1. **HTML is source of truth** — do not fabricate content. If something looks incomplete, ask.
2. **No Contentful** — new pages are code-driven. Only reference Contentful for existing/old content.
3. **No sub-agents** — do all work in the main session. Sub-agents lose context and produce code that doesn't match the design.
4. **Components accept props, data lives at page level** — hardcode content at the page level, pass to components via props.
5. **Reuse only if exact match** — if a component is close but not identical to the design, flag to dev. Don't silently adapt.
6. **Minimal blast radius** — don't change existing routes, don't touch Contentful, don't modify shared components unless explicitly approved during the grill.
7. **Log every deviation** — any difference from the design HTML goes in SPEC.md.
8. **Design for AI maintainability** — clear structure, obvious data boundaries, no clever abstractions. Future updates will be made by AI agents or devs with AI.

### Layout width

Use `.xl-container` (defined in `src/assets/css/index.css`) for any wrapper that must align with page content width.

```jsx
<div className="xl-container">…</div>
// or combined: <div className={`xl-container ${classes.foo}`}>
```

Applied to: MegaNav, StaticFooter, Leadership, CareerSection, GTN.

### What to look at for patterns

Don't follow frozen templates. Look at existing implementations:
- `src/pages/gtn/` — recent reference for a code-driven landing page
- `src/components/common/` — component structure conventions
- `src/layouts/Layout/` — shared layout, header, footer
- `src/layouts/Layout/theme.ts` — Mantine theme config

## Phase 5: Verify and Ship

1. Run `npx tsc --noEmit` — fix any errors before proceeding.
2. Commit with a descriptive message:
   ```bash
   git add .
   git commit -m "feat: <description of change>"
   ```
3. Push and create PR:
   ```bash
   git push -u origin feature/<slug>-<epoch>
   gh pr create --base develop --title "feat: <description>" --body "Preview URL will be available once Netlify deploys."
   ```
4. Hand the Netlify preview URL to the user for visual review.
