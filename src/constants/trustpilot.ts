/**
 * Single source for the Trustpilot patient satisfaction figures shown on the site.
 *
 * Nothing fetches these from Trustpilot — the embedded TrustBox widgets render the
 * live score themselves, but any score written as page copy or as a stat comes from
 * here. When the live profile moves, change TRUSTPILOT_SCORE and every page follows.
 *
 * Live profile: https://www.trustpilot.com/review/phil.us
 * Last verified: 2026-08-24 (TrustScore 4.9, 22,810 reviews)
 */
export const TRUSTPILOT_SCORE = 4.9;

export const TRUSTPILOT_SCORE_MAX = 5;

/** Score as it appears in copy and stat blocks, e.g. "4.9/5.0". */
export const TRUSTPILOT_SCORE_LABEL = `${TRUSTPILOT_SCORE.toFixed(1)}/${TRUSTPILOT_SCORE_MAX.toFixed(1)}`;

/**
 * A score as a percentage of the maximum, for bar widths and similar visuals.
 * Keeps a bar's length tied to the score it draws instead of being set by hand.
 *
 * Rounded to two decimals so float error stays out of the rendered CSS —
 * 4.9 / 5 * 100 is 98.00000000000001 unrounded.
 */
export const scoreToPct = (score: number) =>
  Number(((score / TRUSTPILOT_SCORE_MAX) * 100).toFixed(2));
