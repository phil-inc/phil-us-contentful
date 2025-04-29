import React, { useEffect } from 'react';
import { Layout } from 'layouts/Layout/Layout';
import type { ContenfulHeaderLogo, ContentfulPage } from 'types/page';
import PageContext from 'contexts/PageContext';
import {  graphql } from 'gatsby';
import { PAGE_WITHOUT_HEADER_FOOTER } from 'constants/page';
import { IReferencedSection, ISection } from 'types/section';
import { getLeftRightArrayFromSections } from 'utils/utils';
import LeftRightContainer from 'components/LeftRigtContainer/LeftRigthContainer';

type DemoBookTemplateProps = {
  data: {
    contentfulPage: ContentfulPage;
    allContentfulHeader: ContenfulHeaderLogo;
  };
};

const DemoBookTemplate: React.FC<DemoBookTemplateProps> = ({
  data: { contentfulPage, allContentfulHeader },
}) => {
  const philLogo = allContentfulHeader.nodes[0]?.logo;
  const whiltePhilLogo = allContentfulHeader.nodes[0]?.whiteLogo || philLogo;
  const { sections, title, slug, id } = contentfulPage;
  console.log(id, '333', philLogo);

  const canHideHeaderFooter = PAGE_WITHOUT_HEADER_FOOTER.includes(title);

  const LeftRightSections = getLeftRightArrayFromSections(
    sections as Array<ISection | IReferencedSection>
  );

  useEffect(() => {
    if (slug === '/') {
      document.body.classList.remove('/');
      document.body.classList.add('home');
    }
    if (slug) {
      document.body.classList.remove(slug);
    }
    document.body.classList.add(slug);

    return () => {
      document.body.classList.remove(slug);
      document.body.classList.remove('home');
    };
  }, [slug]);

  return (
    <PageContext.Provider value={{ title }}>
      <Layout minimal={false} canHideHeaderFooter={canHideHeaderFooter}>
        <>
          <LeftRightContainer
            leftSection={LeftRightSections.leftSection}
            rightSection={LeftRightSections.rightSection}
            philLogo={philLogo}
            whiltePhilLogo={whiltePhilLogo}
          />
        </>
      </Layout>
    </PageContext.Provider>
  );
};

export const query = graphql`
  query getPages($id: String!) {
    allContentfulHeader {
      nodes {
        id
        title
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
        whiteLogo {
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
      }
    }
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
        ... on ContentfulReferencedSection {
          id
          title
          isHidden
          hideNavigationAnchor
          hideHeader
          header
          subHeading {
            id
            subHeading
          }
          addBorder
          sectionType
          metadata {
            tags {
              name
              id
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

export default React.memo(DemoBookTemplate);
