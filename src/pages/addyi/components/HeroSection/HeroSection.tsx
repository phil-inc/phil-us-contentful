import React from "react";
import { Box, Text, Title } from "@mantine/core";

import imgWomanWithAddyiBottle from "@addyi/assets/images/9f27b177d6960b8efcc248be57c62dbe9bb6d6b5.png";

import * as classes from "./HeroSection.module.css";

// Source: Group17 component
function Group17() {
  return (
    <Box className={classes.heroBanner}>
      <Box className={classes.heroBannerContainer}>
        <Box className={classes.forPatientsContent}>
          <Text className={classes.forPatientsLabel}>FOR PATIENTS:</Text>
          <Title order={1} className={classes.heroTitle}>
            WHY I CHOOSE PHILRX PHARMACY FOR MY ADDYI<sup>®</sup> PRESCRIPTION
          </Title>
        </Box>
        <Box className={classes.heroImageContainer}>
          <img
            src={imgWomanWithAddyiBottle}
            alt="Woman with Addyi bottle"
            className={classes.heroImage}
          />
        </Box>
      </Box>
    </Box>
  );
}

// Source: Jennifer component
function Jennifer() {
  return (
    <Box className={classes.testimonialSection}>
      <Box className={classes.testimonialContainer}>
        <Text className={classes.testimonialQuote}>
          "I transferred my Addyi<sup>®</sup> prescription to PhilRx and not
          only did they save me over $250, they shipped my Addyi<sup>®</sup>{" "}
          directly to my house, and their refill process has been simple and
          straightforward. No more waiting in the line at the pharmacy down the
          road. This has been a great experience!"
        </Text>
        <Text className={classes.testimonialAuthor}>
          Jennifer 37, actual Addyi<sup>®</sup> patient
        </Text>
      </Box>
    </Box>
  );
}

export const HeroSection: React.FC = () => {
  return (
    <>
      <Group17 />
      <Jennifer />
    </>
  );
};
