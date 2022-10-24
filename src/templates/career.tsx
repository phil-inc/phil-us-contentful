import { Box, Container, createStyles, Divider, Grid, Group, Text, Title } from '@mantine/core';
import CareerArticle from 'components/career/CareerArticle';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import { graphql } from 'gatsby';
import { Layout } from 'layouts/Layout/Layout';
import { SEO } from 'layouts/SEO/SEO';
import React, { useEffect, useState } from 'react';
import type { TAsset } from 'types/asset';
import type { ContentfulPage } from 'types/page';

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
		<meta name="description" content={data.contentfulPage.description} />
		<title>Contact</title>
		<script charSet="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
	</SEO>
);

const CareerSection = ({sections, careers}) => {
	console.log('sections', careers);
	const {classes} = useStyles();
	let asset: TAsset;

	return (
		<Container id={'Career Section'} fluid className={classes.container}>
			<Grid gutter={60} pb={130} align="flex-start">
				<Grid.Col orderSm={1} lg={6} md={6} sm={12}>
					<Box className={classes.center}>
						<>
							<Group align={'center'}>
								<Box>
									<Title order={2}>
										<Text>Careers at Phil</Text>
									</Title>
								</Box>
							</Group>
							{Object.keys(careers).map(function (job) {
								return (
									<>
										<Title order={3}>
											<Text>{job}</Text>
										</Title>
										<Divider variant="dashed" size={2} my={10} mb={32} />
										{careers[job].map(listing => (
											<Box mb={50}>
												<CareerArticle
													title={listing.title}
													url={listing.url}
													location={listing.location.location_str}
												/>
											</Box>
										))}
									</>
								);
							})}
						</>
					</Box>
				</Grid.Col>
				<Grid.Col orderSm={2} lg={6} md={6} sm={12} span="content" >
					<ImageContainer fluid>
						{sections
							.filter(section => !section.isHidden)
							.map((section, index) => {
								if (index === 0) {
									// TODO: Fix type later
									// Get hero asset
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
									asset = section.asset;
									return <Asset asset={asset} />;
								}
							})}
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
	const [careers, setCareers] = useState({});

	useEffect(() => {
		fetchCareers();
	}, []);

	const fetchCareers = () => {
		fetch('https://capi.phil.us/api/web/v1/careers')
			.then(response => response.json())
			.then(data => {
				formatCareerData(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	const formatCareerData = jobListings => {
		var deptWiseJobs = {};
		jobListings.data.jobs.forEach(function (e, i) {
			var key = e.department != '' ? e.department : 'Others';
			if (!(key in deptWiseJobs)) {
				deptWiseJobs[key] = [];
			}
			deptWiseJobs[key].push(e);
		});

		var sortedJobs = Object.fromEntries(Object.entries(deptWiseJobs).sort());
		setCareers(sortedJobs);
	};

	return (
		<Layout>
			<CareerSection sections={sections} careers={careers} />
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
