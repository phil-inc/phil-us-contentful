import React from 'react';
import {Container, createStyles, useMantineTheme} from '@mantine/core';
import {Article} from 'components/common/Article';
import Asset from 'components/common/Asset/Asset';
import {Banner} from 'components/common/Banner/Banner';
import {CardWithImage} from 'components/common/CardWithImage';
import CodeSnippet from 'components/common/CodeSnippet/CodeSnippet';
import {FAQ} from 'components/common/FAQ';
import {Featured} from 'components/common/Featured';
import {PressRelease} from 'components/common/Press/PressRelease';
import {ResourceCard} from 'components/common/Resources/ResourceCard';
import Profile from 'components/common/Team/Profile';
import {Testimonial} from 'components/common/Testimonial';
import {PrescriberJourney} from 'components/common/prescriberJourney/PrescriberJourney';
import {StatsCard} from 'components/common/statsCard/StatsCard';
import {type TResource} from 'types/resource';
import {type ReferenceType, ReferenceTypeEnum, type ResourceBlocks, ResourceBlocksEnum} from 'types/section';
import {handleSpacing} from 'utils/handleSpacing';

// Get colors for resources based on resource type
export const getSectionColors = (referenceType: string) => {
	switch (referenceType) {
		case ReferenceTypeEnum.Testimonial:
		case ReferenceTypeEnum['Image Carousel']:
		case ReferenceTypeEnum.Location:
			return ['#1D818D', 'white']; // Green Background

		case ReferenceTypeEnum['Customer Story']:
			return ['#00827E', 'white'];

		case ReferenceTypeEnum.Banner:
		case ReferenceTypeEnum.Article:
		case ReferenceTypeEnum['Stats Card']:
		case ReferenceTypeEnum['Stats Card with Arrows']:
		case ReferenceTypeEnum['Prescriber Journey']:
		case ReferenceTypeEnum['Info Card']:
			return ['#F4F4F4', 'black', '#FFFFFF']; // Gray Background

		default:
			return ['#FFFFFF', 'black']; // White Background
	}
};

// Get colors for resources based on index
const getColor = (index: number) => {
	if (index % 3 === 0) {
		return 'green';
	}

	if (index % 3 === 1) {
		return 'blue';
	}

	return 'yellow';
};

const useStyles = createStyles(theme => ({
	investorImage: {
		width: '300px',

		[theme.fn.smallerThan('md')]: {
			width: 'fit-content',
		},
	},
}));

type RenderResourceProps = {
	sectionHeader: string;
	resource: TResource;
	index: number;
	arrayLength: number;
	referenceType: ReferenceType | ResourceBlocks;
};

const RenderResource: React.FC<RenderResourceProps> = ({
	sectionHeader,
	resource,
	index,
	arrayLength,
	referenceType,
}) => {
	const theme = useMantineTheme();
	const [resourceBackground] = getSectionColors(referenceType);
	const {classes} = useStyles();

	switch (referenceType) {
		case ReferenceTypeEnum['Code Snippet']:
			return <CodeSnippet resource={resource} />;

		case ReferenceTypeEnum.Article:
			return <Article color={getColor(index)} resource={resource} />;

		case ReferenceTypeEnum['Customer Story']:
		case ReferenceTypeEnum.Testimonial:
			return (
				<Testimonial
					type={referenceType === ReferenceTypeEnum.Testimonial ? 'person' : 'company'}
					resource={resource}
				/>
			);

		case ResourceBlocksEnum['Phil Blog']:
		case ResourceBlocksEnum['Upcoming Events']:
		case ResourceBlocksEnum['White Paper']:
		case ResourceBlocksEnum['Case Study']:
			return <ResourceCard resource={resource} />;

		case ReferenceTypeEnum['Featured Resource']:
		case ReferenceTypeEnum['Info Card']:
			return (
				<Featured
					noDivider={referenceType === ReferenceTypeEnum['Info Card']}
					pr={
						referenceType === ReferenceTypeEnum['Featured Resource'] ? handleSpacing(theme, theme.spacing.lg) : 0
					}
					resourceBackground={resourceBackground}
					resource={resource}
				/>
			);

		case ReferenceTypeEnum.Banner:
			return <Banner resource={resource} />;

		case ReferenceTypeEnum['Stats Card']:
			return <StatsCard resource={resource} />;
		case ReferenceTypeEnum['Stats Card with Arrows']:
			return <StatsCard resource={resource} arrow={true} index={index === arrayLength - 1 ? undefined : index} />;

		case ReferenceTypeEnum['Prescriber Journey']:
			return <PrescriberJourney resource={resource} />;

		case ReferenceTypeEnum['Team Member']:
			return <Profile resource={resource} />;

		case ReferenceTypeEnum.Investors:
			return (
				<Container className={classes.investorImage}>
					<Asset asset={resource.asset!} />
				</Container>
			);

		case ReferenceTypeEnum['Press Release']:
			return <PressRelease resource={resource} />;

		case ReferenceTypeEnum.Location:
			return <CardWithImage resource={resource} />;

		case ReferenceTypeEnum.FAQs:
			return <FAQ resource={resource} />;

		default:
			break;
	}
};

export default RenderResource;
