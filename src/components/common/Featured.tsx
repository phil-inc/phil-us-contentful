import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid, AspectRatio} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import React from 'react';
import type {TAsset} from 'types/asset';
import ImageContainer from './Container/ImageContainer';

type FeaturedProps = {
	title?: string;
	children?: React.ReactNode;
	asset?: TAsset;
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
	const useStyles = createStyles(() => ({
		card: {
			position: 'relative',
			overflow: 'hidden',
			paddingLeft: 10,
			background: resourceBackground,
			height: '100%',
			display: 'flex',

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
			<Center>
				<Grid align={'center'} gutter={'sm'}>
					<Grid.Col lg={6} sm={12} md={12} py={0}>
						<ImageContainer fluid>
							<GatsbyImage image={pathToImage} alt={title} />
						</ImageContainer>
					</Grid.Col>
					<Grid.Col lg={6} sm={12} md={12}>
						<Container pr={pr}>
							<Title order={3} mt='md'>
								{title}
							</Title>
							{!noDivider && <Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />}
							<Text size={18} mt='sm' mb={12}>
								{children}
							</Text>
						</Container>
					</Grid.Col>
				</Grid>
			</Center>
		</Paper>
	);
};
