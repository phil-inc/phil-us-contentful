import React from 'react';
import {Grid, Title, Button, Text, createStyles, Container, Image, Box} from '@mantine/core';
import {Layout} from 'layouts/Layout/Layout';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import {graphql} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {TResource} from 'types/resource';
import {SEO} from 'layouts/SEO/SEO';
import ImageContainer from 'components/common/Container/ImageContainer';
import Asset from 'components/common/Asset/Asset';
import {BLOCKS} from '@contentful/rich-text-types';
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
					<Box sx={{maxWidth: '1000px', marginBottom: '32px'}}>
						<Asset asset={node.data.target as TAsset} />
					</Box>
				);
			},
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text mb={18}>{children}</Text>;
			},
		},
	};

	return (
		<Layout>
			<Container size='xl'>
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
						<Text size={18} className={classes.body}>
							{body && renderRichText(body, options)}
						</Text>
					</Grid.Col>
				</Grid>
			</Container>
		</Layout>
	);
};

export default BlogTemplate;
