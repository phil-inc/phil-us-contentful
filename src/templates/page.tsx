import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {SEO} from 'layouts/SEO/SEO';
import {Box, Container, Grid, Title} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import type {ISection} from 'types/section';
import PageContext from 'contexts/PageContext';
import {Script, graphql} from 'gatsby';
import slugify from 'slugify';
import {HOME} from 'constants/page';

import * as classes from './page.module.css';
import {parseScript} from 'utils/parseScript';
import {TResponse} from 'extract-json-from-string';
import HubspotForm from 'components/common/HubspotForm/HubspotForm';

type HelmetProps = {
	data: {
		contentfulPage: ContentfulPage;
	};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({data: {contentfulPage}, location}) => {
	const heroSection = contentfulPage.sections.find(section => section.sectionType === 'Basic Section') as ISection;
	const heroImage = heroSection?.asset.file.url;
	const title = contentfulPage.displayTitle.length ? contentfulPage.displayTitle : contentfulPage.title;

	const config = {
		slug: contentfulPage.slug,
	};

	if (!config.slug) {
		config.slug = contentfulPage.title === HOME ? '/' : `/${slugify(contentfulPage.title, {lower: true})}`;
	}

	return (
		<SEO title={title}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={contentfulPage.description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={contentfulPage.description} />
			<meta property='og:title' content={title} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={contentfulPage.description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta property='og:url' content={`https://phil.us${config.slug}`} />
			<Script
				defer
				async
				strategy='idle'
				charSet='utf-8'
				type='text/javascript'
				src='//js.hsforms.net/forms/embed/v2.js'
			></Script>
			{contentfulPage.noindex && <meta name='robots' content='noindex' />}
			<Script
				defer
				async
				strategy='idle'
				type='text/javascript'
				src='//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
			></Script>
		</SEO>
	);
};

type PageTemplateProps = {
	data: {
		contentfulPage: ContentfulPage;
	};
};

const PageTemplate: React.FC<PageTemplateProps> = ({data}) => {
	const {id, sections, title} = data.contentfulPage;
	let basicSectionCount = 0;
	const isEmbedFormTemplate = sections.some(section => Boolean((section as ISection)?.embedForm?.raw));

	// Const formScript =
	// 	'<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script> <script> hbspt.forms.create({ region: "na1", portalId: "20880193", formId: "adf259e8-bb50-4f9e-b2e5-d3bbc0cf4e77" }); </script> ';

	// const object: any = parseScript({raw: formScript});

	// const [formProps] = object as TResponse[];

	return (
		<PageContext.Provider value={{title}}>
			<Layout minimal={false}>
				{title === 'Resources' && (
					<Expanded id={id} py={0}>
						<Grid align='center' justify='space-between'>
							<Grid.Col span={12}>
								<Box>
									<Title order={1}>Resources</Title>
								</Box>
							</Grid.Col>
						</Grid>
					</Expanded>
				)}
				{title === 'Field' && (
					<Container className={classes.container} fluid>
						<Title order={1} mb={30} className={classes.heading}>
							FAQ
						</Title>
					</Container>
				)}
				{sections
					.filter(section => !section.isHidden)
					.map((section, index, array) => (
						<Section
							key={section.id + 'mapSectionComponent'}
							section={section}
							index={section.sectionType === 'Basic Section' ? basicSectionCount++ : basicSectionCount}
							isEmbedFormTemplate={isEmbedFormTemplate}
							isPreviousBackgroundPure={Boolean(array[index - 1]?.stylingOptions?.background.includes('#FFFFFF'))}
						/>
					))}
			</Layout>
		</PageContext.Provider>
	);
};

export const query = graphql`
	query getPages($id: String!) {
		contentfulPage(id: {eq: $id}) {
			noindex
			slug
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
							__typename
							... on ContentfulAsset {
								id
								contentful_id
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
							... on ContentfulButton {
								id
								contentful_id
								buttonText
								buttonStyle
								link {
									linkLabel
									name
									externalUrl
									internalContent {
										__typename
										... on ContentfulPage {
											id
											title
											slug
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
								v2flag
							}
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
					automaticOrder
					background
					embedForm {
						raw
					}
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
					mediaItem {
						name
						media {
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
						youtubeLink
						embedCode {
							raw
						}
						id
					}
					stylingOptions {
						background
						id
						name
					}
					v2Flag
					renderOptions {
						name
						id
						layoutOptions {
							id
							name
							numberOfColumns
							shouldRenderCarousel
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
					metadata {
						tags {
							name
							id
						}
					}
					references {
						... on ContentfulResource {
							id
							isFaq
							externalLink
							internalLink {
								... on ContentfulPage {
									slug
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
								... on ContentfulEventRegistration {
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
							buttonText
							hyperlink {
								contentful_id
								id
								linkLabel
								name
								externalUrl
								internalContent {
									... on ContentfulPage {
										slug
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
									... on ContentfulEventRegistration {
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
							body {
								raw
								references {
									__typename
									... on ContentfulAsset {
										id
										contentful_id
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
									... on ContentfulButton {
										id
										contentful_id
										buttonText
										buttonStyle
										link {
											linkLabel
											name
											externalUrl
											internalContent {
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
										v2flag
									}
									... on ContentfulMediaItem {
										sys {
											contentType {
												sys {
													id
													type
												}
											}
										}
										contentful_id
										name
										name
										media {
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
										youtubeLink
										embedCode {
											raw
										}
										id
									}
									... on ContentfulResource {
										id
										contentful_id
										heading
										slug
										isFaq
										sys {
											contentType {
												sys {
													id
													type
												}
											}
										}
									}
								}
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
							stylingOptions {
								background
								extraColor
								id
								name
							}
							media {
								name
								media {
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
								youtubeLink
								embedCode {
									raw
								}
								id
							}
						}
						... on ContentfulDownloadableResource {
							id
							heading
							desc: description
							metaDescription
							buttonText
							internalLink {
								id
								... on ContentfulDownloadableResource {
									slug
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
							image {
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
							}
							downloadableAsset {
								url
								publicUrl
								file {
									contentType
									details {
										size
									}
									url
									fileName
								}
								mimeType
							}
						}
						... on ContentfulMediaItem {
							metadata {
								tags {
									name
									id
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
							contentful_id
							name
							name
							media {
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
							youtubeLink
							embedCode {
								raw
							}
							id
						}
					}
					referenceType
					externalLink
					buttonText
					internalLink {
						... on ContentfulPage {
							slug
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
					stylingOptions {
						background
						extraColor
						id
						name
					}
					v2flag
					renderOptions {
						name
						id
						layoutOptions {
							id
							name
							numberOfColumns
							shouldRenderCarousel
						}
					}
				}
			}
		}
	}
`;

export default PageTemplate;
