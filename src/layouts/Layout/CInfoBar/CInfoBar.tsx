import React, { useState } from "react";
import { graphql, StaticQuery } from "gatsby";

import { TopInfoBarNode } from "types/infoBar";

import InfoBar from "components/common/InfoBar/InfoBar";


type AllContentfulTopInfoBarQuery = {
  currentLocationSlug: string;
  allContentfulTopInfoBar: {
    nodes: TopInfoBarNode[];
  };
};

const TopInfoBar: React.FC<AllContentfulTopInfoBarQuery> = ({
  currentLocationSlug,
  allContentfulTopInfoBar,
}) => {
  const [topAnnoucement] = allContentfulTopInfoBar?.nodes || [];
  const [canShowInfoBar, setCanShowInforBar] = useState(
    Boolean(topAnnoucement?.reference),
  );
  const displayableSlug = topAnnoucement?.pagesToShowInfoBar?.map(page => page?.slug) ?? [];
  const isCurrentLocationHaveDiplayablSlug = displayableSlug.includes(currentLocationSlug);
  
  if (
    (allContentfulTopInfoBar?.nodes?.length < 1 ||
    !topAnnoucement?.reference?.canDisplay) ||
    !isCurrentLocationHaveDiplayablSlug
  ) {
    return <></>;
  }

  return (
    <>
      <InfoBar
        canShowInfoBar={canShowInfoBar}
        setCanShowInforBar={setCanShowInforBar}
        infoBarReference={topAnnoucement?.reference}
      />
    </>
  );
};

export const query = graphql`
  {
    allContentfulTopInfoBar(filter: { node_locale: { eq: "en-US" } }) {
      nodes {
        id
        header
        reference {
          __typename
          id
          ... on ContentfulAnnouncement {
            id
            header
            body {
              raw
            }
            canDisplay
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
            stylingOptions {
              id
              background
              name
              background
            }
            buttonReference {
              __typename
              id
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
                v2flag
              }
            }
          }
        }
        pagesToShowInfoBar{
          __typename
          id
          ... on ContentfulPage {
            id
            title
            slug
          }
        }
      }
    }
  }
`;

const CInfoBar: React.FC<{ currentLocationSlug: string }> = ({
  currentLocationSlug,
}) => (
  <StaticQuery
    query={query}
    render={(props) => (
      <TopInfoBar currentLocationSlug={currentLocationSlug} {...props} />
    )}
  />
);

export default CInfoBar;
