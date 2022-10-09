import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid, Box} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import type {Asset} from 'types/asset';
import {graphql, Link} from 'gatsby';
import React from 'react';
import slugify from 'slugify';
import {navigateToPage} from 'utils/navigateToPage';

type ResourceCardProps = {
	sectionHeader?: string;
	title?: string;
	children?: React.ReactNode;
	asset?: Asset;
	linkTo?: string;
};

export const ResourceCard: FC<ResourceCardProps> = ({sectionHeader, title, asset, children, linkTo}) => {
	const useStyles = createStyles(theme => ({
		card: {
			position: 'relative',
			overflow: 'hidden',
			paddingLeft: 10,
			background: '#F4F4F4',

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
		image: {
			height: '100%',
			width: '100%',
			background: '#00827E',
		},
	}));

	const {classes} = useStyles();
	const pathToImage = getImage(asset);
	const pathToBlog = `${slugify(sectionHeader, {lower: true})}/${slugify(title, {lower: true})}`;

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid>
				<Grid.Col lg={5} sm={12} md={12}>
					<GatsbyImage image={pathToImage} alt={title} />
				</Grid.Col>
				<Grid.Col lg={7} sm={12} md={12}>
					<Box pl={40} pr={36} py={50}>
						<Title order={3} mt="md" lineClamp={2}>
							{title}
						</Title>
						<Divider variant="dashed" size={3} style={{maxWidth: 404}} my={13} />
						<Text size={18} mt="sm" mb={20} lineClamp={2}>
							{children}
						</Text>
						{linkTo != '#' && linkTo != '' ? (
							<a href={linkTo} style={{textDecoration: 'none'}}>
								<Button color="dark">Read Now</Button>
							</a>
						) : (
							<Link to={navigateToPage(pathToBlog)}>
								<Button color="dark">Read Now</Button>
							</Link>
						)}
					</Box>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
