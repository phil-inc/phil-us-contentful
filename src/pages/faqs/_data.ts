// ─── FAQ Page Data ────────────────────────────────────────────────────────────

import { PATIENT_FAQ_ITEMS, PROVIDER_FAQ_GROUPS } from "data/faq-content";

export const FAQ_TITLE = "Frequently Asked Questions";
export const FAQ_DESC =
  "Find answers about PHILRx for pharma partners, patients, and providers. Learn about our platform, prior authorization, prescriptions, delivery, and more.";
export const FAQ_URL = "https://phil.us/faqs/";
export const FAQ_OG_IMAGE = ""; // resolved via getOgImage in Head

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QAItem {
  question: string;
  answer: string; // HTML string
}

export interface FaqCategory {
  title: string;
  items: QAItem[];
}

export interface FlatFaqItem {
  question: string;
  answer: string; // HTML string
}

// ─── Pharma Section ───────────────────────────────────────────────────────────

export const PHARMA_CATEGORIES: FaqCategory[] = [
  {
    title: "Platform & Partnership",
    items: [
      {
        question: "What does PHIL do?",
        answer: `<p>PHIL is a medication access platform designed to improve patient outcomes and brand performance for retail and specialty-lite brands. Through <a href="/solution/core/" target="_blank" rel="noopener">PHIL Core</a>, our digital hub, and <a href="/solution/direct/" target="_blank" rel="noopener">PHIL Direct</a>, our Direct-to-Patient (DTP) solution, we enable seamless medication access via our integrated pharmacy network and our own PHIL cash pharmacies, delivering simple, affordable paths to therapy.</p>`,
      },
      {
        question: "What types of medications are best suited for the PHIL platform?",
        answer: `<p>Our platform is purpose-built to support branded retail and specialty-lite therapies, including medications that are self-administered, pharmacy benefit, controlled or non-controlled, and often require prior authorization and patient support services.</p>`,
      },
      {
        question:
          "Which therapeutic areas and launch stages do you support?",
        answer: `<p>Our platform successfully supports brands across many therapeutic areas and launch stages, working with brands from new launch through LOE.</p>`,
      },
      {
        question:
          "How are you different from traditional access channels (i.e. retail, specialty pharmacy, etc.)?",
        answer: `<p>PHIL is redefining medication access for branded retail and specialty-lite therapies. Traditional access channels rely on fragmented, legacy workflows that increase access barriers and leave patients facing high costs and long delays.</p><p>PHIL replaces this outdated friction with a modern, technology-first platform. Designed with ultimate flexibility, our platform structures can be fully whitelabeled to align with your brand's unique footprint. By streamlining the entire prescription journey, we provide patients cost transparency, unlock real-time visibility for brands, and ensure patients can effortlessly access, afford, and stay on their prescribed therapies.</p><p>Curious if your brand could benefit from partnering with PHIL? <a href="/demo/" target="_blank" rel="noopener">Contact us for a discovery call</a>.</p>`,
      },
    ],
  },
  {
    title: "Patient & Provider Experience",
    items: [
      {
        question: "What does your patient experience look like?",
        answer: `<p>PHIL provides a seamless, e-commerce-like medication access experience for patients. This includes timely updates, free home delivery, easy refill management, and a dedicated patient support team. We're proud to have an industry-leading patient satisfaction score of <strong>4.8/5.0 on <a href="https://www.trustpilot.com/review/phil.us" target="_blank" rel="noopener">TrustPilot</a></strong> from 18,000+ patients.</p><p><a href="/demo/" target="_blank" rel="noopener">Get in touch for a full tour of our patient experience and support services</a>.</p>`,
      },
      {
        question: "What does your provider experience look like?",
        answer: `<p>Our provider experience is easy and intuitive. Prescribers simply send a prescription to PHILRx in the EMR, and our platform has one-click PA submissions and ongoing updates directly built in, ensuring patients receive prescriptions easily and affordably while allowing prescribers to use their existing tools and workflows. There is no new software to download or tools to learn with PHILRx.</p><p>We also offer a dedicated HCP Engagement Team for ongoing education and support.</p><p><a href="/demo/" target="_blank" rel="noopener">Get in touch to learn more about our HCP experience and engagement services</a>.</p>`,
      },
    ],
  },
  {
    title: "Pharmacy Network",
    items: [
      {
        question: "How does your pharmacy network work?",
        answer: `<p>Our integrated pharmacy network of retail, chain, and specialty pharmacy partners offers <strong>98%+ plan coverage</strong> across all 50 states and territories, with free Rx delivery. A dedicated Partner Pharmacy team manages our network, and each partner pharmacy is fully integrated and contracted with PHIL, equipping our pharma clients with full control and visibility at the point of dispense. We also offer wholesale capabilities to support our integrated network.</p>`,
      },
      {
        question: "Do you have a cash pharmacy?",
        answer: `<p>Yes. PHIL offers a highly flexible, end-to-end patient access platform that empowers brands to custom-build the optimal path to therapy. While we excel at Direct-to-Patient (DTP) models, our capabilities span comprehensive coverage, cash-pay, and hybrid solutions.</p><p>We offer a flexible, multi-pharmacy ecosystem that combines PHIL's cash pharmacies with a robust, national network of partner pharmacies. Rather than relying on a single channel, brands leverage this comprehensive network to support nationwide fulfillment and maximize patient reach.</p><p><a href="/demo/" target="_blank" rel="noopener">Reach out and we can help you determine the right-fit access solution for your brand</a>.</p>`,
      },
      {
        question:
          "Do you support non-commercial programs (i.e. PAP, bridge, quick start)?",
        answer: `<p>Yes. We support non-commercial programs through our non-commercial dispensing pharmacies, including our cash pharmacy, and through non-commercial pharmacies in our network for additional capacity.</p>`,
      },
    ],
  },
  {
    title: "Impact & Outcomes",
    items: [
      {
        question:
          "How are you able to achieve 85%+ PA submission rates?",
        answer: `<p>We have a proprietary PA process that integrates directly into prescribers' existing workflows and enables 1-click PA submissions to maximize covered dispenses. A dedicated PA Specialist team actively monitors PA submissions and script quality, and field team tools let reps have proactive conversations with prescribers about the status of each script.</p>`,
      },
      {
        question: "What data capabilities does PHIL offer?",
        answer: `<p>We have a real-time data dashboard with AI-powered insights that provides in-depth program recommendations at the script, provider, territory, and payer level. Additionally, we have a dedicated Client Insights team that partners closely with clients to actively review program data and provide strategic recommendations and optimization plans.</p><p><a href="/demo/" target="_blank" rel="noopener">Click here to book a full walk-through of PHIL's comprehensive data tools</a>.</p>`,
      },
      {
        question: "How does PHIL improve Gross-to-Net (GTN)?",
        answer: `<p>We are proud to achieve industry-leading outcomes for our clients: <strong>90%+ patient enrollment</strong>, <strong>85%+ PA submissions</strong>, <strong>2x+ covered dispenses</strong> (vs retail), and <strong>3x+ adherence rates</strong> (vs retail), which have a multiplicative effect on improving gross-to-net performance.</p><p>We help pharmaceutical brands improve commercial performance through our tech-enabled hub, proprietary PA process, and integrated pharmacy network, seamlessly integrated into a high-touch support model and white-glove partnership approach.</p><p>Want to forecast your brand's GTN potential with PHIL? <a href="/gtn/" target="_blank" rel="noopener">Use our self-serve GTN calculator</a>.</p>`,
      },
    ],
  },
];

// ─── Patients Section (flat accordion) ────────────────────────────────────────

export const PATIENT_FAQS: FlatFaqItem[] = PATIENT_FAQ_ITEMS;

// ─── Providers Section ────────────────────────────────────────────────────────

export const PROVIDER_CATEGORIES: FaqCategory[] = PROVIDER_FAQ_GROUPS.map(
  (g) => ({ title: g.title, items: g.items })
);
