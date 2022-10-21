import {Carousel} from '@mantine/carousel';
import {createStyles, useMantineTheme} from '@mantine/core';
import {useMediaQuery} from '@mantine/hooks';
import {Testimonial} from 'components/common/Testimonial';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {IReferencedSection} from 'types/section';

type TestimonialCarouselProps = {
	section: IReferencedSection;
};

export const TestimonialCarousel: FC<TestimonialCarouselProps> = ({section}) => {
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
		testimonialImage: {
			height: '100%',
			width: '100%',
		},
	}));

	const {classes} = useStyles();

	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

	const slides = section.references.map(item => (
		<Carousel.Slide key={item.heading}>
			<Testimonial
				type={section.referenceType === 'Testimonial' ? 'person' : 'company'}
				image={item.asset}
				author={item.author}
				designation={item.designation}
			>
				{item.body && renderRichText(item.body)}
			</Testimonial>
		</Carousel.Slide>
	));
	return (
		<Carousel
			slideSize="50%"
			breakpoints={[{maxWidth: 'sm', slideSize: '100%', slideGap: 4}]}
			slideGap="sm"
			align="start"
			slidesToScroll={mobile ? 1 : 2}
            dragFree
			withIndicators
		>
			{slides}
		</Carousel>
	);
};
