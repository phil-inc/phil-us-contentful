const slugify = require('slugify');

exports.createPages = async function ({actions, graphql}) {
	const {data} = await graphql(`
		query getPages {
			allContentfulPage {
				nodes {
					id
					title
					sections {
						... on ContentfulReferencedSection {
							id
							header
							sectionType
							references {
								id
								createdAt
								linkTo
								heading
								buttonText
								asset {
									gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, resizingBehavior: SCALE)
									id
								}
								body {
									raw
								}
								author
								designation
							}
							referenceType
							linkTo
							buttonText
							createdAt(locale: "en-US")
						}
						... on ContentfulSection {
							id
							body {
								raw
								references {
									contentful_id
									__typename
									description
									gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
								}
							}
							asset {
								gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
								title
							}
							buttonText
							header
							sectionType
							linkTo
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
						}
					}
				}
			}
		}
	`);

	data.allContentfulPage.nodes.forEach(({title}) => {
		const slug = slugify(title, {lower: true, strict: true});

		actions.createPage({
			path: title === 'Home' ? '/' : slug,
			component: require.resolve(`./src/templates/page.tsx`),
			context: {title: title},
		});
	});

	const blogPosts = await graphql(`
		query getBlogsPosts {
			contentfulPage(title: {eq: "Resources"}) {
				id
				sections {
					... on ContentfulReferencedSection {
						header
						references {
							heading
						}
					}
				}
			}
			allContentfulHeader {
				nodes {
					navavigationLinks {
						title
						sections {
							... on ContentfulSection {
								id
								header
								subNavigationSection {
									heading
								}
							}
							... on ContentfulReferencedSection {
								id
								header
								subNavigationSection {
									heading
								}
							}
						}
					}
				}
			}
		}
	`);

	blogPosts.data.contentfulPage.sections.forEach(nav => {
		nav.references.forEach(subNav => {
			if (nav.header != null) {
				const path = `${slugify(nav.header, {lower: true, strict: true})}/${slugify(subNav.heading, {lower: true, strict: true})}`;

				actions.createPage({
					path: path,
					component: require.resolve(`./src/templates/blog.tsx`),
					context: {title: subNav.heading},
				});
			}
		});
	});

	blogPosts.data.allContentfulHeader.nodes.forEach(item => {
		item.navavigationLinks.forEach(navigationLink => {
			navigationLink.sections.forEach(nav => {
				if (nav.header !== null && nav.subNavigationSection !== null) {
					nav.subNavigationSection.forEach(subNav => {
						const path = `${slugify(navigationLink.title, {lower: true, strict: true})}/${slugify(nav.header, {
							lower: true,
							strict: true,
						})}/${slugify(subNav.heading, {lower: true, strict: true})}`;

						actions.createPage({
							path: path,
							component: require.resolve(`./src/templates/blog.tsx`),
							context: {title: subNav.heading},
						});
					});
				}
			});
		});
	});
};
