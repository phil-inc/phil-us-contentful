import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "gatsby";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import { getOgImage } from "utils/getOgImage";

import * as classes from "./approach.module.css";
import {
  APPROACH_TITLE,
  APPROACH_DESC,
  APPROACH_URL,
  APPROACH_HERO,
  APPROACH_PILLARS,
  JOURNEY_HEAD,
  JOURNEY_STEPS,
  SOLUTIONS_HEAD,
  SOLUTIONS_HUB,
  SOLUTIONS_PILLARS,
  SOLUTIONS_DIRECT_GROUPS,
  PROOF_HEAD,
  TP_HEADING,
  HCP_HEADING,
  TESTIMONIAL_GROUPS,
  STORIES_HEAD,
  CASE_STUDIES,
  ROI,
  FINAL_CTA,
} from "./_data";

const COLOR_CLASS_MAP: Record<string, string> = {
  c1: classes.csC1,
  c2: classes.csC2,
  c3: classes.csC3,
  c4: classes.csC4,
};

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
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.85">
        <line x1="6" y1="6" x2="12" y2="12" />
        <line x1="26" y1="6" x2="20" y2="12" />
        <line x1="6" y1="26" x2="12" y2="20" />
        <line x1="26" y1="26" x2="20" y2="20" />
        <line x1="16" y1="4" x2="16" y2="10.5" />
        <line x1="16" y1="21.5" x2="16" y2="28" />
        <line x1="4" y1="16" x2="10.5" y2="16" />
        <line x1="21.5" y1="16" x2="28" y2="16" />
      </g>
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
      <g stroke="currentColor" strokeWidth="1.6">
        <line x1="27" y1="15" x2="30" y2="15" opacity="0.85" />
        <line x1="27" y1="19" x2="30" y2="19" opacity="0.85" />
      </g>
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

// ─── Connector Arrow (between impact & barrier cards) ────────────────────────
const CpConnector = () => (
  <div className={classes.cpConnector} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h14M12 6l6 6-6 6" />
    </svg>
  </div>
);

// ─── Arrow SVG (matches design .learn-link arrow) ────────────────────────────
const ArrowRight = () => (
  <svg viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 6h18M16 2.5l3.5 3.5L16 9.5" />
  </svg>
);

// ─── Rotating testimonial card (per-card timer + fade, matches pharma) ────────
const HcpTestimonialCard: React.FC<{ group: (typeof TESTIMONIAL_GROUPS)[number] }> = ({ group }) => {
  const [idx, setIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(idx);
  idxRef.current = idx;

  const goTo = useCallback(
    (n: number) => {
      setLeaving(true);
      setTimeout(() => {
        setIdx(n % group.items.length);
        setLeaving(false);
      }, 280);
    },
    [group.items.length],
  );

  const start = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(idxRef.current + 1), 6000);
  }, [goTo]);

  useEffect(() => {
    start();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [start]);

  const item = group.items[idx];

  return (
    <article
      className={classes.hcpCard}
      onMouseEnter={() => {
        if (timerRef.current) clearInterval(timerRef.current);
      }}
      onMouseLeave={start}
    >
      <p className={classes.hcpTag}>{group.tag}</p>
      <span className={classes.quoteMark} aria-hidden="true">{"\u201C"}</span>
      <blockquote className={`${classes.hcpQuote} ${leaving ? classes.hcpQuoteLeaving : ""}`}>
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <p className={`${classes.hcpAttrib} ${leaving ? classes.hcpAttribLeaving : ""}`}>
        <strong>{item.name}</strong>
        <span className={classes.hcpAttribRole}>{item.role}</span>
      </p>
      <div className={classes.hcpBar} role="tablist">
        {group.items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${classes.hcpDot} ${i === idx ? classes.hcpDotActive : ""}`}
            onClick={() => {
              goTo(i);
              start();
            }}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </article>
  );
};

// ─── Page Component ──────────────────────────────────────────────────────────
const ApproachOutcomesPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const goToStep = useCallback((idx: number) => {
    if (idx >= 0 && idx < JOURNEY_STEPS.length) setActiveStep(idx);
  }, []);

  // Trustpilot widget loader (matches providers pattern)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const initWidgets = () => {
      document
        .querySelectorAll<HTMLElement>(".trustpilot-widget:not([data-initialized])")
        .forEach((el) => {
          if (window.Trustpilot) {
            window.Trustpilot.loadFromElement(el);
            el.dataset.initialized = "true";
          }
        });
    };
    if (window.Trustpilot) {
      initWidgets();
    } else {
      const script = document.createElement("script");
      script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
      script.onload = initWidgets;
      document.body.appendChild(script);
    }
  }, []);

  // Animate sol-direct-wrap sidebar on scroll
  const solDirectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = solDirectRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(classes.solDirectWrapVisible);
          observer.unobserve(el);
          // Trigger initial reveal-all animation
          revealAll();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Flexible By Design — scenario interactivity
  const SCENARIO_LABELS = ["Coverage Path", "Cash Path", "Hybrid Path"];
  const SCENARIO_LABELS_SHORT = ["Coverage", "Cash", "Hybrid"];
  const SCENARIOS: number[][] = [
    [0, 3, 6, 8],        // Coverage
    [1, 4, 7, 8],        // Cash
    [0, 1, 2, 5, 6, 7],  // Hybrid
  ];
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [scenarioMode, setScenarioMode] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const scenarioTimers = useRef<NodeJS.Timeout[]>([]);

  const clearScenarioTimers = useCallback(() => {
    scenarioTimers.current.forEach(clearTimeout);
    scenarioTimers.current = [];
  }, []);

  const revealAll = useCallback(() => {
    clearScenarioTimers();
    setScenarioMode(false);
    setActiveScenario(null);
    setVisibleItems(new Set());
    for (let i = 0; i < 9; i++) {
      scenarioTimers.current.push(
        setTimeout(() => setVisibleItems(prev => new Set([...prev, i])), 400 + i * 250)
      );
    }
  }, [clearScenarioTimers]);

  const showScenario = useCallback((idx: number) => {
    clearScenarioTimers();
    setScenarioMode(true);
    setActiveScenario(idx);
    setVisibleItems(new Set());
    const seq = SCENARIOS[idx];
    seq.forEach((itemIdx, k) => {
      scenarioTimers.current.push(
        setTimeout(() => setVisibleItems(prev => new Set([...prev, itemIdx])), 160 + k * 320)
      );
    });
    // Auto-reset after 10s
    const resetDelay = 160 + seq.length * 320 + 10000;
    scenarioTimers.current.push(setTimeout(() => revealAll(), resetDelay));
  }, [clearScenarioTimers, revealAll]);

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
    <PageContext.Provider value={{ slug: "approach" }}>
      <Layout>
        <div className={classes.page}>
          {/* ═══ HERO ═══ */}
          <section className={classes.hero}>
            <div className="xl-container">
              <p className={classes.eyebrow}>{APPROACH_HERO.eyebrow}</p>
              <h1 className={classes.heroH1}>
                {APPROACH_HERO.h1Lead} <em>{APPROACH_HERO.h1Em}</em>
              </h1>
              <p className={classes.heroSub}>{APPROACH_HERO.sub}</p>
            </div>

            <div className="xl-container">
              <div className={classes.cpGrid}>
                {APPROACH_PILLARS.map((pillar, i) => (
                  <div key={i} className={classes.cpRow}>
                    <div className={classes.impactCard}>
                      <h3 className={classes.impactCardH3}>
                        {pillar.title.split("\n").map((line, j, arr) => (
                          <React.Fragment key={j}>
                            {line}
                            {j < arr.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h3>
                      <p className={classes.impactCardP}>{pillar.body}</p>
                    </div>
                    <CpConnector />
                    <a
                      className={classes.barrierCard}
                      href={pillar.barrierHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <p className={classes.barrierBig}>{pillar.barrierBig}</p>
                        <p className={classes.barrierLabel}>{pillar.barrierLabel}</p>
                      </div>
                      <p className={classes.barrierCite}>
                        PHIL Research Report, 2026 <span className={classes.barrierCiteArr} aria-hidden="true">→</span>
                      </p>
                    </a>
                  </div>
                ))}
              </div>

              <div className={classes.heroFoot}>
                <a
                  className={classes.learnLink}
                  href="#solutions"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("solutions");
                    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
                  }}
                >
                  See Our Solution <ArrowRight />
                </a>
              </div>
            </div>
          </section>

          {/* ═══ PATIENT JOURNEY ═══ */}
          <section id="journey" className={classes.journey}>
            <div className="xl-container">
              <div className={classes.sectionHead} style={{ maxWidth: "none" }}>
                <h2>{JOURNEY_HEAD.h2}</h2>
                <p className="lead" style={{ maxWidth: "none" }}>{JOURNEY_HEAD.lead}</p>
              </div>

              {/* Stepper */}
              <div className={classes.journeyStepper} data-step={activeStep + 1}>
                {JOURNEY_STEPS.map((step, i) => {
                  const Icon = JourneyIcons[i];
                  return (
                    <div
                      key={i}
                      className={`${classes.jNode} ${i === activeStep ? classes.jNodeActive : ""}`}
                    >
                      <div className={classes.jCircle} onClick={() => goToStep(i)} role="button" tabIndex={-1}>
                        <Icon step={i} />
                        <span className={classes.jBadge}>{i + 1}</span>
                      </div>
                      <button
                        type="button"
                        className={classes.jTitle}
                        onClick={() => goToStep(i)}
                        aria-label={`Step ${i + 1}: ${step.title}`}
                      >
                        {step.title}
                      </button>
                    </div>
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

              {/* End step panels */}
            </div>
          </section>

          {/* ═══ OUR SOLUTIONS ═══ */}
          <section id="solutions" className={`${classes.band} ${classes.bandSolutions}`}>
            <div className="xl-container">
              <div className={classes.sectionHead} style={{ maxWidth: "none" }}>
                <h2>{SOLUTIONS_HEAD.h2}</h2>
              </div>

              <div className={classes.solStack}>
                {/* Hub */}
                <article className={classes.solHub}>
                  <div className={classes.solHubHead}>
                    <h3 className={classes.solTitle}>{SOLUTIONS_HUB.title}</h3>
                    <p className={classes.solText}>{SOLUTIONS_HUB.text}</p>
                  </div>

                  <div className={classes.solPillars}>
                    {SOLUTIONS_PILLARS.map((p, i) => (
                      <article key={i} className={classes.solPillar}>
                        <h4 className={classes.solPillarTitle}>{p.title}</h4>
                        <p className={classes.solPillarText}>{p.text}</p>
                      </article>
                    ))}
                  </div>
                </article>

                {/* Direct */}
                <div className={classes.solDirectWrap} ref={solDirectRef}>
                  <div className={`${classes.solProgram} ${scenarioMode ? classes.scenarioMode : ""}`}>
                    <div className={classes.programFlex}>
                      <div className={classes.programFlexLabel}>
                        <p className={classes.pflWord}>Flexible</p>
                        <p className={classes.pflSub}>
                          By Design
                          <span className={classes.pflCheck} aria-hidden="true">
                            <svg viewBox="0 0 16 16"><path d="M3 8.5l3.5 3.5L13 4.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                        </p>
                        <p className={classes.pflModels}>Sample patient journey pathways</p>
                        <div className={classes.pflScenarios}>
                          {SCENARIO_LABELS.map((label, si) => (
                            <button
                              key={si}
                              type="button"
                              className={`${classes.pflDot} ${activeScenario === si ? classes.pflDotActive : ""}`}
                              onClick={() => showScenario(si)}
                            >
                              <span className={classes.pflDotFull}>{label}</span>
                              <span className={classes.pflDotShort}>{SCENARIO_LABELS_SHORT[si]}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className={classes.programCols}>
                        {SOLUTIONS_DIRECT_GROUPS.map((group, gi) => (
                          <div key={gi} className={classes.programCol}>
                            <h3>{group.label}</h3>
                            <ul>
                              {group.features.map((f, fi) => {
                                const itemIdx = gi * 3 + fi;
                                const isOn = visibleItems.has(itemIdx);
                                return (
                                  <li key={fi} className={isOn ? classes.itemOn : ""}>
                                    <span className={`${classes.plCheck} ${isOn ? classes.plCheckChecked : ""}`} aria-hidden="true">
                                      <svg viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </span>
                                    <span className={classes.plText}><strong>{f.title}:</strong> {f.text}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solution CTAs */}
                <div className={classes.solStackFoot}>
                  <Link className={classes.learnLink} to="/solution/core/">
                    Explore PHIL Digital Hub <ArrowRight />
                  </Link>
                  <Link className={classes.learnLink} to="/solution/direct/">
                    Explore PHIL Direct <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ SATISFACTION PROOF ═══ */}
          <section className={`${classes.band} ${classes.bandProof}`}>
            <div className="xl-container">
              <div className={classes.sectionHead} style={{ maxWidth: "none" }}>
                <h2>{PROOF_HEAD.h2}</h2>
                <p className="lead" style={{ maxWidth: "none" }}>{PROOF_HEAD.lead}</p>
              </div>

              {/* Trustpilot */}
              <h3 className={classes.tpHeading}>{TP_HEADING}</h3>
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

              {/* HCP / Patient / Pharma testimonials */}
              <div className={classes.hcpHead}>
                <h3 className={classes.hcpHeading}>{HCP_HEADING}</h3>
              </div>
              <div className={classes.hcpGrid} aria-live="polite">
                {TESTIMONIAL_GROUPS.map((group) => (
                  <HcpTestimonialCard key={group.cat} group={group} />
                ))}
              </div>
            </div>
          </section>

          {/* ═══ CUSTOMER SUCCESS ═══ */}
          <section className={`${classes.band} ${classes.bandStories}`}>
            <div className="xl-container">
              <div className={classes.sectionHead} style={{ maxWidth: "none" }}>
                <h2>{STORIES_HEAD.h2}</h2>
              </div>

              <div className={classes.csGrid}>
                {CASE_STUDIES.map((cs, i) => (
                  <a
                    key={i}
                    className={`${classes.csCard} ${COLOR_CLASS_MAP[cs.colorKey]}`}
                    href={cs.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className={classes.csRings} viewBox="0 0 380 380" aria-hidden="true">
                      <circle cx="190" cy="190" r="60" />
                      <circle cx="190" cy="190" r="110" />
                      <circle cx="190" cy="190" r="160" />
                    </svg>
                    <div className={classes.csWave} aria-hidden="true" />
                    <p className={classes.csTag}>{cs.tag}</p>
                    <p className={classes.csStatLine}>
                      {cs.stat}{cs.brBeforeEm ? <br /> : " "}<em>{cs.em}</em>{cs.suffix}
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
                  </a>
                ))}
              </div>

              <div className={classes.csFoot}>
                <Link className={classes.learnLink} to="/resources/?type=casestudy">
                  Explore Customer Stories <ArrowRight />
                </Link>
              </div>
            </div>
          </section>

          {/* ═══ ROI CALCULATOR ═══ */}
          <section className={`${classes.band} ${classes.roiSection}`}>
            <div className="xl-container">
              <p className={classes.eyebrow} style={{ marginBottom: 22 }}>{ROI.eyebrow}</p>
              <div className={classes.roiBanner}>
                <div className={classes.roiText}>
                  <h2>{ROI.h2}</h2>
                  <p>{ROI.text}</p>
                  <Link className={classes.roiBtnPrimary} to={ROI.ctaHref}>
                    {ROI.ctaLabel}
                  </Link>
                </div>
                <div className={classes.calcPreview}>
                  <div className={classes.calcCardStack}>
                    {ROI.stats.map((s, i) => (
                      <div key={i} className={classes.calcMini}>
                        <p className={classes.calcLabel}>{s.label}</p>
                        <p className={classes.calcVal}>{s.value} <small>{s.sub}</small></p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ FINAL CTA ═══ */}
          <section className={classes.finalCta}>
            <div className={`xl-container ${classes.finalCtaWrap}`}>
              <div>
                <h2 className={classes.finalCtaH2}>{FINAL_CTA.heading}</h2>
                <p className={classes.finalCtaP}>{FINAL_CTA.description}</p>
              </div>
              <div className={classes.finalCtaButtons}>
                <Link className={classes.btnOnDark} to="/demo/">
                  Book Demo
                </Link>
              </div>
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
    <title>{APPROACH_TITLE}</title>
    <meta name="description" content={APPROACH_DESC} />
    <link rel="canonical" href={APPROACH_URL} />
    <meta property="og:title" content={APPROACH_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={APPROACH_DESC} />
    <meta property="og:image" content={OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={APPROACH_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={APPROACH_TITLE} />
    <meta name="twitter:description" content={APPROACH_DESC} />
    <meta name="twitter:image" content={OG_IMAGE} />
  </>
);
