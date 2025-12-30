import { toDecimal } from "utils/decimal/decimal.utils";
import { RoiInputsNum } from "types/roi";

type ROIInputRange = {
  min: number;
  max: number;
  preset: number;
  increment: number;
};

export const ROI_INPUT_CONFIG = {
  wac: {
    min: 100,
    max: 5000,
    preset: 650,
    increment: 50,
  },
  nRx: {
    min: 50,
    max: 100000,
    preset: 20000,
    increment: 50,
  },
  paSubmissionRate: {
    min: 0,
    max: 100,
    preset: 80,
    increment: 1,
  },
  averageRefillsPerNRx: {
    min: 1,
    max: 10,
    preset: 2,
    increment: 1,
  },
  commerciallyInsuredPercentage: {
    min: 0,
    max: 100,
    preset: 90,
    increment: 1,
  },
  haveHubService: true,
  haveCoverCouponOffer: true,
  haveUncoverCouponOffer: true,
  
};

export const PHIL_ROI_DEFAULT_INPUTS = {
  paSubmissionRate: 90,
};

export const RF_DEFAULT_STATS = {
  PHIL: {
    coveredRf: toDecimal(6),
    uncoveredRf: toDecimal(3),
    cashRf: toDecimal(3),
  },
  RETAIL: {
    coveredRf: toDecimal(3),
    uncoveredRf: toDecimal(2.5),
    cashRf: toDecimal(2.5),
  },
};
