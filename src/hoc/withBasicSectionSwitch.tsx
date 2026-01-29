import React from "react";

import { ISection } from "types/section";
import { BASIC_SECTION_COMPONENTS } from "enum/global.enum";

import RightImageBottomComp from "components/section/BasicSection/BasicComponentType/RightImageBottomComp";

type SectionProps = {
  section: ISection;
  index?: number;
  isEmbedFormTemplate: boolean;
  sectionIndex?: number;
};

const withBasicSectionSwitch = <T extends SectionProps>(
  WrappedComponent: React.ComponentType<T>,
) => {
  return (props: T) => {
    const { section, index, isEmbedFormTemplate, sectionIndex } = props;

    switch ((section as ISection)?.componentType) {
      case BASIC_SECTION_COMPONENTS.RIGHT_BOTTOM_IMAGE:
        return (
          <RightImageBottomComp
            section={section}
            index={index ?? 0}
            isEmbedFormTemplate={isEmbedFormTemplate}
            sectionIndex={sectionIndex}
          />
        );

      default:
        return <WrappedComponent {...props} />;
    }
  };
};

export default withBasicSectionSwitch;