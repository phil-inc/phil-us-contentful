import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import {SEO} from 'layouts/SEO/SEO';
import {
	ActionIcon,
	Badge,
	Box,
	Divider,
	Grid,
	Image,
	Pagination,
	Text,
	Title,
	createStyles,
	useMantineTheme,
} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import {type IReferencedSection, type ISection, ReferenceTypeEnum, ResourceBlocksEnum} from 'types/section';
import {graphql, navigate} from 'gatsby';
import {Banner} from 'components/common/Banner/Banner';
import {useViewportSize} from '@mantine/hooks';
import {type TResource} from 'types/resource';
import * as JsSearch from 'js-search';
import {ResourceCard} from 'components/common/Resources/ResourceCard';
import {POSTS_PER_SECTION} from 'constants/section';
import {pagination} from 'utils/pagination';
import Filter from 'components/common/Filter/Filter';
import {crossIcon} from 'assets/images';
import {generateSearchParams} from 'utils/search';
import LoadingIndicator from 'components/common/LoadingIndicator/LoadingIndicator';
import {RESOURCES_PAGE} from 'constants/routes';

export const searchSubmitCallback = (searchText: string, filterOptions: string[]) => {
	if (!searchText.length) {
		return;
	}

	const path = generateSearchParams(filterOptions, searchText);

	void navigate('/resources/search/' + path);
};

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

const useStyles = createStyles(theme => ({
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

	paginationItem: {
		height: 40,
		width: 40,

		'&[data-active]': {
			background: '#0A0A0A',
		},
	},

	heading1: {
		fontSize: 48,

		[theme.fn.smallerThan('md')]: {
			fontSize: 32,
		},
	},

	searchTermDisplay: {
		fontFamily: 'Lato, sans-serif',
		fontSize: 18,
		color: '#0A0A0A',
		lineHeight: '27px',
	},

	badgeRoot: {
		borderColor: '#D7DCDC',
		padding: 0,
		height: 26,
	},

	badgeInner: {
		color: '#525252',
		fontSize: 14,
		fontWeight: 400,
		padding: '0.625rem 0.5rem',
		paddingRight: 4,
		textTransform: 'none',
	},

	badgeRightSection: {
		marginLeft: 0,
		paddingRight: 10,
	},

	clearAll: {
		color: '#00827E',
		fontSize: 14,
		cursor: 'pointer',
	},

	divider: {
		marginTop: 22,
		marginBottom: 47,

		[theme.fn.smallerThan('md')]: {
			margin: '40px auto',
		},
	},

	emptyStateContainer: {
		marginBottom: 175,

		[theme.fn.smallerThan('md')]: {
			marginBottom: 42,
		},
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

type SearchBodyType = {
	searchResults: TResource[];
	sections: IReferencedSection[];
	searchQueryParam: string;
	filterQueryParam: string[];
};

const EmptySearchState: React.FC<{searchQueryParam: string}> = ({searchQueryParam}) => {
	const {classes} = useStyles();

	return (
		<Box className={classes.emptyStateContainer}>
			<Text size={18} color='#0A0A0A'>
				0 items found for "{searchQueryParam}"
			</Text>
			<Divider mt={22} mb={47} />
			<Title color='#0A0A0A' order={2} size={28} mb={8}>
				Search No Result
			</Title>
			<Text size={18} color='#0A0A0A'>
				We're sorry. We cannot find any matches for your search term.
			</Text>
		</Box>
	);
};

const SearchBody: React.FC<SearchBodyType> = ({searchResults, sections, searchQueryParam, filterQueryParam}) => {
	const {classes} = useStyles();
	const [paginationState, setPaginationState] = React.useState<PaginationState>({});
	const availableSectionHeaders = sections.map(section => section.header);
	const badgeRef = React.useRef(null);

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

	const badges = filterQueryParam.filter(element => availableSectionHeaders.includes(element));

	const RemoveButton: React.FC<{badge: string}> = ({badge}) => (
		<ActionIcon
			onClick={() => {
				const badges = filterQueryParam.filter(element => availableSectionHeaders.includes(element));

				const path = generateSearchParams(
					badges.filter(b => b !== badge),
					searchQueryParam,
				);

				void navigate('/resources/search/' + path);
			}}
			size={10}
			radius='xl'
			variant='transparent'
		>
			<Image src={crossIcon as string} width={9} />
		</ActionIcon>
	);

	return searchResults.length ? (
		<>
			<Box mb={badgeRef.current ? 36 : 26}>
				<Text mb={4} className={classes.searchTermDisplay}>
					Showing results for "{searchQueryParam}"
				</Text>

				{Boolean(badges.length) && (
					<Grid ref={badgeRef} gutter={12}>
						<Grid.Col md={'content'}>
							<Text size={14}>Filtered By:</Text>
						</Grid.Col>

						<Grid.Col md={'content'}>
							{badges.map((badge, index, original) => (
								<Badge
									key={badge + index.toString()}
									mr={index + 1 >= original.length ? 0 : 12}
									classNames={{
										inner: classes.badgeInner,
										root: classes.badgeRoot,
										rightSection: classes.badgeRightSection,
									}}
									variant='outline'
									rightSection={<RemoveButton badge={badge} />}
								>
									{badge}
								</Badge>
							))}
						</Grid.Col>

						<Grid.Col md={'content'}>
							<Text
								className={classes.clearAll}
								onClick={() => {
									const path = generateSearchParams([], searchQueryParam);

									void navigate('/resources/search/' + path);
								}}
							>
								Clear All
							</Text>
						</Grid.Col>
					</Grid>
				)}
			</Box>

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
						<Box id={section.id} key={section.id + index.toString()} className={classes.cardContainer}>
							{/* Section Header */}
							<Box mb={28}>
								<Title order={2} m={0} size={32}>
									{section.header}
								</Title>
							</Box>

							{/* Resource Cards */}
							{(section as unknown as IReferencedSection)?.references
								.filter((_, index) => {
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

										if (document) {
											const element = document.getElementById(section.id);
											if (element) {
												element.scrollIntoView({behavior: 'smooth'});
											}
										}
									}}
								/>
							)}
						</Box>
					))}
		</>
	) : (
		<EmptySearchState searchQueryParam={searchQueryParam} />
	);
};

const ResourcesSearch: React.FC<ResourcesSearchProps> = ({location, data}) => {
	const {width} = useViewportSize();
	const theme = useMantineTheme();
	const isMobileView = theme.breakpoints.md > width;
	const {classes} = useStyles();

	const {sections} = data.contentfulPage;
	const resources = sections.map(section => (section as IReferencedSection).references).flat();

	const params = new URLSearchParams(location.search);
	const searchQueryParam = params.get('q') ?? '';
	const filterQueryParam = params.getAll('filter') ?? [];

	const [{search, searchResults, isLoading, searchQuery}, setState] = React.useState({
		search: new JsSearch.Search('id'),
		searchResults: [] as TResource[],
		isLoading: false,
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
		.filter(section => Object.keys(ResourceBlocksEnum).includes(section.header))
		.filter(section => section.references.length);

	const availableSectionHeaders = filteredSection.map(section => section.header);

	// Create search index
	React.useEffect(() => {
		if (!searchQueryParam.length) {
			void navigate(RESOURCES_PAGE);
			return;
		}

		search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

		search.sanitizer = new JsSearch.LowerCaseSanitizer();

		search.addIndex('heading');

		search.addDocuments(resources);
	}, []);

	// Check for new search
	React.useEffect(() => {
		setState(p => ({...p, isLoading: true}));

		const results = search.search(searchQuery) as TResource[];

		setState(p => ({...p, searchResults: results, searchQuery: searchQueryParam ?? '', isLoading: false}));
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
						{isLoading ? (
							<LoadingIndicator size={'lg'} />
						) : (
							<SearchBody
								searchQueryParam={searchQueryParam}
								searchResults={searchResults}
								filterQueryParam={filterQueryParam}
								sections={filteredSection}
							/>
						)}
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

export const resourcesQuery = graphql`
	query resourceSearchPage {
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
	}
`;

export default ResourcesSearch;
