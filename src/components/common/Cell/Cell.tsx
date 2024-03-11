import React from 'react';
import {type TResource} from 'types/resource';
import {Box, Stack, Title} from '@mantine/core';
import {renderRichText} from 'gatsby-source-contentful/rich-text';

import * as classes from './cell.module.css';
import {getColorFromStylingOptions} from 'utils/stylingOptions';

type CellProps = {
	resource: TResource;
};

const Cell: React.FC<CellProps> = ({resource}) => (
	<Stack h='100%' gap={0}>
		<Box
			style={{background: getColorFromStylingOptions(resource?.stylingOptions?.extraColor)}}
			className={classes.cellHeaderWrapper}
		>
			<Title order={3} className={classes.cellHeader}>
				{resource.heading}
			</Title>
		</Box>
		<Box
			style={{background: getColorFromStylingOptions(resource?.stylingOptions?.background)}}
			className={classes.cellDetails}
		>
			{resource?.body && renderRichText(resource.body)}
		</Box>
	</Stack>
);

export default Cell;
