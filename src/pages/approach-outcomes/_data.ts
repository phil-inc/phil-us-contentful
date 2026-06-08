export const APPROACH_TITLE = "Our Approach & Outcomes | PHIL";
export const APPROACH_DESC =
  "PHIL's platform removes barriers to branded prescriptions by solving access, affordability, and adherence — driving measurable commercial outcomes for pharma brands.";
export const APPROACH_URL = "https://phil.us/approach-outcomes/";

export const APPROACH_HERO = {
  eyebrow: "Our Approach & Outcomes",
  h1Lead: "Commercial Success Across Your Portfolio Starts with",
  h1Em: "Getting the Script Journey Right",
  sub: "Every year, millions of patients abandon their branded prescriptions, not because a therapy doesn't exist, but because the path to getting it is too complex, too expensive, or too easy to give up on. PHIL's platform removes those barriers, driving measurable outcomes across access, affordability, and adherence.",
} as const;

export const APPROACH_PILLARS = [
  {
    title: "Access,\nSolved",
    body: "PHIL meets patients where they are, offering flexible intake through telehealth, in-person, or hybrid pathways, with SMS enrollment that gets patients onto therapy in minutes, not days.",
    barrierBig: "1 in 3",
    barrierLabel:
      "patients won't pursue a medication if they can't access it through their preferred experience",
    barrierHref: "/dtp-research/",
  },
  {
    title: "Affordability, Built In",
    body: "PHIL builds a tailored access path for every patient, automatically navigating insurance, copay programs, and cash-pay options to find the most affordable route to their medication.",
    barrierBig: "96%",
    barrierLabel:
      "of patients want to see their price before committing, including insurance and coupons",
    barrierHref: "/dtp-research/",
  },
  {
    title: "Adherence, By Design",
    body: "PHIL promotes patients adherent with proactive refill reminders, live support, and a frictionless digital experience built around how patients actually want to engage.",
    barrierBig: "70%",
    barrierLabel:
      "of HCPs agree that issues in the PA process create an immediate hurdle to staying on therapy",
    barrierHref: "/hcp-research/",
  },
] as const;

export const JOURNEY_HEAD = {
  eyebrow: "The Patient Journey",
  h2: "Keeping Patients Adherent from First Fill to Refill",
  lead: "Every year, millions of patients abandon their branded prescriptions, not because a therapy doesn't exist, but because of the complexity and expense of navigating a path to treatment. PHIL's platform removes those barriers, driving measurable outcomes across access, affordability, and adherence.",
} as const;

export const JOURNEY_STEPS = [
  {
    title: "Provider Writes the Prescription",
    what: "The treatment decision is made and the prescription is sent.",
    breaks:
      "Prescribers have no reliable way to know where to send a script, scripts can be routed to pharmacies not contracted within plan, and coverage is left on the table before the journey even starts.",
    helps:
      "PHIL is a single solution for pharmacy fulfillment, helping to connect each script to the right pharmacy, based on patient coverage and preference, across our 50-state network. The result: 3×+ covered dispenses compared to traditional channels.",
  },
  {
    title: "Digital Patient Enrollment & Onboarding",
    what: "The patient is invited to join the brand's access program.",
    breaks:
      "Long enrollment forms, call-center waits, and app downloads create abandonment and many patients never complete this step.",
    helps:
      "App-free SMS enrollment and an eCommerce-like digital experience make joining frictionless, getting patients into the program and on their way to therapy in under 1 minute.",
  },
  {
    title: "Benefits Verification & Prior Authorization",
    what: "The prescription enters the insurance and Prior Authorization process.",
    breaks:
      "Prior Authorization requests get stuck in manual workflows, patients wait, and providers may not submit a Prior Authorization, resulting in delays to patient therapy access.",
    helps:
      "PHIL's electronic benefits verification and Prior Authorization process works within existing providers workflows, reducing delays and supporting timely script fulfillment. PHIL delivers 85%+ HCP PA submission rates across our programs.",
  },
  {
    title: "Patient Out-of-pocket Cost",
    what: "The patient receives notification of their out-of-pocket medication cost.",
    breaks:
      "Sticker shock at out-of-pocket cost causes patients to abandon, especially when affordability programs are hard to find or apply.",
    helps:
      "PHIL builds flexible brand programs that automatically helps find each patient's lowest out-of-pocket cost. Brands have options to offer cash-pay and bridge programs to compliantly support patients with coverage barriers, so no patient has to abandon medication at the counter.",
  },
  {
    title: "Shipping & Distribution",
    what: "After the patient pays, they need to get the medication into their hands.",
    breaks:
      "Patients are defaulted to retail pickup with no guidance, missed pickups, long specialty pharmacy wait times, and confusing logistics cause patients to never start therapy.",
    helps:
      "PHIL leverages 98%+ plan coverage across our 50-state contracted pharmacy network with free home delivery options, and proactive shipment notifications, tracking, and flexible scheduling.",
  },
  {
    title: "Ongoing Refills",
    what: "The patient manages their refills to stay on therapy long-term.",
    breaks:
      "Refill drop-off isn't just forgetfulness or lack of clinical need. Patients lack guidance, miss the value of staying on therapy, and fall off before the medication even has a chance to work.",
    helps:
      "Proactive refill reminders, flexible rescheduling, live patient support, and engagement tools to make staying on therapy easier. Delivering 3× higher refill adherence than traditional pharmacy channels.",
  },
  {
    title: "Program Optimization",
    what: "The brand evaluates what's working and where to improve.",
    breaks:
      "Fragmented vendors and siloed data make it nearly impossible to see where patients dropped off, why, or whether there are appropriate solutions to support adherence.",
    helps:
      "Access 120+ real-time data points, with full data visibility across the prescription journey. Leverage AI-driven insights that provide dynamic information on channel strategy and where to take action. Brands that optimize programs with PHIL have seen meaningful improvements in patient access to drug therapies.",
  },
] as const;

export const SOLUTIONS_HEAD = {
  eyebrow: "Our Solutions",
  h2: "Drive Measurable Brand Performance with PHIL",
} as const;

export const SOLUTIONS_HUB = {
  title: "One Platform, Every Path to the Patient",
  text: "Traditional access solutions only solve part of the problem. PHIL's purpose-built platform simplifies the script journey for patients and providers, maximizing covered dispenses, improving adherence, and driving commercial success for retail and specialty-lite brands.",
} as const;

export const SOLUTIONS_PILLARS = [
  {
    title: "Direct-to-Patient",
    text: "A fully integrated, eCommerce-like experience that streamlines intake, telemedicine, coverage, routing, and fulfillment, supporting conversion from scripts to start and maximizing overall program performance.",
  },
  {
    title: "Digital Hub",
    text: "A technology-driven hub that streamlines medication access through proprietary prior authorization and benefits verification, optimizing navigation for payer-covered, patient access to therapy.",
  },
  {
    title: "Pharmacy Network",
    text: "A fully integrated dispense model within our 50-state network with 98%+ plan coverage helps enable more covered dispenses and provide patients the most affordable cost.",
  },
  {
    title: "Data & Insights",
    text: "End-to-end script visibility with access to continuous data-driven insights and consultative support to refine programs for better outcomes and brand success.",
  },
] as const;

export const SOLUTIONS_DIRECT_GROUPS = [
  {
    label: "Expanded intake options",
    features: [
      {
        title: "Digital / telehealth intake",
        text: "Frictionless online enrollment with integrated telemed prescribing from the comfort of home.",
      },
      {
        title: "Traditional HCP intake",
        text: "Full support for in-person prescribing workflows that seamlessly connect to your PHIL infrastructure.",
      },
    ],
  },
  {
    label: "Flexible program structures",
    features: [
      {
        title: "Coverage programs",
        text: "Navigate insurance complexity with confidence. PHIL handles benefits verification, prior authorization, and appeals workflows.",
      },
      {
        title: "Cash programs",
        text: "Simple, transparent, fast. Ideal for brands prioritizing speed to patient with a predictable cost structure.",
      },
      {
        title: "Hybrid programs",
        text: "The best of both worlds. Blend direct and traditional channels to maximize reach without sacrificing payer access.",
      },
    ],
  },
] as const;

export const PROOF_HEAD = {
  eyebrow: "Satisfaction Proof",
  h2: "Trusted by the People Who Matter Most",
  lead: "The best measure of whether a patient access program works isn't a metric on a dashboard, it's whether patients receive their medication, have a positive experience along the way, and whether providers feel confident guiding them through the program. Here's what they say about PHIL.",
} as const;

export const HCP_TESTIMONIALS = [
  {
    quote: "PHILRx is very helpful with getting my patients their medications quickly.",
    name: "Jeffrey T.",
    role: "Healthcare provider",
  },
  {
    quote:
      "Communication is fantastic! From start to finish, PHILRx does a great job keeping [our office] in the loop.",
    name: "Susan F.",
    role: "Healthcare provider",
  },
  {
    quote: "PHILRx provides great support for patients, and convenient ways for providers to reach out.",
    name: "Elizabeth R.",
    role: "Healthcare provider",
  },
] as const;

export const STORIES_HEAD = {
  eyebrow: "Customer Success Stories",
  h2: "Organizations See Results with PHIL",
} as const;

export const CASE_STUDIES = [
  {
    colorKey: "c1",
    tag: "Case Study",
    stat: "Continued engagement. Simple refill management.",
    em: "3× more refills",
    suffix: " than retail.",
    brand: "Neurology brand",
    href: "/insights/case-studies/philrx-launches-robust-channel-strategy-for-specialty-lite-migraine-brand/",
  },
  {
    colorKey: "c2",
    tag: "Case Study",
    stat: "Less abandonment. More coverage.",
    em: "4× covered dispenses",
    suffix: " where other channels fell short.",
    brand: "Women's health brand",
    href: "/insights/case-studies/philrx-unlocks-90-dispense-coverage-for-womens-health-brand/",
  },
  {
    colorKey: "c3",
    tag: "Case Study",
    stat: "Two minutes. Easy enrollment.",
    em: "5× first fills",
    suffix: " per patient for the ophthalmology brand.",
    brand: "Ophthalmology brand",
    href: "/insights/case-studies/philrx-drives-high-adoption-for-ophthalmology-brand/",
  },
  {
    colorKey: "c4",
    tag: "Case Study",
    stat: "No PA bottlenecks. No provider frustration.",
    em: "91% HCP PA submission rate",
    suffix: " from day one.",
    brand: "Women's health DTP",
    href: "/insights/case-studies/philrx-designs-transformative-telemedicine-channel-for-womens-health-brand/",
  },
] as const;

export const ROI = {
  eyebrow: "Measure Your Impact",
  h2: "Measure the Impact of Better Patient Access & Adherence",
  text: "See how covered dispenses, patient starts, and refill rates drive brand performance. Our calculator was built by PHIL's Commercial Insights team for retail and specialty-lite pharma teams.",
  ctaLabel: "Calculate Your Potential",
  ctaHref: "/gtn",
  stats: [
    { label: "Patient Starts", value: "2×+", sub: "vs. baseline" },
    { label: "Covered Dispenses", value: "3×+", sub: "vs. baseline" },
    { label: "Gross Revenue", value: "3×", sub: "vs. baseline" },
    { label: "Net Revenue", value: "4.1×", sub: "vs. baseline" },
  ],
} as const;

export const FINAL_CTA = {
  heading: "Access, Affordability, and Adherence. Delivered.",
  description:
    "See how PHIL's integrated platform can drive access, affordability, and adherence for your brand.",
} as const;
