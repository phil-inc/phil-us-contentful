import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {graphql, Script} from 'gatsby';
import slugify from 'slugify';
import {SEO} from 'layouts/SEO/SEO';
import {useInternalPaths} from 'hooks/useInternalPaths';
import {Box, Grid, Title, Container, TextInput, Button} from '@mantine/core';
import {IconSearch} from '@tabler/icons';
import Expanded from 'components/common/Expanded/Expanded';
import type {ISection} from 'types/section';
import {getLink} from 'utils/getLink';

type HelmetProps = {
	pageContext: ContentfulPage;
};

export const Head: React.FC<HelmetProps> = ({pageContext}) => {
	const heroSection = pageContext.sections.find(section => section.sectionType === 'Basic Section') as ISection;
	const heroImage = heroSection?.asset.file.url;

	return (
		<SEO title={pageContext.title}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={pageContext.title} />
			<meta name='twitter:description' content={pageContext.description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={pageContext.description} />
			<meta property='og:title' content={pageContext.title} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={pageContext.description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta
				property='og:url'
				content={`https://phil.us${pageContext.title === 'Home' ? '/' : `/${pageContext.title}`}`}
			/>
			<script charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></script>
		</SEO>
	);
};

type PageTemplateProps = {
	pageContext: ContentfulPage;
};

const PageTemplate: React.FC<PageTemplateProps> = ({pageContext}) => {
	const {id, sections, title} = pageContext;

	let basicSectionCount = 0;

	return (
		<Layout>
			{title === 'Resources' && (
				<Expanded id={id}>
					<Grid align='center' justify='space-between'>
						<Grid.Col span={12}>
							<Box>
								<Title order={2}>Resources</Title>
							</Box>
						</Grid.Col>
						{/* <Grid.Col span={6}>
							<Container fluid pr={8}>
								<Grid>
									<Grid.Col span={10}>
										<TextInput
											radius={0}
											icon={<IconSearch size={18} stroke={1.5} />}
											size='md'
											placeholder='Search'
											rightSectionWidth={42}
										/>
									</Grid.Col>
									<Grid.Col span={2} pr={0}>
										<Button color='dark' size='md' fullWidth>
											Search
										</Button>
									</Grid.Col>
								</Grid>
							</Container>
						</Grid.Col> */}
					</Grid>
				</Expanded>
			)}
			{sections
				.filter(section => !section.isHidden)
				.map(section => (
					<Section
						key={section.id}
						section={section}
						index={section.sectionType === 'Basic Section' ? basicSectionCount++ : basicSectionCount}
					/>
				))}
		</Layout>
	);
};

export default PageTemplate;
