// Migrated from Contentful resource "transforming-the-prior-authorization-process-how-feedback-loops-can-improve" (Gatsby node b6486d29-a7e5-59c1-90b7-c64f28f6ee86) on 2026-10-13.
// Source: https://phil.us/page-data/transforming-the-prior-authorization-process-how-feedback-loops-can-improve/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogLI, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/transforming-the-prior-authorization-process-how-feedback-loops-can-improve/";
const TITLE = "Transforming the Prior Authorization Process: How Feedback Loops can Improve Patient Access to Life Sciences Brands";
const DESCRIPTION = "By implementing a prior authorization strategy that uses a feedback loop, pharmaceutical manufacturers can accelerate time-to-therapy.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{"The use of prior authorization (PA) to control the utilization of prescription drugs, especially specialty medications, is growing, with "}<BlogA href="https://www.mgma.com/data/data-stories/virtually-all-medical-groups-say-payer-prior-autho">79% of medical practices</BlogA>{" reporting that PA requirements increased between 2021 and 2022. By design, the "}<BlogA href="/prior-authorizations-what-pharmaceutical-manufacturers-need-to-know/">PA process</BlogA>{" is a barrier to medication access – it can leave patients waiting for days, weeks, or even months for approval, and coverage denial may occur despite a therapy being appropriately prescribed. The negative consequences of delaying treatment are well documented, yet more than "}<BlogA href="/pdf/CoverMyMeds_2022MedicationAccess_DataGuide_1_.pdf">8 out of 10 patients</BlogA>{" still experience delays accessing their medications for reasons such as cost and insurance challenges. By implementing a PA strategy that integrates a feedback loop, life sciences manufacturers can improve the overall PA process for key stakeholders – ultimately accelerating time-to-therapy while increasing covered dispenses and gross to net (GTN) for their brand."}</BlogP>
    <BlogH2>The critical role of data in the PA process</BlogH2>
    <BlogP>Data gleaned from the PA process, when analyzed appropriately can help pharmaceutical manufacturers improve access to branded medications and improve patient health outcomes. By tracking and analyzing this data, manufacturers gain insights into the utilization of their medications, payer reasons for denials or delays, how patients and prescribers respond to delays (i.e., prescription abandonment or writing a script for a different medication), and the impact of out-of-pocket costs and reimbursements.</BlogP>
    <BlogP>Pharmaceutical manufacturers can obtain a clearer picture of the PA process for their brands by leveraging a variety of data sources:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP><b>Prior authorization forms</b>{" provide information about the patient and the reasons for the request."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Electronic health records</b>{" (EHRs) and e-prescribing systems may give insights into the prescribing patterns of healthcare providers and the patient populations being treated with specialty therapies."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Payer claims data</b>{" provide data on the number of PA requests submitted, approval rates, coverage outcomes, and reimbursements."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Hub providers</b>{" can offer information on script quality, patient adherence rates, and barriers to access."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Field sales CRM</b>{" systems provide data around the engagement levels with providers who are submitting PA requests, regional variances in PA activity, and how these factors impact sales performance."}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"With a "}<BlogA href="/leveraging-data-analytics/">data-driven approach</BlogA>, commercialization teams can develop a comprehensive understanding of the PA process for their brands and can make more informed decisions on how to improve PA outcomes. Ultimately, manufacturers should look for a partner that brings together data from disparate sources to make it more accessible and actionable to improve overall brand outcomes. Brands that look to integrate data from a variety of divers providers will struggle to develop quality insights and make responsive changes in real time to drive growth.</BlogP>
    <BlogH2>Using a feedback loop to enhance the PA process</BlogH2>
    <BlogP>A feedback loop uses data output from a specific process to inform or adjust the execution of that process to reach a desired outcome or standard. Pharmaceutical manufacturers can apply the concept of a feedback loop to improve patient access to their brands by continuously using metrics to measure and analyze PA data across the patient journey at the territory level – from prescription to pharmacy dispense – and then using this data to adjust their approach to PAs. Examples of adjustments could include:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Educating prescribers on the importance of script quality and sending the right info like tried and fail information to pharmacies or hub providers</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogUL>
      <BlogLI>
        <BlogP>Communicating payer utilization management requirements to HCPs offices to reduce obstacles in the process and improve speed to therapy</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogUL>
      <BlogLI>
        <BlogP>Differentiating dispense workflows at the payer level to tailor the patient access experience and facilitate higher pull through</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogUL>
      <BlogLI>
        <BlogP>Identifying bottlenecks in real time to close gaps and submit outstanding PAs</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"Brand teams can then measure the impact of each adjustment on their "}<BlogA href="/8-metrics-that-matter-when-it-comes-to-measuring-your-patient-access-program/">defined metrics</BlogA>{" to determine if further changes are needed. Only by taking an approach that prioritizes data driven optimization will brands be able to unlock patient access at scale."}</BlogP>
    <BlogP><br /><BlogA href="https://info.phil.us/modernizing-the-hub-journey?_gl=1*gjsdwx*_ga*OTY5NDg4MTE5LjE2Njg2MzY3MjU.*_ga_0D2JJPD1QY*MTY4MjUzMzkyNS44MS4xLjE2ODI1MzU2NDEuNDUuMC4w"><b><i>Read this case study</i></b></BlogA><b><i>{" to discover how an immunology therapy brand successfully integrated a PA feedback loop to overcome utilization management bottlenecks."}</i></b></BlogP>
    <BlogH2>Transform your brand’s PA process with Phil</BlogH2>
    <BlogP>Unlocking the power of PA data should be at the forefront of every life science commercialization team’s effort to align brand goals with patient access. While a data-driven feedback loop can help companies quickly respond and adapt to patient access roadblocks, many teams find that getting a comprehensive – and timely – view of the PA process is a significant challenge.</BlogP>
    <BlogP>{"Phil is an end-to-end digital hub partner that provides an integrated approach to data analytics across the patient journey giving life science commercialization teams real-time visibility and control over their distribution channels. "}<BlogA href="/pharma/">Get in touch today</BlogA>{" to discover how to leverage Phil’s data-driven software to transform your PA process and reach brand goals."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
