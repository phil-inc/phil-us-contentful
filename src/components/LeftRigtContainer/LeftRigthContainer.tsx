import React from "react";
import { Box, Container } from "@mantine/core";
import { ITextandTextColumnsWithFooterSection } from "types/section";
import { TAsset } from "types/asset";
import { navigate } from "gatsby";

import { useIsLaptop } from "hooks/useIsLaptop";
import PageContext from "contexts/PageContext";

import Asset from "components/common/Asset/Asset";
import FloorContainer from "components/LeftRigtContainer/FloorContainer/FloorContainer";
import GridContainer from "components/LeftRigtContainer/GridContainer/gridContainer";

import * as classes from "./LeftRightContainer.module.css";

type Props = {
  sectionData: ITextandTextColumnsWithFooterSection;
  sectionIndex?: number;
  philLogo?: TAsset;
  whiltePhilLogo?: TAsset;
};

export default function LeftRightContainer({
  sectionData,
  sectionIndex = 0,
  philLogo,
  whiltePhilLogo,
}: Props) {
  const isLaptopScreen = useIsLaptop();
  const { title: pageTitle } = React.useContext(PageContext);
  const dataContext = pageTitle;

  const renderPhilLogo = (logo: TAsset) => {
    return (
      <Box onClick={() => navigate("/")} className={classes.logo}>
        <Asset asset={logo} objectFit="contain" />
      </Box>
    );
  };

  const showLogo = philLogo && whiltePhilLogo;

  return (
    <>
      <div
        className={classes.leftRightContainer}
        data-context={dataContext}
        data-section-index={sectionIndex}
      >
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

        {showLogo && (
          <Box className={classes.philLogo}>
            <Container className="container" size={"xl"}>
              {renderPhilLogo(isLaptopScreen ? whiltePhilLogo : philLogo)}
            </Container>
          </Box>
        )}

        {isLaptopScreen ? (
          <Container className="container" size="xl">
            <GridContainer
              sectionData={sectionData}
              isMobileView={false}
              sectionIndex={sectionIndex}
              dataContext={dataContext}
            />
          </Container>
        ) : (
          <Container className="container" size="xl">
            <GridContainer
              sectionData={sectionData}
              isMobileView={true}
              sectionIndex={sectionIndex}
              dataContext={dataContext}
            >
              {(sectionData?.footerColumn || sectionData?.resourceReferences) && (
                <div className={classes.sectionFooter}>
                  <FloorContainer
                    floorData={sectionData?.footerColumn}
                    brandMetric={sectionData?.resourceReferences}
                    dataContext={dataContext}
                    sectionIndex={sectionIndex}
                  />
                </div>
              )}
            </GridContainer>
          </Container>
        )}

        {isLaptopScreen && (sectionData?.footerColumn || sectionData?.resourceReferences) && (
          <Container className="container" size={"xl"}>
            <div className={classes.sectionFooter}>
              <FloorContainer
                floorData={sectionData?.footerColumn}
                brandMetric={sectionData?.resourceReferences}
                dataContext={dataContext}
                sectionIndex={sectionIndex}
              />
            </div>
          </Container>
        )}
      </div>
    </>
  );
}
