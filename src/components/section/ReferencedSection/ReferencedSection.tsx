import React from 'react';
import {Button, Group, Anchor, Accordion, Text} from '@mantine/core';
import Expanded from 'components/common/Expanded/Expanded';
import {Link} from 'gatsby';
import {type IReferencedSection, ReferenceTypeEnum, ResourceBlocksEnum} from 'types/section';
import {getLink} from 'utils/getLink';
import slugify from 'slugify';
import {getWindowProperty} from 'utils/getWindowProperty';
import * as FullStory from '@fullstory/browser';
import {isProduction} from 'utils/isProduction';
import mixpanel from 'mixpanel-browser';
import PageContext from 'contexts/PageContext';
import {FIELD_PAGE, PATIENTS_PAGE} from 'constants/page';
import ReferencedSectionTitle from './ReferencedSectionTitle';
import ReferencedSectionBody from './ReferencedSectionBody';
import {getSectionColors} from './RenderResource';

import * as classes from './referencedSection.module.css';
import {getColorFromStylingOptions} from 'utils/stylingOptions';

type ReferencedSectionProps = {
	section: IReferencedSection;
	isEmbedFormTemplate: boolean;
	isPreviousBackgroundPure: boolean;
};

/**
 * ReferencedSection is a Section Component that renders referenced resources.
 * @param props - {section} Section to be reference rendered
 * @returns Referenced Resources
 */

const ReferencedSection: React.FC<ReferencedSectionProps> = ({
	section,
	isEmbedFormTemplate,
	isPreviousBackgroundPure,
}) => {
	const params = new URLSearchParams(getWindowProperty('location.search', {}));
	const GRID_COLUMNS = 100;
	const SPAN_LG = GRID_COLUMNS / section.references.length;
	const {link, isExternal} = getLink(section);
	const context = React.useContext(PageContext);

	React.useEffect(() => {
		try {
			const isFromSMSIntro = params.get('isFromSMSIntro');
			if (
				section.referenceType === ReferenceTypeEnum['Stats Card with Arrows']
				&& isFromSMSIntro === 'true'
				&& isProduction
			) {
				mixpanel.init(process.env.GATSBY_MIXPANEL_TOKEN ?? '');
				FullStory.init({orgId: process.env.GATSBY_FULLSTORY_ORG_ID ?? ''});
				mixpanel.track('PhilIntro_SMS_Clicked');
			}
		} catch (error: unknown) {
			console.log(error);
		}
	}, []);

	// TODO: Refactor Get grid span based on resource type
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

	const isNewsLetterComponent = section.references.some(ref =>
		ref?.metadata?.tags?.some(tag => tag.name === 'Newsletter Component'),
	);

	const isFaqSection = section.references.some(ref => ref?.body?.references?.some(reff => reff?.isFaq));

	return (
		<Expanded
			id={slugify(section.header ?? section.id, {lower: true, strict: true})}
			background={section.v2flag ? getColorFromStylingOptions(section?.stylingOptions?.background) : background}
			fullWidth={section.referenceType === ReferenceTypeEnum['Image Carousel']}
			data-context={context.title}
			data-is-newsletter-component={isNewsLetterComponent}
			data-disable-border-top={!isPreviousBackgroundPure}
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
					{!isNewsLetterComponent && Boolean(section.header?.length) && Boolean(!section.hideHeader) && (
						<ReferencedSectionTitle
							section={section}
							isEmbedFormTemplate={isEmbedFormTemplate}
							textColor={textColor}
						/>
					)}

					<ReferencedSectionBody getSpan={getSpan} section={section} />
				</>
			)}

			{section.subHeading
				&& section.referenceType === ReferenceTypeEnum['Stepper Cards']
				&& context.title === PATIENTS_PAGE && (
				<Group className={classes.subHeading} data-reference-type={section.referenceType} justify='center'>
					<Text>{section.subHeading.subHeading}</Text>
				</Group>
			)}

			{/* bottom buttons */}
			{Boolean(section.buttonText?.length) && (Boolean(section.externalLink) || Boolean(section.internalLink)) && (
				<Group justify='center' mt={isFaqSection ? 80 : 44}>
					{isExternal ? (
						<Anchor href={link} target='_blank'>
							<Button variant='philDefault'>{section.buttonText}</Button>
						</Anchor>
					) : (
						<Link to={link}>
							<Button variant='philDefault'>{section.buttonText}</Button>
						</Link>
					)}
				</Group>
			)}
		</Expanded>
	);
};

export default ReferencedSection;
