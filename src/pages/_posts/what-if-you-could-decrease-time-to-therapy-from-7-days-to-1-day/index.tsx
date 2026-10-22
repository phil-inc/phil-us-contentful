// Migrated from Contentful resource "what-if-you-could-decrease-time-to-therapy-from-7-days-to-1-day" (Gatsby node 206db6ba-2847-54e7-ae42-8103e9943a1c) on 2026-10-22.
// Source: https://phil.us/page-data/what-if-you-could-decrease-time-to-therapy-from-7-days-to-1-day/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/what-if-you-could-decrease-time-to-therapy-from-7-days-to-1-day/";
const TITLE = "What if you could decrease time to therapy from 7 days to 1 day?";
const DESCRIPTION = "Healthcare tech and existing hub services offer solutions for patients trying to access specialty pharmaceuticals, but they are falling short when it comes to reaching eligible patients";
const OG_IMAGE = "https://phil.us/images/blog/og/5-Resources-Icon.png";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/5-Resources-Icon.png", alt: "" }}>
    <BlogP>{"The major issue with existing hub platforms is that they are based on multiple vendor tech programs that complicate and delay the patient access process. Many existing platforms are expensive to procure, clunky to work with and slow to launch. These factors not only impede patient access, but healthcare provider and manufacturer workflows as well. In the era of automation and same-day deliveries, there is significant room to improve the patient experience. "}</BlogP>
    <BlogP>Connecting the various players in the distribution chain seems to be necessary in order to solve these issues with the aim of improving the patient experience and speeding up time to therapy. This is why Phil was developed, to serve as a digital platform simplifying the patient and physician experience by streamlining administrative requirements to boost patient enrollment and adherence. Additional patient incentives include automated virtual copay programs that support affordability and further help with getting life saving therapies to patients in need. A simple and streamlined experience for all stakeholders directly translates to improved health outcomes for patients.</BlogP>
    <BlogP>{"By working with Phil, manufacturer partners are able to increase specialty pharmaceutical coverage and have more insight and control over their channels. Many leading manufacturers have adopted Phil to dramatically improve patient access and adherence, resulting in an average time to therapy from 7 down to less than two days. "}</BlogP>
    <BlogP>{"Manufacturers interested in learning more about Phil can "}<BlogA href="/pharma/">{"contact us "}</BlogA>for more information.</BlogP>
  </StaticBlogLayout>
);

export default Page;
