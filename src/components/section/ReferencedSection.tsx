import React from 'react';
import {
	Grid,
	Title,
	Button,
	Group,
	Container,
	Box,
	Anchor,
	Divider,
	createStyles,
	Accordion,
	Stack,
} from '@mantine/core';
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
import type {TResource} from 'types/resource';
import {type IReferencedSection, ReferenceTypeEnum, ResourceBlocksEnum} from 'types/section';
import {getLink} from 'utils/getLink';
import slugify from 'slugify';
import {CardWithImage} from 'components/common/CardWithImage';
import Asset from 'components/common/Asset/Asset';
import {handleSpacing} from 'utils/handleSpacing';
import {getWindowProperty} from 'utils/getWindowProperty';
import * as FullStory from '@fullstory/browser';
import {isProduction} from 'utils/isProduction';
import mixpanel from 'mixpanel-browser';
import PageContext from 'contexts/PageContext';
import CodeSnippet from 'components/common/CodeSnippet/CodeSnippet';
import {RESOURCE_BLOCKS} from 'constants/section';
import {FIELD_PAGE} from 'constants/page';

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
	chevron: {
		svg: {
			width: 40,
			height: 40,
		},
	},

	label: {
		div: {
			justifyContent: 'start',
			marginBottom: 0,
			overflowWrap: 'anywhere',

			h2: {
				fontFamily: 'Raleway, sans-serif',
				fontSize: 'min(55px, calc(1.5rem + 0.31vw))',
			},
		},
	},

	control: {
		padding: 20,
		paddingLeft: 100,
		paddingRight: 100,
		borderBottom: '0px !important',

		[theme.fn.smallerThan('md')]: {
			padding: 20,
			paddingLeft: 20,
			paddingRight: 20,
		},
	},

	content: {
		paddingLeft: 105,
		paddingRight: 105,

		[theme.fn.smallerThan('md')]: {
			paddingLeft: 20,
			paddingRight: 20,
		},
	},

	item: {
		background: '#F4F4F4',

		'&[data-active]': {
			background: '#F4F4F4',
		},
	},

	heading: {
		lineHeight: '1.2',
		color: '#000000',

		[theme.fn.smallerThan('md')]: {
			textAlign: 'center',
			marginBottom: 10,
			paddingLeft: 20,
			paddingRight: 20,
		},
	},

	subHeading: {
		fontFamily: 'Lato, sans-serif',
		fontWeight: 400,
		color: '#01201F',

		[theme.fn.smallerThan('md')]: {
			textAlign: 'center',
			paddingLeft: 34,
			paddingRight: 34,
		},
	},

	codeSnippetStack: {
		alignItems: 'flex-start',

		[theme.fn.smallerThan('md')]: {
			alignItems: 'center',
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

const ReferencedSection: React.FC<ReferencedSectionProps> = ({section}) => {
	const params = new URLSearchParams(getWindowProperty('location.search', {}));
	const GRID_COLUMNS = 100;
	const SPAN_LG = GRID_COLUMNS / section.references.length;
	const {link, isExternal} = getLink(section);
	const {classes, theme} = useStyles();
	const context = React.useContext(PageContext);

	React.useEffect(() => {
		try {
			const isFromSMSIntro = params.get('isFromSMSIntro');
			if (section.referenceType === 'Stats Card with Arrows' && isFromSMSIntro === 'true' && isProduction) {
				mixpanel.init(process.env.GATSBY_MIXPANEL_TOKEN ?? '');
				FullStory.init({orgId: process.env.GATSBY_FULLSTORY_ORG_ID ?? ''});
				mixpanel.track('PhilIntro_SMS_Clicked');
			}
		} catch (error: unknown) {
			console.log(error);
		}
	}, []);

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

	// Get colors for resources based on resource type
	const getSectionColors = () => {
		switch (section.referenceType) {
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

	// Get grid span based on resource type
	const getSpan = (): {xl: number; lg: number; md: number; sm: number; xs?: number} => {
		switch (section.referenceType) {
			case ReferenceTypeEnum.Testimonial:
				return {xl: GRID_COLUMNS / 2, lg: GRID_COLUMNS, md: GRID_COLUMNS, sm: GRID_COLUMNS / 2};

			case ReferenceTypeEnum['Stats Card with Arrows']:
				return {
					xl: GRID_COLUMNS / 5,
					lg: GRID_COLUMNS / 3,
					md: GRID_COLUMNS / 3,
					sm: GRID_COLUMNS / 2,
					xs: GRID_COLUMNS / 2,
				};

			case ResourceBlocksEnum['Case Study']:
			case ResourceBlocksEnum['Phil Blog']:
			case ResourceBlocksEnum['Upcoming Events']:
			case ResourceBlocksEnum['White Paper']:
			case ReferenceTypeEnum['Featured Resource']:
				return {xl: GRID_COLUMNS / 2, lg: GRID_COLUMNS, md: GRID_COLUMNS, sm: GRID_COLUMNS};

			case ReferenceTypeEnum.FAQs:
				return {xl: GRID_COLUMNS / 2, lg: GRID_COLUMNS / 2, md: GRID_COLUMNS, sm: GRID_COLUMNS};

			case ReferenceTypeEnum['Team Member']:
				return {xl: GRID_COLUMNS / 4, lg: GRID_COLUMNS / 4, md: GRID_COLUMNS, sm: GRID_COLUMNS};

			case ReferenceTypeEnum.Investors:
				return {xl: GRID_COLUMNS / 5, lg: GRID_COLUMNS / 5, md: GRID_COLUMNS, sm: GRID_COLUMNS};

			default:
				return {xl: SPAN_LG, lg: SPAN_LG, md: GRID_COLUMNS, sm: GRID_COLUMNS};
		}
	};

	const [background, textColor, resourceBackground] = getSectionColors();

	// Render resource based on resource type
	// eslint-disable-next-line complexity
	const renderResource = (sectionHeader: string, resource: TResource, index: number, arrayLength: number) => {
		switch (section.referenceType) {
			case ReferenceTypeEnum['Code Snippet']:
				return <CodeSnippet resource={resource} />;

			case ReferenceTypeEnum.Article:
				return <Article color={getColor(index)} resource={resource} />;

			case ReferenceTypeEnum['Customer Story']:
			case ReferenceTypeEnum.Testimonial:
				return (
					<Testimonial type={section.referenceType === 'Testimonial' ? 'person' : 'company'} resource={resource} />
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
						noDivider={section.referenceType === 'Info Card'}
						pr={section.referenceType === 'Featured Resource' ? handleSpacing(theme, theme.spacing.lg) : 0}
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

	const ReferencedSectionTitle = () =>
		RESOURCE_BLOCKS.includes(section.referenceType) ? (
			<Box mb={handleSpacing(theme, theme.spacing.md)}>
				<Title order={3} size={35}>
					{section.header}
				</Title>
				<Divider variant='dashed' size={1} className={classes.divider} />
			</Box>
		) : section.referenceType === 'Code Snippet' ? (
			<Stack className={classes.codeSnippetStack} justify='flex-start' spacing={0}>
				{Boolean(section.header?.length) && (
					<Title className={classes.heading} order={2} size={36}>
						{section.header}
					</Title>
				)}
				{Boolean(section?.subHeading?.subHeading?.length) && (
					<Title className={classes.subHeading} order={3} size={20}>
						{section.subHeading.subHeading}
					</Title>
				)}
			</Stack>
		) : (
			<Group position='center' mb={28}>
				{Boolean(section.header?.length) && (
					<Title order={2} color={textColor}>
						{section.header}
					</Title>
				)}
			</Group>
		);

	const ReferencedSectionBody = () =>
		section.referenceType === ReferenceTypeEnum['Image Carousel'] ? (
			<ResourceCarousel imageCaraouselSection={section} />
		) : (
			<Grid
				grow={
					section.referenceType === ReferenceTypeEnum.Investors || section.referenceType === ReferenceTypeEnum.FAQs
				}
				columns={GRID_COLUMNS}
				gutter={section.referenceType === ReferenceTypeEnum['Stats Card with Arrows'] ? 20 : theme.spacing.md}
				m={section.referenceType === ReferenceTypeEnum.Banner ? -16 : 0}
				mx={section.referenceType === ReferenceTypeEnum.Banner ? -16 : -10}
			>
				{section.references.map((resource, index, array) => (
					<Grid.Col
						p={section.referenceType === ReferenceTypeEnum.Investors ? 0 : undefined}
						key={resource.id + 'mapReferencedSectionResource'}
						{...getSpan()}
					>
						{renderResource(section.header, resource, index, array.length)}
					</Grid.Col>
				))}
			</Grid>
		);

	return (
		<Expanded
			id={slugify(section.header ?? section.id, {lower: true, strict: true})}
			background={background}
			pt={
				context.title === FIELD_PAGE || section.referenceType === ReferenceTypeEnum['Code Snippet']
					? 0
					: handleSpacing(theme, 92)
			}
			pb={
				section.referenceType === ResourceBlocksEnum['Phil Blog']
				|| section.referenceType === ResourceBlocksEnum['Case Study']
				|| section.referenceType === ResourceBlocksEnum['White Paper']
				|| section.referenceType === ResourceBlocksEnum['Upcoming Events']
				|| context.title === FIELD_PAGE
					? 0
					: handleSpacing(theme, 92)
			}
			fullWidth={section.referenceType === ReferenceTypeEnum['Image Carousel']}
			py={section.referenceType === ReferenceTypeEnum.Banner ? 120 : undefined}
			px={section.referenceType === ReferenceTypeEnum.Banner ? 106 : undefined}
		>
			{context.title === FIELD_PAGE ? (
				<Accordion
					variant='separated'
					radius='xs'
					chevronPosition='left'
					mb={24}
					chevronSize={44}
					classNames={{
						chevron: classes.chevron,
						label: classes.label,
						control: classes.control,
						content: classes.content,
						item: classes.item,
					}}
				>
					<Accordion.Item value={section.id}>
						<Accordion.Control>
							<ReferencedSectionTitle />
						</Accordion.Control>
						<Accordion.Panel>
							<ReferencedSectionBody />
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			) : (
				<>
					{Boolean(section.header?.length) && Boolean(!section.hideHeader) && <ReferencedSectionTitle />}
					<ReferencedSectionBody />
				</>
			)}

			{/* bottom buttons */}
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
