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
}));

type ArticleProps = {
	color?: 'blue' | 'yellow';
	title: string;
};

export const Article: FC<ArticleProps> = ({color, title}) => {
	const {classes} = useStyles();

	return (
		<Paper
			radius={0}
			className={classNames(
				classes.card,
				color === 'blue' ? classes.blue : color === 'yellow' ? classes.yellow : null,
			)}
		>
			<Container style={{background: '#00827e', minHeight: 427}} size={427}>
				<Center>
					<Paper mt={20} radius={300} style={{minHeight: 389, minWidth: 389, background: '#5abea4'}}>
						{/* PLACEHOLDER */}
					</Paper>
				</Center>
			</Container>
			<Title order={3} mt='md'>
				{title}
			</Title>
			<Divider variant='dashed' size={1} style={{maxWidth: 404}} my={13} />
			<Text size='sm' mt='sm' mb={11}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at turpis at velit tincidunt molestie.
			</Text>
			<Button color={'dark'}>Lean More</Button>
		</Paper>
	);
};
