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

// ─── Annex C — Overview table (collected / disclosed / sold-shared) ──────────
// NOTE: The source doc renders this as a 3-column table. The column boundaries
// below were reconstructed from the flattened paste; legal should verify the
// disclosed-to vs. sold/shared-to split against the original document.

export const PI_TABLE_HEADERS = [
  "Category of Personal Information Collected",
  "Category of Third Parties To Whom Personal Information is Disclosed to for a Business Purpose",
  "Category of Third Parties To Whom Personal Information is Sold and/or Shared",
] as const;

export type PiTableRow = {
  category: string;
  description?: string;
  disclosedTo: string[];
  soldSharedTo: string[];
};

export const PI_TABLE_ROWS: PiTableRow[] = [
  {
    category: "Identifiers",
    description:
      "A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, Social Security number, or other similar identifiers.",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Emergency personnel",
      "Service providers",
      "Healthcare providers",
      "Health insurance companies (health plans) and other payors",
      "Authorized/legal representatives, family members, and caregivers",
      "Legal and regulatory bodies and other third parties as required by law",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category:
      "Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))",
    description:
      "Height, weight, hair/eye color, age/date of birth, gender, race/ethnicity, citizenship status, religion, information concerning sexuality/sex life, disability, personal characteristics and preferences, marital and family status, languages spoken, and other similar data elements",
    disclosedTo: [
      "Emergency personnel",
      "Service providers",
      "Healthcare providers",
      "Health insurance companies (health plans) and other payors",
      "Authorized/legal representatives, family members, and caregivers",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners including those providing program enrollment and product fulfillment services",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category: "Health Insurance Data",
    description:
      "Policy number, reimbursement data, co-pay data, coverage amount data, health values, sensor reading data (e.g., HBA1C, blood glucose, etc.), subscriber or account identification number, claims history, benefits information, Medicare/Medicaid number, other government payer number",
    disclosedTo: [
      "Service Providers, including to companies assisting in program administration",
      "Healthcare providers (including specialty pharmacies)",
      "Health insurance companies (health plans) and other payors",
      "Authorized/legal representatives, family members, and caregivers",
      "Our lawyers, auditors, and consultants",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: [
      "Business partners",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category: "Commercial information",
    description:
      "Records of personal property, products or services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies; propensity scores obtained from third parties, such as likelihood you may be interested in certain purchases or may be experiencing life events; products or services you have purchased; records of products or services purchased, obtained, reviewed, or considered; records of program enrollment and activity",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
      "Authorized/legal representatives, family members, and caregivers",
      "Our lawyers, auditors, and consultants",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: [
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category: "Personal information that reveals consumer’s genetic data",
    description:
      "Information derived from genetic testing, such as DNA sequences, gene mutations, chromosomal information, and inherited traits obtained through various methods including blood tests, saliva samples, and other biological specimens; information about a consumer’s predisposition to certain medical conditions, carrier status for genetic disorders, and responses to specific medications",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: [
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category:
      "Biometric information that is processed for the purpose of uniquely identifying a consumer",
    description:
      "Photograph, fingerprint, voice print, retina or iris image, or other unique physical representation (such as your digital or electronic signature on a patient consent form or program enrollment form)",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: [
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category: "Internet or other electronic network activity",
    description:
      "Browsing history, search history, information on a consumer's interaction with an internet website, application, or advertisement",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
      "Our lawyers, auditors, and consultants",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category: "Geolocation data",
    description: "Precise location data, geofencing data",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
      "Our lawyers, auditors, and consultants",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category: "Sensory data",
    description:
      "Smart device records, health values and sensor readings data (such as steps taken, movement information, data collected by our mobile apps, blood glucose levels, heart rate, and blood pressure), recording of a customer service call, recording from a CCTV camera in our facilities",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Emergency personnel",
      "Healthcare providers",
      "Health insurance companies (health plans) and other payors",
      "Authorized/legal representatives, family members, and caregivers",
      "Legal and regulatory bodies and other third parties as required by law",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
      "Clinical research organizations",
      "Clinical trial sites",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
      "Clinical research organizations",
      "Clinical trial sites",
    ],
  },
  {
    category: "Professional or employment-related information",
    description:
      "Employer and job title, medical license, employer location, information from a resume or CV, including education and certification credentials, information included in an IRS 1040 form",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Emergency personnel",
      "Healthcare providers",
      "Health insurance companies (health plans) and other payors",
      "Authorized/legal representatives, family members, and caregivers",
      "Legal and regulatory bodies and other third parties as required by law",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category:
      "Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Sec. 1232g, 34 C.F.R. Part 99))",
    description:
      "Records relating to academics, health/medical, discipline, special education, attendance, and standardized test scores.",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Healthcare providers",
      "Health insurance companies (health plans) and other payors",
      "Authorized/legal representatives, family members, and caregivers",
      "Legal and regulatory bodies and other third parties as required by law",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category:
      "Inferences drawn from other Personal Information to create a profile about a consumer",
    description:
      "Profile reflecting a consumer's preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes",
    disclosedTo: [
      "Service providers",
      "Emergency personnel",
      "Healthcare providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category:
      "Personal information that reveals a consumer’s social security, driver’s license, state identification card, or passport number",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category:
      "Personal information that reveals a consumer’s account log-in, financial account, debit card, or credit card number in combination with any required security or access code, password, or credentials allowing access to an account",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Emergency personnel",
      "Healthcare providers",
      "Health insurance companies (health plans) and other payors",
      "Authorized/legal representatives, family members, and caregivers",
      "Our lawyers, auditors, and consultants",
      "Legal and regulatory bodies and other third parties as required by law",
      "Consumer reporting agencies",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
    ],
    soldSharedTo: ["N/A"],
  },
  {
    category:
      "Personal information that reveals a consumer’s racial or ethnic origin, religious or philosophical beliefs, or union membership",
    disclosedTo: [
      "Service providers",
      "Emergency personnel",
      "Healthcare providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
      "Authorized/legal representatives, family members, and caregivers",
      "Our lawyers, auditors, and consultants",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category:
      "Personal information that reveals the contents of a consumer’s mail, email, and text messages unless Phil is the intended recipient of the communication",
    disclosedTo: [
      "Service providers",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
      "Authorized/legal representatives, family members, and caregivers",
      "Our lawyers, auditors, and consultants",
      "Legal and regulatory bodies and other third parties as required by law",
    ],
    soldSharedTo: ["N/A"],
  },
  {
    category:
      "Personal information collected and analyzed concerning a consumer’s health",
    description:
      "Information about physical or mental health, disease state, medical history or medical treatment or diagnosis, medicines taken; name/contact of a patient’s healthcare providers; general disease or product interest; health insurance company Insurance account number; information on payment for healthcare services (EOB forms, HSA statements, claims data, claims assistance records); health plan beneficiary names/numbers; information needed to accommodate disabilities; information about workplace accidents and occupational safety, medical record information, such as medical diagnosis, disease information, and treatment history; health values and sensor readings data, such as steps taken, blood glucose levels, heart rate, and blood pressure; drug allergies, prescriptions and dosing; medical appointment dates",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Emergency personnel",
      "Service providers",
      "Healthcare providers",
      "Health insurance companies (health plans) and other payors",
      "Authorized/legal representatives, family members, and caregivers",
      "Legal and regulatory bodies and other third parties as required by law",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
  {
    category:
      "Personal information collected and analyzed concerning a consumer’s sex life or sexual orientation",
    disclosedTo: [
      "Service providers",
      "Business partners",
      "Affiliates",
      "Advertising partners",
      "Internet service providers",
      "Data analytics providers",
      "Operating systems and platforms",
    ],
    soldSharedTo: [
      "Business partners",
      "Advertising partners",
      "Other third parties with whom you interact",
      "Internet service providers",
      "Data analytics providers",
      "Marketing technology providers",
      "Data enrichment providers",
      "Operating systems and platforms",
    ],
  },
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
// `label` renders bold, matching the source doc's bold lead-ins.

export const INCENTIVE_EXAMPLES: { label: string; body: string }[] = [
  {
    label: "One-Time Discount.",
    body: "We may offer you a discount on your first order if you provide us your email address and agree to receive marketing emails in exchange for a one-time discount.",
  },
  {
    label: "Refer-a-Friend Program.",
    body: "We may offer a discount on your future purchase when you provide your personal information along with your friends' or colleagues' personal information, and they make a purchase. The referred party may also receive a reward in the form of a discount on the first order and/or a free service for making a purchase through your referral.",
  },
];
