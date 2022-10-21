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

type HelmetProps = {
	pageContext: TResource;
};

export const Head: React.FC<HelmetProps> = ({pageContext}) => (
	<SEO title={pageContext.heading}>
		<meta name='description' content={pageContext.description} />
	</SEO>
);

type PageTemplateProps = {
	pageContext: TResource;
};

const BlogTemplate: React.FC<PageTemplateProps> = ({pageContext}) => {
	const {heading, body, asset} = pageContext;
	console.log(pageContext);
	const useStyles = createStyles(theme => ({
		body: {
			p: {
				marginTop: 0,
			},
		},
	}));

	const {classes} = useStyles();

	const richTextImages = {};

	// eslint-disable-next-line array-callback-return
	body.references.map((reference: any) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		richTextImages[reference.contentful_id] = {image: reference.gatsbyImageData, alt: reference.title};
	});

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
						<Container size='sm' style={{float: 'right', padding: '30px'}}>
							<Asset asset={asset} />
						</Container>
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
