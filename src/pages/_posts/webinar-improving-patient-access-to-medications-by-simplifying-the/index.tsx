// Migrated from Contentful resource "webinar-improving-patient-access-to-medications-by-simplifying-the" (Gatsby node 5e731c3e-32cf-5178-8ba8-1b70e70c0634) on 2026-10-13.
// Source: https://phil.us/page-data/webinar-improving-patient-access-to-medications-by-simplifying-the/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogLI, BlogP, BlogUL, BlogYouTube } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/webinar-improving-patient-access-to-medications-by-simplifying-the/";
const TITLE = "On-Demand Webinar: Improving Patient Access to Medications by Simplifying the Prescription Process";
const DESCRIPTION = "Join us for a webinar at the intersection of health tech and patient access. Phil is convening leaders from across the industry to discuss how digital health tools can streamline patient access to medication.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={[
        articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE }),
        {"@context":"https://schema.org","@type":"VideoObject","name":"Improving Patient Access to Medication by Simplifying the Prescription Process Webinar","description":"Join us for a webinar at the intersection of health tech and patient access. Phil is convening leaders from across the industry to discuss how digital health tools can streamline patient access to medication.","thumbnailUrl":"https://i.ytimg.com/vi/njIHWJ6BmB8/hqdefault.jpg","embedUrl":"https://www.youtube-nocookie.com/embed/njIHWJ6BmB8"},
      ]} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogYouTube videoId="njIHWJ6BmB8" title="Improving Patient Access to Medication by Simplifying the Prescription Process Webinar" />
    <BlogP>{"\nTune in as panelists will discuss the biggest challenges in the prescription process and implications to patients, as well as opportunities to improve medication access using technology.\n\nOn this webinar, you will learn about:"}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>Current gaps in the patient access journey and implications</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Opportunities to improve medication access for patients</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>How technology can streamline the prescription process</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Digital health tools that can be leveraged in the healthcare journey; and</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>How simplifying access to medication will drive improved health outcomes</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP><br /></BlogP>
  </StaticBlogLayout>
);

export default Page;
