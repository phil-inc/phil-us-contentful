// Migrated from Contentful resource "prior-authorizations-impacting-therapy-delivery" (Gatsby node 4843b225-37e0-58cd-bbb6-5fcdba71f2df) on 2026-10-13.
// Source: https://phil.us/page-data/prior-authorizations-impacting-therapy-delivery/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogLI, BlogOL, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/prior-authorizations-impacting-therapy-delivery/";
const TITLE = "Prior Authorization Hurdles Don’t Discriminate By Disease";
const DESCRIPTION = "Prior authorizations are impacting therapy delivery across a spectrum of diseases and therapeutic areas and there is a universal need for a more streamlined and integrated system that ensures timely access to therapy.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP><br /><BlogA href="https://www.jacc.org/doi/pdf/10.1016/j.jaccas.2020.05.095">Experts</BlogA>{" have called for major reform to the existing prior authorization processes with "}<BlogA href="https://www.jacc.org/doi/pdf/10.1016/j.jaccas.2020.05.095">suggestions</BlogA>{" such as: "}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Streamlining of administrative steps</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Tighter turnaround times for prescription authorization</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Widespread automation and digitization of processes "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Integration of health and administrative systems</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Nationwide coverage   "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"The lack of standardization among current approval processes are resulting in treatment delays, poor patient and physician experiences, low adherence rates, script abandonment, and in many cases, increased healthcare spending as disease progression worsens. Below are some examples that illustrate the burden of prior authorizations within specific therapeutic areas. "}</BlogP>
    <BlogH2><b>Cardiology</b></BlogH2>
    <BlogP>{"The cardiovascular treatment landscape significantly expanded in 2015 with a new game-changing class of drugs, PCSK9 inhibitors, which are intended to manage cholesterol-related cardiovascular disease. PA requirements were placed on PCSK9s (alirocumab and evolocumab) due to their high cost, and PA documentation is highly variable among insurance providers. National insurance data from 2017 "}<BlogA href="https://pubmed.ncbi.nlm.nih.gov/31331186/">suggested</BlogA>{" that coverage was denied at an 80% initial rejection rate, and appeals were able to get half of these prescriptions  eventually approved, but not without heavy administrative burdens. A lack of understanding of  the value of PCSK9s for high-risk groups led to negative implications on overall patient outcomes. A  2019 model "}<BlogA href="https://www.ahajournals.org/doi/10.1161/CIRCRESAHA.118.314191">study</BlogA>{" found improved approval rates for PCSK9 inhibitors with the adoption of a standardized evaluation process, proper documentation of insurance coverage, a transition from paper to electronic formats for insurance applications and improved communication with payors in response to denials."}</BlogP>
    <BlogH2><b>Dermatology</b></BlogH2>
    <BlogP>{"For many dermatologists, prior authorizations have become a significant barrier to care with the number of dermatology drugs requiring PAs increasing and a greater variability in what documentation different insurers require for approval. Medications subject to prior authorisations include topical creams, retinoids, topical steroids, immunomodulators and biologics. Common indications affected by PAs include psoriasis, atopic dermatitis and acne. Patients with complex dermatologic conditions, often requiring off-label treatments, face particularly significant insurance barriers. One "}<BlogA href="https://www.jaad.org/article/S0190-9622(20)32296-9/fulltext#back-bib2">study</BlogA>{" found that the average time to a final PA decision was 9.4 days and medications requiring PAs had lower treatment initiation rates, while PA denials were associated with lower rates of disease improvement. "}</BlogP>
    <BlogH2><b>{"Gastroenterology "}</b></BlogH2>
    <BlogP>{"The treatment of inflammatory bowel diseases – including ulcerative colitis and Crohn’s disease – has been associated with delays in biologic therapy initiation as a direct result of denied prior authorizations. Most common biologics for both UC and Crohn’s disease include adalimumab and infliximab, among others. A recent pediatric "}<BlogA href="https://pubmed.ncbi.nlm.nih.gov/35190811/">study</BlogA>{" showed median biologic initiation time was 21 days, while PAs and complex PAs (requiring appeals, step therapy or peer-to-peer review) were associated with 10.2 day and 24.6 day increases in biologic initiation time, respectively. As a result, PA requirements and denials increased the likelihood of IBD-related healthcare utilization and a dependence on older generation therapies with side effects such as corticosteroids."}</BlogP>
    <BlogH2><b>Oncology</b></BlogH2>
    <BlogP>{"The last decade has seen considerable advancement in the oncology field with the approval of several high cost medications. As a result, PA’s have been implemented for many aspects of cancer care including infusional and oral antineoplastic agents as well as supportive care medications. Experts have "}<BlogA href="https://ascopubs.org/doi/full/10.1200/JOP.18.00428">questioned</BlogA>{" whether PA’s are effectively reducing healthcare expenditures in oncology, particularly when delays to one treatment may lead to greater spending on other treatments or hospitalizations. Prior authorizations and coverage denials/appeals appear to be draining precious hours of oncologist’s time and PAs are the main reason for delays in oncology care. While there is more of a clear rationale to require PAs for newer cutting-edge medications such as immunotherapies, payers also require PA approval for supportive care or antineoplastic medicines that are cheap, clearly fit into ASCO treatment guidelines and have been on the market for a long time. These unnecessary barriers can substantially reduce adherence rates, promote therapy abandonment and worsen outcomes for oncology patients."}</BlogP>
    <BlogH2><b>{"Pulmonology "}</b></BlogH2>
    <BlogP>{"Monoclonal antibodies (such as omalizumab, benralizumab, mepolizumab and dupilumab), have proven effective treatments for patients with severe allergic asthma. However, delays to treatment imposed by the prior authorization process has put patients at high risk of exacerbations during wait periods. One "}<BlogA href="https://pubmed.ncbi.nlm.nih.gov/33404389/">study</BlogA>{" revealed an average 44 day timeframe between prescription and first dose available for monoclonal antibody injection. This was composed of a mean 21.5 days days for insurance approval and 22.8 days for a specialty pharmacy to fill the medication. High risk patients required prednisone to reduce exacerbations while waiting for their biologic medications, which has side effects that could  have been avoided with a more abbreviated timeline to treatment."}</BlogP>
    <BlogH2><b>How does Phil’s platform help with prior authorizations burdens?</b></BlogH2>
    <BlogOL>
      <BlogLI>
        <BlogP>{"Prescribers and patients have access to an integrated digital platform "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Prescribers get alerts to log-in online for a digital PA submission "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Field reimbursement teams are able to gain visibility into PA metrics real-time</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>National pharmacy network and wholesale supply offers shorter time to therapy</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Real-time (PHI-blind) data allows manufacturers to better predict initiation, adherence and refills</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogP>{"For more information on how Phil works with manufacturers to streamline the patient access channel, visit us at "}<u>phil.us</u>.</BlogP>
    <BlogH2><b>References</b></BlogH2>
    <BlogP><b>{"Cardiology\n"}</b><BlogA href="https://pubmed.ncbi.nlm.nih.gov/31331186/">https://pubmed.ncbi.nlm.nih.gov/31331186/</BlogA>{"\n"}<BlogA href="https://www.ahajournals.org/doi/10.1161/CIRCRESAHA.118.314191">https://www.ahajournals.org/doi/10.1161/CIRCRESAHA.118.314191</BlogA>{"\n"}<b>{"Oncology\n"}</b><BlogA href="https://ascopubs.org/doi/full/10.1200/JOP.18.00428">https://ascopubs.org/doi/full/10.1200/JOP.18.00428</BlogA>{"\n"}<b>{"Pulmonology \n"}</b><BlogA href="https://pubmed.ncbi.nlm.nih.gov/33404389/">https://pubmed.ncbi.nlm.nih.gov/33404389/</BlogA>{"\n"}<b>{"Dermatology\n"}</b><BlogA href="https://www.jaad.org/article/S0190-9622(20)32296-9/fulltext#back-bib2">https://www.jaad.org/article/S0190-9622(20)32296-9/fulltext#back-bib2</BlogA>{"\n"}<b>{"Gastroenterology (IBD)\n"}</b><BlogA href="https://pubmed.ncbi.nlm.nih.gov/35190811/">https://pubmed.ncbi.nlm.nih.gov/35190811/</BlogA>{"\n"}<b>{"General\n"}</b><BlogA href="https://www.jacc.org/doi/pdf/10.1016/j.jaccas.2020.05.095">https://www.jacc.org/doi/pdf/10.1016/j.jaccas.2020.05.095</BlogA>{"\n"}<BlogA href="https://www.jfas.org/article/S1067-2516(19)30011-0/pdf">https://www.jfas.org/article/S1067-2516(19)30011-0/pdf</BlogA><br /></BlogP>
  </StaticBlogLayout>
);

export default Page;
