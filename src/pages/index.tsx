import React, { useEffect, useRef, useState, useCallback } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";
import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import {
  HERO,
  AUDIENCE_CHIPS,
  OUTCOMES,
  SOLUTION,
  VOICES,
  INSIGHTS,
  END_CTA,
  SEO,
} from "./home/_data";
import type { VoiceQuote } from "./home/_data";
import * as classes from "./home/home.module.css";

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const elements = el.querySelectorAll(`.${classes.reveal}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(classes.revealIn);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}

function useCountUp(
  targetRef: React.RefObject<HTMLElement | null>,
  value: number,
  decimals = 0,
  duration = 1600
) {
  const counted = useRef(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el || counted.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !counted.current) {
            counted.current = true;
            io.unobserve(e.target);
            const start = performance.now();
            const animate = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * value;
              el.textContent =
                decimals > 0 ? current.toFixed(decimals) : String(Math.round(current));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, decimals, duration]);
}

// ─── CountUp component ───────────────────────────────────────────────────────

function CountUp({
  value,
  suffix,
  decimals = 0,
  className,
}: {
  value: number;
  suffix: string;
  decimals?: number;
  className?: string;
}) {
  const valRef = useRef<HTMLSpanElement>(null);
  useCountUp(valRef, value, decimals);

  return (
    <span className={className}>
      <span ref={valRef} className={classes.cuVal}>
        0
      </span>
      <span className={classes.cuSuf}>{suffix}</span>
    </span>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      titleRef.current?.classList.add(classes.heroTitleDrawn);
    });
  }, []);

  return (
    <section className={classes.hero}>
      <span className={`${classes.heroOrb} ${classes.heroOrbBl}`} aria-hidden="true" />
      <span className={`${classes.heroOrb} ${classes.heroOrbBr}`} aria-hidden="true" />
      <div className={classes.container}>
        <div className={classes.heroInner}>
          <div className={`${classes.heroCopy} ${classes.reveal} ${classes.revealIn}`}>
            <h1 ref={titleRef} className={classes.heroTitle}>
              {HERO.title.before}
              <em className={classes.heroTitleEm}>
                {HERO.title.emphasis}
                <svg
                  className={classes.heroUnderline}
                  viewBox="0 0 400 14"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q 100 -2 200 6 T 398 6"
                    stroke="#6DDFC1"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </em>
              {HERO.title.after}
            </h1>
            <p className={classes.heroSub}>{HERO.subtitle}</p>
          </div>

          <div className={`${classes.heroChips} ${classes.reveal} ${classes.revealIn}`}>
            {AUDIENCE_CHIPS.map((chip) => (
              <a
                key={chip.id}
                className={`${classes.audchip} ${
                  chip.variant === "pharma"
                    ? classes.audchipPharma
                    : chip.variant === "patients"
                    ? classes.audchipPatients
                    : classes.audchipProviders
                }`}
                href={chip.href}
              >
                <div className={classes.audchipTag}>{chip.tag}</div>
                <div className={classes.audchipH}>{chip.heading}</div>
                <span className={classes.audchipCta}>
                  {chip.cta}{" "}
                  <span className={classes.audchipArrow}>→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Outcomes Banner ─────────────────────────────────────────────────────────

function OutcomesBanner() {
  const tpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    script.async = true;
    script.onload = () => {
      if (tpRef.current && window.Trustpilot) {
        window.Trustpilot.loadFromElement(tpRef.current);
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className={`${classes.outcomeSection} ${classes.reveal}`} aria-label="Outcomes">
      <div className={classes.outcomes}>
      <div className={classes.outcomesInner}>
        <div className={classes.outcomesHead}>{OUTCOMES.heading}</div>
        <div className={classes.outcomesGrid}>
          {OUTCOMES.stats.map((stat, i) => (
            <div key={i} className={classes.outcome}>
              <div className={classes.outcomeNum}>
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <div className={classes.outcomeLabel}>
                {stat.sublabel ? (
                  <>
                    {stat.label}
                    <br />
                    {stat.sublabel}
                  </>
                ) : (
                  stat.label
                )}
              </div>
              {i === OUTCOMES.stats.length - 1 && (
                <div
                  ref={tpRef}
                  className={`trustpilot-widget ${classes.trustpilot}`}
                  data-locale={OUTCOMES.trustpilot.locale}
                  data-template-id={OUTCOMES.trustpilot.templateId}
                  data-businessunit-id={OUTCOMES.trustpilot.businessUnitId}
                  data-style-height="20px"
                  data-style-width="180px"
                  data-style-alignment="left"
                  data-theme="dark"
                  data-token={OUTCOMES.trustpilot.token}
                  data-text-color="#ffffff"
                >
                  <a
                    href="https://www.trustpilot.com/review/phil.us"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Trustpilot
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

// ─── Solution Carousel ───────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className={classes.phone}>
      <div className={classes.phoneNotch} />
      <div className={classes.phoneScreen}>
        <div className={classes.phoneBrand}>PHILRx</div>
        <div className={classes.phoneTagline}>Today at 12pm</div>
        <div className={classes.phoneBubble}>
          Hi Sarah! Dr. Jones sent your Adaptrex® prescription to the PHILRx pharmacy. Tap below to get started.
        </div>
        {["Enroll in < 1 min", "Fast, free shipping", "Easy refills"].map((text, i) => (
          <div key={i} className={classes.phoneFeature} data-i={i}>
            <div className={classes.phoneFeatureIcon}>
              <svg viewBox="0 0 14 14" width="12" height="12" fill="none">
                <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={classes.phoneFeatureTitle}>{text}</div>
          </div>
        ))}
        <div className={classes.phoneCta}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7l3 3 5-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Confirm &amp; enroll
        </div>
      </div>
    </div>
  );
}

function PAFormMockup() {
  return (
    <>
      <div className={classes.paform}>
        <div className={classes.paformHead}>
          <span className={classes.paformTitle}>PA Portal</span>
        </div>
        <div className={classes.paformGrid}>
          <div className={classes.paformField}>
            <span className={classes.paformLabel}>Patient</span>
            <span className={classes.paformValue}>Sarah Smith</span>
          </div>
          <div className={classes.paformField}>
            <span className={classes.paformLabel}>Prescriber</span>
            <span className={classes.paformValue}>Dr. Jones, MD</span>
          </div>
          <div className={classes.paformField}>
            <span className={classes.paformLabel}>Drug</span>
            <span className={classes.paformValue}>Adaptrex 150 MG</span>
          </div>
        </div>
        <div className={classes.paformSection}>
          <div className={classes.paformSectionTitle}>Insurance information</div>
          <div className={classes.paformRow}>
            <span className={classes.paformRowLabel}>Plan Name</span>
            <span className={classes.paformRowValue}>Blue Shield</span>
          </div>
          <div className={classes.paformRow}>
            <span className={classes.paformRowLabel}>Group Number</span>
            <span className={`${classes.paformRowValue} ${classes.paformRowValueMono}`}>B456852VCE</span>
          </div>
        </div>
        <div className={classes.paformActions}>
          <div className={classes.paformBtn}>Submit PA</div>
        </div>
      </div>
      <div className={`${classes.paBanner} ${classes.paBanner1}`}>
        <span className={classes.chipPulse} />
        <span className={classes.paBannerCheck}>
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
            <path d="M2.5 6.2l2.3 2.3 4.7-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>Script quality checks</span>
      </div>
      <div className={`${classes.paBanner} ${classes.paBanner2}`}>
        <span className={classes.chipPulse} />
        <span className={classes.paBannerCheck}>
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
            <path d="M2.5 6.2l2.3 2.3 4.7-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>Proactive updates</span>
      </div>
      <div className={`${classes.paBanner} ${classes.paBanner3}`}>
        <span className={classes.chipPulse} />
        <span className={classes.paBannerCheck}>
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
            <path d="M2.5 6.2l2.3 2.3 4.7-5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>1-click PA submissions</span>
      </div>
    </>
  );
}

function DispenseMapMockup() {
  return (
    <>
      <img
        className={classes.dispenseMapImg}
        src="/images/usa-pharmacy-network.png"
        alt="Nationwide pharmacy network across 50 states"
      />
      <div className={classes.chipReminder}>
        <div className={classes.chipName}>
          <span className={classes.chipIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.75v3.5l2.2 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>It&apos;s time for your next fill</span>
        </div>
        <div className={classes.chipSub}>Your prescription is ready to refill.</div>
        <div className={classes.chipBtns}>
          <button type="button" className={classes.chipBtnPrimary}>Confirm</button>
          <button type="button" className={classes.chipBtn}>Manage</button>
        </div>
      </div>
      <div className={classes.chipShipping}>
        <div className={classes.shipHead}>
          <span className={classes.shipIcon}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M1.5 5h9v8h-9z M10.5 8h4l2.5 2.5V13h-6.5z M4 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M13 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </span>
          <div className={classes.shipTitle}>Your Rx is on the way!</div>
        </div>
        <div className={classes.shipMeta}>Arrives June 30 · <strong>Free delivery</strong></div>
        <div className={classes.shipTrack}>
          <div className={classes.shipLine}>
            <div className={classes.shipLineFill} />
            <span className={classes.shipTruck}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M1.5 5h9v8h-9z M10.5 8h4l2.5 2.5V13h-6.5z M4 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M13 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <div className={classes.shipStops}>
            <span className={classes.shipStopDone}>Shipped</span>
            <span className={classes.shipStopActive}>In transit</span>
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardMockup() {
  return (
    <div className={classes.dash2}>
      <div className={classes.dash2Head}>
        <span className={classes.dash2HeadTitle}>Program Data Dashboard</span>
      </div>
      <div className={classes.dash2Kpis}>
        <div className={classes.dash2Kpi}>
          <div className={classes.dash2KpiLbl}>NRx volume</div>
          <div className={classes.dash2KpiVal}>116k</div>
          <div className={`${classes.dash2KpiDelta} ${classes.dash2KpiDeltaUp}`}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 5l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            48%
          </div>
        </div>
        <div className={classes.dash2Kpi}>
          <div className={classes.dash2KpiLbl}>Enrollment</div>
          <div className={classes.dash2KpiVal}>92<span className={classes.dash2KpiSuf}>%</span></div>
          <div className={`${classes.dash2KpiDelta} ${classes.dash2KpiDeltaUp}`}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 5l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            22pt
          </div>
        </div>
        <div className={classes.dash2Kpi}>
          <div className={classes.dash2KpiLbl}>Pull-thru rate</div>
          <div className={classes.dash2KpiVal}>74<span className={classes.dash2KpiSuf}>%</span></div>
          <div className={`${classes.dash2KpiDelta} ${classes.dash2KpiDeltaUp}`}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 5l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            18pt
          </div>
        </div>
      </div>
      <div className={classes.dash2Sections}>
        {/* Patient journey panel */}
        <div className={classes.dash2Panel}>
          <div className={classes.dash2PanelHead}>
            <span className={classes.dash2PanelTitle}>Patient journey</span>
            <span className={`${classes.dash2PanelTrend} ${classes.dash2PanelTrendUp}`}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 5l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +32%
            </span>
          </div>
          <div className={classes.dash2PanelRow}>
            <div>
              <div className={classes.dash2SubLbl}>Enrollment funnel</div>
              <div className={classes.dash2Funnel}>
                {[
                  { label: "Eligible", width: "100%", value: "100%" },
                  { label: "Enrolled", width: "92%", value: "92%" },
                  { label: "Dispensed", width: "86%", value: "86%" },
                  { label: "Refilled", width: "77%", value: "77%" },
                ].map((step) => (
                  <div key={step.label} className={classes.dash2FunnelStep}>
                    <span className={classes.dash2FunnelLbl}>{step.label}</span>
                    <span className={classes.dash2FunnelBar} style={{ width: step.width }} />
                    <span className={classes.dash2FunnelV}>{step.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={classes.dash2SubLbl}>Adherence over time</div>
              <svg className={classes.dash2PanelChart} viewBox="0 0 120 44" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="djFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(31,138,91,0.28)" />
                    <stop offset="100%" stopColor="rgba(31,138,91,0)" />
                  </linearGradient>
                </defs>
                <path d="M0 36 L20 30 L40 24 L60 20 L80 14 L100 10 L120 6 L120 44 L0 44 Z" fill="url(#djFill)" />
                <path d="M0 36 L20 30 L40 24 L60 20 L80 14 L100 10 L120 6" fill="none" stroke="var(--phil-foliage, #00827E)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        {/* Payer behavior panel */}
        <div className={classes.dash2Panel}>
          <div className={classes.dash2PanelHead}>
            <span className={classes.dash2PanelTitle}>Payer behavior</span>
            <span className={`${classes.dash2PanelTrend} ${classes.dash2PanelTrendUp}`}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 5l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +18pt
            </span>
          </div>
          <div className={classes.dash2PanelRow}>
            <div>
              <div className={classes.dash2SubLbl}>Plan mix</div>
              <div className={classes.dash2Hbars}>
                {[
                  { label: "Commercial", width: "84%" },
                  { label: "Medicare", width: "62%" },
                  { label: "Medicaid", width: "41%" },
                ].map((bar) => (
                  <div key={bar.label} className={classes.dash2Hbar}>
                    <span className={classes.dash2HbarLbl}>{bar.label}</span>
                    <span className={classes.dash2HbarTrack}>
                      <span className={classes.dash2HbarFill} style={{ width: bar.width }} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={classes.dash2SubLbl}>PA approval rate</div>
              <svg className={classes.dash2PanelChart} viewBox="0 0 120 44" preserveAspectRatio="none">
                <g fill="var(--phil-foliage, #00827E)">
                  <rect x="6" y="28" width="12" height="16" rx="2" opacity="0.45" />
                  <rect x="24" y="22" width="12" height="22" rx="2" opacity="0.55" />
                  <rect x="42" y="18" width="12" height="26" rx="2" opacity="0.7" />
                  <rect x="60" y="12" width="12" height="32" rx="2" opacity="0.82" />
                  <rect x="78" y="8" width="12" height="36" rx="2" opacity="0.92" />
                  <rect x="96" y="3" width="12" height="41" rx="2" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        {/* Program performance panel */}
        <div className={classes.dash2Panel}>
          <div className={classes.dash2PanelHead}>
            <span className={classes.dash2PanelTitle}>Program performance</span>
            <span className={`${classes.dash2PanelTrend} ${classes.dash2PanelTrendUp}`}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 5l2-2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +2.1x
            </span>
          </div>
          <div className={classes.dash2PanelRow}>
            <div>
              <div className={classes.dash2SubLbl}>GTN lift vs. baseline</div>
              <svg className={classes.dash2PanelChart} viewBox="0 0 120 44" preserveAspectRatio="none">
                <path d="M0 36 L24 35 L48 34 L72 33 L96 32 L120 31" fill="none" stroke="rgba(10,10,10,0.20)" strokeWidth="1.4" strokeDasharray="3 3" strokeLinecap="round" />
                <path d="M0 40 L24 33 L48 25 L72 17 L96 10 L120 5" fill="none" stroke="var(--phil-foliage, #00827E)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className={classes.dash2SubLbl}>Program optimization</div>
              <div className={classes.dash2Opti}>
                {[
                  { label: "Time to fill", width: "78%", value: "−42%" },
                  { label: "Abandonment", width: "64%", value: "−36%" },
                ].map((row) => (
                  <div key={row.label} className={classes.dash2OptiRow}>
                    <span className={classes.dash2OptiLbl}>{row.label}</span>
                    <span className={classes.dash2OptiTrack}>
                      <span className={classes.dash2OptiFill} style={{ width: row.width }} />
                    </span>
                    <span className={`${classes.dash2OptiV} ${classes.dash2OptiVUp}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CARD_VISUALS: Record<string, React.FC> = {
  access: PhoneMockup,
  afford: PAFormMockup,
  adhere: DispenseMapMockup,
  impact: DashboardMockup,
};

function SolutionCarousel() {
  const [active, setActive] = useState(0);
  const total = SOLUTION.cards.length;

  const handlePillClick = useCallback((i: number) => setActive(i), []);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % total);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + total) % total);
    },
    [total]
  );

  return (
    <section className={classes.reimagine} id="solution">
      <div className={classes.rmx2Container}>
        <div className={`${classes.rmx2Head} ${classes.reveal}`}>
          <h2 className={classes.rmx2Title}>{SOLUTION.title}</h2>
          <p className={classes.rmx2Sub}>{SOLUTION.subtitle}</p>
          <p className={`${classes.rmx2Lead} ${classes.reveal}`}>
            {SOLUTION.lead}{" "}
            <em className={classes.rmx2LeadEm}>
              {SOLUTION.leadEmphasis}
              <svg className={classes.rmx2LeadUnderline} viewBox="0 0 240 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8 Q 60 -2 120 6 T 238 6" stroke="#6DDFC1" strokeWidth="6" strokeLinecap="round" fill="none" />
              </svg>
            </em>
            :
          </p>
        </div>

        <div
          className={`${classes.rmx2Pills} ${classes.reveal}`}
          role="tablist"
          onKeyDown={handleKeyDown}
        >
          {SOLUTION.pills.map((pill, i) => (
            <button
              key={pill}
              className={`${classes.rmx2Pill} ${i === active ? classes.rmx2PillActive : ""}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => handlePillClick(i)}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      <div className={`${classes.rmx2Stage} ${classes.reveal}`}>
        <div className={classes.rmx2Track}>
          {SOLUTION.cards.map((card, i) => {
            const Visual = CARD_VISUALS[card.key];
            const variantClass =
              card.key === "access" ? classes.rmx2CardAccess
              : card.key === "afford" ? classes.rmx2CardAfford
              : card.key === "adhere" ? classes.rmx2CardAdhere
              : classes.rmx2CardImpact;
            const stateClass =
              i === active
                ? classes.rmx2CardActive
                : i === (active - 1 + total) % total
                ? classes.rmx2CardPrev
                : i === (active + 1) % total
                ? classes.rmx2CardNext
                : "";
            return (
              <article
                key={card.key}
                className={`${classes.rmx2Card} ${variantClass} ${stateClass}`}
                onClick={i !== active ? (e) => { e.preventDefault(); setActive(i); } : undefined}
              >
                <div className={classes.rmx2Viz}>
                  <svg className={classes.rmx2Rings} viewBox="0 0 600 600" aria-hidden="true">
                    <g fill="none" stroke="rgba(0,130,126,0.18)" strokeWidth="1">
                      <circle cx="300" cy="300" r="120" />
                      <circle cx="300" cy="300" r="200" />
                      <circle cx="300" cy="300" r="280" />
                    </g>
                  </svg>
                  {Visual && <Visual />}
                </div>
                <div className={classes.rmx2Copy}>
                  <div className={classes.rmx2Tag}>{card.tag}</div>
                  <h3 className={classes.rmx2Sub2}>{card.title}</h3>
                  <p className={classes.rmx2Body}>{card.body}</p>
                  <div className={classes.rmx2Meta}>
                    {card.stats.map((stat, si) => (
                      <div key={si} className={classes.rmx2Stat}>
                        <div className={classes.rmx2StatNum}>
                          <CountUp
                            value={stat.value}
                            suffix={stat.suffix}
                            decimals={stat.decimals || 0}
                          />
                        </div>
                        <div className={classes.rmx2StatLabel}>{stat.label}</div>
                      </div>
                    ))}
                    {card.key === "impact" && (
                      <div className={classes.rmx2Stat}>
                        <div className={classes.rmx2StatNum} style={{ color: "var(--phil-foliage, #00827E)" }}>
                          AI
                        </div>
                        <div className={classes.rmx2StatLabel}>Powered Workflows</div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={classes.container}>
        <p className={classes.reveal} style={{ marginTop: 32, textAlign: "center" }}>
          <a className={classes.linkarrow} href={SOLUTION.cta.href}>
            {SOLUTION.cta.text}
          </a>
        </p>
      </div>
    </section>
  );
}

// ─── Voices / Testimonials ───────────────────────────────────────────────────

const VOICE_VARIANT_CLASS: Record<string, string> = {
  pharma: classes.voicePharma,
  patients: classes.voicePatients,
  providers: classes.voiceProviders,
};

// Each card owns its own quote index — independent navigation
function VoiceCard({
  variant,
  tag,
  quotes,
}: {
  variant: string;
  tag: string;
  quotes: VoiceQuote[];
}) {
  const DURATION = 7000;
  const [activeIdx, setActiveIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [displayed, setDisplayed] = useState(quotes[0]);
  const activeIdxRef = useRef(0);       // always-current mirror for interval cb
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardRef = useRef<HTMLElement>(null);

  const showQuote = useCallback((i: number) => {
    const next = (i + quotes.length) % quotes.length;
    if (next === activeIdxRef.current) return;

    // Cancel any in-flight transition
    if (transitionRef.current) clearTimeout(transitionRef.current);

    // Dot updates immediately; text swaps after fade-out
    setActiveIdx(next);
    activeIdxRef.current = next;
    setLeaving(true);

    transitionRef.current = setTimeout(() => {
      setDisplayed(quotes[next]);
      setLeaving(false);
      transitionRef.current = null;
    }, 240);
  }, [quotes]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      // Always reads latest index via ref — no stale closure
      showQuote(activeIdxRef.current + 1);
    }, DURATION);
  }, [showQuote]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !timerRef.current) startTimer();
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, [startTimer]);

  const handleDotClick = useCallback((i: number) => {
    showQuote(i);
    // Restart 7s countdown from click — only if timer already running
    if (timerRef.current) startTimer();
  }, [showQuote, startTimer]);

  return (
    <article
      ref={cardRef}
      className={`${classes.voice} ${VOICE_VARIANT_CLASS[variant] || ""}`}
    >
      <div className={classes.voiceTag}>{tag}</div>
      <div className={classes.voiceQuotebox}>
        <blockquote
          className={`${classes.voiceQuote} ${leaving ? classes.voiceQuoteLeaving : ""}`}
        >
          &ldquo;{displayed.q}&rdquo;
        </blockquote>
        <div className={`${classes.voiceAttr} ${leaving ? classes.voiceAttrLeaving : ""}`}>
          {displayed.a}
        </div>
      </div>
      <div className={classes.voiceDots} role="tablist">
        {quotes.map((_, i) => (
          <button
            key={i}
            className={`${classes.voiceDot} ${i === activeIdx ? classes.voiceDotActive : ""}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </article>
  );
}

function VoicesSection() {
  return (
    <section
      className={classes.voices}
      id="voices"
    >
      <div className={classes.container}>
        <div className={`${classes.voicesHead} ${classes.reveal}`}>
          <h2 className={classes.voicesTitle}>{VOICES.title}</h2>
          <p className={classes.voicesSub}>{VOICES.subtitle}</p>
        </div>
        <div className={classes.voicesGrid}>
          {VOICES.cards.map((card) => (
            <VoiceCard
              key={card.variant}
              variant={card.variant}
              tag={card.tag}
              quotes={card.quotes}
            />
          ))}
        </div>
        <div className={classes.reveal} style={{ marginTop: 32, textAlign: "center" }}>
          <a className={classes.linkarrow} href={VOICES.cta.href}>
            {VOICES.cta.text}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Insights Section ────────────────────────────────────────────────────────

function InsightsSection() {
  return (
    <section className={classes.insights} id="insights">
      <div className={classes.container}>
        <div className={`${classes.insightsHead} ${classes.reveal}`}>
          <h2 className={classes.insightsTitle}>{INSIGHTS.title}</h2>
          <p className={classes.insightsBody}>{INSIGHTS.subtitle}</p>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.insightsTrack}>
          {INSIGHTS.cards.map((card) => {
            const variantClass =
              card.variant === "report" ? classes.icardReport
              : card.variant === "webinar" ? classes.icardWebinar
              : classes.icardBlog;
            return (
              <a key={card.href} className={`${classes.icard} ${variantClass}`} href={card.href}>
                <svg className={classes.icardRings} viewBox="0 0 380 380" aria-hidden="true">
                  <circle cx="190" cy="190" r="60" />
                  <circle cx="190" cy="190" r="110" />
                  <circle cx="190" cy="190" r="160" />
                </svg>
                <div className={classes.icardWave} aria-hidden="true" />
                {(card.variant === "report" || card.variant === "blog") && (
                  <div className={classes.icardDots} aria-hidden="true">
                    {Array.from({ length: card.variant === "report" ? 6 : 3 }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                )}
                <div className={classes.icardBody}>
                  <div className={classes.icardTag}>{card.tag}</div>
                  <h3 className={classes.icardTitle}>{card.title}</h3>
                  <span className={classes.icardCta}>
                    {card.cta}{" "}
                    <span className={classes.icardArrow}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        <div className={classes.reveal} style={{ marginTop: 32, textAlign: "center" }}>
          <a className={classes.linkarrow} href={INSIGHTS.cta.href}>
            {INSIGHTS.cta.text}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── End CTA ─────────────────────────────────────────────────────────────────

function EndCtaSection() {
  return (
    <section className={classes.endcta} id="cta">
      <div className={classes.endctaBg}>
        <div className={`${classes.endctaRow} ${classes.reveal}`}>
          <div className={classes.endctaCopy}>
            <div className={classes.endctaEyebrow}>
              <span className={classes.endctaRule} />
              {END_CTA.eyebrow}
            </div>
            <h2 className={classes.endctaTitle}>{END_CTA.title}</h2>
            <p className={classes.endctaBody}>{END_CTA.body}</p>
          </div>
          <div className={classes.endctaCtas}>
            <a className={classes.endctaBtn} href={END_CTA.cta.href}>
              {END_CTA.cta.text}
              <svg className={classes.endctaArrow} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement) => void };
  }
}

const HomePage = () => {
  const shellRef = useReveal();

  return (
    <PageContext.Provider value={{ slug: "" }}>
      <Layout>
        <div ref={shellRef} className={classes.shell}>
          <HeroSection />
          <OutcomesBanner />
          <SolutionCarousel />
          <VoicesSection />
          <InsightsSection />
          <EndCtaSection />
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default HomePage;

// ─── SEO Head ────────────────────────────────────────────────────────────────

const HOME_OG_IMAGE = getOgImage(null);
const HOME_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": SEO.url,
  url: SEO.url,
  name: SEO.title,
  description: SEO.description,
  image: HOME_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{SEO.title}</title>
    <meta name="description" content={SEO.description} />
    <link rel="canonical" href={SEO.url} />
    <meta property="og:title" content={SEO.title} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={SEO.description} />
    <meta property="og:image" content={HOME_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={SEO.url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO.title} />
    <meta name="twitter:description" content={SEO.description} />
    <meta name="twitter:image" content={HOME_OG_IMAGE} />
    <script type="application/ld+json">{HOME_SCHEMA}</script>
  </>
);
