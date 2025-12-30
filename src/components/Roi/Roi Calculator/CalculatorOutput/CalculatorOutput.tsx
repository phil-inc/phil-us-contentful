import React, { useMemo } from "react";
import { Grid } from "@mantine/core";
import { StaticImage } from "gatsby-plugin-image";

import { RoiViewModel } from "view model/ROI view model/roiViewModel";

import ImprovementCard from "components/common/ImprovementCard/ImprovementCard";

import * as classes from "./CalculatorOutput.module.css";

type CalculatorOutputProps = {
  roiVM: RoiViewModel;
};
const CalculatorOutput: React.FC<CalculatorOutputProps> = ({ roiVM }) => {
  const cardDetails = useMemo(() => {
    return [
      {
        key: "C1",
        title: "Patient Start Improvement",
        description: "with Phil",
        value: roiVM.roiImprovementInString.patientStarts,
      },
      {
        key: "C2",
        title: "Covered Dispense Improvement",
        description: "with Phil",
        value: roiVM.roiImprovementInString.coveredDispenses,
      },
      {
        key: "C3",
        title: "Gross Revenue Improvement",
        description: "with Phil",
        value: roiVM.roiImprovementInString.grossRevenue,
      },
      {
        key: "C4",
        title: "Net Revenue Improvement",
        description: "with Phil",
        value: roiVM.roiImprovementInString.netRevenue,
      },
    ];
  }, [roiVM]);

  return (
    <section className={classes.calculatorOutput}>
      {/* <div className={classes.heading}>
        <div className={classes.result}>
          <div className={classes.title}>Estimated ROI</div>
          <div className={classes.roiValue}>
            {roiVM.finalEstimationInString.estimatedROI}
          </div>
        </div>
        <div>
          <StaticImage
            src={"../../../../assets/images/trend-up.svg"}
            loading="lazy"
            alt="Trend Icon"
          />
        </div>
      </div>

      <div className={classes.subHeading}>
        <div className={classes.subHeadingTitle}>Estimated Gross Revenue</div>
        <Grid>
          <Grid.Col span={{ xs: 12, sm: 6 }}>
            <div className={classes.title}>with PHIL</div>
            <div className={classes.grossValue}>
              {roiVM.philROIInString.estGrossRevenue}
            </div>
            <div>
              {roiVM.roiImprovementInString.estGrossRevenue} improvement
            </div>
          </Grid.Col>
          <Grid.Col span={{ xs: 12, sm: 6 }}>
            <div className={classes.title}>Without PHIL</div>
            <div className={classes.grossValue}>
              {roiVM.retailROIInString.estGrossRevenue}
            </div>
          </Grid.Col>
        </Grid>
      </div> */}

      <Grid className={classes.cardSection}>
        {cardDetails.map((card) => (
          <Grid.Col key={card.key} span={{ xs: 12, sm: 12 }}>
            <ImprovementCard
              key={card.key}
              title={card.title}
              description={card.description}
              value={card.value}
            />
          </Grid.Col>
        ))}
      </Grid>
    </section>
  );
};

export default React.memo(CalculatorOutput);
