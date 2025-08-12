import * as React from "react";
import { Box, Flex, Grid, Text, Title } from "@mantine/core";
import PageContext from "contexts/PageContext";
import {
  ITextandTextColumnsWithFooterSection,
  ReferenceBodyType,
} from "types/section";
import cx from "clsx";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import {
  DEMO_FROM_SECTION,
  THANKS_FOR_YOUR_INTEREST_IN_PHILRX,
} from "constants/identifiers";

import BasicSectionColumn from "components/sectionInColumn/basicSectionColumn/BasicSectionColumn";

import * as classes from "./gridContainer.module.css";

interface IGridContainerProps {
  sectionData: ITextandTextColumnsWithFooterSection;
  isMobileView: boolean;
}

const GridContainer: React.FunctionComponent<IGridContainerProps> = ({
  sectionData,
  isMobileView,
}) => {
  const { title } = React.useContext(PageContext);

  const leftSection = sectionData?.leftColumn;
  const rightSection = sectionData?.rightColumn;
  const lengthOfRightSection = rightSection?.references?.length;
  const context = React.useContext(PageContext);

  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_1](node, children) {
        return <Title className={classes.titleH1}>{children}</Title>;
      },
    },
  };

  const renderRightColumn = (column: ReferenceBodyType) => {
    if (!column) return null;

    return (
      <div className={classes.border}>
        {column?.references &&
          column.references.map((entry: any, idx: number) => {
            return (
              <React.Fragment key={entry.id || idx}>
                {[
                  DEMO_FROM_SECTION,
                  THANKS_FOR_YOUR_INTEREST_IN_PHILRX,
                ].includes(entry.header) && (
                  <BasicSectionColumn section={entry} />
                )}
              </React.Fragment>
            );
          })}
      </div>
    );
  };

  const renderLeftColumn = (column: ReferenceBodyType, context: any) => {
    if (!column) return null;

    return (
      <div>
        <Box className={classes.heading}>{renderRichText(column, options)}</Box>

        <div>
          {column.references?.map((item) => {
            return (
              <Flex gap={8} key={item.id} className={classes.listItem}>
                <IconCircleCheckFilled
                  className={classes.checkIcon}
                  size={50}
                  color="#ffff"
                />
                <Text data-context={context.title} className={classes.listText}>
                  {item.heading}
                </Text>
              </Flex>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={classes.gridContainer}>
        <Grid gutter={0} style={{ height: "100%" }} align="center">
          <Grid.Col
            className={cx(classes.gridBox, classes.left, {
              [classes.mobilePadding]: isMobileView,
            })}
            data-context={title}
            order={{ base: 2, sm: 2, md: 1, lg: 1 }}
            span={{
              base: 12,
              sm: 12,
              md: lengthOfRightSection ? 6 : 12,
              lg: lengthOfRightSection ? 6 : 12,
            }}
          >
            <section>{renderLeftColumn(leftSection, context)}</section>
          </Grid.Col>
          {lengthOfRightSection && (
            <Grid.Col
              className={cx(classes.gridBox, classes.right, {
                [classes.mobilePadding]: isMobileView,
              })}
              data-context={title}
              order={{ base: 1, md: 2 }}
              span={{ base: 12, md: 6 }}
            >
              <section className={classes.rightSection}>
                {renderRightColumn(rightSection)}
              </section>
            </Grid.Col>
          )}
        </Grid>
      </div>
    </>
  );
};

export default GridContainer;
