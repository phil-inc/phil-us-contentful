import {Paper, Title, Divider, Text, Grid, Box, Anchor, useMantineTheme} from '@mantine/core';
import classNames from 'classnames';
import type {FC} from 'react';
import {Link} from 'gatsby';
import React from 'react';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import {BLOCKS, MARKS, INLINES} from '@contentful/rich-text-types';
import ImageContainer from './Container/ImageContainer';
import Asset from './Asset/Asset';

import * as classes from './featured.module.css';

type FeaturedProps = {
	resource: TResource;
	noDivider?: boolean;
	resourceBackground?: string;
	pr?: number;
};

export const Featured: FC<FeaturedProps> = ({resource, noDivider = false, resourceBackground = '#F4F4F4', pr = 0}) => {
	const theme = useMantineTheme();
	const {link, isExternal} = getLink(resource);

	const options = {
		renderMark: {
			[MARKS.BOLD]: text => <>{text}</>,
			[MARKS.ITALIC]: text => <>{text}</>,
		},
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.UL_LIST](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.OL_LIST](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.LIST_ITEM](node, children) {
				return <>{children}</>;
			},
			[INLINES.HYPERLINK](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.HEADING_1](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.HEADING_2](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.HEADING_3](node, children) {
				return <>{children}</>;
			},
			[BLOCKS.HEADING_4](node, children) {
				return <>{children}</>;
			},
		},
	};

	return (
		<Paper radius={0} style={{background: resourceBackground}} className={classes.card}>
			<Grid justify='center' style={{height: '100%'}} mt={0}>
				<Grid.Col span={{base: 12, lg: 5, sm: 6, md: 6}} p={0} pl={8}>
					{resource.asset && (
						<ImageContainer fluid>
							<Asset asset={resource.asset} />
						</ImageContainer>
					)}
				</Grid.Col>
				<Grid.Col span={{base: 12, lg: 7, sm: 6, md: 6}} className={classes.center}>
					<Box pl={theme.spacing.sm} pr={60} style={{overflow: 'hidden'}}>
						{resource.heading && (
							<>
								{isExternal ? (
									<Anchor href={link} target='_blank' underline='never' className={classes.textDecorationNone}>
										<Title order={3} mt='md'>
											{resource.heading}
										</Title>
									</Anchor>
								) : (
									<Link to={link} className={classes.textDecorationNone}>
										<Title order={3} mt='md'>
											{resource.heading}
										</Title>
									</Link>
								)}
							</>
						)}
						<Divider variant='dashed' size={1} style={{maxWidth: 404}} my={13} />

						{resource?.description?.description?.length ? (
							<Text size='18px' lh={'27.7px'} mt='sm' mb={20} lineClamp={2}>
								{resource.description.description}
							</Text>
						) : (
							resource.body && (
								<Text size='18px' lh={'27.7px'} mt='sm' mb={20} lineClamp={2}>
									{renderRichText(resource.body, options)}
								</Text>
							)
						)}
					</Box>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};
