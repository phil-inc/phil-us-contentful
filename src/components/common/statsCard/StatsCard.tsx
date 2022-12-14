import {Title, Text, createStyles, Card, Image} from '@mantine/core';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';
import Asset from '../Asset/Asset';

const useStyles = createStyles(theme => ({
	card: {
		height: '100%',
	},
	percentage: {
		fontFamily: 'Lato',
		fontSize: 82,
	},
	description: {
		fontSize: '32px',
		color: '#00201F',

		p: {
			margin: 0,
		},
	},
}));

type StatsCardProps = {
	resource: Pick<TResource, 'heading' | 'body' | 'asset'>;
};

/**
 * StatsCard is a Component to render a StatsCard
 * @param props - {resource} StatsCard Resource with asset, heading, body
 * @returns StatsCard Component
 */
export const StatsCard: FC<StatsCardProps> = ({resource: {asset, heading, body}}) => {
	const {classes} = useStyles();

	return (
		<Card shadow='none' radius={0} p={0} className={classes.card}>
			<Card.Section>
				<Asset asset={asset} />
			</Card.Section>

			{heading && (
				<Title mt='md' className={classes.percentage}>
					{heading}
				</Title>
			)}

			{body && (
				<Text color='dark' className={classes.description} p={30}>
					{renderRichText(body)}
				</Text>
			)}
		</Card>
	);
};
