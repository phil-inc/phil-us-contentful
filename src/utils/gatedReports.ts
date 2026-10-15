/**
 * Gated reports whose PDF is hosted outside Contentful, keyed by the report ID
 * the page sends to /api/issue-download-token. Each entry reads the file's URL
 * from an environment variable.
 *
 * The URLs live in Netlify's environment settings, never in this repo: the
 * repo is public on GitHub, so a committed link would be readable (and
 * crawlable) there. Import this from src/api only, never from page or
 * component code, or the lookup ends up in the browser bundle.
 *
 * Each variable must be read as a literal `process.env.NAME`. Gatsby bakes
 * environment variables into functions at build time by replacing those exact
 * expressions, and turns a bare `process.env` into an empty object, so a
 * computed lookup such as `process.env[name]` always finds nothing. For the
 * same reason the variable must be available to Netlify builds, not only to
 * functions at runtime.
 */
const EXTERNAL_REPORT_URLS = new Map<string, () => string | undefined>([
  // /pharma-dtp-research/ — "The DTP Breakthrough" (MRTG-1461), a HubSpot file.
  ["pharma-dtp-research", () => process.env.PHARMA_DTP_REPORT_URL],
]);

/**
 * The file URL for an externally hosted report.
 * Returns undefined when the ID is not an external report (look it up in
 * Contentful instead), and "" when it is one but its variable is not set.
 */
export function externalReportUrl(reportId: string): string | undefined {
  const readUrl = EXTERNAL_REPORT_URLS.get(reportId);
  if (!readUrl) return undefined;
  return readUrl()?.trim() ?? "";
}
