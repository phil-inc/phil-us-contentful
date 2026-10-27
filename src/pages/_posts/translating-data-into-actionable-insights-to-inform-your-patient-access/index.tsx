// Migrated from Contentful resource "translating-data-into-actionable-insights-to-inform-your-patient-access" (Gatsby node f21c274a-033c-5966-83d9-78f18a63a0f0) on 2026-10-13.
// Source: https://phil.us/page-data/translating-data-into-actionable-insights-to-inform-your-patient-access/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogHR, BlogLI, BlogOL, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/translating-data-into-actionable-insights-to-inform-your-patient-access/";
const TITLE = "Translating Data into Actionable Insights to Inform your Patient Access Strategy";
const DESCRIPTION = "Read this blog post to learn how to invest in the right capabilities to capture, analyze, and draw insights from relevant data sources to inform your patient access strategy.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP><i>{"By Andrew Duncan, SVP of Business Operations, Pricing & Strategic Finance"}</i></BlogP>
    <BlogP>{"Pharmaceutical companies are "}<BlogA href="https://www.pharmaceutical-technology.com/data-insights/big-data-in-pharma/"><u>embracing big data initiatives</u></BlogA>{" to drive their business objectives. For brand teams, data is valuable only when they have the right data to make informed decisions that improve access to their retail and specialty-lite therapies. Life science companies that invest in capabilities to capture, strategically analyze, and draw actionable insights from the most relevant data will realize better brand outcomes.  "}</BlogP>
    <BlogH3>{"The value of complete and relevant patient access data "}</BlogH3>
    <BlogP>Many pharmaceutical brand teams are experiencing data overload and are challenged to effectively use their data to solve for patient access issues, such as:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Constructing patient support program support amounts and criteria</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Identifying HCP that could benefit from utilization management (UM) support</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Analyzing GTN leaks in the patient access chain "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Developing patient engagement strategies</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"Then there’s the problem of missing data. Brands typically primarily rely on claims data, and to a lesser extent, data from prior authorization (PA) facilitation software, which leave out any prescriptions that are not taken to the pharmacy or switched out before processing the claim. It’s not uncommon for pharmacists to switch a non DAW-1 script for a branded retail product to a generic when a product is not on formulary. Sometimes, there are also economic reasons for switching. For example, if a pharmacist knows that a particular product is often severely under-reimbursed, they may switch to a generic to avoid losing money on that script. "}</BlogP>
    <BlogP>{"As a result, the manufacturer is often in the dark about the total number of scripts written and how many patients enrolled in their hub program or “went to the pharmacy”. They’re making decisions based solely on data that doesn’t reflect true patient dispense rated, or how well healthcare providers (HCPs) are clearing utilization management hurdles - or even whether they’re "}<BlogA href="/prior-authorizations-what-pharmaceutical-manufacturers-need-to-know/"><u>submitting PAs</u></BlogA>{" at all. "}</BlogP>
    <BlogP>{"Basing decisions on incomplete information derived from a subset of patients puts brand teams at risk of moving in the wrong direction. Working with a digital hub partner to help shepherd them through the data noise and ensure they see the complete patient access picture is critical to brand success.  "}</BlogP>
    <BlogH3>{"Informing field team efforts with a data-driven approach "}</BlogH3>
    <BlogP>{"Equipping your field teams with  the right data is key to improving patient access to your brand. Data can "}<BlogA href="/leveraging-territory-performance-monitoring-to-scale-hub-performance/"><u>elucidate territory performance</u></BlogA>{" in terms of how effectively HCPs are clearing utilization management hurdles. This information allows field teams to be very targeted about who they engage with so they can be more efficient and see better results. "}</BlogP>
    <BlogP>{"For example, a field rep’s territory has an average PA submission rate of 80% for a specific brand; however, there is considerable variation across providers. Some HCPs have submission rates of 85-90% while others are 60-65%. It would make sense to target prescriber education to low submission offices, educating them on how to get their patients started on the medication as fast and affordably as possible.  "}</BlogP>
    <BlogP>{"Data can also help identify trends, such as:  "}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>{"Changes in prescribing behavior. "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>PBMs that have more hurdles to coverage than negotiated or that your rebate would imply.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Reps who are generating a higher percentage of uncovered dispenses than others. "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"These are all insights field leaders can use to pinpoint issues and address problem areas through education and support. "}</BlogP>
    <BlogH3>{"The case for boosting your data analytics capabilities "}</BlogH3>
    <BlogP>{"There are three major reasons why branded retail and specialty-lite brands need to boost their data analytics capabilities: "}</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogP>{"Data informs how to increase coverage, and more coverage translates to better patient access. It is challenging for mature brands to offer very generous uncovered programs. So, if a patient wants access to a product, "}<BlogA href="/implementing-an-effective-bridge-program-laying-the-foundation-for-covered/"><u>the straight line is through coverage</u></BlogA>{" above all else. "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"The branded retail and specialty-lite space is unique in that it faces nearly all the same types of utilization management barriers as specialty products. However, HCPs are not usually as prepared to clear these hurdles effectively and specialty pharmacies that are well-versed in clearing them are not typically engaged.  Working with a digital hub partner not only ensures that UM hurdles are understood, but the insights gleaned are funneled back to the sales team to better prepare their HCPs."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"These drugs do not typically have the wholesale acquisition cost (WAC) to support traditional patient access programs. So, finding "}<BlogA href="/is-your-patient-access-hub-a-strategic-partner/"><u>a strategic partner</u></BlogA>{" who can help clear those hurdles at a reasonable cost is critical."}</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogH3>How partnering with Phil helps brands leverage their data more effectively</BlogH3>
    <BlogP>{"First and foremost, Phil is a digital-first solution. The PhilRx Digital Hub natively captures every piece of information throughout the prescription process. We utilize a "}<BlogA href="/how-non-dispensing-pharmacies-can-improve-the-patient-access-journey/"><u>{"non-dispensing pharmacy "}</u></BlogA>to help maximize prescription coverage for patients. As the wholesaler, we purchase the product from the manufacturer and ensure that our network pharmacies maintain inventory levels to always have it in stock. We send them the scripts after a benefits investigation is run so we know whether the dispense is covered or uncovered and can ensure a smooth patient dispense experience.</BlogP>
    <BlogP>{"Phil uses every data point to design and continually refine our clients' patient access programs. Depending on the client's goals, this may include refining copay structures, targeting underperforming territories, or developing more effective payer strategies. With a hyper-targeted and data-driven approach, we help clients tailor their copay programs to ensure patients stay on therapy long enough to realize the full benefits of the medication and help determine how to balance GTN vs. total access and patient experience. "}</BlogP>
    <BlogP>Helping our clients see their patient access program as a continually evolving system rather than a copay card program with a static payment amount is critical to ensuring their program evolves along with the brand’s overarching strategy, GTN needs, and formulary coverage.</BlogP>
    <BlogHR />
    <BlogP><br /><BlogA href="/key-success-factors-to-drive-brand-excellence/"><u>Download Phil’s playbook, “Key Success Factors to Drive Brand Excellence,”</u></BlogA>{" to learn about our tailored approach to creating an optimal channel strategy for your brand. "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
