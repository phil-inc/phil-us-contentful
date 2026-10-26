// Migrated from Contentful resource "how-pharmaceutical-manufacturers-can-leverage-phils-technology-to-improve" (Gatsby node beefbff9-7a77-52f6-80ac-149e0189839a) on 2026-10-13.
// Source: https://phil.us/page-data/how-pharmaceutical-manufacturers-can-leverage-phils-technology-to-improve/page-data.json
import React from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { articleSchema } from "utils/seo/schema";
import { StaticBlogLayout, BlogA, BlogLI, BlogP, BlogUL } from "components/Blog/StaticBlogLayout/StaticBlogLayout";

const PATH = "/how-pharmaceutical-manufacturers-can-leverage-phils-technology-to-improve/";
const TITLE = "How Pharmaceutical Manufacturers can Leverage Phil’s Technology to Improve Patient Access to Their Therapies";
const DESCRIPTION = "Patrick Leary, Chief Commercial Officer at Phil, shares how technology can break down many of the barriers patients experience, enabling them to better afford and adhere to their medications.";
const OG_IMAGE = "https://phil.us/images/blog/og/6-Company_News.webp";

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={TITLE} description={DESCRIPTION} path={PATH} type="article" image={OG_IMAGE} />
    <JsonLd data={articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION, image: OG_IMAGE })} />
  </>
);

const Page: React.FC = () => (
  <StaticBlogLayout title={TITLE} hero={{ src: "/images/blog/6-Company_News.svg", alt: "" }}>
    <BlogP>{"Many patients struggle to navigate healthcare effectively, inhibiting access to prescribed therapies. "}<BlogA href="https://www.linkedin.com/in/patrick-leary-47178a1/">Patrick Leary</BlogA>{", Chief Commercial Officer at Phil, shares how technology can break down many of the barriers patients experience, enabling them to better afford and adhere to their medications. "}</BlogP>
    <BlogP><b>{"Q: What are the most significant challenges patients face today when affording the medications their providers prescribe? "}</b></BlogP>
    <BlogP><b>{"Pat: "}</b>{"Over the last few decades, healthcare has shifted toward having patients take on greater financial responsibility for their medical services and products. I believe the impetus was to encourage patients to be better consumers; however, the shift hasn’t manifested in that way. It has often resulted in creating barriers to care. High coinsurance and high deductible health plans result in financial toxicity for many patients. Formulary requirements often dictate that patients use a “preferred” or generic brand to get coverage, even if a provider prescribes a “non-preferred” therapy that they think is best for a specific patient. Ultimately, there has just been a shift of cost from payers to patients, making it difficult for many people to afford the medicine they need to treat their health conditions effectively. "}</BlogP>
    <BlogP><b>{"Q: What role can technology play in easing the patient financial burden related to accessing their prescribed therapies? "}</b></BlogP>
    <BlogP><b>{"Pat: "}</b>{"Technology helps reduce the financial burden in a couple of ways. First, from manufacturers and providers to payers and pharmacies, it can remove many administrative costs associated with processing prescriptions. These cost savings can be passed on to patients. Second, and quite frankly the biggest opportunity, is that technology can ensure that patients take advantage of any available copay programs to reduce out-of-pocket and utilize in-network pharmacies to maximize prescription coverage. Third, it can ensure that all of the administrative hoops required to gain payer approval for prescription coverage are addressed. It used to take an army of people calling payers, pharmacies, and foundations to determine what financial resources were available for patients and how they could take advantage of them. The same was often true related to gaining payer coverage of prescribed therapies. Now, by automating many of these processes, technology can efficiently and effectively funnel patients to the best financial outcome possible for their prescribed therapy. "}</BlogP>
    <BlogP><b>{"Q: Why is speed to therapy important? "}</b></BlogP>
    <BlogP><b>{"Pat: "}</b>{"Speed to therapy is crucial for better outcomes. The faster a patient’s medical treatment initiates, the more likely it will be efficacious and prevent or slow down disease progression. With rare exceptions, that’s universally true for any disease state. Also, when patients must delay getting started – for example, while waiting for prior authorization – they get frustrated, and the likelihood of prescription abandonment escalates. This generally means a diluted patient experience and a reduction of brand loyalty. Another perspective is that of the providers. If they find getting their patient on therapy too time-consuming, they may decide to try another treatment even though it’s not optimal for that patient. "}</BlogP>
    <BlogP><b>{"Q: What hurdles slow the process of getting a patient started on their therapy? "}</b></BlogP>
    <BlogP><b>{"Pat: "}</b>{"There are tremendous hurdles between patients and their prescribed therapies. I refer to them as hoops to jump through. Today, they are more like flaming hoops in the form of formulary and non-formulary lists, prior authorization requirements, and step therapy, where patients must first try and fail certain drugs. Payers have erected significant financial barriers for medications that are not preferred or off formulary. These barriers to therapy access are designed to steer patients away from specific therapies that payers deem too expensive. "}</BlogP>
    <BlogP><b>{"Q: How can pharmaceutical companies proactively increase speed to therapy? "}</b></BlogP>
    <BlogP><b>{"Pat: "}</b>{"They need to make the prescribing process as easy, familiar, and light a lift as possible for providers and patients. That means meeting them where they are by modernizing the process. For patients, send texts with a link. Simplify forms by pre-filling the patient information you already have. For physicians, ensure the prior authorization process works within current workflows and attaches clinical information. Stay within their EHR so they don’t have to learn to navigate another website or portal. Make it as easy to prescribe your brand as a generic, and providers will do it more often. Suppose you can give providers an easy-to-use technology embedded in a familiar process that helps reduce patients’ financial burden. In that case, you will be able to get many more patients started on therapy more quickly. "}</BlogP>
    <BlogP><b>{"Q: Given the correlation between medication adherence and clinical outcomes, how can pharma manufacturers use technology to improve adherence? "}</b></BlogP>
    <BlogP><b>{"Pat: "}</b>{"Manufacturers can use automated communication technology to make staying on therapy as easy as possible. For example: "}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>{"Sending out messages that inform patients of the benefits of the therapy "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Reminding them of how to take their medication and the potential side effects "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>Setting patients up with simple refill management</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Informing of an upcoming refill and giving them the option to change the date "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>{"It’s crucial to communicate with patients in the ways they prefer. Some people want to talk to a live person; others prefer a text reminder. When they sign up for therapy support, enable them to opt-in to receive text reminders. Give them choices to receive emails or phone calls. Then you can set up a cadence around the expectations for a particular therapy. Some nurse communications can be automated while allowing the patient to choose to talk to a nurse if they have additional questions. This approach will retain patients at a much higher level because they know what to expect, are more comfortable with the form of communication, and know they have resources when needed. "}</BlogP>
    <BlogP><b>{"Q: Can you share a real-world example? "}</b></BlogP>
    <BlogP><b>{"Pat: "}</b>{"Absolutely! Phil is designing a technology-driven patient access program with a large pharma manufacturer. The program involves enrolling patients into the company’s nursing support program. We’re automating the front-end enrollment. With a large team of nurses making calls to enroll patients, the enrollment rates had been low. The underlying issue is that when people see an 800 number they don’t recognize, they don’t answer the phone. Our technology interacts with patients in ways they prefer, which results in much higher enrollment rates. Not only are patients happier, but so are nurses. And rather than calling and leaving messages all day, the nurses can focus on what they’re best at – helping patients adhere to their treatment. "}</BlogP>
    <BlogP><b>Q: How does the Phil Platform improve patient access to manufacturer’s brands?</b></BlogP>
    <BlogP><b>{"Pat: "}</b>{"Phil reduces the friction many patients encounter when accessing their prescribed therapy. Our technology does all the things I’ve talked about and more: "}</BlogP>
    <BlogUL>
      <BlogLI>
        <BlogP>{"For prescribers, utilizing the Phil hub platform and pharmacy network is as easy as prescribing a generic – they just go in, select “Phil Rx” in their EHR, and send it to us. "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"For patients, Phil captures all the relevant patient information from the EHR and prefills the electronic benefits verification form. The patient can confirm their insurance information on their mobile browser on their phone – we make that as simple as possible. If they don’t complete the mobile enrollment process (less than 5% of all patients) or want to talk to someone, we offer the opportunity to engage live via phone. They can call or request someone to call them. And this is all done in the patient’s preferred language. "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"If the prescribed therapy needs prior authorization, Phil takes care of it. The platform prefills the information into required PA forms and sends a fax to the prescriber’s office to have them verify, add any missing information, and electronically submit. "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Every approved prescription is routed to a pharmacy that is best suited from a coverage perspective, meaning it has a contract with the payer. This eliminates out-of-network coverages. The platform automatically applies any manufacturer coupons or copay buydowns and collects credit card information to pay any difference. "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Patients receive a text to opt-in to the support services program to receive adherence reminders, clinical messaging, and support. Phil’s enrollment rate is over 90% compared to 30% for prescriptions that go through the traditional retail process. "}</BlogP>
      </BlogLI>
      <BlogLI>
        <BlogP>{"Opted-in patients are kept informed throughout the process, receiving updates about the status of their prior authorization, if they’ll be receiving some meds through a bridge program until approval, what their copay will be, etc. No more frustration because they are left in the dark about what is happening with their prescription. They can also choose to have their medication delivered to their home and to set up automatic shipments. "}</BlogP>
      </BlogLI>
    </BlogUL>
    <BlogP>The bottom line is that by streamlining the whole prescription process, the Phil platform achieves higher patient enrollment, more coverage for enrolled patients, and lower out-of-pocket. This trifecta translates to better medication access and adherence.</BlogP>
    <BlogP><br /></BlogP>
  </StaticBlogLayout>
);

export default Page;
