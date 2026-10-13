// Migrated from Contentful resource "optimizing-your-field-team-to-maximize-patient-access-webinar" (Gatsby node 45db9ccc-5cd8-5439-9115-4f7c667ab2ef) on 2026-10-13.
// Source: https://phil.us/page-data/optimizing-your-field-team-to-maximize-patient-access-webinar/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogLI, BlogP, BlogUL, BlogYouTube } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/optimizing-your-field-team-to-maximize-patient-access-webinar/";
const TITLE = "On-Demand Webinar: Optimizing Your Field Team to Maximize Patient Access";
const DESCRIPTION = "Watch this webinar to learn how to mobilize your biopharma field team to drive strategic brand outcomes and maximize patient access, presented Phil Inc, Real Endpoints, and Fierce Pharma";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={[
        articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE }),
        {"@context":"https://schema.org","@type":"VideoObject","name":"Optimizing Your Field Team Webinar","description":"Watch this webinar to learn how to mobilize your biopharma field team to drive strategic brand outcomes and maximize patient access, presented Phil Inc, Real Endpoints, and Fierce Pharma","thumbnailUrl":"https://i.ytimg.com/vi/QrLe--am3CQ/hqdefault.jpg","embedUrl":"https://www.youtube-nocookie.com/embed/QrLe--am3CQ"},
      ]} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogYouTube videoId="QrLe--am3CQ" title="Optimizing Your Field Team Webinar" />
    <BlogP>{"Field teams play a critical role in securing patient access.  As a key player in your brand's success, your field team must command a mastery of your brand's strategic goals in order to effectively drive HCP loyalty and maximize patient access. "}</BlogP>
    <BlogP>In this webinar, you’ll learn how to design a modern field team model that mobilizes your field team to drive patient access with leaders from Phil and Real Endpoints.</BlogP>
    <BlogH3><b>{"Watch this webinar to learn about: "}</b></BlogH3>
    <BlogUL>
      <BlogLI>
        <BlogP>Why the traditional sales model should evolve to include a focus on improving coverage and supporting adoption of your preferred channel</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>How to optimize your field team to unlock coverage through effective training, appropriate incentive alignment</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>The criticality of a data-driven approach that equips field teams with real-time insights on the prescription access journey</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogH3><b>{"Accelerate your field team "}</b>transformation</BlogH3>
    <BlogP>{"Ready to drive transformative outcomes through your field team? "}<BlogA href="/optimizing-the-field-team-for-improved-brand-outcomes/">Discover our trusted approach</BlogA>{" for helping brands maximize access, coverage, and loyalty in our new white paper. "}</BlogP>
  </StaticBlogLayout>
);

export default Page;
