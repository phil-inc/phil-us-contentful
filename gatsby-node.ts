import slugify from 'slugify';
import path from 'path';
import type {Actions, GatsbyNode} from 'gatsby';

import {POSTS_PER_SECTION} from './src/constants/section';
import {pagination} from './src/utils/pagination';

export const createPages: GatsbyNode['createPages'] = async function ({actions, graphql}) {
	type GraphqlType = <TData, TVariables = any>(
		query: string,
		variables?: TVariables | undefined
	) => Promise<{
		errors?: any;
		data?: TData | undefined;
	}>;

	const resourceSubPages: string[] = [];

	const careerTemplate = path.resolve(`./src/templates/career.tsx`);
	const pageTemplate = path.resolve(`./src/templates/page.tsx`);
	const contactTemplate = path.resolve(`./src/templates/contact.tsx`);
	const resourcesTemplate = path.resolve(`./src/templates/resources.tsx`);
	const downloadableResourcesTemplate = path.resolve(`./src/templates/downloadable-resource.tsx`);
	const blogTemplate = path.resolve(`./src/templates/blog.tsx`);
	const eventRegistrationTemplate = path.resolve(`./src/templates/eventRegistration.tsx`);

	const generateMainPages = async ({actions, graphql}: {actions: Actions; graphql: GraphqlType}) => {
		// Return page
		const createPageObject = page => {
			const slug = page.title === 'Home' ? '/' : slugify(page.title, {lower: true, strict: true});
			let component;

			// Choose template
			if (page.title === 'Careers') {
				component = careerTemplate;
			} else if (page.title === 'Resources') {
				component = resourcesTemplate;
			} else if (page.title === 'Contact') {
				component = contactTemplate;
			} else {
				component = pageTemplate;
			}

			if (page.title === 'Resources') {
				const pageObject = {
					path: slug,
					component: component,
					context: {title: page.title},
				};

				return pageObject;
			}

			const pageObject = {
				path: slug,
				component: component,
				context: {id: page.id},
			};

			return pageObject;
		};

		const {data} = await graphql(`
			query getPages {
				allContentfulPage(filter: {node_locale: {eq: "en-US"}}) {
					nodes {
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
		`);

		data.allContentfulPage.nodes.forEach(page => {
			if (page.title === 'Resources') {
				const sections = [...page.sections];

				sections.forEach(section => {
					if (!section.header) {
						return;
					}

					const postsPerPage = 5;
					const numPages = pagination.numberOfPages(section.references.length, POSTS_PER_SECTION);

					resourceSubPages.push(slugify(section.header, {lower: true, strict: true}));

					Array.from({length: numPages}).forEach((_, i) => {
						const pageObject = createPageObject(page);

						const newPageObject = {
							...pageObject,
							path:
								i === 0
									? slugify(page.title, {lower: true, strict: true}) +
									  '/' +
									  slugify(section.header, {lower: true, strict: true})
									: slugify(page.title, {lower: true, strict: true}) +
									  '/' +
									  slugify(section.header, {lower: true, strict: true}) +
									  `/${i + 1}`,
							context: {
								...pageObject.context,
								id: section.id,
								limit: postsPerPage,
								numPages,
								skip: i * postsPerPage,
								currentPage: i + 1,
							},
						};

						return actions.createPage(newPageObject);
					});
				});

				return;
			}

			const pageObject = createPageObject(page);
			actions.createPage(pageObject);
		});
	};

	const generateStaticPages = async ({actions, graphql}: {actions: Actions; graphql: GraphqlType}) => {
		const {data} = await graphql(`
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
		`);

		data.allContentfulResource.nodes.forEach(resource => {
			try {
				const isRelatedPage = Boolean(resource.relatesTo && resource.relatesTo.page && resource.heading);
				
				const path =
					resource.slug ??
					`/${slugify(resource.heading, {
						lower: true,
						strict: true,
					})}`;



				if (isRelatedPage) {
					const path = `${slugify(resource.relatesTo.page[0].title, {lower: true, strict: true})}/${slugify(
						resource.relatesTo?.header,
						{lower: true, strict: true}
					)}/${slugify(resource.heading, {
						lower: true,
						strict: true,
					})}`;

					actions.createPage({
						path: path,
						component: blogTemplate,
						context: {id: resource.id, heading: resource.heading},
					});

					return;
				}

				actions.createPage({
					path: path,
					component: blogTemplate,
					context: {id: resource.id, heading: resource.heading},
				});
			} catch (error) {
				console.log('Error creating page: ', resource.heading);
			}
		});
	};

	const generateDownloadableResourcePages = async ({actions, graphql}) => {
		const {data} = await graphql(`
			query allDownloadableResource {
				allContentfulDownloadableResource(filter: {node_locale: {eq: "en-US"}}) {
					nodes {
						id
						slug
						heading
					}
				}
			}
		`);

		data.allContentfulDownloadableResource.nodes.forEach(({id, slug, heading}) => {
			const path =
				slug ??
				`/${slugify(heading, {
					lower: true,
					strict: true,
				})}`;

			actions.createPage({
				path: path,
				component: downloadableResourcesTemplate,
				context: {id, heading},
			});
		});
	};

	const generateEventRegistrationPages = async ({actions, graphql}) => {
		const {data} = await graphql(`
			query {
				allContentfulEventRegistration(filter: {node_locale: {eq: "en-US"}}) {
					nodes {
						id
						slug
						heading
					}
				}
			}
		`);

		data.allContentfulEventRegistration.nodes.forEach(({id, slug, heading}) => {
			const path =
				slug ??
				`/${slugify(heading, {
					lower: true,
					strict: true,
				})}`;

			actions.createPage({
				path: path,
				component: eventRegistrationTemplate,
				context: {id, heading},
			});
		});
	};

	await generateMainPages({actions, graphql});
	await generateStaticPages({actions, graphql});
	await generateDownloadableResourcePages({actions, graphql});
	await generateEventRegistrationPages({actions, graphql});

	// TODO: Refactor
	// create redirects for /resources page to the first sub page of resource
	const {createRedirect} = actions;

	const [firstSubPage] = resourceSubPages;

	let redirectPath = '/';
	if (firstSubPage) {
		redirectPath = '/resources/' + firstSubPage + redirectPath;
	}

	createRedirect({
		fromPath: '/resources/',
		toPath: redirectPath,
		isPermanent: true,
	});

	createRedirect({
		fromPath: '/resources',
		toPath: redirectPath,
		isPermanent: true,
	});

	// const resourcesRedirect = path.resolve(`./src/templates/resourcesRedirect.tsx`);
	// const pageObject = {
	// 	path: '/resources',
	// 	component: resourcesRedirect,
	// 	context: {redirectPath},
	// };
	// actions.createPage(pageObject);
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({actions, loaders, stage}) => {
	if (stage === 'build-html' || stage === 'develop-html') {
		actions.setWebpackConfig({
			module: {
				rules: [
					{
						test: /react-pdf/,
						use: loaders.null(),
					},
					{
						test: /pdfjs-dist/,
						use: loaders.null(),
					},
					{
						test: /safer-buffer/,
						use: loaders.null(),
					},
					{
						test: /canvas/,
						use: loaders.null(),
					},
				],
			},
		});
	}
};
