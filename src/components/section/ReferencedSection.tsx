import {Grid, Title, Button, Group, TextInput, Container, Box, Anchor, Divider, createStyles} from '@mantine/core';
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
import {ResourceCard} from 'components/common/Resources/ResourceCard';
import {TestimonialCarousel} from 'components/common/Carousel/TestimonialCarousel'
import {Link} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React, {useState} from 'react';
import type {TResource} from 'types/resource';
import type {IReferencedSection} from 'types/section';
import {getLink} from 'utils/getLink';
import slugify from 'slugify';
import {CardWithImage} from 'components/common/CardWithImage';

const useStyles = createStyles(theme => ({
	divider: {
		maxWidth: '35%',
		marginTop: '10px',
		marginBottom: '100px',
	},
}));

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
	const {link, isExternal} = getLink(section);
	const {classes} = useStyles();

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
			case 'Image Carousel':
			case 'Location':
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
			case 'Phil Blog':
			case 'Upcoming Events':
			case 'White Paper':
			case 'Case Study':
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
	// eslint-disable-next-line complexity
	const renderResource = (sectionHeader: string, resource: TResource, index: number) => {
		switch (section.referenceType) {
			case 'Article':
				return (
					<Article
						key={resource.id}
						color={getColor(index)}
						title={resource.heading}
						link={getLink(resource)}
						buttonText={resource.buttonText}
						image={resource.asset}
					>
						{resource.body && renderRichText(resource.body)}
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
						{resource.body && renderRichText(resource.body)}
					</Testimonial>
				);

			case 'Phil Blog':
			case 'Upcoming Events':
			case 'White Paper':
			case 'Case Study':
				return <ResourceCard sectionHeader={sectionHeader} resource={resource} />;

			case 'Featured Resource':
			case 'Info Card':
				return (
					<Featured
						noDivider={section.referenceType === 'Info Card'}
						pr={section.referenceType === 'Featured Resource' ? 50 : 0}
						resourceBackground={resourceBackground}
						resource={resource}
					/>
				);

			case 'Banner':
				return <Banner resource={resource} />;

			case 'Stats Card':
				return <StatsCard resource={resource} />;

			case 'Prescriber Journey':
				return <PrescriberJourney resource={resource} />;

			case 'FAQs':
				return <FAQ title={resource.heading} />;

			case 'Team Member':
				return <Profile resource={resource} />;

			case 'Investors':
				return (
					<Container size={300}>
						<GatsbyImage image={getImage(resource.asset)} alt="" />
					</Container>
				);

			case 'Press Release':
				return <PressRelease resource={resource} />;

			case 'Location':
				return <CardWithImage resource={resource} />;

			default:
				break;
		}
	};

	return (
		<Expanded
			id={slugify(section.header ?? section.id, {lower: true, strict: true})}
			background={background}
			py={section.referenceType === 'Banner' ? 0 : 116}
		>
			{Boolean(section.header?.length) &&
				Boolean(!section.hideHeader) &&
				(section.referenceType === 'Case Study' ||
				section.referenceType === 'Phil Blog' ||
				section.referenceType === 'White Paper' ||
				section.referenceType === 'Upcoming Events' ? (
					<Box>
						<Title order={3}>{section.header}</Title>
						<Divider variant="dashed" size={1} className={classes.divider} />
					</Box>
				) : (
					<Group position="center" mb={60}>
						<Title order={2} color={textColor}>
							{section.header}
						</Title>
					</Group>
				))}
			{/* Commented out Search Bar because new design doesnot have it */}
			{/* {section.referenceType === 'FAQs' && (
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
			)} */}
			{section.referenceType === 'Image Carousel' ? (
				<ResourceCarousel imageCaraouselSection={section} />
			) : section.referenceType == 'Testimonial' ? (
				<TestimonialCarousel section={section} />
			) : (
				<Grid grow={section.referenceType === 'Investors'} columns={GRID_COLUMNS}>
					{section.references.map((resource, index) => (
						<Grid.Col py={30} key={index} lg={getSpan()} sm={GRID_COLUMNS} md={GRID_COLUMNS}>
							{renderResource(section.header, resource, index)}
						</Grid.Col>
					))}
				</Grid>
			)}
			{Boolean(section.buttonText?.length) && (Boolean(section.externalLink) || Boolean(section.internalLink)) && (
				<Group position="center">
					{isExternal ? (
						<Anchor href={link} target="_blank">
							<Button color={'dark'}>{section.buttonText}</Button>
						</Anchor>
					) : (
						<Link to={link}>
							<Button color={'dark'}>{section.buttonText}</Button>
						</Link>
					)}
				</Group>
			)}
		</Expanded>
	);
};

export default ReferencedSection;
