import React from "react";
import cx from "clsx";

import { useState } from "react";
import { Box } from "@mantine/core";
import { ITabItem } from "types/philTab";
import BulletWithCircle from "components/icons/BulletWithCircle.icon";

import * as classNames from "./PhilTab.module.css";

type Props = {
  items: ITabItem[];
  isHorizontal: boolean;
  contextTitle: string;
};

const PhilTab: React.FC<Props> = ({ items, isHorizontal, contextTitle }) => {
  const [active, setActive] = useState(0);
  const orientation = isHorizontal ? "horizontal" : "vertical";

  if (items.length === 0) return <></>;

  return (
    <Box className={classNames.philTabsContainer} data-context={contextTitle}>
      <div
        className={cx(classNames.tabsContainer, {
          [classNames.tabsHorizontal]: isHorizontal,
          [classNames.tabsVertical]: !isHorizontal,
        })}
      >
        {/* Tabs List */}
        <div
          className={classNames.tabsList}
          role="tablist"
          aria-orientation={orientation}
          data-context={contextTitle}
        >
          {items.map((tab, index) => (
            <Box
              key={tab.value}
              role="tab"
              aria-selected={active === index}
              className={cx(classNames.tab, {
                [classNames.active]: active === index,
              })}
              onClick={() => setActive(index)}
            >
              {tab.title}
            </Box>
          ))}
        </div>

        {/* Tabs Panel */}
        <div
          className={classNames.tabsPanel}
          role="tabpanel"
          data-context={contextTitle}
        >
          <span className={classNames.bullet}>
            <BulletWithCircle width={20} height={20} />
          </span>
          {items.find((t) => t.value === items[active].value)?.content}
        </div>
      </div>
    </Box>
  );
};
export default PhilTab;
