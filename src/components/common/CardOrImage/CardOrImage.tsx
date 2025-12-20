import { Anchor, Box, Group, Paper, Stack, Text } from "@mantine/core";
import React, { JSX } from "react";
import { TResource } from "types/resource";
import * as classes from "./CardOrImage.module.css";
import { IconArrowRight } from "@tabler/icons";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import ImageContainer from "components/common/Container/ImageContainer";
import Asset from "components/common/Asset/Asset";
import { TAsset } from "types/asset";
import cx from "clsx";
import { getColorFromStylingOptions } from "utils/stylingOptions";
import { getLink } from "utils/getLink";
import { Link } from "gatsby";
type Props = {
  resource: TResource;
  index: number;
};

const CardOrImage: React.FC<Props> = ({ resource,index }) => {
  const {
    heading,
    asset,
    body,
    buttonText,
    internalLink,
    hyperlink,
    canShowImageOnly,
  } = resource;

  const { link, isExternal } = getLink(resource);

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
        <Group h={"100%"} gap={0} className={classes.cardContainer} data-index={index}>
          <Paper
            className={cx(classes.cardOrImage)}
            style={{
              background: getColorFromStylingOptions(
                resource?.stylingOptions?.background,
              ),
            }}
            radius={0}
          >
            <Box className={classes.content}>
              <Text className={classes.title}>{heading}</Text>
              {body && renderRichText(body, options)}
            </Box>

            <Box>
              {isExternal ? (
                <Anchor
                  href={link}
                  target="_blank"
                  className={classes.anchor}
                  underline="never"
                >
                  <Text>{buttonText || hyperlink?.linkLabel || ""}</Text>
                </Anchor>
              ) : (
                <Link to={link} className={classes.anchor}>
                  <div className={classes.textwrapper}>
                    {buttonText || internalLink?.title || ""}
                    <IconArrowRight size={16} />
                  </div>
                </Link>
              )}
            </Box>
          </Paper>
        </Group>
      )}
    </>
  );
};

export default CardOrImage;
