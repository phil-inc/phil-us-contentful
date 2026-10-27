// Migrated from Contentful resource "how-to-choose-the-best-commercialization-partner-to-drive-patient-access" (Gatsby node 14fbe18e-28bc-59d7-8d10-1a6d9e8f8112) on 2026-10-13.
// Source: https://phil.us/page-data/how-to-choose-the-best-commercialization-partner-to-drive-patient-access/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/how-to-choose-the-best-commercialization-partner-to-drive-patient-access/";
const TITLE = "How to Choose the Best Commercialization Partner to Drive Patient Access";
const DESCRIPTION = "Is a pharmaceutical hub the best solution for commercializing your therapies? For well over a decade, pharmaceutical hub services have played a pivotal role in supporting patient access to life-saving";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogH2><b>Is a pharmaceutical hub the best solution for commercializing your therapies?</b></BlogH2>
    <BlogP>{"For well over a decade, pharmaceutical hub services have played a pivotal role in supporting patient access to life-saving and life-altering advanced drug therapies. Unfortunately, hubs tend to be a partner with low customer satisfaction rates and lower than ideal coverage and adherence. So, what is the best way to support patient access to critical therapies? "}</BlogP>
    <BlogP>{"Amid the shift to value-based care, patients’ prescription "}<BlogA href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2779442">out-of-pocket burden has increased</BlogA>{", particularly for "}<BlogA href="https://www.kff.org/medicare/issue-brief/the-out-of-pocket-cost-burden-for-specialty-drugs-in-medicare-part-d-in-2019/">specialty tier drugs</BlogA>{". Out-of-pocket cost is a big factor in prescription abandonment and medication adherence. A 2019 "}<BlogA href="https://www.kff.org/health-reform/poll-finding/kff-health-tracking-poll-february-2019-prescription-drugs/">Kaiser Family Foundation Health Tracking Poll</BlogA>{" revealed 1 in 5 patients did not fill a prescription and 3 in 10 did not take their medication as prescribed due to cost. Close to 60 percent reported they had difficulty affording $100 or more per month on prescriptions."}</BlogP>
    <BlogP>In response to market changes, hub models evolved to consist of a broad array of services that support market and patient access across prescription drug tiers. When contemplating patient access services for your brand, it’s essential to consider the value of a commercialization partner, determine what level of services will offer the best fit, and evaluate five other key factors.</BlogP>
  </StaticBlogLayout>
);

export default Page;
