import React from "react";
import { Box, Text, Title } from "@mantine/core";

import imgAddyiBottle from "@addyi/assets/images/9a4ec5361ad1af8adaa3dfd7b29d1c2db77ecc9e.png";
import imgPrescribedSeal from "@addyi/assets/images/cb99c930ee19bf782090bb6b8db302b3bcdf1a62.png";
import downloadIcon from "@addyi/assets/icons/download-icon.svg";

import * as classes from "./AboutAddyiSection.module.css";

// Source: Group27 - About ADDYI title
function Group27() {
  return (
    <Title order={2} className={classes.aboutTitle}>
      ABOUT ADDYI®
    </Title>
  );
}

// Source: Group18/Group20 - Button with rounded border
function PrescriptionButton({
  text,
  variant = "pink",
}: {
  text: string;
  variant?: "pink" | "white";
}) {
  return (
    <button
      className={`${classes.prescriptionButton} ${variant === "white" ? classes.buttonWhite : classes.buttonPink}`}
    >
      {text}
    </button>
  );
}

// Source: NeedAddyi, NeedAddyi1 - Red buttons container
function RedButton() {
  return (
    <Box className={classes.redButtonContainer}>
      <PrescriptionButton text="HAVE AN ADDYI® PRESCRIPTION?" variant="pink" />
      <PrescriptionButton text="NEED AN ADDYI® PRESCRIPTION?" variant="pink" />
    </Box>
  );
}

// Source: Group25 - Bottle image with seal
function Group25() {
  return (
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
    </Box>
  );
}

// Source: Group6 - Disclaimer text
function Group6() {
  return (
    <Text className={classes.disclaimerText}>
      *Some patients notice changes in a couple of weeks but continue daily use
      for up to 8 weeks to realize Addyi®'s effects.
    </Text>
  );
}

// Source: Group29 - PDF links
function Group29() {
  return (
    <Box className={classes.pdfLinksContainer}>
      <a href="#" className={classes.pdfLink}>
        <img src={downloadIcon} alt="" className={classes.downloadIcon} />
        Prescribing Information.pdf
      </a>
      <a href="#" className={classes.pdfLink}>
        <img src={downloadIcon} alt="" className={classes.downloadIcon} />
        Medication Guide.pdf
      </a>
    </Box>
  );
}

// Source: Group16 - Dosage information
function Group16() {
  return (
    <Box className={classes.dosageContainer}>
      <Text className={classes.dosageText}>
        Take <span className={classes.underline}>Addyi</span>® once daily, at
        bedtime, for
        <br />
        two months to realize the full ongoing benefits.*
      </Text>
      <Group6 />
      <Group29 />
    </Box>
  );
}

// Source: Group26 - Title and buttons section
function Group26() {
  return (
    <Box className={classes.titleButtonsSection}>
      <Group27 />
      <RedButton />
    </Box>
  );
}

// Source: Group24 - Main about section wrapper
export const AboutAddyiSection: React.FC = () => {
  return (
    <Box className={classes.aboutSection}>
      <Box className={classes.aboutContainer}>
        <Box className={classes.leftColumn}>
          <Group25 />
          <Group26 />
        </Box>
        <Box className={classes.rightColumn}>
          <Group16 />
        </Box>
      </Box>
    </Box>
  );
};
