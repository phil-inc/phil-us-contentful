/* ==========================================================================
   Customer Success Stories — page content
   Data lives here and is passed into section components via props.
   ========================================================================== */

export const DEMO_URL = "/demo";
export const RESOURCES_URL = "/resources/";
export const PRESS_URL = "/press/";
export const GTN_CALCULATOR_URL = "/gtn/";
export const CASE_STUDIES_BASE = "/insights/case-studies/";
export const TRUSTPILOT_REVIEW_URL = "https://www.trustpilot.com/review/phil.us";

/* ── Hero rotating metrics ─────────────────────────────────────────────── */
export type HeroMetric = {
  target: number;
  suffix: string;
  label: string;
};

export const HERO_METRICS: HeroMetric[] = [
  { target: 90, suffix: "%+", label: "PA submission rate" },
  { target: 2, suffix: "x+", label: "Patient starts vs. traditional channels" },
  { target: 2, suffix: "x+", label: "Covered dispenses vs. traditional channels" },
  { target: 3, suffix: "x+", label: "Refill adherence vs. traditional channels" },
];

/* ── Case-study tabs ───────────────────────────────────────────────────── */
export type CaseStudyMetric = {
  /** numeric value used for the count-up */
  value: number;
  /** suffix shown after the number, e.g. "x" or "%" */
  suffix: string;
  label: string;
};

export type CaseStudyTab = {
  id: string;
  tab: string;
  title: string;
  challenge: string;
  solution: string;
  metrics: CaseStudyMetric[];
  brand: string;
  href: string;
};

export const CASE_STUDY_TABS: CaseStudyTab[] = [
  {
    id: "access",
    tab: "Access",
    title: "Overcoming Low Enrollment and High Abandonment Rates",
    challenge:
      "Low patient enrollment, poor coverage conversion, and high drop-off threatened financial viability.",
    solution:
      "Partnered with PHIL to implement a digital-first access program with seamless enrollment, 1-click PA submission, optimized routing, tailored workflows, and real-time insights.",
    metrics: [
      { value: 2, suffix: "x", label: "First Fills" },
      { value: 4, suffix: "x", label: "Covered Dispenses" },
    ],
    brand: "Women's Health Brand",
    href: CASE_STUDIES_BASE + "philrx-unlocks-90-dispense-coverage-for-womens-health-brand/",
  },
  {
    id: "affordability",
    tab: "Affordability",
    title: "Turning Low PA Submission Rates and Cost Barriers into Patient Success",
    challenge:
      "Low PA submission rates and an inconsistent patient access experience created barriers to growth and hindered full revenue realization for the brand.",
    solution:
      "Partnered with PHIL to launch a Direct-to-Patient access channel to evolve with consumer preference, promote growth and provide a seamless patient experience.",
    metrics: [
      { value: 91, suffix: "%", label: "HCP PA Submissions" },
      { value: 5, suffix: "x", label: "Refill Adherence" },
    ],
    brand: "Women's Health DTP",
    href:
      CASE_STUDIES_BASE +
      "philrx-designs-transformative-telemedicine-channel-for-womens-health-brand/",
  },
  {
    id: "adherence",
    tab: "Adherence",
    title: "Boosting Adherence for Sustainable Brand Growth",
    challenge:
      "Low adherence, PA hurdles, coverage challenges, and limited flexibility within the patient access channel was stunting brand growth opportunities.",
    solution:
      "Partnered with PHIL to deliver seamless enrollment, tailored dispense workflows, intelligent routing, and actionable data.",
    metrics: [
      { value: 3, suffix: "x", label: "Refill Adherence" },
      { value: 4, suffix: "x", label: "Net Sales" },
    ],
    brand: "Neurology Brand",
    href:
      CASE_STUDIES_BASE +
      "philrx-launches-robust-channel-strategy-for-specialty-lite-migraine-brand/",
  },
  {
    id: "adoption",
    tab: "Adoption",
    title: "Engaging Providers and Delivering Sustainable Brand Growth",
    challenge:
      "Low provider awareness and engagement, high amount of competing brands, and retail channel limitations made it challenging to meet modern patient expectations.",
    solution:
      "Partnered with PHIL to deliver a digital-first program featuring seamless enrollment, bridge access, automated PA support, contracted pharmacy routing, and real-time insights.",
    metrics: [
      { value: 1.5, suffix: "x", label: "Pull Through" },
      { value: 5, suffix: "x", label: "Covered Dispenses" },
    ],
    brand: "Ophthalmology Brand",
    href: CASE_STUDIES_BASE + "philrx-drives-high-adoption-for-ophthalmology-brand/",
  },
];

/* ── Press cards (external press releases) ─────────────────────────────── */
export type PressCard = {
  meta: string;
  title: string;
  href: string;
};

export const PRESS_CARDS: PressCard[] = [
  {
    meta: "Press Release",
    title:
      "PHIL Invests in State-of-the-Art Cash Dispense Capabilities, Expanding Direct-to-Patient Fulfillment for Pharma",
    href: "https://www.businesswire.com/news/home/20260421670832/en/PHIL-Invests-in-State-of-the-Art-Cash-Dispense-Capabilities-Expanding-Direct-to-Patient-Fulfillment-for-Pharma",
  },
  {
    meta: "Press Release",
    title:
      "Tenpoint Therapeutics Ltd and PHIL Partner to Launch YUVEZZI\u2122 Direct-to-Patient Cash Program",
    href: "https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable",
  },
  {
    meta: "Press Release",
    title:
      "Sprout Pharmaceuticals and PHIL Expand Their Affordable Direct-to-Patient Access Program for Addyi",
    href: "https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html",
  },
];

/* ── Testimonials (rotating voice cards) ───────────────────────────────── */
export type Voice = {
  id: string;
  tag: string;
  ariaLabel: string;
  quotes: { q: string; a: string }[];
};

export const VOICES: Voice[] = [
  {
    id: "pharma",
    tag: "What Pharma Says",
    ariaLabel: "Pharma quotes",
    quotes: [
      {
        q: "Phil is very strong in driving starts and adherence across our portfolio. As a partner, we love their willingness to be agile and create new things with us that hadn\u2019t necessarily been done before.",
        a: "SVP Market Access, PHIL Client",
      },
      {
        q: "We consider PHIL\u2019s integrated digital platform and their ability to drive conversions to be first-in-class. They deliver a true, e-commerce experience for patients versus the much more cumbersome traditional patient experience.",
        a: "Director of Patient Support Services, PHIL Client",
      },
      {
        q: "We selected Phil because of their leadership in the space, as well as their ability to offer real-time access to end-to-end data in a centrally accessible platform. This was really important to us and our brand.",
        a: "Head of Commercial, PHIL Client",
      },
    ],
  },
  {
    id: "patients",
    tag: "What Patients Say",
    ariaLabel: "Patient quotes",
    quotes: [
      {
        q: "I wasn\u2019t able to afford a medication that helped me. My doctor found it through PHIL, I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.",
        a: "Carla R., Patient",
      },
      {
        q: "I felt that my needs were being considered from the very beginning. That was so refreshing to me because it was out of the ordinary for a company to express such consideration, especially for a new customer like myself!",
        a: "Dawn M., Patient",
      },
      {
        q: "The staff at PHILRx are very customer-oriented, staying connected and providing guidance throughout the whole prescription process. They are knowledgeable and friendly. The experience was pleasant!",
        a: "Ryan S., Patient",
      },
    ],
  },
  {
    id: "providers",
    tag: "What Providers Say",
    ariaLabel: "Provider quotes",
    quotes: [
      {
        q: "Communication is fantastic! From start to finish, PHILRx does a great job keeping [our office] in the loop.",
        a: "Susan F., Healthcare provider",
      },
      {
        q: "PHILRx provides great support for patients, and convenient ways for providers to reach out.",
        a: "Elizabeth R., Healthcare provider",
      },
      {
        q: "PHILRx is very helpful with getting my patients their medications quickly.",
        a: "Jeffrey T., Healthcare provider",
      },
    ],
  },
];

/* ── Trustpilot rating comparison ──────────────────────────────────────── */
export type RatingRow = {
  name: string;
  score: number;
  out: string;
  fillPct: number;
  industry?: boolean;
};

export const TRUST_RATINGS: RatingRow[] = [
  { name: "PHIL", score: 4.8, out: "/5", fillPct: 96 },
  { name: "Industry Average", score: 2.6, out: "/5", fillPct: 48, industry: true },
];

export const TRUSTPILOT_WIDGET = {
  templateId: "539ad0ffdec7e10e686debd7",
  businessunitId: "60e5837e95cb800001e58b14",
  token: "03303eec-46ac-4cef-8792-aba436e64a10",
  height: "300px",
};

/* ── ROI banner preview cards ──────────────────────────────────────────── */
export type RoiPreview = {
  label: string;
  value: string;
  sub: string;
};

export const ROI_PREVIEW: RoiPreview[] = [
  { label: "Patient Starts", value: "2\u00d7+", sub: "vs. baseline" },
  { label: "Covered Dispenses", value: "2\u00d7+", sub: "vs. baseline" },
  { label: "Gross Revenue", value: "3\u00d7", sub: "vs. baseline" },
  { label: "Net Revenue", value: "4.1\u00d7", sub: "vs. baseline" },
];
