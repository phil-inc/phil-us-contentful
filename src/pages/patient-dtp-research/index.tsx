import React from "react";
import type { HeadFC } from "gatsby";

import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { ResearchReportPage } from "components/ResearchReport/ResearchReportPage";
import { QuoteCarousel } from "components/ResearchReport/Quotes";
import { getOgImage } from "utils/getOgImage";
import { faqPageSchema } from "utils/seo/schema";

import allisonPhoto from "./assets/allison-bridges.webp";
import chanderPhoto from "./assets/chander-viswanathan.webp";
import deepakPhoto from "./assets/deepak-thomas.webp";
import sahilPhoto from "./assets/sahil-naik.webp";
import { CTA, FAQ_HEADING, FAQS, FINDINGS, FINDINGS_LABEL, FORM, HERO, OVERVIEW, PAGE_PATH, QUOTES, SEO, STATS } from "./_data";

const PHOTOS = { deepak: deepakPhoto, sahil: sahilPhoto, allison: allisonPhoto, chander: chanderPhoto };

const quotes = QUOTES.map(({ photoKey, ...quote }) => ({ ...quote, photo: PHOTOS[photoKey] }));

const PatientDtpResearchPage: React.FC = () => (
  <ResearchReportPage
    theme="patient"
    pageTitle="Patient DTP Research"
    hero={HERO}
    stats={STATS}
    overview={OVERVIEW}
    findingsLabel={FINDINGS_LABEL}
    findings={FINDINGS}
    perspective={<QuoteCarousel quotes={quotes} />}
    cta={CTA}
    faqHeading={FAQ_HEADING}
    faqs={FAQS}
    form={FORM}
  />
);

export default PatientDtpResearchPage;

const OG_IMAGE = getOgImage(null);

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={SEO.title} description={SEO.description} path={PAGE_PATH} image={OG_IMAGE} type="article" />
    {/* The design's structured data: a FAQPage built from the same questions the page shows. */}
    <JsonLd
      data={faqPageSchema({
        path: PAGE_PATH,
        name: SEO.title,
        description: SEO.description,
        image: OG_IMAGE,
        questions: FAQS.map(({ question, answer }) => ({ question, answer })),
      })}
    />
  </>
);
