export const CONTACT_PHONE = "855-977-0975";
export const CONTACT_PHONE_HREF = "tel:8559770975";
export const CONTACT_EMAIL = "mdsupport@phil.us";
export const CONTACT_EMAIL_HREF = "mailto:mdsupport@phil.us";
export const HELP_CENTER_URL = "https://philhelp.zendesk.com/hc/en-us/p/faq";
export const CONTACT_PAGE_URL = "https://phil.us/contact/";

export const STEPS = [
  {
    num: 1,
    title: "Find PHILRx in Your EMR",
    body: 'Search for "PHILRx" (or NPI: 1487163598) in the retail pharmacy section of your EMR\'s Pharmacy Finder.',
  },
  {
    num: 2,
    title: "Send the eRx to PHILRx",
    body: "Send the eRx to PHILRx, or send via phone (855.977.0975) or fax (888.975.0603).",
  },
  {
    num: 3,
    title: "Submit the Pre‑Filled Prior Authorization",
    body: "We'll fax you when the pre‑filled prior authorization is ready to be submitted.",
  },
] as const;

export type Testimonial = { quote: string; author: string };

export const PATIENT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I wasn't able to afford a medication that helped me. My doctor found it through PHIL, I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.",
    author: "Carla R., Patient",
  },
  {
    quote:
      "I felt that my needs were being considered from the very beginning. That was so refreshing to me because it was out of the ordinary for a company to express such consideration, especially for a new customer like myself!",
    author: "Dawn M., Patient",
  },
  {
    quote:
      "The staff at PHILRx are very customer-oriented, staying connected and providing guidance throughout the whole prescription process. They are knowledgeable and friendly. The experience was pleasant!",
    author: "Ryan S., Patient",
  },
];

export const PROVIDER_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Communication is fantastic! From start to finish, PHILRx does a great job keeping [our office] in the loop.",
    author: "Susan F., Healthcare provider",
  },
  {
    quote:
      "PHILRx provides great support for patients, and convenient ways for providers to reach out.",
    author: "Elizabeth R., Healthcare provider",
  },
  {
    quote:
      "PHILRx is very helpful with getting my patients their medications quickly.",
    author: "Jeffrey T., Healthcare provider",
  },
];

export type FaqCategory = {
  id: string;
  label: string;
  items: { q: string; aHtml: string }[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "why",
    label: "Why PHILRx?",
    items: [
      {
        q: "Why should I send prescriptions to PHILRx?",
        aHtml: `<p>PHILRx simplifies the prescription process by assisting with prior authorization and transparency in prescription and cost tracking, ensuring your patients start and stay on the prescribed medication you provided. PHILRx helps patients receive the lowest out of pocket cost, free home delivery and refill reminders.</p>`,
      },
    ],
  },
  {
    id: "patient",
    label: "General Patient Info",
    items: [
      {
        q: "What happens if a patient does not enroll with PHILRx after I send their prescription?",
        aHtml: `<p>If a patient has not enrolled, PHILRx will send a series of SMS messages, we will call and leave voicemails to remind the patient to enroll. In addition, PHILRx will note on the HCP summary fax/email that arrives every Monday morning that the patient has not enrolled.</p>`,
      },
      {
        q: "Is there a place where I can proactively see all of the patients I've sent through PHILRx? If so, how do I get sign‑up/access that information?",
        aHtml: `<p>We fax or email weekly updates to your office outlining all relevant patient and processing updates from PHILRx.</p>`,
      },
      {
        q: "Does PHILRx have other ways for patients who do not have a smartphone to easily sign‑up without using a SMS link? Or what happens if a patient does not have access to a mobile device or a computer?",
        aHtml: `<p>Yes, the patient can also enroll via phone or via web browser on a tablet or personal computer. To enroll via phone, the patient can call PHILRx's Patient Support Team using the phone number provided via voicemail and a PHILRx representative will walk them through the prompts. Please note that the patient will need to have an email address (and the PHIL team can assist them if they do not have one already).</p>`,
      },
    ],
  },
  {
    id: "emr",
    label: "EMR Information",
    items: [
      {
        q: "How do I send prescriptions to PHILRx?",
        aHtml: `<p>You can use one of the following to send prescriptions to PHILRx:</p><p><strong>To eRx on your EMR:</strong></p><ul><li>Select the pharmacy type as <strong>RETAIL</strong></li><li>Search exact spelling and spacing of the name <strong>PhilRx, LLC</strong></li><li>Zip: 43235</li><li>NPI #: 1487163598</li></ul><p><strong>To call in a verbal Rx:</strong> 855‑977‑0975</p><p><strong>To fax in an Rx:</strong> 888‑975‑0603</p>`,
      },
      {
        q: "We can't find PHILRx in the EMR — what should we do?",
        aHtml: `<p>To find PHILRx on the EMR:</p><ul><li>Ensure you have selected the pharmacy type as <strong>RETAIL</strong></li><li>Search with the exact spelling and spacing of the name "PhilRx, LLC"</li><li>Search by NPI #: 1487163598</li></ul><p>If you still can't find PHILRx, you can reach out to your EHR's customer service line. You can also prescribe to PHILRx via fax or phone:</p><ul><li>Fax: (888) 975‑0603</li><li>Phone: (855) 977‑0975</li></ul>`,
      },
    ],
  },
  {
    id: "pa",
    label: "Prior Authorization",
    items: [
      {
        q: "How long does it take for PHILRx to initiate the PA after receiving the script?",
        aHtml: `<p>After a patient confirms their information, PHILRx verifies your patient's insurance, and pre‑fills the prior authorization (PA), your office will receive a notification within 3.5 days that the PA is ready to review and submit.</p>`,
      },
      {
        q: "Can the PA process be started even before the patient completes their PHILRx registration?",
        aHtml: `<p>Before PHILRx may begin processing a patient's prescription, the patient must enroll with PHIL by creating their account. Most patients are able to complete their enrollment easily via the PHILRx Digital Hub, but this can also be done over the phone with our Patient Support team. During the enrollment process, the patient must validate their demographics information and ensure the insurance information we've found is correct. Once the patient completes the crucial steps of validating/adding their information, we are able to begin the prior authorization process.</p>`,
      },
    ],
  },
  {
    id: "language",
    label: "Language Support",
    items: [
      {
        q: "Can PHILRx support patients where English is not their first or preferred language?",
        aHtml: `<p>Yes, we support patients in over 120 languages. You can simply indicate the language needed for the patient, and PHILRx provides foreign language support. We text patients in Spanish, Korean, Vietnamese, and Chinese, and have Spanish‑speaking patient support reps and translation services for all other languages.</p><p><strong>Dedicated foreign language support lines:</strong></p><ul><li>Spanish: 855‑970‑5222</li><li>Chinese (Mandarin): 855‑970‑6659</li><li>Korean: 855‑970‑4420</li><li>Vietnamese: 855‑970‑8551</li><li>All other languages: 855‑970‑9899</li></ul>`,
      },
    ],
  },
  {
    id: "status",
    label: "Prescription Status",
    items: [
      {
        q: "Is there one place where prescribers can see all the Rx they've written versus only the updates on where action needs to be taken?",
        aHtml: `<p>We send a weekly HCP summary fax/email that will consist of the patient cases with a pending action (either from the patient or HCP) along with the scripts that have been successfully processed/shipped (at the bottom of the fax, may be on the 2nd or 3rd page).</p>`,
      },
    ],
  },
  {
    id: "hcp",
    label: "HCP Communication",
    items: [
      {
        q: "How can I (doctor) change my communication preferences?",
        aHtml: `<p>You can update your preferences by sending an email to the PHIL HCP Support team (<a href="mailto:mdsupport@phil.us">mdsupport@phil.us</a>), or by calling PHIL's HCP Support team at 855‑588‑0387, Option 1.</p>`,
      },
      {
        q: "How many follow‑up status emails will I get? Is there a more convenient way to get these updates?",
        aHtml: `<p>As a prescriber, you will receive a weekly summary fax/email on Monday mornings. You can update the preference for fax/email by sending an email to PHIL's HCP Support team (<a href="mailto:mdsupport@phil.us">mdsupport@phil.us</a>) or by calling PHIL's HCP Support team (855‑977‑0975, Option 1). Updates will continue as long as you have patients who are enrolled at PHIL and they may at any time contact PHIL to stop the updates.</p>`,
      },
      {
        q: "How can offices change their default preference and frequency of receiving summary updates?",
        aHtml: `<p>Offices can update this preference by sending an email to PHIL's HCP Support team (<a href="mailto:mdsupport@phil.us">mdsupport@phil.us</a>), or by calling PHIL's HCP Support team at 855‑977‑0975, Option 1. The frequency of the faxes cannot be changed at this time, but HCPs can contact PHIL's HCP Support team any time if they need info on a script.</p>`,
      },
    ],
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    items: [
      {
        q: "Is there a difference between the AZ and OH pharmacies?",
        aHtml: `<p>We have two locations; one in Columbus, OH and one in Scottsdale, AZ. Each location has a dedicated team to support different medications. However, regardless of which location you send the script to, it will be directed appropriately without impact to the patient experience.</p>`,
      },
    ],
  },
];
