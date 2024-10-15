import { Title, Text, Card, Box } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { FC } from "react";
import React from "react";
import type { TResource } from "types/resource";
import { ArrowIcon } from "../Asset/Arrow";
import Asset from "../Asset/Asset";

import * as classes from "./statsCard.module.css";

type StyleProps = {
  arrow: boolean;
};

type StatsCardProps = {
  resource: Pick<TResource, "heading" | "body" | "asset">;
  arrow?: boolean;
  index?: number;
};

/**
 * StatsCard is a Component to render a StatsCard
 * @param props - {resource} StatsCard Resource with asset, heading, body
 * @returns StatsCard Component
 */
export const StatsCard: FC<StatsCardProps> = ({
  resource: { asset, heading, body },
  arrow = false,
  index,
}) => (
  <Box className={classes.fragment}>
    <Card shadow="none" radius={0} className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Asset asset={asset} />
      </Card.Section>

      {heading && !arrow && (
        <Title mt="md" className={classes.percentage}>
          {heading}
        </Title>
      )}

      {body && (
        <Text color="dark" className={classes.description}>
          {renderRichText(body)}
        </Text>
      )}
    </Card>
    {typeof index === "number" && (
      <Box className={classes.arrow}>
        <ArrowIcon />
      </Box>
    )}
  </Box>
);
