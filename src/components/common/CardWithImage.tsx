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
}));

type CardWithImageProps = {
	children?: React.ReactNode;
	image?: React.ReactNode;
};

export const CardWithImage: FC<CardWithImageProps> = ({children, image}) => {
	const {classes} = useStyles();

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid>
				<Grid.Col lg={4} sm={12}>
					{image}
				</Grid.Col>

				<Grid.Col lg={8} sm={12} px={38} py={34}>
					{children}
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
