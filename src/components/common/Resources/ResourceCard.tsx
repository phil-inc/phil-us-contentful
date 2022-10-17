import {Paper, Title, Divider, Button, Text, createStyles, Grid, Box, Anchor, Group, Center} from '@mantine/core';
import classNames from 'classnames';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import type {FC} from 'react';
import type {TAsset} from 'types/asset';
import {Link} from 'gatsby';
import React from 'react';
import type {TLink, TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import ImageContainer from '../Container/ImageContainer';

type ResourceCardProps = {
	sectionHeader: string;
	resource: TResource;
};

export const ResourceCard: FC<ResourceCardProps> = ({resource}) => {
	const useStyles = createStyles(theme => ({
		card: {
			position: 'relative',
			overflow: 'hidden',
			paddingLeft: 10,
			background: '#F4F4F4',
			height: '100%',

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
	const pathToImage = getImage(resource.asset);
	const {link, isExternal} = getLink(resource);

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid justify='center' align='center'>
				<Grid.Col lg={5} sm={12} md={12}>
					{pathToImage && (
						<ImageContainer fluid>
							<GatsbyImage image={pathToImage} alt={resource.asset.title || ''} />
						</ImageContainer>
					)}
				</Grid.Col>
				<Grid.Col lg={7} sm={12} md={12}>
					<Box pl={40} pr={36} py={50}>
						{resource.heading && (
							<Title order={3} mt='md' lineClamp={2}>
								{resource.heading}
							</Title>
						)}
						<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
						{resource.body && (
							<Text size={18} mt='sm' mb={20} lineClamp={2}>
								{renderRichText(resource.body)}
							</Text>
						)}
						{resource.buttonText && (
							<Group>
								{isExternal ? (
									<Anchor href={link} target='_blank'>
										<Button>{resource.buttonText}</Button>
									</Anchor>
								) : (
									<Link to={link}>
										<Button>{resource.buttonText}</Button>
									</Link>
								)}
							</Group>
						)}
					</Box>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
