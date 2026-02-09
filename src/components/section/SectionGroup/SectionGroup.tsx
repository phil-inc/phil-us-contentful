import { Box, Container } from "@mantine/core";
import React from "react";
import { IMetric, ISection, ISectionGroup } from "types/section";
import * as classes from "./SectionGroup.module.css";
import { Divider } from "@mantine/core";
import BasicSection from "components/section/BasicSection/BasicSection";
import PageContext from "contexts/PageContext";
import Asset from "components/common/Asset/Asset";
import { BG_IMAGE_INDEX } from "constants/global.constant";
import TabbedSectionGroup from "components/section/TabbedSectionGroup/TabbedSectionGroup";

type props = {
  sections: ISectionGroup;
  index?: number;
  sectionIndex?: number;
};

const SectionGroup: React.FC<props> = ({ sections, index, sectionIndex }) => {
  const context = React.useContext(PageContext);

  // Extract metric from sectionGroupReference (if exists)
  const metric = sections?.sectionGroupReference?.find(
    (item) => item.__typename === "ContentfulMetric"
  ) as IMetric | undefined;

  // Filter out metric to get only sections
  const sectionReferences = sections?.sectionGroupReference?.filter(
    (item) => item.__typename !== "ContentfulMetric"
  ) as ISection[] | undefined;

  // Only render Tabbed when groupSectionType is explicitly "Tabbed" in Contentful.
  // When the field is missing or "Default", render the default section list.
  const groupType = sections?.groupSectionType ?? "Default";
  const renderGroupContent = () => {
    switch (groupType) {
      case "Tabbed":
        return (
          <TabbedSectionGroup
            metric={metric!}
            sections={sectionReferences!}
          />
        );
      case "Default":
      default:
        return (
          <Container size="xl" data-context={context.title}>
            {sectionReferences?.map((section, subIndex) => {
              switch (section.sectionType) {
                case "Basic Section":
                  return (
                    <BasicSection
                      key={section.id}
                      section={section as ISection}
                      index={index!}
                      isEmbedFormTemplate={false}
                      sectionIndex={sectionIndex}
                      subSectionIndex={subIndex}
                      metric={metric}
                    />
                  );
                default:
                  return null;
              }
            })}
          </Container>
        );
    }
  };

  return (
    <Box className={classes.sectionGroup}>
      {Boolean(sections?.canShowTopBorder) && (
        <Container className={classes.dividerContainer} size="xl">
          <Divider className={classes.divider} />
        </Container>
      )}
      {sections?.backgroundAssetImage1 && (
        <div
          className={classes.bgImageOne}
          data-context={context.title}
          data-section-index={sectionIndex}
          data-image-index={BG_IMAGE_INDEX.ONE}
        >
          <Asset asset={sections.backgroundAssetImage1} />
        </div>
      )}
      {sections?.backgroundAssetImage2 && (
        <div
          className={classes.bgImageTwo}
          data-context={context.title}
          data-section-index={sectionIndex}
          data-image-index={BG_IMAGE_INDEX.TWO}
        >
          <Asset
            asset={sections.backgroundAssetImage2}
            objectFit="cover"
            isFullWidth={true}
          />
        </div>
      )}
      {sections?.backgroundAssetImage3 && (
        <div
          className={classes.bgImageThree}
          data-context={context.title}
          data-section-index={sectionIndex}
          data-image-index={BG_IMAGE_INDEX.TWO}
        >
          <Asset
            asset={sections.backgroundAssetImage3}
            objectFit="cover"
            isFullWidth={true}
          />
        </div>
      )}

      {renderGroupContent()}

      {Boolean(sections?.canShowBottomBorder) && (
        <Container className={classes.dividerContainer} size="xl">
          <Divider className={classes.divider} />
        </Container>
      )}
    </Box>
  );
};

export default SectionGroup;
