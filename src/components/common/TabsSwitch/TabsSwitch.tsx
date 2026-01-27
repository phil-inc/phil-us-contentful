import React from "react";
import { Box } from "@mantine/core";

import { ITabItem } from "types/philTab";
import { IReferencedSection } from "types/section";
import { TResource } from "types/resource";

import PhilTab from "components/common/PhilTab/PhilTab";

import * as classNames from "./TabsSwitch.module.css";
import PageContext from "contexts/PageContext";

type Props = {
  section: IReferencedSection;
};

const TabsSwitch: React.FC<Props> = ({ section }) => {

  const context = React.useContext(PageContext);
  const getItems = () => {
    if (!Boolean(section?.references?.length)) return [];

    return section?.references.map((resource: TResource) => ({
      title: resource.heading || "",
      value: resource.heading || "",
      content: <div>{resource?.description.description || ""}</div>,
    })) as ITabItem[];
  };

  return (
    <Box className={classNames.tabsSwitchContainer}>
      <PhilTab items={getItems()} isHorizontal={false} contextTitle={context?.title ?? ""}/>
    </Box>
  );
};
export default TabsSwitch;
