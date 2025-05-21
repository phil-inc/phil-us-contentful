import React from "react";
import cx from "clsx";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";

import { Box, Divider, MantineStyleProps, Text, Title } from "@mantine/core";

import CaseStudyTestimonial from "components/common/Testimonials/CaseStudyTestimonial";

import * as classes from "./metric.module.css";

type MetricBoxProps = {
  metric: {
    id: string;

    metricLabel: string;

    metricValue: string;

    metricDescription?: string;
    metricDescriptionRichText?: {
      raw: string;
      __typename: string;
    };
  };
};

const MetricBox: React.FC<MetricBoxProps & MantineStyleProps> = ({
  metric,
  ...restProps
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isMetricDescription = Boolean(metric?.metricDescription);
  const canShowInSingleRow = Boolean(metric?.metricDescriptionRichText);

  React.useEffect(() => {
    if (ref.current && ref.current.getAttribute("data-inline") === "true") {
      const parent = ref.current.parentElement;

      if (parent) {
        parent.classList.add(classes.inlineMetricContainer);

        if (canShowInSingleRow) parent.setAttribute("data-columns", "1");
        else if (parent.children.length > 3) {
          parent.setAttribute("data-columns", "2");
        }
      }
    }
  }, []);

  const options: Options = {
    renderNode: {

      [INLINES.EMBEDDED_ENTRY](node, children) {
        return <MetricBox data-inline={true} metric={node.data.target} />;
      },

      [BLOCKS.EMBEDDED_ENTRY](node, children) {
        return <CaseStudyTestimonial testimonial={node.data.target} />;
      },
      [BLOCKS.HR](node, children: React.ReactNode) {
        return <Divider className={classes.divider} size={2} color="#F2F2F2" />;
      },

      [BLOCKS.UL_LIST](node, children: React.ReactNode) {
        return <ul className={classes.list}>{children}</ul>;
      },

      [BLOCKS.OL_LIST](node, children: React.ReactNode) {
        return <ol className={classes.list}>{children}</ol>;
      },

      [BLOCKS.LIST_ITEM](node, children: React.ReactNode) {
        return <li className={classes.listItem}>{children}</li>;
      },

      [BLOCKS.HEADING_1](node, children: React.ReactNode) {
        return <Title order={1}>{children}</Title>;
      },
      [BLOCKS.HEADING_2](node, children: React.ReactNode) {
        const val = (node.content[0] as any).value;

        return (
          <Title id={val} order={2} unstyled className={classes.header2}>
            {children}
          </Title>
        );
      },
      [BLOCKS.HEADING_3](node, children: React.ReactNode) {
        return <Title order={3}>{children}</Title>;
      },
      [BLOCKS.PARAGRAPH](node, children: React.ReactNode) {
        return <div className={classes.paragraph}>{children}</div>;
      },
    },
  };

  if (canShowInSingleRow) {
    return (
      <Box ref={ref} 
      className={cx(classes.metricBox,classes.singleRow )} 
      {...restProps}>
        {metric?.metricLabel?.length && (
          <Text unstyled my={0} className={classes.metricLabel}>
            {metric.metricLabel}
          </Text>
        )}
        <div>
          <Title
            order={4}
            data-has-label={metric?.metricLabel?.length > 0}
            className={cx(classes.metricValue, {
              [classes.titleWithoutDescription]: !isMetricDescription,
            })}
          >
            {metric.metricValue?.split("").map((char) => <span>{char}</span>)}
          </Title>
          <Text
            data-has-label={metric?.metricLabel?.length > 0}
            className={classes.metricDescription}
          >
            {metric.metricDescription}
          </Text>
        </div>

        <Text
          data-has-label={metric?.metricLabel?.length > 0}
          className={classes.metricDescriptionRichText}
        >
          {metric.metricDescriptionRichText &&
            renderRichText(metric.metricDescriptionRichText, options)}
        </Text>
      </Box>
    );
  }

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
        
        {metric.metricValue?.split("").map((char) => (
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
