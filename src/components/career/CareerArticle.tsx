import {Box, Button, Container, Group, Text} from '@mantine/core';
import React from 'react';

type CareerArticleProps = {
	title: string;
	location: string;
	link: string;
};

const CareerArticle: React.FC<CareerArticleProps> = ({title, location, link}) => (
	<Group position="apart">
		<Box>
			<Text>{title}</Text>
			<Text>{location}</Text>
		</Box>

		<Button color="dark">View Details</Button>
	</Group>
);

export default CareerArticle;
