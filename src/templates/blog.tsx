import React, {useRef} from 'react';
import {Grid, Title, Text, createStyles, Container, Box, Anchor, List, AspectRatio} from '@mantine/core';
import {Layout} from 'layouts/Layout/Layout';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {TResource} from 'types/resource';
import {SEO} from 'layouts/SEO/SEO';
import Asset from 'components/common/Asset/Asset';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import type {TAsset} from 'types/asset';
import {graphql} from 'gatsby';
import {Banner, renderBanners} from 'components/common/Banner/Banner';
import Expanded from 'components/common/Expanded/Expanded';
import AuthorBlock from 'components/Blog/AuthorBlock/AuthorBlock';
import SocialShare from 'components/Blog/SocialShare/SocialShare';
import {getDescriptionFromRichtext} from 'utils/getDescription';
import {isPDFContent, isVideoContent} from 'utils/isVideoContent';
import {type Block} from '@contentful/rich-text-types';
import {getWindowProperty} from 'utils/getWindowProperty';
import slugify from 'slugify';
import ReactPlayer from 'react-player/youtube';

type HelmetProps = {
	pageContext: TResource;
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({pageContext, location}) => {
	const heroImage = pageContext.asset?.file.url;
	const description = pageContext.metaDescription?.length
		? pageContext.metaDescription
		: pageContext.body?.raw
			? getDescriptionFromRichtext(pageContext.body.raw)
			: '';

	const slug = pageContext.slug ?? `/${slugify(pageContext.heading, {strict: true, lower: true})}`;

	return (
		<SEO title={pageContext.heading}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={pageContext.heading} />
			<meta name='twitter:description' content={description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={description} />
			<meta property='og:title' content={pageContext.heading} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta property='og:url' content={`https://phil.us${slug}/`} />
			<script charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></script>
			{pageContext.noindex && <meta name='robots' content='noindex' />}
		</SEO>
	);
};

type PageTemplateProps = {
	pageContext: TResource;
	data: any;
};

const useStyles = createStyles(theme => ({
	body: {
		p: {
			marginTop: 0,
		},
	},
	anchor: {
		color: '#00827E',
	},

	inner: {
		padding: '0 100px',

		'&::after': {
			content: '""',
			clear: 'both',
			display: 'table',
		},

		[theme.fn.smallerThan('sm')]: {
			padding: '0 16px',
		},
	},

	listItem: {
		overflow: 'hidden',
		fontSize: 24,

		'::marker': {
			fontSize: 16,
			fontWeight: 700,
		},
	},

	floatingImage: {
		float: 'right',
		padding: '30px 40px',

		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			float: 'none',
			display: 'flex',
			placeContent: 'center',
		},
	},

	embededAsset: {
		marginBottom: '32px',
	},

	border: {
		border: '2px solid black',
		padding: 10,
	},

	table: {
		borderCollapse: 'collapse',
		borderSpacing: 0,
	},

	tableHeader: {
		textAlign: 'start',
	},
}));

const BlogTemplate: React.FC<PageTemplateProps> = ({pageContext, data}) => {
	const {heading, body, asset, banners, author, noindex, isFaq} = pageContext;

	const {classes, cx} = useStyles();

	const [isMounted, setIsMounted] = React.useState(false);
	const [origin, setOrigin] = React.useState('https://phil.us');

	React.useEffect(() => {
		setIsMounted(true);

		const origin = getWindowProperty('location.origin', 'https://www.phil.us');
		setOrigin(origin);
	}, []);

	// Map for future reference to match content
	const richTextImages: Record<string, {image: any; alt: string}> = {};
	const youtubeEmbeds = new Map<string, {title: string; url: string}>();

	if (body && Boolean(body.references)) {
		// Rich text image map
		body.references
			.filter(reference => reference?.sys?.contentType?.sys?.id !== 'youtubeEmbedResource')
			.map((reference: any) => {
				richTextImages[reference.contentful_id] = {
					image: reference.gatsbyImageData as unknown,
					alt: reference.title as string,
				};

				return true;
			});

		// Youtube embed map
		body.references
			.filter(reference => reference?.sys?.contentType?.sys?.id === 'youtubeEmbedResource')
			.map((reference: any) => {
				youtubeEmbeds[reference.contentful_id] = {
					title: reference?.title as string,
					url: reference?.youtubeVideoUrl as string,
				};

				return true;
			});
	}

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ENTRY](node, children) {
				const content: {title: string; url: string} = youtubeEmbeds[node?.data?.target?.contentful_id] as {
					title: string;
					url: string;
				};

				if (isMounted && content && ReactPlayer.canPlay(content.url)) {
					return (
						<AspectRatio ratio={16 / 9}>
							<ReactPlayer
								width={'100%'}
								height={'100%'}
								url={content.url}
								controls
								config={{
									playerVars: {
										rel: 0,
										enablejsapi: 1,
										origin,
										widget_referrer: origin,
									},
								}}
							/>
						</AspectRatio>
					);
				}

				return null; // Return null during SSR
			},

			[BLOCKS.PARAGRAPH](node, children) {
				return (
					<Text component='p' mt={0} size={18}>
						{children}
					</Text>
				);
			},

			[BLOCKS.OL_LIST](node, children) {
				return (
					<List type='ordered' mt={16} mb={32}>
						{children}
					</List>
				);
			},

			[BLOCKS.UL_LIST](node, children) {
				return (
					<List type='unordered' listStyleType='disc' pl={16} mt={16} mb={44}>
						{children}
					</List>
				);
			},

			[BLOCKS.LIST_ITEM](node, children) {
				return (
					<List.Item mt={8} mb={0} pr={20} className={classes.listItem}>
						{children}
					</List.Item>
				);
			},

			[INLINES.HYPERLINK](node, children) {
				const {uri} = node.data as {uri: string};
				return (
					<Anchor href={uri} target='_blank' className={classes.anchor}>
						{children}
					</Anchor>
				);
			},
			[BLOCKS.HEADING_1](node, children) {
				return (
					<Title order={1} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_2](node, children) {
				return (
					<Title order={2} size={24} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_3](node, children) {
				return (
					<Title order={3} size={18} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_4](node, children) {
				return (
					<Title order={4} size={18} style={{fontFamily: 'Lato, sans-serif'}} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_5](node, children) {
				return (
					<Title order={5} size={18} style={{fontWeight: 400, fontFamily: 'Lato, sans-serif'}} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_6](node, children) {
				return (
					<Title order={6} size={18} style={{fontFamily: 'Lato, sans-serif'}} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.TABLE](node: Block, children: React.ReactElement[]) {
				if (children.length === 1) {
					// Only one row
					return (
						<table className={classes.table}>
							<tbody>{children}</tbody>
						</table>
					);
				}

				if (children.length === 2) {
					// Two rows
					const [first, second] = children;
					return (
						<table className={classes.table}>
							<tbody>
								{first}
								{second}
							</tbody>
						</table>
					);
				}

				if (children.length >= 3) {
					// Three or more rows
					const [first, ...rest] = children;
					const last = rest.pop();
					return (
						<table className={classes.table}>
							<thead>{first}</thead>
							<tbody>{rest}</tbody>
							<tfoot>{last}</tfoot>
						</table>
					);
				}

				return null; // Return null if no rows present
			},

			[BLOCKS.TABLE_ROW](node, children) {
				return <tr>{children}</tr>;
			},

			[BLOCKS.TABLE_CELL](node: Block, children) {
				return <td className={classes.border}>{children}</td>;
			},

			[BLOCKS.TABLE_HEADER_CELL](node: Block, children) {
				return <th className={cx(classes.tableHeader, classes.border)}>{children}</th>;
			},
		},
	};

	const defaultBanners = data.allContentfulResource.nodes as TResource[];
	const hasBanners = Boolean(banners);
	const hideBanners = noindex ?? isFaq;

	const bannersToDisplay = hasBanners ? banners! : (defaultBanners.map(r => r.banners).flat(1) as TResource[]);

	return (
		<Layout>
			<Container size='xl' className={classes.inner}>
				<Grid gutter='xl' align='center' pb={52} pt={0}>
					<Grid.Col lg={12} md={12} sm={12}>
						<Title order={1} mb={36}>
							{heading}
						</Title>
						{Boolean(asset) && (
							<Container className={classes.floatingImage} size='sm'>
								<Asset asset={asset!} />
							</Container>
						)}
						<Text mb={42}>{body && renderRichText(body, options)}</Text>

						{!noindex && <SocialShare />}

						{Boolean(author) && <AuthorBlock author={author!} />}
					</Grid.Col>
				</Grid>
			</Container>

			{/* Bottom Banners */}
			{!hideBanners && renderBanners(bannersToDisplay)}
		</Layout>
	);
};

// Query Dummy Resource to get default banner
export const query = graphql`
	query dummyResource {
		allContentfulResource(filter: {node_locale: {eq: "en-US"}, heading: {eq: "Dummy Resource"}}) {
			nodes {
				id
				heading
				banners {
					id
					body {
						raw
					}
					buttonText
					hubspotEmbed {
						raw
					}
					isHubspotEmbed
					externalLink
					heading
				}
			}
		}
	}
`;

export default React.memo(BlogTemplate);
