import Decimal from "decimal.js";
import { toDecimal } from "utils/decimal/decimal.utils";
import { RoiInputsDec } from "types/roi";
import { RoiAssumptions } from "config/roiAssumptions.config";
import { VolumeCalculationsResult } from "./VolumeCalculations";

/**
 * RoiFinalCalculations
 * Implements final calculations from calculation.md:
 * - Gross Revenues
 * - Buydowns
 * - DSAs
 * - Payer Rebates
 * - Final Outputs
 */

export type RoiFinalOutputs = {
  patientStarts: Decimal;
  coveredDispenses: Decimal;
  totalDispenses: Decimal;
  grossRevenue: Decimal;
  grossBuydown: Decimal;
  grossDSA: Decimal;
  payerRebate: Decimal;
  netRevenues: Decimal;
};

export class RoiFinalCalculations {
  private inputs: RoiInputsDec;
  private assumptions: RoiAssumptions;
  private volumeCalculations: VolumeCalculationsResult;
  private haveCoverCouponOffer: boolean;
  private haveUncoverCouponOffer: boolean;

  // Gross Revenues
  private grossRevenueCovered!: Decimal;
  private grossRevenueUncovered!: Decimal;
  private grossRevenueUninsured!: Decimal;

  // Buydowns
  private buydownCovered!: Decimal;
  private buydownUncovered!: Decimal;
  private buydownUninsured!: Decimal;

  // DSAs
  private dsaCovered!: Decimal;
  private dsaUncovered!: Decimal;
  private dsaUninsured!: Decimal;

  // Payer Rebates
  private payerRebateCovered!: Decimal;
  private payerRebateUncovered!: Decimal;
  private payerRebateUninsured!: Decimal;

  constructor(
    inputs: RoiInputsDec,
    assumptions: RoiAssumptions,
    volumeCalculations: VolumeCalculationsResult,
    haveCoverCouponOffer: boolean,
    haveUncoverCouponOffer: boolean
  ) {
    this.inputs = inputs;
    this.assumptions = assumptions;
    this.volumeCalculations = volumeCalculations;
    this.haveCoverCouponOffer = haveCoverCouponOffer;
    this.haveUncoverCouponOffer = haveUncoverCouponOffer;

    this.calculateGrossRevenues();
    this.calculateBuydowns();
    this.calculateDSAs();
    this.calculatePayerRebates();
  }

  /**
   * Gross Revenues:
   * 1. Covered amount: coveredTRx amount * wac
   * 2. Uncovered amount: uncoveredTRx amount * wac
   * 3. Uninsured amount: uninsuredTRx amount * wac
   */
  private calculateGrossRevenues(): void {
    const coveredTRx = this.volumeCalculations.coveredTRx.amount; // Covered TRx
    const uncoveredTRx = this.volumeCalculations.uncoveredTRx.amount; // Uncovered TRx
    const uninsuredTRx = this.volumeCalculations.uninsuredTRx.amount; // Uninsured TRx

    this.grossRevenueCovered = coveredTRx.mul(this.inputs.wac);
    this.grossRevenueUncovered = uncoveredTRx.mul(this.inputs.wac);
    this.grossRevenueUninsured = uninsuredTRx.mul(this.inputs.wac);
  }

  /**
   * Buydowns:
   * 1. Covered amount:
   *    Case if haveCoverCouponOffer is false: value 0
   *    Case if haveCoverCouponOffer is true: averageCoveredCopay * coveredBuydownRate * coveredTRx amount
   * 2. Uncovered amount:
   *    Case if haveUncoverCouponOffer is false: value 0
   *    Case if haveUncoverCouponOffer is true: (wac - uncoveredBuydown) * uncoveredTRx amount
   * 3. Uninsured amount: {0}
   */
  private calculateBuydowns(): void {
    const coveredTRx = this.volumeCalculations.coveredTRx.amount;
    const uncoveredTRx = this.volumeCalculations.uncoveredTRx.amount;

    // Covered buydown
    if (this.haveCoverCouponOffer) {
      // const avgCoveredCopay = this.assumptions.getAverageCoveredCopay();
      const coveredBuydownRate = this.assumptions.getCoveredBuydown();
      this.buydownCovered = this.inputs.wac.mul(coveredBuydownRate).mul(coveredTRx).mul(this.inputs.commerciallyInsuredPercentage);
      // this.buydownCovered = avgCoveredCopay.mul(coveredBuydownRate).mul(coveredTRx);
    } else {
      this.buydownCovered = toDecimal(0);
    }

    // Uncovered buydown
    if (this.haveUncoverCouponOffer) {
      const uncoveredBuydown = this.assumptions.getUncoveredBuydown();
      this.buydownUncovered = this.inputs.wac.sub(uncoveredBuydown).mul(uncoveredTRx).mul(this.inputs.commerciallyInsuredPercentage);
    } else {
      this.buydownUncovered = toDecimal(0);
    }

    // Uninsured buydown (hard-coded to 0)
    this.buydownUninsured = toDecimal(0);
  }

  /**
   * DSAs:
   * 1. Covered amount: dsaRate * Gross Revenue's covered amount
   * 2. Uncovered amount: dsaRate * Gross Revenue's uncovered amount
   * 3. Uninsured amount: dsaRate * Gross Revenue's uninsured amount
   */
  private calculateDSAs(): void {
    const dsaRate = this.assumptions.getDSA();

    this.dsaCovered = dsaRate.mul(this.grossRevenueCovered);
    this.dsaUncovered = dsaRate.mul(this.grossRevenueUncovered);
    this.dsaUninsured = dsaRate.mul(this.grossRevenueUninsured);
  }

  /**
   * Payer Rebates:
   * 1. Covered amount: payerRebateRate * Gross Revenue's covered amount
   * 2. Uncovered amount: 0
   * 3. Uninsured amount: 0
   */
  private calculatePayerRebates(): void {
    const payerRebateRate = this.assumptions.getAveragePayerRebate();

    this.payerRebateCovered = payerRebateRate.mul(this.grossRevenueCovered);
    this.payerRebateUncovered = toDecimal(0);
    this.payerRebateUninsured = toDecimal(0);
  }

  /**
   * Final Outputs:
   * 1. Patient Starts: coveredOutrightFirstFills + coveredAfterPAApprovedFirstFills + uncoveredAfterPADeniedFirstFills + uncoveredAfterNoPASubmittedFirstFills + uninsuredFirstFills
   * 2. Covered dispenses: coveredTRx amount
   * 3. Total Dispenses: coveredTRx amount + uncoveredTRx amount + uninsuredTRx amount
   * 4. Gross Revenue: Gross Revenues.1 + Gross Revenues.2 + Gross Revenues.3
   * 5. Gross Buydown: Buydowns.1 + Buydowns.2 + Buydowns.3
   * 6. Gross DSA: DSA.1 + DSA.2 + DSA.3
   * 7. Payer Rebate: Payer Rebate.1 + Payer Rebate.2 + Payer Rebate.3
   * 8. Net Revenues: Gross Revenue - (Gross Buydown + Gross DSA + Gross Payer Rebate)
   */
  public getFinalOutputs(): RoiFinalOutputs {
    const coveredOutrightFirstFills = this.volumeCalculations.coveredOutrightFirstFills.amount;
    const coveredAfterPAApprovedFirstFills = this.volumeCalculations.coveredAfterPAApprovedFirstFills.amount;
    const uncoveredAfterPADeniedFirstFills = this.volumeCalculations.uncoveredAfterPADeniedFirstFills.amount;
    const uncoveredAfterNoPASubmittedFirstFills = this.volumeCalculations.uncoveredAfterNoPASubmittedFirstFills.amount;
    const uninsuredFirstFills = this.volumeCalculations.uninsuredFirstFills.amount;
    const uncoveredTRx = this.volumeCalculations.uncoveredTRx.amount;
    const coveredTRx = this.volumeCalculations.coveredTRx.amount;
    const uninsuredTRx = this.volumeCalculations.uninsuredTRx.amount;

    const patientStarts = coveredOutrightFirstFills
      .add(coveredAfterPAApprovedFirstFills)
      .add(uncoveredAfterPADeniedFirstFills)
      .add(uncoveredAfterNoPASubmittedFirstFills)
      .add(uninsuredFirstFills);

    // 2. Covered dispenses
    const coveredDispenses = coveredTRx;

    // 3. Total Dispenses
    const totalDispenses = coveredTRx.add(uncoveredTRx).add(uninsuredTRx);

    // 4. Gross Revenue
    const grossRevenue = this.grossRevenueCovered
      .add(this.grossRevenueUncovered)
      .add(this.grossRevenueUninsured);

    // 5. Gross Buydown
    const grossBuydown = this.buydownCovered
      .add(this.buydownUncovered)
      .add(this.buydownUninsured);

    // 6. Gross DSA
    const grossDSA = this.dsaCovered.add(this.dsaUncovered).add(this.dsaUninsured);

    // 7. Payer Rebate
    const payerRebate = this.payerRebateCovered
      .add(this.payerRebateUncovered)
      .add(this.payerRebateUninsured);

    // 8. Net Revenues
    // Net Revenues = Gross Revenue - (Gross Buydown + Gross DSA + Gross Payer Rebate)
    const totalDeductions = grossBuydown.add(grossDSA).add(payerRebate);
    const netRevenues = grossRevenue.sub(totalDeductions);

    return {
      patientStarts,
      coveredDispenses,
      totalDispenses,
      grossRevenue,
      grossBuydown,
      grossDSA,
      payerRebate,
      netRevenues,
    };
  }

  // Getters for individual components (for debugging/verification)
  public getGrossRevenueCovered(): Decimal {
    return this.grossRevenueCovered;
  }

  public getGrossRevenueUncovered(): Decimal {
    return this.grossRevenueUncovered;
  }

  public getGrossRevenueUninsured(): Decimal {
    return this.grossRevenueUninsured;
  }

  public getBuydownCovered(): Decimal {
    return this.buydownCovered;
  }

  public getBuydownUncovered(): Decimal {
    return this.buydownUncovered;
  }

  public getBuydownUninsured(): Decimal {
    return this.buydownUninsured;
  }

  public getDSACovered(): Decimal {
    return this.dsaCovered;
  }

  public getDSAUncovered(): Decimal {
    return this.dsaUncovered;
  }

  public getDSAUninsured(): Decimal {
    return this.dsaUninsured;
  }

  public getPayerRebateCovered(): Decimal {
    return this.payerRebateCovered;
  }

  public getPayerRebateUncovered(): Decimal {
    return this.payerRebateUncovered;
  }

  public getPayerRebateUninsured(): Decimal {
    return this.payerRebateUninsured;
  }
}

