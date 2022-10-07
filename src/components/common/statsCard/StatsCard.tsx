import {Title, Text, createStyles, Card, Image} from '@mantine/core';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';

const useStyles = createStyles(theme => ({
	card: {
		height: '100%',
	},
	percentage: {
		fontFamily: 'Lato',
		fontSize: 82,
	},
	description: {
		fontSize: '35px',
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
	const pathToImage = getImage(asset);

	return (
		<Card shadow="none" p="xl" radius={0} className={classes.card}>
			<Card.Section>
				<GatsbyImage image={pathToImage} alt={heading} />
			</Card.Section>

			<Title mt="md" className={classes.percentage}>
				{heading}
			</Title>

			<Text color="dark" className={classes.description}>
				{renderRichText(body)}
			</Text>
		</Card>
	);
};
