import {Paper, Container, Title, Button, Text, Box, Stack, Anchor, Group, AspectRatio} from '@mantine/core';
import {Link} from 'gatsby';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import Asset from './Asset/Asset';
import {BLOCKS} from '@contentful/rich-text-types';
import ImageContainer from './Container/ImageContainer';

import * as classes from './card.module.css';
import {getColorFromStylingOptions} from 'utils/stylingOptions';

type ArticleProps = {
	resource: TResource;
};

export const CCard: FC<ArticleProps> = ({resource}) => {
	const {body, heading, asset, buttonText} = resource;
	const {link, isExternal} = getLink(resource);

	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text className={classes.paragraph}>{children}</Text>;
			},
		},
	};

	return (
		<Group h={'100%'} gap={0}>
			<Box
				component='span'
				h='100%'
				w={getColorFromStylingOptions(resource?.stylingOptions?.extraColor) !== 'transparent' ? 12 : 0}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.extraColor)}}
			></Box>
			<Paper
				radius={0}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.background)}}
				className={classes.paper}
				data-hasAsset={Boolean(asset)}
			>
				<Group wrap='nowrap' gap={0} h={'100%'}>
					{asset && (
						<ImageContainer fluid cover>
							<Asset asset={asset} />
						</ImageContainer>
					)}
					<Stack
						className={classes.stack}
						data-hasAsset={Boolean(asset)}
						align='flex-start'
						justify='space-between'
						h='100%'
					>
						<Title order={3}>{heading}</Title>

						{resource?.description?.description?.length ? (
							<Text className={classes.description}>{resource.description.description}</Text>
						) : (
							body && renderRichText(body, options)
						)}

						{!asset ? (
							isExternal ? (
								<Anchor href={link} target='_blank'>
									<Button color={'dark'}>{buttonText}</Button>
								</Anchor>
							) : (
								<Link to={link}>
									<Button color={'dark'}>{buttonText}</Button>
								</Link>
							)
						) : null}
					</Stack>
				</Group>
			</Paper>
		</Group>
	);
};
