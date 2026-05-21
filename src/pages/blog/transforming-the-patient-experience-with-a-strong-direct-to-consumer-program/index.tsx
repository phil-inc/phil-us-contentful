import React from "react";
import {
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  List,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "gatsby";
import { Layout } from "layouts/Layout/Layout";
import { SEO } from "layouts/SEO/SEO";
import SocialShare from "components/Blog/SocialShare/SocialShare";

import * as classes from "./dtcBlog.module.css";

export const Head = () => (
  <SEO title="Transforming the Patient Experience with a Strong Direct-to-Consumer Program">
    <meta
      name="description"
      content="This blog offers key considerations and strategies to transform the patient experience with a direct-to-consumer program for pharmaceutical brands"
    />
  </SEO>
);

const DTCBlogPage: React.FC = () => (
  <Layout>
    <Container size="xl" className={classes.wrapper}>
      <Title order={1} className={classes.title}>
        Transforming the Patient Experience with a Strong Direct-to-Consumer
        Program
      </Title>

      <Container size="sm" className={classes.floatingImage}>
        <img
          src="//images.ctfassets.net/2h91ja0efsni/L22erGTk0slD7UCeybHnh/50dabb8f88ddb9039bb2f9c72bf1c6e9/Blog_Posts.svg"
          alt="Blog Posts"
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Container>

      <Box mb={42}>
        {/* Intro */}
        <Text className={classes.paragraph}>
          The pharmaceutical industry has undergone a digital transformation –
          as of 2024, over{" "}
          <Anchor
            href="https://rockhealth.com/insights/the-new-era-of-consumer-engagement-insights-from-rock-healths-ninth-annual-consumer-adoption-survey/"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            75%
          </Anchor>{" "}
          of patients have accessed care virtually. Leading brands{" "}
          <Anchor
            href="https://www.biopharmadive.com/news/pfizer-eli-lilly-direct-to-consumer-glp-1/716866/"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            across the industry
          </Anchor>{" "}
          are embracing direct-to-consumer (DTC) programs to meet modern patient
          needs. If you're not considering how this access strategy could benefit
          your stakeholders, you may be missing out on the opportunity to better
          serve your patients and providers while driving brand performance.
        </Text>

        <Text className={classes.paragraph}>
          A{" "}
          <Anchor
            href="https://phil.us/on-demand-webinar-delivering-on-direct-to-consumer-exceeding-patient/"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            recent webinar
          </Anchor>{" "}
          hosted by Phil, in collaboration with Miten Soni, Associate Director
          of Brand Marketing at Sun Pharmaceuticals, sheds light on how
          pharmaceutical companies can define, analyze, and implement an
          effective DTC program in today's virtual healthcare environment.
        </Text>

        {/* H3: Keeping Pace */}
        <Title order={3} className={`${classes.heading} ${classes.heading3}`}>
          <strong>Keeping Pace with Evolving Patient Expectations</strong>
        </Title>

        <Text className={classes.paragraph}>
          From online shopping to mobile food ordering to virtual learning,
          consumers have become accustomed to the increased speed, flexibility,
          and choice that technology offers. These advancements across industries
          have radically changed what patients want and expect from their
          healthcare experience.
        </Text>

        <Text className={classes.paragraph}>
          <Anchor
            href="https://www.techtarget.com/patientengagement/news/366584289/Convenience-Technology-Use-Can-Boost-Patient-Satisfaction"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            4 in 5
          </Anchor>{" "}
          patients want to use technology to manage their healthcare, and{" "}
          <Anchor
            href="https://guidehouse.com/-/media/www/site/insights/healthcare/2020/healthcare-digital-analysis-pdf.pdf"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            60%
          </Anchor>{" "}
          of patients expect their digital healthcare experience to mirror that
          of retail.{" "}
          <Anchor
            href="https://www.mckinsey.com/industries/healthcare/our-insights/patients-love-telehealth-physicians-are-not-so-sure"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            Top
          </Anchor>{" "}
          reasons that patients like digital access channels include the
          convenience, experience, and accessibility. The digital care
          environment is here to stay, and it's the experience of the future.
        </Text>

        {/* H3: Defining DTC */}
        <Title order={3} className={`${classes.heading} ${classes.heading3}`}>
          <strong>Defining DTC in Pharma</strong>
        </Title>

        <Text className={classes.paragraph}>
          The definition of direct-to-consumer can vary across organizations. At
          Phil, we define this as a digital access program with four distinct
          components:
        </Text>

        <List
          listStyleType="disc"
          className={classes.unorderedList}
        >
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>DTC marketing strategy: </strong>a direct-to-consumer
              advertising strategy that is executed across multiple channels that
              are relevant to your patient population.
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>Telemedicine channel: </strong>an access channel that
              gives patients the option to see a provider and get prescribers
              through a telehealth appointment.
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>Digital patient experience &amp; pharmacy services</strong>
              : a digital enrollment and prescription management platform for
              patients, including home delivery, text updates, and refills.
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>Digital HCP experience &amp; PA process:</strong> an
              enhanced prior authorization (PA) and prescribing process for
              providers that keeps them in their existing workflows.
            </Text>
          </List.Item>
        </List>

        <Text className={classes.paragraph}>
          If you're interested in seeing how other manufacturers have approached
          DTC programs, we recommend{" "}
          <Anchor
            href="https://phil.us/philrx-designs-transformative-telemedicine-channel-for-womens-health-brand/"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            this case study
          </Anchor>
          .
        </Text>

        {/* H3: Evaluating DTC */}
        <Title order={3} className={`${classes.heading} ${classes.heading3}`}>
          <strong>Evaluating the Efficacy of DTC</strong>
        </Title>

        <Text className={classes.paragraph}>
          It's important to keep in mind that direct-to-consumer programs will
          not be suitable for all brands. We suggest evaluating the following
          criteria when determining whether DTC may be a good potential fit for
          your brand:
        </Text>

        <Text className={classes.paragraph}>
          <strong>Patient population: </strong>analyze different aspects of your
          patient population to determine whether DTC is the right fit for a
          specific brand, such as:
        </Text>

        <List listStyleType="disc" className={classes.unorderedList}>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              Patient needs and preferences
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              Ideal medication access experience
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              Key education and engagement touchpoints
            </Text>
          </List.Item>
        </List>

        <Text className={classes.paragraph}>
          <strong>Program strategy and design: </strong>consider the brand's
          broader access strategy and whether a DTC program can support and
          integrate with these approaches, including:
        </Text>

        <List listStyleType="disc" className={classes.unorderedList}>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>Patient support strategy</Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              Coverage and pricing strategy
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              Provider engagement strategy
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              Patient and provider education strategy
            </Text>
          </List.Item>
        </List>

        <Text className={classes.paragraph}>
          <strong>Brand usage and requirements: </strong>evaluate the brand
          usage experience for the patient, and how this could impact a DTC
          program based on:
        </Text>

        <List listStyleType="disc" className={classes.unorderedList}>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>Role of pharmacist</Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>Complexity of condition</Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>Dosage requirements</Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>Usage effects</Text>
          </List.Item>
        </List>

        <Text className={classes.paragraph}>
          <strong>Regulatory compliance: </strong>consider the broader
          implications, as well as any condition-specific requirements, that
          could affect a DTC program, including:
        </Text>

        <List listStyleType="disc" className={classes.unorderedList}>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              Data privacy and security policies
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>Regulatory requirements</Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>HIPAA compliance</Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>Channel stipulations</Text>
          </List.Item>
        </List>

        {/* H3: Building Blocks */}
        <Title order={3} className={`${classes.heading} ${classes.heading3}`}>
          <strong>Building Blocks of a DTC Program</strong>
        </Title>

        <Text className={classes.paragraph}>
          DTC programs can (and should) differ based on the above factors,
          including but not limited to the brand's goals, patient population,
          regulatory requirements, program strategy, and more. That said, there
          are several key components that most programs will benefit from:
        </Text>

        <List type="ordered" className={classes.orderedList}>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>Multiple access channels: </strong>gives patients the
              option to access care however works best for them, through
              telemedicine or in-office appointments.
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>Digital prescription fulfillment: </strong>offers digital
              prescription enrollment, fulfillment, and management for patients
              through a{" "}
              <Anchor
                href="https://phil.us/life-sciences-hub-design/"
                target="_blank"
                referrerPolicy="no-referrer"
                className={classes.anchor}
              >
                digital hub
              </Anchor>
              .
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>Simplified PA and prescribing process: </strong>automates
              parts of the PA process while keeping prescribers in their current
              workflows. In addition, the program{" "}
              <Anchor
                href="https://phil.us/optimizing-the-field-team-for-improved-brand-outcomes/"
                target="_blank"
                referrerPolicy="no-referrer"
                className={classes.anchor}
              >
                equips the field team
              </Anchor>{" "}
              with digital tools to monitor script activity and proactively
              engage prescribers.
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>Tech-enabled education and support: </strong>provides
              digital and human-touch support programs that are tailored to
              patients, providers, and field teams.
            </Text>
          </List.Item>
          <List.Item className={classes.listItem}>
            <Text className={classes.paragraph}>
              <strong>Real-time data and insights: </strong>leverages digital
              hub insights and telemedicine integration to{" "}
              <Anchor
                href="https://phil.us/translating-data-into-actionable-insights-to-inform-your-patient-access/"
                target="_blank"
                referrerPolicy="no-referrer"
                className={classes.anchor}
              >
                gain full visibility
              </Anchor>{" "}
              across the access journey at the script, provider, and territory
              level.
            </Text>
          </List.Item>
        </List>

        <Text className={classes.paragraph}>
          For a deeper dive into developing an alternative channel strategy that
          supports your DTC program, check out{" "}
          <Anchor
            href="https://phil.us/the-case-for-an-alternative-channel-strategy-in-2024-and-beyond/"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            this blog post
          </Anchor>
          .
        </Text>

        {/* H3: Transforming Patient Care */}
        <Title order={3} className={`${classes.heading} ${classes.heading3}`}>
          <strong>Transforming Patient Care with DTC</strong>
        </Title>

        <Text className={classes.paragraph}>
          Direct-to-consumer is the future of medication access. By offering
          more convenience, flexibility, and choice through a digital access
          program, pharmaceutical companies can pave the way to improved patient
          outcomes, provider engagement, and brand performance.
        </Text>

        <Text className={classes.paragraph}>
          Your success is our priority – we've designed the{" "}
          <Anchor
            href="https://phil.us/life-sciences/#drive-access-with-philrx"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            PhilRx Digital Hub
          </Anchor>{" "}
          to support manufacturers looking to build a best-in-class access
          experience for their patients, providers, and brands.{" "}
          <Anchor
            href="https://phil.us/demo/"
            target="_blank"
            referrerPolicy="no-referrer"
            className={classes.anchor}
          >
            Book a demo
          </Anchor>{" "}
          to see what we can help you achieve.
        </Text>
      </Box>

      <SocialShare />
    </Container>

    {/* Bottom banner */}
    <Container
      fluid
      style={{ background: "#F4F4F4", minHeight: "100%" }}
      py={120}
      px={{ base: "md", sm: "xl", lg: 106 }}
    >
      <Container size="xl">
        <Paper radius={0} className={classes.bannerCard}>
          <Grid gutter={0} align="center" justify="space-between">
            <Grid.Col span={{ base: 12, lg: 9, xl: 10 }}>
              <Box>
                <Title order={3}>Ready to learn more?</Title>
                <Divider
                  variant="dashed"
                  size={1}
                  style={{ maxWidth: 404 }}
                  my={10}
                />
                <Text size="md" mt="sm" mb={11}>
                  Our consultants will work with you to analyze your current
                  channel strategy and make recommendations for how to improve
                  patient access and increase the percentage of scripts getting
                  covered by insurance.
                </Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 3, xl: 2 }}>
              <Group justify="flex-start">
                <Button component={Link} to="/contact/" variant="philDefault">
                  Contact us
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Container>
  </Layout>
);

export default DTCBlogPage;
