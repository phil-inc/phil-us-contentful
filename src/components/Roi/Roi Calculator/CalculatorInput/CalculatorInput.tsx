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
        title: "NRx per Month",
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
            label: ROI_INPUT_CONFIG.nRx.min.toString(),
          },
          {
            value: ROI_INPUT_CONFIG.nRx.max,
            label: ROI_INPUT_CONFIG.nRx.max.toString(),
          },
        ],
        tooltipMsg: "How many new scripts do you see per month?",
      },
      {
        keyName: "wac",
        title: "WAC Price for 30 Day Supply",
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
        tooltipMsg: "What is your current WAC price for 30 days of supply?",
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
          "What is your current prior authorization(PA) submission rate?",
      },
      {
        keyName: "inputAverageRefillsPerNRx",
        title: "Average Refills per Patient",
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
        tooltipMsg: "How many average refills do you typically see per patient?",
      },
      {
        keyName: "commerciallyInsuredPercentage",
        title: "How many patients are commercially insured?",
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
        tooltipMsg: "How many patients are commercially insured?",
      },
      //---switches
      {
        keyName: "haveHubService",
        title: "Do You Have Hub Services and/or Specialty Partner?",
        type: INPUT_TYPE.SWITCH,
        actualValue: ROI_INPUT_CONFIG.haveHubService,
        changeValue: (v: boolean) => handleChange("haveHubService", v),
        tooltipMsg: "Do you currently have a Hub Services and/or specialty Pharmacy (SP) partner?",
      },
      {
        keyName: "haveCoverCouponOffer",
        title: "Do You Offer a Coupon when Patient is Covered by Insurance?",
        type: INPUT_TYPE.SWITCH,
        actualValue: ROI_INPUT_CONFIG.haveCoverCouponOffer,
        changeValue: (v: boolean) => handleChange("haveCoverCouponOffer", v),
        tooltipMsg: "If a patient is covered by insurance (commercial), do you offer a coupon?",
      },
      {
        keyName: "haveUncoverCouponOffer",
        title: "Do You Offer a Cash Price when Patient is Not Covered by Insurance?",
        type: INPUT_TYPE.SWITCH,
        actualValue: ROI_INPUT_CONFIG.haveUncoverCouponOffer,
        changeValue: (v: boolean) => handleChange("haveUncoverCouponOffer", v),
        tooltipMsg: "If a patient is not covered by insurance (commercial), do you offer a cash price?",
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
