import React from "react";
import { Link } from "gatsby";
import { Layout } from "layouts/Layout/Layout";
import { SEO } from "layouts/SEO/SEO";
import {
  Container,
  Box,
  Title,
  Text,
  Anchor,
  List,
  Group,
  ActionIcon,
  Paper,
  Grid,
  Divider,
  Button,
} from "@mantine/core";

import * as classes from "./transforming-the-patient-experience-with-a-strong-direct-to-consumer-program.module.css";

const TITLE =
  "No Contentful: Transforming the Patient Experience with a Strong Direct-to-Consumer Program";
const DESCRIPTION =
  "This blog offers key considerations and strategies to transform the patient experience with a direct-to-consumer program for pharmaceutical brands";
const SLUG =
  "/transforming-the-patient-experience-with-a-strong-direct-to-consumer-program/";
const OG_IMAGE =
  "https://images.ctfassets.net/2h91ja0efsni/L22erGTk0slD7UCeybHnh/50dabb8f88ddb9039bb2f9c72bf1c6e9/Blog_Posts.svg?w=1200&h=630&q=90&fm=webp&fit=fill";

const SHARE_URL = `https://phil.us${SLUG}`;

const FacebookIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.97 18.93V10.26H0V7.11H2.97V5.01C2.97 1.52 4.66 0 7.55 0C8.93 0 9.66 0.1 10.01 0.15V2.9H8.04C6.81 2.9 6.39 4.06 6.39 5.37V7.09H9.98L9.49 10.24H6.38V18.94L2.96 18.92L2.97 18.93Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.63275 15H0.203954V4.87917H3.63275V15ZM1.9185 3.49775H1.89596C0.745617 3.49775 0 2.72032 0 1.74845C0 0.776585 0.767284 0 1.94074 0C3.1142 0 3.83584 0.755328 3.85837 1.74845C3.85837 2.72032 3.11449 3.49775 1.9185 3.49775ZM16 15H12.5703V9.58516C12.5703 8.22529 12.0749 7.29678 10.8335 7.29678C9.88542 7.29678 9.32209 7.92174 9.07394 8.52742C8.9838 8.74367 8.96012 9.04438 8.96012 9.34765V15H5.52958C5.52958 15 5.57552 5.82864 5.52958 4.87917H8.96012V6.3133C9.41598 5.62514 10.2292 4.64166 12.0512 4.64166C14.3083 4.64166 16 6.08769 16 9.1963V15Z" />
  </svg>
);

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 1200 1227"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
  </svg>
);

const LinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.0415 7.8685C6.72328 9.60734 8.80576 9.90031 10.0312 8.65405C11.0078 7.66206 12.0717 6.74596 13.0717 5.77294C14.0976 4.77411 13.9094 3.23564 12.6985 2.48652C11.8277 1.94764 10.6669 2.04859 9.87124 2.74534C9.53682 3.03831 9.23066 3.35936 8.89301 3.64929C8.80415 3.72519 8.62805 3.79046 8.52546 3.76011C7.6797 3.50888 6.82102 3.41173 5.86864 3.53696C5.97123 3.42236 6.02858 3.34873 6.09643 3.28422C6.7984 2.62087 7.4931 1.95144 8.20638 1.29947C9.53762 0.0797771 11.1209 -0.299717 12.8811 0.239164C14.6154 0.769696 15.6502 1.95144 15.9369 3.63715C16.1664 4.98283 15.7681 6.2048 14.7519 7.19528C13.6137 8.30492 12.4675 9.41152 11.2647 10.4582C9.31306 12.1568 6.12632 11.8327 4.60525 9.83731C4.39927 9.56787 4.36453 9.39255 4.65857 9.14891C5.1287 8.76031 5.55441 8.32314 6.03989 7.86774L6.0415 7.8685Z" />
    <path d="M9.37439 12.5408C8.42521 13.4425 7.55014 14.4471 6.50814 15.221C5.19142 16.1991 3.68082 16.2324 2.22935 15.454C0.824299 14.699 0.0757361 13.4811 0.00462259 11.857C-0.0507711 10.5989 0.393127 9.53989 1.25847 8.65405C2.2054 7.68577 3.15682 6.72202 4.11648 5.76659C5.76107 4.12958 8.12953 4.00173 9.88041 5.44433C9.91934 5.4761 9.95752 5.50863 9.9942 5.54192C10.8753 6.33395 10.8805 6.4459 10.0691 7.26517C9.79807 7.53825 9.5256 7.81058 9.22692 8.11015C9.16703 7.99062 9.13335 7.92859 9.1049 7.86505C8.51204 6.52079 6.87493 6.10246 5.80673 7.09269C4.68614 8.13133 3.61569 9.22897 2.57893 10.3531C1.82438 11.1708 1.9434 12.4848 2.74736 13.2557C3.53859 14.0144 4.79243 14.0356 5.60313 13.2905C5.93474 12.9856 6.23641 12.6467 6.56428 12.3366C6.64213 12.2624 6.78885 12.1762 6.8682 12.2027C7.66841 12.4712 8.48509 12.5575 9.37513 12.5393L9.37439 12.5408Z" />
  </svg>
);

const BlogPage: React.FC = () => {
  return (
    <Layout>
      <Container size="xl" className={classes.wrapper}>
        <Title order={1} className={classes.title}>
          {TITLE}
        </Title>

        <Container size="sm" className={classes.floatingImage}>
          <img
            src="/images/blog/Blog_Posts.svg"
            alt="Blog Posts"
            loading="lazy"
          />
        </Container>

        <Box mb="xl">
          <Text className={classes.paragraph}>
            The pharmaceutical industry has undergone a digital transformation
            – as of 2024, over{" "}
            <Anchor
              className={classes.anchor}
              href="https://rockhealth.com/insights/the-new-era-of-consumer-engagement-insights-from-rock-healths-ninth-annual-consumer-adoption-survey/"
              target="_blank"
              underline="always"
            >
              75%
            </Anchor>{" "}
            of patients have accessed care virtually. Leading brands{" "}
            <Anchor
              className={classes.anchor}
              href="https://www.biopharmadive.com/news/pfizer-eli-lilly-direct-to-consumer-glp-1/716866/"
              target="_blank"
              underline="always"
            >
              across the industry
            </Anchor>{" "}
            are embracing direct-to-consumer (DTC) programs to meet modern
            patient needs. If you're not considering how this access strategy
            could benefit your stakeholders, you may be missing out on the
            opportunity to better serve your patients and providers while
            driving brand performance.
          </Text>

          <Text className={classes.paragraph}>
            A{" "}
            <Anchor
              className={classes.anchor}
              href="https://phil.us/on-demand-webinar-delivering-on-direct-to-consumer-exceeding-patient/"
              target="_blank"
              underline="always"
            >
              recent webinar
            </Anchor>{" "}
            hosted by Phil, in collaboration with Miten Soni, Associate
            Director of Brand Marketing at Sun Pharmaceuticals, sheds light on
            how pharmaceutical companies can define, analyze, and implement an
            effective DTC program in today's virtual healthcare environment.
          </Text>

          {/* Keeping Pace with Evolving Patient Expectations */}
          <Title
            order={3}
            className={`${classes.heading} ${classes.heading3}`}
          >
            <b>Keeping Pace with Evolving Patient Expectations</b>
          </Title>

          <Text className={classes.paragraph}>
            From online shopping to mobile food ordering to virtual learning,
            consumers have become accustomed to the increased speed,
            flexibility, and choice that technology offers. These advancements
            across industries have radically changed what patients want and
            expect from their healthcare experience.
          </Text>

          <Text className={classes.paragraph}>
            <br />
            <Anchor
              className={classes.anchor}
              href="https://www.techtarget.com/patientengagement/news/366584289/Convenience-Technology-Use-Can-Boost-Patient-Satisfaction"
              target="_blank"
              underline="always"
            >
              4 in 5
            </Anchor>{" "}
            patients want to use technology to manage their healthcare, and{" "}
            <Anchor
              className={classes.anchor}
              href="https://guidehouse.com/-/media/www/site/insights/healthcare/2020/healthcare-digital-analysis-pdf.pdf"
              target="_blank"
              underline="always"
            >
              60%
            </Anchor>{" "}
            of patients expect their digital healthcare experience to mirror
            that of retail.{" "}
            <Anchor
              className={classes.anchor}
              href="https://www.mckinsey.com/industries/healthcare/our-insights/patients-love-telehealth-physicians-are-not-so-sure"
              target="_blank"
              underline="always"
            >
              Top
            </Anchor>{" "}
            reasons that patients like digital access channels include the
            convenience, experience, and accessibility. The digital care
            environment is here to stay, and it's the experience of the future.
          </Text>

          {/* Defining DTC in Pharma */}
          <Title
            order={3}
            className={`${classes.heading} ${classes.heading3}`}
          >
            <b>Defining DTC in Pharma</b>
          </Title>

          <Text className={classes.paragraph}>
            The definition of direct-to-consumer can vary across organizations.
            At Phil, we define this as a digital access program with four
            distinct components:
          </Text>

          <List
            type="unordered"
            withPadding
            className={classes.unorderedList}
            classNames={{ item: classes.listItem }}
          >
            <List.Item>
              <Text className={classes.paragraph}>
                <b>DTC marketing strategy: </b>a direct-to-consumer advertising
                strategy that is executed across multiple channels that are
                relevant to your patient population.
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                <b>Telemedicine channel: </b>an access channel that gives
                patients the option to see a provider and get prescribers
                through a telehealth appointment.
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                <b>Digital patient experience &amp; pharmacy services</b>: a
                digital enrollment and prescription management platform for
                patients, including home delivery, text updates, and refills.
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                <b>Digital HCP experience &amp; PA process:</b> an enhanced
                prior authorization (PA) and prescribing process for providers
                that keeps them in their existing workflows.
              </Text>
            </List.Item>
          </List>

          <Text className={classes.paragraph}>
            If you're interested in seeing how other manufacturers have
            approached DTC programs, we recommend{" "}
            <Anchor
              className={classes.anchor}
              href="https://phil.us/philrx-designs-transformative-telemedicine-channel-for-womens-health-brand/"
              target="_blank"
              underline="always"
            >
              this case study
            </Anchor>
            .
          </Text>

          {/* Evaluating the Efficacy of DTC */}
          <Title
            order={3}
            className={`${classes.heading} ${classes.heading3}`}
          >
            <b>Evaluating the Efficacy of DTC</b>
          </Title>

          <Text className={classes.paragraph}>
            It's important to keep in mind that direct-to-consumer programs
            will not be suitable for all brands. We suggest evaluating the
            following criteria when determining whether DTC may be a good
            potential fit for your brand:
          </Text>

          <Text className={classes.paragraph}>
            <b>Patient population: </b>analyze different aspects of your
            patient population to determine whether DTC is the right fit for a
            specific brand, such as:
          </Text>

          <List
            type="unordered"
            withPadding
            className={classes.unorderedList}
            classNames={{ item: classes.listItem }}
          >
            <List.Item>
              <Text className={classes.paragraph}>
                Patient needs and preferences
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                Ideal medication access experience
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                Key education and engagement touchpoints
              </Text>
            </List.Item>
          </List>

          <Text className={classes.paragraph}>
            <b>Program strategy and design: </b>consider the brand's broader
            access strategy and whether a DTC program can support and integrate
            with these approaches, including:
          </Text>

          <List
            type="unordered"
            withPadding
            className={classes.unorderedList}
            classNames={{ item: classes.listItem }}
          >
            <List.Item>
              <Text className={classes.paragraph}>
                Patient support strategy
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                Coverage and pricing strategy
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                Provider engagement strategy
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                Patient and provider education strategy
              </Text>
            </List.Item>
          </List>

          <Text className={classes.paragraph}>
            <b>Brand usage and requirements: </b>evaluate the brand usage
            experience for the patient, and how this could impact a DTC program
            based on:
          </Text>

          <List
            type="unordered"
            withPadding
            className={classes.unorderedList}
            classNames={{ item: classes.listItem }}
          >
            <List.Item>
              <Text className={classes.paragraph}>Role of pharmacist</Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                Complexity of condition
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>Dosage requirements</Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>Usage effects</Text>
            </List.Item>
          </List>

          <Text className={classes.paragraph}>
            <b>Regulatory compliance: </b>consider the broader implications, as
            well as any condition-specific requirements, that could affect a DTC
            program, including:
          </Text>

          <List
            type="unordered"
            withPadding
            className={classes.unorderedList}
            classNames={{ item: classes.listItem }}
          >
            <List.Item>
              <Text className={classes.paragraph}>
                Data privacy and security policies
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                Regulatory requirements
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>HIPAA compliance</Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>Channel stipulations</Text>
            </List.Item>
          </List>

          {/* Building Blocks of a DTC Program */}
          <Title
            order={3}
            className={`${classes.heading} ${classes.heading3}`}
          >
            <b>Building Blocks of a DTC Program</b>
          </Title>

          <Text className={classes.paragraph}>
            DTC programs can (and should) differ based on the above factors,
            including but not limited to the brand's goals, patient population,
            regulatory requirements, program strategy, and more. That said,
            there are several key components that most programs will benefit
            from:
          </Text>

          <List
            type="ordered"
            className={classes.orderedList}
            classNames={{ item: classes.listItem }}
          >
            <List.Item>
              <Text className={classes.paragraph}>
                <b>Multiple access channels: </b>gives patients the option to
                access care however works best for them, through telemedicine or
                in-office appointments.
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                <b>Digital prescription fulfillment: </b>offers digital
                prescription enrollment, fulfillment, and management for
                patients through a{" "}
                <Anchor
                  className={classes.anchor}
                  href="https://phil.us/life-sciences-hub-design/"
                  target="_blank"
                  underline="always"
                >
                  digital hub
                </Anchor>
                .
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                <b>Simplified PA and prescribing process: </b>automates parts
                of the PA process while keeping prescribers in their current
                workflows. In addition, the program{" "}
                <Anchor
                  className={classes.anchor}
                  href="https://phil.us/optimizing-the-field-team-for-improved-brand-outcomes/"
                  target="_blank"
                  underline="always"
                >
                  equips the field team
                </Anchor>{" "}
                with digital tools to monitor script activity and proactively
                engage prescribers.
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                <b>Tech-enabled education and support: </b>provides digital and
                human-touch support programs that are tailored to patients,
                providers, and field teams.
              </Text>
            </List.Item>
            <List.Item>
              <Text className={classes.paragraph}>
                <b>Real-time data and insights: </b>leverages digital hub
                insights and telemedicine integration to{" "}
                <Anchor
                  className={classes.anchor}
                  href="https://phil.us/translating-data-into-actionable-insights-to-inform-your-patient-access/"
                  target="_blank"
                  underline="always"
                >
                  gain full visibility
                </Anchor>{" "}
                across the access journey at the script, provider, and
                territory level.
              </Text>
            </List.Item>
          </List>

          <Text className={classes.paragraph}>
            For a deeper dive into developing an alternative channel strategy
            that supports your DTC program, check out{" "}
            <Anchor
              className={classes.anchor}
              href="https://phil.us/the-case-for-an-alternative-channel-strategy-in-2024-and-beyond/"
              target="_blank"
              underline="always"
            >
              this blog post
            </Anchor>
            .
          </Text>

          {/* Transforming Patient Care with DTC */}
          <Title
            order={3}
            className={`${classes.heading} ${classes.heading3}`}
          >
            <b>Transforming Patient Care with DTC</b>
          </Title>

          <Text className={classes.paragraph}>
            Direct-to-consumer is the future of medication access. By offering
            more convenience, flexibility, and choice through a digital access
            program, pharmaceutical companies can pave the way to improved
            patient outcomes, provider engagement, and brand performance.
          </Text>

          <Text className={classes.paragraph}>
            Your success is our priority – we've designed the{" "}
            <Anchor
              className={classes.anchor}
              href="https://phil.us/life-sciences/#drive-access-with-philrx"
              target="_blank"
              underline="always"
            >
              PhilRx Digital Hub
            </Anchor>{" "}
            to support manufacturers looking to build a best-in-class access
            experience for their patients, providers, and brands.{" "}
            <Anchor
              className={classes.anchor}
              href="https://phil.us/demo/"
              target="_blank"
              underline="always"
            >
              Book a demo
            </Anchor>{" "}
            to see what we can help you achieve.
          </Text>
        </Box>

        {/* Social Share */}
        <Group gap="sm" align="center" justify="left">
          <Text className={classes.socialShareText}>
            Share this article on:
          </Text>
          <Group gap="sm" align="center">
            <Anchor
              href={`https://facebook.com/sharer/sharer.php?u=${SHARE_URL}`}
              target="_blank"
              underline="never"
            >
              <ActionIcon
                variant="filled"
                radius="xl"
                size="lg"
                className={classes.socialButton}
              >
                <FacebookIcon />
              </ActionIcon>
            </Anchor>
            <Anchor
              href={`http://www.linkedin.com/shareArticle?mini=true&url=${SHARE_URL}&source=phil.us`}
              target="_blank"
              underline="never"
            >
              <ActionIcon
                variant="filled"
                radius="xl"
                size="lg"
                className={classes.socialButton}
              >
                <LinkedInIcon />
              </ActionIcon>
            </Anchor>
            <Anchor
              href={`https://twitter.com/intent/tweet?text=${SHARE_URL}`}
              target="_blank"
              underline="never"
            >
              <ActionIcon
                variant="filled"
                radius="xl"
                size="lg"
                className={classes.socialButton}
              >
                <XIcon />
              </ActionIcon>
            </Anchor>
            <ActionIcon
              variant="filled"
              radius="xl"
              size="lg"
              className={classes.socialButton}
              onClick={() => {
                if (typeof navigator !== "undefined") {
                  navigator.clipboard.writeText(SHARE_URL);
                }
              }}
            >
              <LinkIcon />
            </ActionIcon>
          </Group>
        </Group>
      </Container>

      {/* Bottom Banner */}
      <Box className={classes.bannerContainer}>
        <Container size="xl">
          <Paper className={classes.bannerCard} p="xl">
            <Grid justify="space-between" align="center" gutter={0}>
              <Grid.Col span={{ base: 12, lg: 9, xl: 10 }}>
                <Title order={3}>Ready to learn more?</Title>
                <Divider
                  variant="dashed"
                  style={{ maxWidth: 404 }}
                  my="xs"
                />
                <Text size="md" mt="sm" mb={11}>
                  Our consultants will work with you to analyze your current
                  channel strategy and make recommendations for how to improve
                  patient access and increase the percentage of scripts getting
                  covered by insurance.
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 3, xl: 2 }}>
                <Group>
                  <Button
                    component={Link}
                    to="/demo/"
                    variant="philDefault"
                    className={classes.bannerButton}
                  >
                    Contact us
                  </Button>
                </Group>
              </Grid.Col>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default BlogPage;

export const Head: React.FC = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    url: `https://phil.us${SLUG}`,
    image: OG_IMAGE,
    publisher: {
      "@type": "Organization",
      name: "PHIL",
      url: "https://phil.us",
    },
  };

  return (
    <SEO title={TITLE}>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:type" content="article" />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={`https://phil.us${SLUG}`} />
    </SEO>
  );
};
