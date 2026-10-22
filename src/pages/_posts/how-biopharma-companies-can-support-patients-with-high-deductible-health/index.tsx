// Migrated from Contentful resource "how-biopharma-companies-can-support-patients-with-high-deductible-health" (Gatsby node 661273a4-cfd0-52a0-a0ed-2fbac591c6ec) on 2026-10-13.
// Source: https://phil.us/page-data/how-biopharma-companies-can-support-patients-with-high-deductible-health/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogHR, BlogLI, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/how-biopharma-companies-can-support-patients-with-high-deductible-health/";
const TITLE = "How Biopharma Companies Can Support Patients with High Deductible Health Plans";
const DESCRIPTION = "In 2023, a growing number of patients are enrolled in high deductible health plans (HDHPs), which require members to pay healthcare costs out-of-pocket until they meet their annual deductible amount before the plan starts covering eligible costs. A recent analysis found that over half of American private-sector workers are now enrolled in HDHPs – a 14.5% increase from 2017. The current minimum deductible for an HDHP set by the IRS is $1,500 for an individual and $3,000 for a family";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{"In 2023, a growing number of patients are enrolled in high deductible health plans (HDHPs), which require members to pay healthcare costs out-of-pocket until they meet their annual deductible amount before the plan starts covering eligible costs. A "}<BlogA href="https://www.valuepenguin.com/high-deductible-health-plan-study">recent analysis</BlogA>{" found that over half of American private-sector workers are now enrolled in HDHPs – a 14.5% increase from 2017."}</BlogP>
    <BlogP>{"The current "}<BlogA href="https://www.shrm.org/resourcesandtools/hr-topics/benefits/pages/2023-irs-contribution-limits-for-hsas-and-high-deductibel-health-plans.aspx">minimum deductible for an HDHP set by the IRS</BlogA>{" is $1,500 for an individual and\r $3,000 for a family. With actual deductibles "}<BlogA href="https://www.kff.org/report-section/ehbs-2022-summary-of-findings/">averaging $6,013 for families</BlogA>{", it should come as no\r surprise that patients with HDHPs often face significant hardship when paying the list price for\r their medications. It’s well established that high out-of-pocket costs are leading drivers of\r prescription abandonment and non-adherence which can have significant adverse\r consequences. Case in point: patients abandoned "}<BlogA href="https://www.iqvia.com/form-pages/institute-gated?redirectUrl=%2f-%2fmedia%2fiqvia%2fpdfs%2finstitute-reports%2fthe-use-of-medicines-in-the-us-2023%2fthe-use-of-medicines-in-the-us-2023.pdf&title=The+Use+of+Medicines+in+the+US+2023">94 million prescriptions in 2022</BlogA>{" with\r increasing frequency as out-of-pocket grew."}</BlogP>
    <BlogP>{"In recent years, biopharmaceutical companies have stepped up their efforts to support patients,\r spending "}<BlogA href="https://www.iqvia.com/form-pages/institute-gated?redirectUrl=%2f-%2fmedia%2fiqvia%2fpdfs%2finstitute-reports%2fthe-use-of-medicines-in-the-us-2023%2fthe-use-of-medicines-in-the-us-2023.pdf&title=The+Use+of+Medicines+in+the+US+2023">over $80B over the last five years</BlogA>{" to help offset out-of-pocket costs for commercially\r insured patients. However, when it comes to supporting patients with HDHPs, it is not enough\r to simply have a patient support program in place – ultimately, it’s how these programs are\r designed and delivered that will make the most impact."}</BlogP>
    <BlogH3>Elevate awareness of your copay savings program</BlogH3>
    <BlogP>{"Are patients and HCPs even aware that your brand has a copay support program? Unless your\r brand team has effective initiatives to promote awareness, it’s unlikely. A "}<BlogA href="https://engage.phreesia.com/rs/867-GML-252/images/Phreesia%20Industry%20Perspectives%20Patient%20Support%20Programs.pdf">{"2021 study of more\r than 6,300 patients"}</BlogA>{" revealed that almost 3 out of 5 patients have little to no knowledge of a branded patient support programs. Another survey found that "}<BlogA href="https://www.mmm-online.com/home/channel/commercial/infographic-hcps-must-deal-with-communication-breakdown/">42% of HCPs</BlogA>{" lack a good\r understanding of pharma patient services programs."}</BlogP>
    <BlogP>{"Considering that "}<BlogA href="https://www.prnewswire.com/news-releases/consumers-in-pain-over-high-prescription-prices-ready-to-take-action-and-in-need-of-better-tools-according-to-survey-by-scripta-insights-301268409.html">almost half of patients</BlogA>{" are willing to switch to a new medication to save money\r and less than 1 out of 5 look for a coupon when they can't afford their prescription,\r manufacturers should take steps to boost awareness of their savings programs and make it easy\r for patients to enroll in them. "}<BlogA href="/not-getting-traction-with-your-patient-services-program-heres-why-and-what/">Brand and access teams can gain traction</BlogA>{" with their patient\r populations that have HDHPs by:"}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>{"Leveraging field teams to educate HCPs on the value of their patient support programs\r"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Offering real-time patient enrollment directly at the point of prescription\r"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Integrating program promotion within patient and HCP marketing assets\r"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Advertising the program within the EHR as a reminder to the physician when prescribing\r"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Utilizing a hub partner that can develop differentiated dispense workflows based on\r copay amount"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><br /><BlogA href="/optimizing-life-sciences-field-teams-in-the-era-of-drug-utilization/">Optimizing their field teams</BlogA>{" with the program-aligned incentives.\r"}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH3>Leverage data to glean insights and develop responsive business rules</BlogH3>
    <BlogP>{"Combining patient insights with business rules can help address individual patient needs while\r enabling life sciences companies to put their allotted access funding where needed most\r and "}<BlogA href="/developing-a-distribution-strategy-that-optimizes-gross-to-net/">optimize their gross-to-net</BlogA>{" (GTN). It makes sense to offer variable copay offers to align with\r insurance needs because patients with good prescription drug coverage may not have a need –\r or have a smaller need – for copay assistance."}</BlogP>
    <BlogP>{"Designing a program that puts business rules in place to vary offerings based on coverage allows\r you to effectively spread your \"bucket\" of assistance funds over more patients. So, those patients with HDHPs who need more financial assistance over a more extended time to access\r their prescribed medication and stay adherent will receive it, while patients with a smaller\r out-of-pocket obligation will receive less. This approach will also help secure the long-term\r viability of your copay assistance program.\n\r"}</BlogP>
    <BlogP><br /><BlogA href="/5-strategies-to-ensure-the-long-term-success-of-your-patient-services/"><b>Check out this infographic</b></BlogA><b>{" to discover five strategies that will ensure the long-term success of\r your patient support program."}</b></BlogP>
    <BlogH3>Provide transparency into the patient access journey</BlogH3>
    <BlogP>{"Today’s patients want to be active consumers of healthcare services but typically lack the\r transparency needed to make informed decisions. This barrier is especially true when it comes\r to affordability. "}<BlogA href="https://www.pharmavoice.com/spons/does-your-copay-program-factor-in-differences-across-specialties-goodrx-an/634099/">Recent surveys</BlogA>{" find that more than 5 out of 10 HCPs do not discuss medication\r costs with patients because they are unsure how much they will cost, and patients generally find that healthcare costs are unclear and confusing. Beyond medication affordability, the\r process for obtaining insurance approval and coverage tends to be murky at best.\n\r"}</BlogP>
    <BlogP><br /><BlogA href="/why-transparency-is-critical-in-the-patient-access-journey/">Transparency is critical</BlogA>{" to filling the information gaps that often exist across the patient access\r journey. Each touchpoint in this journey is an opportunity for pharmaceutical manufacturers to\r deliver more transparency and better support patients with HDHPs."}</BlogP>
    <BlogP>{"With tech-enabled hub services, brand teams can meet patients where they are by delivering a\r frictionless, consumer-centric experience that offers more visibility around how to access and\r afford their prescribed treatment – including what their out-of-pocket will be –eliminating the\r sticker shock that all too often leads to prescription abandonment."}</BlogP>
    <BlogH3>Unlock access for patients with HDHPs</BlogH3>
    <BlogP>{"For many life sciences companies, the upfront investment and opportunity cost relative to other\r commercial priorities often force trade-offs on program design that diminish access for a growing patient population with HDHPs. By partnering with Phil, you can eliminate this risk. The\r PhilRx platform "}<BlogA href="/setting-the-stage-for-a-successful-modern-hub-services-program/">sets the stage for a successful, modern hub services program</BlogA>{" that meets patients' individual needs by seamlessly connecting them with their prescribed therapy.\r Specialty-lite brands protect their GTN margins and unlock patient access by automating prior\r authorizations and ensuring manufacturer-driven copay coupon utilization with real-time insights across the prescription journey."}</BlogP>
    <BlogP><br /><BlogA href="https://info.phil.us/branded-retail-specialty-lite?_gl=1*19lxpmc*_ga*OTY5NDg4MTE5LjE2Njg2MzY3MjU.*_ga_0D2JJPD1QY*MTY5NDA0MTIzNS4yMDkuMS4xNjk0MDQyNjY1LjcuMC4w">Check out this resource</BlogA>{" to discover how Phil can help maximize your brand's unique value."}</BlogP>
    <BlogHR />
    <BlogP>{"Want to learn more about how to position your brand for long-term growth? "}<BlogA href="/optimizing-patient-access-for-sustainable-growth/"><u>Download our playbook for life sciences manufacturers</u></BlogA>{": “Optimizing Patient Access for Sustainable Growth.” "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
