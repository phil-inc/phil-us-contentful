import Decimal from "decimal.js";
import { toDecimal } from "utils/decimal/decimal.utils";
import { RoiInputsDec } from "types/roi";
import { RoiAssumptions } from "config/roiAssumptions.config";
import { ProgramType } from "enum/global.enum";
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
  annualNRx: Decimal;
  enrollWithInsurance: RateAmount;
  enrollWithoutInsurance: RateAmount;
  dontEnroll: RateAmount;
  coveredOutright: RateAmount;
  requiresPA: RateAmount;
  paSubmitted: RateAmount;
  paNotSubmitted: RateAmount;
  paApproved: RateAmount;
  paDenied: RateAmount;
  coveredOutrightPriceShown: AmountAverage;
  coveredAfterPAApprovedPriceShown: AmountAverage;
  uncoveredAfterPADeniedPriceShown: AmountAverage;
  uncoveredAfterNoPASubmittedPriceShown: AmountAverage;
  uninsuredPriceShown: AmountAverage;
  coveredOutrightFirstFills: RateAmount;
  coveredAfterPAApprovedFirstFills: RateAmount;
  uncoveredAfterPADeniedFirstFills: RateAmount;
  uncoveredAfterNoPASubmittedFirstFills: RateAmount;
  uninsuredFirstFills: RateAmount;
  averageRefillsPerPatient: Decimal;
  uncoveredRefills: RateAmount;
  uncoveredTRx: RateAmount;
  coveredRefills: RateAmount;
  coveredTRx: RateAmount;
  uninsuredRefills: RateAmount;
  uninsuredTRx: RateAmount;
};

/**
 * Calculate annual NRx from monthly NRx
 */
function calculateAnnualNRx(monthlyNRx: Decimal): Decimal {
  return monthlyNRx.mul(12);
}

/**
 * Calculate enroll with insurance
 * rate: enrollmentRateAtPhil * enrollWithInsuranceRate
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
 * Calculate enroll without insurance
 * rate: enrollmentRateAtPhil * (1 - enrollWithInsuranceRate)
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
 * Calculate don't enroll
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
 * Calculate covered outright
 * rate: coveredOutrightRate
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
 * Calculate requires PA
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
 * Calculate PA submitted
 * rate: paSubmissionRateForPhil
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
 * Calculate PA not submitted
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
 * Calculate PA approved
 * rate: paApprovalRateForPhilAndRetail
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
 * Calculate PA denied
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
 * Calculate covered outright price shown
 * amount: coveredOutright amount
 * average: averageCoveredCopay
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
 * Calculate covered after PA approved price shown
 * amount: paApproved amount
 * average: averageCoveredCopay
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
 * Calculate uncovered after PA denied price shown
 * amount: paDenied amount
 * average: Case haveUncoverCouponOffer is true: uncoveredBuydown, Case haveUncoverCouponOffer is false: wac
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
 * Calculate uncovered after no PA submitted price shown
 * amount: paNotSubmitted amount
 * average: Case haveUncoverCouponOffer is true: uncoveredBuydown, Case haveUncoverCouponOffer is false: wac
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
 * Calculate uninsured price shown
 * amount: enrollWithoutInsurance amount
 * average: wac
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
 * Calculate covered outright first fills
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
 * Calculate covered after PA approved first fills
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
 * Calculate uncovered after PA denied first fills
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
 * Calculate uncovered after no PA submitted first fills
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
 * Calculate uninsured first fills
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
 * Calculate average refills per patient
 * inputAverageRefillsPerNRx * (1 + bumpInRefillRate)
 */
function calculateAverageRefillsPerPatient(
  inputAverageRefillsPerNRx: Decimal,
  bumpInRefillRate: Decimal
): Decimal {
  return inputAverageRefillsPerNRx.mul(toDecimal(1).add(bumpInRefillRate));
}

/**
 * Calculate uncovered refills
 * rate: averageRefillsPerPatient * (1 - discountToRefills)
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
 * Calculate uncovered TRx
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
 * Calculate covered refills
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
 * Calculate covered TRx
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
 * Calculate uninsured refills
 * rate: 0.5 (hard-coded)
 * amount: rate * uninsuredFirstFills amount
 */
function calculateUninsuredRefills(uninsuredFirstFills: RateAmount): RateAmount {
  const rate = toDecimal(0.5); // Hard-coded value
  const amount = rate.mul(uninsuredFirstFills.amount);
  return { rate, amount };
}

/**
 * Calculate uninsured TRx
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
  haveUncoverCouponOffer: boolean,
  programType: ProgramType,
  haveHubService: boolean
): VolumeCalculationsResult {
  // Annual NRx
  const annualNRx = calculateAnnualNRx(inputs.nRx);

  // Get assumption values (program-specific where applicable)
  const enrollmentRate =
    programType === ProgramType.PHIL
      ? assumptions.getEnrollmentRateAtPhil()
      : assumptions.getEnrollmentRateAtOther(haveHubService);
  const enrollWithInsuranceRate = assumptions.getEnrollWithInsuranceRate();
  const coveredOutrightRate = assumptions.getCoveredOutrightRate();
  const paSubmissionRate =
    programType === ProgramType.PHIL
      ? assumptions.getPASubmissionRateForPhil()
      : inputs.paSubmissionRate;
  const paApprovalRate =
    programType === ProgramType.PHIL
      ? assumptions.getPAApprovalRateForPhilAndRetail()
      : assumptions.getPAApprovalRateForRetailOther();
  const averageCoveredCopay = assumptions.getAverageCoveredCopay();
  const uncoveredBuydown = assumptions.getUncoveredBuydown();
  const bumpInRefillRate =
    programType === ProgramType.PHIL ? assumptions.getBumpInRefillRate() : toDecimal(0);
  const discountToRefills = assumptions.getDiscountToRefills(haveUncoverCouponOffer);

  // Enroll with insurance
  const enrollWithInsurance = calculateEnrollWithInsurance(
    annualNRx,
    enrollmentRate,
    enrollWithInsuranceRate
  );

  // Enroll without insurance
  const enrollWithoutInsurance = calculateEnrollWithoutInsurance(
    annualNRx,
    enrollmentRate,
    enrollWithInsuranceRate
  );

  // Don't enroll
  const dontEnroll = calculateDontEnroll(annualNRx, enrollWithInsurance, enrollWithoutInsurance);

  // Covered Outright
  const coveredOutright = calculateCoveredOutright(enrollWithInsurance, coveredOutrightRate);

  // Requires PA
  const requiresPA = calculateRequiresPA(enrollWithInsurance, coveredOutright);

  // PA Submitted
  const paSubmitted = calculatePASubmitted(requiresPA, paSubmissionRate);

  // PA not submitted
  const paNotSubmitted = calculatePANotSubmitted(requiresPA, paSubmitted);

  // PA Approved
  const paApproved = calculatePAApproved(paSubmitted, paApprovalRate);

  // PA Denied
  const paDenied = calculatePADenied(paSubmitted, paApproved);

  // Covered Outright Price shown
  const coveredOutrightPriceShown = calculateCoveredOutrightPriceShown(
    coveredOutright,
    averageCoveredCopay
  );

  // Covered After PA approved Price Shown
  const coveredAfterPAApprovedPriceShown = calculateCoveredAfterPAApprovedPriceShown(
    paApproved,
    averageCoveredCopay
  );

  // Uncovered after PA Denied Price Shown
  const uncoveredAfterPADeniedPriceShown = calculateUncoveredAfterPADeniedPriceShown(
    paDenied,
    inputs.wac,
    haveUncoverCouponOffer,
    uncoveredBuydown
  );

  // Uncovered after no PA Submitted Price Shown
  const uncoveredAfterNoPASubmittedPriceShown = calculateUncoveredAfterNoPASubmittedPriceShown(
    paNotSubmitted,
    inputs.wac,
    haveUncoverCouponOffer,
    uncoveredBuydown
  );

  // Uninsured Price Shown
  const uninsuredPriceShown = calculateUninsuredPriceShown(enrollWithoutInsurance, inputs.wac);

  // Covered Outright First Fills
  const coveredOutrightFirstFills = calculateCoveredOutrightFirstFills(coveredOutrightPriceShown);

  // Covered after PA Approved First fills
  const coveredAfterPAApprovedFirstFills = calculateCoveredAfterPAApprovedFirstFills(
    coveredAfterPAApprovedPriceShown
  );

  // Uncovered after PA denied First fills
  const uncoveredAfterPADeniedFirstFills = calculateUncoveredAfterPADeniedFirstFills(
    uncoveredAfterPADeniedPriceShown
  );

  // Uncovered after no PA submitted First fills
  const uncoveredAfterNoPASubmittedFirstFills = calculateUncoveredAfterNoPASubmittedFirstFills(
    uncoveredAfterNoPASubmittedPriceShown
  );

  // Uninsured First Fills
  const uninsuredFirstFills = calculateUninsuredFirstFills(uninsuredPriceShown);

  // Average Refills per patient input
  const averageRefillsPerPatient =
    programType === ProgramType.PHIL
      ? calculateAverageRefillsPerPatient(inputs.inputAverageRefillsPerNRx, bumpInRefillRate)
      : inputs.inputAverageRefillsPerNRx;

  // Uncovered Refills
  const uncoveredRefills = calculateUncoveredRefills(
    averageRefillsPerPatient,
    discountToRefills,
    uncoveredAfterPADeniedFirstFills,
    uncoveredAfterNoPASubmittedFirstFills
  );

  // Uncovered TRx
  const uncoveredTRx = calculateUncoveredTRx(
    uncoveredRefills,
    uncoveredAfterPADeniedFirstFills,
    uncoveredAfterNoPASubmittedFirstFills
  );

  // Covered Refills
  const coveredRefills = calculateCoveredRefills(
    averageRefillsPerPatient,
    coveredOutrightFirstFills,
    coveredAfterPAApprovedFirstFills,
    uncoveredAfterPADeniedFirstFills,
    uncoveredAfterNoPASubmittedFirstFills,
    uncoveredTRx
  );

  // Covered TRx
  const coveredTRx = calculateCoveredTRx(
    coveredRefills,
    coveredOutrightFirstFills,
    coveredAfterPAApprovedFirstFills
  );

  // Uninsured Refills
  const uninsuredRefills = calculateUninsuredRefills(uninsuredFirstFills);

  // Uninsured TRx
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
