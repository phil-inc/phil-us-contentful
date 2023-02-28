import CareerSection from 'components/career/CareerSection';
import {Layout} from 'layouts/Layout/Layout';
import {SEO} from 'layouts/SEO/SEO';
import React, {useEffect, useState} from 'react';
import type {ContentfulPage} from 'types/page';
import type {ISection} from 'types/section';
import {getTitle} from 'utils/getTitle';
import {getWindowProperty} from 'utils/getWindowProperty';
import {groupBy} from 'utils/groupBy';
import {isProduction} from 'utils/isProduction';

type HelmetProps = {
	pageContext: ContentfulPage;
	data: {contentfulPage: ContentfulPage};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({pageContext, location}) => {
	const heroSection = pageContext.sections.find(section => section.sectionType === 'Basic Section') as ISection;
	const heroImage = heroSection?.asset.file.url;
	const domain = getWindowProperty('location.hostname', 'phil.us');

	return (
		<SEO title={getTitle(pageContext.title, pageContext.displayTitle)}>
			{isProduction && domain !== 'phil.us' && <link rel='canonical' href={'https://phil.us' + location.pathname} />}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={getTitle(pageContext.title, pageContext.displayTitle)} />
			<meta name='twitter:description' content={pageContext.description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={pageContext.description} />
			<meta property='og:title' content={getTitle(pageContext.title, pageContext.displayTitle)} />
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
				const rawResponse = await fetch('https://capi.phil.us/api/web/v1/careers');
				if (rawResponse.status === 200) {
					const content = (await rawResponse.json()) as Record<string, Record<string, unknown[]>>;
					const sortedJobs = groupBy(content.data.jobs, 'department');

					setCareers(sortedJobs);
				}
			} catch (error: unknown) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<Layout>
			<CareerSection heroAsset={heroAsset} careers={careers} isLoading={isLoading} />
		</Layout>
	);
};

export default React.memo(CareerTemplate);
