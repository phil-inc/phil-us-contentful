import {AspectRatio, Container, createStyles, Group} from '@mantine/core';
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
	const useStyles = createStyles(() => ({
		imageContainer: {
			background,
			maxWidth: expanded ? '112%' : '100%',
			width: expanded ? '112%' : '100%',
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
		<Container
			fluid
			className={classes.imageContainer}
			mr={expanded ? '-12.18%' : null}
			mt={expanded ? '-15.57%' : null}
		>
			<AspectRatio ratio={ratio} sx={{width: '100%', height: '100%'}}>
				{children}
			</AspectRatio>
		</Container>
	);
};

export default ImageContainer;
