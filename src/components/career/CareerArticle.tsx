/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {Anchor, Box, Button, Container, Group, Text} from '@mantine/core';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {TResource} from 'types/resource';
import {BLOCKS} from '@contentful/rich-text-types';
import {getLink} from 'utils/getLink';
import {Link} from 'gatsby';

type CareerArticleProps = {
	title: string;
	url: string;
	location: string;
};

const options = {
	renderNode: {
		[BLOCKS.PARAGRAPH](node, children) {
			return <Text>{children}</Text>;
		},
	},
};

const CareerArticle = ({title, url, location}) => (
	<Group position='apart'>
		<Box>
			<Anchor href={url} target='_blank'>
				{
					<Text weight='bold'>
						{title}
						<br />
						{location}
					</Text>
				}
			</Anchor>
		</Box>
	</Group>
);

export default CareerArticle;
