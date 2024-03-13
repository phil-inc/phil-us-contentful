import {
	Paper,
	Container,
	Center,
	Title,
	Divider,
	Button,
	Text,
	Box,
	Stack,
	Anchor,
	Group,
	AspectRatio,
} from '@mantine/core';
import classNames from 'classnames';
import {Link} from 'gatsby';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TAsset} from 'types/asset';
import type {TLink, TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import Asset from './Asset/Asset';
import {BLOCKS, MARKS, INLINES} from '@contentful/rich-text-types';
import ImageContainer from './Container/ImageContainer';

import * as classes from './card.module.css';

type ArticleProps = {
	color: 'blue' | 'yellow' | 'green' | 'none';
	resource: TResource;
};

export const Article: FC<ArticleProps> = ({color, resource}) => {
	const {body, heading, asset, buttonText} = resource;
	const {link, isExternal} = getLink(resource);

	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return <>{children}</>;
			},
		},
	};

	const getColorStyle = () => {
		if (color === 'blue') {
			return classes.blue;
		}

		if (color === 'yellow') {
			return classes.yellow;
		}

		if (color === 'none') {
			return classes.none;
		}
	};

	return (
		<Paper radius={0} className={classNames(classes.card, getColorStyle())}>
			<Stack align='flex-start' justify='space-between' className={classes.fullHeight}>
				<Box className={classes.fullWidth}>
					<Container className={classes.imageWrapper} mb={45}>
						<ImageContainer fluid>
							<AspectRatio ratio={1}>
								<Asset asset={asset!} />
							</AspectRatio>
						</ImageContainer>
					</Container>

					<Title order={3}>{heading}</Title>
					<Divider variant='dashed' size={1} style={{maxWidth: 404}} mt={10} mb={13} />
					<Text size='sm' mt={0} mb={11} pr={50}>
						{resource.body && renderRichText(resource.body, options)}
					</Text>
				</Box>
				<Group align='center'>
					{isExternal ? (
						<Anchor href={link} target='_blank'>
							<Button color={'dark'}>{buttonText}</Button>
						</Anchor>
					) : (
						<Link to={link}>
							<Button color={'dark'}>{buttonText}</Button>
						</Link>
					)}
				</Group>
			</Stack>
		</Paper>
	);
};
