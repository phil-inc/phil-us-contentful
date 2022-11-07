import {AspectRatio, Container, createStyles, Group, useMantineTheme} from '@mantine/core';
import React from 'react';

type ImageContainerProps = {
	fluid?: boolean;
	ratio?: number;
	background?: string;
	children: React.ReactNode;
	expanded?: boolean;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
	ratio = 1,
	fluid = false,
	background = '#F4F4F4',
	children,
	expanded = false,
}) => {
	const useStyles = createStyles(theme => ({
		imageContainer: {
			background,
			height: '100%',
			padding: fluid ? 0 : 50,
			maxWidth: expanded ? '50vw' : '100%',
			width: expanded ? '50vw' : '100%',
			position: expanded ? 'absolute' : null,
			top: expanded ? '90px' : null,
			right: expanded ? 0 : null,

			[theme.fn.smallerThan('lg')]: {
				maxWidth: '100%',
				width: '100%',
				marginTop: 0,
				marginRight: 0,
			},

			[theme.fn.smallerThan('md')]: {
				position: 'static',
			},
		},
		center: {
			display: 'grid',
			placeItems: 'center',
		},
	}));

	const {classes} = useStyles();

	return (
		<Container fluid className={classes.imageContainer}>
			<AspectRatio ratio={ratio} sx={{width: '100%', height: '100%'}}>
				{children}
			</AspectRatio>
		</Container>
	);
};

export default ImageContainer;
