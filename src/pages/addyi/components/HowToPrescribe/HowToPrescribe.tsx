import React from "react";
import { Box, Text, Title } from "@mantine/core";

import imgDoctorImage from "@addyi/assets/images/75366f9d40e2c95d068311b00b03a8c331a5152d.png";

import * as classes from "./HowToPrescribe.module.css";

// Source: Group14 - For Providers title and How to Prescribe
function Group14() {
  return (
    <Box className={classes.titleSection}>
      <Text className={classes.forProvidersLabel}>FOR PROVIDERS:</Text>
      <Box className={classes.howToPrescribeTitle}>
        <Text component="span" className={classes.titleLine}>
          How to
        </Text>
        <Text component="span" className={classes.titleLine}>
          Prescribe
        </Text>
        <Text component="span" className={classes.titleLine}>
          ADDYI<sup>®</sup>
        </Text>
      </Box>
    </Box>
  );
}

// Source: Group13 - Doctor image container
function Group13() {
  return (
    <Box className={classes.doctorImageContainer}>
      <Box className={classes.imageWrapper}>
        <img
          src={imgDoctorImage}
          alt="Healthcare provider"
          className={classes.doctorImage}
        />
      </Box>
    </Box>
  );
}

// Source: Group2 - Doctor testimonial
function Group2() {
  return (
    <Box className={classes.doctorTestimonial}>
      <Text className={classes.testimonialText}>
        "Getting Addyi<sup>®</sup> should not be difficult. And unfortunately
        that's what my patients were experiencing with the big box pharmacies. I
        only prescribe Addyi<sup>®</sup> through PhilRx and the process is great
        - more of my patients are getting their Addyi<sup>®</sup> covered and
        less hassle for my staff and me. It's a win win!"
      </Text>
      <Text className={classes.testimonialAuthor}>
        Dr. Miller, Addyi<sup>®</sup>
      </Text>
    </Box>
  );
}

// Source: Group12/Group5 - Image and testimonial container
function Group12() {
  return (
    <Box className={classes.leftColumn}>
      <Group13 />
    </Box>
  );
}

// Source: HowToPrescribe component
export const HowToPrescribe: React.FC = () => {
  return (
    <Box className={classes.howToPrescribeSection}>
      <Box className={classes.howToPrescribeContainer}>
        <Group12 />
        <Box className={classes.rightColumn}>
          <Group14 />
          <Group2 />
        </Box>
      </Box>
    </Box>
  );
};
