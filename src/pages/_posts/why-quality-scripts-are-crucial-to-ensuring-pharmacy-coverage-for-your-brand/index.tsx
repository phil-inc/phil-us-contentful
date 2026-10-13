// Migrated from Contentful resource "why-quality-scripts-are-crucial-to-ensuring-pharmacy-coverage-for-your-brand" (Gatsby node 4703eef2-9f87-559b-9703-b0ff72b39063) on 2026-10-13.
// Source: https://phil.us/page-data/why-quality-scripts-are-crucial-to-ensuring-pharmacy-coverage-for-your-brand/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogHR, BlogLI, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/why-quality-scripts-are-crucial-to-ensuring-pharmacy-coverage-for-your-brand/";
const TITLE = "Why Quality Scripts are Crucial to Ensuring Pharmacy Coverage for Your Brand";
const DESCRIPTION = "Discover why quality script intake is the first step to a smooth HCP and patient access experience, and is crucial to ensuring your brand realizes the highest rates of adoption and coverage";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{"When prescribing a specialty or specialty-lite therapy with hub services, a healthcare provider can often jumpstart getting their patient started on the treatment by sending the script directly to the hub. However, "}<BlogA href="https://www.covermymeds.com/main/medication-access-report/specialty-patient-support/"><u>six out of ten providers report</u></BlogA>{" that they are uncertain of the insurance benefits information needed to start patients on complex therapies, and submitting the wrong information can hold up a prescription from the get-go. "}</BlogP>
    <BlogP>{"Health insurance plans typically have specific requirements that must be met before covering an expensive branded therapy. Those requirements start with the information on the script itself and include additional clinical information doctors must submit to meet utilization management requirements such as prior authorizations or step edits. Quality prescription intake is the first step to a smooth HCP and patient access experience and is crucial to ensuring your brand realizes the highest rates of adoption and coverage at the pharmacy as possible. "}</BlogP>
    <BlogH3><b>{"What exactly is a “quality script”? "}</b></BlogH3>
    <BlogP>At the most basic level, a prescription must include the following information to be considered valid for coverage of the prescribed brand:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Correct spelling of patient’s full name and date of birth</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Right medication name, strength, dosage, and route of administration information "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Instructions that comply with the drug’s approved indication</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Quantity and refills on the prescription do not exceed the plan’s quantity limits "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Specifies that medication should be “dispensed as written,” “brand name only,” or “no substitutions”</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>When prescribing through a manufacturer's hub, the script must be submitted along with the insurance company's prior authorization request, if required. Providers will need to include specific clinical information that the insurance company needs to determine eligibility for coverage, which, at the least, typically includes:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>The appropriate ICD-10 codes for the patient’s diagnosis</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Prior therapy trial information that consists of the medication, strength, dosage, trial dates, and outcomes</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"CPT codes that correspond with the desired treatment "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH3><b>4 reasons why brands should monitor script quality</b></BlogH3>
    <BlogP>{"Maximizing the number of quality scripts through the brand’s hub leads to:  "}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP><b>{"Higher rates of prescription fulfillment: "}</b>{"Missing or conflicting information will trigger a denial, which requires the provider’s office to either resubmit the prescription and PA or submit an appeal. When this happens, it’s more likely that the medication will never be dispensed due to the delay. "}<BlogA href="/the-impact-of-time-constrained-hcps-on-life-sciences-commercialization-and/"><u>Time-constrained HCPs</u></BlogA>{" may choose not to pursue an appeal, and the patient may decide to try an alternate therapy or simply abandon all together. In fact, "}<BlogA href="https://www.pocp.com/wp-content/uploads/NCPDP-AC2019-Specialty-Prescribers-Tell-All-w-ACPE-slides_FINAL_SM.pdf"><u>76 percent of physicians</u></BlogA>{" choose a different treatment when they encounter a barrier to prescribing a specialty or specialty-lite therapy therapy. \n"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>{"Improved speed to therapy: "}</b>{"More than "}<BlogA href="/pdf/CoverMyMeds_2022MedicationAccess_DataGuide_1_.pdf"><u>8 out of 10 patients</u></BlogA>{" encounter frustrating delays when trying to access the medications they need to manage their health. And having the wrong patient information on the script is a common culprit. Manufacturers can take a proactive approach by ensuring HCPs are adequately informed on insurance coverage requirements such as ICD-10 codes for their patient population.\n"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>{"Higher rates of prescription coverage: "}</b>{"High script quality correlates with coverage success for branded therapies. "}<BlogA href="https://info.phil.us/womens-health-sp-transition?_gl=1*11agc42*_ga*MTc0MDQ4MzQwNy4xNjk4NDI3MjMw*_ga_0D2JJPD1QY*MTcwMDA5MzgyNi4yNC4xLjE3MDAwOTgxMjAuNTMuMC4w"><u>Discover how one specialty brand partnered with Phil and achieved a tenfold increase in prescription coverage</u></BlogA>{" by streamlining the PA process for prescribers and leveraging territory data on HCP behavior, payer responses, and script outcomes. \n"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>{"Better HCP and patient experiences: "}</b>{"A poor prescribing experience translates to diminished brand loyalty, with the risk of losing a prescriber in the long run. A smoother prescription journey driven by a digital hub program can "}<BlogA href="/3-reasons-why-your-patient-services-program-may-be-falling-short-on/"><u>improve medication adherence</u></BlogA>{". Evidence shows that switching to electronic prescribing "}<BlogA href="https://www.cdc.gov/mmwr/volumes/66/wr/mm6645a2.htm"><u>increases first-fill adherence by 10%</u></BlogA>{" compared to traditional paper prescriptions.  "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH3><b>How to ensure high script quality for your hub program</b></BlogH3>
    <BlogP>{"Physicians report that "}<BlogA href="https://www.pocp.com/wp-content/uploads/NCPDP-AC2019-Specialty-Prescribers-Tell-All-w-ACPE-slides_FINAL_SM.pdf"><u>understanding the insurance requirements</u></BlogA>{" to get a patient started on a specialty brand is one of their most significant challenges. Field teams must be able to educate HCPs and their staff on how to properly submit scripts to the hub and address questions about insurance coverage and PA requirements so they can proactively send high quality script"}</BlogP>
    <BlogP>{"Life science companies should strive to "}<BlogA href="/optimizing-life-sciences-field-teams-in-the-era-of-drug-utilization/"><u>closely integrate field teams with their hub</u></BlogA>, educating them on available hub tools, how the hub facilitates success, how the patient support program benefits them and their customers, and how any copay or bridge programs work.</BlogP>
    <BlogP>Hubs should deliver a PA process within current HCP workflows, pre-populate required forms with clinical information when available, and monitor the prescription journey to follow up to ensure the appropriate information is included in received prescriptions.</BlogP>
    <BlogP>With PhilRx, life science brands gain greater visibility into the prescription journey and can monitor performance at the territory level to optimize script quality nationally. With the right data at hand, they can deliver the appropriate interventions to drive meaningful changes. Whether a PA has stalled due to missing data on a form or prescribers continue to exclude ICD-10 codes on their prescription to the hub, the field team can proactively assist the provider to educate them to improve patient access.</BlogP>
    <BlogHR />
    <BlogP>{"Ready to position your brand for long-term growth? "}<BlogA href="/life-sciences-hub-design/"><u>Download this playbook</u></BlogA>{" on how life science manufacturers can get the most from their hub services. "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
