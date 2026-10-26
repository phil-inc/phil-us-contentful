// Migrated from Contentful resource "meet-neil-dean-director-of-product-management-at-phil" (Gatsby node beb9bee8-c51e-5d1c-81df-de06685d2d54) on 2026-10-26.
// Source: https://phil.us/page-data/meet-neil-dean-director-of-product-management-at-phil/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogHR, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/meet-neil-dean-director-of-product-management-at-phil/";
const TITLE = "Meet Neil Dean, Director of Product Management at Phil";
const DESCRIPTION = "Meet Director of Product Management at Phil, Neil Dean, and learn about his passionate for helping improve lives and patient outcomes through optimizing PhilRx";
const OG_IMAGE = "https://phil.us/images/blog/og/Employee_Spotlight_-_Blog_Photos-5.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/Employee_Spotlight_-_Blog_Photos-5.webp", alt: "" }}>
    <BlogP>{"Neil Dean joined our team as Director of Product Management because he wanted the opportunity to directly impact lives. In this employee spotlight, Neil shares what he likes most about his role, how he approaches challenges, and a project he’s passionate about.  "}</BlogP>
    <BlogH3><b>{"Please tell us a little bit about your role at Phil. "}</b></BlogH3>
    <BlogP>As Director of Product Management, I oversee Phil's patient, healthcare provider, and manufacturer experiences. From the moment the doctor writes a script to PhilRx and the patient signs up for support through the PhilRx Digital Hub, my job is to work closely with our internal teams to ensure a smooth and efficient medication access process. I also need to ensure our clients understand how the process is working and what actions they can take to improve it.</BlogP>
    <BlogH3><b>What inspired you to join the Phil team?</b></BlogH3>
    <BlogP>{"I was excited to have the opportunity to apply the product management and sales enablement skills from my previous work experience to make a direct impact on people’s lives. The timing was perfect to take on the level of problem-solving and intensity required for this role. These factors, and the fact that I found Phil’s track record of success mind-blowing, made the decision to join the team easy.   "}</BlogP>
    <BlogH3><b>{"What do you like most about the work we do here? "}</b></BlogH3>
    <BlogP>It's twofold. From a conceptual standpoint, I really like that everything we do is in service of the patient. Even when we're figuring out ways to improve our clients’ experience, our ultimate goal is to make a difference in patients' lives and health outcomes by helping them access their prescribed therapies. That's the idea behind everything we do, and it's really core to the company's principles. From a day-to-day standpoint, we work in an immensely challenging space, which appeals to me. And by that, I mean it's very fast-paced, kind of gritty. Everything's not perfectly scaled out and pretty, so it's easy to see your own impacts and to be able to be in the fray.</BlogP>
    <BlogH3><b>Could you describe a recent project at Phil you are passionate about?</b></BlogH3>
    <BlogP>{"I'm working to automate our data entry process, which sounds unsexy from a project standpoint. However, from the perspective of the pharmacy tech, we're helping them spend more time helping patients face-to-face by automating daily repetitive tasks. I'm passionate about this because it builds on Phil's mission by empowering people to allocate their time in more impactful ways.  "}</BlogP>
    <BlogP>The other aspect of this project I'm proud of is how we ramped it up rapidly and collaboratively. We worked closely with Engineering and the PhilRx pharmacy team - the whole process of figuring out and executing what we needed to do came together nicely.</BlogP>
    <BlogH3><b>What is the biggest challenge that you’ve faced since joining the team?</b></BlogH3>
    <BlogP>{"I've never worked in pharma before, and the space we work in is quite complex. Personally, the biggest challenge has been trying to learn a lot as I go. One of the principles at Phil is that the best way to learn is by doing. That means getting comfortable with being uncomfortable and fighting through that learning curve. "}</BlogP>
    <BlogP>Paradoxically, the challenge of learning as I go while making an impact is one of the things I find the most thrilling. It's demanding but super rewarding when you pull it off. One thing I'm getting out of this is learning how to keep a level head throughout what could otherwise be overwhelming and knowing everything else will feel much easier later down the line.</BlogP>
    <BlogH3><b>On a personal note, what do you enjoy doing outside of work?</b></BlogH3>
    <BlogP>Spending time with my family has become one of the most rewarding things I do. I have a 2 ½-year-old daughter and a son on the way. This definitely puts life into a new context. Aside from family time, I really enjoy running and swimming, mostly open-water swimming. And beekeeping is another hobby that I enjoy.</BlogP>
    <BlogH3><b>What’s something that you’ve always wanted to try or learn?</b></BlogH3>
    <BlogP>I want to learn Korean. My wife is Korean, and when we first started getting serious, I promised her grandmother that I would learn the language. So far, I’ve taken zero steps toward it, so that goal is dangling in front of me.</BlogP>
    <BlogHR />
    <BlogP>{"Interested in joining the Phil team? "}<BlogA href="/company/#who-we-are">Check out our company page</BlogA>{" to discover our exciting job opportunities."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
