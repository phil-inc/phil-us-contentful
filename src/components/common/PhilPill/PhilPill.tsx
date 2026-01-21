import React from "react";
import { Box, Divider, Text } from "@mantine/core";

import { IPills } from "types/resource";
import { TAsset } from "types/asset";

import Asset from "components/common/Asset/Asset";

import * as classes from "./PhilPill.module.css";
import { getColorFromStylingOptions } from "utils/stylingOptions";

type Props = {
  pill: IPills;
  index: number;
  key: string;
};

const PhilPill: React.FC<Props> = ({ pill, index, key }) => {
  const { title, iconAsset, stylingOptions } = pill;

  return (
    <Box className={classes.philPill}>
      <Box
        key={key}
        className={classes.wrapper}
        style={{
          background: getColorFromStylingOptions(stylingOptions?.background),
        }}
      >
        <div className={classes.pill}>
          {iconAsset && (
            <Box className={classes.icon}>
              <Asset objectFit="contain" asset={iconAsset as TAsset} />
            </Box>
          )}
          {title && <Text className={classes.subItemTitle}>{title}</Text>}
        </div>
      </Box>
      <span
        className={classes.line}>
          <Divider orientation="vertical" />
        </span>
    </Box>
  );
};

export default PhilPill;
