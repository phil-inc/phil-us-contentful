import React, { useState } from "react";
import {
  Box,
  Container,
  Group,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { SEO } from "layouts/SEO/SEO";
import { addyiTheme } from "@addyi/theme";
import { AddyiHeader } from "@addyi/components/AddyiHeader";
import womanWithAddyiBottle from "@addyi/assets/images/woman-holding-addyi-bottle.png";
import checkmarkIcon from "@addyi/assets/icons/checkmark.svg";

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
  const [safetyExpanded, setSafetyExpanded] = useState(false);

  return (
    <MantineProvider theme={addyiTheme}>
      <Box className={classes.root}>
          {/* Header Section */}
          <AddyiHeader />

          {/* Patient Information Section */}
          <Box className={classes.patientInformation}>
            <Box className={classes.patientInformationContainer}>
              {/* For Patients Section */}
              <Box className={classes.forPatientsSection}>
                <Box className={classes.forPatientsContent}>
                  <Text className={classes.forPatientsLabel}>
                    FOR PATIENTS:
                  </Text>
                  <Title order={1} className={classes.patientInformationTitle}>
                    WHY I CHOOSE PHILRX PHARMACY FOR MY ADDYI<sup>®</sup> PRESCRIPTION
                  </Title>
                </Box>

                <Box className={classes.patientImageContainer}>
                  <img
                    src={womanWithAddyiBottle}
                    alt="Woman with Addyi bottle"
                    className={classes.patientImage}
                    />
                </Box>
              </Box>
            {/* Patient Testimonial Section */}
            <Box className={classes.patientTestimonialSection}>
                <Text unstyled className={classes.testimonialQuote}>
                  "I transferred my Addyi<sup>®</sup> prescription to PhilRx and not
                  only did they save me over $250, they shipped my Addyi<sup>®</sup>
                  directly to my house, and their refill process has been
                  simple and straightforward. No more waiting in the line at
                  the pharmacy down the road. This has been a great
                  experience!"
                </Text>
                <Text unstyled className={classes.testimonialAuthor}>
                  Jennifer 37, actual Addyi<sup>®</sup> patient
                </Text>
              </Box>
              
            </Box>
          </Box>

          {/* Patient Benefits Section */}
          <Box className={classes.patientBenefits}>
            <Box className={classes.patientBenefitsContainer}>
              <Box className={classes.benefitItem}>
                <Box className={classes.benefitIcon}>
                  <img
                    src={checkmarkIcon}
                    alt="Checkmark"
                    width="18"
                    height="14"
                  />
                </Box>
                <Box className={classes.benefitContent}>
                  <Text unstyled className={classes.benefitTitle}>
                    Free home delivery
                  </Text>
                  <Text unstyled className={classes.benefitDescription}>
                    (Most convenient way to get Addyi®)
                  </Text>
                </Box>
              </Box>

              <Box className={classes.benefitItem}>
                <Box className={classes.benefitIcon}>
                  <img
                    src={checkmarkIcon}
                    alt="Checkmark"
                    width="18"
                    height="14"
                  />
                </Box>
                <Box className={classes.benefitContent}>
                  <Text unstyled className={classes.benefitTitle}>
                    Refills made simple
                  </Text>
                  <Text unstyled className={classes.benefitDescription}>
                    (For the best pharmacy experience)
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* About Addyi Section */}
          <Box className={classes.aboutSection}>
            <Container className={classes.aboutContainer} size="xl">
              <Title order={2} className={classes.aboutTitle}>
                ABOUT ADDYI®
              </Title>

              <Box className={classes.aboutContent}>
                <Box className={classes.aboutImageContainer}>
                  <Box className={classes.aboutImagePlaceholder}>
                    [Placeholder: Addyi bottle with #1 badge]
                  </Box>
                </Box>

                <Box className={classes.testimonialsContainer}>
                  <Box className={classes.testimonialBubble}>
                    <Text className={classes.testimonialBubbleText}>
                      "Getting Addyi® was not only simple with PhilRx, I could
                      not believe the savings! And I love that my prescription
                      is shipped right to my door. Thank you PhilRx for an
                      excellent experience!"
                    </Text>
                    <Text className={classes.testimonialBubbleAuthor}>
                      — Cynthia, 41, Actual Addyi® patient
                    </Text>
                  </Box>

                  <Box className={classes.testimonialBubble}>
                    <Text className={classes.testimonialBubbleText}>
                      "I had no idea. I thought it was just me... Something that
                      happened as I got older. But then one of my girlfriends
                      told me about Addyi®! All I have to say is OMG... I wish I
                      had learned about this sooner!"
                    </Text>
                    <Text className={classes.testimonialBubbleAuthor}>
                      — Rhiannon, 33, Actual Addyi® patient
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Provider Section */}
          <Box className={classes.providerSection}>
            <Container className={classes.providerContainer} size="xl">
              <Title order={2} className={classes.providerTitle}>
                FOR PROVIDERS: HOW TO PRESCRIBE ADDYI®
              </Title>

              <Box className={classes.providerContent}>
                <Box className={classes.providerImagePlaceholder}>
                  [Placeholder: Doctor with stethoscope image]
                </Box>

                <Box className={classes.providerInfo}>
                  <Box className={classes.providerTestimonial}>
                    <Text size="lg" fw={600} mb="md">
                      Dr. Miller, Addyi®
                    </Text>
                    <Text size="md" style={{ lineHeight: 1.6 }}>
                      "Getting Addyi® should not be difficult. And unfortunately
                      that's what my patients were experiencing with the big box
                      pharmacies. I only prescribe Addyi® through PhilRx and the
                      process is great - more of my patients are getting their
                      Addyi® covered and less hassle for my staff and me. It's a
                      win win!"
                    </Text>
                  </Box>

                  <Box className={classes.prescriptionInfo}>
                    <Text className={classes.prescriptionTitle}>
                      SEARCH 'PHILRX' IN THE EMR'S RETAIL PHARMACY FINDER OR
                      SEARCH BY:
                    </Text>
                    <Text className={classes.prescriptionDetail}>
                      <strong>NPI:</strong> 407163500
                    </Text>
                    <Text className={classes.prescriptionDetail}>
                      <strong>Address:</strong> 150 E. Campus View Blvd, Suite
                      210, Columbus OH 43235
                    </Text>

                    <Text className={classes.prescriptionTitle} mt="xl">
                      SEND AN RX VIA PHONE OR FAX:
                    </Text>
                    <Text className={classes.prescriptionDetail}>
                      <strong>Phone:</strong> (855) 077-0075 Option 1
                    </Text>
                    <Text className={classes.prescriptionDetail}>
                      <strong>Fax:</strong> (888) 975-0003
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Important Safety Information Section */}
          <Box className={classes.safetySection}>
            <Box
              className={classes.safetyHeader}
              onClick={() => setSafetyExpanded(!safetyExpanded)}
            >
              <Text className={classes.safetyHeaderText}>
                IMPORTANT SAFETY INFORMATION
              </Text>
              <Text className={`${classes.safetyToggle} ${safetyExpanded ? classes.open : ''}`}>
                +
              </Text>
            </Box>

            {safetyExpanded && (
              <Box className={classes.safetyContent}>
                <Box className={classes.safetyColumn}>
                  <Title order={3} className={classes.safetySubtitle}>
                    What is ADDYI® (add-ee-eye) (flibanserin) Tablets?
                  </Title>
                  <Text className={classes.safetyText}>
                    ADDYI® is a prescription medicine used to treat
                    Hypoactive (low) Sexual Desire Disorder (HSDD) in
                    premenopausal women.
                  </Text>
                  <Text className={classes.safetyText}>
                    <strong>ADDYI® is NOT for:</strong>
                  </Text>
                  <ul className={classes.safetyList}>
                    <li className={classes.safetyListItem}>
                      Medical or mental health problems
                    </li>
                    <li className={classes.safetyListItem}>
                      Relationship problems
                    </li>
                    <li className={classes.safetyListItem}>
                      Other drug use
                    </li>
                    <li className={classes.safetyListItem}>
                      Men or children
                    </li>
                    <li className={classes.safetyListItem}>
                      To improve sexual performance
                    </li>
                  </ul>
                </Box>

                <Box className={classes.safetyColumn}>
                  <Title order={3} className={classes.safetySubtitle}>
                    IMPORTANT SAFETY INFORMATION
                  </Title>
                  <Text className={classes.safetyText}>
                    ADDYI® can cause severe low blood pressure and fainting.
                    This risk is increased if you drink alcohol or take certain
                    medicines.
                  </Text>
                  <Text className={classes.safetyText}>
                    <strong>To lower your risk:</strong>
                  </Text>
                  <ul className={classes.safetyList}>
                    <li className={classes.safetyListItem}>
                      Do not drink alcohol while taking ADDYI®
                    </li>
                    <li className={classes.safetyListItem}>
                      Do not take certain medicines with ADDYI®
                    </li>
                    <li className={classes.safetyListItem}>
                      Tell your doctor about all medicines you take
                    </li>
                  </ul>
                  <Text className={classes.safetyText} mt="md">
                    <strong>Who should NOT take ADDYI®:</strong>
                  </Text>
                  <ul className={classes.safetyList}>
                    <li className={classes.safetyListItem}>
                      People taking certain medicines
                    </li>
                    <li className={classes.safetyListItem}>
                      People with liver problems
                    </li>
                    <li className={classes.safetyListItem}>
                      People allergic to ADDYI®
                    </li>
                  </ul>
                </Box>
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Box className={classes.footer}>
            <Box className={classes.footerContent}>
              <Text className={classes.footerCopyright}>© Phil Inc.</Text>
              <Group className={classes.footerLinks} gap="md">
                <Text
                  component="a"
                  href="/terms"
                  className={classes.footerLink}
                >
                  Terms of Use
                </Text>
                <Text
                  component="a"
                  href="/privacy"
                  className={classes.footerLink}
                >
                  Privacy Policy
                </Text>
                <Text
                  component="a"
                  href="/hipaa"
                  className={classes.footerLink}
                >
                  HIPAA Policy
                </Text>
              </Group>
            </Box>
          </Box>
        </Box>
      </MantineProvider>
  );
};

export default AddyiPage;

