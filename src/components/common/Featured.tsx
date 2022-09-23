import {Paper, Container, Center, Title, Divider, Button, Text, createStyles} from '@mantine/core';
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

type FeaturedProps = {
	title?: string;
	children?: React.ReactNode;
	icon?: string;
};

export const Featured: FC<FeaturedProps> = ({title, icon, children}) => {
	const {classes} = useStyles();

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Center>
				<Container style={{background: '#00827e', minHeight: 300}} size={300}>
					<Center>
						<Paper mt={25} radius={300} style={{minHeight: 250, minWidth: 250, background: '#5abea4'}}>
							{/* PLACEHOLDER */}
						</Paper>
					</Center>
				</Container>

				<Container px={50}>
					<Title order={3} mt='md'>
						{title}
					</Title>
					<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
					<Text size='md' mt='sm' mb={11}>
						{children}
					</Text>
				</Container>
			</Center>
		</Paper>
	);
};
