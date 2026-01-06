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

import * as classes from "./MetricCardComponent.module.css";
import { COLORS, LIGHT_COLOR_LIST } from "constants/global.constant";

type Props = {
  resource: TResource;
  index: number;
};

const MetricCardComponent: React.FC<Props> = ({ resource, index }) => {
  const { heading, icon, body } = resource;

  const bgColor = getColorFromStylingOptions(
    resource?.stylingOptions?.background,
  );
  const extraColor = getColorFromStylingOptions(
    resource?.stylingOptions?.extraColor,
  );
  const isBgColorLight = LIGHT_COLOR_LIST.includes(bgColor ?? COLORS.LIGHT);

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },
    },
  };

  return (
    <>
      <Group
        h={"100%"}
        gap={0}
        className={classes.metricCard}
        data-index={index}
      >
        <Paper
          className={cx(classes.paper, {
            darkText: isBgColorLight,
            lightText: !isBgColorLight,
          })}
          style={{
            background: bgColor,
            borderColor: extraColor,
          }}
          radius={0}
        >
          <Box className={classes.content}>
            {icon && (
              <Box className={classes.icon}>
                <Asset objectFit="contain" asset={icon as TAsset} />
              </Box>
            )}
            <div>
              <Text className={classes.title}>{heading}</Text>
              {body && renderRichText(body, options)}
            </div>
          </Box>
        </Paper>
      </Group>
    </>
  );
};

export default MetricCardComponent;
