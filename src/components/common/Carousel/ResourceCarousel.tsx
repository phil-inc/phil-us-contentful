import {Carousel} from '@mantine/carousel';
import {useMediaQuery} from '@mantine/hooks';
import {createStyles, Paper, Text, Title, Button, useMantineTheme, Grid} from '@mantine/core';
import React from 'react';
import type {FC} from 'react';
import classNames from 'classnames';
import type {TAsset} from 'types/asset';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {IReferencedSection} from 'types/section';

type ResourceCarouselProps = {
	imageCaraouselSection: IReferencedSection;
};

export const ResourceCarousel: FC<ResourceCarouselProps> = ({imageCaraouselSection}) => {
	const useStyles = createStyles(theme => ({
		card: {
			position: 'relative',
			overflow: 'hidden',
			background: '#F4F4F4',

			'&::before': {
				content: '""',
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				width: 6,
				background: '#5ABEA4 0% 0% no-repeat padding-box',
			},
		},
		image: {
			height: '50%',
			width: '100%',
			background: '#00827E',
		},
	}));

	const {classes} = useStyles();

	const theme = useMantineTheme();
	const slides = imageCaraouselSection.references.map(item => (
		<Carousel.Slide key={item.heading}>
			<Paper radius={0} className={classNames(classes.card)}>
				<Grid>
					<Grid.Col lg={12} sm={12} md={12}>
						<GatsbyImage objectFit='cover' image={getImage(item.asset)} alt={item.heading} />
					</Grid.Col>
				</Grid>
			</Paper>
		</Carousel.Slide>
	));
	return (
		<Carousel
			slideSize='50%'
			breakpoints={[{maxWidth: 'sm', slideSize: '100%', slideGap: 'sm'}]}
			slideGap='sm'
			align='center'
			withIndicators
			slidesToScroll={1}
			loop
			dragFree
		>
			{slides}
		</Carousel>
	);
};
