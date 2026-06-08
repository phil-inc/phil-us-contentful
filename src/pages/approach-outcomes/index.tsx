import React, { useState, useEffect, useCallback } from "react";
import { Link } from "gatsby";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import { getOgImage } from "utils/getOgImage";

import * as classes from "./approachOutcomes.module.css";

// ─── Constants ───────────────────────────────────────────────────────────────
const TITLE = "Our Approach & Outcomes | PHIL";
const DESC =
  "PHIL's platform removes barriers to branded prescriptions by solving access, affordability, and adherence — driving measurable commercial outcomes for pharma brands.";
const URL = "https://phil.us/approach-outcomes/";

// ─── Journey Step Data ───────────────────────────────────────────────────────
const JOURNEY_STEPS = [
  {
    title: "Provider Writes the Prescription",
    what: "The treatment decision is made and the prescription is sent.",
    breaks:
      "Prescribers have no reliable way to know where to send a script, scripts can be routed to pharmacies not contracted within plan, and coverage is left on the table before the journey even starts.",
    helps:
      "PHIL is a single solution for pharmacy fulfillment, helping to connect each script to the right pharmacy, based on patient coverage and preference, across our 50-state network. The result: 3×+ covered dispenses compared to traditional channels.",
  },
  {
    title: "Digital Patient Enrollment & Onboarding",
    what: "The patient is invited to join the brand's access program.",
    breaks:
      "Long enrollment forms, call-center waits, and app downloads create abandonment and many patients never complete this step.",
    helps:
      "App-free SMS enrollment and an eCommerce-like digital experience make joining frictionless, getting patients into the program and on their way to therapy in under 1 minute.",
  },
  {
    title: "Benefits Verification & Prior Authorization",
    what: "The prescription enters the insurance and Prior Authorization process.",
    breaks:
      "Prior Authorization requests get stuck in manual workflows, patients wait, and providers may not submit a Prior Authorization, resulting in delays to patient therapy access.",
    helps:
      "PHIL's electronic benefits verification and Prior Authorization process works within existing providers workflows, reducing delays and supporting timely script fulfillment. PHIL delivers 85%+ HCP PA submission rates across our programs.",
  },
  {
    title: "Patient Out-of-pocket Cost",
    what: "The patient receives notification of their out-of-pocket medication cost.",
    breaks:
      "Sticker shock at out-of-pocket cost causes patients to abandon, especially when affordability programs are hard to find or apply.",
    helps:
      "PHIL builds flexible brand programs that automatically helps find each patient's lowest out-of-pocket cost. Brands have options to offer cash-pay and bridge programs to compliantly support patients with coverage barriers, so no patient has to abandon medication at the counter.",
  },
  {
    title: "Shipping & Distribution",
    what: "After the patient pays, they need to get the medication into their hands.",
    breaks:
      "Patients are defaulted to retail pickup with no guidance, missed pickups, long specialty pharmacy wait times, and confusing logistics cause patients to never start therapy.",
    helps:
      "PHIL leverages 98%+ plan coverage across our 50-state contracted pharmacy network with free home delivery options, and proactive shipment notifications, tracking, and flexible scheduling.",
  },
  {
    title: "Ongoing Refills",
    what: "The patient manages their refills to stay on therapy long-term.",
    breaks:
      "Refill drop-off isn't just forgetfulness or lack of clinical need. Patients lack guidance, miss the value of staying on therapy, and fall off before the medication even has a chance to work.",
    helps:
      "Proactive refill reminders, flexible rescheduling, live patient support, and engagement tools to make staying on therapy easier. Delivering 3× higher refill adherence than traditional pharmacy channels.",
  },
  {
    title: "Program Optimization",
    what: "The brand evaluates what's working and where to improve.",
    breaks:
      "Fragmented vendors and siloed data make it nearly impossible to see where patients dropped off, why, or whether there are appropriate solutions to support adherence.",
    helps:
      "Access 120+ real-time data points, with full data visibility across the prescription journey. Leverage AI-driven insights that provide dynamic information on channel strategy and where to take action. Brands that optimize programs with PHIL have seen meaningful improvements in patient access to drug therapies.",
  },
];

// ─── Case Study Data ─────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    colorClass: classes.csC1,
    tag: "Case Study",
    stat: "Continued engagement. Simple refill management.",
    em: "3× more refills",
    suffix: " than retail.",
    brand: "Neurology brand",
    href: "/insights/case-studies/philrx-launches-robust-channel-strategy-for-specialty-lite-migraine-brand/",
  },
  {
    colorClass: classes.csC2,
    tag: "Case Study",
    stat: "Less abandonment. More coverage.",
    em: "4× covered dispenses",
    suffix: " where other channels fell short.",
    brand: "Women's health brand",
    href: "/insights/case-studies/philrx-unlocks-90-dispense-coverage-for-womens-health-brand/",
  },
  {
    colorClass: classes.csC3,
    tag: "Case Study",
    stat: "Two minutes. Easy enrollment.",
    em: "5× first fills",
    suffix: " per patient for the ophthalmology brand.",
    brand: "Ophthalmology brand",
    href: "/insights/case-studies/philrx-drives-high-adoption-for-ophthalmology-brand/",
  },
  {
    colorClass: classes.csC4,
    tag: "Case Study",
    stat: "No PA bottlenecks. No provider frustration.",
    em: "91% HCP PA submission rate",
    suffix: " from day one.",
    brand: "Women's health DTP",
    href: "/insights/case-studies/philrx-designs-transformative-telemedicine-channel-for-womens-health-brand/",
  },
];

// ─── HCP Testimonials ────────────────────────────────────────────────────────
const HCP_TESTIMONIALS = [
  {
    quote: "PHILRx is very helpful with getting my patients their medications quickly.",
    name: "Jeffrey T.",
    role: "Healthcare provider",
  },
  {
    quote:
      "Communication is fantastic! From start to finish, PHILRx does a great job keeping [our office] in the loop.",
    name: "Susan F.",
    role: "Healthcare provider",
  },
  {
    quote: "PHILRx provides great support for patients, and convenient ways for providers to reach out.",
    name: "Elizabeth R.",
    role: "Healthcare provider",
  },
];

// ─── Journey Step Icons (SVG inline) ─────────────────────────────────────────
const JourneyIcons: React.FC<{ step: number }>[] = [
  // Step 1 - Laptop
  () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="7" width="20" height="14" rx="1.5" />
      <path d="M3 23 h26 l-2 2 h-22 z" fill="currentColor" stroke="none" />
      <text x="16" y="17.5" textAnchor="middle" fontFamily="Raleway, Arial, sans-serif" fontWeight="700" fontSize="9" fill="currentColor" stroke="none">P</text>
    </svg>
  ),
  // Step 2 - Phone
  () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="11" y="5" width="10" height="22" rx="2" />
      <text x="16" y="19" textAnchor="middle" fontFamily="Raleway, Arial, sans-serif" fontWeight="700" fontSize="9" fill="currentColor" stroke="none">P</text>
      <path d="M7 12 q-2 4 0 8 M5 9 q-3 7 0 14" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M25 12 q2 4 0 8 M27 9 q3 7 0 14" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  ),
  // Step 3 - Globe
  () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="5.5" />
      <ellipse cx="16" cy="16" rx="5.5" ry="2.8" />
      <line x1="10.5" y1="16" x2="21.5" y2="16" />
      <line x1="16" y1="10.5" x2="16" y2="21.5" />
      <g fill="currentColor" stroke="none">
        <circle cx="6" cy="6" r="1.8" /><circle cx="26" cy="6" r="1.8" />
        <circle cx="6" cy="26" r="1.8" /><circle cx="26" cy="26" r="1.8" />
        <circle cx="16" cy="3.5" r="1.6" /><circle cx="16" cy="28.5" r="1.6" />
        <circle cx="3.5" cy="16" r="1.6" /><circle cx="28.5" cy="16" r="1.6" />
      </g>
    </svg>
  ),
  // Step 4 - Card/Dollar
  () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="26" height="14" rx="2" />
      <line x1="3" y1="14" x2="29" y2="14" />
      <circle cx="22" cy="18.5" r="3.6" fill="currentColor" stroke="none" />
      <text x="22" y="21" textAnchor="middle" fontFamily="Raleway, Arial, sans-serif" fontWeight="700" fontSize="6" fill="#00827E" stroke="none">$</text>
      <line x1="7" y1="19" x2="15" y2="19" strokeWidth="1.6" />
    </svg>
  ),
  // Step 5 - Package
  () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5 l12 -6 l12 6 v11 l-12 6 l-12 -6 z" />
      <path d="M4 10.5 l12 6 l12 -6" />
      <line x1="16" y1="16.5" x2="16" y2="27" />
      <path d="M10 7.5 l12 6" />
    </svg>
  ),
  // Step 6 - Person
  () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="11" r="4" />
      <path d="M5 26 c0 -5 4 -8 8 -8 s8 3 8 8" />
      <circle cx="23" cy="10" r="5" fill="currentColor" stroke="none" />
      <path d="M23 7 v6 M20 10 h6" stroke="#00827E" strokeWidth="1.6" />
    </svg>
  ),
  // Step 7 - Clipboard
  () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="15" height="20" rx="1.5" />
      <rect x="10" y="4" width="7" height="3.5" rx="1" fill="currentColor" stroke="none" />
      <rect x="9" y="15" width="2" height="6" fill="currentColor" stroke="none" />
      <rect x="12.5" y="13" width="2" height="8" fill="currentColor" stroke="none" />
      <rect x="16" y="11" width="2" height="10" fill="currentColor" stroke="none" />
      <circle cx="23" cy="22" r="3.5" />
      <line x1="25.5" y1="24.5" x2="28" y2="27" />
    </svg>
  ),
];

// ─── Arrow SVG ───────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 6h18M16 2.5l3.5 3.5L16 9.5" />
  </svg>
);

// ─── Page Component ──────────────────────────────────────────────────────────
const ApproachOutcomesPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const goToStep = useCallback((idx: number) => {
    if (idx >= 0 && idx < JOURNEY_STEPS.length) setActiveStep(idx);
  }, []);

  // Trustpilot widget loader
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Keyboard nav for journey
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const sec = document.getElementById("journey");
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (e.key === "ArrowRight") goToStep(activeStep + 1);
      if (e.key === "ArrowLeft") goToStep(activeStep - 1);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [activeStep, goToStep]);

  return (
    <PageContext.Provider value={{ slug: "approach-outcomes" }}>
      <Layout>
        <div className={classes.page}>
          {/* ═══ HERO ═══ */}
          <section className={classes.hero}>
            <div className="xl-container">
              <p className={classes.eyebrow}>Our Approach &amp; Outcomes</p>
              <h1 className={classes.heroH1}>
                Commercial Success Across Your Portfolio Starts with{" "}
                <em>Getting the Script Journey Right</em>
              </h1>
              <p className={classes.heroSub}>
                Every year, millions of patients abandon their branded prescriptions, not because a
                therapy doesn't exist, but because the path to getting it is too complex, too expensive,
                or too easy to give up on. PHIL's platform removes those barriers, driving measurable
                outcomes across access, affordability, and adherence.
              </p>
            </div>

            <div className="xl-container">
              <div className={classes.cpGrid}>
                {/* Column 1: Access */}
                <div className={classes.cpRow}>
                  <div className={classes.impactCard}>
                    <h3 className={classes.impactCardH3}>Access, Solved</h3>
                    <p className={classes.impactCardP}>
                      PHIL meets patients where they are, offering flexible intake through telehealth,
                      in-person, or hybrid pathways, with SMS enrollment that gets patients onto therapy
                      in minutes, not&nbsp;days.
                    </p>
                  </div>
                  <a
                    className={classes.barrierCard}
                    href="/dtp-research/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <p className={classes.barrierBig}>1 in 3</p>
                      <p className={classes.barrierLabel}>
                        patients won't pursue a medication if they can't access it through their
                        preferred experience
                      </p>
                    </div>
                    <p className={classes.barrierCite}>
                      PHIL Research Report, 2026 <span className={classes.barrierCiteArr}>→</span>
                    </p>
                  </a>
                </div>

                {/* Column 2: Affordability */}
                <div className={classes.cpRow}>
                  <div className={classes.impactCard}>
                    <h3 className={classes.impactCardH3}>Affordability, Built In</h3>
                    <p className={classes.impactCardP}>
                      PHIL builds a tailored access path for every patient, automatically navigating
                      insurance, copay programs, and cash-pay options to find the most affordable route
                      to their medication.
                    </p>
                  </div>
                  <a
                    className={classes.barrierCard}
                    href="/dtp-research/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <p className={classes.barrierBig}>96%</p>
                      <p className={classes.barrierLabel}>
                        of patients want to see their price before committing, including insurance and
                        coupons
                      </p>
                    </div>
                    <p className={classes.barrierCite}>
                      PHIL Research Report, 2026 <span className={classes.barrierCiteArr}>→</span>
                    </p>
                  </a>
                </div>

                {/* Column 3: Adherence */}
                <div className={classes.cpRow}>
                  <div className={classes.impactCard}>
                    <h3 className={classes.impactCardH3}>Adherence, By Design</h3>
                    <p className={classes.impactCardP}>
                      PHIL promotes patients adherent with proactive refill reminders, live support,
                      and a frictionless digital experience built around how patients actually want to
                      engage.
                    </p>
                  </div>
                  <a
                    className={classes.barrierCard}
                    href="/hcp-research/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <p className={classes.barrierBig}>70%</p>
                      <p className={classes.barrierLabel}>
                        of HCPs agree that issues in the PA process create an immediate hurdle to
                        staying on therapy
                      </p>
                    </div>
                    <p className={classes.barrierCite}>
                      PHIL Research Report, 2026 <span className={classes.barrierCiteArr}>→</span>
                    </p>
                  </a>
                </div>
              </div>

              <div className={classes.heroFoot}>
                <Link className={classes.learnLink} to="/solution/">
                  Learn About PHIL Solutions <ArrowRight />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══ PATIENT JOURNEY ═══ */}
          <section id="journey" className={classes.journey}>
            <div className="xl-container">
              <div className={classes.sectionHead}>
                <p className={classes.eyebrow}>The Patient Journey</p>
                <h2>Keeping Patients Adherent from First Fill to Refill</h2>
                <p className="lead">
                  Every year, millions of patients abandon their branded prescriptions, not because a
                  therapy doesn't exist, but because of the complexity and expense of navigating a path
                  to treatment. PHIL's platform removes those barriers, driving measurable outcomes
                  across access, affordability, and adherence.
                </p>
              </div>

              {/* Stepper */}
              <div className={classes.journeyStepper}>
                {JOURNEY_STEPS.map((step, i) => {
                  const Icon = JourneyIcons[i];
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`${classes.jNode} ${i === activeStep ? classes.jNodeActive : ""}`}
                      onClick={() => goToStep(i)}
                    >
                      <div className={classes.jCircle}>
                        <Icon step={i} />
                        <span className={classes.jBadge}>{i + 1}</span>
                      </div>
                      <p className={classes.jTitle}>{step.title}</p>
                    </button>
                  );
                })}
              </div>

              {/* Step panels */}
              <div className={classes.jSteps}>
                {JOURNEY_STEPS.map((step, i) => (
                  <article
                    key={i}
                    className={`${classes.jStep} ${i === activeStep ? classes.jStepActive : ""}`}
                  >
                    <div className={classes.jStepInner}>
                      <div className={classes.stepNum}>
                        {String(i + 1).padStart(2, "0")}
                        <small className={classes.stepNumLabel}>Step</small>
                      </div>
                      <div>
                        <h3>{step.title}</h3>
                        <p className={classes.fieldLabel}>What happens</p>
                        <p>{step.what}</p>
                      </div>
                      <div>
                        <p className={`${classes.fieldLabel} ${classes.fieldLabelBreaks}`}>
                          Where it breaks
                        </p>
                        <p>{step.breaks}</p>
                      </div>
                      <div className={classes.helpsCol}>
                        <p className={`${classes.fieldLabel} ${classes.fieldLabelHelps}`}>
                          How PHIL helps
                        </p>
                        <p>{step.helps}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Nav */}
              <div className={classes.jNav}>
                <button
                  className={classes.jArrow}
                  onClick={() => goToStep(activeStep - 1)}
                  disabled={activeStep === 0}
                  aria-label="Previous step"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3 l-5 5 5 5" />
                  </svg>
                </button>
                <span className={classes.jProgress}>
                  <strong>{String(activeStep + 1).padStart(2, "0")}</strong> / {String(JOURNEY_STEPS.length).padStart(2, "0")}
                </span>
                <button
                  className={classes.jArrow}
                  onClick={() => goToStep(activeStep + 1)}
                  disabled={activeStep === JOURNEY_STEPS.length - 1}
                  aria-label="Next step"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3 l5 5 -5 5" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* ═══ OUR SOLUTIONS ═══ */}
          <section className={`${classes.band} ${classes.bandMuted}`}>
            <div className="xl-container">
              <div className={classes.sectionHead}>
                <p className={classes.eyebrow} style={{ textAlign: "left" }}>Our Solutions</p>
                <h2>Drive Measurable Brand Performance with PHIL</h2>
              </div>

              <div className={classes.solStack}>
                {/* Hub */}
                <article className={classes.solHub}>
                  <div className={classes.solHubHead}>
                    <h3 className={classes.solTitle}>One Platform, Every Path to the Patient</h3>
                    <p className={classes.solText}>
                      Traditional access solutions only solve part of the problem. PHIL's purpose-built
                      platform simplifies the script journey for patients and providers, maximizing
                      covered dispenses, improving adherence, and driving commercial success for retail
                      and specialty-lite brands.
                    </p>
                  </div>

                  <div className={classes.solPillars}>
                    <article className={classes.solPillar}>
                      <h4 className={classes.solPillarTitle}>Direct-to-Patient</h4>
                      <p className={classes.solPillarText}>
                        A fully integrated, eCommerce-like experience that streamlines intake,
                        telemedicine, coverage, routing, and fulfillment, supporting conversion from
                        scripts to start and maximizing overall program performance.
                      </p>
                    </article>
                    <article className={classes.solPillar}>
                      <h4 className={classes.solPillarTitle}>Digital Hub</h4>
                      <p className={classes.solPillarText}>
                        A technology-driven hub that streamlines medication access through proprietary
                        prior authorization and benefits verification, optimizing navigation for
                        payer-covered, patient access to therapy.
                      </p>
                    </article>
                    <article className={classes.solPillar}>
                      <h4 className={classes.solPillarTitle}>Pharmacy Network</h4>
                      <p className={classes.solPillarText}>
                        A fully integrated dispense model within our 50-state network with 98%+ plan
                        coverage helps enable more covered dispenses and provide patients the most
                        affordable cost.
                      </p>
                    </article>
                    <article className={classes.solPillar}>
                      <h4 className={classes.solPillarTitle}>Data &amp; Insights</h4>
                      <p className={classes.solPillarText}>
                        End-to-end script visibility with access to continuous data-driven insights and
                        consultative support to refine programs for better outcomes and brand success.
                      </p>
                    </article>
                  </div>
                </article>

                {/* Direct */}
                <div className={classes.solDirectWrap}>
                  <article className={classes.solDirect}>
                    <div className={classes.solGroup}>
                      <p className={classes.solGroupLabel}>Expanded intake options</p>
                      <div className={`${classes.solFeatureGrid} ${classes.solFeatureGridTwo}`}>
                        <div className={classes.solFeature}>
                          <h4>Digital / telehealth intake</h4>
                          <p>Frictionless online enrollment with integrated telemed prescribing from the comfort of home.</p>
                        </div>
                        <div className={classes.solFeature}>
                          <h4>Traditional HCP intake</h4>
                          <p>Full support for in-person prescribing workflows that seamlessly connect to your PHIL infrastructure.</p>
                        </div>
                      </div>
                    </div>
                    <div className={classes.solGroup}>
                      <p className={classes.solGroupLabel}>Flexible program structures</p>
                      <div className={`${classes.solFeatureGrid} ${classes.solFeatureGridThree}`}>
                        <div className={classes.solFeature}>
                          <h4>Coverage programs</h4>
                          <p>Navigate insurance complexity with confidence. PHIL handles benefits verification, prior authorization, and appeals workflows.</p>
                        </div>
                        <div className={classes.solFeature}>
                          <h4>Cash programs</h4>
                          <p>Simple, transparent, fast. Ideal for brands prioritizing speed to patient with a predictable cost structure.</p>
                        </div>
                        <div className={classes.solFeature}>
                          <h4>Hybrid programs</h4>
                          <p>The best of both worlds. Blend direct and traditional channels to maximize reach without sacrificing payer access.</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Solution CTAs */}
                <div className={classes.solStackFoot}>
                  <Link className={classes.learnLink} to="/solution/core/">
                    Explore PHIL Digital Hub <ArrowRight />
                  </Link>
                  <Link className={classes.learnLink} to="/solution/direct/">
                    Explore PHIL Direct-to-Patient <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ SATISFACTION PROOF ═══ */}
          <section className={`${classes.band} ${classes.bandMuted}`}>
            <div className="xl-container">
              <div className={classes.sectionHead}>
                <p className={classes.eyebrow}>Satisfaction Proof</p>
                <h2>Trusted by the People Who Matter Most</h2>
                <p className="lead">
                  The best measure of whether a patient access program works isn't a metric on a
                  dashboard, it's whether patients receive their medication, have a positive experience
                  along the way, and whether providers feel confident guiding them through the program.
                  Here's what they say about PHIL.
                </p>
              </div>

              {/* Trustpilot */}
              <h3 className={classes.tpHeading}>Hear from Happy PHILRx Patients</h3>
              <div className={classes.tpWidgetWrap}>
                <div
                  className="trustpilot-widget"
                  data-locale="en-US"
                  data-template-id="54ad5defc6454f065c28af8b"
                  data-businessunit-id="60e5837e95cb800001e58b14"
                  data-style-height="240px"
                  data-style-width="100%"
                  data-token="cc8ca450-b390-4863-a7eb-202050a1044e"
                  data-stars="4,5"
                  data-review-languages="en"
                >
                  <a href="https://www.trustpilot.com/review/phil.us" target="_blank" rel="noopener noreferrer">
                    Trustpilot
                  </a>
                </div>
              </div>

              {/* HCP testimonials */}
              <h3 className={classes.tpHeading}>Real Feedback from Real Providers</h3>
              <div className={classes.hcpGrid}>
                {HCP_TESTIMONIALS.map((t, i) => (
                  <article key={i} className={classes.hcpCard}>
                    <p className={classes.hcpTag}>What providers say</p>
                    <div className={classes.quoteMark} aria-hidden="true" />
                    <blockquote className={classes.hcpQuote}>
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <p className={classes.hcpAttrib}>
                      <strong>{t.name}</strong>, {t.role}
                    </p>
                    <div className={classes.hcpBar} aria-hidden="true">
                      <span /><span /><span /><span />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ CUSTOMER SUCCESS ═══ */}
          <section className={classes.band}>
            <div className="xl-container">
              <div className={classes.sectionHead}>
                <p className={classes.eyebrow}>Customer Success Stories</p>
                <h2>Organizations See Results with PHIL</h2>
              </div>

              <div className={classes.csGrid}>
                {CASE_STUDIES.map((cs, i) => (
                  <Link key={i} className={`${classes.csCard} ${cs.colorClass}`} to={cs.href}>
                    <svg className={classes.csRings} viewBox="0 0 380 380" aria-hidden="true">
                      <circle cx="190" cy="190" r="60" />
                      <circle cx="190" cy="190" r="110" />
                      <circle cx="190" cy="190" r="160" />
                    </svg>
                    <div className={classes.csWave} aria-hidden="true" />
                    <p className={classes.csTag}>{cs.tag}</p>
                    <p className={classes.csStatLine}>
                      {cs.stat} <em>{cs.em}</em>{cs.suffix}
                    </p>
                    <p className={classes.csBrand}>{cs.brand}</p>
                    <span className={classes.csLink}>
                      Learn how
                      <span className={classes.csLinkArr}>
                        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9h12m-4-4 4 4-4 4" />
                        </svg>
                      </span>
                    </span>
                    <div className={classes.csDots} aria-hidden="true">
                      <span /><span /><span /><span /><span /><span />
                    </div>
                  </Link>
                ))}
              </div>

              <div className={classes.csFoot}>
                <Link className={classes.learnLink} to="/resources/">
                  Explore Customer Stories <ArrowRight />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══ ROI CALCULATOR ═══ */}
          <section className={classes.band} style={{ padding: "64px 0" }}>
            <div className="xl-container">
              <p className={classes.eyebrow} style={{ marginBottom: 22 }}>Measure Your Impact</p>
              <div className={classes.roiBanner}>
                <div className={classes.roiText}>
                  <h2>Measure the Impact of Better Patient Access &amp; Adherence</h2>
                  <p>
                    See how covered dispenses, patient starts, and refill rates drive brand performance.
                    Our calculator was built by PHIL's Commercial Insights team for retail and
                    specialty-lite pharma teams.
                  </p>
                  <Link className={classes.roiBtnPrimary} to="/gtn">
                    Calculate Your Potential
                  </Link>
                </div>
                <div className={classes.calcPreview}>
                  <div className={classes.calcCardStack}>
                    <div className={classes.calcMini}>
                      <p className={classes.calcLabel}>Patient Starts</p>
                      <p className={classes.calcVal}>2×+ <small>vs. baseline</small></p>
                    </div>
                    <div className={classes.calcMini}>
                      <p className={classes.calcLabel}>Covered Dispenses</p>
                      <p className={classes.calcVal}>3×+ <small>vs. baseline</small></p>
                    </div>
                    <div className={classes.calcMini}>
                      <p className={classes.calcLabel}>Gross Revenue</p>
                      <p className={classes.calcVal}>3× <small>vs. baseline</small></p>
                    </div>
                    <div className={classes.calcMini}>
                      <p className={classes.calcLabel}>Net Revenue</p>
                      <p className={classes.calcVal}>4.1× <small>vs. baseline</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ FINAL CTA (pharma-style) ═══ */}
          <section className={classes.finalCta}>
            <div className={`xl-container ${classes.finalCtaWrap}`}>
              <div>
                <h2 className={classes.finalCtaH2}>Access, Affordability, and Adherence. Delivered.</h2>
                <p className={classes.finalCtaP}>
                  See how PHIL's integrated platform can drive access, affordability, and adherence for
                  your brand.
                </p>
              </div>
              <Link className={classes.btnOnDark} to="/demo/">
                Book Demo
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default ApproachOutcomesPage;

// ─── SEO Head ────────────────────────────────────────────────────────────────
const OG_IMAGE = getOgImage(null);

export const Head: HeadFC = () => (
  <>
    <title>{TITLE}</title>
    <meta name="description" content={DESC} />
    <link rel="canonical" href={URL} />
    <meta property="og:title" content={TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={DESC} />
    <meta property="og:image" content={OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={TITLE} />
    <meta name="twitter:description" content={DESC} />
    <meta name="twitter:image" content={OG_IMAGE} />
  </>
);
