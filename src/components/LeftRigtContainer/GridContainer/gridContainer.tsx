import * as React from "react";
import { Box, Button, Flex, Grid, Text, Title } from "@mantine/core";
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
import { BUTTON_STYLE } from "constants/global.constant";
import { getLink } from "utils/getLink";
import { Link } from "gatsby";

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

  const isDemoForm =
    rightSection?.references?.some((ref: any) =>
      [DEMO_FROM_SECTION, THANKS_FOR_YOUR_INTEREST_IN_PHILRX].includes(
        ref?.header
      )
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
            <div
              className={classes.eyebrowPill}
              data-context={dataContext}
              data-section-index={sectionIndex}
            >
              <span className={classes.eyebrowPillDot} aria-hidden />
              <span>{children}</span>
            </div>
          );
        }
        return (
          <p
            className={hasListItems ? classes.bodyText : undefined}
            data-context={dataContext}
            data-section-index={sectionIndex}
          >
            {children}
          </p>
        );
      },
      [BLOCKS.HEADING_1](node, children) {
        return (
          <Title
            className={classes.titleH1}
            data-context={dataContext}
            data-section-index={sectionIndex}
          >
            {children}
          </Title>
        );
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
      <div
        className={classes.statCardWrapper}
        data-context={dataContext}
        data-section-index={sectionIndex}
      >
        <div
          className={classes.statCardsContainer}
          data-context={dataContext}
          data-section-index={sectionIndex}
        >
          {listItems.map((item: any) => (
            <div
              key={item.id}
              className={classes.statCard}
              data-context={dataContext}
              data-section-index={sectionIndex}
            >
              <div
                className={classes.statCardRow}
                data-context={dataContext}
                data-section-index={sectionIndex}
              >
                <div
                  className={classes.statValueCell}
                  data-context={dataContext}
                  data-section-index={sectionIndex}
                >
                  <Text
                    className={classes.statValue}
                    data-context={dataContext}
                    data-section-index={sectionIndex}
                  >
                    {item.heading}
                  </Text>
                </div>
                <div
                  className={classes.statLabelCell}
                  data-context={dataContext}
                  data-section-index={sectionIndex}
                >
                  <Text
                    className={classes.statLabel}
                    data-context={dataContext}
                    data-section-index={sectionIndex}
                  >
                    {item.subheading}
                  </Text>
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

    const columnIsDemoForm =
      column?.references?.some((ref: any) =>
        [DEMO_FROM_SECTION, THANKS_FOR_YOUR_INTEREST_IN_PHILRX].includes(
          ref?.header
        )
      );

    return (
      <div
        className={cx(classes.border, columnIsDemoForm && classes.demoFormCard)}
        data-context={dataContext}
        data-section-index={sectionIndex}
      >
        {column?.references &&
          column.references.map((entry: any, idx: number) => {
            const isDemo = [
              DEMO_FROM_SECTION,
              THANKS_FOR_YOUR_INTEREST_IN_PHILRX,
            ].includes(entry.header);

            if (isDemo) {
              return (
                <React.Fragment key={entry.id || idx}>
                  <BasicSectionColumn section={entry} />
                </React.Fragment>
              );
            }

            if (entry?.__typename === "ContentfulButton") {
              const isSecondary = entry.buttonStyle === BUTTON_STYLE.Secondary;
              const isOvalButton = /oval/i.test(entry.buttonStyle ?? "");
              const { link, isExternal } = getLink(entry, true);
              const label = `${entry.buttonText ?? ""}${isOvalButton ? " \u2192" : ""}`;
              
              const btn = (
                <Button
                  className={cx(classes.button, {
                    [classes.ovalBtn]: isOvalButton,
                  })}
                  variant={isSecondary ? "white" : "philDefault"}
                >
                  {label}
                </Button>
              );

              return (
                <Box key={entry.id || idx} className={classes.gtnCtaButtonWrap}>
                  {isExternal ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.gtnCtaButtonLink}
                    >
                      {btn}
                    </a>
                  ) : (
                    <Link to={link} className={classes.gtnCtaButtonLink}>
                      {btn}
                    </Link>
                  )}
                </Box>
              );
            }

            return null;
          })}
      </div>
    );
  };

  const renderLeftColumn = (column: ReferenceBodyType, context: any) => {
    if (!column) return null;

    return (
      <div>
        <Box
          className={classes.heading}
          data-context={dataContext}
          data-section-index={sectionIndex}
        >
          {renderRichText(column as Parameters<typeof renderRichText>[0], options)}
        </Box>

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
  const isFormOnTopMobile =
    isDemoForm && isMobileView && Boolean(rightContent);

  const rightSectionEl = rightContent ? (
    <section
      className={cx(
        classes.rightSection,
        classes.rightSectionBelowFooter,
        isFormOnTopMobile && classes.demoFormMobileTop
      )}
      data-context={dataContext}
      data-section-index={sectionIndex}
    >
      {rightContent}
    </section>
  ) : null;

  const showRightInGrid =
    lengthOfRightSection &&
    !(isMobileView && (children || isDemoForm));

  const gridBlock = (
    <div
      className={cx(
        classes.gridContainer,
        isFormOnTopMobile && classes.demoFormGridBelow
      )}
      data-context={dataContext}
      data-section-index={sectionIndex}
    >
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
            <section
              className={classes.rightSection}
              data-context={dataContext}
              data-section-index={sectionIndex}
            >
              {rightContent}
            </section>
          </Grid.Col>
        )}
      </Grid>
    </div>
  );

  if (isFormOnTopMobile && rightSectionEl) {
    return (
      <>
        {rightSectionEl}
        {gridBlock}
        {children}
      </>
    );
  }

  return (
    <>
      {gridBlock}
      {children}
      {isMobileView && children && rightSectionEl}
    </>
  );
};

export default GridContainer;
