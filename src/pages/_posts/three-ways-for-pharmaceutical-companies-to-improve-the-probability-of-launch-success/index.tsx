// Migrated from Contentful resource "three-ways-for-pharmaceutical-companies-to-improve-the-probability-of-launch-success" (Gatsby node c8c25919-3593-568b-8fd6-075e48f9ba09) on 2026-10-13.
// Source: https://phil.us/page-data/three-ways-for-pharmaceutical-companies-to-improve-the-probability-of-launch-success/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, AuthorBioP, BlogA, BlogImage, BlogLI, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/three-ways-for-pharmaceutical-companies-to-improve-the-probability-of-launch-success/";
const TITLE = "3 Ways for Pharmaceutical Companies to Improve the Probability of Launch Success";
const DESCRIPTION = "3 Ways for Pharmaceutical Companies to Improve the Probability of Launch Success";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

const AUTHOR = {
  name: "Dan Johnson",
  title: "Director of Product Marketing, Phil",
  imageSrc: "/images/blog/Dan_headshot.webp",
  bio: (
    <>
      <AuthorBioP>Dan supports the organization’s growth by driving go to market strategy, crafting compelling content, and leading sales enablement. He has an extensive background in healthcare big and small and is passionate about the ability of technology to improve health outcomes.</AuthorBioP>
    </>
  ),
};

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE, authorName: "Dan Johnson" })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }} author={AUTHOR}>
    <BlogP>{"Launching a successful pharmaceutical brand is no easy task. It takes significant stakeholder alignment across many strategic fronts to successfully transition from FDA approval to product adoption and growth. And even with a sizable base and formulary placement, it doesn’t necessarily follow that a brand will overcome the “Coverage Hurdle'' that requires a brand to jump through hoops to convert market access to a high % of covered dispenses. With the stakes at brand launch at an all-time high as a result of soaring "}<BlogA href="https://www.cbo.gov/publication/57126">drug development costs</BlogA>{" and the prospect of slipping into a "}<BlogA href="/pharma-product-mid-life-cycle-risk/">mid-cycle crisis</BlogA>{" an ever present reality - brands would be wise to adopt new paradigms at launch."}</BlogP>
    <BlogP>{"While the need to adopt new launch models is essential, it remains to be seen whether such a paradigm shift is currently present in the marketplace.This question is particularly salient as it relates to smaller sized organizations whose share of launches has been increasing as % of annual new products introduced to the marketplace. "}<BlogA href="https://www.mckinsey.com/industries/life-sciences/our-insights/first-time-launchers-in-the-pharmaceutical-industry">Recent McKinsey research</BlogA>{" suggests their share of successful launches is well below that of experienced launchers:"}</BlogP>
    <BlogImage src="/images/blog/2022-09-20_11.48.57.webp" alt="" width="824" height="459" />
    <BlogP>While this trend can’t be attributed to any one factor given all launches are dynamic and unique, one cause identified that is contributing to this disparity is that leaner organizations often rely on relationships with a few key opinion and trial-site leaders to inform their thinking on critical decisions like pricing, sales-force deployment, and partnerships. This should come as no surprise as smaller, capital constrained organizations inevitably have limited human capital to support commercial efforts. While larger companies typically deploy specialists in key areas such as marketing, access, and sales, it’s not uncommon for key executives at smaller organizations to serve as generalists that make decisions across these essential areas. In time constrained launch phases, commercial leaders often fall back on previously utilized partnerships and paradigms that are not necessarily fit to succeed in today’s dynamic drug channel. With insights gleaned from over 100 access programs across therapeutic areas, here are some of Phil’s key learnings that that can be applied to brand launches to help brand’s realize their unique potential:</BlogP>
    <BlogP><b>Prioritize Brand Loyalty over New Patient Starts</b>{" - During a brand’s launch phase, commercial teams are often laser focused on generating a head of steam with HCPs and patients to get patients on therapy. From a tactical standpoint, this generally means a significant marketing effort directed at HCPs to educate them on the efficacy of their product and subsidizing access to therapy with a bridge program while the brand expands formulary placement. While getting patients on therapy is essential, generating a loyal base requires more than driving new prescriptions with manufacturer subsidies. To create lasting brand loyalty, brands must think holistically about their goals during a launch, and this should start with prioritizing the overall patient experience with their brand to ensure patients are able to easily access, afford, and adhere to therapy. If long term affordability and adherence are out of reach, brands will struggle to maintain loyalty over the long run even with a clinically differentiated product. This will result in diminished confidence with HCPs and patients which in return stunts their chances for sustained growth."}</BlogP>
    <BlogP><b>Weight Market and Patient Access Equally</b>{" - While most brands lack significant market access with top tier payers at launch, brands that have demonstrated differentiated clinical efficacy can reasonably expect to sign some major payor contracts. When this happens, the prevailing expectation is that these contracts will unlock patient access translating to meaningful coverage of dispenses. Commercial executives understand that this is essential for sustained growth as manufacturers can’t subsidize their brands with access dollars forever. Yet, it’s increasingly common for brands to be frustrated to find that their formulary placement isn’t flipping the script on the overall percentage of covered dispenses. The cause for this is typically related to challenges with prior authorization requirements as well as the misaligned incentives at the pharmacy counter that contribute to manufacturer coupon overutilization. Brands should shift their thinking further upstream from simply generating market access to orchestrating covered dispenses. This can be accomplished by "}<BlogA href="/six-considerations-when-evaluating-patient-access-platforms/">choosing the right access partner</BlogA>{" to cultivate patient access strategies that facilitate a high probability of coverage success."}</BlogP>
    <BlogP><b>Choosing the Right Access Partner is Critical</b>{" - As pharmaceutical companies prepare for launch, they need to make critical decisions regarding their partner ecosystems that can help them realize commercial goals. There are two leading factors that have made this process more challenging for brands. First, as the size of the pharmaceutical market has expanded, so has the number of potential vendors. More choice has made the decision-making process more complex given that many solution providers look the same, talk the same, and make the same promises. Second, the complexities of the drug channel have increased dramatically, and the overall pace of change and disruption is increasing. This has translated into a need for larger partner ecosystems and diluted effectiveness of legacy access partners. Therefore, it’s essential for brands to ask the right questions when evaluating potential partners. Brands should press hard to determine if organizations are:"}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Positioned to respond to rapidly shifting consumer and HCP expectations</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Structured to operate with aligned financial incentives</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Able to corroborate their claims and results with robust data & references"}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Capable of making sense of data to provide actionable insights to inform strategy</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Investing in innovation that will result in long term benefits in an evolving channel</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>The bottom line is that launching a successful brand is a more challenging proposition than ever, particularly for smaller pharmaceutical companies. By prioritizing a more holistic and innovative approach that can be realized with the right partners, brands can meaningfully improve their probability of high adoption and reaching their expected value.</BlogP>
    <BlogP>{"Through its next-generation patient access platform, Phil partners with pharmaceutical manufacturers to remove barriers to medication access and adherence. A seamless patient experience allows those who need them to be able to benefit from their prescribed drug therapies. "}<BlogA href="/">Visit our website</BlogA>{" to learn more."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
