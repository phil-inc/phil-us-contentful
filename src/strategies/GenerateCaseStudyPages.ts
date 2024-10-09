import slugify from "slugify";
import { createPageObject } from "../utils/pageObjectCreator";
import { templateFactory } from "../factories/templateFactory";
import { type Actions } from "gatsby";

type Node = {
  id: string;
  slug: string | undefined;
  heading: string;
  title: string;
};

export default async function GenerateCaseStudyPages({
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
  const template = templateFactory("CaseStudy");

  const {
    data = { allContentfulCaseStudy: { nodes: [] } },
  }: {
    data?: { allContentfulCaseStudy: { nodes: Node[] } } | undefined;
  } = await graphql(allCaseStudyQuery);

  console.log("HERE:: ", { data });

  data?.allContentfulCaseStudy.nodes.forEach(({ id, slug, title }: Node) => {
    const path = slug ?? `/${slugify(title, { lower: true, strict: true })}`;

    const pageObject = createPageObject(path, template, {
      id,
      title: title,
    });
    actions.createPage(pageObject);
  });
}

const allCaseStudyQuery = `
   query allCaseStudy {
        allContentfulCaseStudy(filter: {node_locale: {eq: "en-US"}}) {
            nodes {
                id
                slug
                title
            }
        }
    } 
`;
