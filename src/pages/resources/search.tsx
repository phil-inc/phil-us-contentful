import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import {SEO} from 'layouts/SEO/SEO';
import {Box, Grid, Pagination, Text, Title, createStyles, useMantineTheme} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import {type IReferencedSection, type ISection, ReferenceTypeEnum} from 'types/section';
import {graphql} from 'gatsby';
import {Banner} from 'components/common/Banner/Banner';
import {useToggle, useViewportSize} from '@mantine/hooks';
import {type TResource} from 'types/resource';
import * as JsSearch from 'js-search';
import {ResourceCard} from 'components/common/Resources/ResourceCard';
import {POSTS_PER_SECTION} from 'constants/section';
import {pagination} from 'utils/pagination';
import Filter from 'components/common/Filter/Filter';

type HelmetProps = {
	data: {
		contentfulPage: ContentfulPage;
	};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({data: {contentfulPage}, location}) => {
	const heroSection = contentfulPage.sections.find(section => section.sectionType === 'Basic Section') as ISection;
	const heroImage = heroSection?.asset.file.url;
	const title = contentfulPage?.displayTitle?.length ? contentfulPage.displayTitle : contentfulPage.title;

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
			<meta property='og:url' content={`https://phil.us${location.pathname}}`} />
			<script charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></script>
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
		marginBottom: 44,

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

	searchTermDisplay: {
		fontFamily: 'Lato, sans-serif',
		fontSize: 18,
		color: '#0A0A0A',
		lineHeight: '27px',
		marginBottom: 26,
	},

	searchInput: {
		borderRadius: 0,
	},
}));

type ResourcesSearchProps = {
	data: {
		allContentfulResource: {nodes: TResource[]};
		contentfulPage: ContentfulPage;
	};
	location: Location;
};

type PaginationState = Record<
string,
{
	numPages: number;
	currentPage: number;
	skip: number;
}
>;

const ResourcesSearch: React.FC<ResourcesSearchProps> = ({location, data}) => {
	const {width} = useViewportSize();
	const theme = useMantineTheme();
	const isMobileView = theme.breakpoints.md > width;
	const {classes} = useStyles({isMobileView});

	const resources = data.allContentfulResource.nodes;
	const {sections} = data.contentfulPage;

	const params = new URLSearchParams(location.search);
	const searchQueryParam = params.get('q');
	const filterQueryParam = params.getAll('filter');

	const [{search, searchResults, isLoading, isError, searchQuery}, setState] = React.useState({
		search: new JsSearch.Search('id'),
		searchResults: [] as TResource[],
		isLoading: false,
		isError: false,
		searchQuery: searchQueryParam ?? '',
	});

	const banners = data.contentfulPage.sections.filter(section => {
		if (section?.sectionType === 'Referenced Section') {
			if ((section as IReferencedSection).referenceType === ReferenceTypeEnum.Banner) {
				return true;
			}
		}

		return false;
	}) as IReferencedSection[];

	const filteredSection = (sections as IReferencedSection[])
		.map(section => ({
			...section,
			references: section.references.filter(ref => searchResults.map(sr => sr.id).includes(ref.id)),
		}))
		.filter(section => section.references.length);

	const availableSectionHeaders = filteredSection.map(section => section.header);

	// Create search index
	React.useEffect(() => {
		search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

		search.sanitizer = new JsSearch.LowerCaseSanitizer();

		search.addIndex('heading');

		search.addDocuments(resources);
	}, []);

	// Check for new search
	React.useEffect(() => {
		const results = search.search(searchQuery) as TResource[];

		setState(p => ({...p, searchResults: results, searchQuery: searchQueryParam ?? ''}));
	}, [searchQueryParam, searchQuery]);

	return (
		<Layout>
			<Expanded id='ResourcesContainer' py={0}>
				{/* PAGE HEADER */}
				<Box>
					<Title className={classes.heading1} order={1}>
						Resources
					</Title>
				</Box>

				<Grid mt={36} mb={20}>
					{/* Filter Column */}
					<Grid.Col py={isMobileView ? 0 : undefined} sm={12} lg={3}>
						<Filter
							values={availableSectionHeaders}
							searchQueryParam={searchQueryParam ?? ''}
							filterQueryParam={filterQueryParam}
						/>
					</Grid.Col>

					{/* Sections Column */}
					<Grid.Col py={isMobileView ? 0 : undefined} sm={12} lg={9}>
						<SearchBody
							searchQueryParam={searchQueryParam!}
							searchResults={searchResults}
							filterQueryParam={filterQueryParam}
							sections={filteredSection}
						/>
					</Grid.Col>
				</Grid>
			</Expanded>
			<Expanded id='resourcesBannerSection' fullWidth background='#F4F4F4' py={120} px={106}>
				<Grid>
					{banners.map(bannerSection =>
						bannerSection.references.map((resource, index) => (
							<Grid.Col
								key={resource.id + index.toString()}
								sm={12}
								lg={bannerSection.references?.length > 1 ? 6 : 12}
							>
								<Banner resource={resource} />
							</Grid.Col>
						)),
					)}
				</Grid>
			</Expanded>
		</Layout>
	);
};

type SearchBodyType = {
	searchResults: TResource[];
	sections: IReferencedSection[];
	searchQueryParam: string;
	filterQueryParam: string[];
};

const SearchBody: React.FC<SearchBodyType> = ({searchResults, sections, searchQueryParam, filterQueryParam}) => {
	const {classes} = useStyles({isMobileView: false});
	const [paginationState, setPaginationState] = React.useState<PaginationState>({});
	const availableSectionHeaders = sections.map(section => section.header);

	// Set pagination state
	React.useEffect(() => {
		(sections as unknown as IReferencedSection[]).forEach(section => {
			const numPages = pagination.numberOfPages(section.references.length, POSTS_PER_SECTION);

			setPaginationState(p => ({
				...p,
				[section.id]: {
					numPages,
					currentPage: 1,
					skip: POSTS_PER_SECTION,
				},
			}));
		});
	}, [sections]);

	console.log({sections, filterQueryParam, availableSectionHeaders, paginationState});

	return (
		<>
			<Text className={classes.searchTermDisplay}>Showing results for "{searchQueryParam}"</Text>
			{/* Section Map */}
			{Boolean(Object.keys(paginationState).length)
				&& sections
					.filter(section => {
						if (filterQueryParam.length) {
							const availableFilter = filterQueryParam.filter(param => availableSectionHeaders.includes(param));

							if (availableFilter.length) {
								return availableFilter.includes(section.header);
							}
						}

						return true;
					})
					.map((section, index) => (
						<Box key={section.id + index.toString()} className={classes.cardContainer}>
							{/* Section Header */}
							<Box mb={28}>
								<Title order={2} m={0} size={32}>
									{section.header}
								</Title>
							</Box>

							{/* Resource Cards */}
							{(section as unknown as IReferencedSection)?.references
								.filter((reference, index) => {
									if (paginationState[section.id]) {
										const {skip} = paginationState[section.id];

										if (index + 1 < skip && index + 1 > skip - POSTS_PER_SECTION) {
											return true;
										}
									}

									return false;
								})
								.map((resource, index) => (
									<ResourceCard key={resource.id + index.toString()} resource={resource} isFaq={false} />
								))}

							{/* PAGINATION CONTROLS */}
							{paginationState[section.id] && (
								<Pagination
									position='center'
									mt={44}
									classNames={{item: classes.paginationItem}}
									radius={0}
									color='#0A0A0A'
									total={paginationState[section.id].numPages}
									page={paginationState[section.id]?.currentPage ?? 1}
									withControls={false}
									onChange={async pageNumber => {
										setPaginationState(p => ({
											...p,
											[section.id]: {
												...p[section.id],
												currentPage: pageNumber,
												skip: pageNumber * POSTS_PER_SECTION,
											},
										}));
									}}
								/>
							)}
						</Box>
					))}
		</>
	);
};

export const resourcesQuery = graphql`
	query resourceSearchPage {
		contentfulPage(
			title: {eq: "Resources"}
			referencedsection: {
				elemMatch: {
					references: {
						elemMatch: {
							heading: {eq: "Modernize the Patient Access Experience. Transform Your Pharmaceutical Brand."}
						}
					}
				}
			}
		) {
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

		allContentfulResource(
			filter: {
				node_locale: {eq: "en-US"}
				heading: {nin: ["Dummy Resource", "Dummy Resource | Referenced section"]}
				generateStaticPage: {eq: true}
				noindex: {ne: true}
			}
		) {
			nodes {
				slug
				heading
				id
				description {
					id
					description
				}
				metaDescription
				subheading
			}
		}
	}
`;

export default ResourcesSearch;
