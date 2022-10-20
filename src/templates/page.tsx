import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {graphql, Script} from 'gatsby';
import slugify from 'slugify';
import {SEO} from 'layouts/SEO/SEO';
import {useInternalPaths} from 'hooks/useInternalPaths';
import {Box, Grid, Title, Container, TextInput, Button} from '@mantine/core';
import {IconSearch} from '@tabler/icons';
import Expanded from 'components/common/Expanded/Expanded';

type HelmetProps = {
	pageContext: {title: string};
	data: {contentfulPage: ContentfulPage};
};

export const Head: React.FC<HelmetProps> = ({pageContext, data}) => (
	<SEO title={pageContext.title}>
		<meta name='description' content={data.contentfulPage.description} />
		<title>Contact</title>
		<script charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></script>
	</SEO>
);

type PageTemplateProps = {
	data: {contentfulPage: ContentfulPage};
};

const PageTemplate: React.FC<PageTemplateProps> = ({data}) => {
	const {id, sections, title} = data.contentfulPage;

	let basicSectionCount = 0;

	return (
		<Layout>
			{title === 'Resources' && (
				<Expanded id={id}>
					<Grid align='center'>
						<Grid.Col span={6}>
							<Box>
								<Title order={2}>Resources</Title>
							</Box>
						</Grid.Col>
						<Grid.Col span={6}>
							<Container fluid>
								<Grid>
									<Grid.Col span={10}>
										<TextInput
											radius={0}
											icon={<IconSearch size={18} stroke={1.5} />}
											size='md'
											placeholder='Search'
											rightSectionWidth={42}
										/>
									</Grid.Col>
									<Grid.Col span={2}>
										<Button color='dark' size='md'>
											Search
										</Button>
									</Grid.Col>
								</Grid>
							</Container>
						</Grid.Col>
					</Grid>
				</Expanded>
			)}
			{sections
				.filter(section => !section.isHidden)
				.map(section => (
					<Section
						key={section.id}
						section={section}
						index={section.sectionType === 'Basic Section' ? basicSectionCount++ : basicSectionCount}
					/>
				))}
		</Layout>
	);
};

export const pageQuery = graphql`
	query getPage($title: String) {
		contentfulPage(title: {eq: $title}) {
			id
			title
			description
			sections {
				... on ContentfulSection {
					id
					isHidden
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
					hideHeader
					header
					sectionType
					references {
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
						subHeading {
							subHeading
						}
						buttonText
						body {
							raw
						}
						author
						designation
						asset {
							gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, resizingBehavior: FILL)
							id
							file {
								contentType
								url
							}
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
			}
		}
	}
`;

export default PageTemplate;
