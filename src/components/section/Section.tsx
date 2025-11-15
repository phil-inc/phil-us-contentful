import React from "react";
import type { IReferencedSection, ISection, ITextandTextColumns } from "types/section";
import BasicSection from "./BasicSection/BasicSection";
import ReferencedSection from "./ReferencedSection/ReferencedSection";
import TextAndTextColumns from "components/text-text-columns";
import TextAndTextColunnsV2 from "components/text-text-columnsv2";
import { OUR_SOLUTIONS, PAGES_TITLE } from "constants/page";

type SectionProps = {
  section: ISection | IReferencedSection | ITextandTextColumns;
  index?: number;
  isEmbedFormTemplate: boolean;
  isPreviousBackgroundPure: boolean;
  pageTitle: string;
  sectionIndex?: number;
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
  sectionIndex = 0
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
          index={index}
        />
      );

      case "Text and Text Columns":
        if (pageTitle == OUR_SOLUTIONS || pageTitle == PAGES_TITLE.PHIL_DIRECT) {
          return (
            <TextAndTextColunnsV2 data={section as ISection} index={index} sectionIndex={sectionIndex}
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
