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
		<Container fluid style={{background: '#f4f4f4', width: '100%'}}>
			<Group position='center' py={50}>
				{children}
			</Group>
		</Container>
	);
};

export default ImageContainer;
