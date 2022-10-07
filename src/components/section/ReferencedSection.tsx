import {Grid, Title, Button, Group, TextInput, Container, Box} from '@mantine/core';
import {IconSearch} from '@tabler/icons';
import {Article} from 'components/common/Article';
import {Banner} from 'components/common/Banner/Banner';
import {ResourceCarousel} from 'components/common/Carousel/ResourceCarousel';
import Expanded from 'components/common/Expanded/Expanded';
import {FAQ} from 'components/common/FAQ';
import {Featured} from 'components/common/Featured';
import {PrescriberJourney} from 'components/common/prescriberJourney/PrescriberJourney';
import {PressRelease} from 'components/common/Press/PressRelease';
import {StatsCard} from 'components/common/statsCard/StatsCard';
import Profile from 'components/common/Team/Profile';
import {Testimonial} from 'components/common/Testimonial';
import {Link} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {TResource} from 'types/resource';
import type {IReferencedSection} from 'types/section';

type ReferencedSectionProps = {
	section: IReferencedSection;
};

/**
 * ReferencedSection is a Section Component that renders referenced resources.
 * @param props - {section} Section to be reference rendered
 * @returns Referenced Resources
 */
const ReferencedSection: React.FC<ReferencedSectionProps> = ({section}) => {
	const GRID_COLUMNS = 100;
	const SPAN_LG = GRID_COLUMNS / section.references.length;

	// Get colors for resources based on index
	const getColor = (index: number) => {
		if (index % 3 === 0) {
			return null;
		}

		if (index % 3 === 1) {
			return 'blue';
		}

		return 'yellow';
	};

	// Get colors for resources based on resource type
	const getSectionColors = () => {
		switch (section.referenceType) {
			case 'Customer Story':
			case 'Testimonial':
				return ['#29A5B4', 'white']; // Green Background

			case 'Banner':
			case 'Article':
			case 'Stats Card':
			case 'Prescriber Journey':
			case 'Info Card':
				return ['#F4F4F4', 'black', '#FFFFFF']; // Gray Background

			default:
				return ['#FFFFFF', 'black']; // White Background
		}
	};

	// Get grid span based on resource type
	const getSpan = () => {
		switch (section.referenceType) {
			case 'Info Card':
			case 'Testimonial':
			case 'FAQs':
				return GRID_COLUMNS / 2;

			case 'Team Member':
				return GRID_COLUMNS / 4;

			case 'Investors':
				return GRID_COLUMNS / 5;

			default:
				return SPAN_LG;
		}
	};

	const [background, textColor, resourceBackground] = getSectionColors();

	// Render resource based on resource type
	const renderResource = (sectionHeader : string, resource: TResource, index: number) => {
		switch (section.referenceType) {
			case 'Article':
				return (
					<Article
						key={resource.id}
						color={getColor(index)}
						title={resource.heading}
						link={resource.linkTo}
						buttonText={resource.buttonText}
						image={resource.asset}
					>
						{renderRichText(resource.body)}
					</Article>
				);

			case 'Customer Story':
			case 'Testimonial':
				return (
					<Testimonial
						type={section.referenceType === 'Testimonial' ? 'person' : 'company'}
						image={resource.asset}
						author={resource.author}
						designation={resource.designation}
					>
						{renderRichText(resource.body)}
					</Testimonial>
				);

			case 'Phil Blog':
			case 'Upcoming Events':
			case 'White Paper':
			case 'Case Study':
				return (
					
					<ResourceCard sectionHeader={sectionHeader} title={resource.heading} asset={resource.asset} >
						<>
						{console.log("resource",resource)}
						{!!resource.subHeading ? resource.subHeading.subHeading : 'subheading'}
						</>
					</ResourceCard>
				);

			case 'Featured Resource':
			case 'Info Card':
				return (
					<Featured
						noDivider={section.referenceType === 'Info Card'}
						pr={section.referenceType === 'Featured Resource' ? 50 : 0}
						resourceBackground={resourceBackground}
						title={resource.heading}
						asset={resource.asset}
					>
						{renderRichText(resource.body)}
					</Featured>
				);

			case 'Banner':
				return <Banner resource={resource} />;

			case 'Stats Card':
				return <StatsCard resource={resource} />;

			case 'Prescriber Journey':
				return <PrescriberJourney resource={resource} />;

			case 'FAQs':
				return <FAQ title={resource.heading} />;

			case 'Image Carousel':
				break;
			case 'Team Member':
				return <Profile resource={resource} />;

			case 'Investors':
				return (
					<Container size={300}>
						<GatsbyImage image={getImage(resource.asset)} alt='' />
					</Container>
				);

			case 'Press Release':
				return <PressRelease resource={resource} />;

			default:
				break;
		}
	};

	return (
		<Expanded background={background} py={section.referenceType === 'Banner' ? 0 : 116}>
			{Boolean(section.header?.length) && (
				<Group position='center' mb={60}>
					<Title order={2} color={textColor}>
						{section.header}
					</Title>
				</Group>
			)}
			{section.referenceType === 'FAQs' && (
				<Container>
					<Grid>
						<Grid.Col span={10}>
							<TextInput
								icon={<IconSearch size={18} stroke={1.5} />}
								size='md'
								placeholder='Search questions'
								rightSectionWidth={42}
								radius={0}
							/>
						</Grid.Col>
						<Grid.Col span={2}>
							<Button color='dark' size='md'>
								Search
							</Button>
						</Grid.Col>
					</Grid>
				</Container>
			)}
			{section.referenceType === 'Image Carousel' ? (
				<ResourceCarousel />
			) : (
				<Grid grow={section.referenceType === 'Investors'} columns={GRID_COLUMNS}>
					{section.references.map((resource, index) => (
						<Grid.Col py={30} key={index} lg={getSpan()} sm={GRID_COLUMNS} md={50}>
							{renderResource(section.header, resource, index)}
						</Grid.Col>
					))}
				</Grid>
			)}
			{Boolean(section.buttonText?.length) && Boolean(section.linkTo?.length) && (
				<Group position='center'>
					<Link to={section.linkTo}>
						<Button color={'dark'}>{section.buttonText}</Button>
					</Link>
				</Group>
			)}
		</Expanded>
	);
};

export default ReferencedSection;
