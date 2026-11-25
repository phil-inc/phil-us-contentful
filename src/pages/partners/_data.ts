// Content for /partners/. See SPEC.md for the section-by-section breakdown.

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

export type GtnStat = { label: string; value: number };

export const GTN_STATS: GtnStat[] = [
  { label: "Patient starts", value: 2.2 },
  { label: "Covered dispenses", value: 2.8 },
  { label: "Gross Revenue Potential", value: 2.6 },
];

export const MARQUEE_WORDS: string[] = [
  "Patient Starts",
  "Covered Dispenses",
  "Refill Adherence",
  "Gross-to-Net",
  "Prior Authorization",
  "Benefits Verification",
  "Pharmacy Routing",
  "Free Rx Delivery",
];

/** Bar widths (percent) for PhilRx vs. traditional channels. */
export type Outcome = { label: string; phil: number; trad: number };

export const OUTCOMES: Outcome[] = [
  { label: "Patient Starts", phil: 92, trad: 48 },
  { label: "Covered Dispenses", phil: 88, trad: 52 },
  { label: "Refill Adherence", phil: 84, trad: 44 },
  { label: "Gross-to-Net", phil: 90, trad: 56 },
];

export type HubNode = { label: string; icon: "patients" | "providers" | "manufacturers" | "pharmacies" | "payers" | "insights" };

export const HUB_NODES: HubNode[] = [
  { label: "Patients", icon: "patients" },
  { label: "Providers", icon: "providers" },
  { label: "Manufacturers", icon: "manufacturers" },
  { label: "Pharmacies", icon: "pharmacies" },
  { label: "Payers", icon: "payers" },
  { label: "Insights", icon: "insights" },
];

export const JOURNEY_CHIPS: string[] = ["Enrollment", "PA & Affordability", "Pharmacy Routing", "Refills"];

export const COVERAGE_ROWS: { k: string; v: string }[] = [
  { k: "Benefits verified", v: "Covered" },
  { k: "Prior authorization", v: "Approved" },
  { k: "Copay program", v: "Applied" },
];

/** Bar heights (percent) for the "Enhance Insight" card chart. */
export const INSIGHT_BARS: number[] = [38, 52, 46, 68, 74, 82, 90];

export type PathItem = { name: string; icon?: "insurance" | "providers" | "copay" | "medicationAccess" | "partner" };
export type AccessPath = { name: string; color: string; items: PathItem[] };

export const ACCESS_PATHS: AccessPath[] = [
  {
    name: "Insured",
    color: "#00827E",
    items: [
      { name: "Covered", icon: "insurance" },
      { name: "PA/Appeals", icon: "providers" },
      { name: "Copay Programs", icon: "copay" },
    ],
  },
  { name: "Self-Pay", color: "#09AAA5", items: [{ name: "Cash program", icon: "copay" }] },
  {
    name: "Other Non-Commercial",
    color: "#00615E",
    items: [
      { name: "PAP", icon: "medicationAccess" },
      { name: "Bridge", icon: "partner" },
      { name: "Quick start" },
    ],
  },
];

export type JourneyStep = { n: string; title: string; body: string };

export const JOURNEY_STEPS: JourneyStep[] = [
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
];

export type Quote = { text: string; who: string; role?: string };

export const QUOTES: Quote[] = [
  {
    text: "Phil is very strong in driving starts and adherence across our portfolio. As a partner, we love their willingness to be agile and create new things with us that haven’t been done before.",
    who: "Pharma Partner",
    role: "Brand Team",
  },
  {
    text: "I wasn’t able to afford a medication that helped me. My doctor found it through PHILRx, and I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.",
    who: "PHILRx Patient",
  },
  {
    text: "The staff at PHIL are very customer-oriented, staying connected and providing guidance throughout the whole prescription process.",
    who: "PHILRx Patient",
  },
  { text: "I felt that my needs were being considered from the very beginning.", who: "PHILRx Patient" },
];

export type ResourceCard = {
  type: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  bg: string;
  motif?: "pDotsLight" | "dotsAccent";
  chip: string;
  big: string;
  bigSize: string;
  bigSub: string;
};

export const RESOURCES: ResourceCard[] = [
  {
    type: "Webinar",
    title: "Improving Access, Coverage, and GTN with a Digital Hub",
    desc: "Discover the building blocks of a strong digital hub.",
    cta: "Watch Now",
    href: "/on-demand-webinar-improving-access-coverage-and-gtn-with-digital-hubs/",
    bg: "linear-gradient(135deg,#00827E 0%,#5ABEA4 100%)",
    chip: "On-Demand",
    big: "▶",
    bigSize: "40px",
    bigSub: "Watch the session",
  },
  {
    type: "Report",
    title: "Pharma Perspectives on Direct-to-Patient: The Future of DTP Success",
    desc: "Exclusive research from 74 life sciences leaders.",
    cta: "Read Report",
    href: "/pharma-dtp-research/",
    bg: "linear-gradient(135deg,#00615E 0%,#E8B14B 140%)",
    motif: "pDotsLight",
    chip: "New Research",
    big: "74",
    bigSize: "64px",
    bigSub: "Life sciences leaders",
  },
  {
    type: "Blog Post",
    title: "The Case for an Alternative Channel Strategy in 2024 and Beyond",
    desc: "Learn how to strategically overcome common access challenges.",
    cta: "Read More",
    href: "/the-case-for-an-alternative-channel-strategy-in-2024-and-beyond/",
    bg: "linear-gradient(135deg,#09AAA5 0%,#5ABEA4 100%)",
    motif: "dotsAccent",
    chip: "Strategy",
    big: "2024+",
    bigSize: "48px",
    bigSub: "Alternative channels",
  },
];
