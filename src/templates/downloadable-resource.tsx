import React from "react";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Layout } from "layouts/Layout/Layout";
import { SEO } from "layouts/SEO/SEO";
import {
  Anchor,
  Box,
  Button,
  Container,
  Grid,
  List,
  Text,
  Title,
} from "@mantine/core";
import { Script, graphql } from "gatsby";
import { renderBanners } from "components/common/Banner/Banner";
import { type TResource, type TDownloadableResource } from "types/resource";
import SocialShare from "components/Blog/SocialShare/SocialShare";
import Asset from "components/common/Asset/Asset";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { isPDFContent } from "utils/isVideoContent";
import cx from "clsx";
import * as classes from "./downloadableResource.module.css";
import ImageContainer from "components/common/Container/ImageContainer";
import { Options } from "@contentful/rich-text-react-renderer";

type HelmetProps = {
  data: {
    contentfulDownloadableResource: TDownloadableResource;
  };
  location: { pathname: string };
};

export const Head: React.FC<HelmetProps> = ({
  data: { contentfulDownloadableResource },
  location,
}) => {
  const config = {
    slug: "https://phil.us" + location.pathname,
    heroImage: contentfulDownloadableResource?.image?.file?.url,
  };

  const computeTitle = () => {
    const pageTitle = contentfulDownloadableResource.heading;

    return pageTitle.trim();
  };

  const computeMetaDescription = () => {
    const pageMetaDescription = contentfulDownloadableResource.metaDescription;

    return pageMetaDescription.trim();
  };

  return (
    <SEO title={computeTitle()}>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computeTitle()} />
      <meta name="twitter:description" content={computeMetaDescription()} />
      {config.heroImage && (
        <meta
          name="twitter:image"
          content={`https:${config.heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`}
        />
      )}
      <meta name="description" content={computeMetaDescription()} />
      <meta property="og:title" content={computeTitle()} />
      <meta property="og:type" content={"Page"} />
      <meta property="og:description" content={computeMetaDescription()} />
      {config.heroImage && (
        <meta
          property="og:image"
          content={`https:${config.heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`}
        />
      )}
      <meta property="og:url" content={config.slug} />
      <Script
        defer
        strategy="idle"
        charSet="utf-8"
        type="text/javascript"
        src="//js.hsforms.net/forms/embed/v2.js"
      ></Script>
      {contentfulDownloadableResource.noindex && (
        <meta name="robots" content="noindex" />
      )}
    </SEO>
  );
};

type ResourcesPageProps = {
  data: {
    contentfulDownloadableResource: TDownloadableResource;
    allContentfulResource: { nodes: TResource[] };
  };
  location: Location;
};

const DownloadableResource: React.FC<ResourcesPageProps> = ({ data }) => {
  const canvasRef = React.useRef(null);
  const defaultBanners = data.allContentfulResource.nodes;
  const hasBanners = Boolean(data.contentfulDownloadableResource.banner);
  const bannersToDisplay = hasBanners
    ? [data.contentfulDownloadableResource.banner]
    : (defaultBanners.map((r) => r.banners).flat(1) as TResource[]);

  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET](node) {
        return (
          <Box
            data-is-pdf={isPDFContent(node.data.target.file.contentType)}
            className={classes.embededAsset}
          >
            <Asset ref={canvasRef} asset={node.data.target} />
          </Box>
        );
      },
      [BLOCKS.PARAGRAPH](node, children) {
        return (
          <Text component="p" mt={0} className={classes.bodyText}>
            {children}
          </Text>
        );
      },

      [BLOCKS.OL_LIST](node, children) {
        return (
          <List type="ordered" mt={16} mb={32}>
            {children}
          </List>
        );
      },

      [BLOCKS.UL_LIST](node, children) {
        return (
          <List type="unordered" listStyleType="disc" pl={16} mt={16} mb={44}>
            {children}
          </List>
        );
      },

      [BLOCKS.LIST_ITEM](node, children) {
        return (
          <List.Item mt={8} mb={0} pr={20} className={classes.listItem}>
            {children}
          </List.Item>
        );
      },

      [INLINES.HYPERLINK](node, children) {
        const { uri } = node.data as { uri: string };
        return (
          <Anchor href={uri} target="_blank" className={classes.anchor}>
            {children}
          </Anchor>
        );
      },
      [BLOCKS.HEADING_1](node, children) {
        return (
          <Title order={1} mt={40} mb={4}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_2](node, children) {
        return (
          <Title order={2} size={24} mt={40} mb={4}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title order={3} size={18} mt={40} mb={4}>
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_4](node, children) {
        return (
          <Title
            order={4}
            size={18}
            style={{ fontFamily: "Lato, sans-serif" }}
            mt={40}
            mb={4}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_5](node, children) {
        return (
          <Title
            order={5}
            size={18}
            style={{ fontWeight: 400, fontFamily: "Lato, sans-serif" }}
            mt={40}
            mb={4}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.HEADING_6](node, children) {
        return (
          <Title
            order={6}
            size={18}
            style={{ fontFamily: "Lato, sans-serif" }}
            mt={40}
            mb={4}
          >
            {children}
          </Title>
        );
      },

      [BLOCKS.TABLE](node, children) {
        if ((children as React.ReactElement[]).length === 1) {
          // Only one row
          return (
            <table className={classes.table}>
              <tbody>{children}</tbody>
            </table>
          );
        }

        if ((children as React.ReactElement[]).length === 2) {
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

        if ((children as React.ReactElement[]).length >= 3) {
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

      [BLOCKS.TABLE_ROW](_, children) {
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

  return (
    <Layout>
      <Container
        size={'xl'}
        className={classes.inner}
        id={data.contentfulDownloadableResource.id}
      >
        <Box>
          <Grid justify="center">
            <Grid.Col span={{ sm: 12, md: 7 }}>
              {data?.contentfulDownloadableResource?.type?.length && (
                <Text className={classes.section}>
                  {data.contentfulDownloadableResource.type}
                </Text>
              )}
              <Title className={classes.title}>
                {data.contentfulDownloadableResource.heading}
              </Title>
              <Box className={classes.description}>
                <Text>{data.contentfulDownloadableResource.description}</Text>
              </Box>
              <Anchor
                href={
                  data.contentfulDownloadableResource.downloadableAsset.file.url
                }
                referrerPolicy="no-referrer"
                target="_blank"
              >
                <Box>
                  <Button variant="philDefault" className={classes.button}>
                    Download PDF
                  </Button>
                </Box>
              </Anchor>
            </Grid.Col>
            <Grid.Col className={classes.centerImage} span={{ sm: 12, md: 5 }}>
              <ImageContainer
                ratio={1}
                maw={
                  data.contentfulDownloadableResource.image?.gatsbyImageData
                    ?.width
                }
                mah={
                  data.contentfulDownloadableResource.image?.gatsbyImageData
                    ?.height
                }
                isGatsbyImageData={Boolean(
                  data.contentfulDownloadableResource.image?.gatsbyImageData,
                )}
                data-is-downloadable-reource-hero-image={true}
              >
                {data.contentfulDownloadableResource.image && (
                  <Asset asset={data.contentfulDownloadableResource.image} />
                )}
              </ImageContainer>
            </Grid.Col>
          </Grid>
        </Box>
        <Box mb={42} mt={64}>
          {data.contentfulDownloadableResource.body &&
            renderRichText(data.contentfulDownloadableResource.body, options)}
        </Box>
        <SocialShare  />
      </Container>
      {renderBanners(bannersToDisplay)}
    </Layout>
  );
};

export const downloadableResourceQuery = graphql`
  query getDownloadableResource($id: String) {
    contentfulDownloadableResource(id: { eq: $id }) {
      id
      type
      noindex
      heading
      description
      metaDescription
      downloadableAsset {
        id
        url
        publicUrl
        file {
          contentType
          details {
            size
          }
          url
          fileName
        }
        mimeType
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
      buttonText
      slug
      image {
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
      banner {
        id
        body {
          raw
          references {
            ... on ContentfulAsset {
              id
              mimeType
              file {
                url
                contentType
                details {
                  size
                }
              }
            }
          }
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
  }
`;

export default DownloadableResource;
