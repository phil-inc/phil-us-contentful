import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {SEO} from 'layouts/SEO/SEO';
import {Box, Grid, Title, useMantineTheme} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import type {ISection} from 'types/section';
import {handleSpacing} from 'utils/handleSpacing';
import PageContext from 'contexts/PageContext';

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
		</SEO>
	);
};

type ContactTemplateProps = {
	pageContext: ContentfulPage;
};

const ContactTemplate: React.FC<ContactTemplateProps> = ({pageContext}) => {
	const {id, sections, title} = pageContext;
	const theme = useMantineTheme();

	let basicSectionCount = 0;

	return (
		<PageContext.Provider value={pageContext}>
			<Layout>
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

export default React.memo(ContactTemplate);
