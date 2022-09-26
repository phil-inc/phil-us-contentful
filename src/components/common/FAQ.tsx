import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid} from '@mantine/core';
import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		padding: '30px 34px',
		background: '#F4F4F4',
		fontFamily: 'Lato',

		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			width: 6,
			background: '#EDBE3D 0% 0% no-repeat padding-box',
		},
	},
}));

type FAQProps = {
	title?: string;
};

export const FAQ: FC<FAQProps> = ({title}) => {
	const {classes} = useStyles();

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Title order={4} style={{fontFamily: 'Lato'}}>
				{title}
			</Title>
		</Paper>
	);
};
