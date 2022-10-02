import React from 'react';
import {Container, createStyles} from '@mantine/core';
import classNames from 'classnames';

type ExpandedProps = {
	children: React.ReactNode;
	background: string;
	minHeight?: number | string;
	noMargin?: boolean;
	py?: number;
};

const Expanded: React.FC<ExpandedProps> = ({children, background, minHeight = '100%', noMargin = false, py = 0}) => {
	const useStyles = createStyles(theme => ({
		container: {
			background,
			minHeight,
			maxWidth: 1920,
			width: '100vw',
			padding: '116px 116px',
			marginLeft: -116,
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
