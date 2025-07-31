import {
  Anchor,
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
import React, { useState } from "react";
import { ContentfulPage } from "types/page";

import * as classes from "./leadership.module.css";

import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import cx from "clsx";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import { ELinkedinIcon } from "components/common/Buttons/SocialButtons/ELinkedInIcon";
import ImageContainer from "components/common/Container/ImageContainer";
import Asset from "components/common/Asset/Asset";

type LeadershipProps = {
  data: { contentfulPage: ContentfulPage };
};

const ECard = ({ reference }: any) => {
  const [hovered, setHovered] = useState(false);

  const { body, media, hyperlink } = reference;
  const pastCompanies = body.references;

  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_3](node, children) {
        return (
          <Title order={3} className={cx(classes.heading, classes.heading3)}>
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
      [INLINES.EMBEDDED_ENTRY]: () => null,
    },
  };

  return (
    <Box
      style={{
        height: "auto",
        background: "#F5F6F8",
        display: "flex",
        flexDirection: "column",
        width: "500px",
      }}
    >
      <ImageContainer fluid contain card>
        <Asset asset={media.media} />
      </ImageContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "27px 30px",
          gap: "10px",
        }}
      >
        <div>
          <Box>{body && renderRichText(body, options)}</Box>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <Group gap={13}>
            {pastCompanies.map((company: any, index: number) => (
              <Image
                key={index}
                src={company.media.file.url}
                alt={company.media.title}
                height={20}
                style={{ objectFit: "cover",
                width:"auto"
                 }}
              />
            ))}
          </Group>

          <Anchor
            href={hyperlink.externalUrl}
            underline="never"
            target="_blank"
            className={classes.textDecorationNone}
            w={"100%"}
            h="100%"
          >
            <Button
              size="lg"
              py={11}
              leftSection={!hovered ? <ELinkedinIcon/> : <ELinkedinIcon firstFill="white" secondFill="#007EBB"/>}
              fullWidth
              variant="outline"
              color="#007EBB"
              className={classes.button}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Text lh={"16px"}>View LinkedIn Profile</Text>
            </Button>
          </Anchor>
        </div>
      </div>
    </Box>
  );
};

const Leadership: React.FC<LeadershipProps> = ({
  data: { contentfulPage },
}) => {
  const references = contentfulPage.sections[0].references;

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
          {references.map((reference: any, index: number) => (
            <Grid.Col
              key={index}
              span={{ base: 12, sm: 6, md: 4 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
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
