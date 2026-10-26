// Migrated from Contentful resource "on-demand-webinar-capturing-actionable-metrics-to-improve-patient-and-brand" (Gatsby node 6b2d6dde-f211-5322-958d-bd0a23d6d78d) on 2026-10-13.
// Source: https://phil.us/page-data/on-demand-webinar-capturing-actionable-metrics-to-improve-patient-and-brand/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogLI, BlogP, BlogUL, BlogYouTube } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/on-demand-webinar-capturing-actionable-metrics-to-improve-patient-and-brand/";
const TITLE = "On-Demand Webinar: Capturing Actionable Metrics to Improve Patient & Brand Outcomes";
const DESCRIPTION = "Watch this webinar to learn about key metrics to track and optimize for an effective brand program that drives strong patient outcomes, with Phil and Syneos Health";
const OG_IMAGE = "https://phil.us/images/blog/og/Webinars.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={[
        articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE }),
        {"@context":"https://schema.org","@type":"VideoObject","name":"Q4 webinar recording","description":"Watch this webinar to learn about key metrics to track and optimize for an effective brand program that drives strong patient outcomes, with Phil and Syneos Health","thumbnailUrl":"https://i.ytimg.com/vi/J3WsdXoq6vg/hqdefault.jpg","embedUrl":"https://www.youtube-nocookie.com/embed/J3WsdXoq6vg"},
      ]} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/Webinars.webp", alt: "" }}>
    <BlogYouTube videoId="J3WsdXoq6vg" title="Q4 webinar recording" />
    <BlogP><br /></BlogP>
    <BlogP>{"Market-leading manufacturers are embracing new models to improve visibility and insight into patient outcomes, provider, and brand performance. Watch this webinar as industry experts from Phil and Syneos Health explore gaps in today’s channel analytics environment, and offer strategic recommendations to help your team effectively leverage data to improve patient outcomes and brand performance. "}</BlogP>
    <BlogH3><b>{"What you’ll learn on the webinar: "}</b></BlogH3>
    <BlogUL>
      <BlogLI>
        <BlogP>{"Unpacking trends, challenges and opportunities for capturing the right channel metrics "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Building a strong data model, including which KPIs to track at the patient, provider, and program level "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Training your brand and field teams to optimize your patient and provider experience "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH3>{"Lead with Insight "}</BlogH3>
    <BlogP>{"Uncover a data-driven approach to optimizing patient and brand outcomes. "}<BlogA href="/demo/">Book a demo</BlogA>{" of the PhilRx Digital Hub to see how we can help you achieve your "}commercial{" goals with full visibility into the access journey."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
