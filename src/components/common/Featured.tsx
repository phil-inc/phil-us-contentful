import {Paper, Title, Divider, Text, createStyles, Grid, Box, Anchor} from '@mantine/core';
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

type FeaturedProps = {
	resource: TResource;
	noDivider?: boolean;
	resourceBackground?: string;
	pr?: number;
};

export const Featured: FC<FeaturedProps> = ({resource, noDivider = false, resourceBackground = '#F4F4F4', pr = 0}) => {
	const useStyles = createStyles(theme => ({
		card: {
			position: 'relative',
			overflow: 'hidden',
			paddingLeft: 18,
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

		center: {
			display: 'grid',
			alignItems: 'center',
		},

		textDecorationNone: {
			color: 'inherit',
			textDecoration: 'none',
			cursor: 'pointer',
		},
	}));

	const {classes, theme} = useStyles();
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
		<Paper radius={0} className={classNames(classes.card)}>
			<Grid justify='center' style={{height: '100%'}} mt={0}>
				<Grid.Col lg={5} sm={6} md={6} p={0} pl={8}>
					{resource.asset && (
						<ImageContainer fluid>
							<Asset asset={resource.asset} />
						</ImageContainer>
					)}
				</Grid.Col>
				<Grid.Col lg={7} sm={6} md={6} className={classes.center}>
					<Box pl={theme.spacing.sm} pr={60} sx={{overflow: 'hidden'}}>
						{resource.heading && (
							<>
								{isExternal ? (
									<Anchor href={link} target='_blank' underline={false} className={classes.textDecorationNone}>
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
							<Text size={18} mt='sm' mb={20} lineClamp={2}>
								{resource.description.description}
							</Text>
						) : (
							resource.body && (
								<Text size={18} mt='sm' mb={20} lineClamp={2}>
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
