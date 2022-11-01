import {Title, Text, Box, Group, Container} from '@mantine/core';
import {useMediaQuery} from '@mantine/hooks';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';
import Asset from '../Asset/Asset';
import ImageContainer from '../Container/ImageContainer';

type PrescriberJourneyProps = {
	resource: Pick<TResource, 'asset' | 'body' | 'heading'>;
};

/**
 * PrescriberJourney is a Component to render a PrescriberJourney
 * @param props - {resource} PrescriberJourney Resource with asset, heading, body
 * @returns PrescriberJourney Component
 */
export const PrescriberJourney: FC<PrescriberJourneyProps> = ({resource: {asset, body, heading}}) => {
	const isMobile = useMediaQuery('(max-width: 576px)', false, {getInitialValueInEffect: false});

	return (
		<Box>
			{heading && (
				<Group position='center'>
					<Title style={{lineHeight: '68px'}} mb={15}>
						{heading}
					</Title>
				</Group>
			)}
			{body && (
				<Container size='sm' mb={10}>
					<Group position='center'>
						<Text size={18}>{renderRichText(body)}</Text>
					</Group>
				</Container>
			)}
			<Box mx={'-5.4%'}>
				<Asset asset={asset} />
			</Box>
		</Box>
	);
};
