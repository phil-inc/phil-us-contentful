import {Box, Divider, Title} from '@mantine/core';
import React from 'react';
import type {Listing} from 'types/careerPage';
import CareerArticle from './CareerArticle';

type CareerBlockProps = {
	title: string;
	listings: Listing[];
};

const CareerBlock: React.FC<CareerBlockProps> = ({title, listings}) => (
	<>
		<Title order={3}>{title}</Title>
		<Divider variant="dashed" size={2} my={10} mb={32} />
		{Boolean(listings) &&
			listings.map(listing => (
				<Box mb={50}>
					<CareerArticle title={listing.title} location={listing.location} link={listing.link} />
				</Box>
			))}
	</>
);

export default CareerBlock;
