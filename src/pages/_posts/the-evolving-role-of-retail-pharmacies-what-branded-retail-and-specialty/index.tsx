// Migrated from Contentful resource "the-evolving-role-of-retail-pharmacies-what-branded-retail-and-specialty" (Gatsby node db278f52-5b76-5a97-81e2-528ac59ad816) on 2026-10-13.
// Source: https://phil.us/page-data/the-evolving-role-of-retail-pharmacies-what-branded-retail-and-specialty/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogLI, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/the-evolving-role-of-retail-pharmacies-what-branded-retail-and-specialty/";
const TITLE = "The Evolving Role of Retail Pharmacies: What Branded Retail and Specialty-Lite Manufacturers Need to Know";
const DESCRIPTION = "This blog post uncovers how biopharma manufacturers should navigate the changes in the retail pharmacy landscape, including the shift to digital hubs";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>Branded retail and specialty-lite pharmaceutical manufacturers must be acutely aware of the changes occurring within the retail pharmacy channel because they directly impact access and commercialization efforts. The evolving landscape – marked by the transition of retail pharmacies into primary care providers, the reduction of chain pharmacy footprints, the rise of mail order and online pharmacies, and critical labor shortages – directly influences how branded prescription medications are distributed, accessed, and managed. The following retail pharmacy trends are strong indicators that manufacturers must consider and adopt an alternative channel strategy in 2024 and beyond.</BlogP>
    <BlogH3>{"Retail pharmacies are expanding their healthcare role  "}</BlogH3>
    <BlogP>{"In recent years, the role of brick-and-mortar retail pharmacies has been moving beyond the conventional practice of prescription dispensing. Pharmacists are now contributing to patient care through services such as immunizations, condition monitoring, and health screenings. Fueled by increased utilization during the pandemic, retail pharmacies have emerged as holistic healthcare centers, experiencing a "}<BlogA href="https://www.healthcarefinancenews.com/news/retail-clinics-seeing-utilization-soar-popularity-grow"><u>200% growth in clinic claims volumes from 2017 to 2022</u></BlogA>{". "}</BlogP>
    <BlogP>{"Consumers are increasingly drawn to this one-stop-shop concept. A 2023 J.D. Power survey revealed that "}<BlogA href="https://progressivegrocer.com/h-e-b-sams-club-again-tops-among-brick-and-mortar-retail-pharmacies-jd-power"><u>eighty-three percent of consumers</u></BlogA>{" want to receive health and wellness services at their local retail pharmacy. In response, major retail chain pharmacies like CVS, Walmart, and Walgreens are transitioning into health hubs, expanding their reach into primary care. In 2024 and beyond, a big challenge for pharmacists will be how to manage the demand of providing higher level patient care services while continuing to dispense medications. "}</BlogP>
    <BlogH3>Brick-and-mortar pharmacies continue to reduce their footprint</BlogH3>
    <BlogP>{"The U.S. pharmacy landscape is undergoing a significant transformation, with "}<BlogA href="https://www.goodrx.com/healthcare-access/research/healthcare-deserts-80-percent-of-country-lacks-adequate-healthcare-access"><u>over 40% of counties labeled as "pharmacy deserts"</u></BlogA>{" in 2021, highlighting the widespread problem of limited access to pharmacies. In recent years, numerous retail pharmacy closures have been reported, contributing to this concern. "}</BlogP>
    <BlogP>{"Despite the earlier "}<BlogA href="https://www.mckinsey.com/industries/healthcare/our-insights/meeting-changing-consumer-needs-the-us-retail-pharmacy-of-the-future"><u>consolidation wave from 2010 to 2021</u></BlogA>{" that saw CVS and Walgreens acquire nearly 5,000 pharmacy locations, there is a perceptible shift in focus more recently. The emphasis is now on improving operating margins, which has prompted large retail chains to announce plans to substantially reduce their footprint by "}<BlogA href="https://www.the-sun.com/money/7912515/cvs-walgreens-rite-aid-store-closing/"><u>permanently closing store locations</u></BlogA>{" across the country. Most recently, "}<BlogA href="https://www.retaildive.com/news/cvs-closing-pharmacies-inside-target-stores/704461/"><u>CVS announced</u></BlogA>{" it will be closing some of its pharmacies in Target stores as part of its “realignment strategy.” This approach appears to align with national chains exploring growth in healthcare services, primary care, and vaccinations.  "}</BlogP>
    <BlogH3>The revenue shift from traditional brand-name drugs to branded retail and specialty-lite therapies continues</BlogH3>
    <BlogP>{"The revenue shift from traditional brand-name drugs to specialty-lite therapies is significantly impacting retail pharmacies, reshaping their business models and strategies. "}</BlogP>
    <BlogP>{"Branded retail and specialty-lite medications, which come at a lower price point than specialty therapies, but typically still require prior authorization (PA) and high copays, are a rapidly growing segment of the market. "}</BlogP>
    <BlogP>This shift has several implications for retail pharmacies:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP><b>Revenue dynamics:</b>{" Traditional brand-name drugs, once a major source of revenue for retail pharmacies, are facing increased competition from generic alternatives and biosimilars, leading to a decline in revenue from these products. While specialty-lite therapies command higher prices, they come with operational and administrative challenges that are steering retail pharmacies toward diversifying their revenue streams. "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Operational challenges:</b>{" Branded retail and specialty-lite medications involve administrative processes, such as PAs, that require coordination with HCPs and payers. Retail pharmacies must invest in additional staff and training to manage the complexities associated with ensuring patients get insurance coverage and copay support for these medications."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Patient engagement and support:</b>{" Branded retail and specialty-lite therapies often require additional patient support due to access challenges and potential side effects, prompting retail pharmacies to adapt by providing enhanced patient education and adherence support to ensure optimal outcomes for patients."}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH3>There is an ongoing shortage of pharmacy personnel</BlogH3>
    <BlogP>{"Labor shortages are exerting a "}<BlogA href="https://healthcareready.org/alert/2023-cvs-and-walgreens-employee-strike/"><u>notable impact on retail pharmacies</u></BlogA>{", posing significant challenges to their operations. The shortage of qualified personnel, including pharmacists, pharmacy technicians, and support staff, is leading to increased workloads for existing staff, which are "}<BlogA href="https://www.washingtonpost.com/wellness/2023/03/30/pharmacy-shortages-staffing/"><u>tied to burnout, more shortages</u></BlogA>{", and disruptions in service. "}</BlogP>
    <BlogP>{"As demand for healthcare services, prescription dispensing, and patient care continues to rise, retail pharmacies are finding it increasingly challenging to adequately staff their facilities. The strain on the workforce affects various aspects of pharmacy operations, from fulfilling prescriptions and providing patient counseling to managing administrative tasks. The shortage also impedes the ability of retail pharmacies to expand service offerings or explore new avenues, creating a need for innovative solutions such as technology integration and workflow optimization to alleviate the impacts of the ongoing labor shortage. "}</BlogP>
    <BlogH3>Digital hubs with integrated pharmacy services are gaining traction</BlogH3>
    <BlogP>{"Consumers' awareness and acceptance of "}<BlogA href="/the-case-for-an-alternative-channel-strategy-in-2024-and-beyond/"><u>alternative pharmacy channels</u></BlogA>{" is growing as many choose to avoid traditional pharmacies, preferring a digital, Amazon-like experience to access their prescribed medications. This shift is consistent with the broader trend toward digital health solutions that offer convenience and a seamless experience. Consequently, digital hubs are emerging as significant players in the evolving retail pharmacy landscape, offering innovative solutions that reshape how consumers access medications. "}</BlogP>
    <BlogP>Considered disruptors in the pharmacy market, digital hubs with integrated pharmacy services operate on a technology-driven, direct-to-consumer prescription fulfillment model, enabling patients to order prescriptions and schedule home delivery through a mobile app. They also automate the benefits verification and prior authorization processes, freeing healthcare providers and retail pharmacists from this burden and enabling patients to access their prescribed medications faster and more affordably.</BlogP>
    <BlogH3>Let’s navigate these changes together</BlogH3>
    <BlogP>{"Phil is an end-to-end digital hub platform that helps retail and specialty-lite brands "}<BlogA href="/how-life-science-brands-can-successfully-navigate-retail-challenges/"><u>successfully navigate retail pharmacy challenges</u></BlogA>{", enabling them to proactively shape their commercialization approaches, ensure optimal market access, and effectively meet the needs of patients and healthcare providers. "}</BlogP>
    <BlogP>{"The PhilRx platform utilizes "}<BlogA href="/how-non-dispensing-pharmacies-can-improve-the-patient-access-journey/"><u>a non-dispense pharmacy</u></BlogA>{" that bridges our digital hub with a nationwide pharmacy network to ensure patients receive prescribed therapy quickly, conveniently, and affordably. Ready to get started? "}<BlogA href="/demo/"><u>Request a demo</u></BlogA>{" today!  "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
