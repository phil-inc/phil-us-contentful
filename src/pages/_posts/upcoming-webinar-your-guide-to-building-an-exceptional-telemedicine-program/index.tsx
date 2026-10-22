// Migrated from Contentful resource "upcoming-webinar-your-guide-to-building-an-exceptional-telemedicine-program" (Gatsby node db5d6645-f2f6-5880-9efe-480ed82daa87) on 2026-10-22.
// Source: https://phil.us/page-data/upcoming-webinar-your-guide-to-building-an-exceptional-telemedicine-program/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogLI, BlogP, BlogUL, BlogYouTube } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/upcoming-webinar-your-guide-to-building-an-exceptional-telemedicine-program/";
const TITLE = "On-Demand Webinar: Your Guide to Building An Exceptional Telemedicine Program";
const DESCRIPTION = "Watch this insight-packed webinar to learn how to build an exceptional telemedicine program that drives patient access and brand outcomes, presented by industry experts from Prescribery and Phil";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={[
        articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE }),
        {"@context":"https://schema.org","@type":"VideoObject","name":"Your Guide to Building an Exceptional Telemedicine Program Webinar","description":"Watch this insight-packed webinar to learn how to build an exceptional telemedicine program that drives patient access and brand outcomes, presented by industry experts from Prescribery and Phil","thumbnailUrl":"https://i.ytimg.com/vi/JhIMhzB1yHc/hqdefault.jpg","embedUrl":"https://www.youtube-nocookie.com/embed/JhIMhzB1yHc"},
      ]} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogYouTube videoId="JhIMhzB1yHc" title="Your Guide to Building an Exceptional Telemedicine Program Webinar" />
    <BlogP><br /></BlogP>
    <BlogP>All innovative therapies should consider a telemedicine strategy in order to meet patient demands and drive commercial success.</BlogP>
    <BlogP>{"On this webinar, you'll hear from industry experts at Phil and Prescribery as they share strategies and best practices for building and scaling a powerful telemedicine program that drives transformative brand outcomes.\n"}</BlogP>
    <BlogH3><b>{"Watch this webinar to learn about: "}</b></BlogH3>
    <BlogUL>
      <BlogLI>
        <BlogP>Evolving patient expectations for digitally-driven care</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Key components of a successful telemedicine program</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>How to measure the impact and effectiveness of your telemedicine program</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP><b>{"Why you should watch: "}</b>{"Patient expectations for virtual care have radically changed. As of 2020, "}<BlogA href="https://www.doctor.com/resources/telemedicine?utm_source=medical_economics&utm_medium=PR&utm_campaign=telemedicine_awareness&utm_content=telemedicine_reaources">93% of patients</BlogA>{" agree that they would use telemedicine to manage their prescriptions. In order to keep patients and providers happy, life sciences brands need a strong and successful telemedicine program."}</BlogP>
    <BlogP><b>{"This webinar is suited for: "}</b>Life sciences executives who are interested in building a best-in-class telemedicine program. If this sounds like you, we hope you’ll join us (and bring your insights and questions to the discussion)!</BlogP>
    <BlogH3><b>Take telemedicine to the next level</b></BlogH3>
    <BlogP>{"We've helped novel brands optimize patient access through telemedicine, and we can help your organization do the same. "}<BlogA href="https://info.phil.us/ready-to-learn-more?">Book a call</BlogA>{" to learn more about how Phil can help. "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
