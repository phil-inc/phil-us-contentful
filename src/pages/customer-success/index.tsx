import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Link } from "gatsby";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import {
  DEMO_URL,
  RESOURCES_URL,
  PRESS_URL,
  GTN_CALCULATOR_URL,
  TRUSTPILOT_REVIEW_URL,
  HERO_METRICS,
  CASE_STUDY_TABS,
  PRESS_CARDS,
  VOICES,
  TRUST_RATINGS,
  TRUSTPILOT_WIDGET,
  ROI_PREVIEW,
  type Voice,
} from "./_data";
import * as classes from "./customerSuccess.module.css";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement) => void };
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const formatVal = (v: number, decimals: number) =>
  decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();

function useInView<T extends HTMLElement>(
  threshold = 0.25,
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Counts up from 0 to `value` whenever `active` becomes true.
const CountUp: React.FC<{
  value: number;
  suffix?: string;
  active: boolean;
  duration?: number;
  suffixClassName?: string;
}> = ({ value, suffix = "", active, duration = 1300, suffixClassName }) => {
  const decimals = String(value).includes(".") ? 1 : 0;
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setDisplay(formatVal(value, decimals));
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(formatVal(value * eased, decimals));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    setDisplay("0");
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, value, decimals, duration]);

  return (
    <>
      {display}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </>
  );
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroCtas = ({ mobile = false }: { mobile?: boolean }) => (
  <div
    className={`${classes.heroCta} ${mobile ? classes.heroCtaMobile : ""}`}
  >
    <a href="#case-studies" className={`${classes.btn} ${classes.btnPill}`}>
      Read Proof
    </a>
    <Link to={DEMO_URL} className={`${classes.btn} ${classes.btnPillOutline}`}>
      Book Demo
    </Link>
  </div>
);

const MetricTicker = () => {
  const DURATION = 3600;
  const [idx, setIdx] = useState(0);
  const [leavingIdx, setLeavingIdx] = useState<number | null>(null);
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const leavingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advanceTo = useCallback((next: number) => {
    const len = HERO_METRICS.length;
    const normalized = ((next % len) + len) % len;
    const cur = idxRef.current;
    if (cur === normalized) return;
    if (leavingTimeoutRef.current) clearTimeout(leavingTimeoutRef.current);
    setLeavingIdx(cur);
    leavingTimeoutRef.current = setTimeout(() => {
      setLeavingIdx(null);
      leavingTimeoutRef.current = null;
    }, 600);
    idxRef.current = normalized;
    setIdx(normalized);
  }, []);

  const start = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advanceTo(idxRef.current + 1), DURATION);
  }, [advanceTo]);

  useEffect(() => {
    start();
    const handleVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else if (!timerRef.current) {
        start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (timerRef.current) clearInterval(timerRef.current);
      if (leavingTimeoutRef.current) clearTimeout(leavingTimeoutRef.current);
    };
  }, [start]);

  return (
    <div
      className={classes.metricTicker}
      aria-live="polite"
      aria-label="PHIL impact metrics"
      onMouseEnter={() => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }}
      onMouseLeave={start}
    >
      <span className={classes.metricEyebrow}>PHIL&rsquo;s Impact</span>
      <div className={classes.metricStack}>
        {HERO_METRICS.map((m, i) => {
          const slotClass = [
            classes.metricSlot,
            i === idx ? classes.metricSlotActive : "",
            i === leavingIdx ? classes.metricSlotLeaving : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <div key={m.label} className={slotClass}>
              <span className={classes.metricNum}>
                <CountUp value={m.target} suffix={m.suffix} active={i === idx} />
              </span>
              <span className={classes.metricLbl}>{m.label}</span>
            </div>
          );
        })}
      </div>
      <div className={classes.metricDots} role="tablist" aria-label="Metric pager">
        {HERO_METRICS.map((m, i) => (
          <button
            key={m.label}
            type="button"
            aria-label={`Show metric ${i + 1}`}
            className={`${classes.metricDot} ${i === idx ? classes.metricDotActive : ""}`}
            onClick={() => {
              advanceTo(i);
              start();
            }}
          />
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => (
  <header className={classes.hero}>
    <div className={`xl-container ${classes.heroGrid}`}>
      <div className={classes.heroCopy}>
        <div className={classes.eyebrow}>Customer Success</div>
        <h1 className={classes.h1}>
          Flexible Programs and
          <br className={classes.h1Break} />
          Expert Partnerships that
          <br className={classes.h1Break} />{" "}
          <span className={classes.accent}>Elevate Brand Performance</span>
        </h1>
        <p className={classes.lead}>
          From launch to long-term adherence, discover how pharma brands partner
          with PHIL to build tailored programs that maximize patient access,
          brand performance, and commercial growth.
        </p>
        <HeroCtas />
      </div>

      <MetricTicker />

      <HeroCtas mobile />
    </div>
  </header>
);

// ─── Results / case studies ─────────────────────────────────────────────────

const ResultsSection = () => {
  const [activeId, setActiveId] = useState(CASE_STUDY_TABS[0].id);
  const [sectionRef, inView] = useInView<HTMLDivElement>();
  const active = CASE_STUDY_TABS.find((t) => t.id === activeId)!;

  return (
    <section id="case-studies" className={`${classes.section} ${classes.resultsSection}`}>
      <div className="xl-container" ref={sectionRef}>
        <div className={classes.sectionHead}>
          <h2>
            Driving Measurable Results Across Key Brand Access and Affordability
            Challenges
          </h2>
          <p>
            Turn access challenges into measurable brand growth across every stage
            of the lifecycle. Our flexible program structures and data-driven
            approach maximize program performance while delivering the seamless
            experience patients and providers expect.
          </p>
        </div>

        <div>
          <div className={classes.csTabs} role="tablist">
            {CASE_STUDY_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={t.id === activeId}
                className={`${classes.csTab} ${t.id === activeId ? classes.csTabActive : ""}`}
                onClick={() => setActiveId(t.id)}
              >
                {t.tab}
              </button>
            ))}
          </div>

          {/* key forces remount + count-up re-trigger on tab change */}
          <article className={classes.csPanel} key={active.id}>
            <div className={classes.csCopy}>
              <h3>{active.title}</h3>
              <div className={classes.csDetail}>
                <div className={classes.csDetailBlock}>
                  <span className={`${classes.csDetailEyebrow} ${classes.csDetailChallenge}`}>
                    Challenge
                  </span>
                  <p>{active.challenge}</p>
                </div>
                <div className={classes.csDetailBlock}>
                  <span className={classes.csDetailEyebrow}>Solution</span>
                  <p>{active.solution}</p>
                </div>
              </div>
            </div>
            <div className={classes.csMetric}>
              <div className={classes.csMetricStack}>
                {active.metrics.map((m) => (
                  <div className={classes.csMetricItem} key={m.label}>
                    <p className={classes.mNum}>
                      <CountUp
                        value={m.value}
                        suffix={m.suffix}
                        active={inView}
                        suffixClassName={classes.mSuffix}
                      />
                    </p>
                    <p className={classes.mLabel}>{m.label}</p>
                  </div>
                ))}
              </div>
              <hr />
              <Link
                className={classes.mLink}
                to={active.href}
              >
                Read the full story
                <span className={classes.mArrow} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              <span className={classes.csMetricBrand}>{active.brand}</span>
            </div>
          </article>
        </div>

        <div className={classes.csCtas}>
          <Link to={RESOURCES_URL} className={classes.btnText}>
            View All Case Studies
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── Press / recent client news ──────────────────────────────────────────────

const PressSection = () => (
  <section className={`${classes.section} ${classes.pressSection}`}>
    <div className="xl-container">
      <div className={classes.sectionHead}>
        <h2>Recent Client News</h2>
      </div>
      <div className={classes.pressGrid}>
        {PRESS_CARDS.map((card) => (
          <a
            key={card.href}
            className={classes.pressCard}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={classes.pressMeta}>{card.meta}</div>
            <h3>{card.title}</h3>
            <span className={classes.pressCta}>
              Read announcement
              <ArrowIcon />
            </span>
          </a>
        ))}
      </div>
      <div className={classes.pressFooter}>
        <Link to={PRESS_URL} className={classes.btnText}>
          View All Coverage
          <ArrowIcon />
        </Link>
      </div>
    </div>
  </section>
);

// ─── Testimonials / voices ────────────────────────────────────────────────────

const VOICE_BG: Record<string, string> = {
  pharma: classes.voicePharma,
  patients: classes.voicePatients,
  providers: classes.voiceProviders,
};

const VoiceCard: React.FC<{ voice: Voice }> = ({ voice }) => {
  const DURATION = 6000;
  const count = voice.quotes.length;
  const [idx, setIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (next: number) => {
      const normalized = ((next % count) + count) % count;
      if (normalized === idxRef.current) return;
      if (transitionRef.current) clearTimeout(transitionRef.current);
      setLeaving(true);
      transitionRef.current = setTimeout(() => {
        idxRef.current = normalized;
        setIdx(normalized);
        setLeaving(false);
        transitionRef.current = null;
      }, 240);
    },
    [count],
  );

  const start = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(idxRef.current + 1), DURATION);
  }, [goTo]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !timerRef.current) start();
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    const handleVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (transitionRef.current) {
          clearTimeout(transitionRef.current);
          transitionRef.current = null;
          setLeaving(false);
        }
      } else if (!timerRef.current) {
        start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (timerRef.current) clearInterval(timerRef.current);
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, [start]);

  const current = voice.quotes[idx];

  return (
    <article
      ref={cardRef}
      className={`${classes.voice} ${VOICE_BG[voice.id] || ""}`}
      onMouseEnter={() => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }}
      onMouseLeave={start}
    >
      <div className={classes.voiceTag}>{voice.tag}</div>
      <div className={classes.voiceQuotebox}>
        <blockquote
          className={`${classes.voiceQuote} ${leaving ? classes.voiceQuoteLeaving : ""}`}
        >
          &ldquo;{current.q}&rdquo;
        </blockquote>
        <div
          className={`${classes.voiceAttr} ${leaving ? classes.voiceAttrLeaving : ""}`}
        >
          {current.a}
        </div>
      </div>
      <div className={classes.voiceDots} role="tablist" aria-label={voice.ariaLabel}>
        {voice.quotes.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Quote ${i + 1}`}
            className={`${classes.voiceDot} ${i === idx ? classes.voiceDotActive : ""}`}
            onClick={() => {
              goTo(i);
              start();
            }}
          />
        ))}
      </div>
    </article>
  );
};

const TestimonialsSection = () => (
  <section className={`${classes.section} ${classes.testimonialsSection}`}>
    <div className="xl-container">
      <div className={classes.sectionHead}>
        <h2>A Dedicated Partner to Pharma, Patients, and Providers</h2>
      </div>
      <div className={classes.voicesGrid}>
        {VOICES.map((voice) => (
          <VoiceCard key={voice.id} voice={voice} />
        ))}
      </div>
    </div>
  </section>
);

// ─── Trustpilot strip ─────────────────────────────────────────────────────────

const TrustStrip = () => {
  const [sectionRef, inView] = useInView<HTMLDivElement>();

  return (
    <section className={classes.trust}>
      <div className="xl-container" ref={sectionRef}>
        <div className={classes.trustHead}>
          <h2 className={classes.trustTitle}>
            Setting the Standard for Reliability in Access Platforms
          </h2>
        </div>

        <div className={classes.trustGrid}>
          <div className={classes.trustLeft}>
            <h3 className={classes.trustLeftTitle}>Trustpilot Category Rankings</h3>
            <div className={classes.ratingCompare}>
              {TRUST_RATINGS.map((r) => (
                <div
                  key={r.name}
                  className={`${classes.ratingRow} ${r.industry ? classes.ratingRowIndustry : ""}`}
                >
                  <div className={classes.ratingLabel}>
                    <span className={classes.ratingName}>{r.name}</span>
                    <span className={classes.ratingScore}>
                      <CountUp value={r.score} active={inView} />
                      <span className={classes.ratingOut}>{r.out}</span>
                    </span>
                  </div>
                  <div className={classes.ratingBarTrack}>
                    <div
                      className={classes.ratingBarFill}
                      style={{ width: inView ? `${r.fillPct}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className={classes.ratingFootnote}>
              Based on verified Trustpilot reviews. Industry average compiled from
              leading specialty pharmacy and access platforms.
            </p>
          </div>

          <div className={classes.trustRight}>
            <div
              className={`trustpilot-widget ${classes.trustpilotWidget}`}
              data-locale="en-US"
              data-template-id={TRUSTPILOT_WIDGET.templateId}
              data-businessunit-id={TRUSTPILOT_WIDGET.businessunitId}
              data-style-height={TRUSTPILOT_WIDGET.height}
              data-style-width="100%"
              data-token={TRUSTPILOT_WIDGET.token}
              data-stars="1,2,3,4,5"
              data-review-languages="en"
            >
              <a href={TRUSTPILOT_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                Trustpilot
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── ROI banner ────────────────────────────────────────────────────────────────

const RoiSection = () => (
  <section className={`${classes.section} ${classes.roiSection}`}>
    <div className="xl-container">
      <p className={classes.eyebrow}>Measure Your Impact</p>
      <div className={classes.roiBanner}>
        <div className={classes.roiText}>
          <h2>Measure the Impact of Better Patient Access &amp; Adherence</h2>
          <p>
            See how covered dispenses, patient starts, and refill rates drive brand
            performance. Our calculator was built by PHIL&rsquo;s Commercial Insights
            team for retail and specialty-lite pharma teams.
          </p>
          <Link to={GTN_CALCULATOR_URL} className={`${classes.btn} ${classes.btnPill} ${classes.roiCta}`}>
            Calculate Your Potential
          </Link>
        </div>
        <div className={classes.calcPreview}>
          <div className={classes.calcCardStack}>
            {ROI_PREVIEW.map((c) => (
              <div className={classes.calcMini} key={c.label}>
                <p className={classes.l}>{c.label}</p>
                <p className={classes.v}>
                  {c.value} <small>{c.sub}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
        <Link
          to={GTN_CALCULATOR_URL}
          className={`${classes.btn} ${classes.btnPill} ${classes.roiCta} ${classes.roiCtaMobile}`}
        >
          Calculate Your Potential
        </Link>
      </div>
    </div>
  </section>
);

// ─── Footer CTA ───────────────────────────────────────────────────────────────

const FooterCta = () => (
  <section className={classes.endcta} id="cta">
    <div className={classes.endctaBg}>
      <div className={`xl-container ${classes.endctaRow}`}>
        <div className={classes.endctaCopy}>
          <div className={classes.endctaEyebrow}>
            <span className={classes.endctaRule} />
            Ready to simplify medication access?
          </div>
          <h2 className={classes.endctaTitle}>
            Streamline the Medication Access Experience
          </h2>
          <p className={classes.endctaBody}>
            Discover how the PHIL platform can help your brands maximize coverage,
            adherence, and commercial performance.
          </p>
        </div>
        <div className={classes.endctaCtas}>
          <Link to={DEMO_URL} className={classes.endctaBtn}>
            Book Demo
            <svg
              className={classes.endctaArrow}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 9h12m-4-4 4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const CustomerSuccessPage: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const initWidgets = () => {
      document
        .querySelectorAll<HTMLElement>(
          ".trustpilot-widget:not([data-initialized])",
        )
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
      script.src =
        "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
      script.onload = initWidgets;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <PageContext.Provider value={{ title: "Customer Success Stories" }}>
      <Layout>
        <HeroSection />
        <ResultsSection />
        <PressSection />
        <TestimonialsSection />
        <TrustStrip />
        <RoiSection />
        <FooterCta />
      </Layout>
    </PageContext.Provider>
  );
};

export default CustomerSuccessPage;

// ─── SEO ──────────────────────────────────────────────────────────────────────

const CS_TITLE = "Customer Success Stories — PHIL";
const CS_DESC =
  "See how pharma brands partner with PHIL to maximize patient access, affordability, and adherence — with real case studies, measurable results, and client testimonials.";
const CS_URL = "https://phil.us/customer-success";
const CS_OG_IMAGE = getOgImage(null);
const CS_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": CS_URL,
  url: CS_URL,
  name: CS_TITLE,
  description: CS_DESC,
  image: CS_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{CS_TITLE}</title>
    <meta name="description" content={CS_DESC} />
    <link rel="canonical" href={CS_URL} />
    <meta property="og:title" content={CS_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={CS_DESC} />
    <meta property="og:image" content={CS_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={CS_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={CS_TITLE} />
    <meta name="twitter:description" content={CS_DESC} />
    <meta name="twitter:image" content={CS_OG_IMAGE} />
    <script type="application/ld+json">{CS_SCHEMA}</script>
  </>
);
