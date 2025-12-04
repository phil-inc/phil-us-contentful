import Decimal from "decimal.js";

export type RoiInputsNum = {
  wac: number;
  nRx: number;
  patientEnagedPercentage: number;
  paSubmissionRate: number;
  averageRefillsPerNRx: number;
};

export type RoiInputsDec = {
  wac: Decimal;
  nRx: Decimal;
  patientEnagedPercentage: Decimal;
  paSubmissionRate: Decimal;
  averageRefillsPerNRx: Decimal;
};

export type SliderConfig = {
  keyName: string;
  title: string;
  actualValue: number;
  actulValueInString: string;
  changeValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
  marks: { value: number; label: string | number }[];
  tootipMsg?: string;
};
