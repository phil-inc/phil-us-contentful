// Migrated from Contentful resource "market-access-strategy-drug-formulary" (Gatsby node d08cd064-f1ec-551e-9678-d07a411fa5ba) on 2026-10-13.
// Source: https://phil.us/page-data/market-access-strategy-drug-formulary/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogLI, BlogOL, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/market-access-strategy-drug-formulary/";
const TITLE = "Is Your Market Access Strategy Meeting the Needs of Drug Formulary Decision Makers?";
const DESCRIPTION = "To remain competitive, pharma manufacturers must understand how drug formularies and payer influence are evolving and take steps to optimize market access.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>Drug formularies are a driving force for patient access to prescribed medication. A pharmaceutical brand’s inclusion and positioning on drug formularies are often reflective of the market access strategy’s level of success. To remain competitive, pharma manufacturers must understand how formulary management and the influence of payers are evolving and take steps to optimize market access.</BlogP>
    <BlogH2>What is a drug formulary?</BlogH2>
    <BlogP>{"A drug formulary is a list of pharmaceutical drug products – both generic and brand name – covered by payers. A multidisciplinary Pharmacy and Therapeutics (P&T) Committee, comprised of physicians, clinician prescribers, pharmacists, nurses, health plan administrators, and other medical experts, determines which medications are part of the formulary. "}</BlogP>
    <BlogP>{"Formulary selection involves the evaluation of a drug’s efficacy, real-world clinical performance, and cost. Based on the committee’s clinical judgment, those products that fail to show adequate clinical differentiation or benefit to justify the cost will have limited or no coverage. "}</BlogP>
    <BlogH2>{"How do drug formularies work? "}</BlogH2>
    <BlogP>{"Formulary lists are powerful tools used by insurers to influence which medications beneficiaries use. The structure of a formulary impacts the coverage provided for each drug and how much patients will have to pay out-of-pocket:    "}</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogP><b>Closed Formulary</b>: Prescription drugs not on the formulary list are not reimbursed by the payer. There may be exception policies based on medical necessity. Closed formularies have a stronger preference for generics over branded drugs. Often, the number of products in each drug class is limited.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Open Formulary</b>{": The payer reimburses for formulary and non-formulary drugs. Specific drug classes may be excluded from coverage, such as those for cosmetic use. Patients may have to pay additional out-of-pocket expenses for a non-formulary prescription, and physicians are encouraged to prescribe medications on the formulary.   "}</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogP>{"Many health plans use a tiered pharmacy benefit design. After clinical review, drugs are assigned a formulary ranking that correlates with the coverage level provided. A typical tiered plan would be as follows: "}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Tier 1 medications are the most cost-effective agents, usually generics, with the lowest out-of-pocket costs for patients.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Tier 2 medications are preferred brands that are still cost-effective but require a higher out-of-pocket obligation.</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Tier 3 medications are non-preferred brands that offer either no coverage or the highest out-of-pocket costs. "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"Managed care organizations (MCOs) often add "}<BlogA href="https://www.jmcp.org/doi/10.18553/jmcp.2019.19069">utilization management measures</BlogA>{" to optimize patient outcomes and reduce unnecessary medication use and cost, particularly for higher-cost specialty drugs. The most common requirements are:  "}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Prior authorization</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Quantity limits</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Step therapy</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Mandatory generic substitution</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH2>Trends impacting formulary coverage</BlogH2>
    <BlogP>{"Clearly, payers have extensive influence on which pharma brands are covered and the level of coverage provided – staying competitive hinges on keeping up on what is happening in the market that will impact formulary selection and coverage. Here are four trends that are impacting a brand’s formulary selection and coverage. "}</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogP>{"Pharmacy benefits managers (PBMs) often serve as intermediaries, negotiating discounts and rebates from pharma manufacturers on behalf of insurers. The "}<b>{"PBM market’s rapid consolidation "}</b>{"is strengthening its negotiating power. "}<BlogA href="https://www.fiercehealthcare.com/payer/senate-hearing-puts-spotlight-debate-over-consolidation-pbm-market">Just three PBMs</BlogA>{" – OptumRx, Express Scripts, and CVS Caremark – control over 70% of the prescriptions processed in the U.S."}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><b>Formulary exclusions</b>{", which are the drugs that payers do not cover, have skyrocketed since 2014. "}<BlogA href="https://www.drugchannels.net/2022/01/five-takeaways-from-big-three-pbms-2022.html">In 2022, the three biggest PBMs</BlogA>{" collectively had excluded about 1,410 from their formularies.   "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Payers are adding "}<b>{"higher tiers with cost-sharing formulas "}</b><BlogA href="https://www.healthaffairs.org/do/10.1377/hpb20171409.000177/">to defray costs</BlogA>{" related to specialty drugs.     "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP><br /><BlogA href="https://morningconsult.com/2021/08/26/pharmacy-benefit-managers-drug-pricing/">Federal and state policies</BlogA>{" under consideration and intense public scrutiny around "}<b>PBM pricing and rebate practices</b>{" will likely force payers to make changes in their drug formulary structure."}</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogH2>Optimizing market access</BlogH2>
    <BlogP>{"Aligning your market access strategy based on payer priorities is the best bet for achieving desired formulary positioning. Steps your market access team can take include:  "}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>{"Understand how different payers leverage formulary tools to influence market access in your therapeutic area "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Identify gaps in "}<BlogA href="/leveraging-data-analytics/">data sets and insights</BlogA>{" and find a commercialization partner that can fill those gaps  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Approach and engage with payers as partners in achieving better patient outcomes and lowering costs</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Implement value-based contracts for new medications and high-cost treatments</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Develop payer-centric value messages  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Use real-world data and evidence to "}<BlogA href="/does-your-pharmaceutical-brands-data-demonstrate-value-to-payers/">demonstrate value</BlogA>{" and product differentiation in clinical outcomes "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Offer "}<BlogA href="/case-study-defying-the-mid-cycle-curse-for-specialty-pharma/">patient-centered services</BlogA>{" to facilitate patient access and medication adherence"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Differentiate your brand by highlighting how it boosts patient experience "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"Ready to optimize market access? Our end-to-end commercialization solution helps pharmaceutical manufacturers support their brand value to payers while facilitating patient access to therapy with the lowest possible out-of-pocket costs. Learn more about the Phil Platform "}<BlogA href="/pharma/">here</BlogA>.</BlogP>
  </StaticBlogLayout>
);

export default Page;
