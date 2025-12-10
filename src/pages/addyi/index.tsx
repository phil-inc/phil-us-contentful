import React from "react";
import { Box, MantineProvider } from "@mantine/core";
import { SEO } from "layouts/SEO/SEO";
import { addyiTheme } from "@addyi/theme";
import { AddyiHeader } from "@addyi/components/AddyiHeader";
import { HeroSection } from "@addyi/components/HeroSection";
import { Bullets } from "@addyi/components/Bullets";
import { AboutAddyiSection } from "@addyi/components/AboutAddyiSection";
import { TestimonialBubbles } from "@addyi/components/TestimonialBubbles";
import { HowToPrescribe } from "@addyi/components/HowToPrescribe";
import { SearchSend } from "@addyi/components/SearchSend";
import { SafetyInformation } from "@addyi/components/SafetyInformation";
import { Footer } from "@addyi/components/Footer";

import * as classes from "@addyi/styles/styles.module.css";

export const Head: React.FC = () => (
  <SEO title="Addyi Prescription">
    <meta
      name="description"
      content="Addyi - Empowering women's health and wellness through PhilRx Pharmacy"
    />
    <meta property="og:title" content="Addyi" />
    <meta property="og:type" content="Page" />
    <meta
      property="og:description"
      content="Addyi - Empowering women's health and wellness through PhilRx Pharmacy"
    />
    <meta property="og:url" content="https://phil.us/addyi/" />
  </SEO>
);

const AddyiPage = () => {
  return (
    <MantineProvider theme={addyiTheme}>
      <Box className={classes.root}>
        {/* Header Section */}
        <AddyiHeader />

        {/* Hero Section - For Patients + Jennifer Testimonial */}
        <HeroSection />

        {/* Benefits Bullets - Free delivery, Refills */}
        <Bullets />

        {/* About Addyi Section - Pink background with bottle, buttons, dosage info */}
        <AboutAddyiSection />

        {/* Testimonial Bubbles - Christine and Shannon */}
        <TestimonialBubbles />

        {/* How To Prescribe Section - For Providers */}
        <HowToPrescribe />

        {/* Search/Send Section - EMR info, Phone/Fax */}
        <SearchSend />

        {/* Safety Information Accordion */}
        <SafetyInformation />

        {/* Footer */}
        <Footer />
      </Box>
    </MantineProvider>
  );
};

export default AddyiPage;
