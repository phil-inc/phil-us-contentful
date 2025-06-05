import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { Box, Container, Grid, Title } from "@mantine/core";

import { Layout } from "layouts/Layout/Layout";

import type { ContentfulPage } from "types/page";
import type { ISection } from "types/section";

import Section from "components/section/Section";
import Expanded from "components/common/Expanded/Expanded";
import Head from "components/common/Head/Head";
import PageContext from "contexts/PageContext";


import * as classes from "./page.module.css";

type PageTemplateProps = {
  data: {
    contentfulPage: ContentfulPage;
  };
};

// Page head
export { Head };

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const { id, sections, title } = data?.contentfulPage;

  let basicSectionCount = 0;

  const isEmbedFormTemplate = sections.some((section) =>
    Boolean((section as ISection)?.embedForm?.raw),
  );

  useEffect(() => {
    const slug = data?.contentfulPage?.slug;

    if (slug === "/") {
      document.body.classList.remove("/");
      document.body.classList.add("home");
    }

    if (slug) {
      document.body.classList.remove(slug);
    }

    document.body.classList.add(slug);

    return () => {
      document.body.classList.remove(slug);
      document.body.classList.remove("home");
    };
  }, [data?.contentfulPage?.slug]);

  return (
    <PageContext.Provider value={{ title }}>
      <Layout minimal={false}>
        {title === "Resources" && (
          <Expanded id={id} py={0}>
            <Grid align="center" justify="space-between">
              <Grid.Col span={12}>
                <Box>
                  <Title order={1}>Resources</Title>
                </Box>
              </Grid.Col>
            </Grid>
          </Expanded>
        )}
        {title === "Field" && (
          <Container className={classes.container} fluid>
            <Title order={1} mb={30} className={classes.heading}>
              FAQ
            </Title>
          </Container>
        )}
        {sections
          .filter((section) => !section.isHidden)
          .map((section, index, array) => (
            <Section
              key={section.id + "mapSectionComponent"}
              section={section}
              index={
                section.sectionType === "Basic Section"
                  ? basicSectionCount++
                  : basicSectionCount
              }
              isEmbedFormTemplate={isEmbedFormTemplate}
              isPreviousBackgroundPure={Boolean(
                array[index - 1]?.stylingOptions?.background.includes("#FFFFFF")
              )}
              pageTitle={title}
            />
          ))}
      </Layout>
    </PageContext.Provider>
  );
};

export const query = graphql`
  query getPages($id: String!) {
    contentfulPage(id: { eq: $id }) {
      noindex
      slug
      id
      title
      displayTitle
      description
      sections {
        ... on ContentfulTextAndTextColumns {
          id
          heading
          subHeadingText: subHeading
          sectionType
          addBorder
          header
          leftColumn {
            raw
            references {
              __typename

              ... on ContentfulReferencedSection {
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
                id
                header
                title
                subHeading {
                  id
                  subHeading
                }
                referenceType
                references {
                  ... on ContentfulResource {
                    id
                    heading
                    body {
                      raw
                    }
                  }
                }
              }
            }
          }
          rightColumn {
            raw
            references {
              __typename
              ... on ContentfulList {
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
                id
                heading
                subheading
                choose
              }
              ... on ContentfulResource {
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
                id
                heading
              }
            }
          }
        }
        ... on ContentfulSection {
          id
          isHidden
          isReverse
          addBorder
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
          backgroundAssetImage {
            id
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
          canShowAssetImageAlignToWall 
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
        ... on ContentfulReferencedSection {
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
          backgroundAssetImage {
            id
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
          references {
            __typename
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
                  ... on ContentfulEventRegistration {
                    id
                    heading
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
                  ... on ContentfulDownloadableResource {
                    id
                    heading
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
                    __typename
                    id
                    contentful_id
                    heading
                    body {
                      raw
                    }
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
            ... on ContentfulReferencedSection {
              id
              header
              references {
                __typename
                ... on ContentfulResource {
                  id
                  heading
                  isFaq
                  stylingOptions {
                    background
                  }
                  body {
                    raw
                    references {
                      ... on ContentfulResource {
                        heading
                        id
                        body {
                          raw
                        }
                      }
                    }
                  }
                }
              }
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
  }
`;

export default PageTemplate;
