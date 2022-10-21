import {Anchor, Box, Button, Container, Group, Text} from '@mantine/core';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {TResource} from 'types/resource';
import {BLOCKS} from '@contentful/rich-text-types';
import {getLink} from 'utils/getLink';
import {Link} from 'gatsby';

type CareerArticleProps = {
	listing: TResource;
};

const options = {
	renderNode: {
		[BLOCKS.PARAGRAPH](node, children) {
			return <Text>{children}</Text>;
		},
	},
};

const CareerArticle: React.FC<CareerArticleProps> = ({listing}) => {
	const {link, isExternal} = getLink(listing);

	return (
		<Group position='apart'>
			<Box>
				{listing.heading && <Text weight='bold'>{listing.heading}</Text>}
				{listing.body && <Text italic>{renderRichText(listing.body, options)}</Text>}
			</Box>

			{isExternal ? (
				<Anchor href={link} target='_blank'>
					<Button>{listing.buttonText}</Button>
				</Anchor>
			) : (
				<Link to={link}>
					<Button>{listing.buttonText}</Button>
				</Link>
			)}
		</Group>
	);
};

export default CareerArticle;
