import React, { useState } from "react";
import { Box } from "@mantine/core";

import imgAddyiBottle from "@addyi/assets/images/9a4ec5361ad1af8adaa3dfd7b29d1c2db77ecc9e.png";
import imgPrescribedSeal from "@addyi/assets/images/prescribed-seal.svg";
import imgAddyiBottleWithSealMobile from "@addyi/assets/images/addyi-bottle-with-seal-mobile-view.png";
import downloadIcon from "@addyi/assets/icons/download-icon.svg";

import * as classes from "./AboutAddyiSection.module.css";
import TestimonialBubbles from "../TestimonialBubbles";
import { PrescriptionModal } from "../PrescriptionModal";
import { ADDYI_URLS } from "../../constants/urls";

export const AboutAddyiSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNeedPrescriptionClick = () => {
    window.open(ADDYI_URLS.NEED_PRESCRIPTION, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Box className={classes.aboutSection}>
        <Box className={classes.aboutContainer}>
          <Box className={classes.titleRow}>
            <h2 className={classes.aboutTitle}>
              ABOUT ADDYI®
            </h2>
          </Box>
          <Box className={classes.columnsRow}>
            <Box className={classes.leftColumn}>
              <Box className={classes.titleButtonsSection}>
                <Box className={classes.redButtonContainer}>
                  <button
                    className={`${classes.prescriptionButton} ${classes.buttonPink}`}
                    onClick={() => setIsModalOpen(true)}
                  >
                    HAVE AN ADDYI® PRESCRIPTION?
                  </button>
                  <button
                    className={`${classes.prescriptionButton} ${classes.buttonPink}`}
                    onClick={handleNeedPrescriptionClick}
                  >
                    NEED AN ADDYI® PRESCRIPTION?
                  </button>
                </Box>
              </Box>
              <Box className={classes.bottleContainer}>
                <Box className={classes.bottleImageWrapper}>
                  <img
                    src={imgAddyiBottle}
                    alt="Addyi bottle"
                    className={classes.bottleImage}
                  />
                </Box>
                <Box className={classes.sealContainer}>
                  <img
                    src={imgPrescribedSeal}
                    alt="#1 Prescribed Seal"
                    className={classes.sealImage}
                  />
                </Box>
                <Box className={classes.mobileBottleWrapper}>
                  <img
                    src={imgAddyiBottleWithSealMobile}
                    alt="Addyi bottle with #1 Prescribed Seal"
                    className={classes.mobileBottleImage}
                  />
                </Box>
              </Box>
            </Box>
            <Box className={classes.rightColumn}>
              <Box className={classes.dosageContainer}>
                <p className={classes.dosageText}>
                  Take <span className={classes.underline}>Addyi</span>® once daily, at
                  bedtime, for two months to realize the full ongoing benefits.*
                </p>
                <p className={classes.disclaimerText}>
                  *Some patients notice changes in a couple of weeks but continue daily use
                  for up to 8 weeks to realize Addyi®'s effects.
                </p>
                <Box className={classes.pdfLinksContainer}>
                  <a 
                    href={ADDYI_URLS.PRESCRIBING_INFORMATION} 
                    className={classes.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Prescribing Information.pdf
                    <img src={downloadIcon} alt="" className={classes.downloadIcon} />
                  </a>
                  <a 
                    href={ADDYI_URLS.MEDICATION_GUIDE} 
                    className={classes.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Medication Guide.pdf
                    <img src={downloadIcon} alt="" className={classes.downloadIcon} />
                  </a>
                </Box>
              </Box>
              <Box className={classes.testimonialBubblesContainer}>
                <TestimonialBubbles />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <PrescriptionModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
