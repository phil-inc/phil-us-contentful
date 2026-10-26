// Migrated from Contentful resource "why-strong-market-access-doesnt-always-translate-to-covered-dispenses" (Gatsby node 252f3f66-55d1-514d-9c0a-98c6d0e1cbdd) on 2026-10-13.
// Source: https://phil.us/page-data/why-strong-market-access-doesnt-always-translate-to-covered-dispenses/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogLI, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/why-strong-market-access-doesnt-always-translate-to-covered-dispenses/";
const TITLE = "Why Strong Market Access Doesn’t Always Translate to Covered Dispenses";
const DESCRIPTION = "Learn the reasons why good market access does not guarantee coverage and what pharmaceutical brand teams can do to overcome this challenge.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>Strong market access, the ability of a pharmaceutical manufacturer to secure reimbursement and coverage for their products from payers and other decision-makers, does not always translate to covered dispenses at the pharmacy level – particularly for specialty and specialty-lite therapies. Manufacturers must also navigate a complex prescription fulfillment and payer utilization management landscape to overcome barriers to patient access. Here are the three biggest reasons why good market access does not guarantee coverage and what commercialization teams can do to overcome this challenge.</BlogP>
    <BlogH2>There are coverage gaps in your pharmacy network</BlogH2>
    <BlogP>There are many moving parts when it comes to market access and prescription coverage. Factors such as a pharma brand’s payer density, pharmacy plan contract footprint, and channel mix can greatly impact coverage at the pharmacy level. Most pharmacies participate in networks designed by pharmacy benefit managers (PBMs), who contract with health plans to obtain coverage for dispensed medications. However, these networks are dynamic often resulting in significant pharmacy plan contract gaps particularly amongst local and regional plans if pharmacies don’t have an in-state presence or utilize a mail-order model.</BlogP>
    <BlogP>Pharmacies may be part of open, preferred, or limited networks. Almost all retail pharmacies are part of open networks, where the patient’s out-of-pocket is the same at every pharmacy across the network. In a preferred network, patients pay less out-of-pocket at a preferred pharmacy than if they go to a non-preferred network pharmacy - a common tactic used by Medicare Part D plans to organize groups of pharmacies willing to accept lower reimbursement. Limited networks, which give payers more operational and economic control over prescription fulfillment, limit coverage to only designated pharmacies and are common for higher WAC specialty medications.</BlogP>
    <BlogP>{"According to an "}<BlogA href="https://www.iqvia.com/-/media/iqvia/pdfs/library/presentations/7-market-access-trends-for-2027.pdf">IQVIA report</BlogA>, tighter payer management is a growing trend causing “greater fragmentation of coverage across states and payer groups, as well as slower uptake of new products.” Manufacturers should consider the following factors when evaluating their channel strategy:</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>{"The percentage of payers the pharmacy network is contracted with – often driven by network design – corresponds with the level of coverage a brand can expect.  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Payers prefer that specialty medications be distributed through limited channels, such as specialty pharmacies, which can impact patient access.   "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Geographical variations in patient population and health plan behavior can "}<BlogA href="https://www.healthaffairs.org/do/10.1377/forefront.20180912.391231/">impact coverage decisions</BlogA>{". "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Shrinking pharmacy distribution networks are giving the largest contract entities more leverage while potentially leaving brands with no coverage in some areas.</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH2>Your uncovered coupons are overutilized</BlogH2>
    <BlogP>{"Over the past decade, specialty manufacturers have increasingly turned to copayment coupon programs to help defray patients’ out-of-pocket cost-sharing obligations at the pharmacy to drive pull-through. From 2014 to 2016, these copay offsets "}<BlogA href="https://www.iqvia.com/-/media/iqvia/pdfs/library/presentations/7-market-access-trends-for-2027.pdf">increased by 32%</BlogA>{" across all retail brands. In 2021, about "}<BlogA href="https://www.managedhealthcareexecutive.com/view/specialty-pharmacy-controls-limit-patient-access-fein-and-long-explain">70% of patients on newly-launched specialty drugs</BlogA>{" were on some type of patient assistance program subsidized by the manufacturer. "}</BlogP>
    <BlogP>{"In general, "}<BlogA href="https://avalere.com/insights/follow-the-pill-understanding-the-prescription-drug-supply-chain">pharmacy reimbursement rates</BlogA>{" are based on a discount percentage from the average wholesale price plus a dispensing fee minus the patient cost-sharing amount. Reimbursement rates can vary widely across pharmacy format types – i.e., central fill/mail order vs. retail. The variation in reimbursement rates can lead to under reimbursement on the pharmacy side and when scripts are “underwater”  pharmacies may apply manufacturer subsidies and potentially lead to uncovered option over utilization (free goods & cash) and transfer outs. "}<BlogA href="https://www.drugtopics.com/view/working-with-discount-cards-and-manufacturer-coupons">Pharmacies particularly like copay coupon programs</BlogA>{" because they can use them to help customers afford their medications without hurting the bottom line. However, an over-reliance on uncovered coupons negatively impacts the "}<BlogA href="/developing-a-distribution-strategy-that-optimizes-gross-to-net/">manufacturer’s gross-to-net (GTN)</BlogA>.</BlogP>
    <BlogH2>Pharmacies are substituting your brand with a generic equivalent</BlogH2>
    <BlogP>{"Brand-to-generic substitution has long been a common pharmacy practice across all therapeutic areas. Beyond the fact that a brand’s market share and the manufacturer’s bottom line take a hit from this practice, it can potentially have unintended consequences, especially in some therapeutic areas. "}<BlogA href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5417581/#R40">Several studies suggest</BlogA>{" that switching to a generic equivalent may negatively impact medication adherence, resulting in poorer outcomes, causing more adverse events, and increasing the total cost of care."}</BlogP>
    <BlogP>{"The impetus for this practice has primarily been to reduce costs. However, while the price for a generic equivalent has been estimated to be anywhere from "}<BlogA href="https://www.fda.gov/drugs/generic-drugs/generic-drug-facts#f1">30% to 85% less</BlogA>{" than the branded therapy, "}<BlogA href="https://www.healthaffairs.org/doi/10.1377/hlthaff.2017.1684">early evidence on specialty therapy substitutions</BlogA>{" suggests there may be little to no cost savings in these cases."}</BlogP>
    <BlogP>{"In addition, since most of a pharmacy’s revenue comes from the reimbursements it earns for dispensing prescriptions – their "}<BlogA href="https://www.commonwealthfund.org/publications/issue-briefs/2021/aug/competition-consolidation-evolution-pharmacy-market#3">gross margins average</BlogA>{" 42.7% for generics and only 3.5% for brand-name drugs, they have a significant financial incentive to substitute brands with generics when feasible. Brands should think carefully about their pharmacy strategy when they lose exclusivity to ensure that they are able to best serve patients and protect their economics."}</BlogP>
    <BlogH2>Take the reins to drive better coverage</BlogH2>
    <BlogP>{"  More than one "}<BlogA href="https://www2.deloitte.com/us/en/insights/industry/life-sciences/pharmaceutical-market-access.html">of three new drug launches fall short</BlogA>{" of expectations – "}<b><i>yours doesn’t have to be one of them</i></b>. Good market access for a specialty and specialty-lite medication does not guarantee that prescriptions for that medication will be covered at the pharmacy level. By understanding the coverage implications of your brand’s dispense network and partnering with the right commercialization platform, your team can take the reins to drive better coverage.</BlogP>
    <BlogP>{"Phil is the first end-to-end pharmaceutical commercialization platform that helps brands unlock coverage and maximize reimbursement. Life science companies have access to a "}<b>nationwide pharmacy network</b>{" that allows patients to receive prescribed therapy quickly, conveniently, and affordably. Phil simplifies "}<b>prior authorizations</b>{", and "}<b>supports manufacturer-driven coupon utilization</b>{". Real-time insights give our manufacturer partners strategic visibility across the prescription journey and enable you to make responsive changes to your business rules. "}<BlogA href="https://info.phil.us/why-the-pharmacy-matters-for-pharmaceutical-brands?_gl=1*1rgtwiv*_ga*OTY5NDg4MTE5LjE2Njg2MzY3MjU.*_ga_0D2JJPD1QY*MTY3NDUwODA1NS4yMS4xLjE2NzQ1MDk2NzEuNTkuMC4w">Check out our Ebook</BlogA>{" to learn how to optimize coverage of your specialty brand at the pharmacy counter."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
