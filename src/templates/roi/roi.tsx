import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { Center, Container, Loader } from "@mantine/core";

import { Layout } from "layouts/Layout/Layout";

import RoiCalculator from "components/Roi/Roi Calculator/RoiCalculator";

import PageContext from "contexts/PageContext";

import Head from "components/common/Head/Head";
import PageModal from "components/Modal/PageModal/PageModal";

import { ContentfulPage } from "types/page";
import { ISection } from "types/section";
import { AllContentfulModalQuery } from "types/modal";

import { ROI_EMAIL_SUBMITTED } from "constants/global.constant";

type RoiTemplateProps = {
    data: {
      contentfulPage: ContentfulPage;
      allContentfulModal: AllContentfulModalQuery;
    };
};

export { Head };

const RoiTemplate: React.FC<RoiTemplateProps> = ({
    data: { contentfulPage, allContentfulModal },

}) => {
  const { sections, title } = contentfulPage;
  const firstSection = sections[0] as ISection;

   // Manual Loader state for ROI page
    const [canShowLoader, setCanShowLoader] = React.useState(true);

    useEffect(() => {
      const isRoiEmailSubmissionPending = sessionStorage.getItem(ROI_EMAIL_SUBMITTED) !== "true"; 
      if(!isRoiEmailSubmissionPending){
        setCanShowLoader(false);
        return;
      }
  
      const timer = setTimeout(() => {
        setCanShowLoader(false);
      }, 1000);
  
      return () => clearTimeout(timer);
    },[])

  
  return (
    <PageContext.Provider value={{ title }}>
      <Layout>
        <Container className="container" size={"xl"}>
          <PageModal contentfulModalNodes={allContentfulModal?.nodes || []}/>
           {canShowLoader
              ? <Center>
                  <Loader mt={"xl"} mb={"xl"} size="lg" />
                </Center>
                
              :<main className="roi-page">
                  <RoiCalculator section={firstSection}/>
              </main>
          }
        </Container>
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
    }
    allContentfulModal(
      filter: {node_locale: {eq: "en-US"}, pageToDisplay: {slug: {in: ["gtn"]}}}
    ) {
      nodes {
        id
        body {
          raw
        }
        logo {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          title
          file {
            contentType
            details {
              size
            }
            url
          }
        }
        hyperlink {
          ... on ContentfulLink {
            id
            linkLabel
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
            }
          }
        }
        image {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          title
          file {
            contentType
            details {
              size
            }
            url
          }
        }
        pageToDisplay {
          __typename
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
        canDisplayModal
        embedForm{
          raw
        }
      }
    }
  }
`;

export default React.memo(RoiTemplate);
