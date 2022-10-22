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
	AspectRatio,
	Anchor,
	Box,
} from '@mantine/core';
import classNames from 'classnames';
import {Link} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TAsset} from 'types/asset';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import Asset from './Asset/Asset';
import ImageContainer from './Container/ImageContainer';

type FeaturedProps = {
	resource: TResource;
	noDivider?: boolean;
	resourceBackground?: string;
	pr?: number;
};

export const Featured: FC<FeaturedProps> = ({resource, noDivider = false, resourceBackground = '#F4F4F4', pr = 0}) => {
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

		title: {
			textDecoration: 'none',
			color: '#00201F',
		},
	}));

	const {classes} = useStyles();

	const {link, isExternal} = getLink(resource);

	return (
		<Paper radius={0} className={classNames(classes.card)}>
			<Center>
				<Grid align={'center'} justify={'left'}>
					<Grid.Col lg={5} sm={12} md={12} py={0}>
						<ImageContainer fluid>
							<Asset asset={resource.asset} />
						</ImageContainer>
					</Grid.Col>
					<Grid.Col lg={7} sm={12} md={12}>
						<Container pr={pr}>
							{isExternal ? (
								<Anchor className={classes.title} href={link} target='_blank'>
									<Title order={3} mt='md' className={classes.title} lineClamp={3}>
										{resource.heading}
									</Title>
								</Anchor>
							) : (
								<Link className={classes.title} to={link}>
									<Title order={3} mt='md' className={classes.title} lineClamp={3}>
										{resource.heading}
									</Title>
								</Link>
							)}

							{!noDivider && <Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />}
							{resource.body && (
								<Text size={18} mt='sm' mb={12} lineClamp={3}>
									{renderRichText(resource.body)}
								</Text>
							)}
						</Container>
					</Grid.Col>
				</Grid>
			</Center>
		</Paper>
	);
};
