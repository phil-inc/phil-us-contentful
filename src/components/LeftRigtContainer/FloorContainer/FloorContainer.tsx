import * as React from "react";
import { Text, Title } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";

import { TResource } from "types/resource";
import { ReferenceBodyType } from "types/section";

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

  const options = {
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

  return (
    <section className={classes.floorContainer}>
      {floorData && (
        <div className={classes.flexLeft}>
          {renderRichText(floorData, options)}
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
