import React from 'react';
import {Container, createStyles} from '@mantine/core';
import classNames from 'classnames';

type ExpandedProps = {
	id: string;
	children: React.ReactNode;
	background?: string;
	minHeight?: number | string;
	noMargin?: boolean;
	py?: number;
};

/**
 * Expanded is a full width section component wrapper
 * @param props - Expanded props
 * @returns A section component with a expanded container
 */
const Expanded: React.FC<ExpandedProps> = ({
	id,
	children,
	background = '#FFFFFF',
	minHeight = '100%',
	noMargin = false,
	py = 0,
}) => {
	const useStyles = createStyles(theme => ({
		container: {
			background,
			minHeight,
			maxWidth: '100%',
			width: '100vw',
			padding: '0 116px',

			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				padding: '116px 16px',
			},
		},
	}));

	const {classes} = useStyles();

	return (
		<Container id={id} fluid className={classes.container} py={py}>
			{children}
		</Container>
	);
};

export default Expanded;
