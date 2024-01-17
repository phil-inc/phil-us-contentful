import {
	Paper,
	Container,
	Title,
	Button,
	Text,
	Box,
	Stack,
	Anchor,
	Group,
	AspectRatio,
	Grid,
	Center,
} from '@mantine/core';
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
import {isVideoContent} from 'utils/isVideoContent';
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
							<ImageContainer flexStart fluid maw={128}>
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
			<Center>
				<ImageContainer
					isVideo={isVideoContent(media?.file?.contentType) || Boolean(media?.youtubeLink)}
					fluid
					contain
					maw={900}
					ratio={16 / 9}
				>
					<Asset objectFit="contain" asset={media} />
				</ImageContainer>
			</Center>
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
				className={classes.paper}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.background)}}
				radius={0}
				data-hasAsset={Boolean(media)}
			>
				{/* TODO: convert to grid */}
				{/* <Group wrap="nowrap" h={'100%'} gap={0} preventGrowOverflow align="start"></Group> */}

				<Grid gutter={0} classNames={{inner: classes.gridInner, root: classes.gridRoot}}>
					{media && !resource.isFaq && (
						<Grid.Col span={{base: 12, md: 3, lg: 3, xl: 2}}>
							{/* // TODO: check regression with 1/2 ratio images */}
							<ImageContainer
								isVideo={isVideoContent(media?.file?.contentType) || Boolean(media?.youtubeLink)}
								fluid
								contain
								card
								mx={0}
							>
								<Asset objectFit="cover" asset={media} />
							</ImageContainer>
						</Grid.Col>
					)}

					<Grid.Col span="auto">
						<Stack
							className={classes.stack}
							data-has-asset={Boolean(media)}
							data-is-faq={resource.isFaq}
							align="flex-start"
							justify="center"
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
					</Grid.Col>
				</Grid>
			</Paper>
		</Group>
	);
};
