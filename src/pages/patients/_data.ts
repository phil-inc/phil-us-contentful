import { PATIENT_FAQ_ITEMS } from "data/faq-content";

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

export const FAQS: FaqItem[] = PATIENT_FAQ_ITEMS.map((i) => ({
  q: i.question,
  aHtml: i.answer,
}));
