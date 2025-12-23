import Decimal from "decimal.js";
import { toDecimal } from "utils/decimal/decimal.utils";
import { RoiInputsDec } from "types/roi";
import { ProgramType } from "enum/global.enum";

/**
 * ROI Assumptions Configuration
 * Contains all assumptions (A.1-A.16) from calculation.md
 * Some assumptions depend on inputs and are calculated dynamically
 */

export type WACRange = "a" | "b" | "c";

/**
 * Get WAC range based on WAC price (A.16)
 * a. Range 1: >=$100 and <$300
 * b. Range 2: >=$300 and <$700
 * c. Range 3: >=$700 and <=$5000
 */
export function getWACRange(wac: Decimal): WACRange {
  if (wac.gte(100) && wac.lt(300)) {
    return "a";
  } else if (wac.gte(300) && wac.lt(700)) {
    return "b";
  } else if (wac.gte(700) && wac.lte(5000)) {
    return "c";
  }
  // Default to range a if outside expected bounds
  return "a";
}

/**
 * ROI Assumptions class
 * Provides methods to get assumption values based on inputs and program type
 */
export class RoiAssumptions {
  private inputs: RoiInputsDec;
  private programType: ProgramType;

  constructor(inputs: RoiInputsDec, programType: ProgramType) {
    this.inputs = inputs;
    this.programType = programType;
  }

  /**
   * A.1: Enrollment rate at other
   * I.3 true - 80%
   * I.3 false - 65%
   */
  getEnrollmentRateAtOther(haveHubService: boolean): Decimal {
    return haveHubService ? toDecimal(0.8) : toDecimal(0.65);
  }

  /**
   * A.2: Enrollment rate at Phil: 90%
   */
  getEnrollmentRateAtPhil(): Decimal {
    return toDecimal(0.9);
  }

  /**
   * A.3: Enroll with insurance for both Other and Phil: 95%
   */
  getEnrollWithInsuranceRate(): Decimal {
    return toDecimal(0.95);
  }

  /**
   * A.4: Number of patients covered outright: 20%
   */
  getCoveredOutrightRate(): Decimal {
    return toDecimal(0.2);
  }

  /**
   * A.5: Bump in refill rate vs retail
   * I.5 < 2: 100%
   * I.5 >= 2 and I.5 < 4: 67%
   * I.5 >= 4: 33%
   */
  getBumpInRefillRate(): Decimal {
    const avgRefills = this.inputs.inputAverageRefillsPerNRx;
    if (avgRefills.lt(2)) {
      return toDecimal(1.0); // 100%
    } else if (avgRefills.gte(2) && avgRefills.lt(4)) {
      return toDecimal(0.67); // 67%
    } else {
      // avgRefills >= 4
      return toDecimal(0.33); // 33%
    }
  }

  /**
   * A.6: Discount to "Average refills per patient"
   * 67% if I.7 false
   * 20% if I.7 true
   */
  getDiscountToRefills(haveUncoverCouponOffer: boolean): Decimal {
    return haveUncoverCouponOffer ? toDecimal(0.2) : toDecimal(0.67);
  }

  /**
   * A.7: DSA
   * 7% for Phil
   * 10% for MFR
   */
  getDSA(): Decimal {
    return this.programType === ProgramType.PHIL
      ? toDecimal(0.07) // 7%
      : toDecimal(0.1); // 10%
  }

  /**
   * A.8: PA Submission rate for Phil: 90%
   */
  getPASubmissionRateForPhil(): Decimal {
    return toDecimal(0.9);
  }

  /**
   * A.9: PA Approval rate for Phil and Retail: 45%
   */
  getPAApprovalRateForPhilAndRetail(): Decimal {
    return toDecimal(0.45);
  }

  /**
   * A.10: PA Approval rate for Retail/Other: 40%
   */
  getPAApprovalRateForRetailOther(): Decimal {
    return toDecimal(0.4);
  }

  /**
   * A.11: Average Payer Rebate: 40%
   */
  getAveragePayerRebate(): Decimal {
    return toDecimal(0.4);
  }

  /**
   * A.12: Average covered Copay
   * $10: I.2 falls in A.16 a
   * $25: I.2 falls in A.16 b
   * $40: I.2 falls in A.16 c
   */
  getAverageCoveredCopay(): Decimal {
    const range = getWACRange(this.inputs.wac);
    switch (range) {
      case "a":
        return toDecimal(10);
      case "b":
        return toDecimal(25);
      case "c":
        return toDecimal(40);
    }
  }

  /**
   * A.13: Covered Buydown
   * 0%: I.2 falls in A.16 a
   * 40%: I.2 falls in A.16 b
   * 60%: I.2 falls in A.16 c
   */
  getCoveredBuydown(): Decimal {
    const range = getWACRange(this.inputs.wac);
    switch (range) {
      case "a":
        return toDecimal(0);
      case "b":
        return toDecimal(0.4); // 40%
      case "c":
        return toDecimal(0.6); // 60%
    }
  }

  /**
   * A.14: Uncovered Buydown
   * $20: I.2 falls in A.16 a
   * $50: I.2 falls in A.16 b
   * $80: I.2 falls in A.16 c
   */
  getUncoveredBuydown(): Decimal {
    const range = getWACRange(this.inputs.wac);
    switch (range) {
      case "a":
        return toDecimal(20);
      case "b":
        return toDecimal(50);
      case "c":
        return toDecimal(80);
    }
  }

  /**
   * A.15: Payment approval rate lookup - handled by ApprovalRateLookup utility
   * This is just a reference, actual lookup is done in ApprovalRateLookup.ts
   */
  // Payment approval rate is handled separately via lookup table

  /**
   * A.16: WAC Ranges - handled by getWACRange function
   * a. Range 1: >=$100 and <$300
   * b. Range 2: >=$300 and <$700
   * c. Range 3: >=$700 and <=$5000
   */
  getWACRange(): WACRange {
    return getWACRange(this.inputs.wac);
  }
}

