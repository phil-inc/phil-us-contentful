import { createPageObject } from "../utils/pageObjectCreator";
import {
  type TemplateKey,
  templateFactory,
} from "../factories/templateFactory";
import { HOME, INSIGHTS } from "../constants/page";
import type { Actions } from "gatsby";
import { type ContentfulPage } from "../types/page";
import { FEATURES } from "../config/feature.config";

export default async function GenerateMainPages({
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
  const {
    data = { allContentfulPage: { nodes: [] } },
  }: { data?: { allContentfulPage: { nodes: ContentfulPage[] } } | undefined } =
    await graphql(getPagesQuery);

  data.allContentfulPage.nodes.forEach((page: ContentfulPage) => {
    // The News & Insights page no longer gets its /insights/<section>/ listing
    // pages: /resources/, /press/ and /customer-success/ replace them, and
    // netlify.toml 301s the old paths. The entry and its sections stay in
    // Contentful. The articles those listings linked to are built by the other
    // strategies (GenerateStaticPages, GenerateCaseStudyPages, ...), not here.
    if (page.title === INSIGHTS) return;

    handleRegularPage(page, actions);
  });

   // Create a new static page at /ask-phil-ai
  if (FEATURES.PAGE.ASK_PHIL_AI.isEnable){
    actions.createPage(createPageObject('ask-phil-ai', templateFactory('DTPChat'), {
      id: 'dtp-chat-id',
      title: 'Welcome to the Ask Phil Chat Page!',
    }));
  }
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

function handleRegularPage(page: ContentfulPage, actions: Actions): void {
  // /patients is served by the static file-based page at src/pages/patients/index.tsx
  if (page.slug === "patients") return;

  // /providers is served by the static file-based page at src/pages/providers/index.tsx
  if (page.slug === "providers") return;
  
  if (page.slug === "faqs") return;

  // /terms is served by the static file-based page at src/pages/terms/index.tsx
  if (page.slug === "terms") return;

  // /privacy is served by the static file-based page at src/pages/privacy/index.tsx
  if (page.slug === "privacy") return;

  // /hipaa is served by the static file-based page at src/pages/hipaa/index.tsx
  if (page.slug === "hipaa") return;

  // / (home) is served by the static file-based page at src/pages/index.tsx
  if (page.slug === "/") return;

  // /pharma is served by the static file-based page at src/pages/pharma/index.tsx
  if (page.slug === "pharma") return;

  // /demo is served by the static file-based page at src/pages/demo/index.tsx
  if (page.slug === "demo") return;

  // /contact is served by the static file-based page at src/pages/contact/index.tsx
  if (page.slug === "contact") return;

  // /solution/hub/ is served by the static file-based page at src/pages/solution/hub/index.tsx
  if (page.slug === "solution/hub") return;

  // /solution/core/ is the old Digital Hub path; redirected to /solution/hub/ via netlify.toml
  if (page.slug === "solution/core") return;

  // /solution/direct/ is served by the static file-based page at src/pages/solution/direct/index.tsx
  if (page.slug === "solution/direct") return;

  // /solution/ (Overview) is removed; redirected to /solution/hub/ via netlify.toml
  if (page.slug === "solution") return;

  // TODO: Remove this override once the Contentful GTN page slug is changed to "gtn/calculator"
  const slug = page.title === "GTN" ? "gtn/calculator" : page.slug;

  

  const config = {
    slug,
    component: templateFactory(page.title as TemplateKey),
  };

  const pageObject = createPageObject(config.slug, config.component, {
    id: page.id,
    title: page.title,
  });

  actions.createPage(pageObject);
}
