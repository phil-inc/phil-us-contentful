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

type HelmetProps = {
	pageContext: {title: string};
	data: {contentfulResource: TResource};
};

export const Head: React.FC<HelmetProps> = ({pageContext, data}) => (
	<SEO title={pageContext.title}>
		<meta name="description" content={data.contentfulResource.description} />
	</SEO>
);

type PageTemplateProps = {
	data: {contentfulResource: TResource};
};

const BlogTemplate: React.FC<PageTemplateProps> = ({data}) => {
	const {heading, body, buttonText, asset} = data.contentfulResource;
	const useStyles = createStyles(theme => ({
		body: {
			p: {
				marginTop: 0,
			},
		},
	}));

	const {classes} = useStyles();
	const pathToImage = getImage(asset);

	const richTextImages = {};

	// eslint-disable-next-line array-callback-return
	data.contentfulResource.body.references.map((reference: any) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		richTextImages[reference.contentful_id] = {image: reference.gatsbyImageData, alt: reference.title};
	});

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET](node) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const imageData = richTextImages[node.data.target.sys.id];
				const image = getImage(imageData.image);
				return (
					<Box sx={{maxWidth: '1000px', marginBottom: '32px'}}>
						<GatsbyImage image={image} alt={''} />
					</Box>
				);
			},
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text>{children}</Text>;
			},
		},
	};

	return (
		<Layout>
			<Container size="xl">
				<Grid gutter="xl" align="center" pb={130} pt={0}>
					<Grid.Col lg={12} md={12} sm={12}>
						<Title order={2}>{heading}</Title>
						<Container size="sm" style={{float: 'right', padding: '30px'}}>
							<GatsbyImage image={pathToImage} alt="" />
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

export const pageQuery = graphql`
	query getBlogsPost($title: String) {
		contentfulResource(heading: {eq: $title}) {
			id
			description
			heading
			designation
			buttonText
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
					contentful_id
					__typename
					description
					gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
				}
			}
			createdAt
			subHeading {
				subHeading
			}
		}
	}
`;

export default BlogTemplate;
