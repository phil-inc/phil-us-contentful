import {Container, createStyles, Group} from '@mantine/core';
import React from 'react';

const useStyles = createStyles(() => ({
	iamgeContainer: {
		background: '#F4F4F4',
		maxWidth: 816,
		maxHeight: 816,
		padding: 50,
	},
}));

type ImageContainerProps = {
	children: React.ReactNode;
};

const ImageContainer: React.FC<ImageContainerProps> = ({children}) => {
	const {classes} = useStyles();

	return (
		<Container fluid className={classes.iamgeContainer}>
			<Group position='center'>{children}</Group>
		</Container>
	);
};

export default ImageContainer;
