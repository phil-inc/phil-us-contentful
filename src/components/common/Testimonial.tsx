import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid} from '@mantine/core';
import classNames from 'classnames';
import {StaticImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import React from 'react';

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
	icon?: string;
	children?: React.ReactNode;
	author: string;
	designation: string;
};

export const Testimonial: FC<TestimonialProps> = ({icon, children, author, designation, type = 'company'}) => {
	const {classes} = useStyles();
	const isPerson = type === 'person';

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
					{!isPerson && <Text>{icon}</Text>}
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
