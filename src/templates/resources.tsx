import React from "react";
import { Layout } from "layouts/Layout/Layout";
import type { ContentfulPage } from "types/page";
import { SEO } from "layouts/SEO/SEO";
import {
  Accordion,
  Anchor,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import Expanded from "components/common/Expanded/Expanded";
import {
  type IReferencedSection,
  type ISection,
  ReferenceTypeEnum,
} from "types/section";
import { Link, Script, graphql, navigate } from "gatsby";
import { ResourceCard } from "components/common/Resources/ResourceCard";
import slugify from "slugify";
import { Banner } from "components/common/Banner/Banner";
import { useToggle } from "@mantine/hooks";
import { RESOURCES_PAGE } from "constants/routes";
import SearchBox from "components/common/SearchBox/SearchBox";
import { searchSubmitCallback } from "pages/resources/search";

import * as classes from "./resources.module.css";
import useDeviceType from "hooks/useView";

type HelmetProps = {
  data: {
    contentfulPage: ContentfulPage;
    contentfulReferencedSection: IReferencedSection;
  };
  location: { pathname: string };
};

export const Head: React.FC<HelmetProps> = ({
  data: { contentfulPage, contentfulReferencedSection },
  location,
}) => {
  const heroSection = contentfulPage.sections.find(
    (section) => section.sectionType === "Basic Section",
  ) as ISection;
  const heroImage = heroSection?.asset.file.url;

  const computeTitle = () => {
    const referencedSectionTitle = contentfulReferencedSection.title;
    const pageTitle = contentfulPage?.displayTitle?.length
      ? contentfulPage.displayTitle
      : contentfulPage.title;

    return referencedSectionTitle.trim().length
      ? referencedSectionTitle
      : pageTitle;
  };

  const computeMetaDescription = () => {
    const referencedSectionMetaDescription =
      contentfulReferencedSection.metaDescription;
    const pageMetaDescription = contentfulPage.description;

    return referencedSectionMetaDescription.trim().length
      ? referencedSectionMetaDescription
      : pageMetaDescription;
  };

  return (
    <SEO title={computeTitle()}>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computeTitle()} />
      <meta name="twitter:description" content={computeMetaDescription()} />
      {heroImage && (
        <meta
          name="twitter:image"
          content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`}
        />
      )}
      <meta name="description" content={computeMetaDescription()} />
      <meta property="og:title" content={computeTitle()} />
      <meta property="og:type" content={"Page"} />
      <meta property="og:description" content={computeMetaDescription()} />
      {heroImage && (
        <meta
          property="og:image"
          content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`}
        />
      )}
      <meta
        property="og:url"
        content={`https://phil.us${location.pathname}}`}
      />
      <Script
        defer
        strategy="idle"
        charSet="utf-8"
        type="text/javascript"
        src="//js.hsforms.net/forms/embed/v2.js"
      ></Script>
      {contentfulPage.noindex && <meta name="robots" content="noindex" />}
    </SEO>
  );
};

type ResourcesPageProps = {
  data: {
    contentfulReferencedSection: IReferencedSection;
    contentfulPage: ContentfulPage;
  };
  pageContext: {
    limit: number;
    skip: number;
    numPages: number;
    currentPage: number;
  };
  location: Location;
};

const ResourcesPage: React.FC<ResourcesPageProps> = ({
  data,
  pageContext: { currentPage: currentPageNumber, limit, numPages },
}) => {
  const isMobileView = useDeviceType();

  const currentSection = data.contentfulReferencedSection;
  const resources = currentSection?.references || [];

  const startIndex = (currentPageNumber - 1) * limit;
  const endIndex = Math.min(startIndex + limit, resources.length);

  const banners = data?.contentfulPage?.sections?.filter((section) => {
    if (section?.sectionType === "Referenced Section") {
      if (
        (section as IReferencedSection).referenceType ===
        ReferenceTypeEnum.Banner
      ) {
        return true;
      }
    }

    return false;
  }) as IReferencedSection[];

  const [value, toggle] = useToggle(["ResourcesType", null]);

  React.useEffect(() => {
    if (!isMobileView) {
      toggle("ResourcesType");
    }
  }, [isMobileView]);

  const featuredBox = currentSection?.featuredItems?.length && (
    <Card className={classes.featuredItemsList}>
      <Title size={24} order={4} mb={24}>
        Featured Items
      </Title>
      <Box className={classes.featuredItemsNavLinksContainer}>
        {data.contentfulReferencedSection.featuredItems
          .filter((resource) => resource.generateStaticPage)
          .map((resource, index, array) => {
            const path =
              "/" + slugify(resource.heading, { lower: true, strict: true });

            const sectionLabelText = (
              <Text className={classes.featuredItemSectionLabel}>
                {currentSection.header}
              </Text>
            );

            return (
              <React.Fragment key={path + index.toString() + index.toString()}>
                <Box pt={index === 0 ? 0 : 16} pb={index === 0 ? 16 : 0}>
                  {resource?.internalLink && (
                    <>
                      {sectionLabelText}
                      <Link
                        to={path}
                        data-featured={true}
                        className={classes.navLink}
                      >
                        {resource.heading}
                      </Link>
                    </>
                  )}

                  {resource?.externalLink && (
                    <>
                      {sectionLabelText}
                      <Anchor
                        className={classes.navLink}
                        href={resource.externalLink}
                        target="_blank"
                        data-featured={true}
                      >
                        {resource.heading}
                      </Anchor>
                    </>
                  )}
                </Box>
                {index !== array.length - 1 && <Divider my={0} />}
              </React.Fragment>
            );
          })}
      </Box>
    </Card>
  );

  return (
    <Layout>
      <Expanded id={currentSection.id} py={0} mb={40}>
        {/* PAGE HEADER */}
        <Box>
          <Grid gutter={40} align="center" my={36}>
            <Grid.Col span={{ sm: 12, md: 12, lg: 9.76 }}>
              <Title className={classes.heading1} order={1}>
                Resources/
                <br className={classes.breakSection} />
                {currentSection.header}
              </Title>
            </Grid.Col>

            <Grid.Col span={{ sm: 12, md: 12, lg: 2.24 }}>
              <SearchBox
                value=""
                onSubmitCallback={(vs) => {
                  searchSubmitCallback(vs.searchText, []);
                }}
                placeholder="Search..."
              />
            </Grid.Col>
          </Grid>
        </Box>

        <Grid my={40}>
          <Grid.Col span={{ sm: 12, lg: 3 }}>
            {/* RESOURCE TYPE NAV LINKS */}
            <Card className={classes.navigationList}>
              <Accordion
                value={value}
                chevronSize={isMobileView ? 24 : 0}
                classNames={{
                  content: classes.content,
                  control: classes.control,
                  chevron: classes.chevron,
                  label: classes.label,
                  item: classes.item,
                }}
              >
                <Accordion.Item value="ResourcesType">
                  <Accordion.Control
                    disabled={!isMobileView}
                    onClick={() => {
                      toggle();
                    }}
                  >
                    Resources Type
                  </Accordion.Control>

                  <Accordion.Panel>
                    <Box className={classes.navLinkContainer}>
                      {data.contentfulPage.sections
                        .filter(
                          (section) =>
                            !section.isHidden && Boolean(section.header),
                        )
                        .map((section, index, array) => {
                          const path =
                            RESOURCES_PAGE +
                            slugify(section.header, {
                              lower: true,
                              strict: true,
                            });

                          return (
                            <React.Fragment key={path}>
                              <Link
                                to={path}
                                data-index={index}
                                data-active={currentSection.id === section.id}
                                className={classes.navLink}
                              >
                                {section.header}
                              </Link>
                              {index !== array.length - 1 && <Divider my={0} />}
                            </React.Fragment>
                          );
                        })}
                    </Box>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card>

            {/* FEATURED ITEMS NAV LINKS */}
            {!isMobileView && featuredBox}
          </Grid.Col>

          <Grid.Col py={isMobileView ? 0 : undefined} span={{ sm: 12, lg: 9 }}>
            {/* RESOURCES MAP */}
            {currentSection.referenceType === ReferenceTypeEnum.FAQs && (
              <Box className={classes.faqContainer}>
                <Grid gutter={isMobileView ? 10 : 28} align="center">
                  <Grid.Col span={{ sm: 12, md: "content" }}>
                    <Title order={4} className={classes.faqLabel}>
                      For Patient FAQs
                    </Title>
                  </Grid.Col>
                  <Grid.Col span={{ sm: 12, md: "content" }}>
                    <Anchor
                      target="_blank"
                      href={`${process.env.GATSBY_ZENDESK_PATIENT_FAQ_LINK}`}
                    >
                      <Button
                        variant="philDefault"
                        fullWidth={false}
                        className={classes.faqButton}
                      >
                        View the entire FAQ
                      </Button>
                    </Anchor>
                  </Grid.Col>
                </Grid>
              </Box>
            )}

            <Box className={classes.cardContainer}>
              <Box className={classes.currentSectionHeader} mb={28}>
                <Title order={2} m={0} size={32}>
                  {currentSection.header}
                </Title>
              </Box>

              {resources?.length &&
                resources
                  .slice(startIndex, endIndex)
                  .map((resource, index) => (
                    <ResourceCard
                      key={resource.id + index.toString()}
                      resource={resource}
                      isFaq={
                        currentSection.referenceType === ReferenceTypeEnum.FAQs
                      }
                    />
                  ))}
            </Box>

            <Box>
              {/* PAGINATION CONTROLS TODO: update component props */}
              {numPages > 1 && (
                <Pagination.Root
                  classNames={{ control: classes.paginationControl }}
                  mt={44}
                  radius={0}
                  color="#0A0A0A"
                  total={numPages}
                  value={currentPageNumber}
                  onChange={async (pageNumber) => {
                    const path =
                      RESOURCES_PAGE +
                      slugify(currentSection.header, {
                        lower: true,
                        strict: true,
                      }) +
                      "/";

                    if (pageNumber === 1) {
                      void navigate(path);
                      return;
                    }

                    void navigate(path + `${pageNumber}`);
                  }}
                >
                  <Group gap={16} justify="center">
                    <Pagination.Items />
                  </Group>
                </Pagination.Root>
              )}
            </Box>
          </Grid.Col>
        </Grid>

        {isMobileView && featuredBox}
      </Expanded>

      <Expanded
        id="resourcesBannerSection"
        fullWidth
        background="#F4F4F4"
        data-banner={true}
      >
        <Grid>
          {banners.map((bannerSection) =>
            bannerSection.references.map((resource) => (
              <Grid.Col
                key={resource.id + resource.heading}
                span={{
                  sm: 12,
                  lg: bannerSection.references?.length > 1 ? 6 : 12,
                }}
              >
                <Banner key={resource.id} resource={resource} />
              </Grid.Col>
            )),
          )}
        </Grid>
      </Expanded>
    </Layout>
  );
};

export const resourcesQuery = graphql`
  query getReferencedSection($id: String!) {
    contentfulReferencedSection(id: { eq: $id }, node_locale: { eq: "en-US" }) {
      id
      title
      metaDescription
      isHidden
      hideNavigationAnchor
      hideHeader
      header
      sectionType
      references {
        ... on ContentfulResource {
          externalLink
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
          buttonText
          body {
            raw
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
          id
          hyperlink {
            id
            linkLabel
            internalContent {
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
                slug
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
              ... on ContentfulEventRegistration {
                contentful_id
                id
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
            externalUrl
            contentful_id
            node_locale
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
        ... on ContentfulCaseStudy {
          contentful_id
          id
          slug
          noIndex
          title
          description {
            raw
          }
          metaDescription
          body {
            raw
          }
          hyperlink {
            id
            linkLabel
            internalContent {
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
                slug
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
              ... on ContentfulEventRegistration {
                contentful_id
                id
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
              }
              ... on ContentfulCaseStudy {
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
            }
            externalUrl
            contentful_id
            node_locale
          }
        }
      }
      referenceType
      externalLink
      buttonText
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
      featuredItems {
        id
        heading
        generateStaticPage
        externalLink
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
      }
    }
    contentfulPage(title: { eq: "Resources" }) {
      id
      title
      displayTitle
      sections {
        ... on ContentfulReferencedSection {
          id
          isHidden
          hideNavigationAnchor
          hideHeader
          header
          sectionType
          references {
            ... on ContentfulResource {
              externalLink
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
              buttonText
              body {
                raw
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
              id
            }
          }
          referenceType
          externalLink
          buttonText
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
        }
        ... on ContentfulSection {
          id
          header
          isHidden
          sectionType
        }
      }
    }
  }
`;

export default ResourcesPage;
