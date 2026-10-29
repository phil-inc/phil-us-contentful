// Copy for /patient-dtp-research/ (MRTG-1462), verbatim from the design "Patient DTP Report.dc.html".
// The title and description are not in the design: they were written for this page.
import type { CtaCopy, Faq, Finding, FormConfig, HeroCopy, OverviewCopy, Quote, Stat } from "components/ResearchReport/types";

export const PAGE_PATH = "/patient-dtp-research/";

export const SEO = {
  title: "The DTP Imperative: Patient Direct-to-Patient Report | PHIL",
  description:
    "PHIL surveyed 1,049 U.S. patients: 96% want price transparency before committing to a medication. Get the 2026 patient direct-to-patient research report.",
};

export const HERO: HeroCopy = {
  eyebrow: "2026 Patient Research Report",
  titleLead: "The",
  titleAccent: "DTP Imperative:",
  subtitle: {
    start: "Building ",
    noWrap: "Direct-to-Patient",
    end: " Programs That Exceed Patient Expectations",
  },
  intro:
    "PHIL surveyed 1,049 U.S. patients in March 2026 to reveal their most pressing expectations for today's direct-to-patient programs, and what the data means for pharma leaders.",
  mobileCta: "Download Report →",
};

export const STATS: Stat[] = [
  { value: "1 in 3", text: "patients will abandon a prescription if they can't go through their preferred access channel" },
  { value: "96%", text: "want price transparency before committing to a medication" },
  { value: "95%", text: "want DTP programs to mirror e-commerce experiences" },
];

export const OVERVIEW: OverviewCopy = {
  heading: "Patient Expectations Have Changed.",
  headingAccent: "This Research Reveals What Patients Want from Pharma's Direct-to-Patient Programs.",
  body: "PHIL surveyed 1,049 U.S. patients who have received a prescription medication in the past five years. The findings highlight the most pressing needs, challenges, and preferences of today's patients, and what the next generation of DTP programs must deliver.",
};

export const FINDINGS_LABEL = "What's Inside";

export const FINDINGS: Finding[] = [
  {
    title: "The Awareness-to-Access Gap",
    body: "How access and affordability barriers are creating drop-off between patient interest and first fills, and where DTP programs can meaningfully bridge the gap.",
  },
  {
    title: "The Pricing Imperative",
    body: "Affordable, transparent pricing is pharma's single biggest lever for driving DTP adoption, starts, and long-term adherence.",
  },
  {
    title: "High Standards for Experience",
    body: "Patients expect DTP programs to mirror the seamless digital experience they get everywhere else, and brand-led experiences are key for driving trust.",
  },
];

/** `photoKey` names the file imported in index.tsx (a 120px square, shown at 60px). */
export type QuoteData = Omit<Quote, "photo"> & { photoKey: "deepak" | "sahil" | "allison" | "chander" };

export const QUOTES: QuoteData[] = [
  {
    text: "Today, consumer-grade direct-to-patient programs that are custom-built to exceed patient expectations are the industry's most powerful strategic lever for improving patient outcomes while driving commercial performance at scale.",
    name: "Deepak Thomas",
    role: "CEO & Founder, PHIL Inc.",
    photoKey: "deepak",
  },
  {
    text: "Affordable, transparent pricing is pharma's single biggest opportunity for maximizing patient starts and adherence.",
    name: "Sahil Naik",
    role: "Chief Growth Officer, PHIL Inc.",
    photoKey: "sahil",
  },
  {
    text: "A brand-led DTP channel is one of the most underleveraged opportunities in pharma today, it's how manufacturers win patient trust, drive adherence, and build lasting brand loyalty.",
    name: "Allison Bridges",
    role: "SVP Client Success, PHIL Inc.",
    photoKey: "allison",
  },
  {
    text: "Now's the time to build a scalable infrastructure that removes access barriers to translate intent into therapy.",
    name: "Chander Viswanathan",
    role: "Chief Technology Officer, PHIL Inc.",
    photoKey: "chander",
  },
];

export const CTA: CtaCopy = {
  eyebrow: "See What's Possible",
  heading: "Ready to Build a Best-in-Class DTP Program?",
  body: "PHIL helps leading pharma brands launch custom direct-to-patient programs that exceed patient expectations and drive commercial impact.",
  label: "Book Demo →",
  href: "/demo/",
};

export const FAQ_HEADING = "FAQs About the Research";

export const FAQS: Faq[] = [
  {
    question: "How was the survey collected?",
    answer:
      "PHIL surveyed 1,049 U.S. patients in March 2026. An independent third-party research firm collected the sample, and responses were 100% anonymous. All respondents have received a prescription medication in the past five years in the United States.",
  },
  {
    question: "What does the research cover?",
    answer:
      "The report uncovers patients' most pressing expectations for today's direct-to-patient programs, from the awareness-to-access gap and the role of affordable, transparent pricing to patients' high standards for digital, brand-led experiences, and what the data reveals for pharma leaders.",
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
  reportId: "patient-dtp-research",
  portalId: "20880193",
  formId: "8dcb0178-552c-446b-8fe6-08e4fc48c33d",
  eyebrow: "Get the full report",
  privacy: "By submitting, you agree to PHIL's privacy policy.",
  readyTitle: "Your report is ready.",
  readyBody: "The DTP Imperative has opened in a new tab. If it didn’t open, use the button below.",
  /** Not in the design: shown when the report couldn't be opened automatically. */
  readyManual: "Use the button below to open The DTP Imperative.",
  openLabel: "Open Report →",
  error: "We couldn’t open the report. Please try the button again.",
  emailLabel: "Business Email",
};
