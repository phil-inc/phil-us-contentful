import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage, StaticImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import React from 'react';
import type {Asset} from 'types/asset';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		fontFamily: 'Raleway',
		fontSize: '26px',
	},
	author: {
		fontFamily: 'Lato',
		fontWeight: 700,
		fontSize: 16,
	},
	designation: {
		fontFamily: 'Lato',
		fontSize: '16px',
	},
	testimonialImage: {
		height: '100%',
	},
}));

type TestimonialProps = {
	type?: 'person' | 'company';
	image?: Asset;
	children?: React.ReactNode;
	author: string;
	designation: string;
};

export const Testimonial: FC<TestimonialProps> = ({image, children, author, designation, type = 'company'}) => {
	const {classes} = useStyles();
	const isPerson = type === 'person';

	const pathToImage = getImage(image);

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid>
				{isPerson && (
					<Grid.Col lg={4} sm={12}>
						<StaticImage
							src='../../assets/images/person.png'
							alt='person'
							className={classes.testimonialImage}
							placeholder='blurred'
							layout='fullWidth'
						></StaticImage>
					</Grid.Col>
				)}
				<Grid.Col lg={isPerson ? 8 : 12} sm={12} px={38} py={34}>
					{!isPerson && <GatsbyImage image={pathToImage} alt='' />}
					{children}
					<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
					<Text color={'#00827E'} weight={700} className={classes.author}>
						{author}
					</Text>
					<Text italic className={classes.designation}>
						{designation}
					</Text>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
