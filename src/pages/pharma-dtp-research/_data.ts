// Copy for /pharma-dtp-research/ (MRTG-1461), verbatim from the design
// "Manufacturer DTP Report.dc.html".

export const PAGE_PATH = "/pharma-dtp-research/";

/** Publication time of the report. In structured data only; not shown on the page. */
export const PUBLISHED_AT = "2026-10-20T09:00:00-04:00";

export const SEO = {
  title: "The DTP Breakthrough: Pharma Direct-to-Patient Report | PHIL",
  description:
    "PHIL surveyed 74 U.S. life sciences leaders: 3 in 4 call direct-to-patient (DTP) a mission-critical or very important priority. Get the 2026 DTP report.",
};

/** The ID the download routes know this report by (see src/utils/gatedReports.ts). */
export const REPORT_ID = "pharma-dtp-research";

export const HUBSPOT_PORTAL_ID = "20880193";
export const HUBSPOT_FORM_ID = "8445e59d-c99c-4646-be0f-8831f50ae311";

export const HERO = {
  eyebrow: "2026 Industry Research Report",
  titleLead: "The",
  titleAccent: "DTP Breakthrough:",
  /** Rendered as start + noWrap + end, with "Direct-to-Patient" kept on one line. */
  subtitle: {
    start: "A Deep Dive on Pharma’s ",
    noWrap: "Direct-to-Patient",
    end: " Next Generation",
  },
  intro:
    "PHIL surveyed 74 U.S. life sciences leaders in October 2026 to uncover where direct-to-patient stands now and is headed next.",
  mobileCta: "Download Report →",
};

export interface Stat {
  value: string;
  text: string;
}

export const STATS: Stat[] = [
  {
    value: "3 in 4",
    text: "leaders report DTP is a “mission critical” or “very important” strategic priority today.",
  },
  {
    value: "70%",
    text: "report DTP has already had a “transformative” or “significant” impact on patient access",
  },
  {
    value: "89%",
    text: "are currently using or actively exploring AI in DTP programs",
  },
];

export const OVERVIEW = {
  heading:
    "Direct-to-Patient Has Transformed into an Established Access Infrastructure with Significant Strategic Priority.",
  headingAccent: "Are You Prepared for What Comes Next?",
  body:
    "Direct-to-patient (DTP) has become a core commercial infrastructure. PHIL’s October 2026 survey of 74 U.S. life sciences leaders highlights direct-to-patient's growing impact, strategic opportunities, and key investments for 2027.",
};

export interface Finding {
  title: string;
  body: string;
}

export const FINDINGS_LABEL = "Key findings:";

export const FINDINGS: Finding[] = [
  {
    title: "Building programs centered around the patient experience",
    body: "Patient experience, with affordability at the center, is the leading driver of DTP success. Leaders are expanding into new areas and opportunities to deliver more personalized patient experiences.",
  },
  {
    title: "Future-proofing programs with flexible access partners",
    body: "Leaders are investing in external partners to co-create the next generation of DTP, with the flexibility to adapt as patient needs and regulations change.",
  },
  {
    title: "Evolving into a core commercial strategy",
    body: "As DTP becomes mission critical, established programs show where the industry is headed: expanded infrastructure that operates as a core commercial function.",
  },
];

export const QUOTE = {
  /** Lit one by one as the visitor scrolls. */
  sentences: [
    "“Direct-to-patient is becoming core patient access infrastructure, not just another channel.",
    "And the data makes clear that the future isn’t cash versus coverage.",
    "It’s giving life sciences brands the flexibility to use both, and getting each patient onto the pathway that gives them the best access to therapy.”",
  ],
  name: "Deepak Thomas",
  role: "CEO & Founder, PHIL Inc.",
};

export const CTA = {
  eyebrow: "Accelerate DTP Success",
  heading: "Build The DTP Program that Lasts",
  body: "PHIL is the direct-to-patient solution that combines an end-to-end platform with the flexibility to deliver hybrid access pathways and custom patient experiences.",
  label: "Book Demo →",
  href: "/demo/",
};

export interface Faq {
  question: string;
  answer: string;
  /** Part of the answer to render as a link to the form. */
  formLinkText?: string;
}

export const FAQ_HEADING = "FAQs on the Research";

export const FAQS: Faq[] = [
  {
    question: "How was the survey collected?",
    answer:
      "PHIL surveyed 74 U.S. life sciences professionals in October 2026. An independent third-party research firm collected the sample, and responses were 100% anonymous. 65% of respondents work in pharmaceuticals and 35% in biotechnology. By job function, 43% are in leadership and 23% in patient access, with the rest in commercial, innovation, marketing and sales, and market access. The research dives into manufacturers with established and emerging programs, and the key trends shaping the next phase of direct-to-patient.",
  },
  {
    question: "What does the research cover?",
    answer:
      "The report examines how direct-to-patient has become established access infrastructure, from strategic priority and program models to AI and specialty expansion. The research looks ahead at the investments, barriers, and partner criteria set to define the coming year.",
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

export const FORM = {
  eyebrow: "Get The Report",
  privacy: "By submitting, you agree to PHIL's privacy policy.",
  readyTitle: "Your report is ready.",
  readyBody:
    "The DTP Breakthrough has opened in a new tab. If it didn’t open, use the button below.",
  openLabel: "Open Report →",
  error: "We couldn’t open the report. Please try the button again.",
};
