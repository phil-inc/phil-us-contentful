import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import React from 'react';
import type {Asset} from 'types/asset';

type FeaturedProps = {
	title?: string;
	children?: React.ReactNode;
	asset?: Asset;
	noDivider?: boolean;
	resourceBackground?: string;
	pr?: number;
};

export const Featured: FC<FeaturedProps> = ({
	title,
	asset,
	children,
	noDivider = false,
	resourceBackground = '#F4F4F4',
	pr = 0,
}) => {
	const useStyles = createStyles(theme => ({
		card: {
			position: 'relative',
			overflow: 'hidden',
			paddingLeft: 10,
			background: resourceBackground,

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

	const {classes} = useStyles();

	const pathToImage = getImage(asset);

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid align={'center'} gutter={'sm'}>
				<Grid.Col lg={6} sm={12} md={12}>
					<GatsbyImage image={pathToImage} alt={title} />
				</Grid.Col>
				<Grid.Col lg={6} sm={12} md={12}>
					<Container pr={pr}>
						<Title order={3} mt='md'>
							{title}
						</Title>
						{!noDivider && <Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />}
						<Text size={18} mt='sm' mb={11}>
							{children}
						</Text>
					</Container>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
