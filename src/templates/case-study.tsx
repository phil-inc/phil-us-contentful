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
  List,
  Text,
  Title,
} from "@mantine/core";
import { graphql } from "gatsby";
import { Layout } from "layouts/Layout/Layout";

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import SocialShare from "components/Blog/SocialShare/SocialShare";
import MetricBox from "components/common/Metric/Metric";
import CaseStudyTestimonial from "components/common/Testimonials/CaseStudyTestimonial";

// TODO: Add head component here

type CaseStudy = {
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
  };
};

const CaseStudy: React.FC<CaseStudyProps> = ({
  data: { contentfulCaseStudy: data },
}) => {
  const contentRef = React.useRef(null);
  const tocRef = React.useRef(null);

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
        return <Divider my={80} size={2} color="#F2F2F2" />;
      },

      [BLOCKS.UL_LIST](node, children) {
        return <List pl={10}>{children}</List>;
      },

      [BLOCKS.OL_LIST](node, children) {
        return (
          <List pl={10} type="ordered" withPadding>
            {children}
          </List>
        );
      },

      [BLOCKS.LIST_ITEM](node, children) {
        return <List.Item className={classes.listItem}>{children}</List.Item>;
      },

      [BLOCKS.HEADING_1](node, children) {
        return <Title order={1}>{children}</Title>;
      },
      [BLOCKS.HEADING_2](node, children) {
        const val = (node.content[0] as any).value;

        return (
          <Title id={val} order={2} size={32} pb={32}>
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
    },
  };

  // TODO: add components and logic here
  return (
    <Layout>
      <Container fluid className={classes.heroContainer}>
        <Grid align="center">
          <Grid.Col span={6}>
            <Title order={1} className={classes.heroTitle}>
              {data.title}
            </Title>
          </Grid.Col>
          <Grid.Col span={"auto"}>
            <Box className={classes.box}>
              <Title order={2} className={classes.boxTitle}>
                {data.subtitle?.subtitle}
              </Title>
              <Box>
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
            <Grid.Col span={4} key={metric.id}>
              <MetricBox metric={metric} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Divider className={classes.divider} />

      <Container fluid className={classes.container} pos={"relative"}>
        <Grid justify="center" gutter={69} pos={"relative"}>
          <Grid.Col span={3} className={classes.sticky}>
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
          <Grid.Col span={6}>
            <Box ref={contentRef}>
              {data.body && renderRichText(data.body, options)}
            </Box>
          </Grid.Col>
          <Grid.Col
            span={3}
            pos={"sticky"}
            style={{ top: 0, height: "fit-content" }}
          >
            <Box className={classes.sticky}>
              <Box p={24} className={classes.box}>
                <Text size="14px" fw={700}>
                  Get the PDF of this blog
                </Text>
                <Button variant="philDefault" w={"100%"} mt={20}>
                  Download PDF
                </Button>
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CaseStudy;

// TODO: query what is needed
export const caseStudyQuery = graphql`
  query getDownloadableResource($id: String) {
    contentfulCaseStudy(id: { eq: $id }) {
      id
      title
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
  }
`;
