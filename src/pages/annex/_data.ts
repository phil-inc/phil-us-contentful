// ─── SEO ─────────────────────────────────────────────────────────────────────

export const ANNEX_TITLE = "Consumer Annex | PHIL";
export const ANNEX_DESC =
  "PHIL's supplemental U.S. consumer health data privacy statement, consumer health data authorization, and supplemental U.S. privacy notice.";
export const ANNEX_URL = "https://phil.us/annex/";

// ─── Links used across the annex content ─────────────────────────────────────

export const PRIVACY_PATH = "/privacy/";
export const PRIVACY_EMAIL = "privacy@usephil.com";
export const PHIL_HOME_URL = "http://www.phil.us";
export const WA_AG_COMPLAINT_URL = "http://www.atg.wa.gov/file-complaint";
export const GOOGLE_PRIVACY_URL = "https://policies.google.com/privacy?hl=en-US";
export const GOOGLE_OPTOUT_URL =
  "https://support.google.com/websearch/contact/content_removal_form?hl=en";
export const OPTOUT_FORM_URL = "https://forms.gle/aRdZaLBDYijBpiCs8";

// ─── Annex A — Consumer health data we collect (examples) ────────────────────

export const CHD_EXAMPLES: string[] = [
  "Information that could identify your attempt to seek health care services or information, including services that allow you to assess, measure, improve, or learn about your or another person's health. For example, we collect your search queries on the Services, which may include queries or other information concerning medical conditions or other health-related topics.",
  "Information about your health-related conditions, symptoms, status, diagnoses, disease, testing, or treatments.",
  "Information about social, psychological, behavioral, and medical interventions.",
  "Information about use or purchase of prescribed medication(s).",
  "Information about measurements of bodily functions, vital signs, symptoms, or characteristics including photographs.",
  "Information about diagnoses or diagnostic testing, treatment, or medication.",
  "Information about surgeries or other health-related procedures.",
  "Reproductive or sexual health information.",
  "Information about gender-affirming care.",
  "Biometric information.",
  "Genetic data.",
  "Information about your access to healthcare, including precise location information that could reasonably indicate an attempt to acquire or receive health services or supplies.",
  "Information processed to associate or identify an individual with the data listed above derived or extrapolated from non-health information.",
  "Information related to the precise (geo)location information of a consumer used to indicate an attempt by a consumer to receive health care services or products.",
  "Other information that may be used to infer or derive data related to the above or other consumer health data.",
];

// ─── Annex A — Sharing of consumer health data (recipients) ──────────────────

export const CHD_SHARING_ENTITIES: string[] = [
  "Business Collaborators (including pharmaceutical manufacturers, biotechnology companies, specialty pharmacies, and other healthcare industry partners with whom Phil collaborates to provide patient access, pharmacy, or therapy support services)",
  "Product co-promotion partners",
  "Product co-development partners",
  "Marketing and Advertising Agencies",
  "Social Media Companies and Platforms",
  "Service Providers (including those hosting or analyzing data on our behalf, those assisting with fraud prevention, those assisting in program administration, those assisting in incident management and reporting, those administering our call center and websites, and those who assist with our information technology and security programs)",
  "Emergency Personnel",
  "Authorized/legal representatives, family members, and caregivers",
  "Third parties (including those with whom Phil has joint marketing and similar arrangements, those who provide marketing and data analytics services, those who provide program enrollment or product fulfillment, payment, and authorization, other third parties as necessary to complete transactions, provide products/services, protect our rights or the rights of others, or where required by law)",
  "Parties to a corporate transaction",
  "Phil lawyers, auditors, and consultants",
  "Legal and regulatory bodies",
];

// ─── Annex C — Notice at collection ──────────────────────────────────────────

export const NOTICE_AT_COLLECTION: string[] = [
  "Personal Information Collected. See the section of this Supplemental U.S. Privacy Notice titled “Overview of Personal Information Collected, Disclosed, Sold and/or Shared” for a list of personal information which may be collected. If we have previously collected personal information in the past 12 months, we may collect that personal information from you.",
  "Uses of Personal Information. See the section of this Supplemental U.S. Privacy Notice titled “Uses of Personal Information” for a list of the purposes for which we use personal information.",
  "Is Personal Information “Sold” or “Shared” for “Cross-Context Behavioral Advertising”? Yes. See the section of this Supplemental U.S. Privacy Notice titled “Overview of Personal Information Collected, Disclosed, Sold and/or Shared” for more details. If we have previously “sold” personal information or “shared” personal information for “cross-context behavioral advertising” in the past 12 months, we may “sell” or “share” that personal information if collected from you. See the section of this Supplemental U.S. Privacy Notice titled “Right to Opt Out of ‘Sales’ of Personal Information and/or ‘Sharing’ for ‘Cross-Context Behavioral Advertising’” for instructions on how to opt-out of these activities.",
  "Personal Information Retention. To determine the appropriate retention period for personal information, we may consider applicable legal requirements, the amount, nature, and sensitivity of the personal information, certain risk factors, the purposes for which we process your personal information, and whether we can achieve those purposes through other means.",
];

// ─── Annex C — Uses of personal information ──────────────────────────────────
// Items flagged `priv` end with "as further described in our Privacy Notice;"
// (the Privacy Notice link is appended by the renderer).

export const USES_OF_PI: { text: string; priv?: boolean }[] = [
  { text: "Providing the Sites", priv: true },
  { text: "Processing for administrative purposes", priv: true },
  {
    text: "Processing to improve the Sites and develop new products and services,",
    priv: true,
  },
  { text: "Processing to operate our business,", priv: true },
  { text: "Processing for marketing purposes", priv: true },
  { text: "Processing with your consent or direction", priv: true },
  {
    text: "Auditing related to counting ad impressions to unique visitors, verifying positioning and quality of ad impressions, and auditing compliance with this specification and other standards;",
  },
  {
    text: "Helping to ensure security and integrity to the extent the use of personal information is reasonably necessary and proportionate for these purposes;",
  },
  {
    text: "Debugging to identify and repair errors that impair existing intended functionality;",
  },
  {
    text: "Short-term, transient use, including, but not limited to, non-personalized advertising shown as part of your current interaction with Phil;",
  },
  {
    text: "Maintaining or servicing accounts, providing customer service, processing or fulfilling orders and transactions, verifying customer information, processing payments, providing financing, providing analytic services, providing storage, or providing similar services;",
  },
  { text: "Providing advertising and marketing services;" },
  {
    text: "Undertaking internal research for technological development and demonstration;",
  },
  {
    text: "Undertaking activities to verify or maintain the quality or safety of a service or device that is owned, manufactured, manufactured for, or controlled by Phil, and to improve, upgrade, or enhance the service or device that is owned, manufactured, manufactured for, or controlled by Phil.",
  },
];

// ─── Annex C — Sensitive personal information purposes ────────────────────────

export const SENSITIVE_PI_PURPOSES: string[] = [
  "To perform the services or provide the goods reasonably expected by an average consumer who requests those goods or services.",
  "To prevent, detect, and investigate security incidents that compromise the availability, authenticity, integrity, and or confidentiality of stored or transmitted personal information.",
  "To resist malicious, deceptive, fraudulent, or illegal actions directed at Phil and to prosecute those responsible for those actions.",
  "To ensure the physical safety of natural persons.",
  "For short-term, transient use.",
  "Maintaining or servicing accounts, providing customer service, processing or fulfilling orders and transactions, verifying customer information, processing payments, providing financing, providing analytic services, providing storage, or providing similar services.",
  "To verify or maintain the quality or safety of a product, service, or device that is owned, manufactured, manufactured for, or controlled by Phil, and to improve, upgrade, or enhance the service or device that is owned, manufactured by, manufactured for, or controlled by Phil.",
  "For purposes that do not infer characteristics about individuals.",
];

// ─── Annex C — Notice of financial incentive (examples) ──────────────────────

export const INCENTIVE_EXAMPLES: string[] = [
  "One-Time Discount. We may offer you a discount on your first order if you provide us your email address and agree to receive marketing emails in exchange for a one-time discount.",
  "Refer-a-Friend Program. We may offer a discount on your future purchase when you provide your personal information along with your friends' or colleagues' personal information, and they make a purchase. The referred party may also receive a reward in the form of a discount on the first order and/or a free service for making a purchase through your referral.",
];
