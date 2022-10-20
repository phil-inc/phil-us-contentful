import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {graphql, Link, Script} from 'gatsby';
import slugify from 'slugify';
import {SEO} from 'layouts/SEO/SEO';
import {useInternalPaths} from 'hooks/useInternalPaths';
import {Box, Grid, Title, Container, TextInput, Button, createStyles, Text, Group, Center} from '@mantine/core';
import {IconSearch} from '@tabler/icons';
import Expanded from 'components/common/Expanded/Expanded';
import ReferencedSection from 'components/section/ReferencedSection';
import CareerBlock from 'components/career/CareerBlock';
import type {TAsset} from 'types/asset';
import {useHubspotForm} from '@aaronhayes/react-use-hubspot-form';
import {parseScript} from 'utils/parseScript';
import {useMediaQuery} from '@mantine/hooks';
import {getLink} from 'utils/getLink';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {IReferencedSection, ISection} from 'types/section';

const useStyles = createStyles(theme => ({
	body: {
		p: {
			marginTop: 0,
		},
	},
	container: {
		padding: '0 100px',
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: '0 16px',
		},
	},

	section: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	largeSection: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	center: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
}));

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

type CareerSectionProps = {
	sections: Array<ISection | IReferencedSection>;
};

const CareerSection: React.FC<CareerSectionProps> = ({sections}) => {
	const {classes} = useStyles();
	let asset: TAsset;

	return (
		<Container id={'Career Section'} fluid className={classes.container}>
			<Grid gutter={60} pb={130}>
				<Grid.Col orderSm={1} lg={6} md={6} sm={12}>
					<Box className={classes.center}>
						<Group align={'center'}>
							<Box>
								<Title order={2}>
									<Text>Careers at Phil</Text>
								</Title>
							</Box>
						</Group>
						{sections
							.filter(section => !section.isHidden)
							.map((section, index) => {
								if (index === 0) {
									// TODO: Fix type later
									// Get hero asset
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
									asset = section.asset;
									return;
								}

								// eslint-disable-next-line no-warning-comments
								// TODO: Fix type later
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								return <CareerBlock title={section.header} listings={section.references} />;
							})}
					</Box>
				</Grid.Col>
				<Grid.Col orderSm={2} lg={6} md={6} sm={12}>
					<ImageContainer fluid>
						<Asset asset={asset} />
					</ImageContainer>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

type CareerTemplateProps = {
	data: {contentfulPage: ContentfulPage};
};

const CareerTemplate: React.FC<CareerTemplateProps> = ({data}) => {
	const {id, sections, title} = data.contentfulPage;
	let asset: TAsset;

	return (
		<Layout>
			<CareerSection sections={sections} />
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
						hubspotEmbed {
							raw
						}
						isHubspotEmbed
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

export default CareerTemplate;
