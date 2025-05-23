import React, { useContext } from "react";
import { Divider, Grid, Text, Title } from "@mantine/core";

import { TResource } from "types/resource";
import { IReferencedSection } from "types/section";

import { getDescriptionFromRichtext } from "utils/getDescription";

import * as classes from "./ReferenceSectionColumn.module.css";

import PageContext from "contexts/PageContext";

type Props = {
  section: IReferencedSection;
};

//TODO: need to make like ReferencedSection but it is done for the demo page only
const ReferencedSectionColumn = ({ section }: Props) => {
  const context = useContext(PageContext);

  return (
    <section className={classes.referencedSection}>
      <Title order={3} className={classes.title}>
        {section.title}
      </Title>
      <Title order={3} className={classes.header}>
        {section.header}
      </Title>
      {section.subHeading?.subHeading && (
        <Text mt={4} className={classes.subHeading}>
          <span className={classes.subHeadingSpan}>
            {section.subHeading.subHeading}
          </span>
        </Text>
      )}

      <Grid
        className={classes.gridCard}
        gutter={0}
        justify="center"
        align="center"
      >
        {section.references?.map((item: TResource) => {
          return (
            <Grid.Col
              key={item.id + "card"}
              span={{ base: 12, sm: 4, md: 4, lg: 4 }}
            >
              <div className={classes.card}>
                <Text align="center" className={classes.cardTitle}>
                  {item.heading}
                </Text>
                {item.body && (
                  <div>
                    <Text className={classes.cardBody} lineClamp={2}>
                      {getDescriptionFromRichtext(item?.body?.raw ?? "")}
                    </Text>
                  </div>
                )}
              </div>
            </Grid.Col>
          );
        })}
      </Grid>
      {Boolean(section.addBorder) && (
        <Divider size={"sm"} className={classes.divider} />
      )}
    </section>
  );
};

export default ReferencedSectionColumn;
