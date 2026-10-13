// Migrated from Contentful resource "developing-a-distribution-strategy-that-optimizes-gross-to-net" (Gatsby node 46f55712-7177-53e3-9c7f-f53f634d81c8) on 2026-10-13.
// Source: https://phil.us/page-data/developing-a-distribution-strategy-that-optimizes-gross-to-net/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogH3, BlogImage, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/developing-a-distribution-strategy-that-optimizes-gross-to-net/";
const TITLE = "Developing a Distribution Strategy that Optimizes Gross to Net";
const DESCRIPTION = "Developing a Distribution Strategy that Optimizes Gross to Net";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>Downward pressure on net sales is an ongoing problem for pharmaceutical and life sciences companies. It’s crucial to understand the gross-to-net (GNT) challenges that manufacturers are facing and how they can leverage their distribution strategies to optimize GTN.</BlogP>
    <BlogH2>Understanding the challenges surrounding GTN</BlogH2>
    <BlogP>{"Numerous factors impact a life science company’s GTN, which is the difference between the wholesaler acquisition cost (WAC) – also known as the drug’s list price – and the manufacturer’s net sales. Distributor chargebacks and rebates, "}<BlogA href="https://www.340bhealth.org/members/340b-program/overview/">340B Drug Pricing Program rebates</BlogA>{", negotiated price reductions, and copay assistance can significantly reduce the net revenue manufacturers realize for their brand-name drugs. The fact is, many companies today are experiencing declining net drug revenue as they offer larger rebates to offset increases in list prices, as depicted in this "}<BlogA href="https://www.drugchannels.net/2022/07/warped-incentives-update-gross-to-net.html">chart from Drug Channels</BlogA>:</BlogP>
    <BlogImage src="/images/blog/unnamed.jpeg" alt="" width="512" height="351" />
    <BlogP>There are two major changes in the pharmaceutical environment that underly the GTN challenges companies are facing:</BlogP>
    <BlogH3>1. Consumer expectations</BlogH3>
    <BlogP>Innovations, fueled by mobile technologies, over the last decade or so have removed a lot of friction from buying experiences and have enabled more informed decision-making, which has become part of the standard purchasing experience today.</BlogP>
    <BlogP>Consumers expect to know upfront how much a product or service costs, how conveniently they can obtain it, and when they can expect to receive it.</BlogP>
    <BlogP>For most things consumers buy today, they are getting that clarity, except when it comes to their prescription drugs. The pharmaceutical industry is decades behind when it comes to meeting consumer expectations. Failing to deliver that frictionless, consumer-centric experience creates barriers that keep patients from starting on or properly adhering to their prescribed therapies, which for any manufacturer, is going to add up to poor gross to net.</BlogP>
    <BlogH3>2. Prescription coverage</BlogH3>
    <BlogP>{"As drug and patient out-of-pocket costs have continued to rise, payers have "}<BlogA href="/market-access-strategy-drug-formulary/">instituted stricter formulary requirements</BlogA>{" – particularly for more expensive specialty drugs – that must be met before they approve and cover a therapy. In these cases, the prescriber must follow a prior authorization process to get the patient started on their therapy."}</BlogP>
    <BlogP>While the technology to create “back office” efficiencies around administrative workflows is prevalent across many industries, this is not necessarily the case in healthcare. The lack of process optimization and streamlining means that a smaller percentage of prescription drugs get covered by payers because of the friction involved in the approval process. This means that the manufacturer often ends up subsidizing a greater percentage of scripts than would have otherwise been covered in a streamlined process. Now that the financial burden is borne by the manufacturer, nowhere does it show up more clearly than in GTN.</BlogP>
    <BlogP>The impact of both these challenges combined is multiplicative. If a company loses a few scripts due to a friction-prone path to coverage, it is also losing the subsequent refills. And if a percentage of those scripts or scripts overall are not covered and the manufacturer steps in to subsidize at a much higher percentage than planned, together, these factors represent a greater magnitude of diminished net revenue to pharma brands.</BlogP>
    <BlogH2>Why manufacturers need a value-aligned distribution channel</BlogH2>
    <BlogP>Multiple entities are involved in getting a patient on therapy between the manufacturer and the payer. The better manufacturers understand that distribution channel, the more effectively they can employ various mechanisms and measures to help patients get started on therapy faster, stay on their treatment, and access it more affordably.</BlogP>
    <BlogP>Surprisingly, many prescription models are antiquated and misaligned with the needs of today's patients and prescribers. As a result, some of the manufacturer's distribution costs may not be commensurate with the value added. In other words, some entities capture disproportionately more value than they contribute. This means that fewer dollars are available for manufacturers to improve patient access.</BlogP>
    <BlogP>Manufacturers have very little pricing power in the highly competitive, highly regulated world of pharma. Cost inflation is typically due to how the distribution channel operates. Due to a lack of visibility, manufacturers may not realize that one-sixth or one-seventh of their brand's value is captured by an entity adding zero value.</BlogP>
    <BlogP>Pharmaceutical manufacturers budget a certain amount of capital to help patients access their prescribed therapy. When they can track what is happening within the distribution channel in real-time, they can design programs so that most of that capital goes to its intended purpose.</BlogP>
    <BlogP>It's essential that the distribution channel aligns with the value each stakeholder contributes to achieving the end goal of ensuring patients receive the right therapy at the right time and at the right price.</BlogP>
    <BlogH2>Achieving a GTN-optimized distribution strategy</BlogH2>
    <BlogP>There are three key considerations when designing a distribution strategy to optimize GTN:</BlogP>
    <BlogH3>1. Always put the patient-turned-consumer at the center</BlogH3>
    <BlogP>Beyond a traditional patient-centered approach, manufacturers must recognize that the patient is also a consumer who wants a more modern way to access their medications and be informed as to what’s happening behind the scenes. Equip them with the digital-based tools and user experiences that are familiar to them, and that assist them with accessing and staying on therapy.</BlogP>
    <BlogH3>2. Address the healthcare provider experience</BlogH3>
    <BlogP>Make sure providers have modern tools to streamline and facilitate their efforts to meet payer requirements so they can help their patients get started and adhere to prescribed medications.</BlogP>
    <BlogH3>3. Create an incentive-aligned distribution channel</BlogH3>
    <BlogP>All entities and stakeholders along your distribution channels should be working toward the common goals of getting scripts covered and making sure that most patient access dollars go to the patient to underwrite the cost of their care.</BlogP>
    <BlogH2>It’s time to embrace innovation</BlogH2>
    <BlogP>{"Many pharma companies today are not "}<BlogA href="/life-science-company-digital-technology/">taking full advantage of digital technology</BlogA>. The good news is that while technology has failed the industry for several decades, in the last five to six years, there have been clear strides, especially with consumer- and prescriber-facing innovations. The new technology hype cycle is behind us, and solutions are now production-worthy in a way and at a scale that they’re able to impact lives. It may take a new mindset, but by embracing innovation and implementing the right tools, pharmaceutical manufacturers can improve clinical, financial, and operational outcomes.</BlogP>
    <BlogP>Phil can be a game-changer for life science companies looking to meet patient expectations and positively impact outcomes while optimizing GTN. With a digital, frictionless experience, providers can more easily meet payer criteria and get their patients on therapy quicker. Patients can better access, adhere to, and afford their medications while staying informed along the way.</BlogP>
    <BlogP>{"The platform also provides a holistic end-to-end view of what is happening along the entire patient-prescription journey. Most importantly, data and insights are delivered in real-time, so manufacturers can course correct as necessary. Without a very high commitment hurdle, smaller companies can try it out at a level that best fits their requirements and then scale as needed. "}<BlogA href="/pharma/">Learn more about Phil</BlogA>.</BlogP>
  </StaticBlogLayout>
);

export default Page;
