import {Paper, Title, Button, Text, Box, Stack, Anchor, Group, Grid, Center} from '@mantine/core';
import {Link, navigate} from 'gatsby';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React, {useContext} from 'react';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import Asset from './Asset/Asset';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import ImageContainer from './Container/ImageContainer';

import * as classes from './card.module.css';
import {getColorFromStylingOptions} from 'utils/stylingOptions';

import {type Options} from '@contentful/rich-text-react-renderer';
import {isVideoContent} from 'utils/isVideoContent';
import PageContext from 'contexts/PageContext';
import { LIFE_SCIENCES_PAGE, PATIENTS_PAGE } from 'constants/page';
type ArticleProps = {
	resource: TResource;
	isEmployeeTag?: boolean;
};

export const CCard: FC<ArticleProps> = ({resource, isEmployeeTag}) => {
	const {body, heading, asset, buttonText} = resource;
	const context = useContext(PageContext);
	// Const showButton = !asset && !resource.isFaq && buttonText?.length;

	const options: Options = {
		renderNode: {
			[INLINES.ENTRY_HYPERLINK](node, children) {
				const {link} = getLink(node.data.target);
				const {isFaq} = node.data.target;

				return (
					<Link className={classes.entryLink} data-is-faq={isFaq} to={link}>
						{children}
					</Link>
				);
			},

			// TODO: Refactor this
			[BLOCKS.EMBEDDED_ENTRY](node, children) {
				if (node?.data?.target) {
					const {target} = node.data;

					if (target.__typename === 'ContentfulMediaItem') {
						return (
							<ImageContainer flexStart fluid maw={128}>
								<Asset objectFit='contain' asset={target} />
							</ImageContainer>
						);
					}

					const button = (
						<Button
							classNames={{root: classes.buttonRoot, inner: classes.buttonInner, label: classes.buttonLabel}}
							variant='philDefault'
						>
							{node.data.target.buttonText}
						</Button>
					);

					if (target?.link?.internalContent) {
						const {link} = getLink(target, true);

						return (
							<Link className={classes.internalLink} to={link}>
								{button}
							</Link>
						);
					}

					return (
						<Anchor href={target?.link?.externalUrl ?? '#'} target='_blank' referrerPolicy='no-referrer'>
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
					<Title order={1} lh={'normal'}>
						{children}
					</Title>
				);
			},
			[BLOCKS.HEADING_2](node, children) {
				return (
					<Title order={2} lh={'normal'}>
						{children}
					</Title>
				);
			},
			[BLOCKS.HEADING_3](node, children) {
				return (
					<Title order={3} lh={'normal'}>
						{children}
					</Title>
				);
			},
			[BLOCKS.HEADING_4](node, children) {
				return (
					<Title order={4} lh={'normal'}>
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
					<Asset objectFit='contain' asset={media} />
				</ImageContainer>
			</Center>
		);
	}

	// TODO: Add hover animation + anchor tags
	// REFACTOR:: handle different styles better: isFaq, Asset
	return (
		// TODO: Add anchor links to cards
		<Group h={'100%'} gap={0} data-is-faq={resource.isFaq} className={classes.group}>
			<Box
				component='span'
				h='100%'
				className={classes.before}
				w={getColorFromStylingOptions(resource?.stylingOptions?.extraColor) !== 'transparent' ? 12 : 0}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.extraColor)}}
				data-has-asset={Boolean(media)}
			></Box>
			<Paper
				className={classes.paper}
				style={{background: getColorFromStylingOptions(resource?.stylingOptions?.background)}}
				radius={0}
				data-has-asset={Boolean(media)}
				data-context={context.title}
				data-is-faq={resource.isFaq}
			>
				<Grid gutter={0} classNames={{inner: classes.gridInner, root: classes.gridRoot}}>
					{media && !resource.isFaq && (
						<Grid.Col span={{base: 12, md: context.title === LIFE_SCIENCES_PAGE ? 2 : 6}}>
							{/* // TODO: check regression with 1/2 ratio images */}
							<ImageContainer
								isVideo={isVideoContent(media?.file?.contentType) || Boolean(media?.youtubeLink)}
								fluid
								contain
								card
								mx={0}
							>
								<Asset objectFit='cover' asset={media} />
							</ImageContainer>
						</Grid.Col>
					)}

					<Grid.Col span='auto'>
						<Stack
							className={classes.stack}
							data-has-asset={Boolean(media)}
							data-is-faq={resource.isFaq || resource.body.references?.some(ref => ref.isFaq)}
							data-context={context.title}
							h='100%'
							gap={0}
						>
							{body && renderRichText(body, options)}
						</Stack>
					</Grid.Col>
				</Grid>
			</Paper>
		</Group>
	);
};
