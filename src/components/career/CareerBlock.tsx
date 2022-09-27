import {Box, Divider, Title} from '@mantine/core';
import React from 'react';
import CareerArticle from './CareerArticle';

type CareerBlockProps = {
	title: string;
};

const CareerBlock: React.FC<CareerBlockProps> = ({title}) => (
	<Box mb={50}>
		<Title order={3}>{title}</Title>
		<Divider variant='dashed' size={2} my={10} mb={32} />
		<CareerArticle title='Wholesale Pharmacy Technician' location='San Leandro, California, United States' link='#' />
	</Box>
);

export default CareerBlock;
