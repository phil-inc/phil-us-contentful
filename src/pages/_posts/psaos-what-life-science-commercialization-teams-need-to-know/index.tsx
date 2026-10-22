// Migrated from Contentful resource "psaos-what-life-science-commercialization-teams-need-to-know" (Gatsby node 2ec30738-f48c-5e3a-8f69-b7af569ee3f3) on 2026-10-22.
// Source: https://phil.us/page-data/psaos-what-life-science-commercialization-teams-need-to-know/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogLI, BlogOL, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/psaos-what-life-science-commercialization-teams-need-to-know/";
const TITLE = "PSAOs: What Life Sciences Commercialization Teams Need to Know";
const DESCRIPTION = "Pharmacies can significantly impact pharmaceutical manufacturers’ commercial success as crucial players in the prescription fulfillment process. In addition to playing an esse";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>Pharmacies can significantly impact pharmaceutical manufacturers’ commercial success as crucial players in the prescription fulfillment process. In addition to playing an essential role in the supply chain, pharmacies are the only consumer-facing entities. An ineffective distribution network can diminish a brand’s reputation, patient and provider satisfaction, health outcomes, and gross to net. That’s why commercial teams need to evaluate the makeup and affiliations of the pharmacy networks that dispense their prescription therapies to ensure optimal access. One of the little-known pharmacy affiliations commercialization teams should be aware of are pharmacy services administrative organizations (PSAOs).</BlogP>
    <BlogH2>What is the role of PSAOs?</BlogH2>
    <BlogP>{"Because community, specialty pharmacies, and small independent chains lack the infrastructure and expertise of large pharmacy chains, contracting with a PSAO can help them stay competitive. This relationship is a lifeline for the vast majority of independent pharmacies, given that dispensing prescriptions drives "}<BlogA href="https://www.drugchannels.net/2022/02/five-things-to-know-about-state-of.html">more than 90% of their total revenue</BlogA>{", and PSAO services facilitate access to pharmacy networks. "}</BlogP>
    <BlogP>{"The primary role of PSAOs is to provide a wide range of “back office” administrative, clerical, audit, and data support services to independent pharmacies for a fixed monthly fee. In most cases, they facilitate contract negotiations with PBMs, which may include reimbursements for prescription medications, dispensing fees, and participation within the PBM pharmacy network. "}</BlogP>
    <BlogP>{"They may also assist pharmacies with clinical support and regulation compliance. According to the "}<BlogA href="https://www.hda.org/psaos/">Healthcare Distribution Alliance</BlogA>{" (HDA), PSAOs "}<b>do not perform</b>{" the following:"}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Dictating reimbursement rates</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Setting Maximum Allowable Cost (MAC) rates</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Determining formularies or patient coverage</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Retaining any portion of pharmacy reimbursement</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Establishing Direct and Indirect Remuneration (DIR) fees or retaining them</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Creating networks or plan structures</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH2>Understanding the current PSAO landscape</BlogH2>
    <BlogP>{"As of 2012, the "}<BlogA href="https://www.gao.gov/assets/gao-13-176.pdf">GAO reported</BlogA>{" there were at least 22 PSAOs. Today there are less than 10 in operation — a "}<BlogA href="https://www.computertalk.com/psaos-giving-independents-a-fighting-chance/">recent analysis</BlogA>{" estimated that the six largest PSAOs each have between 1,700 and 6,800 participating independent pharmacies. "}</BlogP>
    <BlogP>{"According to a "}<BlogA href="https://www.pcmanet.org/wp-content/uploads/2021/01/PSAO-Report_Health-Evaluations.pdf">report by the Pharmaceutical Care Management Association</BlogA>{" (PCMA), 83% of independent pharmacies contract with PSAOs, which operate under one of the two following models:"}</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogP><b>{"Wholesaler-integrated: "}</b>The PSAO is a subsidiary of a drug wholesaler. In addition to supporting business administrative functions, it may also be involved in purchasing prescription drugs. Under this model, independent pharmacies may co-brand with the wholesaler through a membership or franchise. An estimated 75% of independent and small chain pharmacies contract with one of the “Big Three '' wholesalers: AmerisourceBergen, Cardinal Health, and McKesson. Examples include Elevate Provider Network and Health Mart Atlas.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Member-owned:</b>{" Unaffiliated with a drug wholesaler, this is the traditional PSAO model. Under this model, the PSAO may be “wholesaler neutral” or have a preferred wholesaler contract arrangement. Some member-owned PSAOs, such as Arete Pharmacy Network or Epic Rx, are nationwide. Others have a specific geographic footprint, such as Community Independent Pharmacy Network. "}</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogH2>Key considerations for life sciences commercialization teams</BlogH2>
    <BlogP>{"There are many considerations when planning to distribute and dispense a prescription therapy. One of a  pharmaceutical manufacturer's most critical decisions is in influencing the pharmacies that will be part of their distribution network at launch. The long-term success of the ultimately brand hinges on the performance of those pharmacies. "}</BlogP>
    <BlogP>{"Unlike specialty pharmacies, almost all retail pharmacies are part of open networks, where the patient out-of-pocket is the same at every pharmacy across the network. However, the largest PSAOs are increasingly "}<BlogA href="https://www.drugchannels.net/2021/11/small-pharmacies-continue-to-run-away.html?utm_source=pocket_reader">moving away from preferred networks</BlogA>{" meaning that some retail pharmacies may not have access to preferred networks in Medicare plans. In a preferred network, patients pay less out-of-pocket at a preferred pharmacy than if they go to a non-preferred network pharmacy. This can significantly influence prescription adoption. Limited networks – a common occurrence in specialty drug launches – limit coverage to designated pharmacies and give insurers more economic control over prescription fulfillment. "}</BlogP>
    <BlogP>In addition to evaluating a pharmacy  network strategy, manufacturers must also consider the types of pharmacies they plan to include: independent, chain, specialty, pharmacy benefit manager-owned, etc. It's crucial to ensure you have the right level of pharmacy makeup to ensure coverage for the patient population size, geographical area, utilization patterns, and outcome goals.</BlogP>
    <BlogP>A pharmacy network's contractual agreements and affiliations with payers, PBMs, and PSAOs can influence coverage. You should carefully evaluate if the pharmacy network has the contracts necessary to drive coverage effectively. For example, while many specialty pharmacies may have 50 state dispensing capabilities, the fact that they utilize mail order models typically means that they are unable to contract with many state medicaid and regional health plans with requirements for in-state dispensing.</BlogP>
    <BlogP>{"When life sciences companies partner with Phil, they gain access to a nationwide pharmacy\nnetwork with 98% plan coverage that enables patients to receive their prescribed therapies\nquickly and affordably. Real-time insights ensure a consistent, predictable experience for\nproviders and pharmacies across the network. Our platform helps commercialization teams\ngrow their brands in a sustainable way. "}<BlogA href="https://info.phil.us/why-the-pharmacy-matters-for-pharmaceutical-brands?_gl=1*rupdid*_ga*OTY5NDg4MTE5LjE2Njg2MzY3MjU.*_ga_0D2JJPD1QY*MTY3NzE5MTU5NS4zMy4xLjE2NzcxOTE2MDUuNTAuMC4w">Read this white paper</BlogA>{" to discover how your team can optimize prescription coverage at the pharmacy counter."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
