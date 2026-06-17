import React from "react";
import { Box, Stack, Text } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import type { TResource } from "types/resource";
import type { TAsset } from "types/asset";
import { getColorFromStylingOptions } from "utils/stylingOptions";
import Asset from "components/common/Asset/Asset";

import * as classes from "./OpportunityCard.module.css";

type Props = {
	resource: TResource;
	index: number;
	sectionIndex?: number;
};

const OpportunityCard: React.FC<Props> = ({
	resource,
	index,
	sectionIndex,
}) => {
	const { heading, icon, body, stylingOptions } = resource;
	const spotlightBg = stylingOptions?.background
		? getColorFromStylingOptions(stylingOptions.background)
		: undefined;
	const isSpotlight = Boolean(spotlightBg);

	const options: Options = {
		renderNode: {
			[BLOCKS.HEADING_2](_node, children) {
				return <Text className={classes.spotlightHero}>{children}</Text>;
			},
			[BLOCKS.HEADING_3](_node, children) {
				return (
					<Text component="h3" className={classes.cardTitle}>
						{children}
					</Text>
				);
			},
			[BLOCKS.PARAGRAPH](_node, children) {
				return <Text className={classes.paragraph}>{children}</Text>;
			},
		},
	};

	return (
		<Stack
			gap={0}
			h="100%"
			className={classes.main}
			data-index={index}
			data-section-index={sectionIndex}
			data-spotlight={isSpotlight ? "true" : undefined}
			style={
				isSpotlight
					? ({
							"--opp-spotlight-bg": spotlightBg,
						} as React.CSSProperties)
					: undefined
			}
		>
			{icon && !isSpotlight && (
				<Box className={classes.graphic}>
					<Asset objectFit="contain" asset={icon as TAsset} />
				</Box>
			)}

			{Boolean(heading?.length) && (
				<Text component="p" className={classes.eyebrow}>
					{heading}
				</Text>
			)}

			{body && <Box className={classes.body}>{renderRichText(body, options)}</Box>}
		</Stack>
	);
};

export default OpportunityCard;
