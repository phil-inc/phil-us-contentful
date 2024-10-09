import React from "react";
import type { IReferencedSection, ISection } from "types/section";
import BasicSection from "./BasicSection/BasicSection";
import ReferencedSection from "./ReferencedSection/ReferencedSection";

type SectionProps = {
  section: ISection | IReferencedSection;
  index?: number;
  isEmbedFormTemplate: boolean;
  isPreviousBackgroundPure: boolean;
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
        />
      );
    default:
      return <></>;
  }
};

export default Section;
