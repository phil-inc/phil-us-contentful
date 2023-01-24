import {Paper, Container, Center, Title, Divider, Button, Text, createStyles, Grid} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage, StaticImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TAsset} from 'types/asset';
import type {TResource} from 'types/resource';
import Asset from './Asset/Asset';
import ImageContainer from './Container/ImageContainer';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		fontFamily: 'Raleway',
		fontSize: '26px',
		height: '100%',
		display: 'flex',
	},
	author: {
		fontFamily: 'Lato',
		fontWeight: 700,
		fontSize: 16,
	},
	designation: {
		fontFamily: 'Lato',
		fontSize: '16px',
	},
	testimonialImage: {
		width: '100%',
		height: '100%',
	},
}));

type TestimonialProps = {
	type?: 'person' | 'company';
	resource: TResource;
};

export const Testimonial: FC<TestimonialProps> = ({resource, type = 'company'}) => {
	const {classes} = useStyles();
	const isPerson = type === 'person';

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid>
				{isPerson && (
					<Grid.Col lg={4} sm={12}>
						{resource.asset && (
							<ImageContainer fluid>
								<Asset asset={resource.asset} />
							</ImageContainer>
						)}
					</Grid.Col>
				)}
				<Grid.Col lg={isPerson ? 8 : 12} sm={12} px={38} py={34}>
					{!isPerson && resource.asset && (
						<ImageContainer fluid>
							<Asset asset={resource.asset} />
						</ImageContainer>
					)}
					{resource.body && renderRichText(resource.body)}
					<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
					{/* Old implementation needs new implementation */}
					{/* {resource.author && (
						<Text color={'#00827E'} weight={700} className={classes.author}>
							{resource.author}
						</Text>
					)} */}
					{resource.designation && (
						<Text italic className={classes.designation}>
							{resource.designation}
						</Text>
					)}
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
