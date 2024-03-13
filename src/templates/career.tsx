import CareerSection from 'components/career/CareerSection';
import {CAREER_LISTING_URL} from 'constants/api';
import {Layout} from 'layouts/Layout/Layout';
import {SEO} from 'layouts/SEO/SEO';
import React, {useEffect, useState} from 'react';
import type {ContentfulPage} from 'types/page';
import type {ISection} from 'types/section';
import {getTitle} from 'utils/getTitle';
import {getWindowProperty} from 'utils/getWindowProperty';
import {groupBy} from 'utils/groupBy';
import {isProduction} from 'utils/isProduction';
import {Script, graphql} from 'gatsby';

type HelmetProps = {
	pageContext: ContentfulPage;
	data: {contentfulPage: ContentfulPage};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({data: {contentfulPage}, location}) => {
	const heroSection = contentfulPage.sections.find(section => section.sectionType === 'Basic Section') as ISection;
	const heroImage = heroSection?.asset.file.url;
	const domain = getWindowProperty('location.hostname', 'phil.us');

	const config = {
		slug: 'https://phil.us' + location.pathname,
	};

	return (
		<SEO title={getTitle(contentfulPage.title, contentfulPage.displayTitle)}>
			{isProduction && domain !== 'phil.us' && <link rel='canonical' href={config.slug} />}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={getTitle(contentfulPage.title, contentfulPage.displayTitle)} />
			<meta name='twitter:description' content={contentfulPage.description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={contentfulPage.description} />
			<meta property='og:title' content={getTitle(contentfulPage.title, contentfulPage.displayTitle)} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={contentfulPage.description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta property='og:url' content={config.slug} />
			<Script defer async charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></Script>
			{contentfulPage.noindex && <meta name='robots' content='noindex' />}
		</SEO>
	);
};

type CareerTemplateProps = {
	data: {contentfulPage: ContentfulPage};
};

const CareerTemplate: React.FC<CareerTemplateProps> = ({data: {contentfulPage}}) => {
	const {sections} = contentfulPage;
	const heroSection = sections.find(
		section => !section.isHidden && section.sectionType === 'Basic Section',
	) as ISection;
	const heroAsset = heroSection.asset;

	const [careers, setCareers] = useState({});
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const listingURL = process.env.GATSBY_CAREER_LISTING_URI ?? CAREER_LISTING_URL;

	useEffect(() => {
		(async () => {
			try {
				const rawResponse = await fetch(listingURL);
				if (rawResponse.status === 200) {
					const content = (await rawResponse.json()) as Array<Record<string, string>>;

					const sortedJobs = groupBy(content, 'department');

					setCareers(sortedJobs);
				}
			} catch (error: unknown) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<Layout>
			<CareerSection heroAsset={heroAsset} careers={careers} isLoading={isLoading} />
		</Layout>
	);
};

export const query = graphql`
	query getPages($id: String!) {
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

export default React.memo(CareerTemplate);
