import React from 'react';
import {Grid, Title, Text, createStyles, Container, Box, Anchor, List, AspectRatio} from '@mantine/core';
import {Layout} from 'layouts/Layout/Layout';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {TResource} from 'types/resource';
import {SEO} from 'layouts/SEO/SEO';
import Asset, {YouTubeEmbed} from 'components/common/Asset/Asset';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import type {TAsset} from 'types/asset';
import {Script, graphql} from 'gatsby';
import {renderBanners} from 'components/common/Banner/Banner';
import AuthorBlock from 'components/Blog/AuthorBlock/AuthorBlock';
import SocialShare from 'components/Blog/SocialShare/SocialShare';
import {getDescriptionFromRichtext} from 'utils/getDescription';
import {isPDFContent, isVideoContent} from 'utils/isVideoContent';
import {type Block} from '@contentful/rich-text-types';
import {getWindowProperty} from 'utils/getWindowProperty';
import slugify from 'slugify';
import ImageContainer from 'components/common/Container/ImageContainer';
import {getYouTubeId} from 'utils/links';

type HelmetProps = {
	data: {
		contentfulResource: TResource;
	};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({data: {contentfulResource}, location}) => {
	const heroImage = contentfulResource.asset?.file.url;
	const description = contentfulResource.metaDescription?.length
		? contentfulResource.metaDescription
		: contentfulResource.body?.raw
			? getDescriptionFromRichtext(contentfulResource.body.raw)
			: '';

	const config = {
		slug: 'https://phil.us' + location.pathname,
	};

	return (
		<SEO title={contentfulResource.heading}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={contentfulResource.heading} />
			<meta name='twitter:description' content={description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={description} />
			<meta property='og:title' content={contentfulResource.heading} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta property='og:url' content={config.slug} />
			<Script
				defer
				async
				strategy='idle'
				charSet='utf-8'
				type='text/javascript'
				src='//js.hsforms.net/forms/embed/v2.js'
			></Script>
			{contentfulResource.noindex && <meta name='robots' content='noindex' />}
		</SEO>
	);
};

type PageTemplateProps = {
	data: {
		contentfulResource: TResource;
		allContentfulResource: {
			nodes: TResource[];
		};
	};
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

		display: 'flex',
		justifyContent: 'start',
	},

	embededAssetPDF: {
		marginBottom: '32px',
	},

	embededAssetWrapper: {
		maxWidth: 420,
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

const BlogTemplate: React.FC<PageTemplateProps> = ({data}) => {
	const {heading, body, asset, banners, author, noindex, isFaq} = data.contentfulResource;

	const {classes, cx} = useStyles();

	const canvasRef = React.useRef(null);
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

				if (isMounted && content?.url?.length) {
					const vid = getYouTubeId(content.url);
					if (vid) {
						return <YouTubeEmbed videoId={vid} title={content.title} />;
					}
				}

				return null; // Return null during SSR
			},
			[BLOCKS.EMBEDDED_ASSET](node) {
				return (
					<Box
						className={
							isPDFContent(node.data.target.file.contentType as string)
								? classes.embededAssetPDF
								: classes.embededAsset
						}
					>
						{isPDFContent(node.data.target.file.contentType as string) ? (
							<Asset ref={canvasRef} asset={node.data.target as TAsset} />
						) : node?.data?.target?.file?.contentType
						  && isVideoContent(node.data.target.file.contentType as string) ? (
								<ImageContainer fluid ratio={16 / 9}>
									<Asset ref={canvasRef} asset={node.data.target as TAsset} />
								</ImageContainer>
							) : (
								<Box className={classes.embededAssetWrapper}>
									<Asset ref={canvasRef} asset={node.data.target as TAsset} />
								</Box>
							)}
					</Box>
				);
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
					<List type='unordered' listStyleType='disc' pl={32} mt={16} mb={44}>
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

	const defaultBanners = data.allContentfulResource.nodes;
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
	query staticPageQuery($id: String!) {
		# Default banners
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

		# Blog content
		contentfulResource(id: {eq: $id}) {
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
			slug
			noindex
			isFaq
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
			buttonText
			heading
			id
			subheading
			description {
				id
				description
			}
			metaDescription
			externalLink
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
			body {
				raw
				references {
					... on ContentfulAsset {
						contentful_id
						__typename
						description
						gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
						file {
							contentType
							details {
								size
							}
							url
						}
						sys {
							type
						}
					}
					... on ContentfulYoutubeEmbedResource {
						id
						contentful_id
						__typename
						youtubeVideoUrl
						title
						sys {
							contentType {
								sys {
									id
									type
								}
							}
							type
						}
						internal {
							type
						}
					}
				}
			}
			sys {
				contentType {
					sys {
						id
						type
					}
				}
			}
			generateStaticPage
			relatesTo {
				... on ContentfulReferencedSection {
					id
					header
					page {
						id
						title
					}
				}
				... on ContentfulSection {
					id
					header
					page {
						id
						title
					}
				}
			}
		}
	}
`;

export default React.memo(BlogTemplate);
