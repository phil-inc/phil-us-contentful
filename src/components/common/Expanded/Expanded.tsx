import React from 'react';
import {Container, createStyles} from '@mantine/core';
import {handleSpacing} from 'utils/handleSpacing';
import PageContext from 'contexts/PageContext';

type ExpandedProps = {
	id: string;
	children: React.ReactNode;
	background?: string;
	minHeight?: number | string;
	noMargin?: boolean;
	py?: number;
	px?: number;
	pt?: number;
	pb?: number;
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
	mb,
	noMargin = false,
	py,
	pt,
	pb,
	px,
	fullWidth = false,
}) => {
	const context = React.useContext(PageContext);

	const useStyles = createStyles(theme => ({
		container: {
			background,
			minHeight,
			maxWidth: '100%',
			width: '100vw',
			padding: '100px 100px 92px 100px',

			[theme.fn.smallerThan('md')]: {
				padding: context.title === 'Field' ? '0px 100px' : '42px 100px',
			},

			[theme.fn.smallerThan('sm')]: {
				padding: context.title === 'Field' ? '0px 16px' : '42px 16px',
			},
		},
	}));

	const {classes} = useStyles();

	return (
		<Container
			id={id}
			fluid
			className={classes.container}
			py={py}
			pt={pt}
			pb={pb}
			mb={mb}
			px={px ? px : fullWidth ? 0 : undefined}
		>
			{children}
		</Container>
	);
};

export default React.memo(Expanded);
