import React, { useMemo } from "react";
import { Stack } from "@mantine/core";

import { ROI_INPUT_CONFIG } from "constants/roi.constant";
import { DISCLAIMER_ROI_TEXT } from "constants/identifiers";

import SingleSlider from "components/common/SingleSlider/SingleSlider";
import RoiHeading from "components/Roi/Roi Heading/RoiHeading";
import InfoCircleIcon from "assets/images/icons/component/info-circle";

import { RoiInputsNum, SliderConfig } from "types/roi";
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
  const handleChange = (key: keyof RoiInputsNum, value: number) => {
    setRoiInputs((prev) => ({ ...prev, [key]: value }));
    setShowDisclaimer(false);
  };

  const slidersData = useMemo<SliderConfig[]>(() => {
    return [
      {
        keyName: "nRx",
        title: "NRx Volume",
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
        tootipMsg: "Total number of new prescriptions expected per year",
      },
      {
        keyName: "wac",
        title: "WAC Estimate",
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
        tootipMsg: "Wholesale Average Cost per prescription",
      },
      {
        keyName: "patientEnagedPercentage",
        title: "Patient Enrollment Rate",
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
        tootipMsg: "Percentage of patients who enroll in your  program",
      },
      {
        keyName: "paSubmissionRate",
        title: "PA Submission Rate",
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
        tootipMsg:
          "Rate of successfully submitted prior authorization requests.",
      },
      {
        keyName: "averageRefillsPerNRx",
        title: "Refill Mutiplier",
        actualValue: roiInputs.averageRefillsPerNRx,
        actulValueInString: getInX(roiInputs.averageRefillsPerNRx),
        changeValue: (v: number) => handleChange("averageRefillsPerNRx", v),
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
        tootipMsg: "Average number of refills per patient",
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
        {slidersData.map((slider) => (
          <SingleSlider sliderProps={slider} key={slider.keyName} />
        ))}
      </Stack>
    </div>
  );
};

export default React.memo(CalculatorInput);
