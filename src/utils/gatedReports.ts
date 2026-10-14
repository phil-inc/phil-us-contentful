/**
 * Gated reports whose PDF is hosted outside Contentful, keyed by the report ID
 * the page sends to /api/issue-download-token. The value is the name of the
 * environment variable holding the file's URL.
 *
 * The URLs live in Netlify's environment settings, never in this repo: the
 * repo is public on GitHub, so a committed link would be readable (and
 * crawlable) there. Import this from src/api only, never from page or
 * component code, or the lookup ends up in the browser bundle.
 */
const EXTERNAL_REPORT_URL_VARS = new Map<string, string>([
  // /pharma-dtp-research/ — "The DTP Breakthrough" (MRTG-1461), a HubSpot file.
  ["pharma-dtp-research", "PHARMA_DTP_REPORT_URL"],
]);

/**
 * The file URL for an externally hosted report.
 * Returns undefined when the ID is not an external report (look it up in
 * Contentful instead), and "" when it is one but its variable is not set.
 */
export function externalReportUrl(reportId: string): string | undefined {
  const envVar = EXTERNAL_REPORT_URL_VARS.get(reportId);
  if (!envVar) return undefined;
  return process.env[envVar]?.trim() ?? "";
}
