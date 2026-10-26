// Migrated from Contentful resource "what-makes-phils-prior-authorization-process-unique" (Gatsby node 51b6c7ee-e1ac-503a-8fcc-f8392901784b) on 2026-10-13.
// Source: https://phil.us/page-data/what-makes-phils-prior-authorization-process-unique/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogHR, BlogLI, BlogOL, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/what-makes-phils-prior-authorization-process-unique/";
const TITLE = "What Makes Phil’s Prior Authorization Process Unique?";
const DESCRIPTION = "What makes Phil’s prior authorization process unique? Read our latest blog post to learn how your pharmaceutical brand can alleviate PA challenges.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{"The prior authorization process (PA) presents a significant (and growing) roadblock for healthcare providers trying to get a patient started on a prescription therapy they deem best. In general, a PA requirement affects patients' experience with their healthcare. It represents a length of time – and the associated frustration – they must wait to receive their medication or go without the treatment they have been introduced to by their provider and may desperately need. If the prescribed therapy is not covered, this essentially precludes patients from being able to afford to start and adhere to a medication that could help them better manage a complex medical condition and improve their quality of life. "}</BlogP>
    <BlogP>Prescribers' biggest challenges are the level of manual effort required to complete prior authorization requirements and insufficient historical context with the health plan. For example, they are unfamiliar with the required forms – which vary from payer to payer – or unsure what pertinent information to include. Or, they are managing a large patient population and find it very difficult to address and complete prior authorizations at scale which can be tremendously diverse. Additionally, providers often struggle with conveying how the chosen therapy is clinically necessary to treat the patient's condition, flagging the payer that it should be covered. Providers have patients' best interests at heart and try their best to obtain coverage, so it's unfortunate that something simple – like missing patient data – keeps patients from the coverage they need.</BlogP>
    <BlogH2>How manufacturers can alleviate PA challenges</BlogH2>
    <BlogP>{"From the pharmaceutical manufacturer’s perspective, the more people take their medication, the more it can be studied in the population. When few people can afford the therapy because the pharmacy benefit manager (PBM) will not pay for it, pushing patients toward a cheaper treatment, manufacturers cannot get the real-life data they need for Phase IV trials or to demonstrate value to payers for formulary placement. Ultimately, this significantly jeopardizes brand success. Additionally, it also directly impacts their ability to recoup a return on their investment for the development of the therapy to continue to offer it to patients in a sustainable way. "}</BlogP>
    <BlogP>{"Demystifying the PA process for providers and patients and elimination points of friction are the best way for manufacturers to address the pain of utilization management roadblocks. Knowing what plans are asking for and presenting that information clearly and concisely is the best path for all stakeholders. When a brand hits the market, the manufacturer should have a good idea of what health plans will likely cover outright and what their targeted providers will need to do to get the product covered. The manufacturer must investigate, collaborate, and educate to alleviate PA challenges effectively. Providing as much context and information as possible to prescribers and patients can eliminate the opaqueness of the process, clearly set expectations, and result in higher adoption of their therapy.   "}</BlogP>
    <BlogH2>The value of streamlining the PA process</BlogH2>
    <BlogP>{"It’s a well-accepted fact that a specialty or specialty-lite brand medication, especially when new to the market, will not be covered outright by most plans. Ideally, the best approach for the prescriber to get approval is to lean into the PA that’s required. Realistically, providers are very busy. The potential additional steps from a PA may not be worth their time from a cost-benefit perspective. Anything that delays the treatment or holds up the PA process might, in their mind, not be worth it when other treatments are on the market. And no provider loves to do the paperwork or see a claim get denied. Unfortunately, there’s no silver bullet to getting a medication approved and covered. Each plan has anywhere from one to five different forms required for submission to gain coverage and a variety of reasons why a drug is not covered.     "}</BlogP>
    <BlogP><b>The following three knowledge factors must be present at the point of prescribing to maximize the chances of approval:</b></BlogP>
    <BlogOL>
      <BlogLI>
        <BlogP>The patient has a good understanding of what their benefits may or may not cover</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>The prescriber knows which PA forms to send to the plan</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>The prescriber understands what information to include on the PA forms</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogP>Manufacturers can support providers from the get-go, streamlining the PA process by thoroughly educating them on these knowledge points and partnering with a solution that can help improve submission rates. Additionally, manufacturers should also have a good sense of the impact of the obstacles that patients face when seeking therapies and explore programs (i.e. bridge, quickstart) that can help patients get on therapy quickly while seeking access to therapy.</BlogP>
    <BlogH2>{"The essential role of technology and data analytics "}</BlogH2>
    <BlogP>{"Technology and data analytics play a crucial role in improving the efficiency and accuracy of the PA process. Historical context regarding why PA requests were denied, what forms were used, and what information was needed for approval is vital to improving the process. At Phil, our platform tracks this information closely to provide this insight to manufacturers and inform our efforts. Technology enables us to gain historical context by looking at the PA data at a very granular level and using data analytics to extrapolate meaningful trends that can help providers submit more accurate PA forms and expedite the process. Our technology allows Phil's pharmacy team – the human aspect of all this – to guide the prescriber offices. For example, we can tell them, \"This health plan always needs an ICD-10 code here. Please make sure you include one.\"   "}</BlogP>
    <BlogP>Most PAs are electronic now, which is a big win for providers and patients. There's no need for doctors to call or fax the health plans anymore. Integrating Phil's system with the entities facilitating PAs allows us to help patients access their medication even faster.</BlogP>
    <BlogH2>Phil’s secret sauce</BlogH2>
    <BlogP>With many PA solutions on the market, there's one aspect that makes Phil stand above the rest – its secret sauce - and that's our human touch. Our PA specialty team does an excellent job of balancing Phil's technological capabilities which include prepopulation of forms, tracking outstanding submissions, and nudging prescribers. The human element allows us to open the lines of communication and build trust with our prescribers.</BlogP>
    <BlogP>{"Our research, data gathering, and nitpicking over PA forms enable us to help providers make more informed decisions so they can avoid wasting valuable time. Phil's technology also gives providers more visibility into where their patients' PAs stand and keeps patients informed each step along the way, taking our communications a step further. Even with these tools, our providers know there's always a human from Phil they can call. Visit "}<BlogA href="/"><u>https://phil.us/</u></BlogA>{" to learn more about the PhilRx Patient Platform. "}</BlogP>
    <BlogHR />
    <BlogP>Angela Stigliano, PharmD, is Subject Matter Expert for Pharmacy Operations at Phil, Inc.</BlogP>
  </StaticBlogLayout>
);

export default Page;
