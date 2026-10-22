// Migrated from Contentful resource "prior-authorizations-what-pharmaceutical-manufacturers-need-to-know" (Gatsby node ff1a5c50-2f25-533c-9813-c483ad945663) on 2026-10-13.
// Source: https://phil.us/page-data/prior-authorizations-what-pharmaceutical-manufacturers-need-to-know/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogLI, BlogOL, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/prior-authorizations-what-pharmaceutical-manufacturers-need-to-know/";
const TITLE = "Prior Authorizations: What Pharmaceutical Manufacturers Need to Know";
const DESCRIPTION = "Prior authorizations: What pharmaceutical manufacturers need to know";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>As healthcare costs have escalated over the last several decades, public and private medical insurers have introduced different utilization management (UM) strategies to control healthcare expenditures. The proliferation of higher-cost specialty medications has accelerated the use of drug UM tools to control access, with prior authorization (PA) being the most common today.</BlogP>
    <BlogP>{"From the "}<BlogA href="https://www.ahip.org/documents/Prior_Authorization_Survey_Infographic.pdf">payer's perspective</BlogA>{", PAs are necessary to improve quality of care and protect patients’ safety. Conversely, "}<BlogA href="https://www.ama-assn.org/system/files/prior-authorization-survey.pdf">healthcare providers report</BlogA>{" that the PA process often leads to delays in care which can cause patients to abandon their treatment and lead to adverse events."}</BlogP>
    <BlogP>{"While there may be a patient-centric intent to the PA process, all too often, it creates an operational burden for providers, impairs patient experience, and negatively impacts health outcomes, ultimately increasing costs for all stakeholders. These issues have led to "}<BlogA href="/resources/?type=blog">calls for PA</BlogA>{" "}<BlogA href="/resources/?type=blog">reform</BlogA>. For pharmaceutical manufacturers, it's crucial to grasp how PAs affect patients’ access to their brands and what they can do to reduce friction in the process to ensure brand success.</BlogP>
    <BlogH2>Understanding the PA process</BlogH2>
    <BlogP>Prior authorization refers to a payer’s requirement for providers to establish the patient’s eligibility and obtain treatment approval to qualify for payment. This process allows the health plan to evaluate whether the prescribed therapy is medically necessary and meets coverage requirements. Standards for this review are often developed by the insurers themselves, presumably based on medical guidelines and cost and utilization factors. In general, the PA process involves the following steps:</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogP>Healthcare provider determines a patient needs a specific medication and writes a prescription.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>The provider checks the patient’s health plan formulary to see if a PA is required.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>If the provider’s office confirms that a PA is required, they need to:</BlogP>
        <BlogOL>
          <BlogLI>
            <BlogP>Obtain the insurance company’s PA form</BlogP>
          </BlogLI>
          <BlogLI>
            <BlogP>Complete all requested clinical and administrative information, including specifics relating to each CPT code that is applicable to the prescribed treatment</BlogP>
          </BlogLI>
          <BlogLI>
            <BlogP>Submit the form to the health plan</BlogP>
          </BlogLI>
          <BlogLI>
            <BlogP>Follow up with the insurance company until there is resolution of the PA request — an approval or denial.</BlogP>
          </BlogLI>
        </BlogOL>
      </BlogLI>
      <BlogLI>
        <BlogP>If a provider sends a prescription to the patient’s pharmacy without knowing a PA is required, the pharmacy contacts the provider to obtain the needed information.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>When the PA request is approved, the pharmacy dispenses the covered medication to the patient.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>If a PA request is denied, providers and patients have the option to appeal – by law, all health plans must have an appeal process in place.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>In many cases, a denial is due to incomplete information, and the PA is approved when submission errors are remediated.</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogP>This complicated process is prone to error, not to mention frustration for providers and their patients, and generally takes a significant period of time, especially when conducted through outdated forms of communication, such as faxing and telephone calls, which all too often it is.</BlogP>
    <BlogH2>Challenges with PAs</BlogH2>
    <BlogP>{"In a "}<BlogA href="https://delbene.house.gov/news/documentsingle.aspx?DocumentID=2809">2021 press release</BlogA>, Susan Bailey, President of the American Medical Association (AMA), noted that "prior authorization remains a major obstacle to achieving optimal patient care." At the heart of the problem is the PA process's burden on physicians and the delays in care it causes for patients. The biggest challenges include:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP><b>Changing payer rules</b>{": Each insurance company has its own coverage criteria, and those criteria may differ between plans within a specific payer. The coverage rules also change at various times, so a provider's administrative staff could reference outdated criteria. To make matters worse, "}<BlogA href="https://www.ama-assn.org/system/files/prior-authorization-survey.pdf">74% of physicians find that PA criteria</BlogA>{" are only sometimes, rarely, or never based on evidence-based guidelines from national medical specialty societies."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Lack of transparency</b>{": A lack of clarity around the required documentation to obtain authorization leads to a time-consuming process that frustrates providers and patients and ultimately delays care. In fact, "}<BlogA href="https://www.ama-assn.org/system/files/prior-authorization-reform-progress-update.pdf">most physicians struggle to determine</BlogA>{" whether a prescription medication even requires PA."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Use of multiple UM tools:</b>{" It's common for insurers to piggyback "}<BlogA href="/market-access-strategy-drug-formulary/">other drug UM</BlogA>{" "}<BlogA href="/market-access-strategy-drug-formulary/">tools</BlogA>{" onto the PA requirements, creating additional barriers to coverage. One example is step-therapy, also known as \"fail-first,\" which requires patients to try and fail on one or more lower-cost drugs before obtaining coverage for the initially prescribed therapy. This requirement can delay proper treatment by weeks or months and has proven "}<BlogA href="https://www.medscape.com/viewarticle/948220">more</BlogA>{" "}<BlogA href="https://www.medscape.com/viewarticle/948220">expensive</BlogA>. Other commonly used tools include quantity limits, mandatory generic substitution, and tiered pharmacy benefit design.</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"PAs aren't going away any time soon – their use as a cost-control tactic continues to expand. Today, even generics are susceptible to authorization, and pharmacy benefits management (PBM) organizations anticipate using price negotiations and UM tools to reduce spending by consumers and plan sponsors by "}<BlogA href="https://www.researchandmarkets.com/reports/5591819/pharmacy-benefit-management-market-in-the-us">more than $1 trillion through 2029</BlogA>{". Time-consuming PA processes can result in high rates of medication nonadherence, hurting patient outcomes and, ultimately, "}<BlogA href="/developing-a-distribution-strategy-that-optimizes-gross-to-net/">manufacturers' gross to net</BlogA>.</BlogP>
    <BlogH2>Improve patient access to your brand by reducing PA friction</BlogH2>
    <BlogP>{"The market access role of payers translates to substantial impacts on treatment decisions. When you consider that healthcare industry stakeholders incur "}<BlogA href="https://www.healthaffairs.org/doi/10.1377/hlthaff.2021.00036">annual costs of $93.3 billion</BlogA>{" just navigating drug UM, it’s clear that pharmaceutical manufacturers should make every effort to reduce friction in obtaining PAs for their brands. An effective PA strategy includes the following:"}</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogP><br /><BlogA href="/how-pharmaceutical-manufacturers-can-leverage-phils-technology-to-improve/">Leveraging technology and automation to accelerate the PA process</BlogA><br /></BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Building solid relationships with healthcare providers and payers</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Educating healthcare providers on the PA process</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><br /><BlogA href="/8-metrics-that-matter-when-it-comes-to-measuring-your-patient-access-program/">Monitoring and analyzing PA data</BlogA>{" "}</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogP><br /><BlogA href="https://info.phil.us/navigating-prior-authorization?_gl=1*1pvwmi1*_ga*OTY5NDg4MTE5LjE2Njg2MzY3MjU.*_ga_0D2JJPD1QY*MTY4MjQ0OTkyOS44MC4xLjE2ODI0NTAzMzYuNTkuMC4w">Download our guide</BlogA>{" for life sciences companies for a more in-depth look at navigating PAs successfully."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
