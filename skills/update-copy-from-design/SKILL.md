---
name: update-copy-from-design
description: Apply copy/content updates to an existing page from a Claude design HTML export. Use when marketing sends an updated HTML from Claude design and the user wants to diff and apply the text changes to the codebase.
---

# Update Page Copy from Claude Design Export

When marketing provides an updated HTML file for an existing page, follow this process to identify and apply text changes.

## Phase 1: Locate the Files

1. **Find the Claude design HTML.** The user will provide a path. Filenames often contain spaces and special characters — always quote the path. These exports are typically large (500KB+) because of inline SVGs and embedded styles — that's normal.

2. **Find the target file in the codebase.** The filename usually names the page (e.g., "GTN Landing Page.html" → the GTN page). Use the context to identify the right file — it could be a page (`src/pages/<slug>/index.tsx`), a component, or any file containing the copy. If ambiguous, ask the user.

## Phase 2: Extract and Compare Text

The HTML is too large to read in full. Extract only the visible text content:

```bash
grep -oP '(?<=>)[^<]{10,}' "<path-to-html>" \
  | grep -v '^\s*$' \
  | grep -v '^[{.*}]' \
  | grep -vi 'font-face\|keyframes\|webkit\|margin\|padding\|display'
```

The output can be long — pipe through `head -N` and `tail -N` in separate passes to capture all sections.

Compare the extracted text against every text string in the target file(s):
- Headings, eyebrows, paragraphs
- Stat values, labels, sublabels
- Card/list item titles and descriptions
- Quotes, attributions
- CTA copy, button text
- Form labels and descriptions

## Phase 3: Report Differences

Before making any changes, present the user with a clear summary of every difference found. For each change:
- Quote the **current** text in the codebase
- Quote the **updated** text from the HTML
- Bold the specific words that changed

Wait for the user to approve before proceeding.

## Phase 4: Apply Changes

Edit the target file(s) with targeted string replacements — do not rewrite files.

Do **not** change:
- Component structure, imports, or props interfaces
- CSS/styling
- Form IDs, URLs, or behavioral logic
- SVG visuals or animations

## Phase 5: Verify and Push

1. Run `npx tsc --noEmit` to confirm no type errors.
2. If the dev server is running, check the page visually.
3. Ask the user if they want to push. Commit with a `content:` prefix (e.g., `content: update GTN landing page copy`) and push to the current branch.

## Notes

- Changes can be subtle — a single word added, removed, or swapped (e.g., "retail baseline" → "baseline"). Compare every string carefully, including sublabels and short phrases.
- If stat values (numbers) changed, double-check them carefully — a wrong multiplier is a high-impact error.
- If the HTML contains structural changes (new sections, removed sections, reordered content), flag this to the user — that may need the `create-landing-from-design` skill instead.
