import React from 'react';
import {Container, createStyles} from '@mantine/core';
import classNames from 'classnames';

type ExpandedProps = {
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
			maxWidth: '2140px',
			width: '100vw',
			padding: '116px',
			marginLeft: -133,

			// Dynamic media queries, define breakpoints in theme, use anywhere
			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				padding: '0 16px',
				marginLeft: -33,
			},
		},
	}));

	const {classes} = useStyles();

	return (
		<Container fluid className={classes.container} py={py}>
			{children}
		</Container>
	);
};

export default Expanded;
