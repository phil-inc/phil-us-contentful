import Decimal from "decimal.js";

import { INPUT_TYPE } from "enum/global.enum";

export type RoiInputsNum = {
  wac: number;
  nRx: number;
  paSubmissionRate: number;
  inputAverageRefillsPerNRx: number;
  haveHubService: boolean;
  haveCoverCouponOffer: boolean;
  haveUncoverCouponOffer: boolean;
  commerciallyInsuredPercentage: number;
};

export type RoiInputsDec = {
  wac: Decimal;
  nRx: Decimal;
  paSubmissionRate: Decimal;
  inputAverageRefillsPerNRx: Decimal;
  commerciallyInsuredPercentage: Decimal;
};

//input Fields
type BaseField = {
  keyName: string;
  title: string;
  tooltipMsg?: string;
};

export type ISwitchField = BaseField & {
  type: INPUT_TYPE.SWITCH;
  actualValue: boolean;
  changeValue: (v: boolean) => void;
};

export type ISliderField = BaseField & {
  type: INPUT_TYPE.SLIDER;
  actualValue: number;
  actulValueInString: string;
  min: number;
  max: number;
  step: number;
  marks: { value: number; label: string | number }[];
  changeValue: (v: number) => void;
};

export type FieldConfig = ISwitchField | ISliderField;
