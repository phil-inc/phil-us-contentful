import { ROIinputs } from "types/roi";

type ROIInputRange = {
  min: number;
  max: number;
  preset: number;
  increment?: number;
  subIncrement?: number;
};

export const ROI_INPUT_CONFIG: Record<keyof ROIinputs, ROIInputRange> = {
  wac: {
    min: 0,
    max: 5000,
    preset: 1000,
    increment: 100,
  },
  nRx: {
    min: 0,
    max: 100000,
    preset: 10000,
    increment: 1000,
  },
  patientEnagedPercentage: {
    min: 0,
    max: 100,
    preset: 65,
  },
  paSubmissionRate: {
    min: 0,
    max: 100,
    preset: 50,
  },
  averageRefillsPerNRx: {
    min: 1,
    max: 4,
    preset: 2.5,
    increment: 0.5,
  },
};

export const PHIL_ROI_DEFAULT_INPUTS = {
    patientEnagedPercentage: 91,
    paSubmissionRate: 90,
    // averageRefillsPerNRx: 4.8,
    averageRefillsPerNRx: 500,
}
export const RF_DEFAULT_STATS = {
    PHIL : {
        coveredRf: 6,
        uncoveredRf: 3,
        cashRf: 3,
    },
    RETAIL : {
        coveredRf: 3,
        uncoveredRf: 2.5,
        cashRf: 2.5,
    }
}
