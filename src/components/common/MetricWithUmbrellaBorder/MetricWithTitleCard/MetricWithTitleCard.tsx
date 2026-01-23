import { Title, Text, Box, Paper, Stack, Group } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { FC } from "react";
import React, { useContext } from "react";
import type { TResource } from "types/resource";
import { BLOCKS } from "@contentful/rich-text-types";

import * as classes from "./MetricWithTitleCard.module.css";
import cx from "clsx";
import PageContext from "contexts/PageContext";
type Props = {
  resource: TResource;
};

export const MetricWithTitleCard: FC<Props> = ({ resource }) => {
  const context = useContext(PageContext);
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <div className={classes.paragraph}>{children}</div>;
      },
    },
  };

  return (
    <Box h="100%" gap={0} className={classes.metricWithTitle}>
      <Paper className={classes.paper} data-context={context.title}>
        <Stack
          justify="center"
          align="center "
          className={classes.stack}
          gap={24}
          data-context={context.title}
        >
          {resource.body && (
            <Text
              className={cx(classes.description)}
              data-context={context.title}
            >
              {renderRichText(resource.body, options)}
            </Text>
          )}
          {resource.heading && (
            <Title className={cx(classes.value)} data-context={context.title}>
              {resource.heading}
            </Title>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
