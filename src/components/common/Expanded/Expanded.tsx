import React from "react";
import { Container, type MantineSpacing, type StyleProp } from "@mantine/core";

import * as classes from "./expanded.module.css";

import Asset from "components/common/Asset/Asset";

import { TAsset } from "types/asset";

type ExpandedProps = {
  id: string;
  children: React.ReactNode;
  background?: string;
  minHeight?: number | string;
  noMargin?: boolean;
  py?: StyleProp<MantineSpacing>;
  px?: StyleProp<MantineSpacing>;
  pt?: StyleProp<MantineSpacing>;
  pb?: StyleProp<MantineSpacing>;
  mb?: StyleProp<MantineSpacing>;
  mt?: StyleProp<MantineSpacing>;
  fullWidth?: boolean;
  backgroundAssetImage?: TAsset;
  leftBackgroundAssetImage?: TAsset;
  className?: string;
};

/**
 * Expanded is a full width section component wrapper
 * @param props - Expanded props
 * @returns A section component with a expanded container
 */
const Expanded: React.FC<ExpandedProps> = ({
  id,
  children,
  background = "#FFFFFF",
  minHeight = "100%",
  mb,
  noMargin = false,
  py,
  pt,
  pb,
  px,
  fullWidth = false,
  backgroundAssetImage = null,
  leftBackgroundAssetImage = null,
  className = "",
  ...rest
}) => (
  <Container
    style={{ background, minHeight }}
    id={id}
    fluid
    className={`${classes.container} ${className}`}
    py={py}
    pt={pt}
    pb={pb}
    mb={mb}
    px={px ? px : fullWidth ? 0 : undefined}
    {...rest}
  >
    {backgroundAssetImage && 
      <div className={classes.rightBackgroundIcon}>
        <Asset
            asset={backgroundAssetImage}
        />
        </div>
    }
    {leftBackgroundAssetImage && 
      <div className={classes.leftBackgroundIcon}>
        <Asset
            asset={leftBackgroundAssetImage}
        />
        </div>
    }
    {children}
  </Container>
);

export default Expanded;
