import {
	Paper,
	Container,
	Center,
	Title,
	Divider,
	Button,
	Text,
	createStyles,
	Box,
	Stack,
	Anchor,
	Group,
	AspectRatio,
} from '@mantine/core';
import classNames from 'classnames';
import {Link} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TAsset} from 'types/asset';
import type {TLink, TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import Asset from './Asset/Asset';
import {BLOCKS, MARKS, INLINES} from '@contentful/rich-text-types';
import ImageContainer from './Container/ImageContainer';

const useStyles = createStyles(theme => ({
	card: {
		position: 'relative',
		overflow: 'hidden',
		padding: '50px 30px 40px 30px',
		width: '100%',
		height: '100%',
		minWidth: '100%',
		minHeight: '100%',
		lineHeight: '27px',

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

	blue: {
		'&::before': {
			background: '#29A5B4 0% 0% no-repeat padding-box',
		},
	},

	yellow: {
		'&::before': {
			background: '#EDBE3D 0% 0% no-repeat padding-box',
		},
	},

	none: {
		'&::before': {
			width: 0,
		},
	},

	imageWrapper: {
		maxWidth: 425,
		maxHeight: 425,
		padding: 0,
	},

	fullHeight: {
		height: '100%',
	},

	fullWidth: {
		width: '100%',
	},
}));

type ArticleProps = {
	color: 'blue' | 'yellow' | 'none';
	resource: TResource;
};

export const Article: FC<ArticleProps> = ({color, resource}) => {
	const {classes} = useStyles();
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
								<Asset asset={asset} />
							</AspectRatio>
						</ImageContainer>
					</Container>

					<Title order={3}>{heading}</Title>
					<Divider variant='dashed' size={1} style={{maxWidth: 404}} mt={10} mb={13} />
					<Text size='sm' mt={0} mb={11} pr={50}>
						{resource.body && renderRichText(resource.body, options)}
					</Text>
				</Box>
				<Group position='center'>
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
