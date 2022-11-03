import {Anchor, Box, Button, Container, Grid, Group, Text} from '@mantine/core';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {TResource} from 'types/resource';
import {BLOCKS} from '@contentful/rich-text-types';
import {getLink} from 'utils/getLink';
import {Link} from 'gatsby';

type CareerArticleProps = {
	title: string;
	url: string;
	location: string;
};

const CareerArticle = ({title, url, location}: CareerArticleProps) => (
	<Grid align={'center'} justify={'space-between'}>
		<Grid.Col lg={'content'} sm={'content'}>
			<Box>
				<Text size={18} weight='bold'>
					{title}
				</Text>
				<Text size={18} italic>
					{location}
				</Text>
			</Box>
		</Grid.Col>
		<Grid.Col lg={'content'} sm={'content'}>
			<Anchor href={url} target='_blank'>
				<Button>View details</Button>
			</Anchor>
		</Grid.Col>
	</Grid>
);

export default CareerArticle;
