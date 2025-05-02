import { BLOCKS, INLINES, Node } from "@contentful/rich-text-types";
import { Anchor, Button, List, Portal, Text, Title } from "@mantine/core";
import { Link } from "gatsby";
import {
  GatsbyImage,
  getImage,
  ImageDataLike,
} from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React, { useId } from "react";
import { BodyType } from "types/section";
import { getLink } from "utils/getLink";
import useDeviceType from "hooks/useView";
import { PageContextType } from "contexts/PageContext";
import TrustpilotWidget from "components/common/TrustpilotWidget/TrustPilotWidget";
import { extractTrustpilotHtml } from "utils/utils";
import cx from "clsx";
import "./RichTextRenderer.css";

type Props = {
  body: BodyType;
  context: PageContextType;
  className?: string;
  isVideo?: boolean;
  index?: number;
};

const RichTextRenderer = ({
  body,
  context,
  className,
  index,
  isVideo = false,
}: Props) => {
  const isDesktop = useDeviceType("xl");
  const uuid = useId();
  console.log("here iam ");

  const richTextImages: Record<string, any> = {};
  body?.references?.map((reference: any) => {
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
      [BLOCKS.EMBEDDED_ASSET](node: Node) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const imageData = richTextImages[node.data.target.sys.id];
        const image = getImage(imageData?.image as ImageDataLike);
        return <GatsbyImage image={image!} alt={""} />;
      },

      // TODO: Refactor this
      [BLOCKS.EMBEDDED_ENTRY](node: Node, children: React.ReactNode) {
        if (node?.data?.target) {
          const { target } = node.data;

          const button = (
            <Button variant="philDefault">
              {node.data.target.buttonText}
            </Button>
          );

          if (target?.link?.internalContent) {
            const { link } = getLink(target, true);

            return !isDesktop ? (
              <Portal target={`#${uuid}`}>
                <Link
                  data-video={isVideo}
                  className="internalLink"
                  to={link}
                >
                  {button}
                </Link>
              </Portal>
            ) : (
              <Link
                data-video={isVideo}
                className="internalLink"
                to={link}
              >
                {button}
              </Link>
            );
          }

          return (
            <Anchor
              className="externalLink"
              href={target?.link?.externalUrl ?? "#"}
              target="_blank"
              referrerPolicy="no-referrer"
              data-video={isVideo}
            >
              {button}
            </Anchor>
          );
        }

        return null;
      },

      [BLOCKS.PARAGRAPH](node: any, children: React.ReactNode) {
        const trustpilotHtml = extractTrustpilotHtml(node);

        if (trustpilotHtml && trustpilotHtml.includes("trustpilot-widget")) {
          return (
            <>
              <TrustpilotWidget />
              <div
                dangerouslySetInnerHTML={{ __html: trustpilotHtml }}
                data-trustpilot-rendered
              />
            </>
          );
        }

        return (
          <Text
            data-index={index}
            data-context={context.title}
            data-video={isVideo}
            className="normalText"
          >
            {children}
          </Text>
        );
      },
      [BLOCKS.UL_LIST](node: Node, children: React.ReactNode) {
        return (
          <List
            spacing="lg"
            type="unordered"
            data-context={context.title}
            className="list"
            data-video={isVideo}
          >
            {children}
          </List>
        );
      },
      [BLOCKS.OL_LIST](node, children: React.ReactNode) {
        return (
          <List type="ordered" data-video={isVideo} className="list">
            {children}
          </List>
        );
      },
      [BLOCKS.LIST_ITEM](node, children: React.ReactNode) {
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
      [BLOCKS.HEADING_1](node, children: React.ReactNode) {
        return (
          <Title
            order={1}
            data-context={context.title}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_2](node, children: React.ReactNode) {
        return (
          <Title
            order={2}
            className="blockH2"
            data-context={context.title}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_3](node, children: React.ReactNode) {
        return (
          <Title
            order={3}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_4](node, children: React.ReactNode) {
        return (
          <Title
          className="blockH4"
            order={4}
          >
            {children}
          </Title>
        );
      },

      [INLINES.HYPERLINK](node, children: React.ReactNode) {
        return (
          <Anchor href={node.data.uri as string} target="_blank">
            {children}
          </Anchor>
        );
      },
    },
  };

  return (
    <div className={cx("richtextRendererMainContainer", className)}>
      {renderRichText(body, options)}
    </div>
  );
};

export default RichTextRenderer;
