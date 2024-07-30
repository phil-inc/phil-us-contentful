import React from "react";
import { Title, Text, Container, Box, Anchor, List } from "@mantine/core";
import { Layout } from "layouts/Layout/Layout";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { TResource } from "types/resource";
import { SEO } from "layouts/SEO/SEO";
import Asset, { YouTubeEmbed } from "components/common/Asset/Asset";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type { TAsset } from "types/asset";
import { Script, graphql } from "gatsby";
import { renderBanners } from "components/common/Banner/Banner";
import AuthorBlock from "components/Blog/AuthorBlock/AuthorBlock";
import SocialShare from "components/Blog/SocialShare/SocialShare";
import { getDescriptionFromRichtext } from "utils/getDescription";
import { isPDFContent, isVideoContent } from "utils/isVideoContent";
import { type Block } from "@contentful/rich-text-types";
import ImageContainer from "components/common/Container/ImageContainer";
import { getYouTubeId } from "utils/links";
import { Options } from "@contentful/rich-text-react-renderer";

import * as classes from "./blog.module.css";
import cx from "clsx";

type HelmetProps = {
  data: {
    contentfulResource: TResource;
  };
  location: { pathname: string };
};

export const Head: React.FC<HelmetProps> = ({
  data: { contentfulResource },
  location,
}) => {
  const heroImage = contentfulResource.asset?.file.url;
  const description = contentfulResource.metaDescription?.length
    ? contentfulResource.metaDescription
    : contentfulResource.body?.raw
      ? getDescriptionFromRichtext(contentfulResource.body.raw)
      : "";

  const config = {
    slug: "https://phil.us" + location.pathname,
  };

  return (
    <SEO title={contentfulResource.heading}>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={contentfulResource.heading} />
      <meta name="twitter:description" content={description} />
      {heroImage && (
        <meta
          name="twitter:image"
          content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`}
        />
      )}
      <meta name="description" content={description} />
      <meta property="og:title" content={contentfulResource.heading} />
      <meta property="og:type" content={"Page"} />
      <meta property="og:description" content={description} />
      {heroImage && (
        <meta
          property="og:image"
          content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`}
        />
      )}
      <meta property="og:url" content={config.slug} />
      <Script
        defer
        async
        strategy="idle"
        charSet="utf-8"
        type="text/javascript"
        src="//js.hsforms.net/forms/embed/v2.js"
      ></Script>
      {contentfulResource.noindex && <meta name="robots" content="noindex" />}
    </SEO>
  );
};

type PageTemplateProps = {
  data: {
    contentfulResource: TResource;
    allContentfulResource: {
      nodes: TResource[];
    };
  };
};

// Separate components for each content type
type ContentProps = {
  asset: TAsset;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  classes: Record<string, string>;
};

const PDFContent: React.FC<ContentProps> = ({ asset, canvasRef }) => (
  <Asset ref={canvasRef} asset={asset} />
);

const VideoContent: React.FC<ContentProps> = ({ asset, canvasRef }) => (
  <ImageContainer fluid maw="100%" ratio={16 / 9}>
    <Asset ref={canvasRef} asset={asset} />
  </ImageContainer>
);

const DefaultContent: React.FC<ContentProps> = ({
  asset,
  canvasRef,
  classes,
}) => (
  <Box className={classes.embededAssetWrapper}>
    <Asset ref={canvasRef} asset={asset} />
  </Box>
);

type ContentRendererProps = {
  node: Block;
  classes: Record<string, string>;
};

const ContentRenderer: React.FC<ContentRendererProps> = ({ node, classes }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const asset = node?.data?.target as TAsset;
  const contentType: string = node?.data?.target?.file?.contentType as string;

  if (isPDFContent(contentType)) {
    return <PDFContent asset={asset} canvasRef={canvasRef} classes={classes} />;
  }

  if (isVideoContent(contentType)) {
    return (
      <VideoContent asset={asset} canvasRef={canvasRef} classes={classes} />
    );
  }

  return (
    <DefaultContent asset={asset} canvasRef={canvasRef} classes={classes} />
  );
};

const BlogTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const { heading, body, asset, banners, author, noindex, isFaq } =
    data.contentfulResource;

  // Map for future reference to match content
  const youtubeEmbeds = new Map<string, { title: string; url: string }>();

  if (body?.references) {
    body.references.forEach((reference) => {
      const contentTypeID = reference?.sys?.contentType?.sys?.id;
      const contentfulID = reference?.contentful_id;
      if (!contentfulID) {
        return;
      }

      switch (contentTypeID) {
        case "youtubeEmbedResource":
          youtubeEmbeds.set(contentfulID, {
            title: reference.title as string,
            url: reference.youtubeVideoUrl as string,
          });
          break;
      }
    });
  }

  const options: Options = {
    renderText: (text) => {
		if (text === "") {
			return <br></br>
		}

		return text
    },

    renderNode: {
      [INLINES.ENTRY_HYPERLINK](node, children) {
        return <>{children}</>;
      },
      [BLOCKS.EMBEDDED_ENTRY](node, children) {
        const content: { title: string; url: string } = youtubeEmbeds.get(
          node?.data?.target?.contentful_id,
        ) as {
          title: string;
          url: string;
        };

        if (content?.url?.length) {
          const vid = getYouTubeId(content.url);
          if (vid) {
            return <YouTubeEmbed videoId={vid} title={content.title} />;
          }
        }

        return null; // Return null during build time
      },
      [BLOCKS.EMBEDDED_ASSET](node) {
        return (
          <Box
            className={
              isPDFContent(node.data.target.file.contentType as string)
                ? classes.embededAssetPDF
                : classes.embededAsset
            }
          >
            <ContentRenderer node={node} classes={classes} />
          </Box>
        );
      },
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },

      [BLOCKS.OL_LIST](node, children) {
        return (
          <List className={classes.orderedList} type="ordered">
            {children}
          </List>
        );
      },

      [BLOCKS.UL_LIST](node, children) {
        return (
          <List
            className={classes.unorderedList}
            type="unordered"
            listStyleType="disc"
          >
            {children}
          </List>
        );
      },

      [BLOCKS.LIST_ITEM](node, children) {
        return (
          <List.Item mb={0} pr={20} className={classes.listItem}>
            {children}
          </List.Item>
        );
      },

      [INLINES.HYPERLINK](node, children) {
        const { uri } = node.data as { uri: string };
        return (
          <Anchor
            href={uri}
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            {children}
          </Anchor>
        );
      },
      [BLOCKS.HEADING_1](node, children) {
        return (
          <Title order={1} className={classes.heading}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_2](node, children) {
        return (
          <Title order={2} className={cx(classes.heading, classes.heading2)}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title order={3} className={cx(classes.heading, classes.heading3)}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_4](node, children) {
        return (
          <Title order={4} className={cx(classes.heading, classes.heading4)}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_5](node, children) {
        return (
          <Title order={5} className={cx(classes.heading, classes.heading5)}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_6](node, children) {
        return (
          <Title order={6} className={cx(classes.heading, classes.heading6)}>
            {children}
          </Title>
        );
      },

      [BLOCKS.TABLE](node, children) {
        if (React.Children.count(children) === 1) {
          // Only one row
          return (
            <table className={classes.table}>
              <tbody>{children}</tbody>
            </table>
          );
        }

        if (React.Children.count(children) === 2) {
          // Two rows
          const [first, second] = children as React.ReactElement[];
          return (
            <table className={classes.table}>
              <tbody>
                {first}
                {second}
              </tbody>
            </table>
          );
        }

        if (React.Children.count(children) >= 3) {
          // Three or more rows
          const [first, ...rest] = children as React.ReactElement[];
          const last = rest.pop();
          return (
            <table className={classes.table}>
              <thead>{first}</thead>
              <tbody>{rest}</tbody>
              <tfoot>{last}</tfoot>
            </table>
          );
        }

        return null; // Return null if no rows present
      },

      [BLOCKS.TABLE_ROW](node, children) {
        return <tr>{children}</tr>;
      },

      [BLOCKS.TABLE_CELL](node, children) {
        return <td className={classes.border}>{children}</td>;
      },

      [BLOCKS.TABLE_HEADER_CELL](node, children) {
        return (
          <th className={cx(classes.tableHeader, classes.border)}>
            {children}
          </th>
        );
      },
    },
  };

  const defaultBanners = data.allContentfulResource.nodes;
  const hasBanners = Boolean(banners);
  const hideBanners = noindex || isFaq;

  const bannersToDisplay = hasBanners
    ? banners!
    : (defaultBanners.map((r) => r.banners).flat(1) as TResource[]);

  return (
    <Layout>
      <Container size="xl" className={classes.wrapper}>
        <Title order={1} className={classes.title}>
          {heading}
        </Title>
        {Boolean(asset) && (
          <Container className={classes.floatingImage} size="sm">
            <Asset asset={asset!} />
          </Container>
        )}

        <Box mb={42}>{body && renderRichText(body, options)}</Box>

        {!noindex && <SocialShare />}

        {Boolean(author) && <AuthorBlock author={author!} />}
      </Container>

      {/* Bottom Banners */}
      {!hideBanners && renderBanners(bannersToDisplay)}
    </Layout>
  );
};

// Query Dummy Resource to get default banner
export const query = graphql`
  query staticPageQuery($id: String!) {
    # Default banners
    allContentfulResource(
      filter: {
        node_locale: { eq: "en-US" }
        heading: { eq: "Dummy Resource" }
      }
    ) {
      nodes {
        id
        heading
        banners {
          id
          body {
            raw
          }
          buttonText
          hubspotEmbed {
            raw
          }
          isHubspotEmbed
          externalLink
          heading
        }
      }
    }

    # Blog content
    contentfulResource(id: { eq: $id }) {
      banners {
        id
        body {
          raw
        }
        buttonText
        hubspotEmbed {
          raw
        }
        isHubspotEmbed
        externalLink
        heading
      }
      slug
      noindex
      isFaq
      author {
        id
        name
        authorTitle
        bio {
          raw
        }
        avatar {
          gatsbyImageData(
            resizingBehavior: SCALE
            placeholder: BLURRED
            layout: CONSTRAINED
          )
          title
          file {
            contentType
            details {
              size
            }
            url
          }
        }
      }
      buttonText
      heading
      id
      subheading
      description {
        id
        description
      }
      metaDescription
      externalLink
      asset {
        gatsbyImageData(
          resizingBehavior: SCALE
          placeholder: BLURRED
          layout: CONSTRAINED
        )
        title
        file {
          contentType
          details {
            size
          }
          url
        }
      }
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            description
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
            file {
              contentType
              details {
                size
              }
              url
            }
            sys {
              type
            }
          }
          ... on ContentfulYoutubeEmbedResource {
            id
            contentful_id
            __typename
            youtubeVideoUrl
            title
            sys {
              contentType {
                sys {
                  id
                  type
                }
              }
              type
            }
            internal {
              type
            }
          }
        }
      }
      sys {
        contentType {
          sys {
            id
            type
          }
        }
      }
      generateStaticPage
      relatesTo {
        ... on ContentfulReferencedSection {
          id
          header
          page {
            id
            title
          }
        }
        ... on ContentfulSection {
          id
          header
          page {
            id
            title
          }
        }
      }
    }
  }
`;

export default BlogTemplate;
