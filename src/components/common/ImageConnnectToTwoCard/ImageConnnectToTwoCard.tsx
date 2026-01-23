import React, { JSX } from "react";
import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import cx from "clsx";

import { TResource } from "types/resource";
import { TAsset } from "types/asset";

import Asset from "components/common/Asset/Asset";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import * as classes from "./ImageConnnectToTwoCard.module.css";
import PageContext from "contexts/PageContext";
import { useIsSmallDevice } from "hooks/useIsSmallDevice";

type Props = {
  resource: TResource;
  index: number;
  sectionIndex?: number;
};

const ImageConnnectToTwoCard: React.FC<Props> = ({
  resource,
  index,
  sectionIndex,
}) => {
  const { icon, asset, assetForMobile, body, canShowImageOnly } = resource;

  const context = React.useContext(PageContext);
  const isSmallDevice = useIsSmallDevice();

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },
      [BLOCKS.HEADING_3](node, children) {
        return (
          <Box className={classes.heading3Container}>
            {icon && (
              <Box className={classes.icon}>
                <Asset objectFit="contain" asset={icon as TAsset} />
              </Box>
            )}
            <Text order={3} className={classes.heading3}>{children}</Text>
          </Box>
        );
      },
    },
  };

  const ImageComponent: () => JSX.Element = () => {
    return (
      <>
        {asset && (
          <Box
            className={classes.imageOnly}
            data-context={context.title}
            data-section-index={sectionIndex}
            data-index={index}
          >
            <div
              className={classes.imageWrapper}
              data-context={context.title}
              data-section-index={sectionIndex}
              data-index={index}
            >
              <Asset
                objectFit="contain"
                asset={
                  (isSmallDevice && assetForMobile
                    ? assetForMobile
                    : asset) as TAsset
                }
                isHeightInherit={true}
                isFullWidth={true}
              />
            </div>
          </Box>
        )}
      </>
    );
  };

  return (
    <>
      {canShowImageOnly ? (
        <ImageComponent />
      ) : (
        <Group
          h={"100%"}
          gap={0}
          className={classes.cardContainer}
          data-index={index}
        >
          <Paper
            className={cx(classes.imageConnnectToTwoCard)}
            style={{
              background: getColorFromStylingOptions(
                resource?.stylingOptions?.background,
              ),
            }}
            radius={0}
          >
            {body && renderRichText(body, options)}
          </Paper>
        </Group>
      )}
    </>
  );
};

export default ImageConnnectToTwoCard;
