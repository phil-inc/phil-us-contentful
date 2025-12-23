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
    console.log("=== RoiFinal - GrossRevenue Inputs ===");
    console.log("wac (I.2):", this.inputs.wac.toString());
    console.log(
      "C.P.25 (coveredTRx):",
      this.volumeCalculations.coveredTRx.amount.toString()
    );
    console.log(
      "C.P.23 (uncoveredTRx):",
      this.volumeCalculations.uncoveredTRx.amount.toString()
    );
    console.log(
      "C.P.27 (uninsuredTRx):",
      this.volumeCalculations.uninsuredTRx.amount.toString()
    );
    console.log("GrossRevenueCovered:", this.grossRevenueCovered.toString());
    console.log("GrossRevenueUncovered:", this.grossRevenueUncovered.toString());
    console.log("GrossRevenueUninsured:", this.grossRevenueUninsured.toString());
    this.calculateBuydowns();
    console.log("=== RoiFinal - Buydowns Inputs ===");
    console.log("haveCoverCouponOffer (I.6):", this.haveCoverCouponOffer);
    console.log("haveUncoverCouponOffer (I.7):", this.haveUncoverCouponOffer);
    console.log("A.12 (avgCoveredCopay):", this.assumptions.getAverageCoveredCopay().toString());
    console.log("A.13 (coveredBuydownRate):", this.assumptions.getCoveredBuydown().toString());
    console.log("A.14 (uncoveredBuydown $):", this.assumptions.getUncoveredBuydown().toString());
    console.log("BuydownCovered:", this.buydownCovered.toString());
    console.log("BuydownUncovered:", this.buydownUncovered.toString());
    console.log("BuydownUninsured:", this.buydownUninsured.toString());
    this.calculateDSAs();
    console.log("=== RoiFinal - DSAs Inputs ===");
    console.log("DSA rate (A.7.a):", this.assumptions.getDSA().toString());
    console.log("DSA Covered:", this.dsaCovered.toString());
    console.log("DSA Uncovered:", this.dsaUncovered.toString());
    console.log("DSA Uninsured:", this.dsaUninsured.toString());
    this.calculatePayerRebates();
    console.log("=== RoiFinal - PayerRebates Inputs ===");
    console.log(
      "PayerRebate rate (A.11):",
      this.assumptions.getAveragePayerRebate().toString()
    );
    console.log(
      "PayerRebateCovered (A.11 * GrossRevenueCovered):",
      this.payerRebateCovered.toString()
    );
    console.log(
      "PayerRebateUncovered (A.11 * GrossRevenueUncovered):",
      this.payerRebateUncovered.toString()
    );
    console.log("PayerRebateUninsured (should be 0):", this.payerRebateUninsured.toString());
  }

  /**
   * Gross Revenues:
   * 1. Covered amount: C.P.25 amount * I.2
   * 2. Uncovered amount: C.P.23 amount * I.2
   *    Note: Spec says C.P.26, but C.P.26 is "Uninsured Refills", not "Uncovered TRx"
   *    C.P.23 is "Uncovered TRx", which is the correct value to use
   * 3. Uninsured amount: C.P.27 amount * I.2
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
   *    Case if I.6 is false: value 0
   *    Case if I.6 is true: A.12 * A.13 * C.P.25 amount
   * 2. Uncovered amount:
   *    Case if I.7 is false: value 0
   *    Case if I.7 is true: (I.2 - A.14) * C.P.23 amount
   * 3. Uninsured amount: {0}
   */
  private calculateBuydowns(): void {
    const coveredTRx = this.volumeCalculations.coveredTRx.amount;
    const uncoveredTRx = this.volumeCalculations.uncoveredTRx.amount;

    // Covered buydown
    if (this.haveCoverCouponOffer) {
      const avgCoveredCopay = this.assumptions.getAverageCoveredCopay();
      const coveredBuydownRate = this.assumptions.getCoveredBuydown();
      this.buydownCovered = avgCoveredCopay.mul(coveredBuydownRate).mul(coveredTRx);
    } else {
      this.buydownCovered = toDecimal(0);
    }

    // Uncovered buydown
    if (this.haveUncoverCouponOffer) {
      const uncoveredBuydown = this.assumptions.getUncoveredBuydown();
      this.buydownUncovered = this.inputs.wac.sub(uncoveredBuydown).mul(uncoveredTRx);
    } else {
      this.buydownUncovered = toDecimal(0);
    }

    // Uninsured buydown (hard-coded to 0)
    this.buydownUninsured = toDecimal(0);
  }

  /**
   * DSAs:
   * 1. Covered amount: A.7.a * Gross Revenue's covered amount
   * 2. Uncovered amount: A.7.a * Gross Revenue's uncovered amount
   * 3. Uninsured amount: A.7.a * Gross Revenue's uninsured amount
   */
  private calculateDSAs(): void {
    const dsaRate = this.assumptions.getDSA();

    this.dsaCovered = dsaRate.mul(this.grossRevenueCovered);
    this.dsaUncovered = dsaRate.mul(this.grossRevenueUncovered);
    this.dsaUninsured = dsaRate.mul(this.grossRevenueUninsured);
  }

  /**
   * Payer Rebates:
   * 1. Covered amount: A.11 * Gross Revenue's covered amount
   * 2. Uncovered amount: A.11 * Gross Revenue's uncovered amount
   * 3. Uninsured amount: {0}
   */
  private calculatePayerRebates(): void {
    const payerRebateRate = this.assumptions.getAveragePayerRebate();

    this.payerRebateCovered = payerRebateRate.mul(this.grossRevenueCovered);
    this.payerRebateUncovered = payerRebateRate.mul(this.grossRevenueUncovered);
    this.payerRebateUninsured = toDecimal(0);
  }

  /**
   * Final Outputs:
   * 1. Patient Starts: C.P.16 amount + C.P.17 amount + C.P.18 amount + C.P.19 amount + C.P.20 amount
   * 2. Covered dispenses: C.P.25 amount
   * 3. Total Dispenses: C.P.25 amount + C.P.23 amount + C.P.27 amount
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

    console.log("=== RoiFinal - FinalOutputs Inputs (C.P.* & component sums) ===");
    console.log("C.P.16 amount (Covered Outright FF):", coveredOutrightFirstFills.toString());
    console.log("C.P.17 amount (Covered after PA FF):", coveredAfterPAApprovedFirstFills.toString());
    console.log("C.P.18 amount (Uncovered after PA denied FF):", uncoveredAfterPADeniedFirstFills.toString());
    console.log("C.P.19 amount (Uncovered after no PA FF):", uncoveredAfterNoPASubmittedFirstFills.toString());
    console.log("C.P.20 amount (Uninsured FF):", uninsuredFirstFills.toString());
    console.log("C.P.23 amount (Uncovered TRx):", uncoveredTRx.toString());
    console.log("C.P.25 amount (Covered TRx):", coveredTRx.toString());
    console.log("C.P.27 amount (Uninsured TRx):", uninsuredTRx.toString());
    console.log("GrossRevenueCovered:", this.grossRevenueCovered.toString());
    console.log("GrossRevenueUncovered:", this.grossRevenueUncovered.toString());
    console.log("GrossRevenueUninsured:", this.grossRevenueUninsured.toString());
    console.log("BuydownCovered:", this.buydownCovered.toString());
    console.log("BuydownUncovered:", this.buydownUncovered.toString());
    console.log("BuydownUninsured:", this.buydownUninsured.toString());
    console.log("DSA Covered:", this.dsaCovered.toString());
    console.log("DSA Uncovered:", this.dsaUncovered.toString());
    console.log("DSA Uninsured:", this.dsaUninsured.toString());
    console.log("PayerRebateCovered:", this.payerRebateCovered.toString());
    console.log("PayerRebateUncovered:", this.payerRebateUncovered.toString());
    console.log("PayerRebateUninsured:", this.payerRebateUninsured.toString());
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

