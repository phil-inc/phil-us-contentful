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
import {TAsset} from 'types/asset';

type ArticleProps = {
	resource: TResource;
};

export const CCard: FC<ArticleProps> = ({resource}) => {
	const {body, heading, asset, buttonText} = resource;

	// TODO: handle any
	let media: any = asset;
	if (resource?.media) {
		media = resource.media;
	}

	if (resource?.sys?.contentType?.sys?.id === 'mediaItem') {
		media = resource;
	}

	const {link, isExternal} = getLink(resource);

	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text className={classes.paragraph}>{children}</Text>;
			},
		},
	};

	if (resource?.sys?.contentType?.sys?.id === 'mediaItem') {

		return (
			<ImageContainer fluid contain maw={900} ratio={16 / 9}>
				<Asset objectFit="cover" asset={media} />
			</ImageContainer>
		);
	}

	// TODO: Add hover animation + anchor tags
	// REFACTOR:: handle different styles better: isFaq, Asset
	return (
		<Group h={'100%'} gap={0}>
			<Box
				component="span"
				h="100%"
				className={classes.before}
				w={getColorFromStylingOptions(resource?.stylingOptions?.extraColor) !== 'transparent' ? 12 : 0}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.extraColor)}}
				data-has-asset={!!media}
			></Box>
			<Paper
				radius={0}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.background)}}
				className={classes.paper}
				data-hasAsset={Boolean(media)}
			>
				<Group wrap="nowrap" gap={0} h={'100%'} preventGrowOverflow>
					{media && !resource.isFaq && (
						<ImageContainer fluid contain mx={'0px'}>
							<Asset objectFit="cover" asset={media} />
						</ImageContainer>
					)}
					<Stack
						className={classes.stack}
						data-has-asset={Boolean(media)}
						data-is-faq={resource.isFaq}
						align="flex-start"
						h="100%"
						gap={0}
					>
						<Title order={3} mb={40}>
							{heading}
						</Title>

						{!resource.isFaq ? (
							resource?.description?.description?.length ? (
								<Text className={classes.description}>{resource.description.description}</Text>
							) : (
								body && renderRichText(body, options)
							)
						) : null}

						{!asset && !resource.isFaq && buttonText?.length ? (
							isExternal ? (
								<Anchor href={link} target="_blank">
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
