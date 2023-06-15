import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import {SEO} from 'layouts/SEO/SEO';
import {
	Accordion,
	Anchor,
	Box,
	Card,
	Center,
	Divider,
	Grid,
	Group,
	NavLink,
	Pagination,
	SimpleGrid,
	Text,
	TextInput,
	Title,
	createStyles,
	useMantineTheme,
} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import {type IReferencedSection, type ISection, ReferenceTypeEnum} from 'types/section';
import {Link, graphql, navigate} from 'gatsby';
import {ResourceCard} from 'components/common/Resources/ResourceCard';
import slugify from 'slugify';
import {Banner} from 'components/common/Banner/Banner';
import {useToggle, useViewportSize} from '@mantine/hooks';
import {HOME, RESOURCES} from 'constants/routes';
import SearchBox from 'components/common/SearchBox/SearchBox';
import {type TResource} from 'types/resource';

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
}));

type ResourcesSearchProps = {
	data: {
		allContentfulResource: TResource[];
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

const ResourcesSearch: React.FC<ResourcesSearchProps> = ({
	data,
	pageContext: {currentPage: currentPageNumber, limit, numPages},
}) => {
	const {width} = useViewportSize();
	const theme = useMantineTheme();
	const isMobileView = theme.breakpoints.md > width;
	const {classes} = useStyles({isMobileView});

	// Const currentSection = data.contentfulReferencedSection;
	// console.log({currentSection}, currentSection.header);
	// const resources = currentSection?.references || [];

	// const startIndex = (currentPageNumber - 1) * limit;
	// const endIndex = Math.min(startIndex + limit, resources.length);

	const banners = data.contentfulPage.sections.filter(section => {
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

	const [searchText, setSearchText] = React.useState('');

	const onSearchTextChange = (searchText: string) => {
		setSearchText(searchText);
	};

	console.log({data});

	return (
		<Layout>
			<Expanded id='resourcesBannerSection' fullWidth background='#F4F4F4' py={120} px={106}>
				<Grid>
					{banners.map(bannerSection =>
						bannerSection.references.map(resource => (
							<Grid.Col sm={12} lg={bannerSection.references?.length > 1 ? 6 : 12}>
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
	query resourcesPage {
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
	}
`;

export default ResourcesSearch;
