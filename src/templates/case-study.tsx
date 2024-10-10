import React from "react";
import * as classes from "./caseStudy.module.css";

import cx from "clsx";

import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { type Options } from "@contentful/rich-text-react-renderer";

import {
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Text,
  Title,
} from "@mantine/core";
import { graphql, Script } from "gatsby";
import { Layout } from "layouts/Layout/Layout";

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import SocialShare from "components/Blog/SocialShare/SocialShare";
import MetricBox from "components/common/Metric/Metric";
import CaseStudyTestimonial from "components/common/Testimonials/CaseStudyTestimonial";
import { ISection } from "types/section";
import Section from "components/section/Section";
import { SEO } from "layouts/SEO/SEO";
import { TAsset } from "types/asset";

type HelmetProps = {
  data: {
    contentfulCaseStudy: CaseStudy;
  };
  location: { pathname: string };
};

export const Head: React.FC<HelmetProps> = ({
  data: { contentfulCaseStudy },
  location,
}) => {
  const config = {
    slug: "https://phil.us" + location.pathname,
    heroImage: contentfulCaseStudy?.image?.file?.url,
  };

  const computeTitle = () => {
    const pageTitle = contentfulCaseStudy.title;

    return pageTitle.trim();
  };

  const computeMetaDescription = () => {
    const pageMetaDescription = contentfulCaseStudy.metaDescription;

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
    </SEO>
  );
};

type CaseStudy = {
  metaDescription: string;
  image: TAsset;
  id: string;
  title: string;
  subtitle?: {
    id: string;
    subtitle: string;
    __typename: string;
  };
  description?: {
    raw: string;
    __typename: string;
  };
  metric?: {
    contentful_id: string;
    id: string;
    metricLabel: string;
    metricValue: string;
    metricDescription?: string;
  }[];
  body?: {
    raw: string;
    __typename: string;
    references?: Array<
      | {
          __typename: string;
          contentful_id: string;
          id: string;
        }
      | {
          __typename: "ContentfulMetric";
          contentful_id: string;
          id: string;
          metricLabel: string;
          metricValue: string;
          metricDescription?: string;
        }
      | {
          __typename: "ContentfulTestimonials";
          contentful_id: string;
          id: string;
          quoteTitle: string;
          quoteText: {
            id: string;
            quoteText: string;
            __typename: string;
          };
          testimonialImage?: {
            contentful_id: string;
            id: string;
          };
        }
    >;
  };
  files?: {
    mimeType: string;
    url: string;
  }[];
};

type CaseStudyProps = {
  data: {
    contentfulCaseStudy: CaseStudy;
    allContentfulSection: { nodes: ISection[] };
    allContentfulReferencedSection: { nodes: ISection[] };
  };
};

const CaseStudy: React.FC<CaseStudyProps> = ({
  data: {
    contentfulCaseStudy: data,
    allContentfulSection,
    allContentfulReferencedSection,
  },
}) => {
  const contentRef = React.useRef(null);
  const tocRef = React.useRef(null);

  const bannerSection = allContentfulSection?.nodes?.[0];
  const newsletterSection = allContentfulReferencedSection?.nodes?.[0];

  const [TOC, setTOC] = React.useState<React.ReactNode[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const elems = (contentRef.current as HTMLElement)?.querySelectorAll(
      "h2[id]",
    );

    if (elems) {
      const elementsArray = Array.from(elems);

      // Create TOC items linking to the respective sections
      const mappedElements = elementsArray.map((element) => (
        <Anchor
          unstyled
          key={element.id}
          href={`#${element.id}`}
          className={cx(
            classes.contentItem,
            activeId === element.id ? classes.active : "",
          )}
        >
          {element.textContent}
        </Anchor>
      ));

      setTOC(mappedElements);
    }
  }, [contentRef.current, activeId]);

  // Intersection Observer to highlight the TOC based on section visibility
  React.useEffect(() => {
    const elems = (contentRef.current as HTMLElement)?.querySelectorAll(
      "h2[id]",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null, // Observe within the viewport
        threshold: 0.6, // 60% of the element must be visible to trigger
      },
    );

    if (elems) {
      elems.forEach((elem) => observer.observe(elem));
    }

    return () => {
      // Clean up the observer
      if (elems) {
        elems.forEach((elem) => observer.unobserve(elem));
      }
    };
  }, []);

  const options: Options = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY](node, children) {
        return <MetricBox data-inline={true} metric={node.data.target} />;
      },

      [BLOCKS.EMBEDDED_ENTRY](node, children) {
        return <CaseStudyTestimonial testimonial={node.data.target} />;
      },

      [BLOCKS.HR](node, children) {
        return <Divider className={classes.divider} size={2} color="#F2F2F2" />;
      },

      [BLOCKS.UL_LIST](node, children) {
        return <ul className={classes.list}>{children}</ul>;
      },

      [BLOCKS.OL_LIST](node, children) {
        return <ol className={classes.list}>{children}</ol>;
      },

      [BLOCKS.LIST_ITEM](node, children) {
        return <li className={classes.listItem}>{children}</li>;
      },

      [BLOCKS.HEADING_1](node, children) {
        return <Title order={1}>{children}</Title>;
      },
      [BLOCKS.HEADING_2](node, children) {
        const val = (node.content[0] as any).value;

        return (
          <Title id={val} order={2} unstyled className={classes.header2}>
            {children}
          </Title>
        );
      },
      [BLOCKS.HEADING_3](node, children) {
        return <Title order={3}>{children}</Title>;
      },
      [BLOCKS.HEADING_4](node, children) {
        return <Title order={4}>{children}</Title>;
      },
      [BLOCKS.HEADING_5](node, children) {
        return <Title order={5}>{children}</Title>;
      },
      [BLOCKS.HEADING_6](node, children) {
        return <Title order={6}>{children}</Title>;
      },
      [BLOCKS.PARAGRAPH](node, children) {
        return <p className={classes.paragraph}>{children}</p>;
      },
    },
  };

  // TODO: add components and logic here
  return (
    <Layout>
      <Container fluid className={classes.heroContainer}>
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={1} className={classes.heroTitle}>
              {data.title}
            </Title>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Box className={classes.box}>
              <Title order={2} className={classes.boxTitle}>
                {data.subtitle?.subtitle}
              </Title>
              <Box className={classes.boxDescription}>
                {data.description?.raw &&
                  documentToPlainTextString(JSON.parse(data.description.raw))}
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      <Container fluid className={classes.container}>
        <Grid align="center" justify="center">
          {data.metric?.map((metric) => (
            <Grid.Col
              className={classes.metricBoxGrid}
              span={{ base: 12, md: 4 }}
              key={metric.id}
            >
              <MetricBox metric={metric} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Divider
        className={classes.divider}
        data-manual={true}
        size={"1px"}
        color="#f4f4f4"
      />

      <Container fluid className={classes.container} pos={"relative"}>
        <Grid justify="center" gutter={{ base: 0, md: 69 }} pos={"relative"}>
          <Grid.Col span={{ base: "auto", md: 3 }} className={classes.sticky}>
            <Box className={classes.sticky}>
              <Box>
                <SocialShare text="Share" gap={8} />
              </Box>
              <Divider my={28} />
              <Box>
                <Text unstyled className={classes.tableOfContentHeader}>
                  TABLE OF CONTENTS
                </Text>

                <Box ref={tocRef}>{TOC}</Box>
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box ref={contentRef}>
              {data.body && renderRichText(data.body, options)}
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: "auto", md: 3 }} className={classes.sticky}>
            {data.files && data.files.length > 0 && (
              <Box p={24} className={classes.box}>
                <Text size="14px" fw={700}>
                  Get the PDF of this blog
                </Text>
                <Anchor
                  href={data.files[0].url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  <Button variant="philDefault" w={"100%"} mt={20}>
                    Download PDF
                  </Button>
                </Anchor>
              </Box>
            )}
          </Grid.Col>
        </Grid>
      </Container>

      <Section
        isPreviousBackgroundPure={false}
        section={bannerSection}
        index={0}
        isEmbedFormTemplate={false}
      />

      <Section
        isPreviousBackgroundPure={false}
        section={newsletterSection}
        index={0}
        isEmbedFormTemplate={false}
      />
    </Layout>
  );
};

export default CaseStudy;

export const caseStudyQuery = graphql`
  query getDownloadableResource($id: String) {
    contentfulCaseStudy(id: { eq: $id }) {
      id
      title
      metaDescription
      image {
        file {
          contentType
          details {
            size
          }
          url
        }
      }
      subtitle {
        id
        subtitle
        __typename
      }
      description {
        raw
        __typename
      }
      metric {
        contentful_id
        id
        metricLabel
        metricValue
        metricDescription
      }
      body {
        raw
        __typename
        references {
          __typename
          ... on ContentfulEntry {
            contentful_id
            id
            __typename
          }
          ... on ContentfulMetric {
            contentful_id
            id
            metricLabel
            metricValue
            metricDescription
            __typename
          }
          ... on ContentfulTestimonials {
            contentful_id
            id
            authorName
            authorTitle
            quoteTitle
            quoteText {
              id
              quoteText
              __typename
            }
            testimonialImage {
              id
              contentful_id
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
        }
      }
      files {
        mimeType
        url
      }
    }

    allContentfulSection(
      filter: {
        metadata: {
          tags: { elemMatch: { name: { in: ["CASE_STUDY_BANNER"] } } }
        }
      }
      limit: 1
    ) {
      nodes {
        id
        isHidden
        youtubeVideoUrl
        body {
          raw
          references {
            __typename
            ... on ContentfulAsset {
              id
              contentful_id
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
            ... on ContentfulButton {
              id
              contentful_id
              buttonText
              buttonStyle
              link {
                linkLabel
                name
                externalUrl
                internalContent {
                  __typename
                  ... on ContentfulPage {
                    id
                    title
                    slug
                    sys {
                      contentType {
                        sys {
                          type
                          id
                        }
                      }
                    }
                  }
                  ... on ContentfulReferencedSection {
                    id
                    page {
                      title
                    }
                    header
                    sys {
                      contentType {
                        sys {
                          type
                          id
                        }
                      }
                    }
                  }
                  ... on ContentfulSection {
                    id
                    page {
                      title
                    }
                    header
                    sys {
                      contentType {
                        sys {
                          type
                          id
                        }
                      }
                    }
                  }
                  ... on ContentfulResource {
                    id
                    heading
                    sys {
                      contentType {
                        sys {
                          type
                          id
                        }
                      }
                    }
                  }
                }
              }
              v2flag
            }
          }
        }
        isHubspotEmbed
        isInsertSnippet
        codeSnippet {
          codeSnippet
        }
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
        buttonText
        header
        sectionType
        externalLink
        automaticOrder
        background
        embedForm {
          raw
        }
        sys {
          contentType {
            sys {
              id
            }
          }
        }
        subHeader {
          subHeader
        }
        internalLink {
          ... on ContentfulPage {
            id
            title
            sys {
              contentType {
                sys {
                  type
                  id
                }
              }
            }
          }
          ... on ContentfulReferencedSection {
            id
            page {
              title
            }
            header
            sys {
              contentType {
                sys {
                  type
                  id
                }
              }
            }
          }
          ... on ContentfulSection {
            id
            page {
              title
            }
            header
            sys {
              contentType {
                sys {
                  type
                  id
                }
              }
            }
          }
          ... on ContentfulResource {
            id
            heading
            sys {
              contentType {
                sys {
                  type
                  id
                }
              }
            }
          }
        }
        mediaItem {
          name
          media {
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
          youtubeLink
          embedCode {
            raw
          }
          id
        }
        stylingOptions {
          background
          id
          name
        }
        v2Flag
        renderOptions {
          name
          id
          layoutOptions {
            id
            name
            numberOfColumns
            shouldRenderCarousel
          }
        }
      }
    }

    allContentfulReferencedSection(
      filter: {
        metadata: {
          tags: { elemMatch: { name: { eq: "Newsletter Component" } } }
        }
      }
    ) {
      nodes {
        id
        isHidden
        hideNavigationAnchor
        hideHeader
        header
        subHeading {
          id
          subHeading
        }
        sectionType
        metadata {
          tags {
            name
            id
          }
        }
        references {
          ... on ContentfulResource {
            id
            isFaq
            externalLink
            internalLink {
              ... on ContentfulPage {
                slug
                id
                title
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
              }
              ... on ContentfulReferencedSection {
                id
                page {
                  title
                }
                header
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
              }
              ... on ContentfulSection {
                id
                page {
                  title
                }
                header
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
              }
              ... on ContentfulResource {
                id
                heading
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
              }
              ... on ContentfulEventRegistration {
                id
                heading
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
              }
            }
            buttonText
            hyperlink {
              contentful_id
              id
              linkLabel
              name
              externalUrl
              internalContent {
                ... on ContentfulPage {
                  slug
                  id
                  title
                  sys {
                    contentType {
                      sys {
                        type
                        id
                      }
                    }
                  }
                }
                ... on ContentfulReferencedSection {
                  id
                  page {
                    title
                  }
                  header
                  sys {
                    contentType {
                      sys {
                        type
                        id
                      }
                    }
                  }
                }
                ... on ContentfulSection {
                  id
                  page {
                    title
                  }
                  header
                  sys {
                    contentType {
                      sys {
                        type
                        id
                      }
                    }
                  }
                }
                ... on ContentfulResource {
                  id
                  heading
                  sys {
                    contentType {
                      sys {
                        type
                        id
                      }
                    }
                  }
                }
                ... on ContentfulEventRegistration {
                  id
                  heading
                  sys {
                    contentType {
                      sys {
                        type
                        id
                      }
                    }
                  }
                }
              }
            }
            heading
            subheading
            hubspotEmbed {
              raw
            }
            isHubspotEmbed
            isInsertSnippet
            codeSnippet {
              codeSnippet
            }
            description {
              id
              description
            }
            body {
              raw
              references {
                __typename
                ... on ContentfulAsset {
                  id
                  contentful_id
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
                ... on ContentfulButton {
                  id
                  contentful_id
                  buttonText
                  buttonStyle
                  link {
                    linkLabel
                    name
                    externalUrl
                    internalContent {
                      ... on ContentfulPage {
                        id
                        title
                        sys {
                          contentType {
                            sys {
                              type
                              id
                            }
                          }
                        }
                      }
                      ... on ContentfulReferencedSection {
                        id
                        page {
                          title
                        }
                        header
                        sys {
                          contentType {
                            sys {
                              type
                              id
                            }
                          }
                        }
                      }
                      ... on ContentfulSection {
                        id
                        page {
                          title
                        }
                        header
                        sys {
                          contentType {
                            sys {
                              type
                              id
                            }
                          }
                        }
                      }
                      ... on ContentfulResource {
                        id
                        heading
                        contentful_id
                        slug
                        isFaq
                        sys {
                          contentType {
                            sys {
                              type
                              id
                            }
                          }
                        }
                      }
                      ... on ContentfulEventRegistration {
                        id
                        contentful_id
                        slug
                        heading
                        sys {
                          contentType {
                            sys {
                              type
                              id
                            }
                          }
                        }
                      }
                    }
                  }
                  v2flag
                }
                ... on ContentfulMediaItem {
                  sys {
                    contentType {
                      sys {
                        id
                        type
                      }
                    }
                  }
                  contentful_id
                  name
                  name
                  media {
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
                  youtubeLink
                  embedCode {
                    raw
                  }
                  id
                }
                ... on ContentfulResource {
                  id
                  contentful_id
                  heading
                  slug
                  isFaq
                  sys {
                    contentType {
                      sys {
                        id
                        type
                      }
                    }
                  }
                }
                ... on ContentfulEventRegistration {
                  id
                  contentful_id
                  heading
                  slug
                  sys {
                    contentType {
                      sys {
                        id
                        type
                      }
                    }
                  }
                }
                ... on ContentfulDownloadableResource {
                  id
                  contentful_id
                  heading
                  slug
                  sys {
                    contentType {
                      sys {
                        id
                        type
                      }
                    }
                  }
                }
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
            asset {
              gatsbyImageData(
                placeholder: BLURRED
                layout: FULL_WIDTH
                resizingBehavior: FILL
              )
              id
              file {
                contentType
                url
              }
            }
            stylingOptions {
              background
              extraColor
              id
              name
            }
            media {
              name
              media {
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
              youtubeLink
              embedCode {
                raw
              }
              id
            }
          }
          ... on ContentfulDownloadableResource {
            id
            heading
            desc: description
            metaDescription
            buttonText
            internalLink {
              id
              ... on ContentfulDownloadableResource {
                slug
                heading
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
              }
            }
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
            body {
              raw
            }
            downloadableAsset {
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
          }
          ... on ContentfulMediaItem {
            metadata {
              tags {
                name
                id
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
            contentful_id
            name
            name
            media {
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
            youtubeLink
            embedCode {
              raw
            }
            id
          }
        }
        referenceType
        externalLink
        buttonText
        internalLink {
          ... on ContentfulPage {
            slug
            id
            title
            sys {
              contentType {
                sys {
                  type
                  id
                }
              }
            }
          }
          ... on ContentfulReferencedSection {
            id
            page {
              title
              id
            }
            header
            sys {
              contentType {
                sys {
                  type
                  id
                }
              }
            }
          }
          ... on ContentfulSection {
            id
            page {
              title
            }
            header
            sys {
              contentType {
                sys {
                  type
                  id
                }
              }
            }
          }
          ... on ContentfulResource {
            id
            heading
            sys {
              contentType {
                sys {
                  type
                  id
                }
              }
            }
            isInsertSnippet
            codeSnippet {
              codeSnippet
              id
            }
          }
        }
        stylingOptions {
          background
          extraColor
          id
          name
        }
        v2flag
        renderOptions {
          name
          id
          layoutOptions {
            id
            name
            numberOfColumns
            shouldRenderCarousel
          }
        }
      }
    }
  }
`;
