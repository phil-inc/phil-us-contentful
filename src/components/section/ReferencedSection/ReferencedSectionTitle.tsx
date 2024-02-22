import React, {useContext} from 'react';
import {Box, Title, Divider, Stack, type TitleOrder} from '@mantine/core';
import {useMantineTheme} from '@mantine/core';
import {RESOURCE_BLOCKS} from 'constants/section';
import {handleSpacing} from 'utils/handleSpacing';
import {ReferenceTypeEnum, type IReferencedSection} from 'types/section';

import * as classes from './referencedSectionTitle.module.css';
import PageContext from 'contexts/PageContext';
import {PATIENTS_PAGE} from 'constants/page';

type ReferencedSectionTitleProps = {
	section: IReferencedSection;
	isEmbedFormTemplate: boolean;
	textColor: string;
};

const ReferencedSectionTitle: React.FC<ReferencedSectionTitleProps> = ({section, isEmbedFormTemplate, textColor}) => {
	const theme = useMantineTheme();
	const {title} = useContext(PageContext);

	const renderTitle = (text: string, order?: TitleOrder, className?: string) => (
		<Title data-context={title} className={className} order={order}>
			{text}
		</Title>
	);

	switch (true) {
		// Handle referenced sections in /resources page
		case RESOURCE_BLOCKS.includes(section.referenceType):
			return (
				<Box mb={handleSpacing(theme, theme.spacing.md)}>
					{renderTitle(section.header, 3, undefined)}
					<Divider variant="dashed" size={1} className={classes.divider} />
				</Box>
			);

		// TODO: Refactor this
		// Handle referenced sections in code snippet section
		// case section.referenceType === ReferenceTypeEnum['Code Snippet']:
		// case section.referenceType === ReferenceTypeEnum['Brand Outcome Card']:
		// case section.referenceType === ReferenceTypeEnum['Cell']:
		// 	return (
		// 		<Stack
		// 			className={classes.codeSnippetStack}
		// 			mb={isEmbedFormTemplate ? 48 : undefined}
		// 			data-reference-type={section.referenceType}
		// 		>
		// 			{Boolean(section.header?.length) && renderTitle(section.header, 2, classes.heading)}
		// 			{Boolean(section.subHeading?.subHeading?.length) &&
		// 				renderTitle(section.subHeading.subHeading, 3, classes.subHeading)}
		// 		</Stack>
		// 	);
		default:
			return (
				<Stack
					className={classes.stack}
					mb={isEmbedFormTemplate ? 48 : undefined}
					data-reference-type={section.referenceType}
					data-context={title}
				>
					{Boolean(section.header?.length) && renderTitle(section.header, 2, classes.heading)}
					{Boolean(section.subHeading?.subHeading?.length) &&
						title !== PATIENTS_PAGE &&
						section.referenceType !== ReferenceTypeEnum['Stepper Cards'] &&
						renderTitle(section.subHeading.subHeading, 3, classes.subHeading)}
				</Stack>
			);
	}
};

export default ReferencedSectionTitle;
