// Migrated from Contentful resource "on-demand-webinar-delivering-on-direct-to-consumer-exceeding-patient" (Gatsby node 97ada3a5-a7b1-5935-80c5-30315e77c54e) on 2026-10-13.
// Source: https://phil.us/page-data/on-demand-webinar-delivering-on-direct-to-consumer-exceeding-patient/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogLI, BlogP, BlogUL, BlogYouTube } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/on-demand-webinar-delivering-on-direct-to-consumer-exceeding-patient/";
const TITLE = "On-Demand Webinar: Delivering on Direct-to-Consumer: Exceeding Patient Expectations for Virtual Care";
const DESCRIPTION = "Watch this webinar to learn about the building blocks of a direct-to-consumer model for biopharma brands that exceeds patient expectations for virtual care.";
const OG_IMAGE = "https://phil.us/images/blog/og/Untitled_design-34.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={[
        articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE }),
        {"@context":"https://schema.org","@type":"VideoObject","name":"DTC Webinar","description":"Watch this webinar to learn about the building blocks of a direct-to-consumer model for biopharma brands that exceeds patient expectations for virtual care.","thumbnailUrl":"https://i.ytimg.com/vi/dqBQzeea1bU/hqdefault.jpg","embedUrl":"https://www.youtube-nocookie.com/embed/dqBQzeea1bU"},
      ]} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/Untitled_design-34.png", alt: "" }}>
    <BlogYouTube videoId="dqBQzeea1bU" title="DTC Webinar" />
    <BlogP><br /></BlogP>
    <BlogP>{"Over "}<BlogA href="https://rockhealth.com/insights/the-new-era-of-consumer-engagement-insights-from-rock-healths-ninth-annual-consumer-adoption-survey/"><u>75%</u></BlogA>{" of patients have accessed care virtually as of 2024 – the primary reasons being for improved convenience and choice. As patient expectations for digital care continue to rise, the direct-to-consumer (DTC) movement should be top of mind for pharma manufacturers. Watch this webinar with seasoned leaders from Sun Pharmaceuticals and Phil to unpack the evolving landscape of digital care from the perspective of patients and providers, and its potential to improve prescription access, adherence and affordability. "}</BlogP>
    <BlogH3><b>Watch this webinar to</b>{" "}<b>{"learn about: "}</b></BlogH3>
    <BlogUL>
      <BlogLI>
        <BlogP>Key trends in the digital care landscape and the expected impact on patient outcomes, provider engagement, and brand performance</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Analyzing the efficacy of DTC on patient outcomes across therapeutic areas "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Strategies for developing a DTC model that meets patient needs for greater convenience, choice and transparency across their healthcare journey</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"How pharmaceutical manufacturers are introducing successful DTC programs \n"}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH3><b>{"Maximize access, adherence, and affordability "}</b></BlogH3>
    <BlogP>Discover the building blocks of a seamless digital care experience that delights patients and providers.<BlogA href="/demo/">{" Book a demo"}</BlogA>{" of the PhilRx Digital Hub. "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
