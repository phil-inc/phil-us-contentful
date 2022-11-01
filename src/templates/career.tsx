import {createStyles} from '@mantine/core';
import CareerSection from 'components/career/CareerSection';
import {Layout} from 'layouts/Layout/Layout';
import {SEO} from 'layouts/SEO/SEO';
import React, {useEffect, useState} from 'react';
import type {ContentfulPage} from 'types/page';
import type {ISection} from 'types/section';
import {groupBy} from 'utils/groupBy';

type HelmetProps = {
	pageContext: ContentfulPage;
	data: {contentfulPage: ContentfulPage};
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

type CareerTemplateProps = {
	pageContext: ContentfulPage;
};

const CareerTemplate: React.FC<CareerTemplateProps> = ({pageContext}) => {
	const {sections} = pageContext;
	const heroSection = sections.find(
		section => !section.isHidden && section.sectionType === 'Basic Section',
	) as ISection;
	const heroAsset = heroSection.asset;

	const [careers, setCareers] = useState({});
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			try {
				const rawResponse = await fetch('https://capi.dev.phil.us/api/web/v1/careers');
				if (rawResponse.status === 200) {
					const content: unknown = await rawResponse.json();
					const sortedJobs = groupBy(content.data.jobs, 'department');

					setIsLoading(false);
					setCareers(sortedJobs);
				}
			} catch (error: unknown) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<Layout>
			<CareerSection heroAsset={heroAsset} careers={careers} isLoading={isLoading} />
		</Layout>
	);
};

export default CareerTemplate;
