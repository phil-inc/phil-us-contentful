import React from 'react';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import {Layout} from 'layouts/Layout/Layout';
import {type Block} from '@contentful/rich-text-types';
import {SEO} from 'layouts/SEO/SEO';
import {Anchor, AspectRatio, Box, Button, Grid, List, Text, Title, createStyles, useMantineTheme} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import {graphql} from 'gatsby';
import {renderBanners} from 'components/common/Banner/Banner';
import {type TResource, type TDownloadableResource} from 'types/resource';
import SocialShare from 'components/Blog/SocialShare/SocialShare';
import Asset from 'components/common/Asset/Asset';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import {type TAsset} from 'types/asset';

type HelmetProps = {
	data: {
		contentfulDownloadableResource: TDownloadableResource;
	};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({data: {contentfulDownloadableResource}, location}) => {
	const heroImage = contentfulDownloadableResource?.image?.file?.url;

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

const useStyles = createStyles(theme => ({
	section: {
		fontSize: 36,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 20,
		},
	},

	title: {
		fontSize: 68,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 38,
		},
	},
	description: {
		maxWidth: 500,
		marginTop: 24,
		marginBottom: 45,
		fontSize: 24,
		[theme.fn.smallerThan('sm')]: {
			marginTop: 20,
			marginBottom: 20,
			fontSize: 16,
		},
	},
	bodyText: {
		fontSize: 24,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 16,
			lineHeight: 1.4,
		},
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
	anchor: {
		color: '#00827E',
	},
	listItem: {
		overflow: 'hidden',
		fontSize: 24,

		'::marker': {
			fontSize: 16,
			fontWeight: 700,
		},
	},
}));

type Reference = {
	id?: string;
};

type ReferenceTypeGroup = {
	references: Reference[];
	referenceType: string;
};

function parseReferenceData(referenceData: ReferenceTypeGroup[]): Map<string, string> {
	const idToReferenceTypeMap = new Map<string, string>();
	for (const group of referenceData) {
		for (const ref of group.references) {
			if (ref.id) {
				idToReferenceTypeMap.set(ref.id, group.referenceType);
			}
		}
	}

	return idToReferenceTypeMap;
}

function getReferenceType(id: string, idToReferenceTypeMap: Map<string, string>): string | undefined {
	return idToReferenceTypeMap.get(id);
}

type ResourcesPageProps = {
	data: {
		contentfulDownloadableResource: TDownloadableResource;
		allContentfulReferencedSection: {nodes: ReferenceTypeGroup[]};
		allContentfulResource: {nodes: TResource[]};
	};
	location: Location;
};

const DownloadableResource: React.FC<ResourcesPageProps> = ({data}) => {
	const theme = useMantineTheme();
	const {classes, cx} = useStyles();
	const ref = React.useRef(null);
	const canvasRef = React.useRef(null);
	const defaultBanners = data.allContentfulResource.nodes;
	const hasBanners = Boolean(data.contentfulDownloadableResource.banner);
	const bannersToDisplay = hasBanners
		? [data.contentfulDownloadableResource.banner]!
		: (defaultBanners.map(r => r.banners).flat(1) as TResource[]);

	const idToReferenceTypeMap = React.useMemo(
		() => parseReferenceData(data.allContentfulReferencedSection.nodes),
		[data.allContentfulReferencedSection.nodes],
	);

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET](node: {data: {target: TAsset}}) {
				return (
					<Box>
						<Asset ref={canvasRef} asset={node.data.target} />
					</Box>
				);
			},
			[BLOCKS.PARAGRAPH](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<Text component='p' mt={0} className={classes.bodyText}>
						{children}
					</Text>
				);
			},

			[BLOCKS.OL_LIST](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<List type='ordered' mt={16} mb={32}>
						{children}
					</List>
				);
			},

			[BLOCKS.UL_LIST](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<List type='unordered' listStyleType='disc' pl={32} mt={16} mb={44}>
						{children}
					</List>
				);
			},

			[BLOCKS.LIST_ITEM](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<List.Item mt={8} mb={0} pr={20} className={classes.listItem}>
						{children}
					</List.Item>
				);
			},

			[INLINES.HYPERLINK](
				node: {data: {uri: string}},
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				const {uri} = node.data as {uri: string};
				return (
					<Anchor href={uri} target='_blank' className={classes.anchor}>
						{children}
					</Anchor>
				);
			},
			[BLOCKS.HEADING_1](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<Title order={1} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_2](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<Title order={2} size={24} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_3](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<Title order={3} size={18} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_4](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<Title order={4} size={18} style={{fontFamily: 'Lato, sans-serif'}} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_5](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return (
					<Title order={5} size={18} style={{fontWeight: 400, fontFamily: 'Lato, sans-serif'}} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_6](
				node: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
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

			[BLOCKS.TABLE_ROW](
				_: any,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return <tr>{children}</tr>;
			},

			[BLOCKS.TABLE_CELL](
				node: Block,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return <td className={classes.border}>{children}</td>;
			},

			[BLOCKS.TABLE_HEADER_CELL](
				node: Block,
				children:
				| string
				| number
				| boolean
				| React.ReactElement
				| React.ReactFragment
				| React.ReactPortal
				| undefined
				| undefined,
			) {
				return <th className={cx(classes.tableHeader, classes.border)}>{children}</th>;
			},
		},
	};

	const section = getReferenceType(data.contentfulDownloadableResource.id, idToReferenceTypeMap);

	return (
		<Layout>
			<Expanded id={data.contentfulDownloadableResource.id} pt={55}>
				<Box>
					<Grid>
						<Grid.Col sm={12} md={7}>
							{section?.length && <Text className={classes.section}>{section}</Text>}
							<Title className={classes.title}>{data.contentfulDownloadableResource.heading}</Title>
							<Box className={classes.description}>
								<Text>{data.contentfulDownloadableResource.description}</Text>
							</Box>
							<Button size='lg' px={50}>
								{data.contentfulDownloadableResource.buttonText}
							</Button>
						</Grid.Col>
						<Grid.Col sm={12} md={5}>
							<AspectRatio ratio={1} ref={ref}>
								{data.contentfulDownloadableResource.image && (
									<Asset asset={data.contentfulDownloadableResource.image} />
								)}
							</AspectRatio>
						</Grid.Col>
					</Grid>
				</Box>
				<Box mt={64}>
					<Text mb={42} size={24}>
						{data.contentfulDownloadableResource.body
							&& renderRichText(data.contentfulDownloadableResource.body, options)}
					</Text>
				</Box>
				<SocialShare />
			</Expanded>
			{renderBanners(bannersToDisplay)}
		</Layout>
	);
};

export const downloadableResourceQuery = graphql`
	query getDownloadableResource($id: String) {
		contentfulDownloadableResource(id: {eq: $id}) {
			id
			heading
			description
			metaDescription
			downloadableAsset {
				id
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
			buttonText
			slug
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
			banner {
				id
				body {
					raw
					references {
						... on ContentfulAsset {
							id
							mimeType
							file {
								url
								contentType
								details {
									size
								}
							}
						}
					}
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
		allContentfulReferencedSection(
			filter: {referenceType: {in: ["White Paper", "FAQs", "Phil Blog", "Case Study", "Upcoming Events"]}}
		) {
			nodes {
				references {
					... on ContentfulDownloadableResource {
						id
					}
				}
				referenceType
			}
		}
	}
`;

export default DownloadableResource;
