// Migrated from Contentful resource "meet-molly-fields-director-of-patient-support-at-phil" (Gatsby node 2291a094-fa1a-5ae5-9ef5-2fa7edf12732) on 2026-10-26.
// Source: https://phil.us/page-data/meet-molly-fields-director-of-patient-support-at-phil/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH2, BlogHR, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/meet-molly-fields-director-of-patient-support-at-phil/";
const TITLE = "Meet Molly Fields, Director of Patient Support at Phil";
const DESCRIPTION = "Meet Director of Patient Support at Phil, Molly Fields, and learn about how she helps biopharma manufacturers deliver an unparalleled patient experience";
const OG_IMAGE = "https://phil.us/images/blog/og/03.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/03.webp", alt: "" }}>
    <BlogP>{"The next interview in our Employee Spotlight series is with Molly Fields, Director of Patient Support at Phil. We hope you enjoy learning more about Molly and her impressive experience in the health tech industry. "}</BlogP>
    <BlogH2><b>Tell me a little bit about yourself</b></BlogH2>
    <BlogP>I'm from San Diego, Carlsbad specifically, and I have 7 brothers and sisters. I moved to Arizona in 2005 to work at a startup in the audio visual industry, and really enjoyed my time there. It allowed me to grow my operational skills and discover that I love finding process efficiencies and opportunities to decrease the cost of doing business by improving the systems through automation. I'm really dedicated to work. I am probably more dedicated than I should be, but it is in my blood. Aside from work, I also take my family and friends very seriously - I'm a very passionate person. I have a husband and 2 dogs, and while my husband and I have only been married for about 3 months, we've been together for 10 and a half years.</BlogP>
    <BlogH2><b>You were in AV before your current role in the startup space. What inspired you to join Phil?</b></BlogH2>
    <BlogP>After I left that job, I went to another startup in an adjacent industry for 2 years. A recruiter found my resume online and contacted me about a great opportunity in the health tech space. My first job was at a medical device startup, and I really loved it. I love startup companies. So when I learned more about the work that Phil was doing in the healthcare space, I was really interested. Plus, reading why Deepak started the company and the purpose of Phil really resonated with me in a way that I hadn't experienced since my first job in health tech.</BlogP>
    <BlogH2><b>{"Can you tell us a little bit about what you do at Phil? "}</b></BlogH2>
    <BlogP>Absolutely! I am the Director of Patient Support at Phil, which is currently a fast-growing, 40 person team that specifically works with patients regarding their prescription orders. I'm responsible for the functions within the patient support team. The opportunity to lead a team that works to ensure our patients have the support and resources is very rewarding. I also collaborate closely with other departments across the organization such as our product team, to improve our system functionality and efficiency to better our patient experience.</BlogP>
    <BlogH2><b>What's your favorite part about your job?</b></BlogH2>
    <BlogP>{" The people! Everybody that works for Phil is great. My team is equally fun and hard-working. I feel very grateful for the opportunity to mentor and shape the people on my team, and help them grow in their careers. I really love working at Phil. I love what we do. I love the challenge behind it. I love my coworkers. I wake up in the morning and want to work - that's the sign of a good work environment!"}</BlogP>
    <BlogH2><b>What do you find challenging about your job?</b></BlogH2>
    <BlogP>{"What I find challenging about my job is similar to what I find interesting and fun. Building our team and fostering relationships, offering great training and support to make sure they know why they're doing the things they're doing, while keeping everyone motivated all within a remote work environment is challenging. "}</BlogP>
    <BlogH2><b>{"How does your team interact with patients specifically, and any outcomes or excitement that the team gets from those types of interactions? "}</b></BlogH2>
    <BlogP>{"My team is excited when they help the patient get their prescription. Sometimes, the patient will reach out and say that their order has been delayed, and our team is able to identify why the order isn’t processing, and move the prescription to the next step. When a particular patient has experienced issues in the past, our team will set up a calendar reminder, and follow up on the refill to prevent issues and ensure the patient is having the best possible experience with Phil. I think our biggest triumph is when the patient doesn't know what's happening with their order, perhaps because they don't understand technology or they're not comfortable with the website, and our team is able to can make a phone call or send an email that offers a really helpful explanation of what's happened and what's going to happen next. It may sound small, but that effort makes a huge difference. "}</BlogP>
    <BlogH2><b>What do you like to do outside of work?</b></BlogH2>
    <BlogP>Pretty much anything outdoors. I'm not a huge water person, but besides that, I enjoy hiking, camping, and anything else we can take the dogs to do. Also, I love skydiving. It is an expensive habit, so we only go a couple of times a year, but that's actually how we got married!</BlogP>
    <BlogHR />
    <BlogP>{"Curious "}about{" "}joining{" the Phil team? "}<BlogA href="/company/#who-we-are">Check out our company page</BlogA>{" to discover our exciting job opportunities."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
