// Migrated from Contentful resource "optimizing-life-sciences-field-teams-in-the-era-of-drug-utilization" (Gatsby node aea409b7-e0f5-5698-b8d8-20dd2988f260) on 2026-10-13.
// Source: https://phil.us/page-data/optimizing-life-sciences-field-teams-in-the-era-of-drug-utilization/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogH3, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/optimizing-life-sciences-field-teams-in-the-era-of-drug-utilization/";
const TITLE = "Optimizing Life Sciences Field Teams in the Era of Drug Utilization Management";
const DESCRIPTION = "Optimizing life sciences field teams in the era of drug utilization management";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>A persistent challenge for life sciences manufacturers is growing access and affordability obstacles, exacerbated by hard-to-enter formularies and rigorous utilization management (UM) practices. Payers are tightening the screws year over year with new cost containment strategies. Where there used to be hoops, they are now on fire, making it more difficult than ever to ensure reimbursement at the pharmacy.</BlogP>
    <BlogP>{"Today, life science field teams need to command a mastery of what is occurring in the market specific to the payer landscape and their brands to communicate effectively with their core audience - HCPs. Market dynamics have required a shift from the traditional sales model focused on educating on the clinical efficacy of the product to one that centers on helping HCPs navigate the complex web of patient access. "}</BlogP>
    <BlogH2>{"Why the traditional sales model needs to evolve "}</BlogH2>
    <BlogP>{"The days of assuming access will come easily if an innovative treatment has high patient and provider demand and a motivated sales force are gone. Nowhere is this more evident than the lackluster performance of "}<BlogA href="https://trinitylifesciences.com/wp-content/uploads/2022/06/Trinity-White-Paper-Empowering-the-Next-Generation-Launch-Model.pdf">recent drug launches</BlogA>, of which over 60% between 2019 and 2021 underperformed expectations, including 24 out of 28 non-rare, non-oncology products.</BlogP>
    <BlogP>{"The reality is that patients who are prescribed specialty and branded retail therapies often face crippling access obstacles, including step therapy requirements, prior authorization hurdles, and high out-of-pocket costs, all of which create time-consuming tasks for providers and their staff. The impact on brands is typically acute and felt in the form of high rates of prescription abandonment, uncovered coupon overutilization, and the erosion of brand loyalty. "}</BlogP>
    <BlogP>{"Specialized roles beyond traditional, promotional sales are necessary to drive value for customers effectively. Without an integrated field team of sales representatives and reimbursement specialists that have access to real-time data and are focused on collaborative problem-solving to help get patients over the drug UM finish line, brand performance will suffer. "}</BlogP>
    <BlogH2>{"How to optimize your field team to unlock coverage "}</BlogH2>
    <BlogP>In this era of drug UM, field teams need to evolve their approach to be more responsive and relevant to customers. With the right information and tools, integrated field teams can drive brand performance and patient access more effectively. There are four keys to optimizing field teams:</BlogP>
    <BlogH3>{"1. Educate and get buy-in "}</BlogH3>
    <BlogP>{"It's important to educate reps on the tools they have at their disposal, how these tools facilitate success, how the patient support program benefits them and their customers, and how any copay or bridge programs work. At a recent pharmaceutical sales meeting, the sales leadership made up fake checks and said, \"If you had driven more scripts through the hub, this is what your bonus check would've been.\" It made an impression, cementing the buy-in of promoting the program because the sales reps could see how they would benefit. "}</BlogP>
    <BlogP>{"One of the things we do at Phil when working with a new life sciences partner is to hold weekly meetings with the sales leadership. We encourage bringing in some sales reps who will be early adopters of the platform and become champions, sharing their successes and helping to gain buy-in from the rest of the field team. "}</BlogP>
    <BlogH3>{"2. Align incentives "}</BlogH3>
    <BlogP>{"Ensuring that field sales teams’ incentives align with corporate goals is crucial so everyone is rowing the boat in the same direction. Good sales reps are incentive -operated people who are resourcesful, so they will figure out what the bonus plan rewards and do what they need to do to earn that bonus. If the bonus plan incentivizes the generation of scripts, that’s poor alignment with what a manufacturer wants to accomplish in today’s world. The sales reps will get the number of scripts they need to make their numbers, but very few will be covered, so patients never get started on the therapy, and the manufacturer gets a poor return on their investment. The rep earns their bonus in the short term, but nobody wins in the long run. "}</BlogP>
    <BlogH3>{"3. Enable access to real-time data "}</BlogH3>
    <BlogP>{"Working without real-time data is like being in a dark room with a candle – field team members can only see part of the situation – dimly, at best. To bring value to providers and patients and make the best decisions, they need a bright light – in the form of real-time data – to understand what is happening across the prescription journey. Whether a PA has stalled due to missing data on a form or the pharmacy has not done an electronic benefits verification, the field team can proactively assist the provider before frustration sets in and expedite the patient’s access to therapy. "}</BlogP>
    <BlogH3>{"4. Take a collaborative approach "}</BlogH3>
    <BlogP>{"The field reimbursement specialist’s role is clearly defined. They help patients access their therapy, which involves educating and supporting the provider’s staff on addressing UM requirements, such as prior authorizations (PAs) and reimbursement resolution. "}</BlogP>
    <BlogP>{"Sales reps typically stick to the science, educating on clinical benefits and patient profiles. However, if they aren’t well versed on access and how to solve some of the hurdles, they’re caught in the past. Reps must be able to answer providers’ questions about whether a therapy is covered and the options for coverage. These are often the first questions practices ask today. A product could be the best science in the world, but the provider will not write for it if they don’t see a path for getting it covered. "}</BlogP>
    <BlogP>{"While sales reps can educate on reimbursement, they cannot participate in reimbursement resolution because HIPAA regulations prohibit access to protected health information (PHI). Ideally, the sales rep and field reimbursement specialist work in tandem to address PA and reimbursement issues that arise. With Phil’s solution, that collaboration is made possible. If an office has a problem, they can send a fax via a portal that conceals the patient’s PHI from the sales rep but allows the reimbursement specialist to see relevant information to help the office resolve the issue. "}</BlogP>
    <BlogH2>{"Driving brand success "}</BlogH2>
    <BlogP>{"By staying abreast of the shifts in the marketplace, health sciences companies can properly equip their field teams to drive brand success. With Phil, field teams have access to real-time data, enabling them to effectively collaborate to support healthcare providers with UM requirements and help patients access their prescribed therapies at the lowest cost as expediently as possible. Visit "}<BlogA href="/pharma/">https://phil.us/life-sciences</BlogA>{" to learn more."}</BlogP>
    <BlogP><i><b>Patrick Leary is Chief Commercial Officer at Phil, Inc.</b></i></BlogP>
  </StaticBlogLayout>
);

export default Page;
