const slugify = require('slugify');

const generateMainPages = async ({actions, graphql})=>{
	const {data} = await graphql(`
		query getPages {
			allContentfulPage(filter: {node_locale: {eq: "en-US"}}) {
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

}

const generateBlogPages = async ({actions, graphql}) => {
	const {data} = await graphql(`
		query allBlogPages {
			allContentfulResource(filter: {relatesTo: {id: {ne: null}}, node_locale: {eq: "en-US"}}) {
				nodes {
					body {
						raw
					}
					author
					buttonText
					designation
					heading
					hubspotForm
					id
					isHubSpotForm
					linkTo
					subHeading {
						subHeading
					}
					sys {
						contentType {
							sys {
								id
								type
							}
						}
					}
					relatesTo {
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
	`);

	data.allContentfulResource.nodes.forEach(resource => {
		if (resource.heading !== null) {
			const path = `${slugify(resource.relatesTo?.page[0]?.title, {lower: true, strict: true})}/${slugify(resource.relatesTo?.header, {lower: true, strict: true})}/${slugify(resource.heading, {
				lower: true,
				strict: true,
			})}`;

			actions.createPage({
				path: path,
				component: require.resolve(`./src/templates/blog.tsx`),
				context: {title: resource.heading},
			});
		}
	});
}

exports.createPages = async function (props) {
	await generateMainPages(props)
	await generateBlogPages(props)
};
