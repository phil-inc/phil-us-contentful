// Copy for /hcp-dtp-research/ (MRTG-1462), verbatim from the design "HCP DTP Report.dc.html".
// The title and description are not in the design: they were written for this page.
import type { CtaCopy, Faq, Finding, FormConfig, HeroCopy, OverviewCopy, Quote, Stat } from "components/ResearchReport/types";

export const PAGE_PATH = "/hcp-dtp-research/";

export const SEO = {
  title: "The DTP Bridge: HCP Direct-to-Patient Research Report | PHIL",
  description:
    "PHIL surveyed 207 U.S. healthcare providers: 1 in 2 lack confidence patients can navigate out-of-pocket costs. Get the 2026 HCP direct-to-patient report.",
};

export const HERO: HeroCopy = {
  eyebrow: "2026 HCP Research Report",
  titleLead: "The",
  titleAccent: "DTP Bridge:",
  subtitle: { start: "Integrating HCP Perspectives into Digital Access Programs" },
  intro:
    "PHIL surveyed 207 U.S. healthcare providers in April 2026 to uncover what they need from pharma's digital access and direct-to-patient programs, and what the data means for brand leaders.",
  mobileCta: "Download Report →",
};

export const STATS: Stat[] = [
  { value: "1 in 2", text: "HCPs are not confident patients can navigate out-of-pocket medication costs on their own" },
  { value: "70%", text: "say prior authorization process prevents timely, affordable access" },
  { value: "#1", text: "factor HCPs consider when prescribing to a digital channel: patient receives lowest price" },
];

export const OVERVIEW: OverviewCopy = {
  heading: "HCPs Are Ready to Prescribe Through Digital Channels.",
  headingAccent: "Is Your Access Program Built to Earn Their Trust?",
  body: "PHIL surveyed 207 U.S. healthcare providers on what drives their prescribing decisions for digital access programs. The findings highlight what moves the needle on improving patient outcomes and provider adoption.",
};

export const FINDINGS_LABEL = "What's Inside";

export const FINDINGS: Finding[] = [
  {
    title: "Patient Affordability is the #1 Priority",
    body: "1 in 2 HCPs lack confidence that patients can navigate out-of-pocket costs on their own, and top abandonment reasons include non-insurance coverage and high OOP costs. When prescribing to a digital channel, HCPs say lowest available price is the #1 most important factor they consider.",
  },
  {
    title: "Utilization Management Support Drives Adoption",
    body: "70% of HCPs cite prior authorization as the top barrier to timely, affordable access. Beyond pricing, HCPs want administrative support for utilization management tasks and dedicated patient and provider support as key program features.",
  },
];

/** The photo is a 120px square, shown at 60px; index.tsx imports the file. */
export type QuoteData = Omit<Quote, "photo">;

export const QUOTE: QuoteData = {
  text: "Healthcare providers are focused on delivering the best possible care for their patients. The pharma brands that win long-term are those building digital access programs that remove affordability barriers and prior authorization hurdles, while easing the operational burden on the office staff who manage these processes every day.",
  name: "Lirys Crawford",
  role: "VP HCP Engagement, PHIL Inc.",
};

export const CTA: CtaCopy = {
  eyebrow: "See What's Possible",
  heading: "Ready to Build a Best-in-Class Access Program?",
  body: "PHIL helps leading pharma brands launch direct-to-patient programs that exceed HCP and patient expectations and drive commercial impact at scale.",
  label: "Book Demo →",
  href: "/demo/",
};

export const FAQ_HEADING = "FAQs About the Research";

export const FAQS: Faq[] = [
  {
    question: "How was the survey collected?",
    answer:
      "PHIL surveyed 207 U.S. healthcare providers in April 2026. An independent third-party research firm collected the sample, and responses were 100% anonymous.",
  },
  {
    question: "What does the research cover?",
    answer:
      "The report uncovers what healthcare providers need from pharma's digital access and direct-to-patient programs, from patient affordability and out-of-pocket costs to prior authorization and utilization management support, and what the data reveals for pharma leaders.",
  },
  {
    question: "Who is the research relevant for?",
    answer:
      "Pharmaceutical and biotechnology professionals that oversee access and commercial strategy, including leadership, patient access, commercial, brand, and innovation teams.",
  },
  {
    question: "How do I access the research?",
    answer: "Access the research by filling out the form on this page.",
    formLinkText: "the form on this page",
  },
];

export const FORM: FormConfig = {
  /** The ID the download routes know this report by (see src/utils/gatedReports.ts). */
  reportId: "hcp-dtp-research",
  portalId: "20880193",
  formId: "c640ef90-48f7-4d85-9fad-ca740848302b",
  eyebrow: "Get the full report",
  privacy: "By submitting, you agree to PHIL's privacy policy.",
  readyTitle: "Your report is ready.",
  readyBody: "The report has opened in a new tab. If it didn’t open, use the button below.",
  /** Not in the design: shown when the report couldn't be opened automatically. */
  readyManual: "Use the button below to open the report.",
  openLabel: "Open Report →",
  error: "We couldn’t open the report. Please try the button again.",
  emailLabel: "Business Email",
};
