import React, { useState } from "react";
import { Box, Container, Grid, Text } from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import cx from "clsx";
import { IMetric, ISection, MediaItem } from "types/section";
import { TAsset } from "types/asset";
import Asset from "components/common/Asset/Asset";
import PageContext from "contexts/PageContext";
import * as classes from "./TabbedSectionGroup.module.css";

type TabbedSectionGroupProps = {
  metric: IMetric;
  sections: ISection[];
};

const TabbedSectionGroup: React.FC<TabbedSectionGroupProps> = ({
  metric,
  sections,
}) => {
  const context = React.useContext(PageContext);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const activeSection = sections[activeTabIndex];

  // Handle click on the entire grid to cycle through tabs
  const handleGridClick = () => {
    setActiveTabIndex((prev) => (prev + 1) % sections.length);
    setAnimationKey((prev) => prev + 1); // Trigger animation
  };

  // Get media from mediaItem (v2) or fallback to asset
  const activeMediaItemOrAsset =
    activeSection?.mediaItem || activeSection?.asset;

  // Render rich text but skip headings (show only paragraphs / normal text)
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: () => null,
      [BLOCKS.HEADING_2]: () => null,
      [BLOCKS.HEADING_3]: () => null,
      [BLOCKS.HEADING_4]: () => null,
      [BLOCKS.HEADING_5]: () => null,
      [BLOCKS.HEADING_6]: () => null,
    },
  };

  return (
    <Container
      size="xl"
      data-context={context.title}
      className={classes.tabbedContainer}
    >
      {/* Metric Heading */}
      <Text className={classes.title}>{metric.metricLabel}</Text>
      {metric.metricDescription && (
        <Text className={classes.subTitle}>{metric.metricDescription}</Text>
      )}
      {metric.metricDescriptionRichText && (
        <Box className={classes.description}>
          {renderRichText(metric.metricDescriptionRichText, {})}
        </Box>
      )}

      {/* Clickable Grid - cycles through tabs on click */}
      <Box className={classes.clickableArea} onClick={handleGridClick}>
        <Grid className={classes.tabbedGrid} gutter={{ base: 20, md: 40 }}>
          {/* Left Column - Image/Content Area */}
          <Grid.Col
            span={{ base: 12, md: 7 }}
            className={classes.contentColumn}
          >
            <Box className={classes.imageContainer}>
              {/* Section Title - key triggers fade animation on change */}
              <Text
                key={`title-${animationKey}`}
                className={classes.imageSectionTitle}
              >
                {activeSection?.header}
              </Text>

              {/* Image/Asset - key triggers fade animation, last 2 images are smaller */}
              {activeMediaItemOrAsset && (
                <Box
                  key={`image-${animationKey}`}
                  className={cx(classes.imageWrapper, {
                    [classes.imageWrapperSmall]: activeTabIndex >= 2,
                  })}
                >
                  <Asset asset={activeMediaItemOrAsset as TAsset & MediaItem} />
                </Box>
              )}

              {/* Pagination Dots */}
              <Box className={classes.paginationDots}>
                {sections.map((_, index) => (
                  <span
                    key={index}
                    className={cx(classes.dot, {
                      [classes.dotActive]: index === activeTabIndex,
                    })}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </Box>
            </Box>
          </Grid.Col>

          {/* Right Column - Tab Buttons (visual only, click on grid cycles) */}
          <Grid.Col span={{ base: 12, md: 5 }} className={classes.tabsColumn}>
            <Box className={classes.tabsList} key={`tabs-${animationKey}`}>
              {sections.map((section, tabIndex) => {
                const isActive = tabIndex === activeTabIndex;
                return (
                  <Box
                    key={section.id}
                    className={cx(classes.tabButton, {
                      [classes.tabButtonActiveFirst]:
                        isActive && activeTabIndex === 0,
                      [classes.tabButtonActiveRest]:
                        isActive && activeTabIndex !== 0,
                      [classes.tabButtonInactive]: !isActive,
                    })}
                  >
                    <Box className={classes.tabButtonContent}>
                      <Text
                        className={cx(classes.tabButtonTitle, {
                          [classes.tabButtonTitleActive]: isActive,
                        })}
                      >
                        {section.header}
                      </Text>
                      {/* Description - only visible when active */}
                      <Box
                        className={cx(classes.tabButtonDescription, {
                          [classes.tabButtonDescriptionActive]: isActive,
                          [classes.tabButtonDescriptionFirst]:
                            isActive && activeTabIndex === 0,
                        })}
                      >
                        {section.body &&
                          renderRichText(section.body, options)}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
    </Container>
  );
};

export default TabbedSectionGroup;
