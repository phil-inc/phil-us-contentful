// Migrated from Contentful resource "hubs-digital-pharmacies-and-specialty-pharmacies-what-pharma-access-teams" (Gatsby node c3d4d4cc-0ea3-52d3-9a65-80434e04fb87) on 2026-10-13.
// Source: https://phil.us/page-data/hubs-digital-pharmacies-and-specialty-pharmacies-what-pharma-access-teams/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogHR, BlogLI, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/hubs-digital-pharmacies-and-specialty-pharmacies-what-pharma-access-teams/";
const TITLE = "Hubs, Digital Pharmacies, and Specialty Pharmacies: What Pharma Access Teams Should Know";
const DESCRIPTION = "The evolution of healthcare consumer expectations and proliferation of expensive specialty and specialty-lite therapies have led to the rise of innovative solutions to clear an often onerous path to prescribed treatment. In 2022, specialty drugs accounted for 55% of the net spending in the pharmaceutical market, up from 28% in 2011. And an estimated 3 out of 4 patients who try to fill a new prescription for a recently launched brand are unsuccessful due to payer controls";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{"The evolution of healthcare consumer expectations and proliferation of expensive specialty and specialty-lite therapies have led to the rise of innovative solutions to clear an often onerous path to prescribed treatment. In 2022, specialty drugs accounted for "}<BlogA href="https://www.iqvia.com/locations/united-states/blogs/2023/07/insights-into-the-2023-us-pharmaceutical-market">55% of the net spending</BlogA>{" in the pharmaceutical market, up from 28% in 2011. And an "}<BlogA href="https://www.managedhealthcareexecutive.com/view/specialty-pharmacy-controls-limit-patient-access-fein-and-long-explain">estimated 3 out of 4 patients</BlogA>{" who try to fill a new prescription for a recently launched brand are unsuccessful due to payer controls. "}</BlogP>
    <BlogP>Hub services, specialty pharmacies, and digital pharmacies have emerged to fill gaps in the patient access journey and are now standard fixtures in the complex pharmaceutical supply chain. The three are often confused because of their developing roles and overlapping functions. However, there are distinct differences, which life science manufacturers should be aware of as they build access strategies for their specialty and specialty-lite brands.</BlogP>
    <BlogH2>What is a hub?</BlogH2>
    <BlogP>{"The "}<BlogA href="https://www.ncpdp.org/">National Council for Prescription Drug Programs</BlogA>{" (NCPDP) defines hub services – also called Patient Services or Patient Services Support – as “manufacturer-sponsored programs that assist patients and prescribers in the areas of access, affordability and adherence services providing efficient distribution of medication improving patient compliance.”"}</BlogP>
    <BlogP>Pharmaceutical hub designs can be complex, and there really is no one-size-fits-all solution. Hub services may include distribution support, benefits investigation and verification, prior authorization assistance, financial assistance program management, patient education and adherence support, pharmacy dispensing support, data reporting, and more. In addition to creating support services in-house, pharmaceutical manufacturers can obtain hub services through a third-party vendor or choose a hybrid approach.</BlogP>
    <BlogP>{"Initially, call-center-based hubs were built around high-priced, highly complex specialty medications that treated smaller patient populations and required high-touch patient support services. While these "}<BlogA href="/are-traditional-hub-providers-keeping-pace-with-todays-consumers-and/">“traditional” hub models</BlogA>{" are expensive, cumbersome, difficult to customize, and may be overkill for some therapies, a "}<BlogA href="https://heliogrp.com/surveys">2022 survey of life sciences companies</BlogA>{" found that most still invest in this type of hub."}</BlogP>
    <BlogP>A newer tier of prescription drugs, called “specialty lite,” does not need the same level of one-on-one patient support and has a lower price point than specialty therapies. However, most patients still experience significant insurance hurdles when accessing these treatments. Technology-enabled hub platforms have emerged to streamline patient access, modernize the support experience, and enable manufacturers to leverage data and analytics to improve these services.</BlogP>
    <BlogH2>What is a digital pharmacy?</BlogH2>
    <BlogP>{"Difficulties accessing a brick-and-mortar pharmacy are a "}<BlogA href="/how-manufacturers-can-improve-speed-to-therapy-overcoming-common-causes-of/">common cause of prescription delays</BlogA>{". With over 40% of U.S. counties "}<BlogA href="https://www.goodrx.com/healthcare-access/research/healthcare-deserts-80-percent-of-country-lacks-adequate-healthcare-access">considered “pharmacy deserts”</BlogA>{" as of 2021 and "}<BlogA href="https://www.the-sun.com/money/7912515/cvs-walgreens-rite-aid-store-closing/">reports of numerous retail pharmacy closures</BlogA>{" in recent years, many patients – especially those with mobility issues – are at risk of experiencing delays filling their prescriptions due to difficulties getting to a pharmacy. Additionally, many consumers today want to eschew traditional pharmacies, preferring a digital, Amazon-like experience to access their prescribed medications."}</BlogP>
    <BlogP>Digital pharmacies, also called online pharmacies, fill these patient access gaps. Considered disruptors in the pharmacy market, digital pharmacies operate on a technology-driven, direct-to-consumer prescription fulfillment model, enabling patients to order prescriptions and schedule home delivery through a mobile app.</BlogP>
    <BlogP>These new entrants to the pharmaceutical landscape deliver the convenience, access, price transparency, and privacy patients seek. However, there is the drawback of a lack of counseling support provided by pharmacists at the point of dispensing, which can be a problem for the proper usage and adherence to a prescribed medication.</BlogP>
    <BlogH2>What is a specialty pharmacy?</BlogH2>
    <BlogP>Specialty pharmacies focus on dispensing medications for complex, chronic, or rare conditions, including advanced therapies involving intricate administration and ongoing monitoring. Key aspects of their role include:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Educating patients to help them understand how to take their medications properly, including dosage, administration techniques, potential side effects, and how to manage them</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Collaborating with healthcare providers to monitor patient progress, which can involve regular check-ins, tracking of lab results, and assessing the patient's overall health condition</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Helping patients navigate the complexities of insurance coverage, such as processing prior authorizations and accessing manufacturer-sponsored copay support programs</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Offering adherence management support, such as refill reminders, counseling, and follow-up calls</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"Specialty pharmacy is a rapidly expanding sector of the market – growing "}<BlogA href="https://insights.covermymeds.com/healthcare-industry/specialty-therapy/asembia-2022-the-changing-dynamics-of-specialty-pharmacy">315% between 2015 and 2021</BlogA>{". Notably, PBM-owned specialty pharmacies represent about 75% of the total market in dispensing and revenues. Most specialty pharmacies are part of limited networks designed\r by PBMs, which gives payers more economic control over prescription fulfillment and can adversely affect the level of coverage a brand can expect."}</BlogP>
    <BlogH2>Is Phil a pharmacy or a hub?</BlogH2>
    <BlogP>{"Neither! While Phil works with pharmacies to help brands "}<BlogA href="/how-life-science-brands-can-successfully-navigate-retail-challenges/">navigate retail challenges</BlogA>{" and provides hub services to enhance and streamline patient access, our innovative solution does much more."}</BlogP>
    <BlogP>PhilRx is a scalable, end-to-end commercialization platform that helps specialty-lite brands protect their gross-to-net margins while facilitating access, unlocking coverage, and maximizing reimbursement. Our manufacturer partners have access to an integrated, nationwide pharmacy network that helps patients receive prescribed therapy quickly, conveniently, and affordably. A consultative approach guided by real-time insights provides strategic visibility across the prescription journey.</BlogP>
    <BlogP>{"Learn how to position your brand for long-term growth "}<BlogA href="/optimizing-patient-access-for-sustainable-growth/">by downloading this playbook for life sciences manufacturers</BlogA>.</BlogP>
    <BlogHR />
    <BlogP>{"Want to learn more about how to position your brand for long-term growth? "}<BlogA href="/optimizing-patient-access-for-sustainable-growth/"><u>Download our playbook for life sciences manufacturers</u></BlogA>{": “Optimizing Patient Access for Sustainable Growth.” "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
