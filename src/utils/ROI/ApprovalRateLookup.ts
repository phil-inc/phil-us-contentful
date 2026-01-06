import Decimal from "decimal.js";
import { toDecimal } from "utils/decimal/decimal.utils";

/**
 * Approval Rate Lookup Table
 * Based on calculation.md lines 170-223
 * Returns payment approval rate based on price ranges
 * Ranges use "[" to include and ")" to exclude
 */

type ApprovalRateRange = {
  min: number;
  max: number;
  rate: Decimal;
};

const APPROVAL_RATE_LOOKUP: ApprovalRateRange[] = [
  { min: 0, max: 5, rate: toDecimal(0.94) },
  { min: 5, max: 10, rate: toDecimal(0.94) },
  { min: 10, max: 15, rate: toDecimal(0.89) },
  { min: 15, max: 20, rate: toDecimal(0.89) },
  { min: 20, max: 25, rate: toDecimal(0.86) },
  { min: 25, max: 30, rate: toDecimal(0.86) },
  { min: 30, max: 35, rate: toDecimal(0.86) },
  { min: 35, max: 40, rate: toDecimal(0.86) },
  { min: 40, max: 45, rate: toDecimal(0.78) },
  { min: 45, max: 50, rate: toDecimal(0.78) },
  { min: 50, max: 55, rate: toDecimal(0.77) },
  { min: 55, max: 60, rate: toDecimal(0.77) },
  { min: 60, max: 65, rate: toDecimal(0.75) },
  { min: 65, max: 70, rate: toDecimal(0.75) },
  { min: 70, max: 75, rate: toDecimal(0.7) },
  { min: 75, max: 80, rate: toDecimal(0.7) },
  { min: 80, max: 85, rate: toDecimal(0.6) },
  { min: 85, max: 90, rate: toDecimal(0.6) },
  { min: 90, max: 95, rate: toDecimal(0.46) },
  { min: 95, max: 100, rate: toDecimal(0.46) },
  { min: 100, max: 110, rate: toDecimal(0.46) },
  { min: 110, max: 120, rate: toDecimal(0.46) },
  { min: 120, max: 130, rate: toDecimal(0.46) },
  { min: 130, max: 140, rate: toDecimal(0.46) },
  { min: 140, max: 150, rate: toDecimal(0.41) },
  { min: 150, max: 160, rate: toDecimal(0.41) },
  { min: 160, max: 170, rate: toDecimal(0.4) },
  { min: 170, max: 180, rate: toDecimal(0.4) },
  { min: 180, max: 190, rate: toDecimal(0.4) },
  { min: 190, max: 200, rate: toDecimal(0.4) },
  { min: 200, max: 210, rate: toDecimal(0.32) },
  { min: 210, max: 220, rate: toDecimal(0.32) },
  { min: 220, max: 230, rate: toDecimal(0.32) },
  { min: 230, max: 240, rate: toDecimal(0.32) },
  { min: 240, max: 250, rate: toDecimal(0.32) },
  { min: 250, max: 300, rate: toDecimal(0.31) },
  { min: 300, max: 350, rate: toDecimal(0.2) },
  { min: 350, max: 400, rate: toDecimal(0.15) },
  { min: 400, max: 450, rate: toDecimal(0.14) },
  { min: 450, max: 500, rate: toDecimal(0.14) },
  { min: 500, max: 550, rate: toDecimal(0.11) },
  { min: 550, max: 600, rate: toDecimal(0.1) },
  { min: 600, max: 650, rate: toDecimal(0.09) },
  { min: 650, max: 700, rate: toDecimal(0.08) },
  { min: 700, max: 750, rate: toDecimal(0.07) },
  { min: 750, max: 800, rate: toDecimal(0.06) },
  { min: 800, max: 850, rate: toDecimal(0.05) },
  { min: 850, max: 900, rate: toDecimal(0.04) },
  { min: 900, max: 1000, rate: toDecimal(0.03) },
  { min: 1000, max: 3000, rate: toDecimal(0.02) },
  { min: 3000, max: 5000, rate: toDecimal(0.01) },
];

/**
 * Get approval rate for a given price
 * @param price - The price to look up
 * @returns Approval rate as Decimal (0-1)
 */
export function getApprovalRate(price: Decimal): Decimal {
  const priceNum = price.toNumber();

  // Handle edge case: >= 5000 returns 0%
  if (priceNum >= 5000) {
    return toDecimal(0);
  }

  // Find the matching range
  // Ranges use "[" to include min and ")" to exclude max
  for (const range of APPROVAL_RATE_LOOKUP) {
    if (priceNum >= range.min && priceNum < range.max) {
      return range.rate;
    }
  }

  // Default fallback (should not happen for valid prices)
  return toDecimal(0);
}

