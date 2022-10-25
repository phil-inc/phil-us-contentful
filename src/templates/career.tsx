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

	const [careers, setCareers] = useState<Record<string, Listing[]>>();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchCareers();
	}, []);

	const response = {
		status: 'OK',
		data: {
			jobs: [
				{
					id: '28769f',
					title: 'Senior Product Manager, Patient Experience',
					full_title: 'Senior Product Manager, Patient Experience - United States',
					shortcode: 'AB4FA519AF',
					code: '',
					state: 'published',
					department: 'Technical',
					url: 'https://philinc.workable.com/jobs/2650573',
					application_url: 'https://philinc.workable.com/jobs/2650573/candidates/new',
					shortlink: 'https://apply.workable.com/j/AB4FA519AF',
					location: {
						location_str: 'United States',
						country: 'United States',
						country_code: 'US',
						region: '',
						region_code: '',
						city: '',
						zip_code: '',
						telecommuting: false,
					},
					created_at: '2022-08-13T00:30:11Z',
				},
				{
					id: '2888cf',
					title: 'Director of Product Management - Market and Patient Strategy',
					full_title: 'Director of Product Management - Market and Patient Strategy - United States',
					shortcode: '29A8A4FF28',
					code: '',
					state: 'published',
					department: 'Technical',
					url: 'https://philinc.workable.com/jobs/2655229',
					application_url: 'https://philinc.workable.com/jobs/2655229/candidates/new',
					shortlink: 'https://apply.workable.com/j/29A8A4FF28',
					location: {
						location_str: 'United States',
						country: 'United States',
						country_code: 'US',
						region: '',
						region_code: '',
						city: '',
						zip_code: '',
						telecommuting: true,
					},
					created_at: '2022-08-17T02:14:15Z',
				},
				{
					id: '29b828',
					title: 'Patient Support Team Lead',
					full_title: 'Patient Support Team Lead - United States',
					shortcode: 'E3AFB318C1',
					code: '',
					state: 'published',
					department: 'Operations',
					url: 'https://philinc.workable.com/jobs/2732886',
					application_url: 'https://philinc.workable.com/jobs/2732886/candidates/new',
					shortlink: 'https://apply.workable.com/j/E3AFB318C1',
					location: {
						location_str: 'United States',
						country: 'United States',
						country_code: 'US',
						region: '',
						region_code: '',
						city: '',
						zip_code: '',
						telecommuting: true,
					},
					created_at: '2022-09-29T17:31:22Z',
				},
				{
					id: '29e823',
					title: 'Senior Product Manager, Prescription Operations',
					full_title: 'Senior Product Manager, Prescription Operations - United States',
					shortcode: '67E86A848C',
					code: '',
					state: 'published',
					department: 'Technical',
					url: 'https://philinc.workable.com/jobs/2745169',
					application_url: 'https://philinc.workable.com/jobs/2745169/candidates/new',
					shortlink: 'https://apply.workable.com/j/67E86A848C',
					location: {
						location_str: 'United States',
						country: 'United States',
						country_code: 'US',
						region: '',
						region_code: '',
						city: '',
						zip_code: '',
						telecommuting: true,
					},
					created_at: '2022-10-05T17:46:09Z',
				},
				{
					id: '2a4606',
					title: 'Senior Pharmacy Operations Specialist',
					full_title: 'Senior Pharmacy Operations Specialist - United States',
					shortcode: 'E3BDF66C5D',
					code: '',
					state: 'published',
					department: 'Pharmacy',
					url: 'https://philinc.workable.com/jobs/2769204',
					application_url: 'https://philinc.workable.com/jobs/2769204/candidates/new',
					shortlink: 'https://apply.workable.com/j/E3BDF66C5D',
					location: {
						location_str: 'Ohio, United States',
						country: 'United States',
						country_code: 'US',
						region: 'Ohio',
						region_code: 'OH',
						city: '',
						zip_code: '',
						telecommuting: true,
					},
					created_at: '2022-10-19T03:56:05Z',
				},
				{
					id: '2a4bec',
					title: 'Senior Pharmacy Operations Specialist',
					full_title: 'Senior Pharmacy Operations Specialist - United States',
					shortcode: 'DE127436E7',
					code: '',
					state: 'published',
					department: '',
					url: 'https://philinc.workable.com/jobs/2770714',
					application_url: 'https://philinc.workable.com/jobs/2770714/candidates/new',
					shortlink: 'https://apply.workable.com/j/DE127436E7',
					location: {
						location_str: 'United States',
						country: 'United States',
						country_code: 'US',
						region: '',
						region_code: '',
						city: '',
						zip_code: '',
						telecommuting: true,
					},
					created_at: '2022-10-19T17:34:55Z',
				},
				{
					id: '2a5681',
					title: 'VP of Business Development',
					full_title: 'VP of Business Development - United States',
					shortcode: 'AB412943D8',
					code: '',
					state: 'published',
					department: 'Business Development',
					url: 'https://philinc.workable.com/jobs/2773423',
					application_url: 'https://philinc.workable.com/jobs/2773423/candidates/new',
					shortlink: 'https://apply.workable.com/j/AB412943D8',
					location: {
						location_str: 'United States',
						country: 'United States',
						country_code: 'US',
						region: '',
						region_code: '',
						city: '',
						zip_code: '',
						telecommuting: true,
					},
					created_at: '2022-10-20T18:31:29Z',
				},
			],
		},
	};

	const fetchCareers = () => {
		formatCareerData(response);

		// fetch('https://capi.phil.us/api/web/v1/careers')
		// 	.then(async response => response.json())
		// 	.then(d => {
		// 		formatCareerData(data);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});
	};

	const formatCareerData = (jobListings: JobListings) => {
		const sortedJobs = groupBy(jobListings.data.jobs, 'department');
		setIsLoading(false);
		setCareers(sortedJobs);
	};

	return (
		<Layout>
			<CareerSection heroAsset={heroAsset} careers={careers} isLoading={isLoading} />
		</Layout>
	);
};

export default CareerTemplate;
