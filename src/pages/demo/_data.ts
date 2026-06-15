// Content for the /demo (Book a Demo) page.
// Source of truth: design export "Book a Demo" (directionA.jsx).
// Hardcoded at page level per the implement-from-design pattern.

export const DEMO_TITLE =
  "Book a Demo | PHIL — Patient Access Platform for Pharma Brands";
export const DEMO_DESC =
  "Book a demo of PHIL, the end-to-end digital hub and direct-to-patient platform that helps retail and specialty-lite pharma brands maximize patient starts, covered dispenses, adherence, and gross-to-net. Patients rate PHIL 4.8/5.0.";
export const DEMO_URL = "https://phil.us/demo";

// ─── Hero copy (from directionA.jsx) ─────────────────────────────────────────
export const DEMO_HERO = {
  // Headline is split so the second half carries the underline accent.
  headingLead: "One Powerful Platform,",
  headingAccent: "Every Path to Your Patient",
  sub: "Discover how PHIL can help your brand maximize patient outcomes and commercial performance.",
};

// ─── Checkmark bullets ───────────────────────────────────────────────────────
export const DEMO_BULLETS: Array<{ lead: string; rest: string }> = [
  {
    lead: "Maximize patient starts, adherence, and satisfaction.",
    rest: "Top-rated experience to start and stay through refill.",
  },
  {
    lead: "Improve affordability with flexible access pathways.",
    rest: "Custom program design with hybrid, coverage, and cash models.",
  },
  {
    lead: "Transform end-to-end data into commercial growth.",
    rest: "360° visibility with AI-powered insights for continual improvement.",
  },
];

// ─── Proof metrics band ──────────────────────────────────────────────────────
export const DEMO_STATS_EYEBROW = "Helping Pharma Brands Grow";
export const DEMO_STATS: Array<{
  value: number;
  suffix: string;
  label: string;
  sub: string;
}> = [
  { value: 2, suffix: "x+", label: "Patient Starts", sub: "vs. Traditional Channels" },
  { value: 3, suffix: "x+", label: "Adherence", sub: "vs. Traditional Channels" },
  { value: 2, suffix: "x+", label: "Covered Dispenses", sub: "vs. Traditional Channels" },
  { value: 3, suffix: "x+", label: "GTN Lift", sub: "vs. Traditional Channels" },
];

// ─── Form card ───────────────────────────────────────────────────────────────
export const DEMO_FORM = {
  heading: "Request a Demo",
  sub: "Schedule a 30-minute discovery call with our Sales team.",
  // PHIL HubSpot portal (same account as the newsletter form).
  portalId: "20880193",
  // Demo request form (HubSpot, region na1).
  formId: "ccd3ffde-09ef-492c-8f91-a500255d2735",
};
