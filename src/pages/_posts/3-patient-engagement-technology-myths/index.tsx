// Migrated from Contentful resource "3-patient-engagement-technology-myths" (Gatsby node 513dcaac-142a-5f8f-b474-ea9c5757408c) on 2026-10-13.
// Source: https://phil.us/page-data/3-patient-engagement-technology-myths/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogH3, BlogLI, BlogOL, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/3-patient-engagement-technology-myths/";
const TITLE = "3 Patient Engagement Technology Myths";
const DESCRIPTION = "Now is the time for pharma to appreciate the power of technology-driven patient engagement to build trust, a competitive advantage, and value.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{"A "}<BlogA href="https://www.bcg.com/publications/2020/what-patients-want-is-pharma-delivering">recent survey</BlogA>{" by Boston Consulting Group, exploring what patients want from pharma companies and how well companies are meeting those needs, revealed a deficiency in patient engagement. The growing demand for improved and more efficient communication between patients and healthcare entities has created an opportunity for pharmaceutical manufacturers to promote patient engagement through digital tools. However, three common myths may be holding them back."}</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogH3><b>Older adults do not prefer technology</b></BlogH3>
        <BlogP>Even though older adults stand to benefit the most from technology-driven patient engagement, pharma manufacturers are often reluctant to gear patient support platforms to older populations. Older adults are not digital natives – people who are viewed as tech-savvy because they grew up in the digital age, so there is a general assumption that this demographic does not use health technology. The reality contradicts this stereotype</BlogP>
        <BlogP>{"As of 2021, "}<BlogA href="https://www.statista.com/statistics/266587/percentage-of-internet-users-by-age-groups-in-the-us/">3 out of 4 people</BlogA>{" aged 65 and older are using the internet.  "}<BlogA href="https://ehrintelligence.com/news/adoption-of-patient-portals-growing-in-older-populations">Data from 2016</BlogA>{" showed that patients in their 60s were just as likely to register for online patient portals as younger people,  and  a "}<BlogA href="https://agsjournals.onlinelibrary.wiley.com/doi/abs/10.1111/jgs.16393">{" 2020 study"}</BlogA>{" found that people over the age of 85 had high portal use, particularly around therapy questions, medication refills, scheduling, and billing. The "}<BlogA href="https://press.aarp.org/2021-4-21-Tech-Usage-Among-Older-Adults-Skyrockets-During-Pandemic">AARP 2021 Tech Trends Report</BlogA>{" revealed that the pandemic has driven even greater digital technology adoption among seniors. "}</BlogP>
        <BlogP>{"Technology-driven patient engagement can enhance "}<BlogA href="/three-ways-healthcare-technology-is-improving-medication-adherence/">medication adherence</BlogA>{". For example, as part of a patient engagement strategy, manufacturers can provide pharmacies with "}<BlogA href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6025216/">appointment-based medication synchronization (ABMS)</BlogA>{" support that decreases medication non-adherence by more actively engaging patients in their treatment plans and simplifying pharmacy workflow.  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogH3><b>Technology will replace the human touch</b></BlogH3>
        <BlogP>{"Empathy is the foundation of patient-centered care. Many stakeholders share the concern that digital health technologies take the human connection out of the patient journey, depriving patients of empathy. "}</BlogP>
        <BlogP>{"So how can an algorithm possibly deliver empathy? It’s essential to keep in mind that "}<BlogA href="https://pxacademy.com/organizational-empathy-is-vital-to-be-patient-centric/">empathy in healthcare</BlogA>{" is inextricably linked to patient-centricity and patient experience. A well-designed patient engagement platform elevates engagement, personalizes the experience, and enables high-quality patient-centered care. In fact, The "}<BlogA href="https://www.philips.com/a-w/about/news/future-health-index/reports/2019/transforming-healthcare-experiences.html">Future Health Index 2019</BlogA>{" found that 82% of people with access to their digital health records described their personal experience of care as good, very good, or excellent, compared to 66% of those without access. "}</BlogP>
        <BlogP>{"The aim of automation shouldn’t be to replace personal engagement. It should be to bring more value to healthcare by making each patient encounter more meaningful. In pharma, a patient engagement platform can provide opportunities for improving "}<BlogA href="/3-ways-to-breakthrough-barriers-to-medication/">medication access</BlogA>{", driving medication adherence, and delivering data insights to optimize patient care and "}<BlogA href="/does-your-pharmaceutical-brands-data-demonstrate-value-to-payers/">demonstrate value</BlogA>{".  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogH3><b>Patient engagement technology is expensive</b></BlogH3>
        <BlogP>It is true that developing a technology solution from scratch is indeed an expensive undertaking. Life science companies already heavily invested in drug development may not have the resources to build and maintain digital technology, such as a patient engagement platform. There are many direct and indirect costs related to in-house software development, including:</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogUL>
      <BlogLI>
        <BlogP>Project planning, development, and management</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Infrastructure</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>User interface (U/I) and user experience (U/X) design</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Size and complexity</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Cybersecurity</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Training</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Troubleshooting and support</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Maintenance</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"However, implementing a successful patient engagement platform can be affordable. "}<BlogA href="/small-pharma-manufacturers-drug-commercialization-outsourcing/">By outsourcing</BlogA>{", pharma manufacturers can pay a fraction of the cost it takes to configure one in-house. Return on investment (ROI) should always be considered, so evaluating prospective platforms and determining the anticipated ROI is crucial. "}</BlogP>
    <BlogH2><b>The bottom line</b></BlogH2>
    <BlogP>{"The evolving healthcare landscape is altering expectations across the continuum of care. Pharma companies are struggling with how to engage patients in this complex environment, and misconceptions may be preventing them from embracing digital tools. However, it’s time to appreciate the power of technology-driven patient engagement to build trust, a competitive advantage, and value. Adopting new technologies is not something to be taken lightly. Discover how Phil’s commercialization platform improves patient experience while driving better business outcomes "}<BlogA href="https://info.phil.us/evaluating-your-hub-model">here</BlogA>.</BlogP>
  </StaticBlogLayout>
);

export default Page;
