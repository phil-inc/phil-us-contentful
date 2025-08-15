import { Box, Container, Grid, Title } from "@mantine/core";
import { graphql } from "gatsby";
import { Layout } from "layouts/Layout/Layout";
import React, { useEffect, useRef } from "react";

import * as classes from "./leadership.module.css";

import LeaderProfileCard from "components/LeaderProfileCard/LeaderProfileCard";

import { ContentfulPage } from "types/page";
import { TResource } from "types/resource";

type LeadershipProps = {
  data: { contentfulPage: ContentfulPage };
};

const Leadership: React.FC<LeadershipProps> = ({
  data: { contentfulPage },
}) => {
  const references = contentfulPage.sections[0].references;

  // Using a ref to observe visibility of each card which allows us to apply animations or styles when they come into view(Slide up animation)
  const refs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classes.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    refs.current.forEach((el) => el && observer.observe(el));
  }, []);

  return (
    <Layout>
      <Container size={"xl"} className={classes.container}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "80px",
          }}
        >
          <Title order={1} size={"44px"}>
            Meet the PHIL Leadership Team
          </Title>
        </Box>

        <Grid gutter={36}>
          {references.map((reference: TResource, index: number) => (
            <Grid.Col
              key={index}
              span={{ base: 12, sm: 6, md: 4 }}
              style={{ display: "flex", justifyContent: "center" }}
              className={classes.imageSlide}
              ref={(el) => {
                if (el) refs.current[index] = el;
              }}
            >
              <LeaderProfileCard reference={reference} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query getPages($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      title
      displayTitle
      description
      sections {
        ... on ContentfulReferencedSection {
          id
          title
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
          stylingOptions {
            background
            id
            name
          }
          references {
            ... on ContentfulResource {
              heading
              subheading
              hyperlink {
                id
                externalUrl
              }
              body {
                raw
                references {
                  __typename
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
                    media {
                      gatsbyImageData(
                        resizingBehavior: SCALE
                        placeholder: BLURRED
                        layout: CONSTRAINED
                        formats: [AUTO, WEBP, AVIF]
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
              media {
                media {
                  gatsbyImageData(
                    resizingBehavior: SCALE
                    placeholder: BLURRED
                    layout: CONSTRAINED
                    formats: [AUTO, WEBP, AVIF]
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
        }
      }
    }
  }
`;

export default React.memo(Leadership);
