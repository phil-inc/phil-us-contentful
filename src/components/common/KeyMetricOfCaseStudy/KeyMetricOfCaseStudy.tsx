import React from "react";
import { MantineStyleProps } from "@mantine/core";

import * as classes from "./KeyMetricOfCaseStudy.module.css";

type metric = {
  id: string;
  metricLabel: string;
  metricValue: string;
  metricDescription?: string;
  metricDescriptionRichText?: {
    raw: string;
    __typename: string;
  };
};

type KeyMetricProps = {
  metrics: metric[];
};

const KeyMetricOfCaseStudy: React.FC<KeyMetricProps & MantineStyleProps> = ({
  metrics,
  ...restProps
}) => {
  if (!metrics?.length) return null;

  return (
    <section className={classes.keyMetricSection} {...restProps}>
      {metrics.map((metric: metric, index) => (
        <div key={index} className={classes.box}>
          <div className={classes.title}>{metric.metricLabel}</div>
          <div className={classes.value}>{metric.metricDescription}</div>
        </div>
      ))}
    </section>
  );
};

export default KeyMetricOfCaseStudy;
