const slugify = require('slugify');

const generateMainPages = async ({actions, graphql})=>{
	const {data} = await graphql(`
		query getPages {
			allContentfulPage(filter: {node_locale: {eq: "en-US"}}) {
				nodes {
					id
					title
					description
					sections {
						... on ContentfulReferencedSection {
							id
							header
							sectionType
							references {
								id
								createdAt
								externalLink
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
							externalLink
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
		allContentfulResource(filter: {node_locale: {eq: "en-US"}, heading: {nin: ["Dummy Resource", "Dummy Resource | Referenced section"]}}) {
		  nodes {
			author
			buttonText
			designation
			heading
			id
			description
			externalLink
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

	data.allContentfulResource.nodes.filter((resource) => resource.relatesTo).forEach(resource => {
		if (Boolean(resource.relatesTo && resource.heading)) {
			const path = `${slugify(resource.relatesTo.page[0].title, {lower: true, strict: true})}/${slugify(resource.relatesTo?.header, {lower: true, strict: true})}/${slugify(resource.heading, {
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
