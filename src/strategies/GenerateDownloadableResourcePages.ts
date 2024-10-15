import slugify from "slugify";
import { createPageObject } from "../utils/pageObjectCreator";
import { templateFactory } from "../factories/templateFactory";
import { type Actions } from "gatsby";

type Node = {
  id: string;
  slug: string | undefined;
  heading: string;
};

export default async function GenerateDownloadableResourcePages({
  actions,
  graphql,
}: {
  actions: Actions;
  graphql: <TData, TVariables = any>(
    query: string,
    variables?: TVariables | undefined,
  ) => Promise<{
    errors?: any;
    data?: TData | undefined;
  }>;
}): Promise<void> {
  const template = templateFactory("DownloadableResource");

  const {
    data = { allContentfulDownloadableResource: { nodes: [] } },
  }: {
    data?: { allContentfulDownloadableResource: { nodes: Node[] } } | undefined;
  } = await graphql(allDownloadableResourceQuery);

  data?.allContentfulDownloadableResource.nodes.forEach(
    ({ id, slug, heading }: Node) => {
      const path =
        slug ?? `/${slugify(heading, { lower: true, strict: true })}`;

      const pageObject = createPageObject(path, template, {
        id,
        title: heading,
      });
      actions.createPage(pageObject);
    },
  );
}

const allDownloadableResourceQuery = `
    query allDownloadableResource {
        allContentfulDownloadableResource(filter: {node_locale: {eq: "en-US"}}) {
            nodes {
                id
                slug
                heading
            }
        }
    }
`;
