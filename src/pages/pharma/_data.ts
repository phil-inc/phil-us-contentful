import { PHARMA_FAQ_GROUPS } from "data/faq-content";

export const PHARMA_TITLE = "Pharma | PHIL";
export const PHARMA_DESC =
  "PHIL is the all-in-one access platform for retail and specialty lite pharma brands to maximize outcomes and drive measurable performance.";
export const PHARMA_URL = "https://phil.us/pharma/";

export const STATS = [
  { value: "2×+", label: "Patient Starts vs Traditional Channels", variant: "v1" },
  { value: "90%+", label: "PA Submission Rates", variant: "v2" },
  { value: "2×+", label: "Covered Dispenses vs Traditional Channels", variant: "v3" },
  { value: "3×+", label: "Refill Adherence vs Traditional Channels", variant: "v4" },
  { value: "99%+", label: "Plan Coverage · 50-State Network", variant: "v5" },
  { value: "4.8/5.0", label: "Patient Satisfaction Score", variant: "v6" },
] as const;

export const PARTNER_TABS = [
  { key: "brands", label: "Supporting Pharma Brands" },
  { key: "ta", label: "Across Products and Therapeutic Areas" },
  { key: "value", label: "In Outcomes and Impact" },
] as const;

export const PARTNER_PANELS = [
  {
    key: "brands",
    title: "Supporting Pharma Brands in Program Success",
    body: "Not every brand fits neatly into one box, and neither does PHIL. We custom-build every program around the specific needs of each brand, retail or specialty-lite, cash or coverage, single product or full portfolio. From scaling a flagship to navigating mid-cycle growth to managing loss of exclusivity, our platform flexes with your brand at every stage of the lifecycle. We build the right program, for the right patient, for your brand.",
  },
  {
    key: "ta",
    title: "To Improve Access, Affordability, and Adherence Across Different Products and Therapeutic Areas",
    body: "With 10+ years of digital hub experience across specialty and retail channels, we help pharmaceutical manufacturers with pharmacy benefit, across medications achieve transformative results. Improving access, affordability, and adherence across a broad range of therapeutic areas.",
  },
  {
    key: "value",
    title: "Deliver Measurable Commercial Impact",
    body: "PHIL helps pharma brands improve patient access to therapy from the moment a script is written. From navigating utilization management hurdles to delivering an exceptional patient experience, our platform improves affordability and adherence while helping to deliver real results. Brands on PHIL see improved script to fill rates and stronger patient adherence compared to traditional channels.",
  },
] as const;

export const STAKEHOLDERS = [
  {
    key: "brand",
    name: "Brand & Commercial Leaders",
    icon: "chart",
    problem: "Traditional retail is eroding net revenue and limiting visibility into script performance.",
    solve: "We optimize program performance by improving visibility across the journey, enabling data-driven decisions that strengthen access and outcomes and promote more consistent script-to-start conversions.",
    learnMoreHref: "/resources/?topic=commercial",
  },
  {
    key: "access",
    name: "Market Access Leaders",
    icon: "package",
    problem: "Fragmented access experience, payer restrictions and prior auth burdens can block patients from starting therapy.",
    solve: "We help close the loop between program activation and dispense data, equipping market access teams with visibility into real patient engagement while streamlining the access journey to reduce friction and maximize conversion of eligible scripts into filled prescriptions.",
    learnMoreHref: "/resources/?topic=access",
  },
  {
    key: "trade",
    name: "Trade & Channel Teams",
    icon: "truck",
    problem: "With too many handoffs and inconsistent program offerings, traditional retail channels weren't built to optimize for brand performance.",
    solve: "We optimize pharmacy routing and channel performance across all 50 states, helping connect every script to the fastest, most cost-effective path to the patient based on patient coverage and preference.",
    learnMoreHref: "/resources/?topic=field",
  },
  {
    key: "hub",
    name: "Patient Services & Hub Leaders",
    icon: "people",
    problem: "Fragmented hub operations create delays, drop-offs, and a poor patient experience.",
    solve: "Our integrated platform connects every touchpoint, from affordability to fulfillment, in one seamless and top rated patient experience.",
    learnMoreHref: "/resources/?topic=patient",
  },
  {
    key: "innovation",
    name: "Innovation & Digital Health",
    icon: "bulb",
    problem: "Legacy access infrastructure can't keep pace with how patients and providers expect to engage with brands today.",
    solve: "Our platform is built for what's next, with the flexibility, scalability, and AI-driven capabilities to integrate with the digital health ecosystem your brand is building.",
    learnMoreHref: "/resources/?topic=data",
  },
] as const;

export const PATIENT_QUOTES = [
  {
    q: "The staff at PHIL are very customer-oriented, staying connected and providing guidance throughout the whole prescription process. They are knowledgable and friendly. The experience was pleasant!",
    a: "Ryan S., Patient",
  },
  {
    q: "I wasn't able to afford a medicine that helped me. My doctor found it through PHIL, I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.",
    a: "Carla R., Patient",
  },
  {
    q: "I felt that my needs were being considered from the very beginning. That was so refreshing to me because it was out of the ordinary for a company to express such consideration, especially for a new customer like myself!",
    a: "Dawn M., Patient",
  },
] as const;

export const PROVIDER_QUOTES = [
  {
    q: "PHILRx is very helpful with getting my patients their medications quickly.",
    a: "Jeffrey T., Healthcare provider",
  },
  {
    q: "Communication is fantastic! From start to finish, PHILRx does a great job keeping [our office] in the loop.",
    a: "Susan F., Healthcare provider",
  },
  {
    q: "PHILRx provides great support for patients, and convenient ways for providers to reach out.",
    a: "Elizabeth R., Healthcare provider",
  },
] as const;

// ─── FAQ data derived from centralized source ─────────────────────────────────

export const FAQ_CATEGORIES = PHARMA_FAQ_GROUPS.map((g) => ({
  key: g.id,
  label: g.title,
}));

export const FAQ_ITEMS = PHARMA_FAQ_GROUPS.flatMap((g) =>
  g.items.map((item) => ({
    cat: g.id,
    q: item.question,
    a: item.answer,
  }))
);
