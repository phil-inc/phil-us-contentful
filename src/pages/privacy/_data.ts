// ─── SEO ─────────────────────────────────────────────────────────────────────

export const PRIVACY_TITLE = "Privacy Notice | PHIL";
export const PRIVACY_DESC =
  "Phil, Inc.'s Privacy Notice — how we collect, use, and share personal information across our website, mobile application, and other Services.";
export const PRIVACY_URL = "https://phil.us/privacy/";

// ─── Links / contact ─────────────────────────────────────────────────────────

export const HIPAA_PATH = "/hipaa/";
export const ANNEX_A_PATH = "/annex/#annex-a";
export const PRIVACY_EMAIL = "privacy@usephil.com";
export const PRIVACY_PHONE_LABEL = "(855) 977-0975";
export const PRIVACY_PHONE_HREF = "tel:1-855-977-0975";

export const PHIL_URL = "http://www.phil.us";
export const MYPHIL_URL = "http://www.myphil.us";
export const GPC_URL = "http://www.globalprivacycontrol.org/";
export const RIGHTS_FORM_URL = "https://forms.gle/aRdZaLBDYijBpiCs8";

export const GOOGLE_ANALYTICS_PRIVACY_URL =
  "http://www.google.com/policies/privacy/partners/";
export const GOOGLE_ANALYTICS_OPTOUT_URL =
  "http://tools.google.com/dlpage/gaoptout";
export const HUBSPOT_PRIVACY_URL = "https://legal.hubspot.com/privacy-policy";
export const HUBSPOT_OPTOUT_URL = "https://preferences.hubspot.com/";
export const LINKEDIN_PRIVACY_URL = "https://www.linkedin.com/legal/privacy-policy";
export const LINKEDIN_OPTOUT_URL =
  "https://www.linkedin.com/help/linkedin/answer/62931";
export const ZOOMINFO_PRIVACY_URL = "https://www.zoominfo.com/legal/privacy-policy";
export const ZOOMINFO_OPTOUT_URL = "https://www.zoominfo.com/trust-center";
export const ANDROID_OPTOUT_URL =
  "https://support.google.com/googleplay/android-developer/answer/6048248?hl=en";
export const IOS_OPTOUT_URL = "https://support.apple.com/en-us/HT202074";
export const MOBILE_CHOICE_URL = "https://www.networkadvertising.org/mobile-choice/";
export const NAI_OPTOUT_URL = "http://www.networkadvertising.org/managing/opt_out.asp";
export const DAA_OPTOUT_URL = "http://www.aboutads.info/choices/";

// ─── Table of contents ───────────────────────────────────────────────────────

export const TOC: { num: string; label: string; anchor: string }[] = [
  { num: "1.", label: "UPDATES TO THIS PRIVACY NOTICE", anchor: "updates" },
  { num: "2.", label: "PERSONAL INFORMATION WE COLLECT", anchor: "collect" },
  { num: "3.", label: "HOW WE USE PERSONAL INFORMATION", anchor: "use" },
  { num: "4.", label: "HOW WE DISCLOSE PERSONAL INFORMATION", anchor: "disclose" },
  { num: "5.", label: "YOUR PRIVACY CHOICES AND RIGHTS", anchor: "choices-rights" },
  {
    num: "6.",
    label: "INTERNATIONAL TRANSFERS OF PERSONAL INFORMATION",
    anchor: "international",
  },
  { num: "7.", label: "DATA SECURITY AND RETENTION", anchor: "security-retention" },
  { num: "8.", label: "CHILDREN’S PERSONAL INFORMATION", anchor: "children" },
  { num: "9.", label: "THIRD-PARTY WEBSITES/APPLICATIONS", anchor: "third-party" },
  { num: "10.", label: "CONTACT US", anchor: "contact" },
];

// ─── Section 2 — Information you provide (bold lead-in + body) ─────────────────

export const INFO_PROVIDED: { label: string; body: string }[] = [
  {
    label: "Account Information.",
    body: "We may collect personal information in connection with the creation or administration of your account. This personal information may include, but is not limited to, your name, date of birth, gender, email address, phone number, medical and health information, and other information you store when registering and maintaining your account. To fully utilize our Services, you may be required to fill out and submit forms containing additional personal information such as your postal address, social security number, and other personal information relevant to your health status, diagnosis, treatment, and insurance coverage.",
  },
  {
    label: "Purchases.",
    body: "We may collect personal information and details associated with your purchases, including payment information. Any payments made via our Services are processed by third-party payment processors. We do not directly collect or store any payment card information entered through our Services, but we may receive information associated with your payment card information (e.g., your billing details).",
  },
  {
    label: "Your Communications with Us.",
    body: "We, and our service providers, may collect the information you communicate to us, such as through email or our online chat tool.",
  },
  {
    label: "Surveys.",
    body: "We may contact you to participate in surveys. If you decide to participate, we may collect personal information from you in connection with the survey.",
  },
  {
    label: "Conferences, Trade Shows, and Other Events.",
    body: "We may collect personal information from individuals when we attend or host conferences, trade shows, and other events.",
  },
  {
    label: "Business Development and Strategic Partnerships.",
    body: "We may collect personal information from individuals and third parties to assess and pursue potential business opportunities.",
  },
  {
    label: "Job Applications.",
    body: "If you apply for a job with us, we will collect any personal information you provide in connection with your application, such as your contact information, educational and employment history, and CV information.",
  },
];

// ─── Section 3 — Provide the Services (bullets) ───────────────────────────────

export const PROVIDE_SERVICES: string[] = [
  "Managing your information;",
  "Providing access to certain areas, functionalities, and features of the Services;",
  "Delivering accurate and personalized recommendations through the use of artificial intelligence and machine learning capabilities;",
  "Providing newsletters, advertisements, and other promotional communications (with your consent);",
  "Answering requests for support;",
  "Communicating with you;",
  "Sharing personal information with third parties as needed to provide the Services;",
  "Processing your financial information and other payment methods for products and Services purchased;",
  "Processing applications if you apply for a job we post on our Services; and",
  "Allowing you to register for events.",
];

// ─── Section 3 — Administrative purposes (bullets) ────────────────────────────

export const ADMIN_PURPOSES: string[] = [
  "Pursuing our legitimate interests such as direct marketing, research and development (including marketing research), network and information security, and fraud prevention;",
  "Detecting security incidents, protecting against malicious, deceptive, fraudulent or illegal activity, and prosecuting those responsible for that activity;",
  "Carrying out analytics;",
  "Measuring interest and engagement in the Services;",
  "Improving, upgrading, or enhancing the Services through activities such as data management, analytics, lead scoring, data quality, business intelligence, and internal reporting;",
  "Analyzing, improving, upgrading, and/or enhancing the Services through the use of artificial intelligence and other methods;",
  "Developing new products and services;",
  "Creating de-identified and/or aggregated information. If we create or receive de-identified information, we will not attempt to reidentify such information, unless permitted by, or required to comply with, applicable laws;",
  "Ensuring internal quality control and safety;",
  "Authenticating and verifying individual identities, including requests to exercise your rights under this Privacy Notice;",
  "Debugging to identify and repair errors with the Services;",
  "Auditing relating to interactions, transactions, and other compliance activities;",
  "Enforcing our agreements and policies; and",
  "Carrying out activities required to comply with our legal obligations.",
];

// ─── Section 5 — Privacy rights (bold lead-in + optional body) ────────────────

export const PRIVACY_RIGHTS: { label: string; body?: string }[] = [
  { label: "Confirm Whether We Are Processing Your Personal Information" },
  { label: "Request Access to or Portability of Your Personal Information" },
  { label: "Request Correction of Your Personal Information" },
  { label: "Request Deletion of Your Personal Information" },
  {
    label: "Request Restriction of or Object to our Processing of Your Personal Information",
  },
  {
    label: "Request to Opt-Out of Certain Processing Activities",
    body: "including, as applicable, if we process your personal information for “targeted advertising” (as “targeted advertising” is defined by applicable privacy laws), if we “sell” your personal information (as “sell” is defined by applicable privacy laws), or if we engage in “profiling” in furtherance of certain “decisions that produce legal or similarly significant effects” concerning you (as such terms are defined by applicable privacy laws); and",
  },
  {
    label: "Withdraw Your Consent to our Processing of Your Personal Information",
    body: "Please note that your withdrawal will only take effect for future processing and will not affect the lawfulness of processing before the withdrawal.",
  },
];
