import React from "react";
import type { IReferencedSection, ISection } from "types/section";
import BasicSection from "./BasicSection/BasicSection";
import ReferencedSection from "./ReferencedSection/ReferencedSection";
import TextAndTextColumns from "components/text-text-columns";
import TextAndTextColunnsV2 from "components/text-text-columnsv2";
import { OUR_SOLUTIONS } from "constants/page";

type SectionProps = {
  section: ISection | IReferencedSection;
  index?: number;
  isEmbedFormTemplate: boolean;
  isPreviousBackgroundPure: boolean;
  pageTitle: string;
};

/**
 * Section is a section on a page.
 * @param props - {section, index}
 * @returns Section based on reference type.
 */
const Section: React.FC<SectionProps> = ({
  section,
  index,
  isEmbedFormTemplate,
  isPreviousBackgroundPure,
  pageTitle,
}) => {
  switch (section.sectionType) {
    case "Basic Section":
      return (
        <BasicSection
          section={section as ISection}
          index={index!}
          isEmbedFormTemplate={isEmbedFormTemplate}
        />
      );
    case "Referenced Section":
      return (
        <ReferencedSection
          section={section as IReferencedSection}
          isEmbedFormTemplate={isEmbedFormTemplate}
          isPreviousBackgroundPure={isPreviousBackgroundPure}
          addBorder
        />
      );

      case "Text and Text Columns":
        if (pageTitle == OUR_SOLUTIONS) {
          return (
            <TextAndTextColunnsV2 data={section as ISection} index={index} 
            />
          ) 
        } else {
          return (
            <TextAndTextColumns data={section as ISection} 
            />
          ) 
        }
      
    default:
      return <></>;
  }
};

export default Section;
