import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid} from '@mantine/core';
import classNames from 'classnames';
import {getImage, StaticImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';
import Asset from './Asset/Asset';
import ImageContainer from './Container/ImageContainer';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		fontFamily: 'Raleway',
		fontSize: '26px',
	},
	title: {
		fontFamily: 'Raleway',
	},
	description: {
		fontFamily: 'Lato',
	},
}));

type CardWithImageProps = {
	resource: TResource;
};

export const CardWithImage: FC<CardWithImageProps> = ({resource}) => {
	const {classes} = useStyles();

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid align='center'>
				<Grid.Col lg={4} sm={12}>
					{Boolean(resource.asset) && (
						<ImageContainer ratio={1} fluid>
							<Asset asset={resource.asset} />
						</ImageContainer>
					)}
				</Grid.Col>

				<Grid.Col lg={8} sm={12} px={38} py={34}>
					<Text className={classes.title}>{resource.heading}</Text>
					<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
					{Boolean(resource.body) && <Text className={classes.description}>{renderRichText(resource.body)}</Text>}
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
