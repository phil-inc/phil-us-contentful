import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid} from '@mantine/core';
import classNames from 'classnames';
import type {FC} from 'react';
import React from 'react';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		paddingLeft: 10,
		background: '#fff',
		fontFamily: 'Lato',

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

	description: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'end',
		placeItems: 'start',
		paddingBottom: 50,
	},
}));

type BenefitProps = {
	title?: string;
	children?: React.ReactNode;
	icon?: string;
	divider?: boolean;
};

export const Benefit: FC<BenefitProps> = ({title, icon, children, divider}) => {
	const {classes} = useStyles();

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid>
				<Grid.Col span={6}>
					<Container style={{background: '#00827e', minWidth: 313, minHeight: 313}} m={0}></Container>
				</Grid.Col>
				<Grid.Col span={6} className={classes.description}>
					<Container m={0}>
						<Title order={1} mt='md' style={{fontFamily: 'Lato'}}>
							{title}
						</Title>
						{divider && <Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />}
						<Text size={25} mt='sm' mb={11}>
							{children}
						</Text>
					</Container>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
