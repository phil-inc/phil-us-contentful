import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import {
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Asset from "components/common/Asset/Asset";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { ISection } from "types/section";
import { getLink } from "utils/getLink";

import cx from "clsx";
import * as classes from "./RightImageBottomComp.module.css";
import { useIsMediumDevice } from "hooks/useIsMediumDevice";

import { BUTTON_STYLE } from "constants/global.constant";

import { TAsset } from "types/asset";
import TwinkleStar from "components/icons/TwinkleStar";
import PageContext from "contexts/PageContext";

type BasicSectionProps = {
  section: ISection;
  index: number;
  isEmbedFormTemplate: boolean;
  sectionIndex?: number;
  subSectionIndex?: number;
};

const RightImageBottomComp: React.FC<BasicSectionProps> = ({
  section,
  index,
  isEmbedFormTemplate,
  sectionIndex = 0,
  subSectionIndex,
}) => {
  const context = React.useContext(PageContext);
  const { isMediumScreen } = useIsMediumDevice();

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY](node, children) {
        if (node?.data?.target) {
          const { target } = node.data;
          const isSecondaryAltButton =
            node.data.target.buttonStyle === BUTTON_STYLE.Secondary;
          const button = (
            <Button
              className={cx(classes.button, {
                [classes.secondaryBtn]: isSecondaryAltButton,
              })}
              variant={isSecondaryAltButton ? "white" : "philDefault"}
            >
              {node.data.target.buttonText}
            </Button>
          );

          if (target?.link?.internalContent) {
            const { link } = getLink(target, true);

            return (
              <div className={classes.bottomSection}>
                <Link className={classes.internalLink} to={link}>
                  {button}
                </Link>
              </div>
            );
          }

          return (
            <Anchor
              className={classes.externalLink}
              href={target?.link?.externalUrl ?? "#"}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              {button}
            </Anchor>
          );
        }

        return null;
      },
      [BLOCKS.PARAGRAPH](node, children) {
        return (
          <Text data-context={context.title} className={classes.body}>
            {children}
          </Text>
        );
      },

      [BLOCKS.HEADING_2](node, children) {
        return (
          <Title
            order={2}
            className={cx(classes.title, classes.heading2)}
            data-context={context.title}
          >
            {children}
          </Title>
        );
      },
    },
  };

  const mediaItemOrAsset = section.v2Flag ? section.mediaItem : section.asset;

  return (
    <>
      {Boolean(section.addBorder) && (
        <Container className={classes.dividerContainer} size={"xl"}>
          <Divider className={classes.divider} />
        </Container>
      )}

      <Box className={cx(classes.rightImageBottomComp)}>
        <Container size={"xl"}>
          <Box className={classes.sectionWrapper}>
            <Box className={classes.star}>
              <TwinkleStar />
            </Box>
            <div className={classes.leftArea}>
              {Boolean(section.body) && (
                <Stack>{renderRichText(section.body, options)}</Stack>
              )}
            </div>
            <div className={classes.rightArea}>
              <div className={classes.bottomImageArea}>
                {isMediumScreen && Boolean(section?.assetForMobile) ? (
                  <div>
                    <Asset
                      className={classes.assetWallImage}
                      asset={section.assetForMobile as TAsset}
                    />
                  </div>
                ) : (
                  <>
                    <Asset
                      asset={mediaItemOrAsset}
                      objectFit="contain"
                      isFullWidthHeight
                    />
                  </>
                )}
              </div>
            </div>
          </Box>
        </Container>
      </Box>

      {Boolean(section?.showBottomBorder) && (
        <Container className={classes.dividerContainer} size={"xl"}>
          <Divider className={classes.divider} />
        </Container>
      )}
    </>
  );
};

export default RightImageBottomComp;
