import { PROVIDER_FAQ_GROUPS } from "data/faq-content";

export const CONTACT_PHONE = "855-977-0975";
export const CONTACT_PHONE_HREF = "tel:8559770975";
export const CONTACT_EMAIL = "mdsupport@phil.us";
export const CONTACT_EMAIL_HREF = "mailto:mdsupport@phil.us";
export const CONTACT_PAGE_URL = "/contact";

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

export type PatientTestimonial = {
  initial: string;
  name: string;
  role: string;
  quote: string;
};

// Order matches the design's paged carousel (page 1, then page 2).
export const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    initial: "M",
    name: "Margaret Y.",
    role: "PHILRx Patient",
    quote:
      "PHILRx does everything right! They ship quickly, bill my insurance directly, and I do not have to remember to ask for a refill. The entire process is easy and simple, it's really a no brainer. Love the service!",
  },
  {
    initial: "H",
    name: "Henry L.",
    role: "PHILRx Patient",
    quote:
      "My experience with PHILRx is always reliable. My medication delivery has always been exactly when they said it would be, the packaging has been very good, and I appreciate the updates about my prescription and refills.",
  },
  {
    initial: "J",
    name: "Joyce W.",
    role: "PHILRx Patient",
    quote:
      "PHILRx makes it so easy to get your prescription! From getting the required authorization to delivering it right to your door, they do it all for you.",
  },
  {
    initial: "C",
    name: "Carla R.",
    role: "PHILRx Patient",
    quote:
      "I wasn't able to afford a medication that helped me. My doctor found it through PHILRx, and I could purchase 3 months at a time to receive a HUGE discount. It changed my life.",
  },
  {
    initial: "D",
    name: "Dawn M.",
    role: "PHILRx Patient",
    quote:
      "I felt that my needs were being considered from the very beginning. That was so refreshing because it was out of the ordinary for a company to express such consideration, especially for a new customer like myself!",
  },
  {
    initial: "R",
    name: "Ryan S.",
    role: "PHILRx Patient",
    quote:
      "The staff at PHILRx are very customer-oriented, staying connected and providing guidance throughout the whole prescription process. They are knowledgeable and friendly. The experience was pleasant!",
  },
];

export type ProviderTestimonial = {
  quote: string;
  name: string;
  loc: string;
  photoKey: "susan" | "elizabeth" | "jeffrey";
};

export const PROVIDER_TESTIMONIALS: ProviderTestimonial[] = [
  {
    quote:
      "Communication is fantastic! From start to finish, PHILRx does a great job keeping our office in the loop.",
    name: "Susan F.",
    loc: "Dermatology",
    photoKey: "susan",
  },
  {
    quote:
      "PHILRx provides great support for patients, and convenient ways for providers to reach out.",
    name: "Elizabeth R.",
    loc: "Neurology",
    photoKey: "elizabeth",
  },
  {
    quote:
      "PHILRx is very helpful with getting my patients their medications quickly.",
    name: "Jeffrey T.",
    loc: "Ophthalmology",
    photoKey: "jeffrey",
  },
];

export const PROVIDER_QUOTE_DISCLAIMER =
  "*Real provider quote, stock image used to protect privacy";

export type FaqCategory = {
  id: string;
  label: string;
  items: { q: string; aHtml: string }[];
};

export const FAQ_CATEGORIES: FaqCategory[] = PROVIDER_FAQ_GROUPS.map((g) => ({
  id: g.id,
  label: g.title,
  items: g.items.map((i) => ({ q: i.question, aHtml: i.answer })),
}));
