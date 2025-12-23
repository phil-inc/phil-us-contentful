import Decimal from "decimal.js";
import { toDecimal } from "utils/decimal/decimal.utils";
import { RoiInputsDec } from "types/roi";
import { RoiAssumptions } from "config/roiAssumptions.config";
import { getApprovalRate } from "./ApprovalRateLookup";

/**
 * Volume Calculations
 * Pure functions module implementing all volume calculations from calculation.md
 * Each function is standalone with proper input and output parameters
 */

// Type definitions for calculation results
type RateAmount = {
  rate: Decimal;
  amount: Decimal;
};

type AmountAverage = {
  amount: Decimal;
  average: Decimal;
};

export type VolumeCalculationsResult = {
  // C.P.1
  annualNRx: Decimal;

  // C.P.2
  enrollWithInsurance: RateAmount;

  // C.P.3
  enrollWithoutInsurance: RateAmount;

  // C.P.4
  dontEnroll: RateAmount;

  // C.P.5
  coveredOutright: RateAmount;

  // C.P.6
  requiresPA: RateAmount;

  // C.P.7
  paSubmitted: RateAmount;

  // C.P.8
  paNotSubmitted: RateAmount;

  // C.P.9
  paApproved: RateAmount;

  // C.P.10
  paDenied: RateAmount;

  // C.P.11
  coveredOutrightPriceShown: AmountAverage;

  // C.P.12
  coveredAfterPAApprovedPriceShown: AmountAverage;

  // C.P.13
  uncoveredAfterPADeniedPriceShown: AmountAverage;

  // C.P.14
  uncoveredAfterNoPASubmittedPriceShown: AmountAverage;

  // C.P.15
  uninsuredPriceShown: AmountAverage;

  // C.P.16
  coveredOutrightFirstFills: RateAmount;

  // C.P.17
  coveredAfterPAApprovedFirstFills: RateAmount;

  // C.P.18
  uncoveredAfterPADeniedFirstFills: RateAmount;

  // C.P.19
  uncoveredAfterNoPASubmittedFirstFills: RateAmount;

  // C.P.20
  uninsuredFirstFills: RateAmount;

  // C.P.21
  averageRefillsPerPatient: Decimal;

  // C.P.22
  uncoveredRefills: RateAmount;

  // C.P.23
  uncoveredTRx: RateAmount;

  // C.P.24
  coveredRefills: RateAmount;

  // C.P.25
  coveredTRx: RateAmount;

  // C.P.26
  uninsuredRefills: RateAmount;

  // C.P.27
  uninsuredTRx: RateAmount;
};

/**
 * C.P.1: Calculate annual NRx from monthly NRx
 */
function calculateAnnualNRx(monthlyNRx: Decimal): Decimal {
  return monthlyNRx.mul(12);
}

/**
 * C.P.2: Calculate enroll with insurance
 * rate: A.2 * A.3
 * amount: annualNRx * rate
 */
function calculateEnrollWithInsurance(
  annualNRx: Decimal,
  enrollmentRateAtPhil: Decimal,
  enrollWithInsuranceRate: Decimal
): RateAmount {
  const rate = enrollmentRateAtPhil.mul(enrollWithInsuranceRate);
  const amount = annualNRx.mul(rate);
  return { rate, amount };
}

/**
 * C.P.3: Calculate enroll without insurance
 * rate: A.2 * (1 - A.3)
 * amount: annualNRx * rate
 */
function calculateEnrollWithoutInsurance(
  annualNRx: Decimal,
  enrollmentRateAtPhil: Decimal,
  enrollWithInsuranceRate: Decimal
): RateAmount {
  const rate = enrollmentRateAtPhil.mul(toDecimal(1).sub(enrollWithInsuranceRate));
  const amount = annualNRx.mul(rate);
  return { rate, amount };
}

/**
 * C.P.4: Calculate don't enroll
 * rate: 1 - (enrollWithInsurance rate + enrollWithoutInsurance rate)
 * amount: annualNRx * rate
 */
function calculateDontEnroll(
  annualNRx: Decimal,
  enrollWithInsurance: RateAmount,
  enrollWithoutInsurance: RateAmount
): RateAmount {
  const rate = toDecimal(1).sub(enrollWithInsurance.rate.add(enrollWithoutInsurance.rate));
  const amount = annualNRx.mul(rate);
  return { rate, amount };
}

/**
 * C.P.5: Calculate covered outright
 * rate: A.4
 * amount: rate * enrollWithInsurance amount
 */
function calculateCoveredOutright(
  enrollWithInsurance: RateAmount,
  coveredOutrightRate: Decimal
): RateAmount {
  const rate = coveredOutrightRate;
  const amount = rate.mul(enrollWithInsurance.amount);
  return { rate, amount };
}

/**
 * C.P.6: Calculate requires PA
 * rate: 1 - coveredOutright rate
 * amount: rate * enrollWithInsurance amount
 */
function calculateRequiresPA(
  enrollWithInsurance: RateAmount,
  coveredOutright: RateAmount
): RateAmount {
  const rate = toDecimal(1).sub(coveredOutright.rate);
  const amount = rate.mul(enrollWithInsurance.amount);
  return { rate, amount };
}

/**
 * C.P.7: Calculate PA submitted
 * rate: A.8
 * amount: rate * requiresPA amount
 */
function calculatePASubmitted(
  requiresPA: RateAmount,
  paSubmissionRateForPhil: Decimal
): RateAmount {
  const rate = paSubmissionRateForPhil;
  const amount = rate.mul(requiresPA.amount);
  return { rate, amount };
}

/**
 * C.P.8: Calculate PA not submitted
 * rate: 1 - paSubmitted rate
 * amount: rate * requiresPA amount
 */
function calculatePANotSubmitted(
  requiresPA: RateAmount,
  paSubmitted: RateAmount
): RateAmount {
  const rate = toDecimal(1).sub(paSubmitted.rate);
  const amount = rate.mul(requiresPA.amount);
  return { rate, amount };
}

/**
 * C.P.9: Calculate PA approved
 * rate: A.9
 * amount: rate * paSubmitted amount
 */
function calculatePAApproved(
  paSubmitted: RateAmount,
  paApprovalRateForPhilAndRetail: Decimal
): RateAmount {
  const rate = paApprovalRateForPhilAndRetail;
  const amount = rate.mul(paSubmitted.amount);
  return { rate, amount };
}

/**
 * C.P.10: Calculate PA denied
 * rate: 1 - paApproved rate
 * amount: rate * paSubmitted amount
 */
function calculatePADenied(
  paSubmitted: RateAmount,
  paApproved: RateAmount
): RateAmount {
  const rate = toDecimal(1).sub(paApproved.rate);
  const amount = rate.mul(paSubmitted.amount);
  return { rate, amount };
}

/**
 * C.P.11: Calculate covered outright price shown
 * amount: coveredOutright amount
 * average: A.12
 */
function calculateCoveredOutrightPriceShown(
  coveredOutright: RateAmount,
  averageCoveredCopay: Decimal
): AmountAverage {
  return {
    amount: coveredOutright.amount,
    average: averageCoveredCopay,
  };
}

/**
 * C.P.12: Calculate covered after PA approved price shown
 * amount: paApproved amount
 * average: A.12
 */
function calculateCoveredAfterPAApprovedPriceShown(
  paApproved: RateAmount,
  averageCoveredCopay: Decimal
): AmountAverage {
  return {
    amount: paApproved.amount,
    average: averageCoveredCopay,
  };
}

/**
 * C.P.13: Calculate uncovered after PA denied price shown
 * amount: paDenied amount
 * average: Case I.7 is true: A.14, Case I.7 is false: I.2
 */
function calculateUncoveredAfterPADeniedPriceShown(
  paDenied: RateAmount,
  wac: Decimal,
  haveUncoverCouponOffer: boolean,
  uncoveredBuydown: Decimal
): AmountAverage {
  const average = haveUncoverCouponOffer ? uncoveredBuydown : wac;
  return {
    amount: paDenied.amount,
    average,
  };
}

/**
 * C.P.14: Calculate uncovered after no PA submitted price shown
 * amount: paNotSubmitted amount
 * average: Case I.7 is true: A.14, Case I.7 is false: I.2
 */
function calculateUncoveredAfterNoPASubmittedPriceShown(
  paNotSubmitted: RateAmount,
  wac: Decimal,
  haveUncoverCouponOffer: boolean,
  uncoveredBuydown: Decimal
): AmountAverage {
  const average = haveUncoverCouponOffer ? uncoveredBuydown : wac;
  return {
    amount: paNotSubmitted.amount,
    average,
  };
}

/**
 * C.P.15: Calculate uninsured price shown
 * amount: enrollWithoutInsurance amount
 * average: I.2
 */
function calculateUninsuredPriceShown(
  enrollWithoutInsurance: RateAmount,
  wac: Decimal
): AmountAverage {
  return {
    amount: enrollWithoutInsurance.amount,
    average: wac,
  };
}

/**
 * C.P.16: Calculate covered outright first fills
 * rate: Look up from table using coveredOutrightPriceShown average
 * amount: rate * coveredOutrightPriceShown amount
 */
function calculateCoveredOutrightFirstFills(
  coveredOutrightPriceShown: AmountAverage
): RateAmount {
  const rate = getApprovalRate(coveredOutrightPriceShown.average);
  const amount = rate.mul(coveredOutrightPriceShown.amount);
  return { rate, amount };
}

/**
 * C.P.17: Calculate covered after PA approved first fills
 * rate: Look up from table using coveredAfterPAApprovedPriceShown average
 * amount: rate * coveredAfterPAApprovedPriceShown amount
 */
function calculateCoveredAfterPAApprovedFirstFills(
  coveredAfterPAApprovedPriceShown: AmountAverage
): RateAmount {
  const rate = getApprovalRate(coveredAfterPAApprovedPriceShown.average);
  const amount = rate.mul(coveredAfterPAApprovedPriceShown.amount);
  return { rate, amount };
}

/**
 * C.P.18: Calculate uncovered after PA denied first fills
 * rate: Look up from table using uncoveredAfterPADeniedPriceShown average
 * amount: rate * uncoveredAfterPADeniedPriceShown amount
 */
function calculateUncoveredAfterPADeniedFirstFills(
  uncoveredAfterPADeniedPriceShown: AmountAverage
): RateAmount {
  const rate = getApprovalRate(uncoveredAfterPADeniedPriceShown.average);
  const amount = rate.mul(uncoveredAfterPADeniedPriceShown.amount);
  return { rate, amount };
}

/**
 * C.P.19: Calculate uncovered after no PA submitted first fills
 * rate: Look up from table using uncoveredAfterNoPASubmittedPriceShown average
 * amount: rate * uncoveredAfterNoPASubmittedPriceShown amount
 */
function calculateUncoveredAfterNoPASubmittedFirstFills(
  uncoveredAfterNoPASubmittedPriceShown: AmountAverage
): RateAmount {
  const rate = getApprovalRate(uncoveredAfterNoPASubmittedPriceShown.average);
  const amount = rate.mul(uncoveredAfterNoPASubmittedPriceShown.amount);
  return { rate, amount };
}

/**
 * C.P.20: Calculate uninsured first fills
 * rate: Look up from table using uninsuredPriceShown average
 * amount: rate * uninsuredPriceShown amount
 */
function calculateUninsuredFirstFills(
  uninsuredPriceShown: AmountAverage
): RateAmount {
  const rate = getApprovalRate(uninsuredPriceShown.average);
  const amount = rate.mul(uninsuredPriceShown.amount);
  return { rate, amount };
}

/**
 * C.P.21: Calculate average refills per patient
 * I.5 * (1 + A.5)
 */
function calculateAverageRefillsPerPatient(
  inputAverageRefillsPerNRx: Decimal,
  bumpInRefillRate: Decimal
): Decimal {
  return inputAverageRefillsPerNRx.mul(toDecimal(1).add(bumpInRefillRate));
}

/**
 * C.P.22: Calculate uncovered refills
 * rate: averageRefillsPerPatient * (1 - A.6)
 * amount: rate * (uncoveredAfterPADeniedFirstFills amount + uncoveredAfterNoPASubmittedFirstFills amount)
 */
function calculateUncoveredRefills(
  averageRefillsPerPatient: Decimal,
  discountToRefills: Decimal,
  uncoveredAfterPADeniedFirstFills: RateAmount,
  uncoveredAfterNoPASubmittedFirstFills: RateAmount
): RateAmount {
  const rate = averageRefillsPerPatient.mul(toDecimal(1).sub(discountToRefills));
  const amount = rate.mul(
    uncoveredAfterPADeniedFirstFills.amount.add(uncoveredAfterNoPASubmittedFirstFills.amount)
  );
  return { rate, amount };
}

/**
 * C.P.23: Calculate uncovered TRx
 * amount: uncoveredRefills amount + uncoveredAfterPADeniedFirstFills amount + uncoveredAfterNoPASubmittedFirstFills amount
 * rate: amount / (uncoveredAfterPADeniedFirstFills amount + uncoveredAfterNoPASubmittedFirstFills amount)
 */
function calculateUncoveredTRx(
  uncoveredRefills: RateAmount,
  uncoveredAfterPADeniedFirstFills: RateAmount,
  uncoveredAfterNoPASubmittedFirstFills: RateAmount
): RateAmount {
  const amount = uncoveredRefills.amount
    .add(uncoveredAfterPADeniedFirstFills.amount)
    .add(uncoveredAfterNoPASubmittedFirstFills.amount);
  const denominator = uncoveredAfterPADeniedFirstFills.amount.add(
    uncoveredAfterNoPASubmittedFirstFills.amount
  );
  const rate = denominator.gt(0) ? amount.div(denominator) : toDecimal(0);
  return { rate, amount };
}

/**
 * C.P.24: Calculate covered refills
 * rate: (((averageRefillsPerPatient + 1) * (coveredOutrightFirstFills amount + coveredAfterPAApprovedFirstFills amount + uncoveredAfterPADeniedFirstFills amount + uncoveredAfterNoPASubmittedFirstFills amount) - uncoveredTRx amount) / (coveredOutrightFirstFills amount + coveredAfterPAApprovedFirstFills amount)) - 1
 * amount: rate * (coveredOutrightFirstFills amount + coveredAfterPAApprovedFirstFills amount)
 */
function calculateCoveredRefills(
  averageRefillsPerPatient: Decimal,
  coveredOutrightFirstFills: RateAmount,
  coveredAfterPAApprovedFirstFills: RateAmount,
  uncoveredAfterPADeniedFirstFills: RateAmount,
  uncoveredAfterNoPASubmittedFirstFills: RateAmount,
  uncoveredTRx: RateAmount
): RateAmount {
  const numerator = averageRefillsPerPatient
    .add(1)
    .mul(
      coveredOutrightFirstFills.amount
        .add(coveredAfterPAApprovedFirstFills.amount)
        .add(uncoveredAfterPADeniedFirstFills.amount)
        .add(uncoveredAfterNoPASubmittedFirstFills.amount)
    )
    .sub(uncoveredTRx.amount);
  const denominator = coveredOutrightFirstFills.amount.add(
    coveredAfterPAApprovedFirstFills.amount
  );
  const rate = denominator.gt(0) ? numerator.div(denominator).sub(1) : toDecimal(0);
  const amount = rate.mul(denominator);
  return { rate, amount };
}

/**
 * C.P.25: Calculate covered TRx
 * amount: coveredRefills amount + coveredOutrightFirstFills amount + coveredAfterPAApprovedFirstFills amount
 * rate: amount / (coveredOutrightFirstFills amount + coveredAfterPAApprovedFirstFills amount)
 */
function calculateCoveredTRx(
  coveredRefills: RateAmount,
  coveredOutrightFirstFills: RateAmount,
  coveredAfterPAApprovedFirstFills: RateAmount
): RateAmount {
  const amount = coveredRefills.amount
    .add(coveredOutrightFirstFills.amount)
    .add(coveredAfterPAApprovedFirstFills.amount);
  const denominator = coveredOutrightFirstFills.amount.add(
    coveredAfterPAApprovedFirstFills.amount
  );
  const rate = denominator.gt(0) ? amount.div(denominator) : toDecimal(0);
  return { rate, amount };
}

/**
 * C.P.26: Calculate uninsured refills
 * rate: 0.5 (hard-coded)
 * amount: rate * uninsuredFirstFills amount
 */
function calculateUninsuredRefills(uninsuredFirstFills: RateAmount): RateAmount {
  const rate = toDecimal(0.5); // Hard-coded value
  const amount = rate.mul(uninsuredFirstFills.amount);
  return { rate, amount };
}

/**
 * C.P.27: Calculate uninsured TRx
 * amount: uninsuredRefills amount + uninsuredFirstFills amount
 * rate: amount / uninsuredFirstFills amount
 */
function calculateUninsuredTRx(
  uninsuredRefills: RateAmount,
  uninsuredFirstFills: RateAmount
): RateAmount {
  const amount = uninsuredRefills.amount.add(uninsuredFirstFills.amount);
  const rate = uninsuredFirstFills.amount.gt(0)
    ? amount.div(uninsuredFirstFills.amount)
    : toDecimal(0);
  return { rate, amount };
}

/**
 * Main function to calculate all volume calculations
 * Orchestrates all calculation functions step by step
 */
export function getVolumeCalculations(
  inputs: RoiInputsDec,
  assumptions: RoiAssumptions,
  haveUncoverCouponOffer: boolean
): VolumeCalculationsResult {
  // C.P.1: Annual NRx
  const annualNRx = calculateAnnualNRx(inputs.nRx);

  // Get assumption values
  const enrollmentRateAtPhil = assumptions.getEnrollmentRateAtPhil();
  const enrollWithInsuranceRate = assumptions.getEnrollWithInsuranceRate();
  const coveredOutrightRate = assumptions.getCoveredOutrightRate();
  const paSubmissionRateForPhil = assumptions.getPASubmissionRateForPhil();
  const paApprovalRateForPhilAndRetail = assumptions.getPAApprovalRateForPhilAndRetail();
  const averageCoveredCopay = assumptions.getAverageCoveredCopay();
  const uncoveredBuydown = assumptions.getUncoveredBuydown();
  const bumpInRefillRate = assumptions.getBumpInRefillRate();
  const discountToRefills = assumptions.getDiscountToRefills(haveUncoverCouponOffer);

  // C.P.2: Enroll with insurance
  const enrollWithInsurance = calculateEnrollWithInsurance(
    annualNRx,
    enrollmentRateAtPhil,
    enrollWithInsuranceRate
  );

  // C.P.3: Enroll without insurance
  const enrollWithoutInsurance = calculateEnrollWithoutInsurance(
    annualNRx,
    enrollmentRateAtPhil,
    enrollWithInsuranceRate
  );

  // C.P.4: Don't enroll
  const dontEnroll = calculateDontEnroll(annualNRx, enrollWithInsurance, enrollWithoutInsurance);

  // C.P.5: Covered Outright
  const coveredOutright = calculateCoveredOutright(enrollWithInsurance, coveredOutrightRate);

  // C.P.6: Requires PA
  const requiresPA = calculateRequiresPA(enrollWithInsurance, coveredOutright);

  // C.P.7: PA Submitted
  const paSubmitted = calculatePASubmitted(requiresPA, paSubmissionRateForPhil);

  // C.P.8: PA not submitted
  const paNotSubmitted = calculatePANotSubmitted(requiresPA, paSubmitted);

  // C.P.9: PA Approved
  const paApproved = calculatePAApproved(paSubmitted, paApprovalRateForPhilAndRetail);

  // C.P.10: PA Denied
  const paDenied = calculatePADenied(paSubmitted, paApproved);

  // C.P.11: Covered Outright Price shown
  const coveredOutrightPriceShown = calculateCoveredOutrightPriceShown(
    coveredOutright,
    averageCoveredCopay
  );

  // C.P.12: Covered After PA approved Price Shown
  const coveredAfterPAApprovedPriceShown = calculateCoveredAfterPAApprovedPriceShown(
    paApproved,
    averageCoveredCopay
  );

  // C.P.13: Uncovered after PA Denied Price Shown
  const uncoveredAfterPADeniedPriceShown = calculateUncoveredAfterPADeniedPriceShown(
    paDenied,
    inputs.wac,
    haveUncoverCouponOffer,
    uncoveredBuydown
  );

  // C.P.14: Uncovered after no PA Submitted Price Shown
  const uncoveredAfterNoPASubmittedPriceShown = calculateUncoveredAfterNoPASubmittedPriceShown(
    paNotSubmitted,
    inputs.wac,
    haveUncoverCouponOffer,
    uncoveredBuydown
  );

  // C.P.15: Uninsured Price Shown
  const uninsuredPriceShown = calculateUninsuredPriceShown(enrollWithoutInsurance, inputs.wac);

  // C.P.16: Covered Outright First Fills
  const coveredOutrightFirstFills = calculateCoveredOutrightFirstFills(coveredOutrightPriceShown);

  // C.P.17: Covered after PA Approved First fills
  const coveredAfterPAApprovedFirstFills = calculateCoveredAfterPAApprovedFirstFills(
    coveredAfterPAApprovedPriceShown
  );

  // C.P.18: Uncovered after PA denied First fills
  const uncoveredAfterPADeniedFirstFills = calculateUncoveredAfterPADeniedFirstFills(
    uncoveredAfterPADeniedPriceShown
  );

  // C.P.19: Uncovered after no PA submitted First fills
  const uncoveredAfterNoPASubmittedFirstFills = calculateUncoveredAfterNoPASubmittedFirstFills(
    uncoveredAfterNoPASubmittedPriceShown
  );

  // C.P.20: Uninsured First Fills
  const uninsuredFirstFills = calculateUninsuredFirstFills(uninsuredPriceShown);

  // C.P.21: Average Refills per patient input
  console.log("=== Volume Calc - Average Refills Inputs ===");
  console.log(
    "inputs.averageRefillsPerNRx:",
    inputs.inputAverageRefillsPerNRx.toString()
  );
  console.log("bumpInRefillRate (A.5):", bumpInRefillRate.toString());
  const averageRefillsPerPatient = calculateAverageRefillsPerPatient(
    inputs.inputAverageRefillsPerNRx,
    bumpInRefillRate
  );
  console.log(
    "averageRefillsPerPatient (C.P.21):",
    averageRefillsPerPatient.toString()
  );

  // C.P.22: Uncovered Refills
  const uncoveredRefills = calculateUncoveredRefills(
    averageRefillsPerPatient,
    discountToRefills,
    uncoveredAfterPADeniedFirstFills,
    uncoveredAfterNoPASubmittedFirstFills
  );

  // C.P.23: Uncovered TRx
  const uncoveredTRx = calculateUncoveredTRx(
    uncoveredRefills,
    uncoveredAfterPADeniedFirstFills,
    uncoveredAfterNoPASubmittedFirstFills
  );

  // C.P.24: Covered Refills
  const coveredRefills = calculateCoveredRefills(
    averageRefillsPerPatient,
    coveredOutrightFirstFills,
    coveredAfterPAApprovedFirstFills,
    uncoveredAfterPADeniedFirstFills,
    uncoveredAfterNoPASubmittedFirstFills,
    uncoveredTRx
  );

  // C.P.25: Covered TRx
  const coveredTRx = calculateCoveredTRx(
    coveredRefills,
    coveredOutrightFirstFills,
    coveredAfterPAApprovedFirstFills
  );

  // C.P.26: Uninsured Refills
  const uninsuredRefills = calculateUninsuredRefills(uninsuredFirstFills);

  // C.P.27: Uninsured TRx
  const uninsuredTRx = calculateUninsuredTRx(uninsuredRefills, uninsuredFirstFills);

  // Return all calculations in a flat object
  return {
    annualNRx,
    enrollWithInsurance,
    enrollWithoutInsurance,
    dontEnroll,
    coveredOutright,
    requiresPA,
    paSubmitted,
    paNotSubmitted,
    paApproved,
    paDenied,
    coveredOutrightPriceShown,
    coveredAfterPAApprovedPriceShown,
    uncoveredAfterPADeniedPriceShown,
    uncoveredAfterNoPASubmittedPriceShown,
    uninsuredPriceShown,
    coveredOutrightFirstFills,
    coveredAfterPAApprovedFirstFills,
    uncoveredAfterPADeniedFirstFills,
    uncoveredAfterNoPASubmittedFirstFills,
    uninsuredFirstFills,
    averageRefillsPerPatient,
    uncoveredRefills,
    uncoveredTRx,
    coveredRefills,
    coveredTRx,
    uninsuredRefills,
    uninsuredTRx,
  };
}
