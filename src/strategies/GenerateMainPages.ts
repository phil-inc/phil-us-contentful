import slugify from "slugify";
import { pagination } from "../utils/pagination";
import { POSTS_PER_SECTION } from "../constants/section";
import { createPageObject } from "../utils/pageObjectCreator";
import {
  type TemplateKey,
  templateFactory,
} from "../factories/templateFactory";
import { HOME, RESOURCES } from "../constants/page";
import type { Actions } from "gatsby";
import { type ContentfulPage } from "../types/page";
import { type IReferencedSection, type ISection } from "../types/section";

type PageSectionActions = {
  page: ContentfulPage;
  section: ISection | IReferencedSection;
  actions: Actions;
};

type PageDetails = {
  headerSlug: string;
  index: number;
  numPages: number;
};

export default async function GenerateMainPages(
  {
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
  },
  callback: (resourceSubPages: string[]) => void,
): Promise<void> {
  const resourceSubPages: string[] = [];

  const {
    data = { allContentfulPage: { nodes: [] } },
  }: { data?: { allContentfulPage: { nodes: ContentfulPage[] } } | undefined } =
    await graphql(getPagesQuery);

  data.allContentfulPage.nodes.forEach((page: ContentfulPage) => {
    if (page.title === RESOURCES) {
      handleResourcePage(page, resourceSubPages, actions);
    } else {
      handleRegularPage(page, actions);
    }
  });

  callback(resourceSubPages);
}

const getPagesQuery = `
    query getPages {
        allContentfulPage(filter: { node_locale: { eq: "en-US" } }) {
            nodes {
				slug
                id
                title
                sections {
                    ... on ContentfulSection {
                        id
                        header
                    }
                    ... on ContentfulReferencedSection {
                        id
                        header
                        references {
                            ... on ContentfulDownloadableResource {
                                id
                            }
                            ... on ContentfulResource {
                                id
                            }
                        }
                    }
                }
            }
        }
    }
`;

function handleResourcePage(
  page: ContentfulPage,
  resourceSubPages: string[],
  actions: Actions,
): void {
  page.sections.forEach((section) => {
    if (!section.header) {
      return;
    }

    const headerSlug = slugify(section.header, { lower: true, strict: true });
    resourceSubPages.push(headerSlug);

    const numPages = pagination.numberOfPages(
      (section as IReferencedSection).references.length,
      POSTS_PER_SECTION,
    );

    for (let i = 0; i < numPages; i++) {
      createResourceSubPage(
        { page, section, actions },
        { headerSlug, index: i, numPages },
      );
    }
  });
}

function handleRegularPage(page: ContentfulPage, actions: Actions): void {
  const config = {
    slug: page.slug,
    component: templateFactory(page.title as TemplateKey),
  };

  const pageObject = createPageObject(config.slug, config.component, {
    id: page.id,
    title: page.title,
  });

  actions.createPage(pageObject);
}

function createResourceSubPage(
  pageSectionActions: PageSectionActions,
  pageDetails: PageDetails,
): void {
  const { page, section, actions } = pageSectionActions;
  const { headerSlug, index, numPages } = pageDetails;

  const pageSlug = slugify(page.slug, { lower: true, strict: true });
  const path =
    index === 0
      ? `${pageSlug}/${headerSlug}`
      : `${pageSlug}/${headerSlug}/${index + 1}`;

  const pageObject = createPageObject(path, templateFactory("Resources"), {
    id: section.id,
    title: section.header,
    limit: POSTS_PER_SECTION,
    numPages,
    skip: index * POSTS_PER_SECTION,
    currentPage: index + 1,
  });

  actions.createPage(pageObject);
}
