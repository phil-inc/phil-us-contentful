import {
	Paper,
	Container,
	Center,
	Title,
	Divider,
	Button,
	Text,
	createStyles,
	Grid,
	Stack,
	Box,
	Group,
} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';

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
	resource: Pick<TResource, 'asset' | 'buttonText' | 'linkTo' | 'heading' | 'createdAt'>;
};

export const PressRelease: FC<PressReleaseProps> = ({resource}) => {
	const {classes} = useStyles();
	const pathToImage = getImage(resource.asset);

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid align={'center'}>
				<Grid.Col lg={6} sm={12} md={12}>
					<GatsbyImage image={pathToImage} alt='' />
				</Grid.Col>
				<Grid.Col lg={6} sm={12} md={12}>
					<Stack p={35}>
						<Text size={18} color='dimmed' mb={10}>
							Feb 28, 2022
						</Text>
						<Title order={1} size={30}>
							{resource.heading}
						</Title>
						<Divider variant='dashed' size={3} my={13} />
						<Group>
							<Button color='dark'>{resource.buttonText}</Button>
						</Group>
					</Stack>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
