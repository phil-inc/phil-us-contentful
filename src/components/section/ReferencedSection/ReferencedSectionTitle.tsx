import React from 'react';
import {Box, Title, Divider, Stack, Group, createStyles, type TitleOrder} from '@mantine/core';
import {useMantineTheme} from '@mantine/core';
import {RESOURCE_BLOCKS} from 'constants/section';
import {handleSpacing} from 'utils/handleSpacing';
import {ReferenceTypeEnum, type IReferencedSection} from 'types/section';

type ReferencedSectionTitleProps = {
	section: IReferencedSection;
	isEmbedFormTemplate: boolean;
	textColor: string;
};

const useStyles = createStyles(theme => ({
	divider: {
		maxWidth: '35%',
		marginTop: '10px',
		marginBottom: '64px',
	},
	heading: {
		lineHeight: '1.2',
		color: '#000000',
	},
	subHeading: {
		fontFamily: 'Lato, sans-serif',
		fontWeight: 400,
		color: '#01201F',
	},
	codeSnippetStack: {
		alignItems: 'flex-start',
	},
}));

const ReferencedSectionTitle: React.FC<ReferencedSectionTitleProps> = ({section, isEmbedFormTemplate, textColor}) => {
	const theme = useMantineTheme();
	const {classes} = useStyles();

	const renderTitle = (size: number | undefined, className?: string, order?: TitleOrder, textColor?: string) => (
		<Title className={className} order={order} size={size} color={textColor}>
			{section.header}
		</Title>
	);

	switch (true) {
		// Handle referenced sections in /resources page
		case RESOURCE_BLOCKS.includes(section.referenceType):
			return (
				<Box mb={handleSpacing(theme, theme.spacing.md)}>
					{renderTitle(35, undefined, 3)}
					<Divider variant='dashed' size={1} className={classes.divider} />
				</Box>
			);

		// Handle referenced sections in code snippet section
		case section.referenceType === ReferenceTypeEnum['Code Snippet']:
			return (
				<Stack
					className={classes.codeSnippetStack}
					justify='flex-start'
					spacing={0}
					mb={isEmbedFormTemplate ? 48 : undefined}
				>
					{Boolean(section.header?.length) && renderTitle(36, classes.heading, 2)}
					{Boolean(section?.subHeading?.subHeading?.length) && renderTitle(20, classes.subHeading, 3)}
				</Stack>
			);
		default:
			return (
				<Group position='center' mb={28}>
					{Boolean(section.header?.length) && renderTitle(undefined, undefined, 2, textColor)}
				</Group>
			);
	}
};

export default ReferencedSectionTitle;
