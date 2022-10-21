const slugify = require('slugify');
const careerTemplate = require.resolve(`./src/templates/career.tsx`);
const pageTemplate = require.resolve(`./src/templates/page.tsx`);

const generateMainPages = async ({actions, graphql}) => {
	// Return page
	const createPageObject = page => {
		const slug = page.title === 'Home' ? '/' : slugify(page.title, {lower: true, strict: true});
		let component;

		// Choose template
		if (page.title === 'Careers') {
			component = careerTemplate;
		} else {
			component = pageTemplate;
		}

		const pageObject = {
			path: slug,
			component: component,
			context: {title: page.title},
		};

		return pageObject;
	};

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

	data.allContentfulPage.nodes.forEach(page => {
		const pageObject = createPageObject(page);

		actions.createPage(pageObject);
	});
};

const generateStaticPages = async ({actions, graphql}) => {
	const {data} = await graphql(`
	query allBlogPages {
		allContentfulResource(
		  filter: {node_locale: {eq: "en-US"}, heading: {nin: ["Dummy Resource", "Dummy Resource | Referenced section"]}, generateStaticPage: {eq: true}}
		) {
		  nodes {
			slug
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

	data.allContentfulResource.nodes
		.forEach(resource => {
			try {
				const isBlogPage = Boolean(resource.relatesTo && resource.relatesTo.page && resource.heading)
				let path =  resource.slug ?? `/${slugify(resource.heading, {
					lower: true,
					strict: true,
				})}`

				if (isBlogPage) {
					path = `${slugify(resource.relatesTo.page[0].title, {lower: true, strict: true})}/${slugify(
						resource.relatesTo?.header,
						{lower: true, strict: true}
					)}/${slugify(resource.heading, {
						lower: true,
						strict: true,
					})}`;
	
					
				}

				actions.createPage({
					path: path,
					component: require.resolve(`./src/templates/blog.tsx`),
					context: resource,
				});
			} catch (error) {
				console.log("Error creating page: ", resource.heading)
			}
		});
};

exports.createPages = async function (props) {
	await generateMainPages(props);
	await generateStaticPages(props);
};
