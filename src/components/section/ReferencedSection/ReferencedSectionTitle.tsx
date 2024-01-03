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

	const renderTitle = (
		text: string,
		size: number | undefined,
		className?: string,
		order?: TitleOrder,
		textColor?: string
	) => (
		<Stack>
			<Title className={className} order={order} size={size} c={textColor}>
				{text}
			</Title>
			{section.subHeading && (
				<Group justify="center" mt={40}>
					<Text className={classes.subHeading}>{section.subHeading.subHeading}</Text>
				</Group>
			)}
		</Stack>
	);

	switch (true) {
		// Handle referenced sections in /resources page
		case RESOURCE_BLOCKS.includes(section.referenceType):
			return (
				<Box mb={handleSpacing(theme, theme.spacing.md)}>
					{renderTitle(section.header, 35, undefined, 3, undefined)}
					<Divider variant="dashed" size={1} className={classes.divider} />
				</Box>
			);

		// Handle referenced sections in code snippet section
		case section.referenceType === ReferenceTypeEnum['Code Snippet']:
			return (
				<Stack
					className={classes.codeSnippetStack}
					justify="flex-start"
					// TODO: handle code snippet block
					// spacing={0}
					mb={isEmbedFormTemplate ? 48 : undefined}
				>
					{Boolean(section.header?.length) && renderTitle(section.header, 36, classes.heading, 2, undefined)}
					{Boolean(section?.subHeading?.subHeading?.length) &&
						renderTitle(section.subHeading.subHeading, 20, classes.subHeading, 3, undefined)}
				</Stack>
			);
		default:
			return (
				<Group justify="center">
					{Boolean(section.header?.length) && renderTitle(section.header, undefined, undefined, 2, textColor)}
				</Group>
			);
	}
};

export default ReferencedSectionTitle;
