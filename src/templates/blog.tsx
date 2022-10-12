import React from 'react';
import {Grid, Title, Button, Text, createStyles, Container} from '@mantine/core';
import {Layout} from 'layouts/Layout/Layout';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import {graphql} from 'gatsby';
import type {TResource} from 'types/resource';
import {SEO} from 'layouts/SEO/SEO';

type HelmetProps = {
	pageContext: {title: string};
	data: {contentfulResource: TResource};
};

export const Head: React.FC<HelmetProps> = ({pageContext, data}) => (
	<SEO title={pageContext.title}>
		<meta name='description' content={data.contentfulResource.description} />
	</SEO>
);

type PageTemplateProps = {
	data: {contentfulResource: TResource};
};

const BlogTemplate: React.FC<PageTemplateProps> = ({data}) => {
	const {heading, body, buttonText} = data.contentfulResource;
	const useStyles = createStyles(theme => ({
		body: {
			p: {
				marginTop: 0,
			},
		},
	}));

	const {classes} = useStyles();

	return (
		<Layout>
			<Container size='xl'>
				<Grid gutter='xl' align='center' pb={130} pt={0}>
					<Grid.Col lg={12} md={12} sm={12}>
						<Title order={2}>{heading}</Title>
						<Text size={18} className={classes.body}>
							{body && renderRichText(body)}
						</Text>
						{Boolean(buttonText?.length) && <Button color={'dark'}>{buttonText}</Button>}
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
			body {
				raw
			}
			createdAt
			subHeading {
				subHeading
			}
		}
	}
`;

export default BlogTemplate;
