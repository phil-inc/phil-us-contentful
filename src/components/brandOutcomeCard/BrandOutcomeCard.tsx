import {Title, Text, Box, Paper, Stack, Group} from '@mantine/core';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';
import {BLOCKS, MARKS, INLINES} from '@contentful/rich-text-types';

import * as classes from './brandOutcomeCard.module.css';
import {getColorFromStylingOptions} from 'utils/stylingOptions';

type StyleProps = {
	arrow: boolean;
};

type StatsCardProps = {
	resource: TResource;
};

/**
 * StatsCard is a Component to render a StatsCard
 * @param props - {resource} StatsCard Resource with asset, heading, body
 * @returns StatsCard Component
 */
export const BrandOutcomeCard: FC<StatsCardProps> = ({resource}) => {
	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return <>{children}</>;
			},
		},
	};

	return (
		<Group h='100%' gap={0}>
			<Box
				component='span'
				h='100%'
				w={getColorFromStylingOptions(resource?.stylingOptions?.extraColor) !== 'transparent' ? 12 : 0}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.extraColor)}}
			></Box>
			<Paper className={classes.paper}>
				<Stack justify='center' align='start' className={classes.stack} gap={40}>
					{resource.heading && <Title className={classes.title}>{resource.heading}</Title>}

					{resource.body && <Text className={classes.description}>{renderRichText(resource.body, options)}</Text>}
				</Stack>
			</Paper>
		</Group>
	);
};
