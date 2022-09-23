import {Paper, Container, Center, Title, Divider, Button, Text, createStyles} from '@mantine/core';
import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		padding: theme.spacing.xl,
		paddingLeft: 32,
		paddingBottom: 38,
		paddingTop: 52,
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
}));

type TestimonialProps = {
	icon?: string;
	children?: React.ReactNode;
	author: string;
	designation: string;
};

export const Testimonial: FC<TestimonialProps> = ({icon, children, author, designation}) => {
	const {classes} = useStyles();

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Text>{icon}</Text>
			{children}
			<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
			<Text color={'#00827E'} weight={700} className={classes.author}>
				{author}
			</Text>
			<Text italic className={classes.designation}>
				{designation}
			</Text>
		</Paper>
	);
};
