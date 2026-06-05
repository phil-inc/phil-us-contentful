// ─── Single Source of Truth for FAQ Content ───────────────────────────────────
// All FAQ Q&A content lives here. The faqs, providers, and patients pages
// import from this file to stay in sync.

export interface FaqQA {
  question: string;
  answer: string; // HTML string
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqQA[];
}

// ─── Patient FAQs ─────────────────────────────────────────────────────────────

export const PATIENT_FAQ_ITEMS: FaqQA[] = [
  {
    question: "Is my information secure with PHILRx?",
    answer: `<p>Our fully HIPAA-compliant system protects your health data at all times. Your information is only seen by licensed pharmacy personnel and HIPAA-certified Patient Advocates.</p><p>We take reasonable administrative, physical, and electronic measures designed to protect the information that we collect from or about you (including your personally identifiable information and personal health information) from unauthorized access, use, or disclosure. When you enter sensitive information on our forms, we encrypt this data using SSL or other technologies.</p>`,
  },
  {
    question: "Can I cancel my prescription?",
    answer: `<p>To cancel your prescription:</p><ol><li>Log into your account at <a href="https://my.phil.us" target="_blank" rel="noopener">my.phil.us</a></li><li>Make sure you are on the <strong>Rx Prescriptions</strong> section</li><li>Click the green arrow next to the prescription you'd like to manage</li><li>Select <strong>"More Options"</strong></li><li>Click <strong>"Remove This Prescription"</strong></li></ol><p>From here, you also have the ability to pause, unpause, and change your refill date.</p>`,
  },
  {
    question: "How do I update my payment information?",
    answer: `<p>You can log into your My.PHIL account and upload a photo of your payment card:</p><ol><li>From the homepage, click on the person icon in the upper right-hand corner</li><li>Click the arrow next to the Payment Card section</li><li>Select <strong>"Add Card"</strong></li><li>Enter your card information (card number, expiration date, CVV code)</li><li>Check the box if the payment card is an FSA, HSA, or HRA card</li><li>Confirm or add your billing address</li><li>Click <strong>"Save"</strong></li></ol>`,
  },
  {
    question: "How much will my prescription cost?",
    answer: `<p>While the final cost of your prescription will vary based on your insurance coverage and medication need, we offer <strong>lifetime free delivery</strong> to all PHIL patients who maintain an active account. We never charge for shipping, making prescription management with PHIL a completely free service.</p>`,
  },
  {
    question: "When will I receive my prescription?",
    answer: `<p>Your first fill is sent out via first class mail and should arrive within <strong>1–5 business days</strong>. Refills are processed ahead of time and shipped standard to ensure you receive your prescription before your previous fill runs out.</p><p>If you have any concerns or questions, please <a href="https://philhelp.zendesk.com/hc/en-us/requests/new?ticket_form_id=360000006412" target="_blank" rel="noopener">contact us for assistance</a>.</p>`,
  },
  {
    question: "Why did my doctor send my prescription to PHIL?",
    answer: `<p>There are several reasons doctors choose to send your prescription to PHIL:</p><dl><dt>Pricing</dt><dd>We are able to get special pricing from the manufacturer on numerous commonly used, brand-name medications. In addition to special pricing, we add any applicable manufacturer's coupons to bring pricing down as much as possible for you.</dd><dt>Prior Authorizations</dt><dd>We work with your doctor to submit prior authorizations should they be required by your insurance for your prescription.</dd><dt>Shipping</dt><dd>Shipping is always free. Your first fill is expedited at no cost to ensure medication can be started ASAP.</dd><dt>Informed Refill Reminders</dt><dd>Keeps you updated about when it's time to refill, with easy scheduling.</dd><dt>Support</dt><dd>Our Patient Advocate team is composed of compassionate and enthusiastic problem-solvers who are here to help. We offer 365 days of support should you have any questions and need assistance.</dd></dl>`,
  },
];

// ─── Provider FAQs (grouped by category) ──────────────────────────────────────

export const PROVIDER_FAQ_GROUPS: FaqGroup[] = [
  {
    id: "why",
    title: "Why PHILRx?",
    items: [
      {
        question: "Why should I send prescriptions to PHILRx?",
        answer: `<p>PHILRx simplifies the prescription process by assisting with prior authorization and transparency in prescription and cost tracking, ensuring your patients start and stay on the medication you prescribed. PHILRx helps patients receive an affordable out-of-pocket cost for their medications, with fast, free home delivery and ongoing refill reminders.</p>`,
      },
    ],
  },
  {
    id: "emr",
    title: "EMR Information",
    items: [
      {
        question: "How do I send prescriptions to PHILRx?",
        answer: `<p>You can use one of the following:</p><p><strong>To eRx in your EMR:</strong></p><ol><li>Select the pharmacy type as <strong>RETAIL</strong></li><li>Search the exact spelling and spacing of the name: <strong>PHILRx, LLC</strong></li><li>Zip: <strong>43235</strong></li><li>NPI #: <strong>1487163598</strong></li></ol><p><strong>To call in a verbal Rx:</strong> 855-977-0975</p><p><strong>To fax in an Rx:</strong> 888-975-0603</p>`,
      },
      {
        question: "We cannot find PHILRx in the EMR. What should we do?",
        answer: `<p>To find PHILRx in the EMR, ensure you have selected the pharmacy type as <strong>RETAIL</strong>.</p><ul><li>Search with the exact spelling and spacing of the name "PHILRx, LLC"</li><li>Search by NPI #: <strong>1487163598</strong></li><li>If you still cannot find PHILRx, reach out to your EHR's customer service line</li><li>You can also prescribe to PHILRx via fax: <strong>(888) 975-0603</strong> or phone: <strong>(855) 977-0975</strong></li></ul>`,
      },
    ],
  },
  {
    id: "patient",
    title: "General Patient Information",
    items: [
      {
        question: "What happens if a patient does not enroll with PHILRx after I send their prescription?",
        answer: `<p>If a patient has not enrolled, PHILRx will send a series of SMS messages and leave voicemails reminding the patient to enroll. In addition, PHILRx will note on the HCP summary fax/email that arrives every Monday morning that the patient has not enrolled.</p>`,
      },
      {
        question: "Is there a place where I can proactively see all of the patients I've sent through PHILRx?",
        answer: `<p>We fax or email weekly updates to your office outlining all relevant patient and processing updates from PHILRx.</p>`,
      },
      {
        question: "What happens if a patient does not have access to a mobile device or computer?",
        answer: `<p>The patient can also enroll via phone or via web browser on a tablet or personal computer. To enroll via phone, the patient can call PHILRx's Patient Support Team using the phone number provided via voicemail, and a PHILRx representative will walk them through the prompts. Please note that the patient will need to have an email address (and the PHIL team can assist them if they do not have one already).</p>`,
      },
    ],
  },
  {
    id: "language",
    title: "Language Support",
    items: [
      {
        question: "Can PHILRx support patients where English is not their first or preferred language?",
        answer: `<p>Yes. We support patients in <strong>over 120 languages</strong>. Simply indicate the language needed for the patient, and PHILRx provides foreign-language support. We text patients in Spanish, Korean, Vietnamese, and Chinese, and have Spanish-speaking patient support reps and translation services for all other languages.</p><p><strong>Dedicated foreign-language support lines:</strong></p><ul class="phone-list"><li><span>Spanish</span><span>855-970-5222</span></li><li><span>Chinese (Mandarin)</span><span>855-970-6659</span></li><li><span>Korean</span><span>855-970-4420</span></li><li><span>Vietnamese</span><span>855-970-8551</span></li><li><span>All other languages</span><span>855-970-9899</span></li></ul>`,
      },
    ],
  },
  {
    id: "status",
    title: "Prescription Status",
    items: [
      {
        question: "Is there one place where prescribers can see all of the Rx they've written versus only the updates where action needs to be taken?",
        answer: `<p>We send a weekly HCP summary fax/email consisting of the patient cases with a pending action (either from the patient or HCP), along with the scripts that have been successfully processed/shipped (typically at the bottom of the fax, and may be on the 2nd or 3rd page).</p>`,
      },
    ],
  },
  {
    id: "pa",
    title: "General Prior Authorization (PA) Information",
    items: [
      {
        question: "How long does it take for PHILRx to initiate the PA after receiving the script?",
        answer: `<p>After a patient confirms their information, PHILRx verifies your patient's insurance and pre-fills the prior authorization. Your office will receive a notification within <strong>3.5 days</strong> that the PA is ready to review and submit.</p>`,
      },
      {
        question: "Can the PA process be started even before the patient completes their PHILRx registration?",
        answer: `<p>Before PHILRx may begin processing a patient's prescription, the patient must enroll with PHIL by creating their account. Most patients are able to complete their enrollment easily via the PHILRx Digital Hub, but this can also be done over the phone with our Patient Support team.</p><p>During enrollment, the patient must validate their demographic information and ensure the insurance information we've found is correct. Once the patient completes the crucial steps of validating/adding their information, we are able to begin the prior authorization process.</p>`,
      },
    ],
  },
  {
    id: "hcp",
    title: "HCP Communication Information",
    items: [
      {
        question: "How can I (doctor) change my communication preferences?",
        answer: `<p>You can update your preferences by emailing the PHIL HCP Support team at <a href="mailto:mdsupport@phil.us">mdsupport@phil.us</a>, or by calling PHIL's HCP Support team at <strong>855-588-0387, Option 1</strong>.</p>`,
      },
      {
        question: "How many follow-up status emails will I get? Is there a more convenient way to get these updates?",
        answer: `<p>As a prescriber, you will receive a weekly summary fax/email on Monday mornings. You can update the preference for fax/email by emailing <a href="mailto:mdsupport@phil.us">mdsupport@phil.us</a> or by calling PHIL's HCP Support team (<strong>855-977-0975, Option 1</strong>). Updates will continue as long as you have patients enrolled at PHIL. They may at any time contact PHIL to stop the updates.</p>`,
      },
      {
        question: "How can offices change their default preference and frequency of receiving summary updates?",
        answer: `<p>Offices can update this preference by emailing <a href="mailto:mdsupport@phil.us">mdsupport@phil.us</a>, or by calling PHIL's HCP Support team at <strong>855-977-0975, Option 1</strong>. The frequency of the faxes cannot be changed at this time, but HCPs can contact PHIL's HCP Support team any time if they need info on a script.</p>`,
      },
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    items: [
      {
        question: "Is there a difference between the AZ and OH pharmacies?",
        answer: `<p>We have two locations, one in Columbus, OH and one in Scottsdale, AZ. Each location has a dedicated team to support different medications. Regardless of which location you send the script to, it will be directed appropriately, without impact to the patient experience.</p>`,
      },
    ],
  },
];
