import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import {SEO} from 'layouts/SEO/SEO';
import {
	Accordion,
	Anchor,
	Box,
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
import {Link, graphql, navigate} from 'gatsby';
import {ResourceCard} from 'components/common/Resources/ResourceCard';
import slugify from 'slugify';
import {Banner} from 'components/common/Banner/Banner';
import {useToggle, useViewportSize} from '@mantine/hooks';
import {HOME, RESOURCES_PAGE} from 'constants/routes';
import SearchBox from 'components/common/SearchBox/SearchBox';
import {searchSubmitCallback} from 'pages/resources/search';

type HelmetProps = {
	data: {
		contentfulPage: ContentfulPage;
		contentfulReferencedSection: IReferencedSection;
	};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({data: {contentfulDownloadableResource}, location}) => {
	console.log(contentfulDownloadableResource);

	const heroImage = contentfulDownloadableResource?.image.file.url;

	const computeTitle = () => {
		const pageTitle = contentfulDownloadableResource.heading;

		return pageTitle.trim();
	};

	const computeMetaDescription = () => {
		const pageMetaDescription = contentfulDownloadableResource.metaDescription;

		return pageMetaDescription.trim();
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

type ResourcesPageProps = {
	location: Location;
};

const DownloadableResource: React.FC<ResourcesPageProps> = props =>
// TODO: Add types for new resource

	 (
		<Layout>
			<Expanded id='resourcesBannerSection' fullWidth background='#F4F4F4' py={120} px={106}>
				<Grid>// TODO: Add component details</Grid>
			</Expanded>
		</Layout>
	);
export const resourcesQuery = graphql`
	query getReferencedSection($id: String!) {
		contentfulDownloadableResource(id: {eq: $id}) {
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
`;

export default DownloadableResource;
