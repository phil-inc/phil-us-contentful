import React, { useContext } from "react";
import { TResource } from "types/resource";
import PageContext from "contexts/PageContext";
import { getColorFromStylingOptions } from "utils/stylingOptions";
import { Options } from "react-pdf/dist/cjs/shared/types";
import { Link } from "gatsby";
import {
  Anchor,
  Button,
  Center,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { getLink } from "utils/getLink";
import ImageContainer from "components/common/Container/ImageContainer";
import { COMPANY_PAGE, LIFE_SCIENCES_PAGE } from "constants/page";
import Asset from "components/common/Asset/Asset";
import { IconArrowRight } from "@tabler/icons";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { isVideoContent } from "utils/isVideoContent";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import * as classes from "./PhilPeople.module.css";
import { BUTTON_CONFIG } from "constants/global.constant";

type Props = {
  resource: TResource;
};

export const PhilPeople: React.FC<Props> = ({ resource }) => {
  {
    const { body, asset } = resource;
    const context = useContext(PageContext);
    const color = getColorFromStylingOptions(
      resource?.stylingOptions?.extraColor,
    );

    const link =
      resource.hyperlink?.externalUrl ??
      resource.hyperlink?.internalContent?.slug ??
      "#";

    const options: Options = {
      renderNode: {
        [INLINES.ENTRY_HYPERLINK](node, children) {
          const { link, isExternal } = getLink(node.data.target);

          return !isExternal ? (
            <Link
              className={classes.entryLink}
              data-color={color}
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

        [BLOCKS.EMBEDDED_ENTRY](node, children) {
          if (node?.data?.target) {
            const { target } = node.data;

            if (target.__typename === "ContentfulMediaItem") {
              return (
                <ImageContainer flexStart fluid>
                  <Asset objectFit="contain" asset={target} />
                </ImageContainer>
              );
            }

            const button = (
              <Button
                classNames={{
                  root: classes.buttonRoot,
                  inner: classes.buttonInner,
                  label: classes.buttonLabel,
                }}
                  variant={
        node.data.target.buttonStyle === "Primary"
        ? BUTTON_CONFIG.primary.variant
        : BUTTON_CONFIG.secondary.variant
      }
              >
                {node.data.target.buttonText}
              </Button>
            );

            if (target?.link?.internalContent) {
              const { link } = getLink(target, true);

              return (
                <Link className={classes.internalLink} to={link}>
                  {button}
                </Link>
              );
            }

            return (
              <Anchor
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
            <Title order={4} className={classes.heading4} lh={"normal"} data-context={context.title}>
              {children}
            </Title>
          );
        },
      },
    };

    // TODO: handle any
    let media: any = asset;
    if (resource?.media) {
      media = resource.media;
    }

    if (resource?.sys?.contentType?.sys?.id === "mediaItem") {
      media = resource;
    }

    // TODO: improve this
    if (resource?.sys?.contentType?.sys?.id === "mediaItem") {
      return (
        <Center>
          <ImageContainer
            isVideo={
              isVideoContent(media?.file?.contentType) ||
              Boolean(media?.youtubeLink)
            }
            fluid
            contain
            maw={
              context.title === COMPANY_PAGE && arrayLength === 9 ? 300 : 900
            }
            ratio={16 / 9}
            data-media-item={true}
          >
            <Asset objectFit="contain" asset={media} />
          </ImageContainer>
        </Center>
      );
    }


    return (
      <>
        <Paper
          className={classes.paper}
          radius={0}
          data-has-asset={Boolean(media)}
          data-context={context.title}
        >
          <Stack
            className={classes.stack}
            data-has-asset={Boolean(media)}
            data-context={context.title}
            h="100%"
            gap={20}
            p={5}
          >
            {media && (
              <div className={classes.imageWrapper}>

              <ImageContainer
                isVideo={
                  isVideoContent(media?.file?.contentType) ||
                  Boolean(media?.youtubeLink)
                }
                fluid
                >
                <Asset
                  objectFit="contain"
                  asset={media}
                  />
              </ImageContainer>
                  </div>
            )}
            <div className={classes.meet}>MEET</div>
            {body && renderRichText(body, options)}

            <div>
              {resource.hyperlink && (
                <Anchor
                  href={link}
                  target={resource.hyperlink.externalUrl ? "_blank" : "_self"}
                  underline="never"
                  className={classes.link}
                >
                  <span className="anchor-text">
                    {resource.hyperlink?.linkLabel}
                  </span>
                  <IconArrowRight size={18} />
                </Anchor>
              )}
            </div>
          </Stack>
        </Paper>
      </>
    );
  }
};
