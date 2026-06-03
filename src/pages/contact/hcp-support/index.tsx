import React, { useEffect } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import * as classes from "./hcp-support.module.css";

const HCP_TITLE = "Contact our HCP Support team — PHIL";
const HCP_DESC =
  "You're in the right place for support. Reach out below and our HCP support team will be in touch.";
const HCP_URL = "https://phil.us/contact/hcp-support";
const HCP_OG_IMAGE = getOgImage(null);
const HCP_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": HCP_URL,
  url: HCP_URL,
  name: HCP_TITLE,
  description: HCP_DESC,
  image: HCP_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

const PORTAL_ID = "48612742";
const FORM_ID = "7a894767-6fea-4780-83bd-489380512a48";

const HcpSupportPage = () => {
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
    <PageContext.Provider value={{ title: "HCP Support" }}>
      <Layout>
        <main className={classes.page}>
          <div className={classes.formWrap}>
            <div
              className="hs-form-frame"
              data-region="na1"
              data-form-id={FORM_ID}
              data-portal-id={PORTAL_ID}
            />
          </div>
        </main>
      </Layout>
    </PageContext.Provider>
  );
};

export default HcpSupportPage;

export const Head: HeadFC = () => (
  <>
    <title>{HCP_TITLE}</title>
    <meta name="description" content={HCP_DESC} />
    <link rel="canonical" href={HCP_URL} />
    <meta property="og:title" content={HCP_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={HCP_DESC} />
    <meta property="og:image" content={HCP_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={HCP_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={HCP_TITLE} />
    <meta name="twitter:description" content={HCP_DESC} />
    <meta name="twitter:image" content={HCP_OG_IMAGE} />
    <script type="application/ld+json">{HCP_SCHEMA}</script>
  </>
);
