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

import {Options} from '@contentful/rich-text-react-renderer';
type ArticleProps = {
	resource: TResource;
};

export const CCard: FC<ArticleProps> = ({resource}) => {
	const {body, heading, asset, buttonText} = resource;

	const options: Options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET](node) {
				return 'image here';

				// Const imageData = richTextImages[node.data.target.sys.id];
				// const image = getImage(imageData.image as ImageDataLike);
				// return (
				// 	<GatsbyImage
				// 		style={{marginBottom: `${handleSpacing(theme, theme.spacing.md)}px`}}
				// 		image={image!}
				// 		alt={''}
				// 	/>
				// );
			},

			// TODO: Refactor this
			[BLOCKS.EMBEDDED_ENTRY](node, children) {
				if (node?.data?.target) {
					const {target} = node.data;

					if (target.__typename === 'ContentfulMediaItem') {
						return (
							<ImageContainer fluid maw={128}>
								<Asset objectFit="contain" asset={target} />
							</ImageContainer>
						);
					}

					const button = <Button variant="philDefault">{node.data.target.buttonText}</Button>;

					if (target?.link?.internalContent) {
						const {link} = getLink(target, true);

						return <Link to={link}>{button}</Link>;
					}

					return (
						<Anchor href={target?.link?.externalUrl ?? '#'} target="_blank" referrerPolicy="no-referrer">
							{button}
						</Anchor>
					);
				}

				return null;
			},
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text className={classes.paragraph}>{children}</Text>;
			},

			[BLOCKS.HEADING_1](node, children) {
				return (
					<Title order={1} data-is-faq={resource.isFaq}>
						{children}
					</Title>
				);
			},
			[BLOCKS.HEADING_2](node, children) {
				return (
					<Title order={2} data-is-faq={resource.isFaq}>
						{children}
					</Title>
				);
			},
			[BLOCKS.HEADING_3](node, children) {
				return (
					<Title order={3} data-is-faq={resource.isFaq}>
						{children}
					</Title>
				);
			},
			[BLOCKS.HEADING_4](node, children) {
				return (
					<Title order={4} data-is-faq={resource.isFaq}>
						{children}
					</Title>
				);
			},
		},
	};

	// TODO: handle any
	let media: any = asset;
	if (resource?.media) {
		media = resource.media;
	}

	if (resource?.sys?.contentType?.sys?.id === 'mediaItem') {
		media = resource;
	}

	const {link, isExternal} = getLink(resource);

	// TODO: improve this
	if (resource?.sys?.contentType?.sys?.id === 'mediaItem') {
		return (
			<ImageContainer fluid contain maw={900} ratio={16 / 9}>
				<Asset objectFit="contain" asset={media} />
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
				data-has-asset={Boolean(media)}
			></Box>
			<Paper
				radius={0}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.background)}}
				className={classes.paper}
				data-hasAsset={Boolean(media)}
			>
				{/* TODO: convert to grid */}
				<Group wrap="nowrap" h={'100%'} gap={0} preventGrowOverflow align="start">
					{media && !resource.isFaq && (
						// TODO: check regression with 1/2 ratio images
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
						{!resource.isFaq && body && renderRichText(body, options)}

						{!asset && !resource.isFaq && buttonText?.length ? (
							isExternal ? (
								<Anchor href={link} target="_blank">
									<Button variant="philDefault">{buttonText}</Button>
								</Anchor>
							) : (
								<Link to={link}>
									<Button variant="philDefault">{buttonText}</Button>
								</Link>
							)
						) : null}
					</Stack>
				</Group>
			</Paper>
		</Group>
	);
};
