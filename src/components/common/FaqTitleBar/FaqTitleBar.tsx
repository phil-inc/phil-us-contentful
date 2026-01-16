import { Badge, Box } from "@mantine/core";
import React, { useState } from "react";
import * as classes from "./FaqTitleBar.module.css";
import cx from "clsx";
import slugify from "slugify";

import { IReferencedSection, ReferenceTypeEnum } from "types/section";
import { ANNOUNCEMENR_BAR_HEIGHT, INFOBAR_HEIGHT, NAVBAR_HEIGHT } from "constants/global.constant";

type FaqTitleBarProps = {
  displayTitle: string;
  sections: Array<IReferencedSection>;
  canShowInfoBar: boolean;
};

type Itabs = {
  step: string;
  id: string;
  title: string;
  header: string;
};
const FaqTitleBar: React.FC<FaqTitleBarProps> = ({
  displayTitle,
  sections,
  canShowInfoBar,
}) => {
  const [activeTabNum, setActiveTabNum] = useState<Number>(0);
  const faqSections = sections.filter(
    (section) =>
      section?.referenceType === ReferenceTypeEnum["FAQ Accordion"] ||
      section?.referenceType === ReferenceTypeEnum["FAQ Accordion Single"],
  ) as IReferencedSection[];

  const tabs: Itabs[] = faqSections.map((section, index) => {
    return {
      step: `${index}`,
      id: section.id,
      title: section?.title ?? "",
      header: section?.header ?? "",
    };
  });

  const onTabClick = (tab: Itabs, tabIndex: Number) => {
    if (!tab.title) return;

    const slug = slugify(tab.title, { lower: true, strict: true });
    const offset = canShowInfoBar 
      ? (ANNOUNCEMENR_BAR_HEIGHT + NAVBAR_HEIGHT + INFOBAR_HEIGHT) 
      : (ANNOUNCEMENR_BAR_HEIGHT + NAVBAR_HEIGHT) + 10; // px from top
    const element = document.getElementById(slug);

    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, "", `#${slug}`);
      setActiveTabNum(tabIndex);
    }
  };

  return (
    <div className={classes.faqTitlebar}>
      <Box className={classes.title}>{displayTitle}</Box>
      <div className={classes.tabs}>
        {tabs.map((tab, index) => {
          return (
            <Badge
              key={tab.id}
              className={cx(
                classes.tabItem,
                index === activeTabNum && classes.active,
              )}
              onClick={() => onTabClick(tab, index)}
              size="xl"
              radius="md"
            >
              {tab.title}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default FaqTitleBar;
