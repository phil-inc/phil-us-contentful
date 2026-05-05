import React from "react";
import { graphql, navigate } from "gatsby";
import { Box, Container, Flex, Stack, Text, Title } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

import { Layout } from "layouts/Layout/Layout";

import PageContext from "contexts/PageContext";

import Head from "components/common/Head/Head";
import Section from "components/section/Section";
import HubSpotFormV2 from "components/common/HubspotForm/HubspotFormV2";

import { ContentfulPage } from "types/page";
import type { IReferencedSection, ISection } from "types/section";

import { getHubspotFormDetails } from "utils/utils";
import { ROI_EMAIL_SUBMITTED } from "constants/global.constant";

import * as classes from "./gtn.module.css";

const STICKY_SIDEBAR_SECTION_TYPE = "Sticky Sidebar Form";

type GtnTemplateProps = {
  data: {
    contentfulPage: ContentfulPage;
  };
};

export { Head };

const GtnTemplate: React.FC<GtnTemplateProps> = ({
  data: { contentfulPage },
}) => {
  const { sections, title } = contentfulPage;

  const sidebarSection = sections.find(
    (s) =>
      (s as ISection).sectionType === STICKY_SIDEBAR_SECTION_TYPE,
  ) as ISection | undefined;

  const mainSections = sections.filter((s) => {
    const sec = s as ISection | IReferencedSection;
    if ("isHidden" in sec && sec.isHidden) return false;
    return (sec as ISection).sectionType !== STICKY_SIDEBAR_SECTION_TYPE;
  });

  const { portalId, formId } = getHubspotFormDetails(sidebarSection?.embedForm);
  const hubspotIds = portalId && formId ? { portalId, formId } : null;

  const isEmbedFormTemplate = mainSections.some((section) =>
    Boolean((section as ISection)?.embedForm?.raw),
  );

  let basicSectionCount = 0;

  const richOpts: Options = React.useMemo(
    () => ({
      renderMark: {
        [MARKS.BOLD]: (text) => (
          <Text span fw={700} component="span">
            {text}
          </Text>
        ),
      },
      renderNode: {
        [BLOCKS.PARAGRAPH](_node, children) {
          return (
            <Text className={classes.sidebarBody}>
              {children}
            </Text>
          );
        },
        [BLOCKS.HEADING_3](_node, children) {
          return (
            <Title order={3} className={classes.sidebarTitle}>
              {children}
            </Title>
          );
        },
      },
    }),
    [],
  );

  return (
    <PageContext.Provider value={{ title }}>
      <Layout>
        <Container className="container" size="xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="flex-start"
            align="flex-start"
            gap={{ base: "xl", md: "lg" }}
            wrap="nowrap"
            w="100%"
            className={classes.gtnRow}
          >
            <Box
              className={classes.mainCol}
              flex={
                sidebarSection && hubspotIds
                  ? { base: undefined, md: "7 1 0" }
                  : undefined
              }
              miw={0}
            >
              <main className="roi-page">
                {mainSections.map((section, index, array) => (
                  <Section
                    key={section.id + "gtn-main"}
                    section={section as ISection | IReferencedSection}
                    index={
                      (section as ISection)?.sectionType === "Basic Section"
                        ? basicSectionCount++
                        : basicSectionCount
                    }
                    isEmbedFormTemplate={isEmbedFormTemplate}
                    isPreviousBackgroundPure={Boolean(
                      array[index - 1]?.stylingOptions?.background.includes(
                        "#FFFFFF",
                      ),
                    )}
                    pageTitle={title}
                    sectionIndex={index}
                  />
                ))}
              </main>
            </Box>

            {sidebarSection && hubspotIds ? (
              <Box
                className={classes.sidebarCol}
                flex={{ base: undefined, md: "4 1 0" }}
                miw={0}
              >
                <Box className={classes.stickyAside}>
                  <Stack gap={0}>
                    {sidebarSection.eyebrowHeading ? (
                      <Text className={classes.sidebarEyebrow}>
                        {sidebarSection.eyebrowHeading}
                      </Text>
                    ) : null}
                    {sidebarSection.body?.raw ? (
                      <Box>{renderRichText(sidebarSection.body, richOpts)}</Box>
                    ) : null}
                    <HubSpotFormV2
                      portalId={hubspotIds.portalId}
                      formId={hubspotIds.formId}
                      classname="gtn-sidebar-hubspot-form"
                      formMinHeight="clamp(200px, 32vh, 420px)"
                      callbackFn={() => {
                        sessionStorage.setItem(ROI_EMAIL_SUBMITTED, "true");
                        navigate("/gtn/calculator");
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            ) : null}
          </Flex>
        </Container>
      </Layout>
    </PageContext.Provider>
  );
};

export const query = graphql`
  query GtnPageContent($id: String!) {
    contentfulPage(id: { eq: $id }) {
      noindex
      slug
      id
      title
      displayTitle
      description
      sections {
        ... on ContentfulSection {
          id
          isHidden
          isReverse
          addBorder
          showBottomBorder
          canShowHeader
          eyebrowHeading
          youtubeVideoUrl
          headerDescription {
            headerDescription
            id
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
                listDescription: description {
                  id
                  description
                }
                choose
                anchorLink
                linkText
                listType
                icon {
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
          canShowTextColumnToRight
        }
        ... on ContentfulReferencedSection {
          id
          title
          metaDescription
          referenceType
          eyebrowHeading
          header
          hideHeader
          subHeading {
            subHeading
          }
          topAsset {
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
          hideNavigationAnchor
          sectionType
          isHidden
          addBorder
          showBottomBorder
          v2flag
          canAlsoBeUseAsAutoCarousel
          canShowBottomBorderInThirdReference
          secondReferenceType
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
          referenceSecondRenderOptions {
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
          backgroundAssetImage {
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
              slug
              heading
              subheading
              generateStaticPage
              isFaq
              isImageObjectContain
              canShowImageOnly
              body {
                raw
              }
              icon {
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
              stylingOptions {
                background
                id
                name
                extraColor
              }
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
              }
              hyperlink {
                linkLabel
                externalUrl
                internalContent {
                  ... on ContentfulPage {
                    slug
                    id
                    title
                  }
                }
              }
              buttonText
            }
            ... on ContentfulMetric {
              id
              metricValue
              metricDescriptionRichText {
                raw
              }
            }
          }
          referenceSecond {
            __typename
            ... on ContentfulResource {
              id
              heading
              body {
                raw
              }
            }
          }
          featuredItems {
            generateStaticPage
            id
            heading
            externalLink
            label
            internalLink {
              ... on ContentfulPage {
                slug
                id
                title
              }
            }
            body {
              raw
            }
            asset {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              title
              file {
                url
                contentType
              }
            }
            buttonText
          }
          announcementItems {
            generateStaticPage
            id
            heading
            externalLink
            internalLink {
              ... on ContentfulPage {
                slug
                id
              }
            }
            body {
              raw
            }
            asset {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              title
            }
            buttonText
          }
        }
      }
    }
  }
`;

export default React.memo(GtnTemplate);
