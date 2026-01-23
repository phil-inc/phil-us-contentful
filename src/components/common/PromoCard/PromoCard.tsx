import React from "react";
import { Box, Group, Paper, Pill, Text } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import cx from "clsx";

import { TResource } from "types/resource";
import { TAsset } from "types/asset";

import Asset from "components/common/Asset/Asset";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import * as classes from "./PromoCard.module.css";
import PhilPill from "components/common/PhilPill/PhilPill";

type Props = {
  resource: TResource;
  index: number;
};

const PromoCard: React.FC<Props> = ({ resource, index }) => {
  const { heading, icon, body, subItemReferences, asset, canShowImageOnly } =
    resource;

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },
    },
  };
  const ImageComponent: () => JSX.Element = () => {
    return (
      <>
        {asset && (
          <Box className={classes.imageOnly} data-index={index}>
            <Asset objectFit="contain" asset={asset as TAsset} />
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
            className={cx(classes.promoCard)}
            style={{
              background: getColorFromStylingOptions(
                resource?.stylingOptions?.background,
              ),
            }}
            radius={0}
          >
            {icon && (
              <Box className={classes.icon}>
                <Asset objectFit="contain" asset={icon as TAsset} isFullWidthHeight />
              </Box>
            )}
            <Box className={classes.content}>
              <Text className={classes.title}>{heading}</Text>
              {body && renderRichText(body, options)}
              {subItemReferences && subItemReferences?.length > 0 && (
                <Box className={classes.pills}>
                  {subItemReferences.map((subItem, index) => (
                    <PhilPill
                      pill={subItem}
                      index={index}
                      key={`pill-${index}`}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Paper>
        </Group>
      )}
    </>
  );
};

export default PromoCard;
