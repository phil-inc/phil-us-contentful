import React, { useEffect } from "react";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

const PORTAL_ID = "48612742";
const FORM_ID = "7a894767-6fea-4780-83bd-489380512a48";

const HcpSupportDemoPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://js.hsforms.net/forms/embed/${PORTAL_ID}.js`;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <PageContext.Provider value={{ title: "HCP Support Demo" }}>
      <Layout>
        <main style={{ maxWidth: 1080, margin: "0 auto", padding: "88px 64px 120px" }}>
          <h1 style={{ marginBottom: 8 }}>HCP Support — Raw HubSpot Form (Demo)</h1>
          <p style={{ marginBottom: 40, color: "#666" }}>
            Testing page. Raw iframe embed, no custom styles.
          </p>
          <div
            className="hs-form-frame"
            data-region="na1"
            data-form-id={FORM_ID}
            data-portal-id={PORTAL_ID}
          />
        </main>
      </Layout>
    </PageContext.Provider>
  );
};

export default HcpSupportDemoPage;

export const Head: HeadFC = () => (
  <>
    <title>HCP Support Demo — PHIL</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);
