import {AspectRatio, Container, createStyles, Group} from '@mantine/core';
import React from 'react';

type ImageContainerProps = {
	fluid?: boolean;
	ratio?: number;
	background?: string;
	children: React.ReactNode;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
	ratio = 1,
	fluid = false,
	background = '#F4F4F4',
	children,
}) => {
	const useStyles = createStyles(() => ({
		imageContainer: {
			background,
			width: '100%',
			height: '100%',
			padding: fluid ? 0 : 50,
		},
		center: {
			display: 'grid',
			placeItems: 'center',
		},
	}));

	const {classes} = useStyles();

	return (
		<Container fluid className={classes.imageContainer}>
			<AspectRatio ratio={ratio} sx={{width: '100%', height: '100%'}} mx='auto'>
				{children}
			</AspectRatio>
		</Container>
	);
};

export default ImageContainer;
