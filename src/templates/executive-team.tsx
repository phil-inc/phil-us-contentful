import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { graphql } from "gatsby";
import { Layout } from "layouts/Layout/Layout";
import React from "react";
import { ContentfulPage } from "types/page";

import * as classes from "../components/career/careerSection.module.css";
import { url } from "inspector";

type ExecutiveTeamProps = {
  data: { contentfulPage: ContentfulPage };
};

const ECard = (reference: any) => {
  const { heading, subheading, body } = reference;

  console.log(reference, reference.heading, subheading, body)

  const companies = [
    {
      media: {
        type: "image",
        url: "https://phil.us/img/investors/Eniac.png",
      },
    },
    {
      media: {
        type: "image",
        url: "https://phil.us/img/investors/Eniac.png",
      },
    },
    {
      media: {
        type: "image",
        url: "https://phil.us/img/investors/Eniac.png",
      },
    },
  ];

  return (
    <Box className="text-center p-4">
      <div>
        <Image
          src={
            reference.image || "https://phil.us/img/investors/Forerunner.png"
          }
          alt={reference.heading}
          className="rounded-lg mb-3 w-full h-48 object-cover"
        />
      </div>
      <div>
        <Text size="lg" className="mb-1">
          {reference.heading || "Deepak"}
        </Text>
        <Text size="sm" color="dimmed" className="mb-2">
          {reference.subheading || "Founder"}
        </Text>
        <Group wrap="nowrap">
          {companies.map((company, index) => (
            <Image
              key={index}
              src={company.media.url}
              alt={`Company ${index + 1}`}
              height={36}
              style={{ objectFit: "cover" }}
            />
          ))}
        </Group>
        <Button variant="outline" color="blue">
        View LinkedIn Profile
      </Button>
      </div>
    </Box>
  );
};

const ExecutiveTeam: React.FC<ExecutiveTeamProps> = ({
  data: { contentfulPage },
}) => {
  const references = contentfulPage.sections[0].references;

  return (
    <Layout>
      <Container fluid className={classes.container}>
        <Grid align="center" justify="space-between">
          <Grid.Col span={5}>
            <Box>
              <Title order={1} size={"40px"}>
                Meet the PHIL team
              </Title>
            </Box>
          </Grid.Col>
        </Grid>

        <Grid gutter="lg">
          {references.map((reference, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
              <ECard reference={reference} />
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
    }
  }
`;

export default React.memo(ExecutiveTeam);
