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
  sectionIndex?: number;
  dataContext?: string;
  children?: React.ReactNode;
}

const GridContainer: React.FunctionComponent<IGridContainerProps> = ({
  sectionData,
  isMobileView,
  sectionIndex = 0,
  dataContext: dataContextProp,
  children,
}) => {
  const { title: pageTitle } = React.useContext(PageContext);
  const dataContext = dataContextProp ?? pageTitle;

  const leftSection = sectionData?.leftColumn;
  const rightSection = sectionData?.rightColumn;
  const lengthOfRightSection = rightSection?.references?.length;
  const context = React.useContext(PageContext);

  const hasListItems = rightSection?.references?.some(
    (ref: any) => ref?.__typename === "ContentfulList"
  );

  const firstParagraphRef = React.useRef(true);
  firstParagraphRef.current = true;

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH](node, children) {
        let useEyebrow = false;
        if (hasListItems && firstParagraphRef.current) {
          firstParagraphRef.current = false;
          const textNode = node.content?.find((n: any) => n.nodeType === "text") as { value?: string } | undefined;
          const text = typeof textNode?.value === "string" ? textNode.value : "";
          useEyebrow = Boolean(text && text.length < 60);
        }
        if (useEyebrow) {
          return (
            <div className={classes.eyebrowPill}>
              <span className={classes.eyebrowPillDot} aria-hidden />
              <span>{children}</span>
            </div>
          );
        }
        return <p className={hasListItems ? classes.bodyText : undefined}>{children}</p>;
      },
      [BLOCKS.HEADING_1](node, children) {
        return <Title className={classes.titleH1}>{children}</Title>;
      },
      [BLOCKS.UL_LIST](node, children) {
        return <>{children}</>;
      },
      [BLOCKS.OL_LIST](node, children) {
        return <>{children}</>;
      },
      [BLOCKS.LIST_ITEM](node, children) {
        return <>{children}</>;
      },
    },
  };

  const renderStatCards = (column: ReferenceBodyType) => {
    if (!column?.references) return null;
    const listItems = column.references.filter(
      (ref: any) => ref?.__typename === "ContentfulList"
    );
    if (!listItems.length) return null;

    return (
      <div className={classes.statCardWrapper}>
        <div className={classes.statCardsContainer}>
          {listItems.map((item: any) => (
            <div key={item.id} className={classes.statCard}>
              <div className={classes.statCardRow}>
                <div className={classes.statValueCell}>
                  <Text className={classes.statValue}>{item.heading}</Text>
                </div>
                <div className={classes.statLabelCell}>
                  <Text className={classes.statLabel}>{item.subheading}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
        <Box className={classes.heading}>{renderRichText(column as Parameters<typeof renderRichText>[0], options)}</Box>

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

  const rightContent =
    lengthOfRightSection &&
    (hasListItems ? renderStatCards(rightSection) : renderRightColumn(rightSection));
  const rightSectionEl = rightContent ? (
    <section className={cx(classes.rightSection, classes.rightSectionBelowFooter)} data-context={dataContext} data-section-index={sectionIndex}>
      {rightContent}
    </section>
  ) : null;

  const showRightInGrid = lengthOfRightSection && !(isMobileView && children);

  return (
    <>
      <div className={classes.gridContainer}>
        <Grid gutter={0} style={{ height: "100%" }} align="stretch">
          <Grid.Col
            className={cx(classes.gridBox, classes.left, {
              [classes.mobilePadding]: isMobileView,
            })}
            data-context={dataContext}
            data-section-index={sectionIndex}
            order={{ base: 1, sm: 1, md: 1, lg: 1 }}
            span={{
              base: 12,
              sm: 12,
              md: lengthOfRightSection ? 6 : 12,
              lg: lengthOfRightSection ? 6 : 12,
            }}
          >
            <section>{renderLeftColumn(leftSection, context)}</section>
          </Grid.Col>
          {showRightInGrid && (
            <Grid.Col
              className={cx(classes.gridBox, classes.right, {
                [classes.mobilePadding]: isMobileView,
              })}
              data-context={dataContext}
              data-section-index={sectionIndex}
              order={{ base: 2, sm: 2, md: 2 }}
              span={{ base: 12, md: 6 }}
            >
              <section className={classes.rightSection}>
                {rightContent}
              </section>
            </Grid.Col>
          )}
        </Grid>
      </div>
      {children}
      {isMobileView && children && rightSectionEl}
    </>
  );
};

export default GridContainer;
