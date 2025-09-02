import React from "react";
import { graphql, StaticQuery } from "gatsby";

import { TopAnnouncementBarNode } from "types/annoucementBar";

import Annoucement from "layouts/Layout/AnnoumentBar/Annoument/Annoument";

type AllContentfulTopAnnouncementBarQuery = {
  allContentfulTopAnnouncementBar: {
    nodes: TopAnnouncementBarNode[];
  };
};

const TopAnnoucement: React.FC<AllContentfulTopAnnouncementBarQuery> = ({
  allContentfulTopAnnouncementBar,
}) => {
  const [topAnnoucement] = allContentfulTopAnnouncementBar?.nodes;
  if (allContentfulTopAnnouncementBar?.nodes?.length < 1 || !(topAnnoucement?.reference?.canDisplay)) {
    return null;
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
            title
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
          }
        }
      }
    }
  }
`;

const AnnoucementBar: React.FC<{}> = () => (
  <StaticQuery query={query} render={(props) => <TopAnnoucement {...props} />} />
);

export default AnnoucementBar;
