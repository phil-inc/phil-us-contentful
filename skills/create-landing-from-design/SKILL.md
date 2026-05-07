---
name: create-landing-from-design
description: Convert a Claude design export (HTML/CSS) into a static Gatsby landing page with reusable components. Use when the user has a design zip/tarball from Claude and wants to implement it as a new page on the phil.us marketing site.
---

# Create Landing Page from Design Export

When the user provides a Claude design export, follow this process to convert it into a production-ready static Gatsby page.

## Phase 1: Extract and Understand the Design

1. **Download and extract** the design archive (usually gzip tarball, not zip):
   ```bash
   curl -sL -o /tmp/design.tar.gz "<url>"
   tar xzf /tmp/design.tar.gz -C /tmp/design_output
   ```

2. **Read the source HTML** — look for the `-src` variant if multiple HTML files exist. This has readable CSS (the non-src versions inline base64 assets).

3. **Read the CSS variables file** (`colors_and_type.css` or similar) to understand the design system tokens.

4. **Inventory the assets** — list everything in the `assets/` and `fonts/` directories. Identify which are decorative (watermarks, patterns) vs functional (logos, icons).

5. **Identify the sections** — break the HTML into distinct visual sections. Each `<section>` or major `<div>` with a `data-screen-label` is typically a component boundary.

## Phase 2: Grill on Approach

Before writing any code, challenge every assumption. Use the grill-with-docs skill pattern — ask questions one at a time, provide a recommended answer, wait for feedback.

### Questions to resolve (in order):

**Routing:**
- What URL should this page live at?
- Does it conflict with an existing Contentful-generated page? If so, how do we handle the conflict (slug override, file-based page priority, Contentful slug change)?
- Are there existing pages that link to the old URL? Do we need redirects?

**Data source:**
- Static page (no Contentful) or CMS-driven?
- If static: all data hardcoded at the page level, passed as props to reusable components.

**Forms:**
- Does the design have a form? What should it do on submit?
- Reuse existing HubSpot embed (`HubspotFormV2` + CSS overrides) or build a custom form?
- If HubSpot: get the portal ID and form ID from Contentful or the user.
- What happens after submission? (redirect, session key, etc.)

**Layout:**
- Use the shared `Layout` component (header/footer) or standalone?
- Default: use shared Layout unless the design explicitly shows a different header/footer.

**Components:**
- Break the design into reusable components. Each distinct visual block = one component.
- All components go in `src/components/common/` with PascalCase directories.
- Components accept props for all content — data is hardcoded at the page level, not inside components.

**Interactions:**
- Identify hover effects, animations, scroll-triggered behaviors.
- Animated count-up numbers: implement with IntersectionObserver + requestAnimationFrame.
- Hover effects: CSS-only transitions in the module CSS.

**Assets:**
- Copy decorative images (watermarks, patterns) to `src/assets/images/`.
- Inline SVGs: pass as `ReactNode` props to components, don't save as separate files.
- Don't copy fonts — the project already has Raleway and Lato configured.

### ADR check

After resolving all questions, check if any decision warrants an ADR. All three must be true:
1. Hard to reverse
2. Surprising without context
3. Result of a real trade-off

If yes, create in `docs/adr/NNNN-slug.md`.

## Phase 3: Write the Spec

Create a `SPEC.md` co-located with the page (e.g., `src/pages/<slug>/SPEC.md`) documenting:
- Routes (new page + any moved existing pages)
- Component list with props
- Form behavior
- Animations
- Assets to copy
- Any temporary workarounds (with TODO for removal)
- **Deviation log** (see below)

### Deviation log

Any time the implementation differs from the design — whether in content, styling, structure, or behavior — it must be logged in the SPEC.md under a `## Deviations from Design` section. Each entry should include:

| What changed | Design value | Implementation value | Why |
|---|---|---|---|

Examples of deviations that must be logged:
- CSS values that differ (sizes, colors, spacing, opacity, transitions, z-index)
- Content that was added, removed, or reworded
- Structural changes (element order, wrapping elements, different HTML)
- Mantine/framework defaults that override design values
- Responsive behavior differences

If there's no good reason for a deviation, it shouldn't exist — match the design. If there is a reason (e.g., accounting for the real site header height, using a framework component), log it so it's reviewable.

## Phase 4: Build

### Order of operations:

1. **Assets** — copy images from design export to `src/assets/images/`
2. **Route changes** — if an existing page needs to move, update `src/strategies/GenerateMainPages.ts` or the relevant strategy. Add a TODO comment for temporary overrides.
3. **Components** — build each component (`.tsx` + `.module.css`) in `src/components/common/`. Follow these conventions:
   - `import * as classes from "./componentName.module.css"`
   - `React.FC` with typed props
   - Root path aliases: `import X from "components/..."`, `"assets/..."`, etc.
   - Mantine primitives where appropriate (`Box`, `Container`, `Grid`, etc.)
   - CSS colors: use hex values from the design's CSS variables, not Mantine theme tokens (landing pages may have unique palettes)
   - HubSpot form overrides: use `:global()` in CSS Modules to target HubSpot's injected classes
4. **Page** — create `src/pages/<slug>/index.tsx` + `<slug>.module.css`:
   - Import and compose all components
   - Hardcode all data at the top of the file (arrays, objects)
   - Wrap in `PageContext.Provider` and `Layout`
   - Handle form submission callbacks (session keys, navigation)
5. **Edge cases** — check for conflicts with announcement bars, info bars, or other Layout-level features that key off page slugs.

### Component pattern:

```tsx
import React from "react";
import * as classes from "./myComponent.module.css";

type MyComponentProps = {
  title: string;
  items: { label: string; value: string }[];
};

const MyComponent: React.FC<MyComponentProps> = ({ title, items }) => (
  <div className={classes.root}>
    <h2 className={classes.title}>{title}</h2>
    {items.map((item, i) => (
      <div key={i} className={classes.item}>{item.label}: {item.value}</div>
    ))}
  </div>
);

export default MyComponent;
```

### Fidelity rules:

- **Content:** Only implement content that exists in the design HTML. If the design has CSS for an element but no corresponding HTML, do NOT invent the content. Leave it out entirely or flag it as missing during the grill phase. Never fabricate copy, labels, badges, or data that aren't in the handoff. If something looks incomplete, ask — don't fill in the blanks.
- **Styling:** Default to matching the design's CSS values. Deviations are fine when there's a real reason (framework constraints, site-level layout, accessibility), but every deviation must be logged in the spec.
- **Structure:** Preserve element order from the design unless there's a technical reason to change it. Log any reordering.

### CSS Module pattern:

- Match the design's CSS values exactly (fonts, sizes, colors, spacing, border-radius)
- Include hover transitions with `cubic-bezier(0.4, 0, 0.2, 1)` easing
- Add responsive breakpoints: `@media (max-width: 1080px)` for tablet, `@media (max-width: 720px)` for mobile
- Decorative images: `position: absolute`, low opacity, `pointer-events: none`

### Animated count-up pattern:

```tsx
const AnimatedNumber: React.FC<{ value: number; decimals?: number; suffix?: string }> = ({
  value, decimals = 0, suffix,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = useCallback(() => {
    if (!ref.current || hasAnimated) return;
    setHasAnimated(true);
    const duration = 1400;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      if (ref.current) ref.current.textContent = (value * ease(t)).toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, decimals, hasAnimated]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { animate(); observer.unobserve(el); } },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return <span><span ref={ref}>{(0).toFixed(decimals)}</span>{suffix && <small>{suffix}</small>}</span>;
};
```

## Phase 5: Verify

1. Run `npx tsc --noEmit` — confirm zero new errors.
2. Start dev server using the `local-development-setup` skill.
3. Check the page visually at the target URL.
4. Test responsive behavior at 1080px and 720px breakpoints.
5. Test form submission flow (session key set, navigation works).
6. Check that Layout-level features (announcement bar, info bar) behave correctly on the new page.

## Phase 6: Ship

1. Create a feature branch: `git checkout -b <branch-name>`
2. Stage only the files from this work — exclude pre-existing modifications.
3. Commit with a descriptive message listing what was added.
4. Push with `-u` flag: `git push -u origin <branch-name>`
