// ─── SEO ─────────────────────────────────────────────────────────────────────

export const HIPAA_TITLE = "HIPAA Notice of Privacy Practices | PHIL";
export const HIPAA_DESC =
  "PHIL's HIPAA Notice of Privacy Practices — how medical information about you may be used and disclosed, and how you can get access to this information.";
export const HIPAA_URL = "https://phil.us/hipaa/";

// ─── Contact details ─────────────────────────────────────────────────────────

export const HIPAA_PHONE_LABEL = "(855) 977-0975";
export const HIPAA_PHONE_HREF = "tel:1-855-977-0975";
export const HIPAA_EMAIL = "HIPAA@phil.us";

export const OCR_WEBSITE = "http://www.hhs.gov/ocr";
export const OCR_WEBSITE_LABEL = "www.hhs.gov/ocr";

// ─── Permissible uses & disclosures (bold lead-in + body) ─────────────────────

export const PERMISSIBLE_USES: { label: string; body: string }[] = [
  {
    label: "Treatment:",
    body: "PHIL uses and discloses your PHI to provide treatment to you. For example, PHIL may use and disclose your PHI to fill prescriptions and coordinate care with other providers involved in your treatment. In addition, PHIL may contact you to provide information about treatment alternatives or other health-related benefits and services that may be of interest to you.",
  },
  {
    label: "Payment:",
    body: "PHIL may use and disclose your PHI to obtain payment for equipment and services provided to you. For example, PHIL may use and disclose PHI to claim and obtain payment from your health insurer, HMO, or other company that arranges or pays the cost of some or all of your healthcare (“Payors”), to verify that Payors will pay for healthcare rendered or for eligibility inquiries.",
  },
  {
    label: "Health Care Operations:",
    body: "PHIL may use and disclose your PHI in performing a variety of business activities referred to as “health care operations.” These activities allow PHIL to improve the quality of care provided and reduce healthcare costs. For example, PHIL may use PHI to evaluate the competence of its pharmacists and other healthcare workers and to arrange for legal services.",
  },
  {
    label: "As Required by Law:",
    body: "PHIL will use and disclose your PHI whenever required by law. For example, PHIL is required to disclose PHI to the U.S. Department of Health and Human Services if requested to determine HIPAA compliance.",
  },
  {
    label: "Victims of Abuse, Neglect or Domestic Violence:",
    body: "If PHIL reasonably believes someone is a victim of abuse, neglect or domestic violence, PHIL may disclose PHI to a governmental authority, including a social service or protective services agency, authorized by law to receive reports of such abuse, neglect, or domestic violence.",
  },
  {
    label: "Health Oversight Activities:",
    body: "PHIL may disclose your PHI to a health oversight agency that oversees the healthcare system and is charged with responsibility for ensuring compliance with the rules of government health programs such as Medicare or Medicaid. For example, a government agency may request information while investigating possible insurance fraud.",
  },
  {
    label: "Judicial and Administrative Proceedings:",
    body: "PHIL may disclose your PHI in the course of a judicial or administrative proceeding in response to a legal order, subpoena or other lawful process.",
  },
  {
    label: "Law Enforcement Officials:",
    body: "PHIL may disclose your PHI to the police or other law enforcement officials as required or permitted by law or in compliance with a court order or a grand jury or administrative subpoena.",
  },
  {
    label: "Decedents:",
    body: "PHIL may disclose your PHI to a coroner or medical examiner as authorized by law and as necessary for these entities to carry out their lawful duties.",
  },
  {
    label: "Organ and Tissue Procurement:",
    body: "PHIL may disclose your PHI to organizations that facilitate organ, eye or tissue procurement, banking or transplantation.",
  },
  {
    label: "Research:",
    body: "PHIL may use or disclose your PHI for research if conducted in accordance with applicable law, such as pursuant to a privacy waiver or for activities preparatory to research.",
  },
  {
    label: "Threat to Health or Safety:",
    body: "PHIL may use or disclose your PHI to prevent or lessen a serious and imminent threat to a person’s or the public’s health or safety.",
  },
  {
    label: "Specialized Government Functions:",
    body: "PHIL may use or disclose your PHI for certain government functions, including but not limited to military and veterans’ activities; correctional institutions; national security and intelligence activities; or to the police or other law enforcement officials as required or permitted by law or in compliance with a court order or a grand jury or administrative subpoena.",
  },
  {
    label: "Workers’ Compensation:",
    body: "PHIL may disclose your PHI as authorized by and to the extent necessary to comply with state law relating to workers’ compensation or other similar programs.",
  },
  {
    label: "Business Associates:",
    body: "PHIL may disclose your PHI to third parties, known as business associates, that perform services on PHIL’s behalf. Business associates are required to agree to protect all PHI.",
  },
  {
    label: "De-Identification:",
    body: "PHIL may (directly or by permitting its business associates to do so) use or disclose PHI to create information that is de-identified in accordance with applicable law, including the HIPAA safe harbor and expert determination methods. Any disclosures of de-identified information, including for commercial purposes, will be conducted in accordance with applicable law and the HIPAA de-identification standards.",
  },
  {
    label: "Limited Data:",
    body: "PHIL may remove most identifiable information from a set of data and use and disclose this data set for research, public health and health care operations, provided the recipients of the data set agree to keep it confidential.",
  },
  {
    label: "Health Information Exchanges:",
    body: "PHIL may participate in one or more Health Information Exchanges (“HIEs”) and may electronically share your PHI for treatment, payment, healthcare operations and other permitted purposes with other participants in the HIE. HIEs allow your health care providers to efficiently access and use your PHI as necessary for treatment and other lawful purposes.",
  },
  {
    label: "Fundraising:",
    body: "PHIL does not use your PHI for fundraising purposes. If this practice changes, PHIL will update this Notice and provide you with an opportunity to opt out of receiving fundraising communications.",
  },
];

// ─── Highly confidential information categories ───────────────────────────────

export const HIGHLY_CONFIDENTIAL: string[] = [
  "is about mental health and developmental disabilities services;",
  "is about alcohol and drug abuse prevention, treatment, and referral;",
  "is about HIV/AIDS testing, diagnosis, or treatment;",
  "is about venereal disease(s); or",
  "is about genetic testing.",
];

// ─── Your rights (bold lead-in + body) ────────────────────────────────────────

export const YOUR_RIGHTS: { label: string; body: string }[] = [
  {
    label: "Right to Inspect and Copy Your Health Information:",
    body: "You may request access to or receive copies of your medical records, billing records and other records used to make decisions about you or direct PHIL to send a copy of your electronic information to another person designated by you in writing. There is a fee for obtaining copies of your records that is consistent with HIPAA and applicable state laws. Under limited circumstances, PHIL may deny access requests. If you desire access to your records, please submit a written request as described below under “For Further Information.”",
  },
  {
    label: "Right to Receive Confidential Communications:",
    body: "You may request to receive your PHI by alternative means of communication or at alternative locations. PHIL will accommodate all reasonable, written request from you.",
  },
  {
    label: "Right to Revoke Your Authorization:",
    body: "You may revoke any written authorization obtained in connection with your PHI, except to the extent that PHIL has taken action in reliance upon it, by delivering a written revocation statement to PHIL (see address under “For Further Information” below).",
  },
  {
    label: "Right to Amend Your Records:",
    body: "You have the right to request PHIL to amend your PHI. If you desire to amend your records, please send a written request for the amendment, including the reason for the amendment, to Patient Relations (see address below). You may obtain a form to request an amendment as described below under “For Further Information.” PHIL will comply with your request unless it believes that the information that would be amended is accurate and complete or other special circumstances apply.",
  },
  {
    label: "Right to Receive an Accounting of Disclosures:",
    body: "Upon request, you may obtain an accounting of certain disclosures of your PHI made by PHIL during any period of time prior to the date of your request provided such period does not exceed six years.",
  },
  {
    label: "Right to Receive Paper Copy of This Notice:",
    body: "Upon request, you may obtain a paper copy of this Notice, even if you have agreed to receive such notice electronically, by contacting PHIL as described below under “For Further Information.” PHIL will make a good-faith effort to obtain your written acknowledgment that you have received this Notice. If acknowledgment cannot be obtained, PHIL will document the reason.",
  },
  {
    label: "Right to Receive Notification of a Breach:",
    body: "You have the right to receive timely notification if PHIL discovers that your unsecured PHI has been accessed, used, or disclosed in an unauthorized manner. PHIL will notify you of any such breach in accordance with applicable law.",
  },
  {
    label: "Personal Representatives:",
    body: "If you have given another individual a medical power of attorney, if another individual is appointed as your legal guardian or if another individual is authorized by law to make health care decisions for you (known as a “personal representative”), that individual may exercise any of the above rights listed for you. If you are unable to exercise your rights due to incapacity or an emergency, PHIL will use professional judgment to act in your best interests with respect to your PHI until a personal representative is available to act on your behalf.",
  },
];
