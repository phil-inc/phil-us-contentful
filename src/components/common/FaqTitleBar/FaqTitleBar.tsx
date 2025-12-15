import { Tabs } from "@mantine/core";
import classNames from "classnames";
import React, { useState } from "react";
import * as classes from "./FaqTitleBar.module.css";

import {
  IReferencedSection,
  ReferenceTypeEnum,
} from "types/section";
import slugify from "slugify";

type FaqTitleBarProps = {
  sections: Array<IReferencedSection
  >;
};

type Itabs = {
  step: string;
  id: string;
  title: string;
  header: string;
};
const FaqTitleBar: React.FC<FaqTitleBarProps> = ({ sections }) => {

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

  const onTabClick = (tab: Itabs) => {
    if (!tab.title) return;

    const slug = slugify(tab.title, { lower: true, strict: true });
    document.getElementById(slug)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.pushState(null, "", `#${slug}`);
  };

  return (
    <div className={classes.faqTitlebar}>
      <Tabs defaultValue={"0"}>
        <Tabs.List>
          {tabs.map((tab, index) => {
            return (
              <Tabs.Tab
                key={tab.id}
                value={`${index}`}
                onClick={() => onTabClick(tab)}
              >
                {tab.title}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default FaqTitleBar;
