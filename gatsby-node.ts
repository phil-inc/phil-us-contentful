import slugify from 'slugify';
import path from 'path';
import type {Actions, GatsbyNode, NodePluginArgs} from 'gatsby';

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

	const careerTemplate = path.resolve(`./src/templates/career.tsx`);
	const pageTemplate = path.resolve(`./src/templates/page.tsx`);
	const contactTemplate = path.resolve(`./src/templates/contact.tsx`);
	const resourcesTemplate = path.resolve(`./src/templates/resources.tsx`);
	const blogTemplate = path.resolve(`./src/templates/blog.tsx`);
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
				context: page,
			};

			return pageObject;
		};

		const {data} = await graphql(`
		query getPages {
				allContentfulPage(filter: {node_locale: {eq: "en-US"}}) {
					nodes {
						id
						title
						displayTitle
						description
						sections {
							... on ContentfulSection {
								id
								isHidden
								youtubeVideoUrl
								body {
									raw
									references {
										contentful_id
										__typename
										description
										gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
									}
								}
								isHubspotEmbed
								isInsertSnippet
								codeSnippet {
									codeSnippet
								}
								asset {
									gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
									title
									file {
										contentType
										details {
											size
										}
										url
									}
								}
								buttonText
								header
								sectionType
								externalLink
								sys {
									contentType {
										sys {
											id
										}
									}
								}
								subHeader {
									subHeader
								}
								internalLink {
									... on ContentfulPage {
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
									... on ContentfulReferencedSection {
										id
										page {
											title
										}
										header
										sys {
											contentType {
												sys {
													type
													id
												}
											}
										}
									}
									... on ContentfulSection {
										id
										page {
											title
										}
										header
										sys {
											contentType {
												sys {
													type
													id
												}
											}
										}
									}
									... on ContentfulResource {
										id
										heading
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
							... on ContentfulReferencedSection {
								id
								isHidden
								hideNavigationAnchor
								hideHeader
								header
								subHeading {
									id
									subHeading
								}
								sectionType
								references {
									...on ContentfulResource {
                    externalLink
									internalLink {
										... on ContentfulPage {
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
										... on ContentfulReferencedSection {
											id
											page {
												title
											}
											header
											sys {
												contentType {
													sys {
														type
														id
													}
												}
											}
										}
										... on ContentfulSection {
											id
											page {
												title
											}
											header
											sys {
												contentType {
													sys {
														type
														id
													}
												}
											}
										}
										... on ContentfulResource {
											id
											heading
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
									heading
									subheading
									hubspotEmbed {
										raw
									}
									isHubspotEmbed
									isInsertSnippet
									codeSnippet {
										codeSnippet
									}
									description {
										id
										description
									}
									buttonText
									body {
										raw
									}
									author {
										id
										name
										authorTitle
										bio {
											raw
										}
										avatar {
											gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
											title
											file {
												contentType
												details {
													size
												}
												url
											}
										}
									}
									asset {
										gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, resizingBehavior: FILL)
										id
										file {
											contentType
											url
										}
									}
									id
                  }
								}
								referenceType
								externalLink
								buttonText
								internalLink {
									... on ContentfulPage {
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
									... on ContentfulReferencedSection {
										id
										page {
											title
											id
										}
										header
										sys {
											contentType {
												sys {
													type
													id
												}
											}
										}
									}
									... on ContentfulSection {
										id
										page {
											title
										}
										header
										sys {
											contentType {
												sys {
													type
													id
												}
											}
										}
									}
									... on ContentfulResource {
										id
										heading
										sys {
											contentType {
												sys {
													type
													id
												}
											}
										}
										isInsertSnippet
										codeSnippet {
											codeSnippet
											id
										}
									}
								}
							}
						}
					}
				}
			}`);

		data.allContentfulPage.nodes.forEach(page => {
			if (page.title === 'Resources') {
				const sections = [...page.sections];

				sections.forEach(section => {
					if (!section.header) {
						return;
					}

					const postsPerPage = 5;
					const numPages = pagination.numberOfPages(section.references.length, POSTS_PER_SECTION);

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
			query allBlogPages {
				allContentfulResource(
					filter: {
						node_locale: {eq: "en-US"}
						heading: {nin: ["Dummy Resource", "Dummy Resource | Referenced section"]}
						generateStaticPage: {eq: true}
					}
				) {
					nodes {
						banners {
							id
							body {
								raw
							}
							buttonText
							hubspotEmbed {
								raw
							}
							isHubspotEmbed
							externalLink
							heading
						}
						slug
						noindex
						isFaq
						author {
							id
							name
							authorTitle
							bio {
								raw
							}
							avatar {
								gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
								title
								file {
									contentType
									details {
										size
									}
									url
								}
							}
						}
						buttonText
						heading
						id
						subheading
						description {
							id
							description
						}
						metaDescription
						externalLink
						asset {
							gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
							title
							file {
								contentType
								details {
									size
								}
								url
							}
						}
						body {
							raw
							references {
								... on ContentfulAsset {
									contentful_id
									__typename
									description
									gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
									file {
										contentType
										details {
											size
										}
										url
									}
									sys {
										type
									}
								}
								... on ContentfulYoutubeEmbedResource {
									id
									contentful_id
									__typename
									youtubeVideoUrl
									title
									sys {
										contentType {
											sys {
												id
												type
											}
										}
										type
									}
									internal {
										type
									}
								}
							}
						}
						sys {
							contentType {
								sys {
									id
									type
								}
							}
						}
						generateStaticPage
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
				const isBlogPage = Boolean(resource.relatesTo && resource.relatesTo.page && resource.heading);
				const path =
					resource.slug ??
					`/${slugify(resource.heading, {
						lower: true,
						strict: true,
					})}`;

				if (isBlogPage) {
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
						context: resource,
					});
				}

				actions.createPage({
					path: path,
					component: blogTemplate,
					context: resource,
				});
			} catch (error) {
				console.log('Error creating page: ', resource.heading);
			}
		});
	};

	await generateMainPages({actions, graphql});
	await generateStaticPages({actions, graphql});

	const {createRedirect}= actions

	createRedirect({
		fromPath: '/resources/',
		toPath: '/resources/white-papers/',
		isPermanent: true,
		redirectInBrowser: true,
	})

	createRedirect({
		fromPath: '/resources',
		toPath: '/resources/white-papers/',
		isPermanent: true,
		redirectInBrowser: true,
	})
};
