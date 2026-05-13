---
name: grill-me
description: Grill the user relentlessly about every aspect of a plan until there's 100% clarity. Ask questions one at a time, provide recommended answers, challenge assumptions against the codebase and docs. Adapted from mattpocock/skills/grill-with-docs.
---

# Grill Me

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one.

Rules:

1. **ONE question at a time.** Never batch multiple questions. Ask one, wait for the answer, then ask the next. This is non-negotiable — even if you have 20 questions queued up, ask them one by one.
2. For each question, provide your recommended answer.
3. If a question can be answered by exploring the codebase, explore the codebase instead of asking.
4. Do not stop until there is zero ambiguity. If the user asks "is that all?" and you have more questions, say "No — next question:" and continue one at a time.

## Domain awareness

During codebase exploration, look for existing documentation:

- `CONTEXT.md` at the repo root — glossary and project language
- `docs/adr/` — architectural decision records
- Existing page implementations in `src/pages/` — patterns to follow
- Existing components in `src/components/common/` — reuse candidates

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `CONTEXT.md`, call it out immediately.

"Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term.

### Discuss concrete scenarios

When relationships or behaviors are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force precision.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it.

### Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Don't batch these up — capture them as they happen. `CONTEXT.md` is a glossary, not a spec or scratch pad.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** — there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. ADRs live in `docs/adr/` with sequential numbering: `0001-slug.md`.
