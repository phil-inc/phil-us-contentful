import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import {SEO} from 'layouts/SEO/SEO';
import {
	Accordion,
	Anchor,
	Box,
	Button,
	Card,
	Divider,
	Grid,
	NavLink,
	Pagination,
	Text,
	Title,
	createStyles,
	useMantineTheme,
} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import {type IReferencedSection, type ISection, ReferenceTypeEnum} from 'types/section';
import {Link, Script, graphql, navigate} from 'gatsby';
import {ResourceCard} from 'components/common/Resources/ResourceCard';
import slugify from 'slugify';
import {Banner} from 'components/common/Banner/Banner';
import {useToggle, useViewportSize} from '@mantine/hooks';
import {RESOURCES_PAGE} from 'constants/routes';
import SearchBox from 'components/common/SearchBox/SearchBox';
import {searchSubmitCallback} from 'pages/resources/search';

type HelmetProps = {
	data: {
		contentfulPage: ContentfulPage;
		contentfulReferencedSection: IReferencedSection;
	};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({data: {contentfulPage, contentfulReferencedSection}, location}) => {
	const heroSection = contentfulPage.sections.find(section => section.sectionType === 'Basic Section') as ISection;
	const heroImage = heroSection?.asset.file.url;

	const computeTitle = () => {
		const referencedSectionTitle = contentfulReferencedSection.title;
		const pageTitle = contentfulPage?.displayTitle?.length ? contentfulPage.displayTitle : contentfulPage.title;

		return referencedSectionTitle.trim().length ? referencedSectionTitle : pageTitle;
	};

	const computeMetaDescription = () => {
		const referencedSectionMetaDescription = contentfulReferencedSection.metaDescription;
		const pageMetaDescription = contentfulPage.description;

		return referencedSectionMetaDescription.trim().length ? referencedSectionMetaDescription : pageMetaDescription;
	};

	return (
		<SEO title={computeTitle()}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={computeTitle()} />
			<meta name='twitter:description' content={computeMetaDescription()} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={computeMetaDescription()} />
			<meta property='og:title' content={computeTitle()} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={computeMetaDescription()} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta property='og:url' content={`https://phil.us${location.pathname}}`} />
			<Script
				defer
				strategy='idle'
				charSet='utf-8'
				type='text/javascript'
				src='//js.hsforms.net/forms/embed/v2.js'
			></Script>
			{location.pathname === '/field/' && <meta name='robots' content='noindex' />}
		</SEO>
	);
};

const useStyles = createStyles((theme, _params: {isMobileView: boolean}) => ({
	container: {
		margin: 0,
		padding: '0px 100px',

		[theme.fn.smallerThan('md')]: {
			padding: '42px 100px',
		},

		[theme.fn.smallerThan('sm')]: {
			padding: '42px 16px',
		},
	},

	cardContainer: {
		padding: 70,
		background: '#F4F4F4',

		'> div': {
			marginBottom: 44,
		},

		'> :last-child': {
			marginBottom: 0,
		},

		[theme.fn.smallerThan('md')]: {
			padding: '28px 18px',
		},
	},

	navigationList: {
		background: '#F4F4F4',
		padding: '36px 34px',
	},

	featuredItemsList: {
		background: '#F4F4F4',
		padding: '36px 34px',

		[theme.fn.smallerThan('md')]: {
			display: 'none',
		},
	},

	featuredItemsNavLinksContainer: {
		'> div': {
			padding: '16px 0',

			'&[role|="separator"]': {
				padding: 0,
			},
		},

		'div:first-of-type': {
			paddingTop: 0,
		},

		'> div:last-child': {
			paddingBottom: 0,
		},
	},

	featuredItemsListMobile: {
		background: '#F4F4F4',
		padding: '36px 34px',
		display: 'none',

		[theme.fn.smallerThan('md')]: {
			display: 'block',
		},
	},

	navLabel: {
		fontSize: 16,
		fontWeight: 700,
	},

	featuredItemSectionLabel: {
		fontSize: 12,
		fontWeight: 700,
		color: '#9a9a9a',

		[theme.fn.smallerThan('md')]: {
			fontSize: 16,
		},
	},

	navLinkRoot: {
		backgroundColor: 'transparent',

		':hover': {
			backgroundColor: 'transparent !important',
			color: '#00827E',
		},
	},

	paginationItem: {
		height: 40,
		width: 40,

		'&[data-active]': {
			background: '#0A0A0A',
		},
	},

	textDecorationNone: {
		textDecoration: 'none',
		color: 'white',
	},

	heading1: {
		fontSize: 48,

		[theme.fn.smallerThan('md')]: {
			fontSize: 32,
		},
	},

	sectionNavLinksContainer: {
		'a:first-of-type > button': {
			paddingTop: 0,
		},

		'> a:last-child > button': {
			paddingBottom: 0,
		},
	},

	accordionContent: {
		padding: 0,
	},

	accordionControl: {
		padding: 0,
		borderBottom: '0 !important',
		backgroundColor: 'transparent !important',
		cursor: _params.isMobileView ? 'pointer' : 'default !important',
		marginBottom: 0,

		color: '#0A0A0A !important',

		'&[data-active]': {
			marginBottom: 24,
		},

		':disabled': {
			opacity: 1,
		},
	},

	chevron: {
		svg: {
			height: 24,
			width: 24,
		},
	},

	currentSectionHeader: {
		display: 'none',

		[theme.fn.smallerThan('md')]: {
			display: 'block',
		},
	},

	searchInput: {
		borderRadius: 0,
	},

	faqContainer: {
		padding: '16px 24px',
		background: '#F4F4F4',
		marginBottom: 38,
	},
	faqContainerButton: {
		fontSize: 16,
		fontWeight: 400,
		padding: '8px 20px',
		[theme.fn.smallerThan('sm')]: {fontSize: 10.28, padding: '10px 7px'},
	},
	faqContainerText: {fontSize: 20, [theme.fn.smallerThan('sm')]: {fontSize: 16}},

	breakSection: {
		display: 'none',

		[theme.fn.smallerThan('sm')]: {
			display: 'block',
		},
	},
}));

type ResourcesPageProps = {
	data: {
		contentfulReferencedSection: IReferencedSection;
		contentfulPage: ContentfulPage;
	};
	pageContext: {
		limit: number;
		skip: number;
		numPages: number;
		currentPage: number;
	};
	location: Location;
};

const ResourcesPage: React.FC<ResourcesPageProps> = ({
	data,
	pageContext: {currentPage: currentPageNumber, limit, numPages},
}) => {
	const {width} = useViewportSize();
	const theme = useMantineTheme();
	const isMobileView = theme.breakpoints.md > width;
	const {classes} = useStyles({isMobileView});

	const currentSection = data.contentfulReferencedSection;
	const resources = currentSection?.references || [];

	const startIndex = (currentPageNumber - 1) * limit;
	const endIndex = Math.min(startIndex + limit, resources.length);

	const banners = data?.contentfulPage?.sections?.filter(section => {
		if (section?.sectionType === 'Referenced Section') {
			if ((section as IReferencedSection).referenceType === ReferenceTypeEnum.Banner) {
				return true;
			}
		}

		return false;
	}) as IReferencedSection[];

	const [value, toggle] = useToggle(['ResourcesType', null]);

	React.useEffect(() => {
		if (!isMobileView) {
			toggle('ResourcesType');
		}
	}, [isMobileView]);

	return (
		<Layout>
			<Expanded id={currentSection.id} py={0}>
				{/* PAGE HEADER */}
				<Box>
					<Grid align='center'>
						<Grid.Col sm={12} md={12} lg={9.76}>
							<Title className={classes.heading1} order={1}>
								Resources/
								<br className={classes.breakSection} />
								{currentSection.header}
							</Title>
						</Grid.Col>

						<Grid.Col sm={12} md={12} lg={2.24}>
							<SearchBox
								value=''
								onSubmitCallback={vs => {
									searchSubmitCallback(vs.searchText, []);
								}}
								placeholder='Search...'
							/>
						</Grid.Col>
					</Grid>
				</Box>

				<Grid mt={36} mb={20}>
					<Grid.Col py={isMobileView ? 0 : undefined} sm={12} lg={3}>
						{/* RESOURCE TYPE NAV LINKS */}
						<Card className={classes.navigationList} mb={isMobileView ? 20 : 36}>
							<Accordion
								value={value}
								chevronSize={isMobileView ? 24 : 0}
								classNames={{
									content: classes.accordionContent,
									control: classes.accordionControl,
									chevron: classes.chevron,
								}}
							>
								<Accordion.Item value='ResourcesType'>
									<Accordion.Control
										disabled={!isMobileView}
										onClick={() => {
											toggle();
										}}
									>
										<Title size={24} order={4}>
											Resources Type
										</Title>
									</Accordion.Control>
									<Accordion.Panel>
										<Box className={classes.sectionNavLinksContainer}>
											{data.contentfulPage.sections
												.filter(section => !section.isHidden && Boolean(section.header))
												.map((section, index, array) => {
													const path
														= RESOURCES_PAGE + slugify(section.header, {lower: true, strict: true});

													return (
														<React.Fragment key={path}>
															<Link to={path} className={classes.textDecorationNone}>
																<NavLink
																	active={currentSection.id === section.id}
																	color='#00827E'
																	py={12}
																	variant='subtle'
																	classNames={{label: classes.navLabel, root: classes.navLinkRoot}}
																	pl={0}
																	key={section.id}
																	label={section.header}
																/>
															</Link>
															{index !== array.length - 1 && <Divider my={0} />}
														</React.Fragment>
													);
												})}
										</Box>
									</Accordion.Panel>
								</Accordion.Item>
							</Accordion>
						</Card>

						{/* FEATURED ITEMS NAV LINKS */}
						{currentSection?.featuredItems?.length && (
							<Card className={classes.featuredItemsList}>
								<Title size={24} order={4} mb={24}>
									Featured Items
								</Title>
								<Box className={classes.featuredItemsNavLinksContainer}>
									{data.contentfulReferencedSection.featuredItems
										.filter(resource => resource.generateStaticPage)
										.map((resource, index, array) => {
											const path = '/' + slugify(resource.heading, {lower: true, strict: true});

											const sectionLabelText = (
												<Text className={classes.featuredItemSectionLabel}>{currentSection.header}</Text>
											);

											const navLink = (
												<NavLink
													classNames={{label: classes.navLabel, root: classes.navLinkRoot}}
													p={0}
													pl={0}
													key={resource.id}
													label={resource.heading}
												/>
											);

											return (
												<React.Fragment key={path + index.toString() + index.toString()}>
													<Box pt={index === 0 ? 0 : 16} pb={index === 0 ? 16 : 0}>
														{resource?.internalLink && (
															<>
																{sectionLabelText}
																<Link to={path} className={classes.textDecorationNone}>
																	{navLink}
																</Link>
															</>
														)}

														{resource?.externalLink && (
															<>
																{sectionLabelText}
																<Anchor
																	href={resource.externalLink}
																	target='_blank'
																	className={classes.textDecorationNone}
																>
																	{navLink}
																</Anchor>
															</>
														)}
													</Box>
													{index !== array.length - 1 && <Divider my={0} />}
												</React.Fragment>
											);
										})}
								</Box>
							</Card>
						)}
					</Grid.Col>
					<Grid.Col py={isMobileView ? 0 : undefined} sm={12} lg={9}>
						{/* RESOURCES MAP */}
						{currentSection.referenceType === 'FAQs' && (
							<Box className={classes.faqContainer}>
								<Grid gutter={isMobileView ? 10 : 28} align='center'>
									<Grid.Col sm={12} md={'content'}>
										<Title order={4} className={classes.faqContainerText}>
											For Patient FAQs
										</Title>
									</Grid.Col>
									<Grid.Col sm={12} md={'content'}>
										<Anchor target='_blank' href='https://philhelp.zendesk.com/hc/en-us'>
											<Button className={classes.faqContainerButton}>View the entire FAQ</Button>
										</Anchor>
									</Grid.Col>
								</Grid>
							</Box>
						)}

						<Box className={classes.cardContainer}>
							<Box className={classes.currentSectionHeader} mb={28}>
								<Title order={2} m={0} size={32}>
									{currentSection.header}
								</Title>
							</Box>

							{resources?.length
								&& resources
									.slice(startIndex, endIndex)
									.map((resource, index) => (
										<ResourceCard
											key={resource.id + index.toString()}
											resource={resource}
											isFaq={currentSection.referenceType === ReferenceTypeEnum.FAQs}
										/>
									))}
						</Box>

						{/* PAGINATION CONTROLS */}
						{numPages > 1 && (
							<Pagination
								position='center'
								mt={44}
								classNames={{item: classes.paginationItem}}
								radius={0}
								color='#0A0A0A'
								total={numPages}
								page={currentPageNumber}
								withControls={false}
								onChange={async pageNumber => {
									const path
										= RESOURCES_PAGE + slugify(currentSection.header, {lower: true, strict: true}) + '/';

									if (pageNumber === 1) {
										void navigate(path);
										return;
									}

									void navigate(path + `${pageNumber}`);
								}}
							/>
						)}
					</Grid.Col>
				</Grid>

				{currentSection?.featuredItems?.length && (
					<Card className={classes.featuredItemsListMobile}>
						<Title size={24} order={4} mb={24}>
							Featured Items
						</Title>
						<Box className={classes.featuredItemsNavLinksContainer}>
							{data.contentfulReferencedSection.featuredItems
								.filter(resource => resource.generateStaticPage)
								.map((resource, index, array) => {
									const path = '/' + slugify(resource.heading, {lower: true, strict: true});

									const sectionLabelText = (
										<Text className={classes.featuredItemSectionLabel}>{currentSection.header}</Text>
									);

									const navLink = (
										<NavLink
											classNames={{label: classes.navLabel, root: classes.navLinkRoot}}
											p={0}
											pl={0}
											key={resource.id}
											label={resource.heading}
										/>
									);

									return (
										<React.Fragment key={resource.id + path}>
											<Box key={path + index.toString()} pt={index === 0 ? 0 : 16} pb={index === 0 ? 16 : 0}>
												{resource?.internalLink && (
													<>
														{sectionLabelText}
														<Link to={path} className={classes.textDecorationNone}>
															{navLink}
														</Link>
													</>
												)}

												{resource?.externalLink && (
													<>
														{sectionLabelText}
														<Anchor
															href={resource.externalLink}
															target='_blank'
															className={classes.textDecorationNone}
														>
															{navLink}
														</Anchor>
													</>
												)}
											</Box>
											{index !== array.length - 1 && <Divider my={0} />}
										</React.Fragment>
									);
								})}
						</Box>
					</Card>
				)}
			</Expanded>
			<Expanded id='resourcesBannerSection' fullWidth background='#F4F4F4' py={120} px={106}>
				<Grid>
					{banners.map(bannerSection =>
						bannerSection.references.map(resource => (
							<Grid.Col
								key={resource.id + resource.heading}
								sm={12}
								lg={bannerSection.references?.length > 1 ? 6 : 12}
							>
								<Banner key={resource.id} resource={resource} />
							</Grid.Col>
						)),
					)}
				</Grid>
			</Expanded>
		</Layout>
	);
};

export const resourcesQuery = graphql`
	query getReferencedSection($id: String!) {
		contentfulReferencedSection(id: {eq: $id}) {
			id
			title
			metaDescription
			isHidden
			hideNavigationAnchor
			hideHeader
			header
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
			featuredItems {
				id
				heading
				generateStaticPage
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
			}
		}
		contentfulPage(title: {eq: "Resources"}) {
			id
			title
			displayTitle
			sections {
				... on ContentfulReferencedSection {
					id
					isHidden
					hideNavigationAnchor
					hideHeader
					header
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
				... on ContentfulSection {
					id
					header
					isHidden
					sectionType
				}
			}
		}
	}
`;

export default ResourcesPage;
