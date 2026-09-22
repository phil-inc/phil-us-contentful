export interface PressItem {
  title: string;
  description?: string;
  outlet: string;
  type: "Release" | "Thought Leadership";
  /** Publish date, YYYY-MM-DD. Record-keeping only, not displayed. */
  date: string;
  url: string;
}

// Keep newest first by date: the order drives the featured cards here, the
// /resources press carousel and the /customer-success press cards.
// Dates come from each article page, except where a comment says otherwise.
export const PRESS_DATA: PressItem[] = [
  {
    title: "Evolved Health and PHIL Announce Novel Dermatology Program for New Day™ Direct-to-Patient",
    outlet: "Press Release",
    type: "Release",
    date: "2026-09-01", // from the Business Wire URL
    url: "https://www.businesswire.com/news/home/20260901142132/en/PHIL-Partners-with-Biotechnology-Leader-Evolved-Health-to-Launch-New-Day-Skin-Spray-Direct-to-Patient-Program",
  },
  {
    title: "Compliance-By-Design: The Critical Layer for Pharma's Direct-to-Patient Play",
    outlet: "Pharmaceutical Commerce",
    type: "Thought Leadership",
    date: "2026-08-11",
    url: "https://www.pharmaceuticalcommerce.com/view/the-critical-layer-for-pharmas-growing-direct-to-patient-play",
  },
  {
    title: "Protecting Gross-to-Net Performance Through Single-Channel Ecosystems",
    outlet: "Drug Channels",
    type: "Thought Leadership",
    date: "2026-05-15",
    url: "https://www.drugchannels.net/2026/05/protecting-gross-to-net-performance.html",
  },
  {
    title: "PHIL is Rewriting the Rules of Direct-to-Patient",
    outlet: "Digital Medicine Society",
    type: "Thought Leadership",
    date: "2026-04-27",
    url: "https://dimesociety.org/newsroom/blog/deep-dive/how-phil-is-rewriting-the-rules-of-direct-to-patient/",
  },
  {
    title: "PHIL Invests in State-of-the-Art Cash Dispense Capabilities, Expanding Direct-to-Patient Fulfillment for Pharma",
    outlet: "Press Release",
    type: "Release",
    date: "2026-04-21", // from the Business Wire URL
    url: "https://www.businesswire.com/news/home/20260421670832/en/PHIL-Invests-in-State-of-the-Art-Cash-Dispense-Capabilities-Expanding-Direct-to-Patient-Fulfillment-for-Pharma",
  },
  {
    title: "Tenpoint Therapeutics Ltd and PHIL Partner to Launch YUVEZZI™ Direct-to-Patient Cash Program",
    outlet: "Press Release",
    type: "Release",
    date: "2026-04-02", // from the Business Wire URL
    url: "https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable",
  },
  {
    title: "DTP Survey Findings: Patients Want Price Transparency and e-Commerce Experience",
    outlet: "Fierce Pharma",
    type: "Thought Leadership",
    date: "2026-03-10",
    url: "https://www.fiercepharma.com/marketing/patients-want-price-transparency-e-commerce-experience-pharma-dtp-platforms-survey",
  },
  {
    title: "Beyond DTP 2.0: How Flexible Programs Power Best-in-Class Patient Experiences",
    outlet: "Drug Channels",
    type: "Thought Leadership",
    date: "2026-02-27",
    url: "https://www.drugchannels.net/2026/02/beyond-dtp-20-how-flexible-direct-to.html",
  },
  {
    title: "Sprout Pharmaceuticals and PHIL Expand Their Affordable Direct-to-Patient Access Program for Addyi",
    outlet: "Press Release",
    type: "Release",
    date: "2026-01-08",
    url: "https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html",
  },
  {
    title: "Pharma Direct-To-Patient 2.0: From Experiment To Imperative",
    description: "Policy pressure, affordability gaps, and consumer expectations are reshaping how pharma companies think about direct to patient access.",
    outlet: "Life Science Leader",
    type: "Thought Leadership",
    date: "2025-09-23", // from the page text; the page has no date metadata
    url: "https://www.lifescienceleader.com/doc/pharma-direct-to-patient-from-experiment-to-imperative-0001",
  },
  {
    title: "PHIL Launches Direct-to-Patient 2.0 Platform to Transform Access, Affordability, and Adherence in Pharma",
    outlet: "Press Release",
    type: "Release",
    date: "2025-09-22", // from the Business Wire URL
    url: "https://www.businesswire.com/news/home/20250922836527/en/PHIL-Launches-Direct-to-Patient-2.0-Platform-to-Transform-Access-Affordability-and-Adherence-in-Pharma",
  },
  {
    title: "Redefining Commercial Success in Specialty-Lite",
    description: "Specialty-lite products occupy a complex middle ground in pharmaceutical commercialization.",
    outlet: "Biopharma Dive",
    type: "Thought Leadership",
    date: "2025-07-28",
    url: "https://www.biopharmadive.com/spons/redefining-commercial-success-in-specialty-lite-with-alternative-channels/753650/",
  },
  {
    title: "The Hidden GTN Drain: Why Specialty-Lite Brands Need To Streamline The PA Process",
    description: "For retail and specialty-lite pharmaceutical brands, the path from prescription to profit has never been more treacherous.",
    outlet: "Fierce Pharma",
    type: "Thought Leadership",
    date: "2025-07-21",
    url: "https://www.fiercepharma.com/sponsored/hidden-gtn-drain-why-specialty-lite-brands-need-streamline-their-pa-process-optimal",
  },
  {
    title: "Phil Secures $60 Million Growth Capital Facility from K2 HealthVentures to Accelerate AI Integration",
    outlet: "Press Release",
    type: "Release",
    date: "2025-07-08",
    url: "https://www.prnewswire.com/news-releases/phil-secures-60-million-growth-capital-facility-from-k2-healthventures-to-accelerate-ai-integration-302499313.html",
  },
  {
    title: "Bridging Data Gaps that Impact Retail and Specialty-Lite Success",
    description: "Retail and specialty-lite brand teams are facing a paradox – they’re drowning in data yet struggling to gain actionable insight.",
    outlet: "Biopharma Dive",
    type: "Thought Leadership",
    date: "2025-05-19",
    url: "https://www.biopharmadive.com/spons/bridging-the-data-gaps-that-impact-retail-and-specialty-lite-success/747704/",
  },
  {
    title: "Harnessing the Power of Comprehensive Data to Drive GTN",
    description: "Growing market access barriers are compelling retail and specialty-lite pharmaceutical manufacturers to seek new approaches to optimize revenue and enhance patient access.",
    outlet: "Drug Channels",
    type: "Thought Leadership",
    date: "2025-02-21",
    url: "https://www.drugchannels.net/2025/02/from-data-gaps-to-revenue-gains.html",
  },
  {
    title: "Phil Inc. Adds Duchesnay USA’s Women’s Healthcare Product to Its Patient Access Platform",
    outlet: "Press Release",
    type: "Release",
    date: "2023-01-09", // from the Business Wire URL
    url: "https://www.businesswire.com/news/home/20230109005280/en/Phil-Inc.-Adds-Duchesnay-USAs-Womens-Healthcare-Product-to-Its-Patient-Access-Platform",
  },
];
