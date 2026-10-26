import { graphql, useStaticQuery } from "gatsby";
import { MIGRATED_STATIC_PATHS } from "constants/migratedStaticPaths";

type PageProps = {
  pages: {
    nodes: Array<{ path: string; pageContext: { id: string } }>;
  };
};

type PathResponse = {
  path: string;
  id: string;
};

export const useInternalPaths = (): PathResponse[] => {
  const { pages }: PageProps = useStaticQuery(graphql`
    {
      pages: allSitePage {
        nodes {
          path
          pageContext
        }
      }
    }
  `);

  return [
    ...pages.nodes.map((node) => ({
      path: node.path,
      id: node.pageContext.id,
    })),
    // A migrated post is a code page with no pageContext.id, so a Contentful link to its
    // entry would not resolve. The map gives each entry id its static path.
    ...Object.entries(MIGRATED_STATIC_PATHS).map(([id, path]) => ({ path, id })),
  ];
};
