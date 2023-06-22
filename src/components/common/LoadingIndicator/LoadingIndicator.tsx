import React from 'react';
import {Center, Loader, Text, type MantineSize, Stack} from '@mantine/core';

const LoadingIndicator: React.FC<{size: MantineSize}> = ({size}) => (
	<Center style={{height: '80%'}}>
		<Stack align='center'>
			<Loader size={size} />
			<Text>Loading...</Text>
		</Stack>
	</Center>
);

export default LoadingIndicator;
