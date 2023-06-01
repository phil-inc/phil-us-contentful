import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {SEO} from 'layouts/SEO/SEO';
import {Accordion, Box, Container, createStyles, Grid, Title, useMantineTheme} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import type {ISection} from 'types/section';
import {handleSpacing} from 'utils/handleSpacing';
import PageContext from 'contexts/PageContext';
import {Script} from 'gatsby';

type HelmetProps = {
	pageContext: ContentfulPage;
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({pageContext, location}) => {
	const heroSection = pageContext.sections.find(section => section.sectionType === 'Basic Section') as ISection;
	const heroImage = heroSection?.asset.file.url;
	const title = pageContext.displayTitle.length ? pageContext.displayTitle : pageContext.title;

	return (
		<SEO title={title}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={pageContext.description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={pageContext.description} />
			<meta property='og:title' content={title} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={pageContext.description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta property='og:url' content={`https://phil.us${pageContext.title === 'Home' ? '/' : `/${title}`}`} />
			<script charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></script>
			{location.pathname === '/field/' && <meta name='robots' content='noindex' />}
			<Script
				type='text/javascript'
				src='//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
				async
			></Script>
		</SEO>
	);
};

type PageTemplateProps = {
	pageContext: ContentfulPage;
};

const useStyles = createStyles((theme, {title}: {title: string}) => ({
	container: {
		margin: 0,
		padding: '0px 100px',

		[theme.fn.smallerThan('md')]: {
			padding: title === 'Field' ? '0px 100px' : '42px 100px',
		},

		[theme.fn.smallerThan('sm')]: {
			padding: title === 'Field' ? '0px 16px' : '42px 16px',
		},
	},
}));

const PageTemplate: React.FC<PageTemplateProps> = ({pageContext}) => {
	const {id, sections, title} = pageContext;
	const {classes} = useStyles({title});

	let basicSectionCount = 0;

	console.log({sections});

	return (
		<PageContext.Provider value={pageContext}>
			<Layout>
				{title === 'Resources' && (
					<Expanded id={id} py={0}>
						<Grid align='center' justify='space-between'>
							<Grid.Col span={12}>
								<Box>
									<Title order={1}>Resources</Title>
								</Box>
							</Grid.Col>
						</Grid>
					</Expanded>
				)}
				{title === 'Field' && (
					<Container className={classes.container}>
						<Title order={1} mb={30}>
							FAQ
						</Title>
					</Container>
				)}
				{sections
					.filter(section => !section.isHidden)
					.map(section => (
						<Section
							key={section.id + 'mapSectionComponent'}
							section={section}
							index={section.sectionType === 'Basic Section' ? basicSectionCount++ : basicSectionCount}
						/>
					))}
			</Layout>
		</PageContext.Provider>
	);
};

export default React.memo(PageTemplate);
