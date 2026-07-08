/**
 * Target-account (TAM) email domains — MRTG-1438.
 *
 * Shared module (in a subdirectory so Netlify treats it as a supporting file,
 * not an edge function). Imported by ../isTargetAccount.ts; server-only, never
 * shipped to the browser. One domain per line, lowercase.
 *
 * NOTE: This is a small subset (10 well-known accounts) to run the feature
 * end-to-end. Expand with the full list exported from HubSpot (the "Company
 * domain name" field) — the target list arrives as company names, which cannot
 * be reliably converted to domains by guessing.
 */
export const TAM_DOMAINS: readonly string[] = [
  "abbvie.com", // AbbVie
  "3m.com", // 3M
  "amgen.com", // Amgen
  "pfizer.com", // Pfizer
  "astrazeneca.com", // AstraZeneca
  "gilead.com", // Gilead Sciences
  "biogen.com", // Biogen
  "regeneron.com", // Regeneron Pharmaceuticals
  "novartis.com", // Novartis
  "amneal.com", // Amneal Pharmaceuticals
];
