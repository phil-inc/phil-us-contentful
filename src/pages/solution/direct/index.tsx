import React, { useEffect } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import { HeroSection } from "./_sections/Hero";
import { ThoughtLeadershipSection } from "./_sections/ThoughtLeadership";
import { TelemedicineSection } from "./_sections/Telemedicine";
import { FunnelSection } from "./_sections/Funnel";
import { ResearchSection } from "./_sections/Research";
import { VideoBandSection } from "./_sections/VideoBand";
import { FinalCtaSection } from "./_sections/FinalCta";

import { attachSolutionDirectInteractions } from "./interactions";

import "./direct.css";

const SolutionDirectPage: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const detach = attachSolutionDirectInteractions();
    return detach;
  }, []);

  return (
    <PageContext.Provider value={{ title: "Direct-to-Patient" }}>
      <Layout>
        <div className="scope-direct">
          <HeroSection />
          <ThoughtLeadershipSection />
          <TelemedicineSection />
          <FunnelSection />
          <ResearchSection />
          <VideoBandSection />
          <FinalCtaSection />
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default SolutionDirectPage;

const DIRECT_TITLE = "Direct-to-Patient | PHIL";
const DIRECT_DESC =
  "PHIL Direct delivers a proven, ecommerce-like Direct-to-Patient experience — combining intake, fulfillment, and analytics into one flexible solution that expands affordable medication access.";
const DIRECT_URL = "https://phil.us/solution/direct/";
const DIRECT_OG_IMAGE = getOgImage(null);
const DIRECT_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": DIRECT_URL,
  url: DIRECT_URL,
  name: DIRECT_TITLE,
  description: DIRECT_DESC,
  image: DIRECT_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{DIRECT_TITLE}</title>
    <meta name="description" content={DIRECT_DESC} />
    <link rel="canonical" href={DIRECT_URL} />
    <meta property="og:title" content={DIRECT_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={DIRECT_DESC} />
    <meta property="og:image" content={DIRECT_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={DIRECT_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={DIRECT_TITLE} />
    <meta name="twitter:description" content={DIRECT_DESC} />
    <meta name="twitter:image" content={DIRECT_OG_IMAGE} />
    <script type="application/ld+json">{DIRECT_SCHEMA}</script>
  </>
);
