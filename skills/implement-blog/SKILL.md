---
name: implement-blog
description: Create a new code-driven blog page for the phil.us marketing site from an HTML design file, then wire it into the Resource Hub. Use when the user provides a blog design (HTML file or zip/tarball) and wants it built as a static Gatsby page and linked from /resources/.
---

# Implement Blog

Creates a new code-driven blog page and adds it to the Resource Hub (`src/pages/resources/_data.ts`).

**Core rule: everything is hardcoded from the HTML. No shared blog components. No Contentful. The HTML is the source of truth — implement exactly what it shows.**

---

## Phase 1: Extract and Understand the Design

Follow `skills/implement-from-design/SKILL.md` Phase 1 exactly — it handles zip/tarball and single HTML file entry paths.

In addition to the standard extraction, make sure to collect:
- **All image URLs + alt text** — every `<img src="...">` in the article body, hero, and author block (needed for Phase 4 image download)
- **Meta description** — from `<meta name="description">` in `<head>` (needed for SEO Head component)

---

## Phase 2: Grill

Run `skills/grill-me/SKILL.md`. Ask ONE question at a time. Provide a recommended answer for each. If a question can be answered by exploring the codebase, do that instead of asking.

**Mandatory questions (in order):**

1. **Scope** — new code-driven static page, or update to the existing `blog.tsx` Contentful template?
   Recommend: new code-driven static page.

2. **Route / slug** — what URL path?
   Recommend: `/<slug-from-title>/` (top-level, e.g. `/transforming-the-patient-experience/`). Check that no existing Contentful page or `src/pages/` folder uses the same path.

3. **Layout** — use shared `<Layout>` (standard phil.us nav + footer)?
   Recommend: yes, always use `<Layout>`. Ignore any nav/footer found in the design HTML — those belong to the live site wrapper, not this page.

4. **Branch** — new branch off `main` or existing branch?
   Recommend: use current branch if it's a feature branch, otherwise create `feature/blog-<slug>`.

---

## Phase 3: Write SPEC.md

Write `src/pages/<slug>/SPEC.md`:

```markdown
# SPEC: <Blog Title>

## Scope
New code-driven static page. No Contentful. All content hardcoded.

## Route
`/<slug>/`

## Layout
Shared `<Layout>` (standard phil.us nav + footer).

## Everything hardcoded
No shared blog components used. All sections — body, social share, bottom banner, author block — are implemented inline from the design HTML.

## Sections
(list all H3 sections extracted from the design)

## Deviation log
| What changed | Design value | Implementation value | Why |
|---|---|---|---|
| Nav / footer | Design-specific header/footer in HTML file | Standard phil.us `<Layout>` | Site wrapper, not page content |
```

---

## Phase 4: Download Images

Before writing any code, download all images extracted in Phase 1 into `static/images/blog/`.

```bash
mkdir -p static/images/blog
curl -o static/images/blog/<filename>.<ext> "https://images.ctfassets.net/..."
# repeat for each image
```

**Naming convention:** use the original filename from the Contentful URL (the last path segment before `?`).
Example: `https://images.ctfassets.net/.../Blog_Posts.svg?w=1200` → `static/images/blog/Blog_Posts.svg`

**Strip query params** — download the raw file, not a resized variant:
```bash
# Good: downloads original SVG/PNG
curl -o static/images/blog/Blog_Posts.svg "https://images.ctfassets.net/2h91ja0efsni/.../Blog_Posts.svg"

# Bad: downloads a resized JPG
curl -o ... "https://images.ctfassets.net/...?w=1200&fm=webp"
```

In `index.tsx`, reference images as static paths:
```tsx
<img src="/images/blog/<filename>.<ext>" alt="<alt text from design>" loading="lazy" />
```

No imports needed — Gatsby serves `static/` as the public root.

---

## Phase 5: Build (code)

### Folder structure

```
src/pages/<slug>/
  index.tsx        ← page component, all content hardcoded
  <slug>.module.css  ← all styles extracted from design HTML
  SPEC.md          ← spec written in Phase 3
```

### CSS

Extract all styles **directly from the design HTML** — inline styles, class names, and computed values. Do not import or copy from `blog.module.css` or any other existing CSS file. The design HTML is the source of truth.

Steps:
1. Find all CSS classes used in the article body, social share, banner, and author sections.
2. Extract their property values from the `<style>` blocks or inline styles in the HTML.
3. Write them into `<slug>.module.css` — rename classes to semantic names (e.g. `.title`, `.paragraph`, `.anchor`).

### Imports

Only these imports are allowed — everything else must be hardcoded inline:

```tsx
import React from "react";
import { Link } from "gatsby";
import { Layout } from "layouts/Layout/Layout";
import { SEO } from "layouts/SEO/SEO";
// Mantine primitives only (no shared blog components)
import { Container, Box, Title, Text, Anchor, List, ... } from "@mantine/core";
import * as classes from "./<slug>.module.css";
```

**Do NOT import:**
- Any other component from existing codebase — these may be outdated or Contentful-dependent


### Principles

1. **HTML is the source of truth** — extract every word, every link, every icon.
2. **No Contentful** — nothing touches Contentful data or GraphQL.
3. **No shared blog components** — all sections hardcoded inline. Existing components may be outdated or Contentful-dependent.
4. **No sub-agents** — all work in the main session.
5. **Log every deviation** in SPEC.md.

---

## Phase 6: Link to Resource Hub

After the page is built, update `src/pages/resources/_data.ts`.

### Check for existing entry

```bash
grep -n "<title keyword>" src/pages/resources/_data.ts
```

**If entry already exists** (same title, pointing to old external `https://phil.us/...` URL):
→ Update `url` only. Change to the new internal path `"/<slug>/"`.

**If no entry exists**:
→ Add a new entry at the **top** of the `RESOURCES_DATA` array (first item = most recent). Format:

```typescript
{
  title: "<Blog Title>",
  topics: ["<topic1>", "<topic2>"],  // pick from: direct, access, patient, utilization, field, data, commercial
  type: "blog",
  url: "/<slug>/",
  buttonLabel: "Read",
},
```

**Topic mapping:**
| Blog theme | Topics |
|---|---|
| DTC / telemedicine / patient programs | `direct`, `patient` |
| Hub / pharmacy / coverage / PA | `access`, `utilization` |
| Field teams / HCP engagement | `field`, `commercial` |
| Data / analytics / insights | `data` |
| Commercialization / launch / GTN | `commercial` |

---

## Phase 7: Verify

Ask the user: "Can you verify the page looks correct at `http://localhost:3000/<slug>/`?"
