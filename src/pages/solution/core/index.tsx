import React, { useEffect } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import { HeroSection } from "./_sections/Hero";
import { StatBandSection } from "./_sections/StatBand";
import { PillarsSection } from "./_sections/Pillars";
import { JourneySection } from "./_sections/Journey";
import { DataTabsSection } from "./_sections/DataTabs";
import { SupportSection } from "./_sections/Support";
import { VideoBandSection } from "./_sections/VideoBand";
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
          <div className="xl-container">
            <hr className="ss-line" />
          </div>
          <PillarsSection />
          <div className="xl-container">
            <hr className="ss-line" />
          </div>
          <JourneySection />
          <div className="xl-container">
            <hr className="ss-line" />
          </div>
          <DataTabsSection />
          <div className="xl-container">
            <hr className="ss-line" />
          </div>
          <SupportSection />
          <VideoBandSection />
          <RoiSection />
          <FinalCtaSection />
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default SolutionCorePage;

const CORE_TITLE = "Core Hub | PHIL";
const CORE_DESC =
  "PHIL combines a flexible digital hub, integrated pharmacy network, and script-level data to maximize patient access, adherence, and brand performance.";
const CORE_URL = "https://phil.us/solution/core/";
const CORE_OG_IMAGE = getOgImage(null);
const CORE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": CORE_URL,
  url: CORE_URL,
  name: CORE_TITLE,
  description: CORE_DESC,
  image: CORE_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{CORE_TITLE}</title>
    <meta name="description" content={CORE_DESC} />
    <link rel="canonical" href={CORE_URL} />
    <meta property="og:title" content={CORE_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={CORE_DESC} />
    <meta property="og:image" content={CORE_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={CORE_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={CORE_TITLE} />
    <meta name="twitter:description" content={CORE_DESC} />
    <meta name="twitter:image" content={CORE_OG_IMAGE} />
    <script type="application/ld+json">{CORE_SCHEMA}</script>
  </>
);
