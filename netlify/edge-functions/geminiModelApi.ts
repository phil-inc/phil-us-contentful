import type { Config } from "https://edge.netlify.com";

const geminiHandler = async (request: Request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        Allow: "POST",
      },
    });
  }
  const GEMINI_MODEL = "gemini-2.5-flash";
  const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

  if (!GEMINI_API_KEY) {
    const error = "Failed to initiate function. GEMINI_API_KEY is undefined.";
    console.error(error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  console.log("Starting to origin check");
  let origin: string;
  try {
    origin =
      request.headers.get("origin") ||
      new URL(request.headers.get("referer") || "").origin ||
      "";
  } catch (err) {
    console.error("Unable to determine request origin from headers", err);
    origin = "";
  }

  const allowedOrigins = Deno.env.get("ALLOWED_ORIGINS")?.split(",") || [];
  if (!allowedOrigins.includes(origin)) {
    return new Response(JSON.stringify({ error: "Not allowed" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
      },
    });
  }

  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
  try {
    const body = await request?.json?.();
    console.log("Request body:", body);

    const SYSTEM_PROMPT = `You are a helpful AI assistant for a company called PHIL. Your task is to answer the user's question based ONLY on the provided content below. Do not use any external knowledge. If the answer cannot be found within the content, you MUST respond with "Get in touch with PHIL for more information: https://phil.us/demo".
      Here is the content:
      ---
      ${PROVIDED_CONTENT}
      ---
      `;

    const payload = {
      contents: [{ parts: [{ text: body?.question || "" }] }],
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
    };
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log("response:", response);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "API request failed" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const data = await response.json();
    console.log("Gemini API response data:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "cache-control": "public, s-maxage=120",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export default geminiHandler;

export const config: Config = {
  path: "/api/get-gemini-chat",
  cache: "manual",
};

const PROVIDED_CONTENT = `
## PHIL ‘Direct-To-Patient’

PhilRx Direct-To-Patient Page Content

PhilRx offers an integrated digital hub, direct-to-patient (DTP) platform, pharmacy network, and script-level data & insights to help brands take patient outcomes and economic performance to the next level. Through alternative channel approaches – including an integrated digital hub and direct-to-patient – PhilRx offers a highly configurable, end-to-end access solution that drives the commercial success of branded retail and specialty-lite products across therapeutic areas.

### DIRECT-TO-PATIENT

Expand Patient Access With an E-Commerce-Like Experience

Meet patients where they are with a DTP channel that delivers the convenient, transparent, digital-first experience they expect from modern consumer services. PHIL's proven DTP platform delivers a comprehensive and flexible solution – whether you need a complete channel-in-a-box or seamless integration with existing partners.

Results:

-   2x Pull-Through vs. Other Channels
    
-   4x Net Sales vs. Other Channels
    
-   5x Refill Adherence vs. Other Channels
    

Learn how PHIL's DTP solution helped a specialty-lite brand maximize formulary wins to reach 60% covered dispenses, achieving sustainable commercial performance.

CTA: Read the DTP Success Story →

Launch a compliant, commercially viable DTP program with PHIL's rapid-deployment platform:

-   Choose your implementation approach
    
    -   With either a complete channel-in-a-box solution or seamless integration with your existing partners
        
-   Fast-track implementation in 60-90 days
    
    -   Unlike fragmented solutions requiring months of vendor coordination, PHIL's integrated platform accelerates time-to-launch
        
-   Optimize beyond cash-only models
    
    -   By balancing affordability and commercial sustainability through coverage-first workflows with strategic cash alternatives
        
-   Maintain program flexibility and control
    
    -   Through customizable business rules, white-label options, and adaptable patient experiences tailored to your brand
        
-   Ensure compliance and privacy
    
    -   With safeguards that prevent patient steerage, uphold evolving regulatory standards, and support valuable patient journey insights
        
-   Leverage proven DTP expertise
    
    -   With full-stack capabilities that eliminate the handoffs and friction that erode patient trust
        
-   Scale with enhanced GTN economics
    
    -   That protect pricing integrity while expanding patient access and driving brand performance through intelligent dispense management and coverage optimization
        

CTA: See PHIL’s DTP solution in action →

Leadership Perspective

"Having spent several years perfecting integrated DTP models with our pharma partners, we've learned that flexibility and program expertise matter more than rigid playbooks. Every brand's access challenges are different, and successful solutions must adapt accordingly."

– Deepak Thomas, CEO & Founder, PHIL

DTP Insights

CASE STUDY

-   From Launch Challenge to Market Leadership: A DTP Success Story
    
-   Discover how a specialty-lite brand overcame complex access barriers by building an integrated telemedicine channel that balanced patient convenience with commercial sustainability and regulatory compliance.
    
-   → Read the Case Study
    

THOUGHT LEADERSHIP

-   Pharma Direct-to-Patient: From Experiment to Imperative
    
-   Get expert insights on program design fundamentals, compliance requirements, and proven implementation strategies from industry leaders who've successfully navigated DTP program launches.
    
-   → Read the White Paper
    

THOUGHT LEADERSHIP

-   Delivering on Direct-to-Consumer: Exceeding Patient Expectations for Virtual Care
    
-   Join seasoned leaders from Sun Pharmaceuticals and PHIL as they unpack how the DTC movement is reshaping digital care expectations and explore proven strategies for maximizing access, adherence, and affordability across therapeutic areas.
    
-   → Watch On-Demand Webinar
    

### DTP Thought Leadership Deck - Master \[Marketing Partners\].pdf

Page 1 PHIL

Building a Scalable Direct-to-Patient Platform

Strategic Framework for Digital Engagement, Telemedicine, Patient Experience, Fulfillment, & Financials

Page 2 Pharma companies are under pressure to rethink patient access

Underlying trends are driving the industry to a tipping point, while new competitive and regulatory pressures are accelerating that change.

-   Many classes of drugs are facing complex prior authorization requirements.
    
-   Rising channel costs
    
-   Increasing consumerism
    
-   Eli Lilly, Pfizer, and Novo Nordisk, have all launched direct-to-patient programs.
    
-   Competitive pressure
    
-   Administration actions
    
-   Intensifying access barriers
    
-   Over 40% of a drug costs goes to intermediaries, such as PBMs and wholesalers.
    
-   President Trump demanded that 17 drugmakers offer DTC channels by September 29th, 2025.
    
-   Consumers are choosing healthcare options that offer a better experience.
    

Page 3 What Does a Successful Direct-to-Patient Experience Require?

-   Integrated Digital Patient Experience
    
    -   Direct-to-Patient channel creates e-commerce like expectations for patients. Brands need partners that can provide a convenient, affordable, and integrated experience.
        
-   Seamless Multi-Vendor Patient Navigation via Full-Spectrum Data
    
    -   One patient, one dataset maxim. Understanding patient behavior in aggregate, even though the experience is delivered thru multiple vendors is key to continuous improvement.
        
-   Patient Affordability & Economic Viability
    
    -   DTP channel opens up access to new patients who are less likely to use traditional channels.
        
    -   Channel should deliver high patient volume and superior GTN economics vis-a-vis traditional channels while offering patient choice of cash pay vs. insurance support.
        
-   Compliance Guardrails
    
    -   Compliance is not a barrier to understanding the entire patient journey but rather provides the necessary safeguards to do so in a manner that complies with applicable laws.
        

Page 4 Key Building Blocks of a Direct-to-Patient Channel

Pharma has options for both channel-in-a-box solutions (all blocks) or individual vendors.

-   Digital Marketing Funnel
    
    -   Create and drive demand into patient funnel.
        
    -   Provide clear call to action (TV ad that calls out website or text phone number).
        
    -   Target the right demographics using right mix of online vs. traditional media.
        
-   Telemedicine Platform
    
    -   Qualify patients for appropriate medication in a compliant manner.
        
    -   Integrate seamlessly with downstream hub and fulfillment partner.
        
    -   Ensure long-term patient adherence.
        
-   Hub & Fulfillment Partner
    
    -   Ensure patient receives prescribed brand; enable Pharma to set business rules to manage GTN.
        
    -   Secure payer coverage wherever possible without compromising patient experience.
        
    -   Manage patient education and care for long-term adherence.
        

Page 6 Creating an Integrated Digital Patient Experience is Critical to Meeting Patients as Consumers

-   The UX Case for DTP
    
    -   Patients are more likely to get on therapy if the experience mimics how they buy most other consumables.
        
    -   42% of US population is Gen Z + millennials (growing to >50% over next 2-3 years).
        
    -   E-commerce is their native buying experience.
        
    -   Brands now have a choice to make: Stake success on ~50% Americans learning how to use a prior-generation channel to access your products? Or meet patients where they are?
        
-   Patient Expectations
    
    -   Today's highest-performing direct-to-consumer model looks like: 1. Scroll on instagram, 2. Click thru to website + click "buy", 3. Get order tracking email, 4. Manage future deliveries.
        
    -   Expected experience is low-friction, integrated, and addresses top 2 buying considerations: price and convenience.
        
    -   This experience has conditioned the consumer to expect a unified experience, even if multiple vendors are involved (social media for ads, shopify for brand website, stripe for payments, FBA for fulfillment, etc.).
        
    -   The consumer clicks thru, reads up about the product and clicks buy, their demographics/address and often CC is auto-populated.
        
-   Today's Direct-to-Patient
    
    -   Current attempts at DTP don't compare favorably with this experience.
        
    -   Ads that land on pages that have little useful information.
        
    -   No CTA (call to action button).
        
    -   Entered information does not carry over (to telemedicine, hub or fulfillment), confusing as to who to contact for support.
        
    -   So we're not talking about just taking a traditional model and applying a website on top.
        
    -   That has been tried and doesn't clear the expectation bar. At best it is a high-friction, high-effort, high-frustration, DIY project.
        
    -   In the e-commerce world, every extra bit of information you're asking your customer to enter increases abandonment substantially.
        

Page 7 Brands should have sufficient data to be able to follow patients through entire journey across all vendors.

-   Key Value Proposition for Data
    
    -   Identify experience bottlenecks - What part of the funnel has the most abandonment?
        
    -   Enhance channel/ad targeting - Which age groups convert best; which perform worst.
        
    -   Coordinate patient journey across multiple vendors.
        
    -   Identify therapy interruptions due to vendor handoff gaps and enable vendor collaboration to resolve.
        
-   With siloed data, brands may draw inaccurate conclusions and invest poorly.
    
-   Alice (21): Instinctively clicks ad, but abandons at checkout.
    
-   Bob (54): Hardly clicks ads online, but when he does, he is ultimately able to pay and start on therapy.
    
-   Bob is more expensive to acquire (you need to show him multiple ads before he will engage), but ultimately more valuable to the brand.
    
-   Without data connecting Ad to Dispense, Brands may invest in Alice instead of Bob as the target profile.
    

Page 8 Get access to new patients, improve conversion rates, and profitability - with multiplicative impact to GTN.

-   Current State: High spend, low conversion
    
    -   No attribution: TV/digital ad spend is expensive and difficult to attribute to prescription sales, so it's hard to accurately identify if this channel is performing with positive ROI.
        
    -   Leaky and disjoint UX, weak call to action: Particularly problematic is the lack of CTA for TV and digital ads - even if they reach new audiences, they can't convert (i.e., poor unit math).
        
    -   Cash-only Pricing: All cash price and no insurance use blunts GTN impact for brands while also creating a high price barrier for patients, with many being unable to afford/start therapy.
        
-   Key P&L Considerations
    
    1.  NBRx Volume: Create access to new patient cohorts who are less likely to go to a doctor's office for this drug, but would get on therapy if experience mimics e-commerce purchases.
        
    2.  Top-line impact: DTP should drive meaningful share of patient volume, otherwise it will not take. Top DTP brands see >60% of share from DTP channel for a well-executed program.
        
    3.  Unit margin: Fully-loaded DTP (with cost of acquisition) should perform better than traditional fully-loaded brick-and-mortar channel (with cost of field team).
        
    
    -   Why?
        
        -   a. Get current TV/digital ad spend to perform better by providing a direct call-to-action.
            
        -   b. High control on spend, without fixed cost overhead (salaries); short iteration cycles.
            
        -   c. Additional potential benefits from moving TV ad spend to digital channels as well.
            

Page 10 Deep-Dive into the Role of Digital Marketing

-   Campaign Design + Placement
    
    -   Partner closely with Pharma Agency of Record for creative.
        
    -   E-commerce style digital ad placements.
        
    -   Omni-channel campaign approach.
        
-   Patient Ad Engagement
    
    -   Patient re-targeting to drive continued brand engagement.
        
    -   Brand website design to answer common patient conviction questions (e.g., condition quizzes).
        
    -   Detailed conversion funnel tracking.
        
    -   Iteration to optimize ad spend ROI.
        
-   Patient Research + Conviction
    
    -   Seamless transition from brand website to telemed vendor.
        
    -   Clear call to action to translate patient conviction into visit ("get an Rx online").
        

Page 11 Key Brand Criteria/Questions for Telemedicine Platforms

-   Vendor Type & Incentives
    
    -   What type of vendor do I want to partner with?
        
        -   Option 1: Manufacturer-focused vendor that integrates into brand website (e.g., Populus, BeyondMD).
            
        -   Option 2: Pay-to-play vendors where brands pay for higher placement / visibility for patients actively seeking care (e.g., LifeMD, Cove, Ro, Hims/Hers).
            
    -   What are their incentives and how does that overlap with my brand?
        
-   Core Capabilities
    
    -   Are they able to create a seamless digital experience for the patient from entry questionnaire to appointment to post-visit instructions?
        
    -   Can they support obtaining insurance coverage (e.g., PA submission)?
        
    -   Will they customize the experience to my brand's/patient's specific needs?
        
-   Compliance
    
    -   Can the partner create a seamless experience for patients while meeting compliance requirements (often through customization capability)?
        
-   Controls
    
    -   Does the vendor have strong guardrails on defining when a prescription is appropriate for an incoming patient?
        

Page 12 Why do Hub and Fulfillment Channels Matter?

-   Enhance Brand Control on Gross-to-Net / Patient Affordability
    
    -   Dispense Management: Ensure patient receives brand that was prescribed by HCP while ensuring patients receive the best available and expected medication price.
        
    -   Insurance Coverage: Maximize PA submissions + ensure highest plan coverage in fulfillment network (i.e., ability to dispense covered scripts at scale) when needed to ensure patient affordability and brand GTN.
        
    -   Economics: Pricing model aligned to economize program costs.
        
-   Continue Integrated Patient Experience Through Medication Delivery
    
    -   Provide digital-first channel of patient communication, with transparency throughout patient journey - onboarding, benefits verification, dispense, and adherence touch points.
        
    -   Provide Integrate seamlessly with telemed vendor (API, PA portal, one-click refill visit prompts).
        
    -   Track patient from New Rx through dispense / refill adherence, and identify enhancement opportunities.
        
-   Enable Innovation and Flexibility in a Changing Environment
    
    -   Flexible Business Rules: Provide Brand visibility and control over business rules and thus GTN; with flexibility to adapt as payer/patient behavior change over time, or new market dynamics come into play.
        
    -   AI Integration / Enhancements: Continue to leverage next-gen technology to enhance the patient experience, program outcomes, and brand economics.


## DTP Thought Leadership Deck

Page 1 Direct-to-Patient 2.0:

Presented by Deepak Thomas, CEO , PHIL

Building a Commercially-Successful DTP Channel

Patients as Consumers: Evolving How Pharma Engages

-   ~50% of US population in next 2-3 years
    
-   76% of seniors aged 65+ own smartphones
    
-   A digital experience is now the base case expectation
    
    -   Gen Z
        
    -   Boomers
        

Pharma’s Response: Cash Play vs. Commercial Impact

-   Spotlight on GLP-1s
    
    -   62% of GLP-1 prescriptions were denied insurance coverage
        
    -   49% of GLP-1 patients discontinued treatment
        
    -   53% of GLP-1 patients paid in cash, 11% higher than year prior
        
-   Big implications on brand performance:
    
    -   Lack of affordability lowers access and adherence
        
    -   Cash-plays erode financial margins and brand viability
        

Reimagining DTP: A Model for Sustainable Growth

-   Integrated Digital Patient Experience
    
-   Seamless Multi-Vendor Patient Navigation via Full-Spectrum Data
    
-   Economic Viability
    
-   Compliance Guardrails
    

Ahead of the Curve: Keeping Pace with Rapid Change

-   Increasing consumerism
    
-   Intensifying access barriers
    
-   Competitive pressure
    
-   Rising channel costs
    
-   Administration actions
    
-   $21.4B DTP market size in 2025, to grow +9% by 2030

## DTP Whitepaper

Pharma Direct-to-Patient: From Experiment to Imperative

Policy pressure, affordability gaps, and consumer expectations are reshaping how pharma companies think about direct to patient access. The question is no longer if, but how.

New Pathways for Patient Access

-   Pharmaceutical companies are under pressure to rethink how patients get medicines.
    
-   Costs have piled up across the channel, including PBM spread, rebates, and distribution fees.
    
-   For patients, the impact is obvious: prior authorization and benefit design often block therapy even when coverage exists.
    
-   At the same time, patients are behaving more like consumers. They expect digital access, transparent pricing, and streamlined service.
    
-   According to a report by McKinsey, “Consumers are more motivated than ever to choose healthcare options that offer a better experience, higher quality of care, and greater value”.
    
-   The mismatch between expectations and the reality of the drug channel has created pressure from both sides.
    
-   While early examples of pharma companies offering direct-to-patient (DTP) access channels have existed for several years, recently, several leading pharma companies, including Eli Lilly, Pfizer, and Novo Nordisk, have made headlines for launching direct-to-patient programs to reduce some of this friction.
    
-   Early impact is visible with reports that over one third of US Zepbound prescriptions now run through LillyDirect.
    
-   Roche’s CEO has recently said the company is exploring selling drugs directly to U.S. consumers “which would cut out pharmacy benefit managers”.
    
-   Recent actions by the administration are accelerating the shift. In late July, President Trump sent letters to 17 drugmakers demanding they Participate in Direct-to-Consumer (DTC) channels, offering patients most favored nation pricing on high volume, high rebate drugs, and set a September 29 deadline to commit.
    
-   The pressure is no longer theoretical. Policy deadlines, competitive moves, and consumer expectations are converging.
    
-   Direct-to-patient access has moved from an interesting experiment to an executive-level priority.
    
-   The question has shifted from whether to try it to how to execute successfully.
    

Getting the Program Design Right

-   Building direct-to-patient access is not just about standing up a new channel.
    
-   Success depends on designing around a few core considerations that determine whether patients actually get on therapy and whether the model is sustainable for the company.
    
-   A good case study for how this can work is GLP-1 medications (where Lilly and Novo both started.)
    
-   Affordability. Most DTP programs sell the medications to patients for cash at Gross-to-net (GTN) level prices, meaning the price level that they receive after paying rebates and channel costs.
    
-   However, GTN-level cash prices are out of reach for most patients.
    
-   GLP-1s sold directly to patients cost $499 a month, which is out of reach for most patients. (Compared to the $25 out of pocket a patient covered by insurance can pay.) At current cash price points, many patients simply walk away.
    
-   Even among those highly motivated to start therapy, most cannot sustain hundreds of dollars a month out-of-pocket.
    
-   A study by Rock Health found that 47% of consumers considering GLP-1s cited cost as the top deterrent, and 36% of past users stopped treatment due to cost.
    
-   Pharma companies need to develop models that expand access while providing options both for insurance and cash.
    
-   Service model design. Direct-to-patient channels can include many different service offerings, including telemedicine, prescription fulfillment, care navigation, and adherence support.
    
-   Some of these services are offered directly by the pharmaceutical company, but more often than not, they are offered via partners.
    
-   Determining which components to include in your DTP channel is a key design question, and often depends on the therapeutic area of the medications you are offering.
    
-   For example, for some treatment areas, like migraine, sexual health, and obesity, offering access to prescribers is important because it can be hard for patients to find providers who are experienced with that treatment area, or they may be uncomfortable discussing the condition with their primary care clinician.
    
-   Other medications are really more focused on cost of the medication and pharmacy services are the most critical.
    
-   Navigation burden. As we mentioned, today, patients often stitch together prescribing, fulfillment, and support across multiple vendors.
    
-   Convoluted navigation flows and excessive handoffs increase friction. The burden should not fall on patients to figure out which customer service they need to reach out to, navigate to the correct vendor, or repeatedly enter information into intake forms.
    
-   Even small points of friction can erode trust; Redpoint Global found that digital friction drops recommendation scores by 13 points.
    
-   Awareness and discovery. As any consumer product would know, launching a channel isn’t sufficient to drive awareness.
    
-   Patients must know that these programs exist. A Press Ganey survey found that patients now rely on digital sources 3.1 times more than provider referrals when choosing a provider.
    
-   Pfizer publicized the launch of PfizerforAll with a superbowl ad, and while not every pharma company will go that route, ensuring that they are building awareness and driving consumers to the channel they are offering is critical.
    
-   Compliance. As with anything in the pharma realm, there are critical regulatory and compliance guidelines to keep in mind when designing a DTP channel.
    
-   Three of the key issues to keep in mind are patient steerage, physician choice, and patient data privacy.
    
-   Patient steerage refers to nudging patients toward a channel or payment path for financial reasons.
    
-   Physician choice concerns improperly influencing prescriber decision-making. Programs must be designed to protect against both while keeping data privacy intact.
    

Solution approaches

-   For each of the areas we highlighted, there are approaches that will help direct patients to what is needed.
    
-   Affordability. Start with an insurance-first workflow. While some patients may not have coverage, often it’s a matter of making sure the provider is correctly completing prior authorization forms.
    
-   Offering patients the ability to first use their insurance coverage, and if that fails, cash as an alternative, rather than assuming they default to cash in a direct to patient model.
    
-   Another option can be to use a bridge model that allows patients to pay cash for the first prescription while insurance is being processed, so treatment is not delayed.
    
-   Another area of affordability is the doctor visits offered via partnerships.
    
-   Be transparent about visit costs upfront, and enable one-time visits rather than forcing ongoing subscriptions.
    
-   Service model design. Tailor the service stack to the therapeutic area.
    
-   For more complex or sensitive conditions, integrate telehealth with specialist networks.
    
-   For other conditions, cost of medication or complex prior authorization requirements may be the primary barrier, which means focusing on fulfillment and prior auth support may be the primary focus.
    
-   Reduce navigation burden. Create one front door with a seamless transition for patients from one service to another.
    
-   Single data intake without requiring them to input information more then ones.
    
-   Ideally enable patients to go through one streamlined process weather they have insurance or not, to make it easier for them to get the lowest cost option, and not require them to know in advance what their benefits status is.
    
-   Use an orchestration layer that eliminates jarring handoffs and persists patient context across vendors.
    
-   Provide real-time visibility into the status of a prescription, whether it’s going through prior authorization, fulfillment, shipment, etc..
    
-   Drive awareness and discovery. Treat your DTP channel like you would a drug product, by marketing and advertising the channel directly, via a variety of mediums and channels.
    
-   Track the success of different channels for driving awareness and adapt accordingly.
    
-   Design for compliance. Build telemedicine with an external physician group to avoid steerage.
    
-   Preserve physician making authority by not letting them know which channel the patient came from.
    
-   Ensure patients authorize their data sharing and protect sensitive data behind firewalls, using unique identifiers to track patient flow through the system.
    
-   Conduct pre-launch legal review and ongoing monitoring to keep programs aligned with evolving standards.
    

Acting on the Opportunity

-   Direct-to-patient access is no longer optional, policy pressure now comes with explicit timelines.
    
-   The administration’s demands are clear, making affordability and access a near-term compliance and legal risk, not a future ideal.
    
-   Consumers are clear that cost and access remain the biggest barriers.
    
-   What to do now: start with a priority brand and design the experience based on its specific access challenges.
    
-   Build for compliance from day one. Make it consumer-grade with one front door, real pricing transparency, automated coverage checks, and a seamless journey without handoffs.
    
-   Default to coverage, then offer cash as a bridge or fallback.
    
-   The companies that act to set up these channels well, and in a way that achieves the best outcome for patients will set the standard.
    
-   Those that delay will be reacting to regulators, competitors, and patients who have already moved ahead.
    

About the Authors:

-   Deepak Thomas, CEO & Founder, PHIL
    
-   Fred Hassan, Board Member
    
-   Sari Kaganoff, CEO
    
-   Accelerate Your Direct-to-Patient:        
`;
