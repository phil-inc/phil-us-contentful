import {Title, Text, createStyles, Card, Box} from '@mantine/core';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {FC} from 'react';
import React from 'react';
import type {TResource} from 'types/resource';
import {ArrowIcon} from '../Asset/Arrow';
import Asset from '../Asset/Asset';
import type {IMixpanel} from 'contexts/MixpanelContext';
import {MixpanelContext} from 'contexts/MixpanelContext';

type StyleProps = {
	arrow: boolean;
};

const useStyles = createStyles((theme, {arrow}: StyleProps, getRef) => {
	const ARROW_HEIGHT = 48;
	const ARROW_WIDTH = 48;

	return {
		card: {
			height: '100%',

			img: {
				width: '100%',
				padding: '0px 16px',
			},
		},

		percentage: {
			fontFamily: 'Lato',
			fontSize: 82,
		},

		description: {
			fontSize: arrow ? 16 : 32,
			color: '#00201F',
			padding: '26px 16px 0px',

			p: {
				margin: 0,
			},
		},

		imageSection: {
			margin: 0,
			paddingTop: 28,
			display: 'grid',
			placeItems: 'center',
		},

		arrow: {
			position: 'absolute',
			top: '25%',
			right: `calc(-20px - ${ARROW_WIDTH / 3}px)`,
			background: '#F4F4F4',
			width: ARROW_WIDTH,
			height: ARROW_HEIGHT,
			borderRadius: '100%',
			zIndex: 1,

			display: 'grid',
			placeItems: 'center',

			[`@media (max-width: ${theme.breakpoints.xs}px)`]: {
				transform: 'rotate(90deg);',
				top: `calc(100% - ${ARROW_HEIGHT / 4}px)`,
				right: `calc(50% - ${ARROW_WIDTH / 2}px)`,
			},
		},

		fragment: {
			position: 'relative',
			height: '100%',
		},
	};
});

type StatsCardProps = {
	resource: Pick<TResource, 'heading' | 'body' | 'asset'>;
	arrow?: boolean;
	index?: number;
};

/**
 * StatsCard is a Component to render a StatsCard
 * @param props - {resource} StatsCard Resource with asset, heading, body
 * @returns StatsCard Component
 */
export const StatsCard: FC<StatsCardProps> = ({resource: {asset, heading, body}, arrow = false, index}) => {
	const {classes} = useStyles({arrow});

	return (
		<Box className={classes.fragment}>
			<Card shadow='none' radius={0} className={classes.card}>
				<Card.Section className={classes.imageSection}>
					<Asset asset={asset} />
				</Card.Section>

				{heading && !arrow && (
					<Title mt='md' className={classes.percentage}>
						{heading}
					</Title>
				)}

				{body && (
					<Text color='dark' className={classes.description}>
						{renderRichText(body)}
					</Text>
				)}
			</Card>
			{typeof index === 'number' && (
				<Box className={classes.arrow}>
					<ArrowIcon />
				</Box>
			)}
		</Box>
	);
};
