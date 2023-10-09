import slugify from 'slugify';
import {createPageObject} from '../utils/pageObjectCreator';
import {templateFactory} from '../factories/templateFactory';
import {type Actions} from 'gatsby';
import {type TResource} from '../types/resource';

export default async function GenerateStaticPages({
	actions,
	graphql,
}: {
	actions: Actions;
	graphql: <TData, TVariables = any>(
		query: string,
		variables?: TVariables | undefined
	) => Promise<{
		errors?: any;
		data?: TData | undefined;
	}>;
}): Promise<void> {
	const template = templateFactory('Blog');
	const {
		data = {allContentfulResource: {nodes: []}},
	}: {data?: {allContentfulResource: {nodes: TResource[]}} | undefined} = await graphql(allStaticPagesQuery);

	data.allContentfulResource.nodes.forEach((resource: TResource) => {
		const isRelatedPage = Boolean(resource.relatesTo?.page && resource.heading);

		const path
			= resource.slug
			?? `/${slugify(resource.heading, {
				lower: true,
				strict: true,
			})}`;

		if (isRelatedPage) {
			const newPath = `${slugify(resource.relatesTo.page.title || resource.relatesTo.header, {
				lower: true,
				strict: true,
			})}/${slugify(resource.relatesTo.header, {lower: true, strict: true})}/${slugify(resource.heading, {
				lower: true,
				strict: true,
			})}`;

			const pageObject = createPageObject(newPath, template, {id: resource.id, heading: resource.heading});
			actions.createPage(pageObject);

			return;
		}

		const pageObject = createPageObject(path, template, {id: resource.id, heading: resource.heading});
		actions.createPage(pageObject);
	});
}

const allStaticPagesQuery = `
    query allStaticPages {
        allContentfulResource(
            filter: {
                node_locale: {eq: "en-US"}
                heading: {nin: ["Dummy Resource", "Dummy Resource | Referenced section"]}
                generateStaticPage: {eq: true}
            }
        ) {
            nodes {
                id
                heading
                slug
                relatesTo {
                    ... on ContentfulReferencedSection {
                        id
                        header
                        page {
                            id
                            title
                        }
                    }
                    ... on ContentfulSection {
                        id
                        header
                        page {
                            id
                            title
                        }
                    }
                }
            }
        }
    }
`;
