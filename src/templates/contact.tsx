import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {SEO} from 'layouts/SEO/SEO';
import {Box, Grid, Title, useMantineTheme} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import type {ISection} from 'types/section';
import {handleSpacing} from 'utils/handleSpacing';
import PageContext from 'contexts/PageContext';
import {Script, graphql} from 'gatsby';

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
		slug: 'https://phil.us' + location.pathname,
	};

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
			<meta property='og:url' content={config.slug} />
			<Script
				defer
				strategy='idle'
				charSet='utf-8'
				type='text/javascript'
				src='//js.hsforms.net/forms/embed/v2.js'
			></Script>
			{contentfulPage.noindex && <meta name='robots' content='noindex' />}
		</SEO>
	);
};

type ContactTemplateProps = {
	data: {
		contentfulPage: ContentfulPage;
	};
};

const ContactTemplate: React.FC<ContactTemplateProps> = ({data: {contentfulPage}}) => {
	const {sections, title} = contentfulPage;

	let basicSectionCount = 0;

	return (
		<PageContext.Provider value={{title}}>
			<Layout>
				{sections
					.filter(section => !section.isHidden)
					.map(section => (
						<Section
							key={section.id + 'mapSectionComponent'}
							section={section}
							index={section.sectionType === 'Basic Section' ? basicSectionCount++ : basicSectionCount}
							isEmbedFormTemplate={false}
						/>
					))}
			</Layout>
		</PageContext.Provider>
	);
};

export const query = graphql`
	query getPage($id: String!) {
		contentfulPage(id: {eq: $id}) {
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
							... on ContentfulButton {
								id
								__typename
								buttonText
								buttonStyle
								v2flag
								link {
									linkLabel
									name
									externalUrl
								}
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
						... on ContentfulResource {
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
`;

export default React.memo(ContactTemplate);
