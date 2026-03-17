import * as React from "react";
import { Flex, Text, Title } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";

import { TResource } from "types/resource";
import { ReferenceBodyType } from "types/section";

import Asset from "components/common/Asset/Asset";
import { BrandOutcomeCard } from "components/brandOutcomeCard/BrandOutcomeCard";

import * as classes from "./FloorContainer.module.css";

interface IFloorContainerProps {
  floorData?: ReferenceBodyType;
  brandMetric?: TResource[];
}

const FloorContainer: React.FunctionComponent<IFloorContainerProps> = ({
  floorData,
  brandMetric,
}) => {
  const listRefs = React.useMemo(
    () =>
      (floorData?.references as any[])?.filter(
        (ref: any) => ref?.__typename === "ContentfulList"
      ) ?? [],
    [floorData?.references]
  );

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        return <Text className={classes.paragraph}>{children}</Text>;
      },

      [BLOCKS.HEADING_6](node, children) {
        return (
          <Title order={6} className={classes.titleH6}>
            {children}
          </Title>
        );
      },
    },
  };

  if (listRefs.length > 0) {
    return (
      <section className={classes.floorContainer}>
        <Flex
          gap={{ base: 16, md: 32 }}
          wrap="wrap"
          align="center"
          className={classes.footerListRow}
        >
          {listRefs.map((entry: any) => (
            <Flex key={entry.id} gap={12} align="center" className={classes.footerListItem}>
              {entry.icon && (
                <div className={classes.footerListIcon}>
                  <Asset asset={entry.icon} />
                </div>
              )}
              <Text className={classes.footerListText}>{entry.heading}</Text>
            </Flex>
          ))}
        </Flex>
      </section>
    );
  }

  return (
    <section className={classes.floorContainer}>
      {floorData && (
        <div className={classes.flexLeft}>
          {renderRichText(floorData as Parameters<typeof renderRichText>[0], options)}
        </div>
      )}

      {brandMetric && brandMetric.length > 0 && (
        <div className={classes.flexRight}>
          {brandMetric.map((resource, index) => (
            <React.Fragment key={resource.id || index}>
              <BrandOutcomeCard resource={resource} />
            </React.Fragment>
          ))}
        </div>
      )}
    </section>
  );
};

export default FloorContainer;
