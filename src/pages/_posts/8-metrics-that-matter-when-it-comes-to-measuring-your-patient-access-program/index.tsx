// Migrated from Contentful resource "8-metrics-that-matter-when-it-comes-to-measuring-your-patient-access-program" (Gatsby node e501f2fb-18dd-5172-91cd-958e389c55fa) on 2026-10-13.
// Source: https://phil.us/page-data/8-metrics-that-matter-when-it-comes-to-measuring-your-patient-access-program/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogH3, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/8-metrics-that-matter-when-it-comes-to-measuring-your-patient-access-program/";
const TITLE = "8 Metrics that Matter When it Comes to Measuring Your Patient Access Program";
const DESCRIPTION = "Tracking these eight metrics to evaluate patient access and support programs can help pharma manufacturers develop more effective adherence strategies.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{"For life science companies, patient support services have become as vital to a brand’s success as efficacy and price. A patient support services program has the potential to help "}<BlogA href="/3-ways-to-breakthrough-barriers-to-medication/">break through barriers to medication access</BlogA>. That’s why it’s crucial to make sure it aligns with your business goals and delivers on your brand objectives while helping patients access their therapy as easily as possible. The only way to evaluate this is by examining the right metrics.</BlogP>
    <BlogP>{"Each touchpoint along the patient's journey can influence the likelihood of prescription\nabandonment, time to therapy initiation, and adherence to therapy. With more "}<BlogA href="https://www.accenture.com/us-en/blogs/life-sciences/patient-centricity-matters">than $300B in estimated treatment value lost due to medication non-adherence</BlogA>, investing in services to help patients comply with their prescribed treatment is well worth the investment. Tracking specific key performance indicators (KPIs) for patient access and support programs can help drug manufacturers evaluate their return on investment and develop more effective adherence strategies.</BlogP>
    <BlogH2>How well is your patient access and support program performing?</BlogH2>
    <BlogP>{"If your commercialization team doesn’t know the answer to that question, it’s time to identify KPIs that will help you determine where your program stands. Metrics bring visibility into the patient journey and help pharmaceutical manufacturers measure the impact of their patient support program and "}<BlogA href="/three-ways-healthcare-technology-is-improving-medication-adherence/">advance medication adherence with data-driven interventions</BlogA>.</BlogP>
    <BlogP>Here are eight KPIs that hold valuable patient access insights for pharmaceutical manufacturers:</BlogP>
    <BlogH3>1. New scripts</BlogH3>
    <BlogP>{"Getting a prescription is the first step in the patient access journey. At the very least,\nproviders need to know your brand exists, its clinical profile, and which patients are the\nright fit for your therapy. Tracking new scripts gives manufacturers an idea of the\neffectiveness of their sales and marketing efforts; additionally, it is a key measure that\ncan be utilized to determine if your team is getting the message across about specific\naccess channels that you are looking to support."}</BlogP>
    <BlogH3>2. Enrollments</BlogH3>
    <BlogP>A common struggle pharmaceutical manufacturers face with their access programs is getting patients to join them. Once a program is launched, tracking the number of enrollments is a crucial indicator for evaluating its potential impact on new patient starts, access, and medication adherence. In addition to evaluating the number of patients that enroll, it’s important to look at how quickly they sign up after their provider prescribes the treatment, which channels they opt into, and which enrollment channels perform best for recruitment.</BlogP>
    <BlogH3>3. Engagement</BlogH3>
    <BlogP>{"After enrollment, it’s important to assess members’ levels of engagement with the\nprogram. A successful program translates to long-term medication adherence and sales\ngrowth, so metrics that show how long patients stay engaged with the program and the\npatient drop-off rate will give the medication access team a better picture of engagement over time and if that corresponds to improved time on therapy. "}<b>Discover how to improve patient engagement by downloading our guide, “</b><BlogA href="https://info.phil.us/modernize-the-patient-access-experience-transform-your-pharmaceutical-brand"><b>Modernize the Patient Access Experience. Transform Your Pharmaceutical Brand.</b></BlogA><b>”</b></BlogP>
    <BlogH3>4. Time to fill</BlogH3>
    <BlogP>{"Drug utilization measures, such as prior authorizations (PAs), increase the risk of prescription abandonment, treatment delays, and therapy disruption. The amount of time it takes from writing a prescription to fulfillment at the pharmacy – also known as speed-to-therapy – is an indicator of how efficient the PA process is for a specialty therapy. To effectively optimize market access of their brands across the lifecycle, pharma manufacturers need to be able to track the time to fill metric and take steps to reduce the negative impacts of PAs. "}<b>Read our guide, “</b><BlogA href="https://info.phil.us/successfully-navigating-prior-authorization"><b>{"Successfully Navigating Prior\nAuthorization"}</b></BlogA><b>” to learn more.</b></BlogP>
    <BlogH3>5. Refills</BlogH3>
    <BlogP>{"Analyzing medication refill patterns can provide insight into how well a patient access program is working to keep patients adherent. Not only does nonadherence negatively impact health outcomes, but it also hurts the bottom line. One study found that medication nonadherence costs the pharma industry "}<BlogA href="https://www.fiercepharma.com/marketing/non-adherence-costs-healthcare-system-patient-outcomes-and-pharma-bottom-line">an estimated $250 billion</BlogA>{" in potential annual revenue, a 33% increase from 2012. Measuring refill rates and the gap days between refills are both KPIs that gauge medication adherence. With these metrics on hand, manufacturers can make data-informed decisions to improve adherence, creating more opportunities to "}<BlogA href="/does-your-pharmaceutical-brands-data-demonstrate-value-to-payers/">demonstrate their therapy’s value to payers</BlogA>.</BlogP>
    <BlogH3>6. Covered dispenses</BlogH3>
    <BlogP>{"Low levels of insured patients receiving prescription coverage is detrimental to brand success. That’s why it’s crucial to track the percentage of branded dispenses that are covered by an insurance plan. An effective patient access program should operate in a way that results in the highest possible coverage. "}<BlogA href="https://info.phil.us/en-us/how-did-a-womens-health-rx-increase-monthly-net-sales-by-100">Check out this case study</BlogA>{" "}<b>to see how a pharmaceutical brand unlocked coverage for 90% of their dispenses</b>.</BlogP>
    <BlogH3>7. Reimbursement rates</BlogH3>
    <BlogP>Reimbursement rates are indicative of the “quality” of the pharmacy network in terms of coverage. High reimbursement rates indicate financial alignment with dispensing pharmacies and minimize uncovered card usage. Low reimbursement is more likely to lead to prescription abandonment and overutilization of manufacturer coupons.</BlogP>
    <BlogH3>8. Coupon utilization</BlogH3>
    <BlogP>Knowing the rate of sponsored coupon redemptions can help manufacturers evaluate whether their financial support is performing as planned or being overutilized and abused. Depending on the life-cycle of the product, it may also reveal issues with the pharmacy network and higher out-of-pocket costs than are necessary.</BlogP>
    <BlogH2>What’s your brand’s untapped potential?</BlogH2>
    <BlogP>{"At every stage of your brand’s lifecycle, there is untapped potential to accelerate growth and capitalize on opportunities in the marketplace. A "}<BlogA href="https://www.forrester.com/report/InsightsDriven-Businesses-Set-The-Pace-For-Global-Growth/RES130848">Forrester report</BlogA>{" revealed that data driven companies experience an annual average growth rate of over 30%. Pharma companies that invest in capabilities to capture and analyze the best data to make informed commercialization decisions will realize better business outcomes and a competitive advantage."}</BlogP>
    <BlogP>Finding a commercialization partner to capture impactful data and then help leverage the analytics to inform efficient and effective decision-making will drive your brand's success.</BlogP>
    <BlogP>{"Phil provides an integrated approach to data analytics across the patient journey giving manufacturers real-time visibility into the patient prescription journey and control over their distribution channels. Discover how you can "}<BlogA href="/how-pharmaceutical-manufacturers-can-leverage-phils-technology-to-improve/">leverage Phil’s technology to improve patient access to your brand</BlogA>.</BlogP>
  </StaticBlogLayout>
);

export default Page;
