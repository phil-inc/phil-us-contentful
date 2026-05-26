export const PATIENT_LOGIN_URL =
  "https://my.phil.us/?_gl=1*1w3p6v6*_gcl_au*MTE2OTYwMTc1NS4xNzc4MTAwOTkx*_ga*NjY4MzgyODEwLjE3NzU2NzA1NTg.*_ga_0D2JJPD1QY*czE3Nzg3MDA2Njgkbzg3JGcxJHQxNzc4NzAyMjc3JGo0OCRsMCRoMA";

export const HELP_CENTER_URL = "https://philhelp.zendesk.com/hc/en-us/p/faq";

export const STEPS = [
  {
    num: 1,
    title: "Your Doctor Sends Your Rx to PHILRx",
    body: "Your doctor sends your prescription to PHILRx. Within minutes, we will send you a text to enroll.",
  },
  {
    num: 2,
    title: "We Work To Get You An Affordable Copay Cost",
    body: "We work hard to ensure you have affordable access to your prescription.",
  },
  {
    num: 3,
    title: "You Confirm and Receive Your Rx with Fast, Free Shipping",
    body: "Confirm payment and delivery information, and you're set! We offer fast, free home delivery on all prescriptions.",
  },
] as const;

export type Testimonial = {
  initial: string;
  name: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    initial: "C",
    name: "Carla R.",
    quote:
      "I wasn't able to afford a medication that helped me. My doctor found it through PHILRx, I could continually purchase 3 months of this prescription at a time to receive a HUGE discount. It changed my life.",
  },
  {
    initial: "D",
    name: "Dawn M.",
    quote:
      "I felt that my needs were being considered from the very beginning. That was so refreshing to me because it was out of the ordinary for a company to express such consideration, especially for a new customer like myself!",
  },
  {
    initial: "R",
    name: "Ryan S.",
    quote:
      "The staff at PHILRx are very customer-oriented, staying connected and providing guidance throughout the whole prescription process. They are knowledgeable and friendly. The experience was pleasant!",
  },
  {
    initial: "M",
    name: "Margaret Y.",
    quote:
      "PHILRx does everything right! They ship quickly, bill my insurance directly, and I do not have to remember to ask for a refill. The entire process is easy and simple, it's really a no brainer. Love the service!",
  },
  {
    initial: "H",
    name: "Henry L.",
    quote:
      "My experience with PHILRx is always reliable. My medication delivery has always been exactly when they said it would be, the packaging has been very good, and I appreciate the updates about my prescription and refills.",
  },
  {
    initial: "J",
    name: "Joyce W.",
    quote:
      "PHILRx makes it so easy to get your prescription! From getting the required authorization to delivering it right to your door, they do it all for you.",
  },
];

export type FaqItem = { q: string; aHtml: string };

export const FAQS: FaqItem[] = [
  {
    q: "Is my information secure with PHILRx?",
    aHtml: `<p>Our fully HIPAA-compliant system protects your health data at all times. Your information is only seen by licensed pharmacy personnel and HIPAA-certified Patient Advocates.</p><p>We take reasonable administrative, physical and electronic measures designed to protect the information that we collect from or about you (including your personally identifiable information and personal health information) from unauthorized access, use, or disclosure. When you enter sensitive information on our forms, we encrypt this data using SSL or other technologies.</p>`,
  },
  {
    q: "Can I cancel my prescription?",
    aHtml: `<p><strong>To cancel your prescription:</strong></p><ol><li>Log into your account at <a href="https://my.phil.us" target="_blank" rel="noopener noreferrer">my.phil.us</a></li><li>Make sure you are on the RX Prescriptions section</li><li>Click on the green arrow next to the prescription you'd like to manage</li><li>Select "More Options"</li><li>Click on "Remove This Prescription." From here, you also have the ability to pause, unpause, and change your refill date.</li></ol>`,
  },
  {
    q: "How do I update my payment information?",
    aHtml: `<p>You can log into your My.Phil account and upload a photo of your payment card:</p><ol><li>From the homepage, click on the person icon on the upper right-hand corner</li><li>Click the arrow next to the Payment Card Section</li><li>Select "Add Card"</li><li>Enter your card information (card number, expiration date, CVV code)</li><li>Check the box if the payment card is an FSA, HSA, or HRA card</li><li>Confirm or add your billing address</li><li>Click "Save"</li></ol>`,
  },
  {
    q: "How much will my prescription cost?",
    aHtml: `<p>While the final cost of your prescriptions will vary based on your insurance coverage and medication need, we offer lifetime free delivery to all Phil patients who maintain an active account. We never charge for shipping, making prescription management with Phil a completely free service.</p>`,
  },
  {
    q: "When will I receive my prescription?",
    aHtml: `<p>Your first fill is sent out via first class mail and should arrive within 1–5 business days. Refills are processed ahead of time and are shipped standard shipping to ensure you receive your prescription before your previous fill runs out.</p><p>If you have any concerns or questions please contact us for assistance.</p>`,
  },
  {
    q: "Why did my doctor send my prescription to Phil?",
    aHtml: `<p>There are several reasons why doctors choose to send your prescription to Phil:</p><ul><li><strong>Pricing:</strong> We are able to get special pricing from the manufacturer on numerous commonly used, brand name medications. In addition to special pricing, we take the time to add any applicable manufacturer's coupons to bring pricing down as much as possible for you.</li><li><strong>Prior Authorizations:</strong> We work with your doctor to submit Prior Authorizations should they be required by your insurance for your prescription.</li><li><strong>Shipping:</strong> Shipping is always free. Your first fill is expedited at no cost to ensure medication can be started ASAP.</li><li><strong>Automatic Refills:</strong> Removing the hassle of remembering to pick up medications.</li><li><strong>Support:</strong> Our Patient Advocate team is comprised of compassionate and enthusiastic problem-solvers who are here to help. We offer 365 days of support should you have any questions and need assistance.</li></ul>`,
  },
];
