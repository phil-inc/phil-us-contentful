import {Anchor, Box, Button, Grid, Text} from '@mantine/core';
import React from 'react';

import * as classes from './careerArticle.module.css';

type CareerArticleProps = {
	title: string;
	url: string;
	location: string;
};

const CareerArticle = ({title, url, location}: CareerArticleProps) => (
	<Grid align='center' gutter='sm' justify='end'>
		<Grid.Col span={{base: 12, xs: 12, sm: 8, lg: 8}}>
			<Box>
				<Text unstyled className={classes.title}>
					{title}
				</Text>
				<Text unstyled className={classes.location}>
					{location}
				</Text>
			</Box>
		</Grid.Col>
		<Grid.Col span={{base: 12, xs: "auto"}} offset={{sm: 1, lg: 0}}>
			<Anchor href={url} target='_blank' referrerPolicy='no-referrer'>
				<Button variant='philDefault'>View details</Button>
			</Anchor>
		</Grid.Col>
	</Grid>
);

export default CareerArticle;
