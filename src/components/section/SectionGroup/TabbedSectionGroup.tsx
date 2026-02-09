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

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_1]: () => null,
    [BLOCKS.HEADING_2]: () => null,
    [BLOCKS.HEADING_3]: () => null,
    [BLOCKS.HEADING_4]: () => null,
    [BLOCKS.HEADING_5]: () => null,
    [BLOCKS.HEADING_6]: () => null,
  },
};

const getMedia = (section?: ISection) =>
  section?.mediaItem || section?.asset;

//To make the images size smaller so that we can see the transition effect better
// Scale decreases per tab: 1 → 0.9 → 0.82 → 0.75 → …  (floors at 0.6)
const getScale = (index: number) => Math.max(0.6, 1 - index * 0.09);

const TabbedSectionGroup: React.FC<TabbedSectionGroupProps> = ({
  metric,
  sections,
}) => {
  const context = React.useContext(PageContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);

  const activeSection = sections[activeIndex];
  const fadingSection = fadingIndex !== null ? sections[fadingIndex] : null;

  const handleClick = () => {
    if (fadingIndex !== null) return;
    setFadingIndex(activeIndex);
    setActiveIndex((i) => (i + 1) % sections.length);
  };

  const activeMedia = getMedia(activeSection);
  const fadingMedia = getMedia(fadingSection ?? undefined);

  return (
    <Container
      size="xl"
      data-context={context.title}
      className={classes.tabbedContainer}
    >
      {/* Metric Heading */}
      {metric?.metricLabel && (
        <Text className={classes.title}>{metric.metricLabel}</Text>
      )}
      {metric?.metricDescription && (
        <Text className={classes.subTitle}>{metric.metricDescription}</Text>
      )}
      {metric?.metricDescriptionRichText && (
        <Box className={classes.description}>
          {renderRichText(metric.metricDescriptionRichText, {})}
        </Box>
      )}

      {/* Clickable Grid — cycles through tabs on click */}
      <Box className={classes.clickableArea} onClick={handleClick}>
        <Grid className={classes.tabbedGrid} gutter={{ base: 20, md: 40 }}>
          {/* Left Column — Image / Content */}
          <Grid.Col
            span={{ base: 12, md: 7 }}
            className={classes.contentColumn}
          >
            <Box className={classes.imageContainer}>
              <Box className={classes.overlapArea}>
                <Text
                  key={activeIndex}
                  className={cx(classes.imageSectionTitle, classes.fadeIn)}
                >
                  {activeSection?.header}
                </Text>
                {fadingSection && (
                  <Text
                    className={cx(classes.imageSectionTitle, classes.fadeOut)}
                    onAnimationEnd={() => setFadingIndex(null)}
                  >
                    {fadingSection.header}
                  </Text>
                )}
              </Box>

              <Box className={classes.overlapAreaFlex}>
                {activeMedia && (
                  <Box
                    key={activeIndex}
                    className={cx(classes.imageWrapper, classes.fadeIn)}
                    style={{ transform: `scale(${getScale(activeIndex)})` }}
                  >
                    <Asset asset={activeMedia as TAsset & MediaItem} />
                  </Box>
                )}
                {fadingMedia && (
                  <Box
                    className={cx(classes.imageWrapper, classes.fadeOut)}
                    style={{ transform: `scale(${getScale(fadingIndex!)})` }}
                  >
                    <Asset asset={fadingMedia as TAsset & MediaItem} />
                  </Box>
                )}
              </Box>

              {/* Pagination Dots */}
              <Box className={classes.paginationDots}>
                {sections.map((_, i) => (
                  <span
                    key={i}
                    className={cx(classes.dot, {
                      [classes.dotActive]: i === activeIndex,
                    })}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </Box>
            </Box>
          </Grid.Col>

          {/* Right Column — Tab Buttons */}
          <Grid.Col span={{ base: 12, md: 5 }} className={classes.tabsColumn}>
            <Box className={classes.tabsList}>
              {sections.map((section, i) => {
                const isActive = i === activeIndex;
                return (
                  <Box
                    key={section.id}
                    className={cx(classes.tabButton, {
                      [classes.tabButtonActive]: isActive,
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
                      <Box
                        className={cx(classes.panel, {
                          [classes.panelOpen]: isActive,
                        })}
                      >
                        {section.body &&
                          renderRichText(section.body, richTextOptions)}
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
