export interface PressItem {
  title: string;
  description?: string;
  outlet: string;
  type: "Release" | "Thought Leadership";
  url: string;
}

export const PRESS_DATA: PressItem[] = [
  {
    title: "PHIL is Rewriting the Rules of Direct-to-Patient",
    outlet: "Digital Medicine Society",
    type: "Thought Leadership",
    url: "https://dimesociety.org/newsroom/blog/deep-dive/how-phil-is-rewriting-the-rules-of-direct-to-patient/",
  },
  {
    title: "Compliance-By-Design: The Critical Layer for Pharma's Direct-to-Patient Play",
    outlet: "Pharmaceutical Commerce",
    type: "Thought Leadership",
    url: "https://www.pharmaceuticalcommerce.com/view/the-critical-layer-for-pharmas-growing-direct-to-patient-play",
  },
  {
    title: "Protecting Gross-to-Net Performance Through Single-Channel Ecosystems",
    outlet: "Drug Channels",
    type: "Thought Leadership",
    url: "https://www.drugchannels.net/2026/05/protecting-gross-to-net-performance.html",
  },
  {
    title: "PHIL Invests in State-of-the-Art Cash Dispense Capabilities, Expanding Direct-to-Patient Fulfillment for Pharma",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.businesswire.com/news/home/20260421670832/en/PHIL-Invests-in-State-of-the-Art-Cash-Dispense-Capabilities-Expanding-Direct-to-Patient-Fulfillment-for-Pharma",
  },
  {
    title: "Tenpoint Therapeutics Ltd and PHIL Partner to Launch YUVEZZI™ Direct-to-Patient Cash Program",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable",
  },
  {
    title: "Sprout Pharmaceuticals and PHIL Expand Their Affordable Direct-to-Patient Access Program for Addyi",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html",
  },
  {
    title: "The Hidden GTN Drain: Why Specialty-Lite Brands Need To Streamline The PA Process",
    description: "For retail and specialty-lite pharmaceutical brands, the path from prescription to profit has never been more treacherous.",
    outlet: "Fierce Pharma",
    type: "Thought Leadership",
    url: "https://www.fiercepharma.com/sponsored/hidden-gtn-drain-why-specialty-lite-brands-need-streamline-their-pa-process-optimal",
  },
  {
    title: "Pharma Direct-To-Patient 2.0: From Experiment To Imperative",
    description: "Policy pressure, affordability gaps, and consumer expectations are reshaping how pharma companies think about direct to patient access.",
    outlet: "Life Science Leader",
    type: "Thought Leadership",
    url: "https://www.lifescienceleader.com/doc/pharma-direct-to-patient-from-experiment-to-imperative-0001",
  },
  {
    title: "Harnessing the Power of Comprehensive Data to Drive GTN",
    description: "Growing market access barriers are compelling retail and specialty-lite pharmaceutical manufacturers to seek new approaches to optimize revenue and enhance patient access.",
    outlet: "Drug Channels",
    type: "Thought Leadership",
    url: "https://www.drugchannels.net/2025/02/from-data-gaps-to-revenue-gains.html",
  },
  {
    title: "Redefining Commercial Success in Specialty-Lite",
    description: "Specialty-lite products occupy a complex middle ground in pharmaceutical commercialization.",
    outlet: "Biopharma Dive",
    type: "Thought Leadership",
    url: "https://www.biopharmadive.com/spons/redefining-commercial-success-in-specialty-lite-with-alternative-channels/753650/",
  },
  {
    title: "Bridging Data Gaps that Impact Retail and Specialty-Lite Success",
    description: "Retail and specialty-lite brand teams are facing a paradox – they’re drowning in data yet struggling to gain actionable insight.",
    outlet: "Biopharma Dive",
    type: "Thought Leadership",
    url: "https://www.biopharmadive.com/spons/bridging-the-data-gaps-that-impact-retail-and-specialty-lite-success/747704/",
  },
  {
    title: "PHIL Launches Direct-to-Patient 2.0 Platform to Transform Access, Affordability, and Adherence in Pharma",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.businesswire.com/news/home/20250922836527/en/PHIL-Launches-Direct-to-Patient-2.0-Platform-to-Transform-Access-Affordability-and-Adherence-in-Pharma",
  },
  {
    title: "Phil Secures $60 Million Growth Capital Facility from K2 HealthVentures to Accelerate AI Integration",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.prnewswire.com/news-releases/phil-secures-60-million-growth-capital-facility-from-k2-healthventures-to-accelerate-ai-integration-302499313.html",
  },
  {
    title: "Phil Inc. Adds Duchesnay USA’s Women’s Healthcare Product to Its Patient Access Platform",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.businesswire.com/news/home/20230109005280/en/Phil-Inc.-Adds-Duchesnay-USAs-Womens-Healthcare-Product-to-Its-Patient-Access-Platform",
  },
];

/** The number of All Coverage cards that one /press page shows. */
export const ITEMS_PER_PAGE = 6;

/** The number of cards that the Latest Announcements section shows. */
export const FEATURED_RELEASE_SLOTS = 3;

/** The number of cards that the Featured Thought Leadership section shows. */
export const FEATURED_THOUGHT_SLOTS = 3;

/** The Latest Announcements cards on /press. */
export const FEATURED_RELEASES: PressItem[] = PRESS_DATA.filter((d) => d.type === "Release").slice(
  0,
  FEATURED_RELEASE_SLOTS,
);

/** The Featured Thought Leadership cards on /press. */
export const FEATURED_THOUGHT: PressItem[] = PRESS_DATA.filter((d) => d.type === "Thought Leadership").slice(
  0,
  FEATURED_THOUGHT_SLOTS,
);

/** The number of All Coverage pages on /press. */
export const TOTAL_PAGES = Math.ceil(PRESS_DATA.length / ITEMS_PER_PAGE);

/** Returns the All Coverage cards for one page. The first page is page 1. */
export function getPageItems(page: number): PressItem[] {
  return PRESS_DATA.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
}

/** The number of press cards that the "In the news" strip on /resources shows. */
export const RESOURCE_PRESS_SLOTS = 4;

/** The press items that the "In the news" strip on /resources shows. */
export const RESOURCE_PRESS_ITEMS: PressItem[] = PRESS_DATA.filter(
  (d) => d.type === "Thought Leadership",
).slice(0, RESOURCE_PRESS_SLOTS);
