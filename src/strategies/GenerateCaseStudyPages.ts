import { type Actions } from "gatsby";

// Case-study detail pages are now static file-based pages under
// src/pages/insights/case-studies/<slug>/index.tsx, each fed from a local
// content snapshot (./_data.ts). They no longer come from Contentful, so this
// generator is intentionally a no-op. Because nothing creates pages from the
// CaseStudy template anymore, its GraphQL query is dormant (never executed).
export default async function GenerateCaseStudyPages(_: {
  actions: Actions;
}): Promise<void> {
  // no-op — see src/pages/insights/case-studies/*
}
