import {Grid} from '@mantine/core';
import {FAQ} from 'components/common/FAQ';
import {graphql, StaticQuery} from 'gatsby';
import React from 'react';
import type {TResource} from 'types/resource';

type RenderAllBlogsProps = {
	allContentfulResource: {nodes: TResource[]};
};

const RenderAllBlogs: React.FC<RenderAllBlogsProps> = ({allContentfulResource}) => (
	<>
		<Grid>
			{allContentfulResource.nodes.map(resource => (
				<Grid.Col key={resource.id + 'FAQSection'} py={30} lg={6} md={12} sm={12}>
					<FAQ resource={resource} />
				</Grid.Col>
			))}
		</Grid>
	</>
);

export const query = graphql`
	query allFAQPages {
		allContentfulResource(
			filter: {
				node_locale: {eq: "en-US"}
				heading: {nin: ["Dummy Resource", "Dummy Resource | Referenced section"]}
				generateStaticPage: {eq: true}
				isFaq: {eq: true}
			}
		) {
			nodes {
				slug
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
				description {
					id
					description
				}
				metaDescription
				externalLink
				subheading
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
							id
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
							youtubeVideoUrl
							title
							sys {
								contentType {
									sys {
										id
									}
								}
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
				isFaq
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
				internalLink {
					... on ContentfulResource {
						id
						heading
						sys {
							contentType {
								sys {
									id
									type
								}
							}
						}
						slug
						description {
							id
							description
						}
						externalLink
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
					}
				}
			}
		}
	}
`;

export const FAQSection: React.FC = () => <StaticQuery query={query} render={RenderAllBlogs} />;
