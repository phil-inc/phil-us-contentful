import React from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import HubSpotFormV2 from "components/common/HubspotForm/HubspotFormV2";

import * as classes from "./get-in-touch.module.css";

const GIT_TITLE = "Get in touch with PHIL";
const GIT_DESC =
  "Have a question? Fill out the form below and we'll route you to the right team.";
const GIT_URL = "https://phil.us/contact/get-in-touch";
const GIT_OG_IMAGE = getOgImage(null);
const GIT_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": GIT_URL,
  url: GIT_URL,
  name: GIT_TITLE,
  description: GIT_DESC,
  image: GIT_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

const PORTAL_ID = "20880193";
const FORM_ID = "d58c1cad-ced8-4002-9d00-ba01deada3f3";

const GetInTouchPage = () => (
  <PageContext.Provider value={{ title: "Get in Touch" }}>
    <Layout>
      <main className={classes.page}>
        <div className={classes.formWrap}>
          <HubSpotFormV2 portalId={PORTAL_ID} formId={FORM_ID} />
        </div>
      </main>
    </Layout>
  </PageContext.Provider>
);

export default GetInTouchPage;

export const Head: HeadFC = () => (
  <>
    <title>{GIT_TITLE}</title>
    <meta name="description" content={GIT_DESC} />
    <link rel="canonical" href={GIT_URL} />
    <meta property="og:title" content={GIT_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={GIT_DESC} />
    <meta property="og:image" content={GIT_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={GIT_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={GIT_TITLE} />
    <meta name="twitter:description" content={GIT_DESC} />
    <meta name="twitter:image" content={GIT_OG_IMAGE} />
    <script type="application/ld+json">{GIT_SCHEMA}</script>
  </>
);
