import React, { useMemo } from "react";
import { Slider, Stack, Text } from "@mantine/core";
import { Container } from "@mantine/core";

import { Layout } from "layouts/Layout/Layout";

import { RoiViewModel } from "view model/ROI view model/roiViewModel";

import { ROI_INPUT_CONFIG } from "constants/roi.constant";

import { RoiInputsNum } from "types/roi";

type RoiTemplateProps = {};

const Roitemplate: React.FC<RoiTemplateProps> = ({}) => {
  const [roiInputs, setRoiInputs] = React.useState<RoiInputsNum>({
    wac: ROI_INPUT_CONFIG.wac.preset,
    nRx: ROI_INPUT_CONFIG.nRx.preset,
    patientEnagedPercentage: ROI_INPUT_CONFIG.patientEnagedPercentage.preset,
    paSubmissionRate: ROI_INPUT_CONFIG.paSubmissionRate.preset,
    averageRefillsPerNRx: ROI_INPUT_CONFIG.averageRefillsPerNRx.preset,
  });

  const handleChange = (key: keyof RoiInputsNum, value: number) => {
    setRoiInputs((prev) => ({ ...prev, [key]: value }));
  };

  const roiVM = useMemo(() => new RoiViewModel(roiInputs), [roiInputs]);

  return (
    <Layout minimal={false} canHideHeader={false}>
      <Container fluid={true} p={10}>
        <main className="roi-page">
          <div>
            <Stack>
              <div>
                {/* <div>{roiVM.finalEstimation.roiEstimate.estimatedROI}</div> */}
                <Text fw={600}>WAC: {roiInputs.wac}</Text>
                <Slider
                  value={roiInputs.wac}
                  onChange={(v) => handleChange("wac", v)}
                  min={ROI_INPUT_CONFIG.wac.min}
                  max={ROI_INPUT_CONFIG.wac.max}
                  step={ROI_INPUT_CONFIG.wac.increment}
                />
              </div>
              <div>
                <Text fw={600}>NRx: {roiInputs.nRx}</Text>
                <Slider
                  value={roiInputs.nRx}
                  onChange={(v) => handleChange("nRx", v)}
                  min={ROI_INPUT_CONFIG.nRx.min}
                  max={ROI_INPUT_CONFIG.nRx.max}
                  step={ROI_INPUT_CONFIG.nRx.increment}
                />
              </div>
              <div>
                <Text fw={600}>
                  Patient Engaged %: {roiInputs.patientEnagedPercentage}
                </Text>
                <Slider
                  value={roiInputs.patientEnagedPercentage}
                  onChange={(v) => handleChange("patientEnagedPercentage", v)}
                  min={ROI_INPUT_CONFIG.patientEnagedPercentage.min}
                  max={ROI_INPUT_CONFIG.patientEnagedPercentage.max}
                  step={ROI_INPUT_CONFIG.patientEnagedPercentage.increment}
                />
              </div>
              <div>
                <Text fw={600}>
                  PA Submission Rate: {roiInputs.paSubmissionRate}
                </Text>
                <Slider
                  value={roiInputs.paSubmissionRate}
                  onChange={(v) => handleChange("paSubmissionRate", v)}
                  min={ROI_INPUT_CONFIG.paSubmissionRate.min}
                  max={ROI_INPUT_CONFIG.paSubmissionRate.max}
                  step={ROI_INPUT_CONFIG.paSubmissionRate.increment}
                />
              </div>
              <div>
                <Text fw={600}>
                  Avg Refills / NRx: {roiInputs.averageRefillsPerNRx}
                </Text>
                <Slider
                  value={roiInputs.averageRefillsPerNRx}
                  onChange={(v) => handleChange("averageRefillsPerNRx", v)}
                  min={ROI_INPUT_CONFIG.averageRefillsPerNRx.min}
                  max={ROI_INPUT_CONFIG.averageRefillsPerNRx.max}
                  step={ROI_INPUT_CONFIG.averageRefillsPerNRx.increment}
                />
              </div>
            </Stack>{" "}
          </div>
        </main>
      </Container>
    </Layout>
  );
};

export default React.memo(Roitemplate);
