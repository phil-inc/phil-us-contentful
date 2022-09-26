import React from 'react';
import {Container, createStyles} from '@mantine/core';
import classNames from 'classnames';

type ExpandedProps = {
	children: React.ReactNode;
	background?: string;
	minHeight?: number | string;
};

const Expanded: React.FC<ExpandedProps> = ({children, background = '#F4F4F4', minHeight = '100%'}) => {
	const useStyles = createStyles(theme => ({
		container: {
			background,
			minHeight,
			maxWidth: 1920,
			width: '100vw',
			padding: 116,
			marginLeft: -116,
			marginBottom: 100,
		},
	}));

	const {classes} = useStyles();

	return (
		<Container fluid className={classes.container}>
			{children}
		</Container>
	);
};

export default Expanded;
