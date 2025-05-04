import React, { useId } from "react";
import {
  Anchor,
  Box,
  Button,
  Divider,
  List,
  Portal,
  Text,
  Title,
} from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {
  GatsbyImage,
  getImage,
  ImageDataLike,
  StaticImage,
} from "gatsby-plugin-image";
import { Link } from "gatsby";

import { TAsset } from "types/asset";
import { ISection, MediaItem } from "types/section";

import { getLink } from "utils/getLink";
import { isVideoContent } from "utils/isVideoContent";
import { extractAssetData } from "utils/asset";
import { extractTrustpilotHtml, getHubspotFormDetails } from "utils/utils";

import PageContext from "contexts/PageContext";

import useDeviceType from "hooks/useView";

import ImageContainer from "components/common/Container/ImageContainer";
import Asset from "components/common/Asset/Asset";
import HubspotForm from "components/common/HubspotForm/HubspotForm";
import TrustpilotWidget from "components/common/TrustpilotWidget/TrustPilotWidget";
import RightArrowCircle from "components/icons/RightArrow.icon";

import { THANKS_FOR_YOUR_INTEREST } from "constants/identifiers";

import * as classes from "./BasicSectionColumn.module.css";

type Props = {
  section: ISection;
  index?: number;
};

const BasicSectionColumn = ({ section, index = 0 }: Props) => {
  const context = React.useContext(PageContext);
  const uuid = useId();
  const isDesktop = useDeviceType("xl");
  const isSectionV2 = section.v2Flag;
  const hasYoutubeLink = isSectionV2
    ? Boolean(section?.mediaItem?.youtubeLink)
    : Boolean(section.youtubeVideoUrl);
  const mediaItemOrAsset = isSectionV2 ? section.mediaItem : section.asset;
  const youtubeVideoUrl = isSectionV2
    ? section?.mediaItem?.youtubeLink
    : section.youtubeVideoUrl;
  const { formId, portalId } = getHubspotFormDetails(section?.embedForm);
const isThanksSection = section.header === THANKS_FOR_YOUR_INTEREST;

  const isVideo = () => {
    if (isSectionV2) {
      return (
        isVideoContent(section?.mediaItem?.media?.file?.contentType) ||
        hasYoutubeLink
      );
    }

    return isVideoContent(section?.asset?.file?.contentType) || hasYoutubeLink;
  };
  const { media } = extractAssetData(
    mediaItemOrAsset as TAsset & MediaItem,
    youtubeVideoUrl
  );
  const calculateAspectRatio = () => (hasYoutubeLink ? 16 / 9 : undefined);
  const determineBackground = () => {
    if (isSectionV2) {
      return isVideoContent(section?.mediaItem?.media?.file?.contentType) ||
        hasYoutubeLink
        ? "transparent"
        : undefined;
    }

    return isVideoContent(section?.asset?.file?.contentType) || hasYoutubeLink
      ? "transparent"
      : undefined;
  };

  const richTextImages: Record<string, any> = {};
  section?.body?.references?.map((reference: any) => {
    richTextImages[reference.contentful_id] = {
      image: reference.gatsbyImageData,
      alt: reference.title,
      file: {
        contentType: reference.file?.contentType,
        url: reference.file?.url,
      },
    };
  });

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET](node) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const imageData = richTextImages[node.data.target.sys.id];
        const image = getImage(imageData?.image as ImageDataLike);
        return (
          <GatsbyImage
            // style={{
            //   marginBottom: `${handleSpacing(theme, theme.spacing.md)}px`,
            // }}
            image={image!}
            alt={""}
          />
        );
      },

      // TODO: Refactor this
      [BLOCKS.EMBEDDED_ENTRY](node, children) {
        if (node?.data?.target) {
          const { target } = node.data;

          const button = (
            <Button className={classes.button} variant="philDefault">
              {node.data.target.buttonText}
            </Button>
          );

          if (target?.link?.internalContent) {
            const { link } = getLink(target, true);

            return !isDesktop ? (
              <Portal target={`#${uuid}`}>
                <Link
                  data-video={isVideo()}
                  className={classes.internalLink}
                  to={link}
                >
                  {button}
                </Link>
              </Portal>
            ) : (
              <Link
                data-video={isVideo()}
                className={classes.internalLink}
                to={link}
              >
                {button}
              </Link>
            );
          }

          return (
            <Anchor
              className={classes.externalLink}
              href={target?.link?.externalUrl ?? "#"}
              target="_blank"
              referrerPolicy="no-referrer"
              data-video={isVideo()}
            >
              {button}
            </Anchor>
          );
        }

        return null;
      },

      [BLOCKS.PARAGRAPH](node, children) {
        const trustpilotHtml = extractTrustpilotHtml(node)
        
        if (trustpilotHtml && trustpilotHtml.includes("trustpilot-widget")) {
          return (
            <>
              <TrustpilotWidget />
              <div dangerouslySetInnerHTML={{ __html: trustpilotHtml }} data-trustpilot-rendered />
            </>
          )
        }

        return (
          <Text
            data-index={index}
            data-context={context.title}
            data-video={isVideo()}
            className={classes.body}
          >
            {children}
          </Text>
        );
      },
      [BLOCKS.UL_LIST](node, children) {
        return (
          <List
            spacing="lg"
            type="unordered"
            data-context={context.title}
            className={classes.list}
            data-video={isVideo()}
            icon={isThanksSection 
              ? <Box className={classes.ulIcon}>
              <RightArrowCircle width="23px" height="23px"/>
              </Box>
              : undefined}
          >
            {children}
          </List>
        );
      },
      [BLOCKS.OL_LIST](node, children) {
        return (
          <List type="ordered" data-video={isVideo()} className={classes.list}>
            {children}
          </List>
        );
      },
      [BLOCKS.LIST_ITEM](node, children) {
        return (
          <List.Item
            classNames={{
              // itemWrapper: classes.listItemWrapper,
              itemLabel: classes.listItemLabel,
              item: classes.listItem,
            }}
          >
            {children}
          </List.Item>
        );
      },
      [BLOCKS.HEADING_1](node, children) {
        return (
          <Title
            order={1}
            data-context={context.title}
            className={classes.title}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_2](node, children) {
        return (
          <Title
            order={2}
            className={classes.blockH2}
            data-context={context.title}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title order={3} className={classes.title}>
            {children}
          </Title>
        );
      },

      [INLINES.HYPERLINK](node, children) {
        return (
          <Anchor href={node.data.uri as string} target="_blank">
            {children}
          </Anchor>
        );
      },
    },
  };

  return (
    <>
      {Boolean(section.body) && (
        <section className={classes.basicSectionColumn}>
          {renderRichText(section.body, options)}
          {mediaItemOrAsset && (
            <ImageContainer
              className={classes.imageContainer}
              contain
              ratio={calculateAspectRatio()}
              background={determineBackground()}
              isVideo={isVideo()}
              maw="100%"
              data-index={index}
              data-context={context.title}
              isGatsbyImageData={Boolean(media?.gatsbyImageData)}
            >
              <Asset
                asset={mediaItemOrAsset as TAsset & MediaItem}
                objectFit="contain"
                youtubeVideoURL={youtubeVideoUrl}
              />
            </ImageContainer>
          )}
          {section?.embedForm && (
            <Box className={classes.formSection}>
              <HubspotForm formId={formId} portalId={portalId} classname="book-demo-hubspot-form" />
            </Box>
          )}
          {Boolean(section.addBorder) && (
            <Divider size={"sm"} className={classes.divider} />
          )}
        </section>
      )}
    </>
  );
};

export default BasicSectionColumn;
