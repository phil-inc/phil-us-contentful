import Decimal from "decimal.js";
import { toDecimal } from "utils/decimal/decimal.utils";
import { RoiInputsDec } from "types/roi";
import { ProgramType } from "enum/global.enum";

/**
 * ROI Assumptions Configuration
 * Contains all assumptions used in ROI calculations
 * Some assumptions depend on inputs and are calculated dynamically
 */

export type WACRange = "a" | "b" | "c";

/**
 * Get WAC range based on WAC price
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
   * Enrollment rate at other
   * haveHubService true - 80%
   * haveHubService false - 65%
   */
  getEnrollmentRateAtOther(haveHubService: boolean): Decimal {
    return haveHubService ? toDecimal(0.8) : toDecimal(0.65);
  }

  /**
   * Enrollment rate at Phil: 90%
   */
  getEnrollmentRateAtPhil(): Decimal {
    return toDecimal(0.9);
  }

  /**
   * Enroll with insurance for both Other and Phil: 95%
   */
  getEnrollWithInsuranceRate(): Decimal {
    return toDecimal(0.95);
  }

  /**
   * Number of patients covered outright: 20%
   */
  getCoveredOutrightRate(): Decimal {
    return toDecimal(0.2);
  }

  /**
   * Bump in refill rate vs retail
   * inputAverageRefillsPerNRx < 2: 100%
   * inputAverageRefillsPerNRx >= 2 and < 4: 67%
   * inputAverageRefillsPerNRx >= 4: 33%
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
   * Discount to "Average refills per patient"
   * 67% if haveUncoverCouponOffer false
   * 20% if haveUncoverCouponOffer true
   */
  getDiscountToRefills(haveUncoverCouponOffer: boolean): Decimal {
    return haveUncoverCouponOffer ? toDecimal(0.2) : toDecimal(0.67);
  }

  /**
   * DSA (Direct Service Agreement) rate
   * 7% for Phil
   * 10% for MFR
   */
  getDSA(): Decimal {
    return this.programType === ProgramType.PHIL
      ? toDecimal(0.07) // 7%
      : toDecimal(0.1); // 10%
  }

  /**
   * PA Submission rate for Phil: 90%
   */
  getPASubmissionRateForPhil(): Decimal {
    return toDecimal(0.9);
  }

  /**
   * PA Approval rate for Phil and Retail: 45%
   */
  getPAApprovalRateForPhilAndRetail(): Decimal {
    return toDecimal(0.45);
  }

  /**
   * PA Approval rate for Retail/Other: 40%
   */
  getPAApprovalRateForRetailOther(): Decimal {
    return toDecimal(0.4);
  }

  /**
   * Average Payer Rebate: 40%
   */
  getAveragePayerRebate(): Decimal {
    return toDecimal(0.4);
  }

  /**
   * Average covered Copay
   * $10: wac falls in range a (>=$100 and <$300)
   * $25: wac falls in range b (>=$300 and <$700)
   * $40: wac falls in range c (>=$700 and <=$5000)
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
   * Covered Buydown rate
   * 0%: wac falls in range a (>=$100 and <$300)
   * 40%: wac falls in range b (>=$300 and <$700)
   * 60%: wac falls in range c (>=$700 and <=$5000)
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
   * Uncovered Buydown amount
   * $20: wac falls in range a (>=$100 and <$300)
   * $50: wac falls in range b (>=$300 and <$700)
   * $80: wac falls in range c (>=$700 and <=$5000)
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
   * Payment approval rate lookup - handled by ApprovalRateLookup utility
   * This is just a reference, actual lookup is done in ApprovalRateLookup.ts
   */
  // Payment approval rate is handled separately via lookup table

  /**
   * WAC Ranges - handled by getWACRange function
   * a. Range 1: >=$100 and <$300
   * b. Range 2: >=$300 and <$700
   * c. Range 3: >=$700 and <=$5000
   */
  getWACRange(): WACRange {
    return getWACRange(this.inputs.wac);
  }
}

