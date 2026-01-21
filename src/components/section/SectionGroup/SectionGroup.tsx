import { Box, Container } from "@mantine/core";
import React from "react";
import { ISection, ISectionGroup } from "types/section";
import * as classes from "./SectionGroup.module.css";
import { Divider } from "@mantine/core";
import BasicSection from "components/section/BasicSection/BasicSection";
import PageContext from "contexts/PageContext";
import Asset from "components/common/Asset/Asset";
import { BG_IMAGE_INDEX } from "constants/global.constant";

type props = {
  sections: ISectionGroup;
  index?: number;
  sectionIndex?: number;
};
const SectionGroup: React.FC<props> = ({ sections, index, sectionIndex }) => {
  const context = React.useContext(PageContext);
  return (
    <Box className={classes.sectionGroup}>
      {Boolean(sections?.canShowTopBorder) && (
        <Container className={classes.dividerContainer} size={"xl"}>
          <Divider className={classes.divider} />
        </Container>
      )}

      {sections?.backgroundAssetImage1 && (
        <div
          className={classes.bgImageOne}
          data-context={context.title}
          section-index={sectionIndex}
          data-image-index={BG_IMAGE_INDEX.ONE}
        >
          <Asset asset={sections.backgroundAssetImage1} />
        </div>
      )}
      {sections?.backgroundAssetImage2 && (
        <div
          className={classes.bgImageTwo}
          data-context={context.title}
          section-index={sectionIndex}
          data-image-index={BG_IMAGE_INDEX.TWO}
        >
          <Asset
            asset={sections.backgroundAssetImage2}
            objectFit="cover"
            isFullWidth={true}
          />
        </div>
      )}
      <Container size={"xl"} data-context={context.title}>
        {sections?.sectionGroupReference &&
          sections?.sectionGroupReference.map((section, subIndex) => {
            switch (section.sectionType) {
              case "Basic Section":
                return (
                  <BasicSection
                    section={section as ISection}
                    index={index!}
                    isEmbedFormTemplate={false}
                    sectionIndex={sectionIndex}
                    subSectionIndex={subIndex}
                  />
                );

              default:
                return <></>;
            }
          })}
      </Container>
      {Boolean(sections?.canShowBottomBorder) && (
        <Container className={classes.dividerContainer} size={"xl"}>
          <Divider className={classes.divider} />
        </Container>
      )}
    </Box>
  );
};

export default SectionGroup;
