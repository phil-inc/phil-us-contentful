// Migrated from Contentful resource "are-traditional-hub-providers-keeping-pace-with-todays-consumers-and" (Gatsby node 7d38a211-a788-57cf-8b7f-3d37e2f9890a) on 2026-10-13.
// Source: https://phil.us/page-data/are-traditional-hub-providers-keeping-pace-with-todays-consumers-and/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, AuthorBioP, BlogA, BlogH2, BlogLI, BlogOL, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/are-traditional-hub-providers-keeping-pace-with-todays-consumers-and/";
const TITLE = "Are Traditional Hub Providers Keeping Pace with Today’s Consumers and Providers?";
const DESCRIPTION = "With consumer demands for choice, convenience, and transparency at an all-time high, life science companies need to ensure their hub service providers aren’t stuck in the past.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

const AUTHOR = {
  name: "Rick Salazar",
  title: "VP Of Business Development, Phil",
  imageSrc: "/images/blog/1601078003282.webp",
  bio: (
    <>
      <AuthorBioP>Rick is a senior patient services and distribution leader with expertise helping patients, providers and manufacturers overcome barriers to access and and use via a technology driven platform supporting both buy and bill and pharmacy benefit drugs.</AuthorBioP>
    </>
  ),
};

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE, authorName: "Rick Salazar" })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }} author={AUTHOR}>
    <BlogP>{"The seismic changes in consumer behavior and expectations brought on by mobile devices and cloud computing seem to have happened overnight, but they’ve been years in the making. The popularity of user-friendly services offered by the likes of Amazon, Uber, and Apple Pay has driven innovation and disruption across industries. The COVID-19 pandemic further accelerated the shift to digital tools, "}<BlogA href="https://www.forbes.com/sites/coronavirusfrontlines/2022/10/12/covid-accelerated-healthcares-digital-transformation-heres-whats-next/?sh=c975d5c1ed0d">especially in healthcare</BlogA>.</BlogP>
    <BlogP>{"Most healthcare organizations have implemented secure Software-as-a-Service (SaaS)\napplications to deploy cloud-based EHRs, telehealth, and revenue cycle management. So providers are now accustomed to using these solutions to reduce administrative burden  and offer more convenience to their patients."}</BlogP>
    <BlogP>For many pharmaceutical specialty brands, hub services represent a major touchpoint with patients and healthcare providers (HCPs). With consumer demands for choice, convenience, and transparency at an all-time high, life science companies must ensure their hub providers aren’t stuck in the past.</BlogP>
    <BlogH2>What is a “traditional” hub?</BlogH2>
    <BlogP>Over the last two decades, hub services arose from the need to effectively commercialize brands in the high-growth specialty medication categories, which treat smaller patient populations and require “high-touch” patient support services.</BlogP>
    <BlogP>{"The "}<BlogA href="https://www.ncpdp.org/">National Council for Prescription Drug Programs</BlogA>{" (NCPDP) defines hub services – also called Patient Services or Patient Services Support – as “manufacturer-sponsored programs that assist patients and prescribers in the areas of access, affordability and adherence services providing efficient distribution of medication improving patient compliance.”"}</BlogP>
    <BlogP>A “traditional” hub is a comprehensive, full-service patient services model. The core of this model is the call center. A team of care coordinators, reimbursements specialists, nurses, and others works via telephone to enroll patients, perform benefit investigations, obtain prior authorizations, and support patients with therapy administration and adherence.</BlogP>
    <BlogP>{"Even though the traditional hub model is expensive, cumbersome, difficult to customize, and may be overkill for some therapies, a "}<BlogA href="https://www.heliohealthgroup.com/surveys">2021 survey of life sciences companies</BlogA>{" found that most still rely on traditional hubs:"}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>89% utilize a call center as part of their patient services team</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>91% outsource their nurse/clinical educator team to a hub</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>71% use a hub for reimbursement support</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH2>Most hub services are misaligned with consumer and provider needs</BlogH2>
    <BlogP>While a hub can be a great tool to positively impact the patient journey, it can also be a costly endeavor that results in a poor return on investment – particularly if it’s not aligned with consumer and HCP preferences.</BlogP>
    <BlogP>{"Hub service providers can play an integral role in the commercialization of specialty drugs; however, those that fall under the “traditional” model may not be keeping pace with consumer and HCP demands. Responses from a "}<BlogA href="https://dt-consulting.com/the-state-of-customer-experience-in-pharma-patient-interactions/">recent survey</BlogA>{" found that patients had similar “pharma” experience expectations across various disease areas, characterized as personal, trustworthy, accurate, and simple."}</BlogP>
    <BlogP>The results also revealed that:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Services that patients need the most – patient support enrollment, patient support services, medication reminders, checking the status of treatment, and resources to manage health – all rated poorly</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Patients who have a poor experience are twice as likely to search for a new treatment option</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Patients who have great experiences are three times as likely to enroll in a program or service</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH2>The 3 questions you should be asking</BlogH2>
    <BlogP>Offering patient access and support services is the most tangible way for life sciences companies to connect and engage with patients. Accordingly, consumer experience can be a significant differentiator for specialty brands today.</BlogP>
    <BlogP>{"Before product launch and "}<BlogA href="/pharma-product-mid-life-cycle-risk/">throughout the product life cycle</BlogA>, commercial teams should be asking the following three questions to determine if potential hub providers are delivering a modern, consumer-centered experience that can help them meet their objectives:</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogP><b>How well does the prescribing process integrate into HCP workflows?</b>{"\nPrescribing your brand should be as easy for the provider as writing for a generic.\nHowever, specialty therapies present challenges. A "}<BlogA href="/pdf/CMM_36666_PatientSupportReport_ExecutiveSummary_Digital.pdf">2020 survey</BlogA>{" found that 80% of providers have trouble starting patients on specialty therapies and 75% spend at least one hour per patient per week completing the work required to initiate treatment.\n\nIt’s crucial to ensure that providers can stay within their EHR using an easy-to-use technology interface that streamlines the prior authorization (PA) process, minimizes administrative burden, and helps them better serve their patients. A better prescriber experience will translate to a higher adoption rate and a better consumer experience.\n"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Do they deliver a seamless and personalized experience for patients?</b>{"\nThe delivery experience of patient support should be a frictionless, consumer-centric digital experience like other industries. That’s often not the case – "}<BlogA href="https://www.redpointglobal.com/blog/healthcare-consumers-weigh-in-personalized-experiences-are-a-deal-breaker/">{"57% of healthcare\nconsumers"}</BlogA>{" think retailers or financial services are better at providing personalized omnichannel experiences.\n\nLook for easy-to-use digital tools, tailored content delivery, and two-way communications based on each patient’s healthcare needs and preferences. A frictionless patient experience leads to better enrollment rates and "}<BlogA href="/three-ways-healthcare-technology-is-improving-medication-adherence/">medication adherence</BlogA>{".\n"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Are patients (and HCPs) kept informed?</b>{"\n"}<BlogA href="https://www.himss.org/resources/digital-patient-engagement-actionable-communications-help-patients-navigate-healthcare">Healthcare Information and Management Systems Society (HIMMS) recommends</BlogA>{" that digital patient engagement platforms feature capabilities that deploy regular communications to bridge knowledge gaps. Providing greater transparency – in real time – around out-of-pocket costs, financial assistance, PA status, and prescription and refill status results in better decision-making, higher satisfaction, less prescription abandonment, improved adherence, and better outcomes."}</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogP>{"Patient services can reduce the patient’s disease burden and improve their experience. For companies that market a specialty therapy, the dilemma should not be whether to offer these services but determining if their commercialization partner delivers a solution that meets today’s consumer and provider expectations. "}<BlogA href="https://info.phil.us/modernize-the-patient-access-experience-transform-your-pharmaceutical-brand">Download our whitepaper</BlogA>{" to learn more about transforming your brand’s performance with a modern patient access experience."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
