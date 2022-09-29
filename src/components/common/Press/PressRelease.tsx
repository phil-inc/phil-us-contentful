import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid, Stack, Box} from '@mantine/core';
import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		paddingLeft: 10,
		background: '#f4f4f4',

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
}));

type PressReleaseProps = {
	title: string;
	link: string;
	timestamp: string;
};

export const PressRelease: FC<PressReleaseProps> = ({title, timestamp, link}) => {
	const {classes} = useStyles();

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid align={'center'}>
				<Grid.Col lg={6} sm={12} md={12}>
					<Container style={{background: '#00827e', height: 420}}></Container>
				</Grid.Col>
				<Grid.Col lg={6} sm={12} md={12}>
					<Stack p={35}>
						<Text size={18} color='dimmed' mb={10}>
							{timestamp}
						</Text>
						<Title order={1} size={30}>
							{title}
						</Title>
						<Divider variant='dashed' size={3} my={13} />
						<Box>
							<Button color='dark'>Read more</Button>
						</Box>
					</Stack>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
