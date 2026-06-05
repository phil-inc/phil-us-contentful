import { PROVIDER_FAQ_GROUPS } from "data/faq-content";

export const CONTACT_PHONE = "855-977-0975";
export const CONTACT_PHONE_HREF = "tel:8559770975";
export const CONTACT_EMAIL = "mdsupport@phil.us";
export const CONTACT_EMAIL_HREF = "mailto:mdsupport@phil.us";
export const HELP_CENTER_URL = "https://philhelp.zendesk.com/hc/en-us/p/faq";
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

export const FAQ_CATEGORIES: FaqCategory[] = PROVIDER_FAQ_GROUPS.map((g) => ({
  id: g.id,
  label: g.title,
  items: g.items.map((i) => ({ q: i.question, aHtml: i.answer })),
}));
