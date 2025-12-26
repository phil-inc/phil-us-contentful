import React from "react";
import { Box, Divider, Text } from "@mantine/core";
import { TResource } from "types/resource";
import cx from "clsx";

import * as classes from "./BulletList.module.css";

type Props = {
  resource: TResource;
  index: number;
};

const BulletList: React.FC<Props> = ({ resource, index }) => {
  return (
    <>
      <Box key={resource.id ?? index} className={cx(classes.bulletListCard, classes.border)}>
        <Text className={classes.heading}>{resource?.heading}</Text>
        <Text className={classes.description}>
          {resource?.description.description || ""}
        </Text>
      </Box>
      <Divider className={classes.divider} />
    </>
  );
};

export default BulletList;
