import React from 'react';
import {Text, Divider, Box, Title, Grid, Avatar, Group, createStyles, Anchor} from '@mantine/core';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import type {TAuthor} from 'types/resource';
import Asset from 'components/common/Asset/Asset';

const useStyles = createStyles(() => ({
	authorHeading: {
		fontWeight: 'bold',
		fontSize: 30,
		margin: 0,
	},

	authorName: {
		fontWeight: 'bold',
		fontSize: 20,
		margin: 0,
	},

	authorTitle: {
		color: '#6B7979',
		fontSize: 16,
		margin: 0,
		marginBottom: 12,
	},

	authorBio: {
		fontSize: 18,
		margin: 0,
		marginBottom: 12,
	},

	anchor: {
		color: '#00827E',
	},
}));

type TAuthorBlock = {
	author: TAuthor;
};

const AuthorBlock: React.FC<TAuthorBlock> = ({author}) => {
	const {classes} = useStyles();

	const options = {
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				return (
					<Text component='p' mt={0} size={18}>
						{children}
					</Text>
				);
			},

			[INLINES.HYPERLINK](node, children) {
				const {uri} = node.data as {uri: string};
				return (
					<Anchor href={uri} target='_blank' className={classes.anchor} underline>
						{children}
					</Anchor>
				);
			},
		},
	};

	return (
		<>
			<Divider my={52} />
			<Box mb={12}>
				<Title order={4} mb={42} className={classes.authorHeading}>
					Author
				</Title>
				<Grid>
					<Grid.Col sm={12} md='content'>
						<Avatar radius={100} size={100} m={0}>
							<Asset asset={author.avatar} />
						</Avatar>
					</Grid.Col>
					<Grid.Col sm={12} md='auto'>
						<Group spacing={20}>
							<Box>
								<Text className={classes.authorName}>{author.name}</Text>
								<Text className={classes.authorTitle}>{author.authorTitle}</Text>
								<Text className={classes.authorBio} size={16} m={0} mb={12} color='#01201F'>
									{Boolean(author.bio) && renderRichText(author.bio, options)}
								</Text>
							</Box>
						</Group>
					</Grid.Col>
				</Grid>
			</Box>
		</>
	);
};

export default AuthorBlock;
