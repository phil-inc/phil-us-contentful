import React, { useMemo } from "react";
import { Stack } from "@mantine/core";

import { ROI_INPUT_CONFIG } from "constants/roi.constant";
import { DISCLAIMER_ROI_TEXT } from "constants/identifiers";

import SingleSlider from "components/common/SingleSlider/SingleSlider";
import RoiHeading from "components/Roi/Roi Heading/RoiHeading";
import SwitchField from "components/common/SwitchField/SwitchField";
import InfoCircleIcon from "assets/images/icons/component/info-circle";

import { FieldConfig, RoiInputsNum } from "types/roi";
import { INPUT_TYPE } from "enum/global.enum";
import { ISection } from "types/section";
import { getInDollar, getInPercent, getInX } from "utils/utils";

import * as classes from "./CalculatorInput.module.css";

type CalculatorInputProps = {
  section: ISection;
  roiInputs: RoiInputsNum;
  setRoiInputs: React.Dispatch<React.SetStateAction<RoiInputsNum>>;
};

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  section,
  roiInputs,
  setRoiInputs,
}) => {
  const [showDisclaimer, setShowDisclaimer] = React.useState<boolean>(true);
  const handleChange = (key: keyof RoiInputsNum, value: number | boolean) => {
    setRoiInputs((prev) => ({ ...prev, [key]: value }));
    setShowDisclaimer(false);
  };

  const inputFields = useMemo<FieldConfig[]>(() => {
    return [
      // --sliders
      {
        keyName: "nRx",
        title: "NRx Volume",
        type: INPUT_TYPE.SLIDER,
        actualValue: roiInputs.nRx,
        actulValueInString: roiInputs.nRx.toString(),
        changeValue: (v: number) => handleChange("nRx", v),
        min: ROI_INPUT_CONFIG.nRx.min,
        max: ROI_INPUT_CONFIG.nRx.max,
        step: ROI_INPUT_CONFIG.nRx.increment,
        marks: [
          {
            value: ROI_INPUT_CONFIG.nRx.min,
            label: ROI_INPUT_CONFIG.nRx.min,
          },
          {
            value: ROI_INPUT_CONFIG.nRx.max,
            label: ROI_INPUT_CONFIG.nRx.max,
          },
        ],
        tooltipMsg: "Total number of new prescriptions expected per month",
      },
      {
        keyName: "wac",
        title: "WAC Estimate",
        type: INPUT_TYPE.SLIDER,
        actualValue: roiInputs.wac,
        actulValueInString: getInDollar(roiInputs.wac),
        changeValue: (v: number) => handleChange("wac", v),
        min: ROI_INPUT_CONFIG.wac.min,
        max: ROI_INPUT_CONFIG.wac.max,
        step: ROI_INPUT_CONFIG.wac.increment,
        marks: [
          {
            value: ROI_INPUT_CONFIG.wac.min,
            label: getInDollar(ROI_INPUT_CONFIG.wac.min),
          },
          {
            value: ROI_INPUT_CONFIG.wac.max,
            label: getInDollar(ROI_INPUT_CONFIG.wac.max),
          },
        ],
        tooltipMsg: "Wholesale Average Cost per prescription",
      },
      {
        keyName: "patientEnagedPercentage", // TODO:remove this
        title: "Patient Enrollment Rate",
        type: INPUT_TYPE.SLIDER,
        actualValue: roiInputs.patientEnagedPercentage,
        actulValueInString: getInPercent(roiInputs.patientEnagedPercentage),
        changeValue: (v: number) => handleChange("patientEnagedPercentage", v),
        min: ROI_INPUT_CONFIG.patientEnagedPercentage.min,
        max: ROI_INPUT_CONFIG.patientEnagedPercentage.max,
        step: ROI_INPUT_CONFIG.patientEnagedPercentage.increment,
        marks: [
          {
            value: ROI_INPUT_CONFIG.patientEnagedPercentage.min,
            label: getInPercent(ROI_INPUT_CONFIG.patientEnagedPercentage.min),
          },
          {
            value: ROI_INPUT_CONFIG.patientEnagedPercentage.max,
            label: getInPercent(ROI_INPUT_CONFIG.patientEnagedPercentage.max),
          },
        ],
        tooltipMsg: "Percentage of patients who enroll in your  program",
      },
      {
        keyName: "paSubmissionRate",
        title: "PA Submission Rate",
        type: INPUT_TYPE.SLIDER,
        actualValue: roiInputs.paSubmissionRate,
        actulValueInString: getInPercent(roiInputs.paSubmissionRate),
        changeValue: (v: number) => handleChange("paSubmissionRate", v),
        min: ROI_INPUT_CONFIG.paSubmissionRate.min,
        max: ROI_INPUT_CONFIG.paSubmissionRate.max,
        step: ROI_INPUT_CONFIG.paSubmissionRate.increment,
        marks: [
          {
            value: ROI_INPUT_CONFIG.paSubmissionRate.min,
            label: getInPercent(ROI_INPUT_CONFIG.paSubmissionRate.min),
          },
          {
            value: ROI_INPUT_CONFIG.paSubmissionRate.max,
            label: getInPercent(ROI_INPUT_CONFIG.paSubmissionRate.max),
          },
        ],
        tooltipMsg:
          "Rate of successfully submitted prior authorization requests.",
      },
      {
        keyName: "inputAverageRefillsPerNRx",
        title: "Refill Mutiplier",
        type: INPUT_TYPE.SLIDER,
        actualValue: roiInputs.inputAverageRefillsPerNRx,
        actulValueInString: getInX(roiInputs.inputAverageRefillsPerNRx),
        changeValue: (v: number) => handleChange("inputAverageRefillsPerNRx", v),
        min: ROI_INPUT_CONFIG.averageRefillsPerNRx.min,
        max: ROI_INPUT_CONFIG.averageRefillsPerNRx.max,
        step: ROI_INPUT_CONFIG.averageRefillsPerNRx.increment,
        marks: [
          {
            value: ROI_INPUT_CONFIG.averageRefillsPerNRx.min,
            label: getInX(ROI_INPUT_CONFIG.averageRefillsPerNRx.min),
          },
          {
            value: ROI_INPUT_CONFIG.averageRefillsPerNRx.max,
            label: getInX(ROI_INPUT_CONFIG.averageRefillsPerNRx.max),
          },
        ],
        tooltipMsg: "Average number of refills per patient",
      },
      {
        keyName: "commerciallyInsuredPercentage",
        title: "Commercially Insured Patients",
        type: INPUT_TYPE.SLIDER,
        actualValue: roiInputs.commerciallyInsuredPercentage,
        actulValueInString: getInPercent(roiInputs.commerciallyInsuredPercentage),
        changeValue: (v: number) => handleChange("commerciallyInsuredPercentage", v),
        min: ROI_INPUT_CONFIG.commerciallyInsuredPercentage.min,
        max: ROI_INPUT_CONFIG.commerciallyInsuredPercentage.max,
        step: ROI_INPUT_CONFIG.commerciallyInsuredPercentage.increment,
        marks: [
          {
            value: ROI_INPUT_CONFIG.commerciallyInsuredPercentage.min,
            label: getInPercent(ROI_INPUT_CONFIG.commerciallyInsuredPercentage.min),
          },
          {
            value: ROI_INPUT_CONFIG.commerciallyInsuredPercentage.max,
            label: getInPercent(ROI_INPUT_CONFIG.commerciallyInsuredPercentage.max),
          },
        ],
        tooltipMsg: "Percentage of patients covered by commercial insurance",
      },
      //---switches
      {
        keyName: "haveHubService",
        title: "Have Hub Services",
        type: INPUT_TYPE.SWITCH,
        actualValue: ROI_INPUT_CONFIG.haveHubService,
        changeValue: (v: boolean) => handleChange("haveHubService", v),
        tooltipMsg: "Indicates whether the brand offers dedicated hub services.",
      },
      {
        keyName: "haveCoverCouponOffer",
        title: "Cover Coupon Offer",
        type: INPUT_TYPE.SWITCH,
        actualValue: ROI_INPUT_CONFIG.haveCoverCouponOffer,
        changeValue: (v: boolean) => handleChange("haveCoverCouponOffer", v),
        tooltipMsg: "Indicates whether a co-pay coupon is offered.",
      },
      {
        keyName: "haveUncoverCouponOffer",
        title: "Uncovered Commercial Cash Offer",
        type: INPUT_TYPE.SWITCH,
        actualValue: ROI_INPUT_CONFIG.haveUncoverCouponOffer,
        changeValue: (v: boolean) => handleChange("haveUncoverCouponOffer", v),
        tooltipMsg: "Indicates whether a cash offer is available for commercially uninsured patients.",
      },
    ];
  }, [roiInputs]);

  return (
    <div className={classes.inputContainer}>
      <RoiHeading section={section} />
      {showDisclaimer && (
        <div className={classes.disclaimer}>
          <span className={classes.icon}>
            <InfoCircleIcon size={18} />
          </span>
          <div>{DISCLAIMER_ROI_TEXT}</div>
        </div>
      )}

      <Stack gap={"lg"} className={classes.sliderContainer}>
        {inputFields.map((field) => {
          switch (field.type) {
            case INPUT_TYPE.SWITCH:
              return <SwitchField key={field.keyName} switchData={field} />;

            case INPUT_TYPE.SLIDER:
              return <SingleSlider key={field.keyName} sliderProps={field} />;

            default:
              return null;
          }
        })}
      </Stack>
    </div>
  );
};

export default React.memo(CalculatorInput);
