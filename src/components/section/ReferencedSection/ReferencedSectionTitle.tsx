import React from 'react';
import {Box, Title, Divider, Stack, Group, type TitleOrder, Text} from '@mantine/core';
import {useMantineTheme} from '@mantine/core';
import {RESOURCE_BLOCKS} from 'constants/section';
import {handleSpacing} from 'utils/handleSpacing';
import {ReferenceTypeEnum, type IReferencedSection} from 'types/section';

import * as classes from './referencedSectionTitle.module.css';

type ReferencedSectionTitleProps = {
	section: IReferencedSection;
	isEmbedFormTemplate: boolean;
	textColor: string;
};

const ReferencedSectionTitle: React.FC<ReferencedSectionTitleProps> = ({section, isEmbedFormTemplate, textColor}) => {
	const theme = useMantineTheme();

	const renderTitle = (text: string, order?: TitleOrder, className?: string) => (
		<Title className={className} order={order}>
			{text}
		</Title>
		// <Stack>

		/* {section.subHeading && (
				<Group justify="center" mt={40}>
					<Text className={classes.subHeading}>{section.subHeading.subHeading}</Text>
				</Group>
			)} */
		// </Stack>
	);

	switch (true) {
		// Handle referenced sections in /resources page
		case RESOURCE_BLOCKS.includes(section.referenceType):
			return (
				<Box mb={handleSpacing(theme, theme.spacing.md)}>
					{renderTitle(section.header, 3, undefined)}
					<Divider variant='dashed' size={1} className={classes.divider} />
				</Box>
			);

		// Handle referenced sections in code snippet section
		case section.referenceType === ReferenceTypeEnum['Code Snippet']:
		case section.referenceType === ReferenceTypeEnum['Brand Outcome Card']:
			return (
				<Stack
					className={classes.codeSnippetStack}
					mb={isEmbedFormTemplate ? 48 : undefined}
					data-reference-type={section.referenceType}
				>
					{Boolean(section.header?.length) && renderTitle(section.header, 2, classes.heading)}
					{Boolean(section.subHeading?.subHeading?.length)
						&& renderTitle(section.subHeading.subHeading, 3, classes.subHeading)}
				</Stack>
			);
		default:
			return (
				<Group justify='center'>
					{Boolean(section.header?.length) && renderTitle(section.header, 2, classes.textColor)}
				</Group>
			);
	}
};

export default ReferencedSectionTitle;
