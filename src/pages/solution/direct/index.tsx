import React, { useEffect } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { serviceSchema, webPageSchema } from "utils/seo/schema";

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
const DIRECT_PATH = "/solution/direct/";
const DIRECT_OG_IMAGE = getOgImage(null);
const DIRECT_SERVICE = serviceSchema({
  path: DIRECT_PATH,
  name: "PHIL Direct-to-Patient",
  description: DIRECT_DESC,
});
const DIRECT_SCHEMA = [
  webPageSchema({
    path: DIRECT_PATH,
    name: DIRECT_TITLE,
    description: DIRECT_DESC,
    image: DIRECT_OG_IMAGE,
    mainEntity: DIRECT_SERVICE,
  }),
  DIRECT_SERVICE,
];

export const Head: HeadFC = () => (
  <>
    <SeoMeta
      title={DIRECT_TITLE}
      description={DIRECT_DESC}
      path={DIRECT_PATH}
      image={DIRECT_OG_IMAGE}
    />
    <JsonLd data={DIRECT_SCHEMA} />
  </>
);
