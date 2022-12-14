import {Grid, Title, Button, Group, Container, Box, Anchor, Divider, createStyles} from '@mantine/core';
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
import {Link} from 'gatsby';
import React from 'react';
import type {TResource} from 'types/resource';
import type {IReferencedSection} from 'types/section';
import {getLink} from 'utils/getLink';
import slugify from 'slugify';
import {CardWithImage} from 'components/common/CardWithImage';
import Asset from 'components/common/Asset/Asset';
import {handleSpacing} from 'utils/handleSpacing';

const useStyles = createStyles(theme => ({
	divider: {
		maxWidth: '35%',
		marginTop: '10px',
		marginBottom: '64px',
	},
	investorImage: {
		width: '300px',

		[theme.fn.smallerThan('md')]: {
			width: 'fit-content',
		},
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

// eslint-disable-next-line complexity
const ReferencedSection: React.FC<ReferencedSectionProps> = ({section}) => {
	const GRID_COLUMNS = 100;
	const SPAN_LG = GRID_COLUMNS / section.references.length;
	const {link, isExternal} = getLink(section);
	const {classes, theme} = useStyles();

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
			case 'Testimonial':
			case 'Image Carousel':
			case 'Location':
				return ['#1D818D', 'white']; // Green Background

			case 'Customer Story':
				return ['#00827E', 'white'];

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
	const getSpan = (): {xl: number; lg: number; md: number; sm: number} => {
		switch (section.referenceType) {
			case 'Testimonial':
				return {xl: GRID_COLUMNS / 2, lg: GRID_COLUMNS, md: GRID_COLUMNS, sm: GRID_COLUMNS / 2};

			case 'Info Card':
			case 'Phil Blog':
			case 'Upcoming Events':
			case 'White Paper':
			case 'Case Study':
			case 'Featured Resource':
				return {xl: GRID_COLUMNS / 2, lg: GRID_COLUMNS, md: GRID_COLUMNS, sm: GRID_COLUMNS};

			case 'FAQs':
				return {xl: GRID_COLUMNS / 2, lg: GRID_COLUMNS / 2, md: GRID_COLUMNS, sm: GRID_COLUMNS};

			case 'Team Member':
				return {xl: GRID_COLUMNS / 4, lg: GRID_COLUMNS / 4, md: GRID_COLUMNS, sm: GRID_COLUMNS};

			case 'Investors':
				return {xl: GRID_COLUMNS / 5, lg: GRID_COLUMNS / 5, md: GRID_COLUMNS, sm: GRID_COLUMNS};

			default:
				return {xl: SPAN_LG, lg: SPAN_LG, md: GRID_COLUMNS, sm: GRID_COLUMNS};
		}
	};

	const [background, textColor, resourceBackground] = getSectionColors();

	// Render resource based on resource type

	const renderResource = (sectionHeader: string, resource: TResource, index: number) => {
		switch (section.referenceType) {
			case 'Article':
				return <Article color={getColor(index)} resource={resource} />;

			case 'Customer Story':
			case 'Testimonial':
				return (
					<Testimonial type={section.referenceType === 'Testimonial' ? 'person' : 'company'} resource={resource} />
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
						pr={section.referenceType === 'Featured Resource' ? handleSpacing(theme, theme.spacing.lg) : 0}
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

			case 'Team Member':
				return <Profile resource={resource} />;

			case 'Investors':
				return (
					<Container className={classes.investorImage}>
						<Asset asset={resource.asset} />
					</Container>
				);

			case 'Press Release':
				return <PressRelease resource={resource} />;

			case 'Location':
				return <CardWithImage resource={resource} />;

			case 'FAQs':
				return <FAQ resource={resource} />;

			default:
				break;
		}
	};

	return (
		<Expanded
			id={slugify(section.header ?? section.id, {lower: true, strict: true})}
			background={background}
			pt={
				section.referenceType === 'Case Study'
				|| section.referenceType === 'Phil Blog'
				|| section.referenceType === 'White Paper'
				|| section.referenceType === 'Upcoming Events'
					? handleSpacing(theme, 92)
					: 0
			}
			py={
				section.referenceType === 'Case Study'
				|| section.referenceType === 'Phil Blog'
				|| section.referenceType === 'White Paper'
				|| section.referenceType === 'Upcoming Events'
					? 0
					: handleSpacing(theme, 92)
			}
			fullWidth={section.referenceType === 'Image Carousel'}
		>
			{Boolean(section.header?.length)
				&& Boolean(!section.hideHeader)
				&& (section.referenceType === 'Case Study'
				|| section.referenceType === 'Phil Blog'
				|| section.referenceType === 'White Paper'
				|| section.referenceType === 'Upcoming Events' ? (
						<Box mb={handleSpacing(theme, theme.spacing.md)}>
							<Title order={3} size={35}>
								{section.header}
							</Title>
							<Divider variant='dashed' size={1} className={classes.divider} />
						</Box>
					) : (
						<Group position='center' mb={28}>
							<Title order={2} color={textColor}>
								{section.header}
							</Title>
						</Group>
					))}
			{section.referenceType === 'Image Carousel' ? (
				<ResourceCarousel imageCaraouselSection={section} />
			) : (
				<Grid
					grow={section.referenceType === 'Investors' || section.referenceType === 'FAQs'}
					columns={GRID_COLUMNS}
					gutter={theme.spacing.md}
					m={0}
					mx={-10}
				>
					{section.references.map((resource, index) => (
						<Grid.Col key={resource.id + 'mapReferencedSectionResource'} {...getSpan()}>
							{renderResource(section.header, resource, index)}
						</Grid.Col>
					))}
				</Grid>
			)}
			{Boolean(section.buttonText?.length) && (Boolean(section.externalLink) || Boolean(section.internalLink)) && (
				<Group position='center' mt={handleSpacing(theme, theme.spacing.lg)}>
					{isExternal ? (
						<Anchor href={link} target='_blank'>
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

export default React.memo(ReferencedSection);
