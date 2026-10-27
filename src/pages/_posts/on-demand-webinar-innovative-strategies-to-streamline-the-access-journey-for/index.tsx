// Migrated from Contentful resource "on-demand-webinar-innovative-strategies-to-streamline-the-access-journey-for" (Gatsby node 59d10e67-576e-5c14-9bdd-1a4b709e5421) on 2026-10-13.
// Source: https://phil.us/page-data/on-demand-webinar-innovative-strategies-to-streamline-the-access-journey-for/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogLI, BlogP, BlogUL, BlogYouTube } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/on-demand-webinar-innovative-strategies-to-streamline-the-access-journey-for/";
const TITLE = "On-Demand Webinar: Innovative Strategies to Streamline the Access Journey for Patients & Providers";
const DESCRIPTION = "Watch this webinar to learn strategies for life sciences execs to improve the patient and provider experience through streamlining the medication access journey";
const OG_IMAGE = "https://phil.us/images/blog/og/Untitled_design-34.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={[
        articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE }),
        {"@context":"https://schema.org","@type":"VideoObject","name":"Q3 webinar recording","description":"Watch this webinar to learn strategies for life sciences execs to improve the patient and provider experience through streamlining the medication access journey","thumbnailUrl":"https://i.ytimg.com/vi/_E07EMswXoY/hqdefault.jpg","embedUrl":"https://www.youtube-nocookie.com/embed/_E07EMswXoY"},
      ]} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/Untitled_design-34.webp", alt: "" }}>
    <BlogYouTube videoId="_E07EMswXoY" title="Q3 webinar recording" />
    <BlogP>{"\n"}</BlogP>
    <BlogP>{"Putting patients and providers at the heart of every brand initiative is top of mind for all pharma teams. But, many manufacturers have large gaps and friction points in their access journey that are creating high barriers to access, engagement, and adherence. "}</BlogP>
    <BlogP>{"On this webinar, dive into trusted strategies and best practices for designing a medication access experience that drives patient outcomes and provider engagement based on insights from Phil’s diverse portfolio of life sciences brands. "}</BlogP>
    <BlogH3><b>{"Watch this webinar to learn about: "}</b></BlogH3>
    <BlogUL>
      <BlogLI>
        <BlogP>Identifying the most prevalent challenges affecting today’s patients and providers</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Adopting strategies to streamline every stage of the medication access journey</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Empowering your team with insights to boost access, engagement, and adherence "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH3><b>{"\nElevate Your Patient and HCP Experience"}</b></BlogH3>
    <BlogP>Create a seamless access journey that empowers your team to effectively measure and proactively drive success.<BlogA href="/demo/">{" Book a demo"}</BlogA>{" of the PhilRx Digital Hub. "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
