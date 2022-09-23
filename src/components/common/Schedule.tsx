import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Group, Grid} from '@mantine/core';
import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		padding: '0 32px',
		maxWidth: 1366,
		maxHeight: 150,
		width: '100%',
		margin: '0 auto',
		marginTop: 53,

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

type ScheduleProps = {
	title?: string;
	children?: React.ReactNode;
	icon?: string;
};

export const Schedule: FC<ScheduleProps> = ({title, icon, children}) => {
	const {classes} = useStyles();

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid align={'center'}>
				<Grid.Col span={10}>
					<Container m={0}>
						<Title order={3} mt='md'>
							{title}
						</Title>
						<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
						<Text size='md' mt='sm' mb={11}>
							{children}
						</Text>
					</Container>
				</Grid.Col>
				<Grid.Col span={2}>
					<Center>
						<Button color={'dark'}>Schedule demo</Button>
					</Center>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
