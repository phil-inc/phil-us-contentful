import React from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import type { BackgroundType, ISection } from "types/section";
import { getColorFromStylingOptions } from "utils/stylingOptions";
import { LAYOUT_12COL } from "constants/global.constant";

import cx from "clsx";
import * as classes from "./LottieAnimationSection.module.css";

type LottieAnimationSectionProps = {
  section: ISection;
  index?: number;
  isEmbedFormTemplate?: boolean;
  sectionIndex?: number;
  animationComponent: React.ReactNode;
};

/** Resolves section background from Contentful: v2 uses stylingOptions.background, else Grey/transparent. */
const getBackground = (section: ISection): string => {
  if (section.v2Flag && section.stylingOptions?.background) {
    return getColorFromStylingOptions(section.stylingOptions.background) ?? "transparent";
  }
  return section.background === "Grey" ? "#f4f4f4" : "transparent";
};

const LottieAnimationSection: React.FC<LottieAnimationSectionProps> = ({
  section,
  animationComponent,
}) => {
  const span =
    LAYOUT_12COL /
    (section?.renderOptions?.layoutOptions?.numberOfColumns ?? 1);

  return (
    <>
      {Boolean(section.addBorder) && (
        <Container className={classes.dividerContainer} size="xl">
          <Divider className={classes.divider} />
        </Container>
      )}

      <Box
        style={{ background: getBackground(section) }}
        className={cx(classes.lottieAnimationSection, section.slug)}
      >
        <Container size="xl" className={classes.sectionContainer}>
          {section?.eyebrowHeading && (
            <Text className={classes.eyebrowHeading}>
              {section.eyebrowHeading}
            </Text>
          )}
          {section?.canShowHeader && (
            <Title className={classes.header}>{section.header}</Title>
          )}
          {section?.headerDescription?.headerDescription && (
            <Text className={classes.headerDescription}>
              {section.headerDescription.headerDescription}we
            </Text>
          )}

          <Grid align="center" justify="flex">
            <Grid.Col order={1} span={{ base: 12, md: span }}>
              {Boolean(section.body) && (
                <div className={classes.bodyArea}>
                  {renderRichText(section.body)}
                </div>
              )}
            </Grid.Col>
            <Grid.Col order={2} span={{ base: 12, md: span }}>
              <Group classNames={{ root: classes.animationGroup }} gap={0}>
                {animationComponent}
              </Group>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {Boolean(section?.showBottomBorder) && (
        <Container className={classes.dividerContainer} size="xl">
          <Divider className={classes.divider} />
        </Container>
      )}
    </>
  );
};

export default LottieAnimationSection;
