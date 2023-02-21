import {Anchor, Box, Button, Grid, Text} from '@mantine/core';
import React from 'react';

type CareerArticleProps = {
	title: string;
	url: string;
	location: string;
};

const CareerArticle = ({title, url, location}: CareerArticleProps) => (
	<Grid align='center' gutter='sm' justify='end'>
		<Grid.Col xs={12} sm={9} lg={9}>
			<Box>
				<Text size={18} weight='bold'>
					{title}
				</Text>
				<Text size={18} italic>
					{location}
				</Text>
			</Box>
		</Grid.Col>
		<Grid.Col xs={12} sm={2} lg={3} offsetSm={1} offsetLg={0}>
			<Anchor href={url} target='_blank'>
				<Button>View details</Button>
			</Anchor>
		</Grid.Col>
	</Grid>
);

export default React.memo(CareerArticle);
