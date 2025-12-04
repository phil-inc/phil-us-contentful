import React, { useMemo } from "react";
import { Grid } from "@mantine/core";

import CalculatorInput from "components/Roi/Roi Calculator/CalculatorInput/CalculatorInput";
import CalculatorOutput from "components/Roi/Roi Calculator/CalculatorOutput/CalculatorOutput";

import { ISection } from "types/section";
import { RoiInputsNum } from "types/roi";
import { ROI_INPUT_CONFIG } from "constants/roi.constant";

import { RoiViewModel } from "view model/ROI view model/roiViewModel";

import * as classes from "./RoiCalculator.module.css";

type RoiCalculatorProps = {
  section: ISection;
};

const RoiCalculator: React.FC<RoiCalculatorProps> = ({section}) => {
  const [roiInputs, setRoiInputs] = React.useState<RoiInputsNum>({
    wac: ROI_INPUT_CONFIG.wac.preset,
    nRx: ROI_INPUT_CONFIG.nRx.preset,
    patientEnagedPercentage: ROI_INPUT_CONFIG.patientEnagedPercentage.preset,
    paSubmissionRate: ROI_INPUT_CONFIG.paSubmissionRate.preset,
    averageRefillsPerNRx: ROI_INPUT_CONFIG.averageRefillsPerNRx.preset,
  });

  const roiVM = useMemo(() => new RoiViewModel(roiInputs), [roiInputs]);

  return (
    <section>
      <Grid className={classes.roiCalculator} gutter={0} align="flex-start">
        <Grid.Col span={{ base: 12, md: 6 }} className={classes.left} >
          <CalculatorInput section={section} roiInputs={roiInputs} setRoiInputs={setRoiInputs} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }} className={classes.right}>
          <CalculatorOutput roiVM={roiVM} />
        </Grid.Col>
      </Grid>
    </section>
  );
};

export default RoiCalculator;
