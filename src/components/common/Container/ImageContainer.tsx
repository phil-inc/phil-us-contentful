import {Container, createStyles, Group} from '@mantine/core';
import React from 'react';

type ImageContainerProps = {
	fluid?: boolean;
	children: React.ReactNode;
};

const ImageContainer: React.FC<ImageContainerProps> = ({fluid = false, children}) => {
	const useStyles = createStyles(() => ({
		imageContainer: {
			background: '#F4F4F4',
			width: '100%',
			height: '100%',
			padding: fluid ? 0 : 50,
		},
	}));

	const {classes} = useStyles();

	return (
		<Container fluid className={classes.imageContainer}>
			<Group position='center'>{children}</Group>
		</Container>
	);
};

export default ImageContainer;
