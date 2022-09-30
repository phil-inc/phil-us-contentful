import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid, Group} from '@mantine/core';
import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

const useStyles = createStyles(theme => ({
	FAQWrapper: {
		position: 'relative',
		overflow: 'hidden',
		padding: '30px 60px',
		background: '#F4F4F4',
		fontFamily: 'Raleway',
		fontWeight: 700,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100%',

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
		<Paper radius={0} className={classNames(classes.FAQWrapper)}>
			<Group align='center'>
				<Title order={4} size={30}>
					{title}
				</Title>
			</Group>
		</Paper>
	);
};
