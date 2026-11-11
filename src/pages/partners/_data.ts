import { VOICES } from "../customer-success/_data";

import iconPatientAccess from "./assets/icon-patient-access.png";
import iconPayerCoverage from "./assets/icon-payer-coverage.png";
import iconDrugChannel from "./assets/icon-drug-channel.png";

export const DEMO_URL = "/demo/";
export const GTN_URL = "/gtn/";
export const TRUSTPILOT_REVIEW_URL = "https://www.trustpilot.com/review/phil.us";

export const HERO = {
  eyebrow: "For Life Sciences Manufacturers",
  title: "Accelerate Brand Success with PhilRx",
  lead: "Drive growth for your brand with a digital hub partner trusted by industry-leading brands.",
};

export const INTRO = {
  title: "Maximize Value for Your Brand",
  body: "Overcome access, affordability, and adherence challenges. PhilRx offers a digital hub solution that is designed to improve access, coverage, and GTN.",
};

export type ValueCard = { icon: string; title: string; body: string };

export const VALUE_CARDS: ValueCard[] = [
  {
    icon: iconPatientAccess,
    title: "Modernize the Patient Access Journey",
    body: "Our platform allows brands to integrate an e-commerce-like journey for patients resulting in better access and adherence.",
  },
  {
    icon: iconPayerCoverage,
    title: "Maximize Dispenses Covered by Payers",
    body: "We’ve built unique capabilities to ensure brands can capitalize on formulary placements to improve GTN.",
  },
  {
    icon: iconDrugChannel,
    title: "Enhance Insight into the Drug Channel",
    body: "Our platform generates comprehensive data that we translate into actionable insights to inform brand strategy.",
  },
];

export type PartnerCard = { title: string; body: string; dark: boolean };

export const PARTNER_CARDS: PartnerCard[] = [
  {
    title: "Expert Alliance Partners",
    body: "Life sciences consultants, marketing agencies, and full-service commercial organizations that offer support and advisory services to biopharma manufacturers.",
    dark: false,
  },
  {
    title: "Technology Alliance Partners",
    body: "Health tech providers that offer solutions for biopharma manufacturers that are complementary to PhilRx, such as telehealth, adherence, or business intelligence.",
    dark: true,
  },
];

/** Patient quotes are the ones already published on /customer-success/. */
export const PATIENT_QUOTES =
  VOICES.find((v) => v.id === "patients")?.quotes ?? [];

export type ResourceCard = {
  tag: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
};

export const RESOURCE_CARDS: ResourceCard[] = [
  {
    tag: "Webinar",
    title: "Improving Access, Coverage, and GTN with a Digital Hub",
    body: "Discover the building blocks of a strong digital hub.",
    linkLabel: "Watch Now",
    href: "/on-demand-webinar-improving-access-coverage-and-gtn-with-digital-hubs/",
  },
  {
    tag: "Report",
    title: "Pharma Perspectives on Direct‑to‑Patient Success",
    body: "Exclusive research from 74 life sciences leaders.",
    linkLabel: "Read Report",
    href: "/pharma-dtp-research/",
  },
  {
    tag: "Blog Post",
    title: "The Case for an Alternative Channel Strategy in 2024 and Beyond",
    body: "Learn how to strategically overcome common access challenges.",
    linkLabel: "Read More",
    href: "/the-case-for-an-alternative-channel-strategy-in-2024-and-beyond/",
  },
];

export const CLOSING_CTA = {
  title: "Interested in Partnering?",
  body: "Get in touch with our team to learn how we can work together to help life sciences manufacturers achieve their full access potential.",
};
