import React from "react";


import { PAGES_TITLE } from "constants/page";
import { IReferencedSection } from "types/section";

import FaqTitleBar from "components/common/FaqTitleBar/FaqTitleBar";

type props = {
  title: string;
  displayTitle: string;
  sections: Array<IReferencedSection>;
};

const TopSection: React.FC<props> = ({
  title,
  displayTitle,
  sections,
}) => {

  return (
    <>
      {title === PAGES_TITLE.FAQs && (
        <FaqTitleBar
          displayTitle={displayTitle}
          sections={sections as IReferencedSection[]}
        />
      )}
    </>
  );
};

export default TopSection;
