/** Which colours the page wears. See `.themePatient` and `.themeHcp` in researchReport.module.css. */
export type ReportTheme = "patient" | "hcp";

export interface Stat {
  value: string;
  text: string;
}

export interface Finding {
  title: string;
  body: string;
}

export interface Faq {
  question: string;
  answer: string;
  /** Part of the answer to render as a link to the form. */
  formLinkText?: string;
}

export interface Quote {
  text: string;
  name: string;
  role: string;
  /** URL of the speaker's photo (a 120px square, shown at 60px). */
  photo: string;
}

export interface HeroCopy {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  /** Rendered as start + noWrap + end; `noWrap` keeps a phrase such as "Direct-to-Patient" on one line. */
  subtitle: { start: string; noWrap?: string; end?: string };
  intro: string;
  mobileCta: string;
}

export interface OverviewCopy {
  heading: string;
  headingAccent: string;
  body: string;
}

export interface CtaCopy {
  eyebrow: string;
  heading: string;
  body: string;
  label: string;
  href: string;
}

/** The form card: HubSpot ids, the report it releases and every string the card shows. */
export interface FormConfig {
  /** The ID the download routes know this report by (see src/utils/gatedReports.ts). */
  reportId: string;
  portalId: string;
  formId: string;
  eyebrow: string;
  privacy: string;
  readyTitle: string;
  /** Shown when the report opened in its own tab. */
  readyBody: string;
  /** Shown when it could not be opened automatically. */
  readyManual: string;
  openLabel: string;
  error: string;
  /** Replaces HubSpot's label and placeholder on the email field. */
  emailLabel: string;
}
