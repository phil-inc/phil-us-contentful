// Migrated from Contentful resource "case-study-defying-the-mid-cycle-curse-for-specialty-pharma" (Gatsby node 2279d88d-3a6d-5564-9fe4-822e7a81fbb0) on 2026-10-22.
// Source: https://phil.us/page-data/case-study-defying-the-mid-cycle-curse-for-specialty-pharma/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogImage, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/case-study-defying-the-mid-cycle-curse-for-specialty-pharma/";
const TITLE = "Case Study: Defying the Mid-Cycle Curse for Specialty Pharma";
const DESCRIPTION = "Initially, only 12% of TRx were covered by payers but after implementing Phil it was able to enroll 90% of patients and scripts covered by payers increased from 12% to 55%.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>Mid-cycle specialty products often face challenges when it comes to reaching patients several years after launch.</BlogP>
    <BlogH2>Case Study: Women’s Health Product</BlogH2>
    <BlogP>{"Phil was able to assist our client with turning around a tumultuous post-approval journey. Reimbursement challenges led to poor uptake and the pharma manufacturer brought on a telemedicine company to help with the prescribing and authorization process. However, additional changes to patient eligibility criteria led to prescriber confusion, low coverage rates and limited patient access. "}</BlogP>
    <BlogH2>Before Phil</BlogH2>
    <BlogP>{"Initially, patients were offered a limited two-month free supply, but once that ended, many patients stopped therapy because they couldn’t get their medications authorized for further coverage. There were multiple reasons for this, but the main reason was that prior authorization (PA) forms were not submitted correctly or in a timely manner. There was a lack of education and training among healthcare providers on patient eligibility criteria and how to correctly submit the PAs, while the telemedicine company handling the majority of the prescriptions was taking several days to submit PAs with very little follow up. A contract with a specialty pharmacy hindered patient enrollment as patients failed to engage with automated calls to enroll. The pharmacy also had limited contracts with payers – around 60% of commercial plans, very few regional plans and no contracts with state medicaid plans.  As a result, only 12% of TRx were covered by payers despite good formulary. For a therapeutic that required long-term adherence, the average refill rate per patient was no better than 2.5 fills and the company was losing money with every script. "}</BlogP>
    <BlogP><b>The company sought help from Phil to improve its patient access and saw immediate results after adopting the platform.</b></BlogP>
    <BlogH2>The HCPs</BlogH2>
    <BlogP>{"The Phil portal was more user-friendly for physicians and healthcare providers, eliminating the need for physicians to fill in spreadsheets and reply to emails. HCPs were better educated on the process, which held them accountable to complete authorizations. After Phil’s platform was adopted, "}<b>98% of PAs were submitted on the same day</b>{". "}</BlogP>
    <BlogH2>{"The Patients "}</BlogH2>
    <BlogP>{"Patient engagement was notably improved with the help of text messages to guide the patient through every step of the process. From the seamless 1 minute onboarding to the post-dispense texts tailored to the patient’s clinical journey, Phil was able to remove most of the administrative burdens and allow for a greater focus on the promotion of therapy adherence. "}<b>Scripts covered by payers quadrupled in just 18 months – from 12% to 55% – with the refill rate adherence increasing by 45%.</b></BlogP>
    <BlogImage src="/images/blog/Scripts_covered_by.webp" alt="" width="840" height="569" />
    <BlogH2>The Coverage</BlogH2>
    <BlogP>Phil was able to enroll 90% of patients through its intuitive platform and scripts were dispensed across a large network of pharmacies that have contracts in place with 98% of all US plans, commercial, medicare and medicaid.</BlogP>
    <BlogH2>The Company</BlogH2>
    <BlogP>{"Month over month sales growth driven by Phil has meant that the company is now profitable. The sharp increase in volume and revenues has attracted additional venture funding for growth, while profits have enabled the company to invest more in a digital marketing campaign to drive profits up further. The program continues to grow at 66% CAGR more than a year after launching with Phil. For more information visit "}<BlogA href="/">phil.us</BlogA>.</BlogP>
  </StaticBlogLayout>
);

export default Page;
