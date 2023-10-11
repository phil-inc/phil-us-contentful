import React from 'react';
import {Container, type MantineTheme, createStyles, useMantineTheme} from '@mantine/core';
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
import {ReferenceTypeEnum, ResourceBlocksEnum} from 'types/section';
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

type ComponentFunctionProps = {
	resource: TResource;
	index?: number;
	arrayLength?: number;
	theme?: MantineTheme;
	classes?: ReturnType<typeof useStyles>['classes'];
	resourceBackground?: string;
};

type ComponentFunction = (props: ComponentFunctionProps) => JSX.Element | undefined;

const CodeSnippetComponent: ComponentFunction = ({resource}) => <CodeSnippet resource={resource} />;

const ArticleComponent: ComponentFunction = ({resource, index}) => (
	<Article color={getColor(index!)} resource={resource} />
);

const TestimonialCompanyComponent: ComponentFunction = ({resource}) => (
	<Testimonial type='company' resource={resource} />
);

const TestimonialPersonComponent: ComponentFunction = ({resource}) => <Testimonial type='person' resource={resource} />;

const ResourceCardComponent: ComponentFunction = ({resource}) => <ResourceCard resource={resource} />;

const FeaturedResourceComponent: ComponentFunction = ({theme, resource}) => (
	<Featured
		noDivider={false}
		pr={handleSpacing(theme!, theme!.spacing.lg)}
		resourceBackground={'#f4f4f4'}
		resource={resource}
	/>
);

const StatsCardComponent: ComponentFunction = ({resource}) => <StatsCard resource={resource} />;

const StatsCardWithArrowsComponent: ComponentFunction = ({resource, index, arrayLength}) => (
	<StatsCard resource={resource} arrow={true} index={index === arrayLength! - 1 ? undefined : index} />
);

const PrescriberJourneyComponent: ComponentFunction = ({resource}) => <PrescriberJourney resource={resource} />;

const ProfileComponent: ComponentFunction = ({resource}) => <Profile resource={resource} />;

const InvestorImageComponent: ComponentFunction = ({resource, classes}) => (
	<Container className={classes!.investorImage}>
		<Asset asset={resource.asset!} />
	</Container>
);

const PressReleaseComponent: ComponentFunction = ({resource}) => <PressRelease resource={resource} />;

const CardWithImageComponent: ComponentFunction = ({resource}) => <CardWithImage resource={resource} />;

const FAQComponent: ComponentFunction = ({resource}) => <FAQ resource={resource} />;

const ImageCarouselComponent: ComponentFunction = () => <></>;

const BannerComponent: ComponentFunction = ({resource}) => <Banner resource={resource} />;

const getComponent = (
	referenceType: ReferenceTypeEnum | ResourceBlocksEnum,
	resource: TResource,
	index: number,
	arrayLength: number,
	theme: MantineTheme,
	classes: ReturnType<typeof useStyles>['classes'],
	resourceBackground: string,
) => {
	const componentMappings: Record<ReferenceTypeEnum | ResourceBlocksEnum, ComponentFunction> = {
		[ReferenceTypeEnum['Code Snippet']]: CodeSnippetComponent,
		[ReferenceTypeEnum.Article]: ArticleComponent,
		[ReferenceTypeEnum['Customer Story']]: TestimonialCompanyComponent,
		[ReferenceTypeEnum.Testimonial]: TestimonialPersonComponent,
		[ResourceBlocksEnum['Phil Blog']]: ResourceCardComponent,
		[ResourceBlocksEnum['Upcoming Events']]: ResourceCardComponent,
		[ResourceBlocksEnum['White Paper']]: ResourceCardComponent,
		[ResourceBlocksEnum['Case Study']]: ResourceCardComponent,
		[ReferenceTypeEnum['Featured Resource']]: FeaturedResourceComponent,
		[ReferenceTypeEnum['Info Card']]: FeaturedResourceComponent,
		[ReferenceTypeEnum.Banner]: BannerComponent,
		[ReferenceTypeEnum['Stats Card']]: StatsCardComponent,
		[ReferenceTypeEnum['Stats Card with Arrows']]: StatsCardWithArrowsComponent,
		[ReferenceTypeEnum['Prescriber Journey']]: PrescriberJourneyComponent,
		[ReferenceTypeEnum['Team Member']]: ProfileComponent,
		[ReferenceTypeEnum.Investors]: InvestorImageComponent,
		[ReferenceTypeEnum['Press Release']]: PressReleaseComponent,
		[ReferenceTypeEnum.Location]: CardWithImageComponent,
		[ReferenceTypeEnum.FAQs]: FAQComponent,
		[ReferenceTypeEnum['Image Carousel']]: ImageCarouselComponent,
	};

	const componentFunction = componentMappings[referenceType];
	if (!componentFunction) {
		return null; // Handle unknown referenceType values
	}

	console.log(resourceBackground, resource.heading);

	return componentFunction({resource, index, arrayLength, theme, classes, resourceBackground});
};

type RenderResourceProps = {
	sectionHeader: string;
	resource: TResource;
	index: number;
	arrayLength: number;
	referenceType: ReferenceTypeEnum | ResourceBlocksEnum;
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

	return getComponent(referenceType, resource, index, arrayLength, theme, classes, resourceBackground);
};

export default RenderResource;
