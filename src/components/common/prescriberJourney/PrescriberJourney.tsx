import {Title, Text, Box, Group, Container} from '@mantine/core';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';

type PrescriberJourneyProps = {
	resource: Pick<TResource, 'asset' | 'body' | 'heading'>;
};

/**
 * PrescriberJourney is a Component to render a PrescriberJourney
 * @param props - {resource} PrescriberJourney Resource with asset, heading, body
 * @returns PrescriberJourney Component
 */
export const PrescriberJourney: FC<PrescriberJourneyProps> = ({resource: {asset, body, heading}}) => {
	const pathToImage = getImage(asset);

	return (
		<Box>
			<Group position='center'>
				<Title>{heading}</Title>
			</Group>
			<Container size='sm' mb={25}>
				<Group position='center'>
					<Text size={18}>{renderRichText(body)}</Text>
				</Group>
			</Container>

			<GatsbyImage image={pathToImage} alt={heading} />
		</Box>
	);
};
