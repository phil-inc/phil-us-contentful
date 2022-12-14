import {Carousel} from '@mantine/carousel';
import {useMediaQuery, useViewportSize} from '@mantine/hooks';
import {createStyles, Paper, Text, Title, Button, useMantineTheme, Grid} from '@mantine/core';
import React from 'react';
import type {FC} from 'react';
import classNames from 'classnames';
import type {TAsset} from 'types/asset';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {IReferencedSection} from 'types/section';
import {Icon2fa, IconArrowLeft, IconArrowRight, IconChevronLeft, IconChevronRight} from '@tabler/icons';

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

		mobileCarousel: {
			display: 'none',

			[theme.fn.smallerThan('sm')]: {
				display: 'block',
			},
		},

		carousel: {
			[theme.fn.smallerThan('sm')]: {
				display: 'none',
			},
		},
	}));

	const {classes} = useStyles();

	const theme = useMantineTheme();
	const {width} = useViewportSize();

	const slides = imageCaraouselSection.references.map(item => (
		<Carousel.Slide key={item.asset.id + 'ResourceCarousel'}>
			<Paper radius={0} className={classNames(classes.card)}>
				<Grid>
					<Grid.Col lg={12} sm={12} md={12}>
						<GatsbyImage objectFit='cover' image={getImage(item.asset)} alt={item.heading} />
					</Grid.Col>
				</Grid>
			</Paper>
		</Carousel.Slide>
	));

	const slides2 = imageCaraouselSection.references.map(item => (
		<Carousel.Slide key={item.asset.id + 'ResourceCarousel'}>
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
		<>
			<Carousel
				className={classes.carousel}
				slideSize='44%'
				breakpoints={[{maxWidth: 'sm', slideSize: '100%', slideGap: 'sm'}]}
				slideGap='sm'
				align='center'
				slidesToScroll={2}
				withIndicators
				dragFree
				loop
				styles={{
					controls: {
						position: 'relative',
						marginTop: theme.spacing.lg,
						justifyContent: 'center',
					},
					control: {
						margin: `26px ${
							slides.length * (theme.fn.smallerThan('sm') ? theme.spacing.sm : theme.spacing.xs)
						}px`,
						border: 'none',
						background: 'transparent',
						boxShadow: 'none',
					},
					indicator: {
						width: 20,
						height: 20,
						border: '3px solid #FFFFFF',
						background: '#FFFFFF40',
						opacity: 1,
						boxShadow: 'none',

						'&[data-active]': {
							background: '#FFF',
						},
					},
				}}
				nextControlIcon={<IconChevronRight size={30} color='#FFFFFF' />}
				previousControlIcon={<IconChevronLeft size={30} color='#FFFFFF' />}
			>
				{slides}
				{slides2}
			</Carousel>
			<Carousel
				className={classes.mobileCarousel}
				slideSize='44%'
				breakpoints={[{maxWidth: 'sm', slideSize: '100%', slideGap: 'sm'}]}
				slideGap='sm'
				align='center'
				slidesToScroll={1}
				withIndicators
				dragFree
				loop
				styles={{
					controls: {
						position: 'relative',
						marginTop: theme.spacing.lg,
						justifyContent: 'center',
					},
					control: {
						margin: `26px ${
							slides.length * (theme.fn.smallerThan('sm') ? theme.spacing.sm : theme.spacing.xs)
						}px`,
						border: 'none',
						background: 'transparent',
						boxShadow: 'none',
					},
					indicator: {
						width: 20,
						height: 20,
						border: '3px solid #FFFFFF',
						background: '#FFFFFF40',
						opacity: 1,
						boxShadow: 'none',

						'&[data-active]': {
							background: '#FFF',
						},
					},
				}}
				nextControlIcon={<IconChevronRight size={30} color='#FFFFFF' />}
				previousControlIcon={<IconChevronLeft size={30} color='#FFFFFF' />}
			>
				{slides}
			</Carousel>
		</>
	);
};
