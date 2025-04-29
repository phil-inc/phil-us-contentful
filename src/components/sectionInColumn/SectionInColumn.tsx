import React from "react";
import type { IReferencedSection, ISection } from "types/section";
import BasicSectionColumn from "components/sectionInColumn/basicSectionColumn/BasicSectionColumn";
import ReferencedSectionColumn from "components/sectionInColumn/referncedSectionColumn/ReferencedSectionColumn";

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
const SectionColumn: React.FC<SectionProps> = ({
  section,
  index,
  isEmbedFormTemplate,
  isPreviousBackgroundPure,
  pageTitle,
}) => {

  switch (section.sectionType) {
    case "Basic Section":
      return (
        <BasicSectionColumn
          section={section as ISection}
          index={index!}
        />
      );
    case "Referenced Section":
      return (
        <ReferencedSectionColumn
          section={section as IReferencedSection}
        />
      );
      
    default:
      return <></>;
  }
};

export default SectionColumn;
