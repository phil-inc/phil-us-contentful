import React from "react";
import { Container } from "@mantine/core";
import { graphql, navigate, StaticQuery } from "gatsby";
import { IconArrowRight } from "@tabler/icons";

import { TopAnnouncementBarNode } from "types/annoucementBar";

import * as classes from "./AnnoucementBar.module.css";

type AllContentfulTopAnnouncementBarQuery = {
  allContentfulTopAnnouncementBar: {
    nodes: TopAnnouncementBarNode[];
  };
};

const Annoucement: React.FC<AllContentfulTopAnnouncementBarQuery> = ({
  allContentfulTopAnnouncementBar,
}) => {
  const [topAnnoucement] = allContentfulTopAnnouncementBar.nodes;
  const { reference } = topAnnoucement || null;

  if (allContentfulTopAnnouncementBar.nodes.length < 1 || !reference) {
    return null;
  }

  return (
    <section className={classes.annoucementBar}>
      <Container className={classes.msg} size="xl">
        <>
          {reference.title}
          <div
            className={classes.anchorWrapper}
            onClick={() =>
              navigate(`/${reference.hyperlink?.internalContent?.slug}`)
            }
          >
            {reference.hyperlink?.linkLabel}
            <span className={classes.iconWrapper}>
              <IconArrowRight size={16} />
            </span>
          </div>
        </>
      </Container>
    </section>
  );
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
            startDate
            canForceDisplay
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
  <StaticQuery query={query} render={(props) => <Annoucement {...props} />} />
);

export default AnnoucementBar;
