import React from "react";
import { Box } from "@mantine/core";

import imgWomanWithAddyiBottle from "@addyi/assets/images/9f27b177d6960b8efcc248be57c62dbe9bb6d6b5.png";

import * as classes from "./HeroSection.module.css";

function ForPatientsSection() {
  return (
    <Box className={classes.heroBanner}>
      <Box className={classes.heroBannerContainer}>
        <Box className={classes.forPatientsContent}>
          <span className={classes.forPatientsLabel}>FOR PATIENTS:</span>
          <h1 className={classes.heroTitle}>
            WHY I CHOOSE <br /> PHILRX PHARMACY FOR MY ADDYI® PRESCRIPTION
          </h1>
        </Box>
        <Box className={classes.heroImageContainer}>
          <img
            src={imgWomanWithAddyiBottle}
            alt="addyi"
            className={classes.heroImage}
          />
        </Box>
      </Box>
    </Box>
  );
}

// Source: Jennifer component
function PatientTestimonialSection() {
  return (
    <Box className={classes.testimonialSection}>
      <Box className={classes.testimonialContainer}>
        <Box className={classes.testimonialQuoteContainer}>
        <p className={classes.testimonialQuote}>
          "I transferred my Addyi® prescription to PhilRx and not
          only did they save me over $250, they shipped my Addyi®{" "}
          directly to my house, and their refill process has been simple and
          straightforward. No more waiting in the line at the pharmacy down the
          road. This has been a great experience!"
        </p>
        <p className={classes.testimonialAuthor}>
          Jennifer 37, actual Addyi® patient
        </p>
        </Box>
      </Box>
    </Box>
  );
}

export const HeroSection: React.FC = () => {
  return (
    <>
      <ForPatientsSection />
      <PatientTestimonialSection />
    </>
  );
};
