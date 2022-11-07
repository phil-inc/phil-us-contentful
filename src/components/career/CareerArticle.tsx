import {Anchor, Box, Button, Grid, Text} from '@mantine/core';
import React from 'react';

type CareerArticleProps = {
	title: string;
	url: string;
	location: string;
};

const CareerArticle = ({title, url, location}: CareerArticleProps) => (
	<Grid align={'center'} justify={'space-between'}>
		<Grid.Col span={8}>
			<Box>
				<Text size={18} weight='bold'>
					{title}
				</Text>
				<Text size={18} italic>
					{location}
				</Text>
			</Box>
		</Grid.Col>
		<Grid.Col span={4}>
			<Anchor href={url} target='_blank'>
				<Button>View details</Button>
			</Anchor>
		</Grid.Col>
	</Grid>
);

export default CareerArticle;
