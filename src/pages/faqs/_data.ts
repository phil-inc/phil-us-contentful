// ─── FAQ Page Data ────────────────────────────────────────────────────────────

import { PATIENT_FAQ_ITEMS, PROVIDER_FAQ_GROUPS, PHARMA_FAQ_GROUPS } from "data/faq-content";

export const FAQ_TITLE = "Frequently Asked Questions";
export const FAQ_DESC =
  "Find answers about PHILRx for pharma partners, patients, and providers. Learn about our platform, prior authorization, prescriptions, delivery, and more.";
export const FAQ_URL = "https://phil.us/faqs/";
export const FAQ_OG_IMAGE = ""; // resolved via getOgImage in Head

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QAItem {
  question: string;
  answer: string; // HTML string
}

export interface FaqCategory {
  title: string;
  items: QAItem[];
}

export interface FlatFaqItem {
  question: string;
  answer: string; // HTML string
}

// ─── Pharma Section ───────────────────────────────────────────────────────────

export const PHARMA_CATEGORIES: FaqCategory[] = PHARMA_FAQ_GROUPS.map(
  (g) => ({ title: g.title, items: g.items })
);

// ─── Patients Section (flat accordion) ────────────────────────────────────────

export const PATIENT_FAQS: FlatFaqItem[] = PATIENT_FAQ_ITEMS;

// ─── Providers Section ────────────────────────────────────────────────────────

export const PROVIDER_CATEGORIES: FaqCategory[] = PROVIDER_FAQ_GROUPS.map(
  (g) => ({ title: g.title, items: g.items })
);
