import React from "react";
import { navigate } from "gatsby";
import { Container } from "@mantine/core";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import Eyebrow from "components/common/Eyebrow/Eyebrow";
import StatBanner from "components/common/StatBanner/StatBanner";
import CheckList from "components/common/CheckList/CheckList";
import OpportunityCard from "components/common/OpportunityCard/OpportunityCard";
import PullQuote from "components/common/PullQuote/PullQuote";
import CtaBanner from "components/common/CtaBanner/CtaBanner";
import StickyFormCard from "components/common/StickyFormCard/StickyFormCard";

import { ROI_EMAIL_SUBMITTED } from "constants/global.constant";

import * as classes from "./gtn.module.css";

// HubSpot GTN form — sourced from Contentful modal embedForm
const HUBSPOT_PORTAL_ID = "20880193";
const HUBSPOT_FORM_ID = "ca766c17-c6b5-4b29-a1b5-5e4f25655386";

const stats = [
  { value: 1.9, suffix: "×", decimals: 1, label: "Patient starts", sublabel: "vs. baseline" },
  { value: 2.8, suffix: "×", decimals: 1, label: "Covered dispenses", sublabel: "vs. baseline" },
  { value: 2.7, suffix: "×", decimals: 1, label: "Gross Revenue Potential", sublabel: "vs. retail baseline", highlight: true },
];

const benchmarks = [
  {
    title: "Baselines from real pharma brands",
    description: "Every calculation is based on real performance data from brands, giving you a realistic estimate of what's achievable for your portfolio.",
  },
  {
    title: "Customized to your access strategy",
    description: "The calculator is built to deliver a strong GTN estimate based on your brand's actual channel strategy inputs, layered on top of PHIL program data, not a generic industry average.",
  },
  {
    title: "Built by Commercial Insights experts",
    description: "The model behind this calculator was built by PHIL's Commercial Insights team, translating the framework we use with our pharma clients into a self‑serve tool that commercial leaders can leverage.",
  },
];

const StartsVisual = () => (
  <svg viewBox="0 0 220 96" width="100%" height="100%">
    <g fill="#5ABEA4">
      <circle cx="14" cy="82" r="10" />
      <circle cx="14" cy="58" r="10" opacity="0.35" />
      <circle cx="14" cy="34" r="10" opacity="0.15" />
    </g>
    <g fill="#00827E">
      <circle cx="46" cy="82" r="10" />
      <circle cx="46" cy="58" r="10" />
      <circle cx="46" cy="34" r="10" opacity="0.35" />
    </g>
    <g fill="#00615E">
      <circle cx="78" cy="82" r="10" />
      <circle cx="78" cy="58" r="10" />
      <circle cx="78" cy="34" r="10" />
      <circle cx="78" cy="10" r="10" opacity="0.55" />
    </g>
    <g fill="#00827E">
      <circle cx="110" cy="82" r="10" />
      <circle cx="110" cy="58" r="10" />
      <circle cx="110" cy="34" r="10" />
      <circle cx="110" cy="10" r="10" />
    </g>
    <path d="M14 82 L46 58 L78 34 L110 10" stroke="#00615E" strokeWidth="1.5" fill="none" strokeDasharray="3 4" opacity="0.5" />
  </svg>
);

const CoverageVisual = () => (
  <svg viewBox="0 0 220 96" width="100%" height="100%">
    <rect x="0" y="40" width="36" height="36" rx="6" fill="#D5F1F0" />
    <rect x="40" y="32" width="36" height="44" rx="6" fill="#6DDFC1" />
    <rect x="80" y="22" width="36" height="54" rx="6" fill="#5ABEA4" />
    <rect x="120" y="12" width="36" height="64" rx="6" fill="#00827E" />
    <rect x="160" y="0" width="36" height="76" rx="6" fill="#00615E" />
  </svg>
);

const AdherenceVisual = () => (
  <svg viewBox="0 0 220 96" width="100%" height="100%">
    <line x1="6" y1="48" x2="214" y2="48" stroke="#D7DCDC" strokeWidth="1" />
    <circle cx="20" cy="48" r="14" fill="#00827E" />
    <circle cx="60" cy="48" r="13" fill="#00827E" opacity="0.85" />
    <circle cx="100" cy="48" r="12" fill="#00827E" opacity="0.7" />
    <circle cx="140" cy="48" r="11" fill="#00827E" opacity="0.55" />
    <circle cx="180" cy="48" r="10" fill="#00827E" opacity="0.4" />
    <path d="M204 48 l8 -4 v8 z" fill="#00615E" />
  </svg>
);

const handleFormSubmit = () => {
  sessionStorage.setItem(ROI_EMAIL_SUBMITTED, "true");
  navigate("/gtn/calculator");
};

const GtnLandingPage: React.FC = () => (
  <PageContext.Provider value={{ title: "GTN" }}>
    <Layout>
      <Container size="xl">
        <div className={classes.shell}>
          <div className={classes.editorial}>
            {/* Hero */}
            <section className={classes.hero}>
              <Eyebrow text="GTN Performance Calculator" />
              <h1 className={classes.h1}>
                See How Your Brand&rsquo;s{" "}
                <em className={classes.accent}>Gross&#8209;To&#8209;Net Could Grow</em>
              </h1>
              <p className={classes.lead}>
                Your brand team is focused on improving starts, coverage, and adherence.
                See what&rsquo;s possible when all three components kick into hyperdrive
                to multiply gross&#8209;to&#8209;net impact, with an alternative channel
                built to maximize commercial control and patient outcomes. Uncover your
                brand&rsquo;s untapped potential.
              </p>
              <StatBanner label="Capture your commercial potential" stats={stats} />
            </section>

            {/* Benchmarks */}
            <section>
              <Eyebrow text="Uncover Your Commercial Potential" />
              <h2 className={classes.h2}>Benchmarks grounded in real brand performance</h2>
              <p className={classes.lead}>
                The outputs from this calculator aren&rsquo;t generic industry averages.
                They are based on real program data from pharma brands working with PHIL.
              </p>
              <CheckList items={benchmarks} />
            </section>

            {/* Opportunity */}
            <section>
              <Eyebrow text="The Opportunity" />
              <h2 className={classes.h2}>
                Your GTN goals are within reach. Here&rsquo;s what getting there looks like.
              </h2>
              <p className={classes.lead}>
                PHIL has 10+ years experience helping pharma teams improve their commercial
                performance through technology. Our all&#8209;in&#8209;one solution is built
                to optimize starts, coverage, and adherence to maximize gross&#8209;to&#8209;net impact.
              </p>
              <div className={classes.oppGrid}>
                <OpportunityCard
                  tag="Stronger Starts"
                  title="Maximize patient access and therapy starts."
                  description="Achieve an industry-leading 2x+ first fill rate vs. traditional channels, ensuring your therapy reaches as many patients as possible."
                  visual={<StartsVisual />}
                />
                <OpportunityCard
                  tag="Higher Coverage"
                  title="Convert covered scripts into covered dispenses."
                  description="Drive 85%+ PA submission rates and 2x+ covered dispenses vs. traditional channels."
                  visual={<CoverageVisual />}
                />
                <OpportunityCard
                  tag="Better Adherence"
                  title="Support long-term patient adherence."
                  description="Build a sustainable refill process that ensures patients can easily stay on therapy, with 3x+ refill adherence rates vs. traditional channels."
                  visual={<AdherenceVisual />}
                />
                <OpportunityCard
                  tag="Multiplied Impact"
                  title="GTN impact vs. other channels."
                  description="Experience the compounding effect on commercial performance with PHIL."
                  spotlight
                  bigNumber={{ value: 3, suffix: "×", decimals: 0 }}
                />
              </div>
            </section>

            {/* Pull Quote */}
            <PullQuote
              quote="We've seen outstanding commercial results with PHIL, stronger than any of our best case scenario forecasts."
              author="Vice President of Market Access"
              role="PHIL Client"
            />

            {/* Final CTA */}
            <CtaBanner
              title="Ready to unpack your results?"
              description="Book a call with our team for a deep dive into your brand's commercial potential with PHIL."
              buttonText="Book A Call"
              buttonHref="/demo"
            />
          </div>

          {/* Sticky Form Rail */}
          <div className={classes.rail}>
            <StickyFormCard
              eyebrow="Run Your Numbers"
              title="Your brand's commercial potential, modeled in a minute."
              description="Gain a clear view of what's possible for your portfolio."
              portalId={HUBSPOT_PORTAL_ID}
              formId={HUBSPOT_FORM_ID}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </Container>
    </Layout>
  </PageContext.Provider>
);

export default GtnLandingPage;
