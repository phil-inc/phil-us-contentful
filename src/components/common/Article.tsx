import {Paper, Container, Center, Title, Divider, Button, Text, createStyles} from '@mantine/core';
import classNames from 'classnames';
import {Link} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import React from 'react';
import type {Asset} from 'types/asset';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		padding: theme.spacing.xl,
		paddingLeft: 32,
		paddingBottom: 38,
		paddingTop: 52,

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

	blue: {
		'&::before': {
			background: '#29A5B4 0% 0% no-repeat padding-box',
		},
	},

	yellow: {
		'&::before': {
			background: '#EDBE3D 0% 0% no-repeat padding-box',
		},
	},

	none: {
		'&::before': {
			width: 0,
		},
	},
}));

type ArticleProps = {
	color?: 'blue' | 'yellow' | 'none';
	title?: string;
	children?: React.ReactNode;
	image?: Asset;
	link?: string;
	buttonText?: string;
};

export const Article: FC<ArticleProps> = ({color, title, image, children, link, buttonText}) => {
	const {classes} = useStyles();

	const getColorStyle = () => {
		if (color === 'blue') {
			return classes.blue;
		}

		if (color === 'yellow') {
			return classes.yellow;
		}

		if (color === 'none') {
			return classes.none;
		}
	};

	const pathToImage = getImage(image);

	return (
		<Paper radius={0} className={classNames(classes.card, getColorStyle())}>
			<GatsbyImage image={pathToImage} alt={title} />

			<Title order={3} mt='md'>
				{title}
			</Title>
			<Divider variant='dashed' size={1} style={{maxWidth: 404}} my={13} />
			<Text size='sm' mt='sm' mb={11}>
				{children}
			</Text>
			{Boolean(buttonText?.length) && (
				<Link to={link}>
					<Button color={'dark'}>{buttonText}</Button>
				</Link>
			)}
		</Paper>
	);
};
