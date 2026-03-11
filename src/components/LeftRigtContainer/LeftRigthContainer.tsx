import React from "react";
import { Box, Container } from "@mantine/core";
import { ITextandTextColumnsWithFooterSection } from "types/section";
import { TAsset } from "types/asset";
import { navigate } from "gatsby";

import { useIsLaptop } from "hooks/useIsLaptop";

import Asset from "components/common/Asset/Asset";
import FloorContainer from "components/LeftRigtContainer/FloorContainer/FloorContainer";
import GridContainer from "components/LeftRigtContainer/GridContainer/gridContainer";

import * as classes from "./LeftRightContainer.module.css";

type Props = {
  sectionData: ITextandTextColumnsWithFooterSection;
  philLogo: TAsset;
  whiltePhilLogo: TAsset;
};

export default function LeftRightContainer({
  sectionData,
  philLogo,
  whiltePhilLogo,
}: Props) {
  const isLaptopScreen = useIsLaptop();

  const renderPhilLogo = (logo: TAsset) => {
    return (
      <Box onClick={() => navigate("/")} className={classes.logo}>
        <Asset asset={logo} objectFit="contain" />
      </Box>
    );
  };

  return (
    <>
      <div className={classes.leftRightContainer}>
        {sectionData?.leftWallBackgroundImage && 
          <div className={classes.leftWallBgIcon}>
            <Asset
                asset={sectionData?.leftWallBackgroundImage}
            />
            </div>
        }
        {sectionData?.rightWallBackgroundImage && 
          <div className={classes.rightWallBgIcon}>
            <Asset
                asset={sectionData?.rightWallBackgroundImage}
            />
            </div>
        }

        <Box className={classes.philLogo}>
          <Container className="container" size={"xl"}>
            {renderPhilLogo(isLaptopScreen ? whiltePhilLogo : philLogo)}
          </Container>
        </Box>

        {isLaptopScreen ? (
          <Container className="container" size="xl">
            <GridContainer sectionData={sectionData} isMobileView={false} />
          </Container>
        ) : (
          <GridContainer sectionData={sectionData} isMobileView={true} />
        )}

        {(sectionData?.footerColumn || sectionData?.resourceReferences) && (
          <Container className="container" size={"xl"}>
            <div className={classes.sectionFooter}>
              <FloorContainer
                floorData={sectionData?.footerColumn}
                brandMetric={sectionData?.resourceReferences}
              />
            </div>
          </Container>
        )}
      </div>
    </>
  );
}
