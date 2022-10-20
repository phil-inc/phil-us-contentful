import {Box, Divider, Title, Text} from '@mantine/core';
import React from 'react';
import type {TResource} from 'types/resource';
import CareerArticle from './CareerArticle';

type CareerBlockProps = {
	title: string;
	listings: TResource[];
};

const CareerBlock: React.FC<CareerBlockProps> = ({title, listings}) => (
	<>
		<Title order={3}>
			<Text>{title}</Text>
		</Title>
		<Divider variant='dashed' size={2} my={10} mb={32} />
		{Boolean(listings)
			&& listings.map(listing => (
				<Box mb={50}>
					<CareerArticle listing={listing} />
				</Box>
			))}
	</>
);

export default CareerBlock;
