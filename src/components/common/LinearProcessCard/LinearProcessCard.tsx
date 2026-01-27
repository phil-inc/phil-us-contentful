import { Paper, Title, Text, Stack, Anchor, Group, Box } from "@mantine/core";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { FC } from "react";
import React, { useContext } from "react";
import cx from "clsx";
import type { TResource } from "types/resource";
import { getLink } from "utils/getLink";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { type Options } from "@contentful/rich-text-react-renderer";

import * as classes from "./LinearProcessCard.module.css";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import PageContext from "contexts/PageContext";
import { TAsset } from "types/asset";

import Asset from "components/common/Asset/Asset";
import { useIsSmallDevice } from "hooks/useIsSmallDevice";

type Props = {
  resource: TResource;
  index: number;
  arrayLength: number;
};

export const LinearProcessCard: FC<Props> = ({
  resource,
  index,
  arrayLength,
}) => {
  const context = useContext(PageContext);
  const { body, asset, assetForMobile, icon } = resource;
  const color = getColorFromStylingOptions(
    resource?.stylingOptions?.extraColor,
  );

  const isFirstIndex = index === 0;
  const isLastIndex = index === arrayLength - 1;
  const isMiddleIndex = !isFirstIndex && !isLastIndex;
  const isSmallDevice = useIsSmallDevice();

  const options: Options = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK](node, children) {
        const { link, isExternal } = getLink(node.data.target);

        return !isExternal ? (
          <Link
            className={classes.entryLink}
            data-color={color}
            data-is-faq={node.data.target.isFaq}
            to={link}
          >
            {children}
          </Link>
        ) : (
          <Anchor
            className={classes.entryLink}
            href={link}
            underline="never"
            referrerPolicy="no-referrer"
          >
            {children}
          </Anchor>
        );
      },

      [BLOCKS.PARAGRAPH](node, children) {
        return (
          <Text className={classes.paragraph} data-context={context.title}>
            {children}
          </Text>
        );
      },

      [BLOCKS.HEADING_1](node, children) {
        return (
          <Title order={1} lh={"normal"}>
            {children}
          </Title>
        );
      },
      [BLOCKS.HEADING_2](node, children) {
        return (
          <Title order={2} lh={"normal"}>
            {children}
          </Title>
        );
      },
      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title
            data-context={context.title}
            className={classes.heading3}
            order={3}
            lh={"normal"}
          >
            {children}
          </Title>
        );
      },
      [BLOCKS.HEADING_4](node, children) {
        return (
          <Title order={4} lh={"normal"}>
            {children}
          </Title>
        );
      },
    },
  };

  return (
    <Group h={"100%"} gap={0}>
      <Paper
        className={cx(classes.paper, classes.pointedEdgeCard, {
          [classes.firstCard]: isFirstIndex,
          [classes.lastCard]: isLastIndex,
          [classes.middleCard]: isMiddleIndex,
        })}
        style={{
          background: getColorFromStylingOptions(
            resource?.stylingOptions?.background,
          ),
          "--triangle-arrow-color": color as React.CSSProperties,
        }}
        radius={0}
        data-context={context.title}
        data-is-faq={resource.isFaq}
      >
        <Stack
          className={classes.stack}
          data-context={context.title}
          h="100%"
          gap={0}
        >
          {body && renderRichText(body, options)}
        </Stack>
        {asset && (
          <Box className={classes.icon}>
            <Asset
              objectFit="contain"
              asset={
                (isSmallDevice && assetForMobile
                  ? assetForMobile
                  : asset) as TAsset
              }
              isFullWidthHeight
            />
          </Box>
        )}
      </Paper>
    </Group>
  );
};
