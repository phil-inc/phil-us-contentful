import React from "react";

import type {
  IReferencedSection,
  ISection,
  ITextandTextColumnsWithFooterSection,
} from "types/section";
import { TAsset } from "types/asset";

import ReferencedSection from "components/section/ReferencedSection/ReferencedSection";
import LeftRightContainer from "components/LeftRigtContainer/LeftRigthContainer";

type SectionProps = {
  section: ISection | IReferencedSection | ITextandTextColumnsWithFooterSection;
  isEmbedFormTemplate: boolean;
  isPreviousBackgroundPure: boolean;
  addBorder: boolean;
  philLogo: TAsset;
  whiltePhilLogo: TAsset;
};

/**
 * Section is a section on a page.
 * @param props - {section, index}
 * @returns Section based on reference type.
 */
const SectionColumn: React.FC<SectionProps> = ({
  section,
  isEmbedFormTemplate,
  isPreviousBackgroundPure,
  addBorder = false,
  philLogo,
  whiltePhilLogo,
}) => {
  switch (section.sectionType) {
    case "Referenced Section":
      return (
        <ReferencedSection
          section={section as IReferencedSection}
          isEmbedFormTemplate={isEmbedFormTemplate}
          isPreviousBackgroundPure={isPreviousBackgroundPure}
          addBorder={addBorder}
        />
      );

    case "Text and Text Columns with Footer":
      return (
        <LeftRightContainer
          sectionData={section as ITextandTextColumnsWithFooterSection}
          philLogo={philLogo}
          whiltePhilLogo={whiltePhilLogo}
        />
      );

    default:
      return <></>;
  }
};

export default SectionColumn;
