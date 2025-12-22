import React, { useEffect } from "react";
import { useLocation } from "@reach/router";
import { graphql } from "gatsby";
import { Box, Center, Container, Grid, Loader, Title } from "@mantine/core";

import { Layout } from "layouts/Layout/Layout";

import type { ContentfulPage } from "types/page";
import type { ISection } from "types/section";
import { AllContentfulModalQuery } from "types/modal";

import { DTP_RESOURCES_EMAIL_SUBMITTED } from "constants/global.constant";
import { PAGES_ROUTES } from "constants/page";

import Section from "components/section/Section";
import Expanded from "components/common/Expanded/Expanded";
import Head from "components/common/Head/Head";
import PageContext from "contexts/PageContext";
import DTPModal from "components/Modal/dtpModal/dtpModal";


import * as classes from "./page.module.css";

type PageTemplateProps = {
  data: {
    contentfulPage: ContentfulPage;
    allContentfulModal: AllContentfulModalQuery;
  };
};

// Page head
export { Head };

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const { id, sections, title } = data?.contentfulPage;

  let basicSectionCount = 0;

 // Manual Loader state for DTP Resources page
  const location = useLocation();
  const isDtpPageRoute = location.pathname=== PAGES_ROUTES.DTP_RESOURCES;
  const [canShowLoader, setCanShowLoader] = React.useState(isDtpPageRoute);

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

  // Show manual loader for on DTP Resources page
  useEffect(() => {
    const isDtpResourcesEmailSubmissionPending = sessionStorage.getItem(DTP_RESOURCES_EMAIL_SUBMITTED) !== "true" &&  isDtpPageRoute; 
    if(!isDtpResourcesEmailSubmissionPending){
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
        <DTPModal contentfulModalNodes={data?.allContentfulModal?.nodes || []}/>
        {canShowLoader
        ? (<Center>
            <Loader mt={0} size="lg" />
          </Center>
          )
        : sections
          .filter((section) => !(section as ISection)?.isHidden)
          .map((section, index, array) => (
            <Section
              key={section.id + "mapSectionComponent"}
              section={section as ISection}
              index={
                (section as ISection)?.sectionType === "Basic Section"
                  ? basicSectionCount++
                  : basicSectionCount
              }
              isEmbedFormTemplate={isEmbedFormTemplate}
              isPreviousBackgroundPure={Boolean(
                array[index - 1]?.stylingOptions?.background.includes("#FFFFFF")
              )}
              pageTitle={title}
              sectionIndex={index}
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
          sectionName
          id
          heading
          subHeadingText: subHeading
          sectionType
          addBorder
          showBottomBorder
          header
          body {
            raw
          }
          leftColumn {
            raw
            __typename
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
                belowSubHeading{
                  id
                  belowSubHeading
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
              ... on ContentfulMediaItem {
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
              ... on ContentfulLink {
                sys {
                  contentType {
                    sys {
                      type
                      id
                    }
                  }
                }
                linkLabel
                name
                externalUrl
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
                anchorLink
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
              ... on ContentfulMediaItem {
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
          }
          stylingOptions {
            background
            id
            name
          }
          link {
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
        }
        ... on ContentfulSection {
          id
          isHidden
          isReverse
          addBorder
          showBottomBorder
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
          canShowTextColumnToRight
        }
        ... on ContentfulReferencedSection {
          id
          isHidden
          hideNavigationAnchor
          addBorder
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
          hideHeader
          header
          showBottomBorder
          subHeading {
            id
            subHeading
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
          assetForMobile {
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
          sectionType
          metadata {
            tags {
              name
              id
            }
          }
          canAlsoBeUseAsAutoCarousel
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
          leftBackgroundAssetImage {
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
              isImageObjectContain
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
                    __typename
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
                    __typename
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
                    __typename
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
                    __typename
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
                    __typename
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
                    __typename
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
                  ... on ContentfulCaseStudy {
                    __typename
                    id
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
                    anchorLink
                  }
                  ... on ContentfulLink {
                    sys {
                      contentType {
                        sys {
                          type
                          id
                        }
                      }
                    }
                    id
                    linkLabel
                    name
                    externalUrl
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
              canShowImageOnly
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
          belowSubHeading{
            id
            belowSubHeading
          }
          divColorOfBtnParent {
            background
            extraColor
            id
            name
          }
        }
      }
    }
    allContentfulModal(filter: { node_locale: { eq: "en-US" } }) {
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

export default PageTemplate;
