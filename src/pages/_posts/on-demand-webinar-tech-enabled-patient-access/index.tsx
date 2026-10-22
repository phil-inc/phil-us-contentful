// Migrated from Contentful resource "on-demand-webinar-tech-enabled-patient-access" (Gatsby node 371bc4ca-47de-5fe9-890c-c0e517f1a4cc) on 2026-10-13.
// Source: https://phil.us/page-data/on-demand-webinar-tech-enabled-patient-access/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogH3, BlogLI, BlogP, BlogUL, BlogYouTube } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/on-demand-webinar-tech-enabled-patient-access/";
const TITLE = "On-Demand Webinar: Tech Enabled Patient Access";
const DESCRIPTION = "Watch this webinar to discover key strategies and best practices for accelerating patient access through technology from seasoned life sciences leaders.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={[
        articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE }),
        {"@context":"https://schema.org","@type":"VideoObject","name":"Tech Enabled Patient Access Webinar","description":"Watch this webinar to discover key strategies and best practices for accelerating patient access through technology from seasoned life sciences leaders.","thumbnailUrl":"https://i.ytimg.com/vi/AjiVgB09Tb4/hqdefault.jpg","embedUrl":"https://www.youtube-nocookie.com/embed/AjiVgB09Tb4"},
      ]} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogYouTube videoId="AjiVgB09Tb4" title="Tech Enabled Patient Access Webinar" />
    <BlogP><br /></BlogP>
    <BlogP>{"Technology is the driving force behind transforming patient access. "}</BlogP>
    <BlogP>On this webinar, you'll discover trusted strategies and best practices for building a technology-enabled access strategy from seasoned leaders from Phil, Merck, Impel, Syneos Health, and Fierce Pharma.</BlogP>
    <BlogH3><b>{"Watch this webinar to learn about: "}</b></BlogH3>
    <BlogUL>
      <BlogLI>
        <BlogP>Why simplifying the patient access experience is critical to realize strong results</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>What brands should look for in a commercialization partner</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>How various pharmacy models impact a brand's strategic priorities</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>What data is needed to respond the complexities of utilization management</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH2><b>Transform your Patient Access Experience</b></BlogH2>
    <BlogP>{"PhilRx is a seamless patient access platform designed to create a best-in-class experience for patients and providers. "}<BlogA href="https://info.phil.us/ready-to-learn-more?">Book a call</BlogA>{" to learn more about how Phil can help your pharma brand thrive. "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
