import React from 'react';
import {Container, createStyles} from '@mantine/core';
import {handleSpacing} from 'utils/handleSpacing';

type ExpandedProps = {
	id: string;
	children: React.ReactNode;
	background?: string;
	minHeight?: number | string;
	noMargin?: boolean;
	py?: number;
	pt?: number;
	mb?: number;
	fullWidth?: boolean;
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
	mb = 0,
	noMargin = false,
	py = 0,
	pt = 0,
	fullWidth = false,
}) => {
	const useStyles = createStyles(theme => ({
		container: {
			background,
			minHeight,
			maxWidth: '100%',
			width: '100vw',
			padding: '100px 100px 92px 100px',

			[theme.fn.smallerThan('md')]: {
				padding: '42px 100px',
			},

			[theme.fn.smallerThan('sm')]: {
				padding: '42px 16px',
			},
		},
	}));

	const {classes} = useStyles();

	return (
		<Container id={id} fluid className={classes.container} py={py} pt={Boolean(pt) && pt} px={fullWidth ? 0 : null}>
			{children}
		</Container>
	);
};

export default React.memo(Expanded);
