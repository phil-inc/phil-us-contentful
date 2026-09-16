import React, { useEffect } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { serviceSchema, webPageSchema } from "utils/seo/schema";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import { HeroSection } from "./_sections/Hero";
import { StatBandSection } from "./_sections/StatBand";
import { PillarsSection } from "./_sections/Pillars";
import { JourneySection } from "./_sections/Journey";
import { DataTabsSection } from "./_sections/DataTabs";
import { SupportSection } from "./_sections/Support";
import { RoiSection } from "./_sections/Roi";
import { FinalCtaSection } from "./_sections/FinalCta";

import { attachSolutionCoreInteractions } from "./interactions";

import "./core.css";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement) => void };
  }
}

const SolutionCorePage: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const detach = attachSolutionCoreInteractions();
    return detach;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const initWidgets = () => {
      document
        .querySelectorAll<HTMLElement>(
          ".trustpilot-widget:not([data-initialized])",
        )
        .forEach((el) => {
          if (window.Trustpilot) {
            window.Trustpilot.loadFromElement(el);
            el.dataset.initialized = "true";
          }
        });
    };
    if (window.Trustpilot) {
      initWidgets();
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    script.onload = initWidgets;
    document.body.appendChild(script);
  }, []);

  return (
    <PageContext.Provider value={{ title: "Core Hub" }}>
      <Layout>
        <div className="scope">
          <HeroSection />
          <StatBandSection />
          <PillarsSection />
          <JourneySection />
          <DataTabsSection />
          <SupportSection />
          <RoiSection />
          <FinalCtaSection />
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default SolutionCorePage;

const CORE_TITLE = "Digital Hub | PHIL";
const CORE_DESC =
  "PHIL combines a flexible digital hub, integrated pharmacy network, and script-level data to maximize patient access, adherence, and brand performance.";
const CORE_PATH = "/solution/hub/";
const CORE_OG_IMAGE = getOgImage(null);
const CORE_SERVICE = serviceSchema({
  path: CORE_PATH,
  name: "PHIL Digital Hub",
  description: CORE_DESC,
});
const CORE_SCHEMA = [
  webPageSchema({
    path: CORE_PATH,
    name: CORE_TITLE,
    description: CORE_DESC,
    image: CORE_OG_IMAGE,
    mainEntity: CORE_SERVICE,
  }),
  CORE_SERVICE,
];

export const Head: HeadFC = () => (
  <>
    <SeoMeta
      title={CORE_TITLE}
      description={CORE_DESC}
      path={CORE_PATH}
      image={CORE_OG_IMAGE}
    />
    <JsonLd data={CORE_SCHEMA} />
  </>
);
