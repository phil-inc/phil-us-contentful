// Migrated from Contentful resource "meet-abhyuday-polineni-director-of-engineering-at-phil" (Gatsby node 722562c4-bd4f-5ded-bef8-3dcc4fe49ea5) on 2026-10-26.
// Source: https://phil.us/page-data/meet-abhyuday-polineni-director-of-engineering-at-phil/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogH3, BlogHR, BlogP } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/meet-abhyuday-polineni-director-of-engineering-at-phil/";
const TITLE = "Meet Abhyuday Polineni, Director of Engineering at Phil";
const DESCRIPTION = "Meet Director of Product Management at Phil, Neil Dean, and learn about his passionate for helping improve lives and patient outcomes through optimizing PhilRx";
const OG_IMAGE = "https://phil.us/images/blog/og/Employee_Spotlight_-_Blog_Photos-6.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/Employee_Spotlight_-_Blog_Photos-6.webp", alt: "" }}>
    <BlogP>{"In this Employee Spotlight, Abhy, our Director of Engineering, shares a behind-the-scenes look at his role in helping to shape the PhilRx Digital Hub to impact health outcomes, along with the challenges and successes that come with ensuring that the platform runs smoothly. "}</BlogP>
    <BlogH3><b>{"Please tell us a little bit about your role as Director of Engineering at Phil. "}</b></BlogH3>
    <BlogP>{"I lead and manage our platform, and the team that handles everything that happens across the prescription journey, from when a prescription is written by the healthcare provider to Phil until it is shipped out to the patient. My team makes up the layer that supports the core infrastructure, interfacing with all stakeholders to ensure the platform runs smoothly and prescriptions are shipped on time. This includes all our external-facing applications, like the patient and provider portals, as well as the internal operations tools, such as the operations dashboard, dispensing pharmacy integrations, and other fulfillment-related functionality.  "}</BlogP>
    <BlogH3><b>What do you enjoy most about working here?</b></BlogH3>
    <BlogP>{"Before Phil, I worked for several big companies, including Oracle and Microsoft. I was right out of college, and it was interesting to work on complex technical problems. After a couple of years, I wanted to work in a more intimate setting where the feedback loop with end users was tighter. I met Deepak Thomas and Puran Singh, Phil’s co-founders, and was sold on how they were approaching this complex problem of simplifying patient access to prescription medications. "}</BlogP>
    <BlogP>It was kind of a leap of faith – Phil was a startup in its early stages, but I have not had one regret since I joined. I’ve been here for nearly seven years, and it’s been a somewhat organic evolution for both the company and myself. Phil was the perfect blend of what I was looking for. We solve super complex problems, such as how to dispense prescriptions with a short turnaround time without having control over the entire value chain. It’s an ambiguous domain, and a lot of things can break. But at the same time, every line of code I write immediately impacts the people involved.</BlogP>
    <BlogH3><b>What is the most challenging part of your job?</b></BlogH3>
    <BlogP>What I love about the job can also be the most challenging, especially when the focus shifts toward operational issues and away from solving underlying engineering problems. The engineering team is like connective tissue for all stakeholders - patients, providers, manufacturers, pharmacies, and operations. Everyone plugs into the same platform, which needs to be orchestrated perfectly so that prescriptions seamlessly flow through the system. If something goes wrong, we must get that prescription back on track. One course of action can affect another stakeholder's experience, so we need to ensure that the platform gives everyone the right benefits and incentives. Another aspect that gets interesting and challenging is trying to stay connected to the real-world impact in the somewhat detached environment of software engineering.</BlogP>
    <BlogH3><b>{"Can you share a recent project you are passionate about? "}</b></BlogH3>
    <BlogP>We recently completed a re-architecture of the platform. We started it about two years ago when we realized that the way we were building things as a pure startup wouldn't scale once we gained additional volume and started supporting more clients. We had to rethink our approach, considering our core functionalities and how to make the platform a more configuration-driven system where engineers don't have to get involved daily in handling different stakeholder requests.</BlogP>
    <BlogP>With our new model, we drastically simplified the communication between our departments by having everyone working from the same source of truth. We also boosted the engineering team’s productivity significantly, freeing up our time to focus on scaling up the platform and addressing other technical problems.</BlogP>
    <BlogH3><b>On a personal note, what do you like to do outside of work?</b></BlogH3>
    <BlogP>{"I like traveling, reading books, and spending time with family. So outside of work, I mostly spend time in one of those three areas. Recently, I went with my family on a 10-day road trip through Idaho, Colorado, Utah, and Wyoming. I’m planning a similar trip this year.  "}</BlogP>
    <BlogH3><b>What’s something that you’ve always wanted to try or learn?</b></BlogH3>
    <BlogP>I tend to be more of a reader, but I've always wanted to do something more physical with my hands. Recently, I decided to fix up my front yard, so I am learning how to excavate, level, and eventually add turf. There's been a learning curve… definitely different from writing code. I thought I'd be done in two weekends, but it's taking a lot longer than I expected. I'm enjoying the exercise and find it gives my family another opportunity to do something together.</BlogP>
    <BlogHR />
    <BlogP>{"Interested in joining the Phil team? "}<BlogA href="/company/#who-we-are">Check out our company page</BlogA>{" to discover our exciting job opportunities."}</BlogP>
  </StaticBlogLayout>
);

export default Page;
