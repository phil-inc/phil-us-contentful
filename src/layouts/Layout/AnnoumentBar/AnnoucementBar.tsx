import React from "react";
import { graphql, StaticQuery } from "gatsby";

import { TopAnnouncementBarNode } from "types/annoucementBar";

import Annoucement from "layouts/Layout/AnnoumentBar/Annoument/Annoument";

type AllContentfulTopAnnouncementBarQuery = {
  currentLocationSlug: string,
  allContentfulTopAnnouncementBar: {
    nodes: TopAnnouncementBarNode[];
  };
};

const TopAnnoucement: React.FC<AllContentfulTopAnnouncementBarQuery> = ({
  currentLocationSlug,
  allContentfulTopAnnouncementBar,
}) => {

  const [topAnnoucement] = allContentfulTopAnnouncementBar?.nodes;
  const isCurrentLocationSameToAnnoucementLink = currentLocationSlug === topAnnoucement?.reference?.hyperlink?.internalContent?.slug;

  if (allContentfulTopAnnouncementBar?.nodes?.length < 1 || !(topAnnoucement?.reference?.canDisplay) || isCurrentLocationSameToAnnoucementLink) {
    return <></>;
  }

  return <Annoucement reference={topAnnoucement.reference} />
};

export const query = graphql`
  {
    allContentfulTopAnnouncementBar(filter: { node_locale: { eq: "en-US" } }) {
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
          }
        }
      }
    }
  }
`;

const AnnoucementBar: React.FC<{currentLocationSlug:string}> = ({currentLocationSlug}) => (
  <StaticQuery query={query} render={(props) => <TopAnnoucement currentLocationSlug={currentLocationSlug} {...props} />} />
);

export default AnnoucementBar;
