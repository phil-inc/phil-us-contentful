import {
  Paper,
  Title,
  Button,
  Text,
  Box,
  Stack,
  Anchor,
  Group,
  Grid,
  Center,
} from "@mantine/core";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { FC } from "react";
import React, { useContext } from "react";
import type { TResource } from "types/resource";
import { getLink } from "utils/getLink";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import * as classes from "./featuredInsights.module.css";

import { getColorFromStylingOptions } from "utils/stylingOptions";

import { type Options } from "@contentful/rich-text-react-renderer";
import { isVideoContent } from "utils/isVideoContent";
import PageContext from "contexts/PageContext";
import { COMPANY_PAGE, LIFE_SCIENCES_PAGE } from "constants/page";
import { Metadata } from "types/section";
import { CENTER_LIFE_SCIENCES_CARD_TAG } from "constants/identifiers";
import { IconArrowRight } from "@tabler/icons";
import ImageContainer from "components/common/Container/ImageContainer";
import Asset from "components/common/Asset/Asset";

type ArticleProps = {
  resource: TResource;
  metadata?: Metadata;
  isEmployeeTag?: boolean;
  arrayLength?: number;
};

export const FeaturedInsights: FC<ArticleProps> = ({
  resource,
  metadata,
  arrayLength,
}) => {
  const { body, asset } = resource;
  const context = useContext(PageContext);
  const color = getColorFromStylingOptions(
    resource?.stylingOptions?.extraColor,
  );

  const isCenter = metadata?.tags?.some(
    (tag) => tag.name === CENTER_LIFE_SCIENCES_CARD_TAG,
  );

  const link = (resource.hyperlink?.externalUrl ?? resource.hyperlink?.internalContent?.slug) ?? "#";


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

      // TODO: Refactor this
      [BLOCKS.EMBEDDED_ENTRY](node, children) {
        if (node?.data?.target) {
          const { target } = node.data;

          if (target.__typename === "ContentfulMediaItem") {
            return (
              <ImageContainer flexStart fluid maw={128}>
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
              variant="philDefault"
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
          <Text data-is-center={isCenter} className={classes.paragraph}>
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
          maw={context.title === COMPANY_PAGE && arrayLength === 9 ? 300 : 900}
          ratio={16 / 9}
          data-media-item={true}
        >
          <Asset objectFit="contain" asset={media} />
        </ImageContainer>
      </Center>
    );
  }

  // TODO: Add hover animation + anchor tags
  // REFACTOR:: handle different styles better: isFaq, Asset
  return (
    // TODO: Add anchor links to cards
    <Group h={"100%"} gap={0}>
      <Box
        component="span"
        h="100%"
        className={classes.before}
        w={color !== "transparent" ? 12 : 0}
        style={{ background: color }}
        data-has-asset={Boolean(media)}
      ></Box>
      <Paper
        className={classes.paper}
        style={{
          background: getColorFromStylingOptions(
            resource?.stylingOptions?.background,
          ),
        }}
        radius={0}
        data-has-asset={Boolean(media)}
        data-context={context.title}
        data-is-faq={resource.isFaq}
      >
        <Grid
          gutter={0}
          classNames={{ inner: classes.gridInner, root: classes.gridRoot }}
        >
          {media && !resource.isFaq && (
            <Grid.Col
              span={{
                base: 12,
                sm: 12,
                md: 4,
                lg: 4,
                xl: context.title === LIFE_SCIENCES_PAGE ? 3.1 : 6,
              }}
            >
              {/* // TODO: check regression with 1/2 ratio images */}
              <ImageContainer
                isVideo={
                  isVideoContent(media?.file?.contentType) ||
                  Boolean(media?.youtubeLink)
                }
                fluid
                contain
                card
                mx={0}
              >
                <Asset objectFit="cover" asset={media} />
              </ImageContainer>
            </Grid.Col>
          )}

          <Grid.Col
            span={{
              base: 12,
              sm: 12,
              md: "auto",
              xl:
                context.title === LIFE_SCIENCES_PAGE
                  ? "auto"
                  : media && !resource.isFaq
                    ? 6
                    : "auto",
            }}
          >
            <Stack
              className={classes.stack}
              data-has-asset={Boolean(media)}
              data-context={context.title}
              h="100%"
              gap={20}
              data-is-center={isCenter}
            >
              {body && renderRichText(body, options)}
              <div>
              {resource.hyperlink &&
                (resource.hyperlink?.externalUrl ? (
                  <Anchor
                    href={link}
                    target="_blank"
                    underline="never"
                    className={classes.link}
                  >
                      {resource.hyperlink?.linkLabel}
                      <IconArrowRight size={18} />
                  </Anchor>
                ) : (
                  <Link to={link} className={classes.link}>
                    {resource.hyperlink?.linkLabel}
                    <IconArrowRight size={18} />
                  </Link>
                ))}
              </div>

            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Group>
  );
};
