import React from "react";

import { Box, MantineStyleProps, Text, Title } from "@mantine/core";

import * as classes from "./metric.module.css";

type MetricBoxProps = {
  metric: {
    id: string;

    metricLabel: string;

    metricValue: string;

    metricDescription?: string;
  };
};

const MetricBox: React.FC<MetricBoxProps & MantineStyleProps> = ({
  metric,
  ...restProps
}) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && ref.current.getAttribute("data-inline") === "true") {
      const parent = ref.current.parentElement;

      parent.classList.add(classes.inlineMetricContainer);

      if (parent.children.length > 3) {
        parent.setAttribute("data-columns", "2");
      }
    }
  }, []);

  return (
    <Box ref={ref} className={classes.metricBox} {...restProps}>
      {metric?.metricLabel?.length && (
        <Text unstyled my={0} className={classes.metricLabel}>{metric.metricLabel}</Text>
      )}
      <Title
        order={4}
        data-has-label={metric?.metricLabel?.length > 0}
        className={classes.metricValue}
      >
        {metric.metricValue.split("").map((char) => (
          <span>{char}</span>
        ))}
      </Title>
      <Text data-has-label={metric?.metricLabel?.length > 0} className={classes.metricDescription}>
        {metric.metricDescription}
      </Text>
    </Box>
  );
};

export default MetricBox;
