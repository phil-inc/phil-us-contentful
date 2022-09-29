import {Container, createStyles, Group} from '@mantine/core';
import React from 'react';

const useStyles = createStyles(() => ({
	iamgeContainer: {
		background: '#F4F4F4',
	},
}));

type ImageContainerProps = {
	children: React.ReactNode;
};

const ImageContainer: React.FC<ImageContainerProps> = ({children}) => {
	const {classes} = useStyles();

	return (
		<Container fluid className={classes.iamgeContainer}>
			<Group position='center' py={50}>
				{children}
			</Group>
		</Container>
	);
};

export default ImageContainer;
