import React, { useState } from "react";

import { AnnoucementReference } from "types/annoucementBar";

import { PAGES_TITLE } from "constants/page";
import { IReferencedSection } from "types/section";

import InfoBar from "components/common/InfoBar/InfoBar";
import FaqTitleBar from "components/common/FaqTitleBar/FaqTitleBar";

type props = {
  title: string;
  displayTitle: string;
  infoBarReference?: AnnoucementReference;
  sections: Array<IReferencedSection>;
};

const TopSection: React.FC<props> = ({
  title,
  displayTitle,
  infoBarReference,
  sections,
}) => {
  const [canShowInfoBar, setCanShowInforBar] = useState(Boolean(infoBarReference));

  return (
    <>
      {infoBarReference && canShowInfoBar && (
        <InfoBar
          canShowInfoBar={canShowInfoBar}
          setCanShowInforBar={setCanShowInforBar}
          infoBarReference={infoBarReference}
        />
      )}
      {title === PAGES_TITLE.FAQs && (
        <FaqTitleBar
          displayTitle={displayTitle}
          sections={sections as IReferencedSection[]}
          canShowInfoBar={canShowInfoBar}
        />
      )}
    </>
  );
};

export default TopSection;
