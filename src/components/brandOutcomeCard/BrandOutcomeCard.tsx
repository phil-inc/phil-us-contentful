import { Title, Text, Box, Paper, Stack, Group } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { FC } from "react";
import React, { useContext } from "react";
import type { TResource } from "types/resource";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";

import * as classes from "./brandOutcomeCard.module.css";
import { getColorFromStylingOptions } from "utils/stylingOptions";
import cx from "clsx";
import PageContext from "contexts/PageContext";
import { HOME, } from "constants/page";
import { TAsset } from "types/asset";
import Asset from "components/common/Asset/Asset";


type StyleProps = {
  arrow: boolean;
};

type StatsCardProps = {
  resource: TResource;
};

/**
 * StatsCard is a Component to render a StatsCard
 * @param props - {resource} StatsCard Resource with asset, heading, body
 * @returns StatsCard Component
 */
export const BrandOutcomeCard: FC<StatsCardProps> = ({ resource }) => {
  const context = useContext(PageContext);
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <>{children}</>;
      },

      [BLOCKS.EMBEDDED_ASSET](node: { data: { target: TAsset } }) {
        return (
          <Box>
            <Asset asset={node.data.target} />
          </Box>
        );
      },
    },
  };

  return (
    <Group h="100%" gap={0} className={classes.brand}>
      <Box
        component="span"
        h="100%"
        w={
          getColorFromStylingOptions(resource?.stylingOptions?.extraColor) !==
          "transparent"
            ? 12
            : 0
        }
        style={{
          background: getColorFromStylingOptions(
            resource?.stylingOptions?.extraColor,
          ),
        }}
      ></Box>
      <Paper className={classes.paper}>
        <Stack
          justify="center"
          align="center "
          className={classes.stack}
          gap={24}
        >
          {resource.heading && (
            <Title className={cx(
              classes.title,
              context.title === HOME && classes.homeTitle,
            )}>{resource.heading}</Title>
          )}

          {resource.body && (
            <Text className={cx(
              classes.description,
              context.title === HOME && classes.homeDescription,
            )}>
              {renderRichText(resource.body, options)}
            </Text>
          )}
        </Stack>
      </Paper>
    </Group>
  );
};
