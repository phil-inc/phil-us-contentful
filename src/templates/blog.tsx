import React from 'react';
import {Grid, Title, Button, Text, createStyles, Container, Image, Box, Anchor, List} from '@mantine/core';
import {Layout} from 'layouts/Layout/Layout';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import {graphql} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {TResource} from 'types/resource';
import {SEO} from 'layouts/SEO/SEO';
import ImageContainer from 'components/common/Container/ImageContainer';
import Asset from 'components/common/Asset/Asset';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import type {TAsset} from 'types/asset';
import {getLink} from 'utils/getLink';
import type {ISection} from 'types/section';

type HelmetProps = {
	pageContext: TResource;
};

export const Head: React.FC<HelmetProps> = ({pageContext}) => {
	const heroImage = pageContext.asset?.file.url;

	return (
		<SEO title={pageContext.heading}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={pageContext.heading} />
			<meta name='twitter:description' content={pageContext.description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={pageContext.description} />
			<meta property='og:title' content={pageContext.heading} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={pageContext.description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta property='og:url' content={`https://phil.us/${getLink(pageContext).link}`} />
			<script charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></script>
		</SEO>
	);
};

type PageTemplateProps = {
	pageContext: TResource;
};

const BlogTemplate: React.FC<PageTemplateProps> = ({pageContext}) => {
	const {heading, body, asset} = pageContext;
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
			display: 'flex',
			alignItems: 'center',

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
	}));

	const {classes} = useStyles();

	const richTextImages = {};

	if (body && Boolean(body.references)) {
		// eslint-disable-next-line array-callback-return
		body.references.map((reference: any) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			richTextImages[reference.contentful_id] = {image: reference.gatsbyImageData, alt: reference.title};
		});
	}

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET](node) {
				return (
					<Box sx={{maxWidth: '1000px', marginBottom: '32px', margin: '50px auto'}}>
						<Asset asset={node.data.target as TAsset} />
					</Box>
				);
			},
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text size={18}>{children}</Text>;
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
		},
	};

	return (
		<Layout>
			<Container size='xl' className={classes.inner}>
				<Grid gutter='xl' align='center' pb={130} pt={0}>
					<Grid.Col lg={12} md={12} sm={12}>
						<Title order={2} mb={36}>
							{heading}
						</Title>
						{Boolean(asset) && (
							<Container size='sm' style={{float: 'right', padding: '30px'}}>
								<Asset asset={asset} />
							</Container>
						)}
						<Text>{body && renderRichText(body, options)}</Text>
					</Grid.Col>
				</Grid>
			</Container>
		</Layout>
	);
};

export default BlogTemplate;
