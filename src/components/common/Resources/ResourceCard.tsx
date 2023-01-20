import {Paper, Title, Divider, Button, Text, createStyles, Grid, Box, Anchor, Group} from '@mantine/core';
import classNames from 'classnames';
import type {FC} from 'react';
import {Link} from 'gatsby';
import React from 'react';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import ImageContainer from '../Container/ImageContainer';
import Asset from '../Asset/Asset';
import {BLOCKS, MARKS, INLINES} from '@contentful/rich-text-types';
import {getDescriptionFromRichtext} from 'utils/getDescription';

type ResourceCardProps = {
	sectionHeader: string;
	resource: TResource;
};

export const ResourceCard: FC<ResourceCardProps> = ({resource}) => {
	const useStyles = createStyles(theme => ({
		card: {
			position: 'relative',
			overflow: 'hidden',
			paddingLeft: 18,
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

	const {classes} = useStyles();
	const {link, isExternal} = getLink(resource);

	const options = {
		renderMark: {
			[MARKS.BOLD]: text => text as string,
			[MARKS.ITALIC]: text => text as string,
		},
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return children as string;
			},
			[BLOCKS.UL_LIST](node, children) {
				return children as string;
			},
			[BLOCKS.OL_LIST](node, children) {
				return children as string;
			},
			[BLOCKS.LIST_ITEM](node, children) {
				return children as string;
			},
			[INLINES.HYPERLINK](node, children) {
				return children as string;
			},
			[BLOCKS.HEADING_1](node, children) {
				return children as string;
			},
			[BLOCKS.HEADING_2](node, children) {
				return children as string;
			},
			[BLOCKS.HEADING_3](node, children) {
				return children as string;
			},
			[BLOCKS.HEADING_4](node, children) {
				return children as string;
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
					<Box pl={40} pr={36} pb={30} sx={{overflow: 'hidden'}}>
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
						<Divider variant='dashed' size={1} style={{maxWidth: 404}} my={10} />
						{resource.body && (
							<Text size={18} mt='sm' mb={20} lineClamp={2}>
								{getDescriptionFromRichtext(resource.body.raw)}
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
