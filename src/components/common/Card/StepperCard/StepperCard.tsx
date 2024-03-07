import {Box, Paper, Text, Title} from '@mantine/core';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import {type TResource} from 'types/resource';
import {BLOCKS, MARKS, INLINES} from '@contentful/rich-text-types';

import * as classes from './stepperCard.module.css';
import {getColorFromStylingOptions} from 'utils/stylingOptions';

type StepperCardProps = {
	resource: TResource;
	arrayLength: number;
	index: number;
};

const StepperCard: React.FC<StepperCardProps> = ({resource, index, arrayLength}) => {
	const options = {
		renderMark: {
			[MARKS.BOLD]: text => <>{text}</>,
			[MARKS.ITALIC]: text => <>{text}</>,
		},
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text className={classes.paragraph}>{children}</Text>;
			},
			[BLOCKS.UL_LIST](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.OL_LIST](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.LIST_ITEM](node, children) {
				return <>{children}</>;
			},
			[INLINES.HYPERLINK](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.HEADING_1](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.HEADING_2](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.HEADING_3](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.HEADING_4](node, children) {
				return <>{children}</>;
			},
		},
	};

	return (
		<Paper
			style={{background: getColorFromStylingOptions(resource.stylingOptions.background)}}
			className={classes.paper}
			data-last-child={index === arrayLength - 1}
		>
			<Title className={classes.heading} order={3}>
				{resource.heading}
			</Title>
			<Box mt={32}>{resource.body && renderRichText(resource.body, options)}</Box>
		</Paper>
	);
};

export default StepperCard;
