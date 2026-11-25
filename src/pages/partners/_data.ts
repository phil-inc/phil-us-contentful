export const PARTNERS_TITLE = "Pharma Partners — Accelerate Brand Success with PhilRx";
export const PARTNERS_DESC =
  "Partner with PhilRx, the digital hub trusted by leading brands. Improve patient access, payer coverage and GTN, and turn channel data into brand insight.";
export const PARTNERS_PATH = "/partners/";

export type HeroMessage = { title: string; body: string; cta: string };

export const HERO_MESSAGES: HeroMessage[] = [
  {
    title: "Hi there!",
    body: "Your doctor sent your Adaptrex prescription to the PHILRx pharmacy. Tap below to get started.",
    cta: "Get Started",
  },
  { title: "We found your best price on Adaptrex!", body: "Your coverage has been checked.", cta: "View Price" },
  { title: "Your next refill is scheduled.", body: "Please confirm below.", cta: "Confirm Refill" },
];

export const GTN_STATS = [
  { label: "Patient starts", value: 2.2 },
  { label: "Covered dispenses", value: 2.8 },
  { label: "Gross Revenue Potential", value: 2.6 },
] as const;

export const MARQUEE_WORDS = [
  "Patient Starts",
  "Covered Dispenses",
  "Refill Adherence",
  "Gross-to-Net",
  "Prior Authorization",
  "Benefits Verification",
  "Pharmacy Routing",
  "Free Rx Delivery",
] as const;

/** Bar widths in percent: PhilRx vs. traditional channels. */
export const OUTCOMES = [
  { label: "Patient Starts", phil: 92, trad: 48 },
  { label: "Covered Dispenses", phil: 88, trad: 52 },
  { label: "Refill Adherence", phil: 84, trad: 44 },
  { label: "Gross-to-Net", phil: 90, trad: 56 },
] as const;

export const HUB_NODES = ["Patients", "Providers", "Manufacturers", "Pharmacies", "Payers", "Insights"] as const;

export const JOURNEY_CHIPS = ["Enrollment", "PA & Affordability", "Pharmacy Routing", "Refills"] as const;

export const COVERAGE_ROWS = [
  { k: "Benefits verified", v: "Covered" },
  { k: "Prior authorization", v: "Approved" },
  { k: "Copay program", v: "Applied" },
] as const;

/** Bar heights in percent for the drug-channel insight card. */
export const INSIGHT_BARS = [38, 52, 46, 68, 74, 82, 90] as const;

export type AccessPath = { name: string; items: { name: string; icon: string }[] };

/** `icon` keys map to the images imported in index.tsx. */
export const ACCESS_PATHS: AccessPath[] = [
  {
    name: "Insured",
    items: [
      { name: "Covered", icon: "insurance" },
      { name: "PA/Appeals", icon: "hcps" },
      { name: "Copay Programs", icon: "copay" },
    ],
  },
  { name: "Self-Pay", items: [{ name: "Cash program", icon: "copay" }] },
  {
    name: "Other Non-Commercial",
    items: [
      { name: "PAP", icon: "medicationAccess" },
      { name: "Bridge", icon: "partner" },
      { name: "Quick start", icon: "refill" },
    ],
  },
];

export const JOURNEY_STEPS = [
  {
    n: "01",
    title: "Intake",
    body: "Seamless HCP workflow within existing EMRs, telemedicine intake, or prescription transfer requests.",
  },
  {
    n: "02",
    title: "Access & Affordability",
    body: "Advanced prior authorization, benefits verification, and pharmacy routing with AI-driven script checks to proactively resolve barriers.",
  },
  {
    n: "03",
    title: "Dispense",
    body: "An integrated pharmacy network offering 99%+ plan coverage across all 50 states and territories, with free Rx delivery.",
  },
  {
    n: "04",
    title: "Adherence & Insight",
    body: "Script-level data and insights that reveal strategic program opportunities from first fill to refill.",
  },
] as const;

export type Quote = { text: string; who: string; role: string };

export const QUOTES: Quote[] = [
  {
    text: "Phil is very strong in driving starts and adherence across our portfolio. As a partner, we love their willingness to be agile and create new things with us that haven’t been done before.",
    who: "Pharma Partner",
    role: "Brand Team",
  },
  {
    text: "I wasn’t able to afford a medication that helped me. My doctor found it through PHILRx, and I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.",
    who: "PHIL Patient",
    role: "Patient",
  },
  {
    text: "The staff at PHIL are very customer-oriented, staying connected and providing guidance throughout the whole prescription process.",
    who: "PHIL Patient",
    role: "Patient",
  },
  {
    text: "I felt that my needs were being considered from the very beginning.",
    who: "PHIL Patient",
    role: "Patient",
  },
];

export type ResourceCard = {
  type: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  variant: "webinar" | "report" | "strategy";
  chip: string;
  big: string;
  bigSub: string;
};

export const RESOURCES: ResourceCard[] = [
  {
    type: "Webinar",
    title: "Improving Access, Coverage, and GTN with a Digital Hub",
    desc: "Discover the building blocks of a strong digital hub.",
    cta: "Watch Now",
    href: "/on-demand-webinar-improving-access-coverage-and-gtn-with-digital-hubs/",
    variant: "webinar",
    chip: "On-Demand",
    big: "▶",
    bigSub: "Watch the session",
  },
  {
    type: "Report",
    title: "Pharma Perspectives on Direct‑to‑Patient Success",
    desc: "Exclusive research from 74 life sciences leaders.",
    cta: "Read Report",
    href: "/pharma-dtp-research/",
    variant: "report",
    chip: "New Research",
    big: "74",
    bigSub: "Life sciences leaders",
  },
  {
    type: "Blog Post",
    title: "The Case for an Alternative Channel Strategy in 2024 and Beyond",
    desc: "Learn how to strategically overcome common access challenges.",
    cta: "Read More",
    href: "/the-case-for-an-alternative-channel-strategy-in-2024-and-beyond/",
    variant: "strategy",
    chip: "Strategy",
    big: "2024+",
    bigSub: "Alternative channels",
  },
];
