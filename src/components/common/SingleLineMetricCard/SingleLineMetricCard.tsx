import React from "react";
import { Box, Group, Paper, Text } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import cx from "clsx";

import { TResource } from "types/resource";
import { TAsset } from "types/asset";

import Asset from "components/common/Asset/Asset";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import * as classes from "./SingleLineMetricCard.module.css";

type Props = {
  resource: TResource;
  index: number;
};

const SingleLineMetricCard: React.FC<Props> = ({ resource, index }) => {
  const { heading, icon, body, subheading, isFirstItem } = resource;

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },
    },
  };

  return (
    <>
      <Group gap={0} className={classes.singleMetricCard} data-index={index}>
        <Paper
          className={cx(classes.paper, { [classes.firstItem]: isFirstItem })}
          style={{
            background: getColorFromStylingOptions(
              resource?.stylingOptions?.background,
            ),
          }}
          radius={0}
        >
          <Box className={classes.content}>
            {icon && (
              <Box className={classes.icon}>
                <Asset objectFit="contain" asset={icon as TAsset} />
              </Box>
            )}
            <Box>
              <div className={classes.titleContainer}>
                <Text className={classes.title}>{heading}</Text>
                {subheading && (
                  <span className={classes.subheading}>{subheading}</span>
                )}
              </div>
              {body && renderRichText(body, options)}
            </Box>
          </Box>
        </Paper>
      </Group>
    </>
  );
};

export default SingleLineMetricCard;
