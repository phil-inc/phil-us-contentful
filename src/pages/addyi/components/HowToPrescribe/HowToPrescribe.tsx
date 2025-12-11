import React from "react";
import { Box } from "@mantine/core";

import imgDoctorImage from "@addyi/assets/images/75366f9d40e2c95d068311b00b03a8c331a5152d.png";

import * as classes from "./HowToPrescribe.module.css";

export const HowToPrescribe: React.FC = () => {
  return (
    <Box className={classes.howToPrescribeSection}>
      <Box className={classes.howToPrescribeContainer}>
        <Box className={classes.leftColumn}>
          <Box className={classes.doctorImageContainer}>
            <Box className={classes.imageWrapper}>
              <img
                src={imgDoctorImage}
                alt="Healthcare provider"
                className={classes.doctorImage}
              />
            </Box>
          </Box>
        </Box>
        <Box className={classes.rightColumn}>
          <Box className={classes.titleSection}>
            <span className={classes.forProvidersLabel}>FOR PROVIDERS:</span>
            <Box className={classes.howToPrescribeTitle}>
              <span className={classes.titleLine}>
                How to
              </span>
              <span className={classes.titleLine}>
                Prescribe
              </span>
              <span className={classes.titleLine}>
                ADDYI®
              </span>
            </Box>
          </Box>
          <Box className={classes.doctorTestimonial}>
            <p className={classes.testimonialText}>
              "Getting Addyi<sup>®</sup> should not be difficult. And unfortunately
              that's what my patients were experiencing with the big box pharmacies. I
              only prescribe Addyi<sup>®</sup> through PhilRx and the process is great
              - more of my patients are getting their Addyi<sup>®</sup> covered and
              less hassle for my staff and me. It's a win win!"
            </p>
            <p className={classes.testimonialAuthor}>
              Dr. Miller, Addyi<sup>®</sup>
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
