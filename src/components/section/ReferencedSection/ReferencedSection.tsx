import React from 'react';
import {Button, Group, Anchor, createStyles, Accordion} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import {Link} from 'gatsby';
import {type IReferencedSection, ReferenceTypeEnum, ResourceBlocksEnum} from 'types/section';
import {getLink} from 'utils/getLink';
import slugify from 'slugify';
import {handleSpacing} from 'utils/handleSpacing';
import {getWindowProperty} from 'utils/getWindowProperty';
import * as FullStory from '@fullstory/browser';
import {isProduction} from 'utils/isProduction';
import mixpanel from 'mixpanel-browser';
import PageContext from 'contexts/PageContext';
import {FIELD_PAGE} from 'constants/page';
import ReferencedSectionTitle from './ReferencedSectionTitle';
import ReferencedSectionBody from './ReferencedSectionBody';
import {getSectionColors} from './RenderResource';

const useStyles = createStyles(theme => ({
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
	isEmbedFormTemplate: boolean;
};

/**
 * ReferencedSection is a Section Component that renders referenced resources.
 * @param props - {section} Section to be reference rendered
 * @returns Referenced Resources
 */

const ReferencedSection: React.FC<ReferencedSectionProps> = ({section, isEmbedFormTemplate}) => {
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

	// Get grid span based on resource type
	const getSpan = (referenceType: string): {xl: number; lg: number; md: number; sm: number; xs?: number} => {
		switch (referenceType) {
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

	const [background, textColor] = getSectionColors(section.referenceType);

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
							<ReferencedSectionTitle
								isEmbedFormTemplate={isEmbedFormTemplate}
								section={section}
								textColor={textColor}
							/>
						</Accordion.Control>
						<Accordion.Panel>
							<ReferencedSectionBody getSpan={getSpan} section={section} />
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			) : (
				<>
					{Boolean(section.header?.length) && Boolean(!section.hideHeader) && (
						<ReferencedSectionTitle
							section={section}
							isEmbedFormTemplate={isEmbedFormTemplate}
							textColor={textColor}
						/>
					)}
					<ReferencedSectionBody getSpan={getSpan} section={section} />
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
