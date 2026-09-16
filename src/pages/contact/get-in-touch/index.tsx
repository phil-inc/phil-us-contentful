import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { getOgImage } from "utils/getOgImage";
import { webPageSchema } from "utils/seo/schema";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import HubSpotFormV2 from "components/common/HubspotForm/HubspotFormV2";

import * as classes from "./get-in-touch.module.css";

const GIT_TITLE = "Get in touch with PHIL";
const GIT_DESC =
  "Have a question? Fill out the form below and we'll route you to the right team.";
const GIT_PATH = "/contact/get-in-touch/";
const GIT_OG_IMAGE = getOgImage(null);
const GIT_SCHEMA = webPageSchema({
  path: GIT_PATH,
  name: GIT_TITLE,
  description: GIT_DESC,
  image: GIT_OG_IMAGE,
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
    <SeoMeta
      title={GIT_TITLE}
      description={GIT_DESC}
      path={GIT_PATH}
      image={GIT_OG_IMAGE}
    />
    <JsonLd data={GIT_SCHEMA} />
  </>
);
