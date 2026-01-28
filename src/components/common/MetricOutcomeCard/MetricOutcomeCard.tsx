import React from "react";
import { Box, Group, Paper, Text, Title } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import { TResource } from "types/resource";
import PageContext from "contexts/PageContext";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import * as classes from "./MetricOutcomeCard.module.css";

type Props = {
  resource: TResource;
  index: number;
  arrayLength?: number;
};

const MetricOutcomeCard: React.FC<Props> = ({
  resource,
  index,
  arrayLength,
}) => {
  const { subheading, description, icon, body } = resource;
  const context = React.useContext(PageContext);
  const isLastIndex = index === (arrayLength ? arrayLength - 1 : 0);

  const bgColor = getColorFromStylingOptions(
    resource?.stylingOptions?.background,
  );
  const extraColor = getColorFromStylingOptions(
    resource?.stylingOptions?.extraColor,
  );

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },
      [BLOCKS.HEADING_1](node, children) {
        return (
          <Title order={1} className={classes.heading1}>
            {children}
          </Title>
        );
      },
    },
  };

  return (
    <>
      <Paper
        className={classes.metricOutcomeCard}
        style={{
          background: bgColor,
        }}
        data-context={context?.title}
        data-index={index}
        data-last-index={isLastIndex}
      >
        <Box 
          className={classes.content}
          data-context={context?.title}
          data-index={index}
          data-last-index={isLastIndex}
        >
          <div>
            {subheading && <Text className={classes.title}>{subheading}</Text>}
            {description?.description && (
              <Text className={classes.title}>{description.description}</Text>
            )}
            {body && renderRichText(body, options)}
          </div>
        </Box>
      </Paper>
    </>
  );
};

export default MetricOutcomeCard;
