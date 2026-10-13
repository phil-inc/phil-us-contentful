// Migrated from Contentful resource "tech-enabled-patient-access-webinar-key-takeaways" (Gatsby node 1f43e42f-43c8-5d30-b6a6-c1bdee631b8b) on 2026-10-13.
// Source: https://phil.us/page-data/tech-enabled-patient-access-webinar-key-takeaways/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogH3, BlogLI, BlogOL, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/tech-enabled-patient-access-webinar-key-takeaways/";
const TITLE = "Tech Enabled Patient Access Webinar: Key Takeaways";
const DESCRIPTION = "Many patients struggle to navigate healthcare effectively, inhibiting access to prescribed therapies.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{" “Patient access begins at the moment that a drug is prescribed and encompasses everything that goes with getting a drug into a patient’s hand.” said "}<BlogA href="https://www.linkedin.com/in/len-paolillo-876b7238/"><u>Len Paolillo</u></BlogA>{", CCO of "}<BlogA href="https://impelpharma.com/"><u>Impel Pharmaceuticals</u></BlogA>{", during last "}<BlogA href="https://info.phil.us/fierce-webinar-on-demand"><u>Thursday’s webinar</u></BlogA>{" focused on how the right technology can meaningfully improve the chances a therapy will actually be taken as prescribed. "}</BlogP>
    <BlogP>{"As the life sciences industry faces strong access headwinds in 2022 due to evolving consumer expectations and stricter payer utilization management requirements, the conversation was timely and important. Mr. Paolillo, alongside "}<BlogA href="https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAAAP8icBfiClIfYRGoqNBfd6dMrql0sdKgg&keywords=deepak%20thomas&origin=RICH_QUERY_SUGGESTION&position=0&searchId=4d125071-5219-45f8-8688-c93d6105e28d&sid=_do"><u>Deepak Thomas</u></BlogA>{", Founder and CEO of Phil and "}<BlogA href="https://www.linkedin.com/in/kim-plesnarski-064154b/"><u>Kim Plesnarski</u></BlogA>{", VP, Market Access Solutions at Syneos Health, offered relevant insights for life science companies looking to improve their patient access strategy. The conversation touched on a range of hot-button topics ranging from the importance of timely channel insights to how tech, like the "}<BlogA href="/pharma/"><u>Phil Platform</u></BlogA>, has matured to the point where brands need to rely on it if they hope to reach their commercial goals.</BlogP>
    <BlogP>Here are key takeaways from the webinar for life sciences companies to consider:</BlogP>
    <BlogOL>
      <BlogLI>
        <BlogH3>{"Increasing channel complexity is driving a greater demand for patient support services, yet the legacy access model is broken "}</BlogH3>
        <BlogP>{"“Basically every launch today requires investment in access and support services. That wasn’t the case just ten years ago.” said Ms. Plesnarski when unpacking why the industry is witnessing 16% yoy growth in patient support services. The consensus among the panelists was that the legacy solutions; expensive, call center driven HUB providers,and specialty pharmacy networks are ill-equipped to respond to this increasing complexity. According to Len Paolillo, brands must avoid falling into the trap of relying on their past launches and need to treat each launch as a fresh start to evaluate the current state of the channel and what needs to be done to drive access with each individual patient. If they don’t, it’s inevitable that they’ll see limited prescriber adoption and will over rely on subsidies to keep patients on therapy.  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogH3>{"Patients are consumers and want the same purchase experience they’ve grown accustomed to in other industries - life sciences needs to deliver "}</BlogH3>
        <BlogP>{"Mr. Thomas advised that brands would be wise to treat their target patient population first and foremost as consumers. Thus, they should be developing patient journeys that are responsive to consumer preferences and behavior in 2022 and on par with what consumers experience when making other significant purchase decisions. However, due to bolt on technology and the antiquated approaches of legacy access models, patients often feel like their pharma purchase experience is stuck in the past. This results in frustration, alienation of core constituents, and high rates of medication non adherence that contribute to poor health outcomes. Mr. Paolillo noted that one of the reasons he partnered with Phil to support Impel’s flagship launch in a competitive category was that the platform offered patients frictionless onboarding and refill experience that met patients where they are at - on their smartphone. He noted that “I was looking for a consistent patient experience that fit into their lives and stood out in its simplicity.”  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogH3>{"Brands should have a realistic view of their payer timeline at launch and look for partners that can quickly respond to formulary wins "}</BlogH3>
        <BlogP>{"The panelists agreed that strategic planning is paramount to ensure conversion of market access to covered dispenses - a must for brands looking to optimize their gross to net. Noting the impact that access partners can have on a brand’s overall commercial trajectory, Deepak shared his view that the choice of access partner at launch is perhaps the most important decision a brand has to make. He emphasized that brands would be wise to balance the patient experience with the pursuit of coverage as this can ultimately make or break a brands financials. Further noting that there is a key distinction between an access partner that can deliver on driving pull through and one that will sacrifice the pursuit of coverage for pull through at all cost. Len underscored that if brands want sustainable growth, that they need to have good insight into the channel data to be able to understand when payer lives are going to come on so that they can quickly roll them off free goods into reimbursement. Patients shouldn’t know and don’t care when quickstart ends and coverage begins, but it’s important for brands to be able to make these changes quickly to tightly manage their finances.  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogH3>{"Life sciences companies need holistic pharmacy strategies that recognize that pharmacy incentives can be at odds with the patient & manufacturer"}<b>{" "}</b></BlogH3>
        <BlogP>{"Pharmacies typically have a singular mission and that’s to get patients on therapy noted Ms. Plesnarski. To succeed in today’s environment, brands can no longer rely on the notion that a pharmacy’s job is to help patients get on formulary. Brands should take a more strategic and proactive approach given that many pharmacies are not structured to deliver responsive patient experiences, or often do so at the expense of the manufacturer.  As there are "}<BlogA href="https://info.phil.us/why-the-pharmacy-matters"><u>meaningful differences in the various pharmacy formats</u></BlogA>{", brands would be wise to consider the value that pharmacies provide and whether or not their incentives are aligned with their own. Misaligned incentives have resulted in a growing gap between positioning on formulary and a brand’s ability to convert that access into payer coverage at the point of dispense.Thus, many brands find themselves over subsidizing patient access for much longer than they had anticipated at launch and falling into a "}<BlogA href="/pharma-product-mid-life-cycle-risk/"><u>mid cycle crisis</u></BlogA>{".  "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogH3>{"If you don’t have clear, visible data into patient, physician, and HCP behavior, you won’t be able to adjust your access strategy effectively "}</BlogH3>
        <BlogP>{"“Insights eat data for lunch”, Deepak quipped. All panelists were in agreement that timely data is essential to navigate the complexities of the drug channel in 2022. However, they were frank in suggesting that most access partners fall short in delivering the actionable insights brands need to be able to grow sustainably.  Without insights there is not much a brand can do with the information. Mr. Paolillo underscored the value of data, noting that if you can’t map the data back to the friction points of key stakeholders, there is not much you can do to reduce abandonment and the data doesn’t have much value. He shared that one of the benefits of the Phil platform is that paired data and insights have allowed Impel to adjust business rules around copay and shipping to help patients start and adhere to therapy. The bottom line is that data & insights can be a key difference maker for brands."}</BlogP>
      </BlogLI>
    </BlogOL>
    <BlogH2><b>Unlock the value of your product</b></BlogH2>
    <BlogP>{"Superior clinical trial results do not guarantee commercial success. A robust clinical profile is no longer enough – you need a value proposition supported by real-time data and a go-to-market strategy that optimizes market access and patient and provider engagement. If you are interested in learning more about what the Phil Platform can do for your brand, "}<BlogA href="/contact/"><u>contact us</u></BlogA>{" to get started."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
