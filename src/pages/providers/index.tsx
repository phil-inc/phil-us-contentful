import React, { useState, useEffect, useCallback, useRef } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import {
  HELP_CENTER_URL,
  STEPS,
  PATIENT_TESTIMONIALS,
  PROVIDER_TESTIMONIALS,
  PROVIDER_QUOTE_DISCLAIMER,
  FAQ_CATEGORIES,
} from "./_data";
import * as classes from "./providers.module.css";

import hsSusan from "./assets/hs-susan.png";
import hsElizabeth from "./assets/hs-elizabeth.png";
import hsJeffrey from "./assets/hs-jeffrey.png";

const HCP_SUPPORT_URL = "https://phil.us/contact/hcp-support/";

const PROVIDER_PHOTOS: Record<string, string> = {
  susan: hsSusan,
  elizabeth: hsElizabeth,
  jeffrey: hsJeffrey,
};

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement) => void };
  }
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────

const Eyebrow = ({ text }: { text: string }) => (
  <div className={classes.eyebrow}>{text}</div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = () => (
  <header className={classes.hero}>
    <div className="xl-container">
      <div className={classes.heroGrid}>
        <div className={classes.heroCopy}>
          <Eyebrow text="For Healthcare Providers" />
          <h1 className={classes.h1}>
            Affordable Medications for<br />Your Patients with{" "}
            <span className={classes.accent}>
              PHILRx
              <svg
                className={classes.squiggle}
                viewBox="0 0 220 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8 C 50 0, 100 14, 150 6 S 200 4, 218 8"
                  stroke="#5ABEA4"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className={classes.heroLead}>
            PHILRx makes it easy for your patients to get their medication at an
            affordable price with free home delivery and PA support for your
            office.
          </p>
          <div className={classes.heroHelp}>
            <a
              href="#faq"
              className={`${classes.btn} ${classes.btnFilled}`}
            >
              Read FAQs
            </a>
            <a
              href={HCP_SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${classes.btn} ${classes.btnOutlineGradient}`}
            >
              Get Support
            </a>
          </div>
        </div>

        <div className={classes.heroVisual} aria-hidden="true">
          <svg
            className={classes.bgRings}
            viewBox="0 0 520 600"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="hcpBullseye" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D5F1F0" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#D5F1F0" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#D5F1F0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="260" cy="300" r="240" fill="url(#hcpBullseye)" />
            <circle
              cx="260"
              cy="300"
              r="110"
              stroke="#BFE6E2"
              strokeWidth="1.25"
              opacity="0.9"
            />
            <circle
              cx="260"
              cy="300"
              r="170"
              stroke="#BFE6E2"
              strokeWidth="1.25"
              opacity="0.7"
            />
            <circle
              cx="260"
              cy="300"
              r="230"
              stroke="#BFE6E2"
              strokeWidth="1.25"
              opacity="0.55"
            />
            <g className={classes.bullseyeOrbit}>
              <circle
                cx="260"
                cy="300"
                r="290"
                stroke="#5ABEA4"
                strokeWidth="1.25"
                strokeDasharray="2 10"
                opacity="0.55"
              />
              <circle cx="260" cy="10" r="5" fill="#5ABEA4" />
              <circle cx="511" cy="445" r="5" fill="#5ABEA4" />
              <circle cx="9" cy="445" r="5" fill="#5ABEA4" />
            </g>
            <circle cx="260" cy="300" r="4" fill="#00827E" />
          </svg>

          <div className={classes.wfStage}>
            <div className={classes.wfCard}>
              <h3 className={classes.wfCardTitle}>
                Deliver Affordable Medication Access For Your Patients
              </h3>
              <div className={classes.wfSteps}>
                {[
                  "Affordable prescriptions with fast, free delivery",
                  "Prior authorization support for your office",
                  "Dedicated patient & provider support",
                ].map((text) => (
                  <div key={text} className={classes.wfStep}>
                    <div className={classes.wfNum}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 6.2L4.8 8.5L9.5 3.8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className={classes.wfStepTitle}>{text}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// ─── Access (affordable medication access) ────────────────────────────────────

const ACCESS_STATS = [
  {
    to: 2,
    label: "Patient starts",
    desc: "More patients start the medications you prescribed",
  },
  {
    to: 2,
    label: "Covered dispenses",
    desc: "More prescriptions covered by insurance",
  },
  {
    to: 3,
    label: "Refill adherence",
    desc: "More patients stay on track with their medications",
  },
] as const;

const ACCESS_POINTS = [
  {
    title: "Affordable Medications",
    body: (
      <>
        We work hard to get patients an affordable price for their medications,
        every time. We check what their insurance covers and make sure they're
        getting the right savings with transparent pricing throughout the
        process.
      </>
    ),
  },
  {
    title: "Convenient Access",
    body: (
      <>
        Patients enroll in minutes, and we keep them informed about their
        prescription status at every step of the journey. We offer fast, free
        home delivery on all prescriptions, with easy refill management to
        support access and adherence.
      </>
    ),
  },
  {
    title: "Seamless Experience",
    body: (
      <>
        Our friendly support team is available to help patients via phone, chat,
        and email. We're proud to have a{" "}
        <strong>4.8/5.0</strong> satisfaction score on Trustpilot from our strong
        and growing patient community.
      </>
    ),
  },
];

const PointCheckIcon = () => (
  <span className={classes.pointIcon} aria-hidden="true">
    <svg viewBox="0 0 32 32" fill="none">
      <path
        d="M9 16.5l5 5L23 11"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const AccessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(ACCESS_STATS.map(() => 0));

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const run = () => {
      if (reduce) {
        setCounts(ACCESS_STATS.map((s) => s.to));
        return;
      }
      const dur = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCounts(ACCESS_STATS.map((s) => Math.round(eased * s.to)));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setCounts(ACCESS_STATS.map((s) => s.to));
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(node);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className={classes.accessSection}>
      <div className="xl-container">
        <div className={classes.accessHead}>
          <h2>
            Helping Your Patients Get the Medications You Prescribed at a Price
            They Can Afford
          </h2>
          <p>
            PHILRx helps patients get their medications at the right price, with
            a simple and easy way to receive them.
          </p>
        </div>

        <div className={classes.accessGrid}>
          <div className={classes.accessStats}>
            <div className={classes.eyebrowDash}>Why providers choose PHILRx</div>
            <div className={classes.statList}>
              {ACCESS_STATS.map((s, i) => (
                <div key={s.label} className={classes.statBlock}>
                  <div className={classes.statNum}>
                    {counts[i]}
                    <span className={classes.statSuffix}>
                      <span className={classes.statX}>×</span>
                      <span className={classes.statPlus}>+</span>
                    </span>
                  </div>
                  <p className={classes.statLabel}>{s.label}</p>
                  <p className={classes.statDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={classes.accessPoints}>
            <div className={`${classes.eyebrowDash} ${classes.pointsEyebrow}`}>
              How we support patients
            </div>
            <div className={classes.pointsGrid}>
              {ACCESS_POINTS.map((p) => (
                <article key={p.title} className={classes.pointCard}>
                  <div className={classes.pointHead}>
                    <PointCheckIcon />
                    <h3 className={classes.pointTitle}>{p.title}</h3>
                  </div>
                  <p className={classes.pointBody}>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className={classes.accessReviews}>
          <div className={classes.eyebrowDash}>Hear from PHILRx patients</div>
          {/* TrustBox — Carousel (relocated from former standalone Trustpilot strip) */}
          <div
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="53aa8912dec7e10d38f59f36"
            data-businessunit-id="60e5837e95cb800001e58b14"
            data-style-height="150px"
            data-style-width="100%"
            data-token="2756914d-336b-4583-b3f4-75c0b1f9734f"
            data-stars="4,5"
            data-review-languages="en"
          >
            <a
              href="https://www.trustpilot.com/review/phil.us"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trustpilot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Why prescribers write to PHILRx ──────────────────────────────────────────

const WHY_ROWS = [
  {
    title: "Better Patient Outcomes",
    body: "A great patient experience that improves medication access, affordability, and adherence.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M16 27s-9-5.7-9-12.2A5.3 5.3 0 0 1 16 11a5.3 5.3 0 0 1 9 3.8C25 21.3 16 27 16 27z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Prior Authorization Support",
    body: "A seamless prior authorization process with dedicated PA support and timely prescription status updates for your office.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M16 5l9 3v6.5c0 5.6-3.8 9.9-9 11.5-5.2-1.6-9-5.9-9-11.5V8l9-3z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2 15.8l2.6 2.6 5-5.4"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Dedicated Patient & HCP Support",
    body: "An expert team handles questions and follow-ups, so your patients can start and stay on therapy with confidence.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M7 17v-2a9 9 0 0 1 18 0v2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 17v4a3 3 0 0 1-3 3h-3"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="4.5"
          y="16.5"
          width="4"
          height="6.5"
          rx="2"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <rect
          x="23.5"
          y="16.5"
          width="4"
          height="6.5"
          rx="2"
          stroke="currentColor"
          strokeWidth="2.4"
        />
      </svg>
    ),
  },
];

const WhySection = () => (
  <section className={classes.whySection}>
    <div className="xl-container">
      <div className={classes.whyLayout}>
        <div className={classes.whyIntro}>
          <h2>
            Why Prescribers Write to <span className={classes.accent}>PHILRx</span>
          </h2>
          <p>
            We take on the work that gets in the way of timely medication access,
            so your practice can focus on delivering care and your patients can
            start their prescribed therapies faster, pay less, and stay on track.
          </p>
        </div>
        <div className={classes.whyList}>
          {WHY_ROWS.map((row) => (
            <div key={row.title} className={classes.whyRow}>
              <span className={classes.whyIco} aria-hidden="true">
                {row.icon}
              </span>
              <div className={classes.whyRt}>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Steps ────────────────────────────────────────────────────────────────────

const StepsSection = () => (
  <section className={classes.stepsSection}>
    <div className="xl-container">
      <div className={`${classes.sectionHead} ${classes.sectionHeadWide}`}>
        <h2>How to Prescribe to PHILRx</h2>
      </div>
      <div className={classes.stepsGrid}>
        <div className={classes.stepLine} aria-hidden="true" />
        {STEPS.map(({ num, title, body }) => (
          <article key={num} className={classes.step}>
            <div className={classes.stepNum}>{num}</div>
            <h3 className={classes.stepTitle}>{title}</h3>
            <p className={classes.stepBody}>{body}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ─── Video ────────────────────────────────────────────────────────────────────

const VideoSection = () => (
  <section className={classes.videoSection}>
    <div className="xl-container">
      <div className={`${classes.sectionHead} ${classes.sectionHeadWide}`}>
        <h2>Sending a Script to PHILRx is Easy</h2>
      </div>
      <div className={classes.videoFrame}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/Fkq1ncdE2ug?rel=0&modestbranding=1&playsinline=1"
          title="PHILRx for Healthcare Providers"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  </section>
);

// ─── Arrow icons ──────────────────────────────────────────────────────────────

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Providers (featured quote carousel) ──────────────────────────────────────

// Gap between provider slides; shrinks on smaller screens.
function getPvGap() {
  if (typeof window === "undefined") return 12;
  if (window.innerWidth <= 640) return 6;
  if (window.innerWidth <= 880) return 8;
  return 12;
}

const PV_TRANSITION = "transform 0.55s cubic-bezier(0.2,0,0,1)";

const ProvidersSection = () => {
  const count = PROVIDER_TESTIMONIALS.length;
  // Render an extra clone of the first slide at the end so advancing past the
  // last real slide slides forward into it, then we snap back invisibly.
  const slides = [...PROVIDER_TESTIMONIALS, PROVIDER_TESTIMONIALS[0]];

  // pos walks 0..count (count = the trailing clone). active dot = pos % count.
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ width: 0, gap: 12 });

  useEffect(() => {
    const measure = () => {
      setMetrics({
        width: viewportRef.current?.offsetWidth ?? 0,
        gap: getPvGap(),
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);
  const start = useCallback(() => {
    stop();
    // Never advance past the trailing clone; handleTransitionEnd snaps it back.
    timerRef.current = setInterval(
      () => setPos((p) => (p >= count ? p : p + 1)),
      7000,
    );
  }, [stop, count]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  // After the forward slide lands on the trailing clone, jump back to the real
  // first slide with the transition off so it's seamless. Driven by a timer
  // (not transitionEnd) so a backgrounded/idle tab can't drop the event and
  // leave the carousel stuck on the clone.
  useEffect(() => {
    if (pos !== count) return;
    const id = setTimeout(() => {
      setAnimate(false);
      setPos(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true)),
      );
    }, 600);
    return () => clearTimeout(id);
  }, [pos, count]);

  const next = () => {
    stop();
    // Cap at the clone (count) so fast clicks can't overshoot into blank space.
    setPos((p) => (p >= count ? p : p + 1));
    start();
  };

  const prev = () => {
    stop();
    if (pos === 0) {
      // Jump (no animation) to the trailing clone — visually identical to the
      // first slide — then animate back to the last real slide.
      setAnimate(false);
      setPos(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setPos(count - 1);
        }),
      );
    } else {
      setPos((p) => p - 1);
    }
    start();
  };

  const goTo = (k: number) => {
    stop();
    setAnimate(true);
    setPos(k);
    start();
  };

  const active = pos % count;

  return (
    <section className={classes.providersSection}>
      <div className="xl-container">
        <div className={classes.sectionHead}>
          <h2>Trusted by Healthcare Providers</h2>
        </div>
        <div
          className={classes.pvCarousel}
          onMouseEnter={stop}
          onMouseLeave={start}
        >
          <div className={classes.pvViewport} ref={viewportRef}>
            <div
              className={classes.pvTrack}
              style={{
                gap: `${metrics.gap}px`,
                transition: animate ? PV_TRANSITION : "none",
                transform: `translateX(${-pos * (metrics.width + metrics.gap)}px)`,
              }}
            >
              {slides.map((t, k) => (
                <div key={k} className={classes.pvSlide}>
                  <div className={classes.pvMark} aria-hidden="true">
                    &ldquo;
                  </div>
                  <p className={classes.pvQuote}>{t.quote}</p>
                  <div className={classes.pvPerson}>
                    <div className={classes.pvPhoto}>
                      <img
                        src={PROVIDER_PHOTOS[t.photoKey]}
                        alt={`${t.name}, ${t.loc}`}
                        loading="lazy"
                      />
                    </div>
                    <div className={classes.pvPersonText}>
                      <div className={classes.pvName}>{t.name}</div>
                      <div className={classes.pvLoc}>{t.loc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className={classes.pvFoot}>{PROVIDER_QUOTE_DISCLAIMER}</p>
          <div className={classes.pvControls}>
            <button
              className={classes.pvArrow}
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
            >
              <ArrowLeft />
            </button>
            <div className={classes.pvDots} role="tablist">
              {PROVIDER_TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  aria-label={`Testimonial ${k + 1}`}
                  className={`${classes.pvDot}${k === active ? ` ${classes.isActive}` : ""}`}
                  onClick={() => goTo(k)}
                />
              ))}
            </div>
            <button
              className={classes.pvArrow}
              type="button"
              aria-label="Next testimonial"
              onClick={next}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Patients (3-up paged carousel) ───────────────────────────────────────────

function getPatientPerPage() {
  if (typeof window === "undefined") return 3;
  return window.innerWidth <= 880 ? 1 : 3;
}

const PatientsSection = () => {
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverRef = useRef(false);

  const pages: (typeof PATIENT_TESTIMONIALS)[] = [];
  for (let n = 0; n < PATIENT_TESTIMONIALS.length; n += perPage) {
    pages.push(PATIENT_TESTIMONIALS.slice(n, n + perPage));
  }
  const count = pages.length;

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);
  const start = useCallback(() => {
    stop();
    timerRef.current = setInterval(() => {
      if (!hoverRef.current) {
        setPage((p) => (p + 1) % Math.ceil(PATIENT_TESTIMONIALS.length / getPatientPerPage()));
      }
    }, 6000);
  }, [stop]);
  const goTo = useCallback(
    (n: number) => {
      setPage(((n % count) + count) % count);
      stop();
      start();
    },
    [count, stop, start],
  );

  useEffect(() => {
    setPerPage(getPatientPerPage());
    const onResize = () => {
      const next = getPatientPerPage();
      setPerPage(next);
      setPage((p) => Math.min(p, Math.ceil(PATIENT_TESTIMONIALS.length / next) - 1));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return (
    <section className={classes.patientsSection}>
      <div className="xl-container">
        <div className={classes.sectionHead}>
          <h2>Hear from Happy Patients</h2>
        </div>
        <div
          className={classes.ptCarousel}
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
            start();
          }}
        >
          <div className={classes.ptViewport}>
            <div
              className={classes.ptTrack}
              style={{ transform: `translateX(${-100 * page}%)` }}
            >
              {pages.map((group, gi) => (
                <div
                  key={gi}
                  className={classes.ptPage}
                  style={{ gridTemplateColumns: `repeat(${perPage}, 1fr)` }}
                >
                  {group.map((t) => (
                    <article key={t.name} className={classes.ptCard}>
                      <p className={classes.ptQuote}>&ldquo;{t.quote}&rdquo;</p>
                      <div className={classes.ptDivider} />
                      <div className={classes.ptMeta}>
                        <div className={classes.ptAvatar} aria-hidden="true">
                          {t.initial}
                        </div>
                        <div>
                          <div className={classes.ptName}>{t.name}</div>
                          <div className={classes.ptRole}>{t.role}</div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.ptControls}>
            <button
              className={classes.ptArrow}
              type="button"
              aria-label="Previous reviews"
              onClick={() => goTo(page - 1)}
            >
              <ArrowLeft />
            </button>
            <div className={classes.ptDots} role="tablist">
              {pages.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  aria-label={`Reviews page ${k + 1}`}
                  className={`${classes.ptDot}${k === page ? ` ${classes.isActive}` : ""}`}
                  onClick={() => goTo(k)}
                />
              ))}
            </div>
            <button
              className={classes.ptArrow}
              type="button"
              aria-label="Next reviews"
              onClick={() => goTo(page + 1)}
            >
              <ArrowRight />
            </button>
          </div>
          <div className={classes.ptTrustbar}>
            <div
              className="trustpilot-widget"
              data-locale="en-US"
              data-template-id="5406e65db0d04a09e042d5fc"
              data-businessunit-id="60e5837e95cb800001e58b14"
              data-style-height="28px"
              data-style-width="100%"
              data-token="6100d50c-77a5-4123-ba13-e8cf4c6bec64"
            >
              <a
                href="https://www.trustpilot.com/review/phil.us"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trustpilot
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FaqSection = () => {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState(FAQ_CATEGORIES[0].id);
  const anchorsRef = useRef<Map<string, HTMLElement>>(new Map());

  const setAnchorRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) anchorsRef.current.set(id, el);
      else anchorsRef.current.delete(id);
    },
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      const probe = 132;
      let current = FAQ_CATEGORIES[0].id;
      for (const cat of FAQ_CATEGORIES) {
        const el = anchorsRef.current.get(cat.id);
        if (el && el.getBoundingClientRect().top <= probe) {
          current = cat.id;
        }
      }
      setActiveCat(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCategory = (id: string) => {
    const el = anchorsRef.current.get(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveCat(id);
  };

  let itemIdx = 0;

  return (
    <section className={classes.faqSection} id="faq">
      <div className="xl-container">
        <div className={classes.faqGrid}>
          <div className={classes.faqHeaderRow}>
            <aside className={classes.faqHeaderCopy}>
              <Eyebrow text="Frequently Asked Questions" />
              <h2 className={classes.faqH2}>
                Your Questions About PHILRx, Answered
              </h2>
            </aside>
            <a
              href={HELP_CENTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${classes.btn} ${classes.btnOutlineGradient}`}
            >
              Visit Help Center
            </a>
          </div>

          <div className={classes.faqBody}>
            <aside
              className={classes.faqSide}
              aria-label="FAQ sections"
            >
              <ul className={classes.faqSideList}>
                {FAQ_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={`${classes.faqSideLink}${activeCat === cat.id ? ` ${classes.faqSideLinkActive}` : ""}`}
                      onClick={() => scrollToCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className={classes.faqList}>
              {FAQ_CATEGORIES.map((cat) =>
                cat.items.map((item) => {
                  const key = `${cat.id}-${itemIdx++}`;
                  const isOpen = openKey === key;
                  const isFirst = cat.items.indexOf(item) === 0;
                  return (
                    <React.Fragment key={key}>
                      {isFirst && (
                        <div
                          ref={setAnchorRef(cat.id)}
                          className={classes.faqCatAnchor}
                          data-cat={cat.id}
                        />
                      )}
                      <div
                        className={[
                          classes.faqItem,
                          isOpen ? classes.faqOpen : "",
                          activeCat === cat.id ? classes.faqItemActiveCat : "",
                        ].filter(Boolean).join(" ")}
                        data-cat={cat.id}
                      >
                        <button
                          type="button"
                          className={classes.faqQ}
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          aria-expanded={isOpen}
                        >
                          {item.q}
                          <span
                            className={classes.faqToggle}
                            aria-hidden="true"
                          />
                        </button>
                        <div className={classes.faqA}>
                          <div
                            className={classes.faqAInner}
                            /* eslint-disable-next-line react/no-danger */
                            dangerouslySetInnerHTML={{ __html: item.aHtml }}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Footer CTA ───────────────────────────────────────────────────────────────

const FooterCta = () => (
  <section className={classes.footerCta}>
    <div className={`xl-container ${classes.ctaContainer}`}>
      <div className={classes.footerCtaInner}>
        <h2 className={classes.footerCtaTitle}>
          Get MD Support from the PHILRx Team
        </h2>
        <div className={classes.footerCtaButtons}>
          <a
            href={HCP_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${classes.btn} ${classes.btnFooterLight}`}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const ProvidersPage: React.FC = () => {
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
    <PageContext.Provider value={{ title: "Providers" }}>
      <Layout>
        <HeroSection />
        <AccessSection />
        <WhySection />
        <StepsSection />
        <VideoSection />
        <ProvidersSection />
        <PatientsSection />
        <FaqSection />
        <FooterCta />
      </Layout>
    </PageContext.Provider>
  );
};

export default ProvidersPage;

const PROVIDERS_TITLE = "Affordable Patient Medications — PHILRx for Providers";
const PROVIDERS_DESC =
  "The PhilRx patient platform streamlines the way people receive their prescriptions by removing barriers to medication access so that patients can seamlessly start and adhere to therapy. Using PhilRx, patients report:";
const PROVIDERS_URL = "https://phil.us/providers";
const PROVIDERS_OG_IMAGE = getOgImage(null);
const PROVIDERS_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PROVIDERS_URL,
  url: PROVIDERS_URL,
  name: PROVIDERS_TITLE,
  description: PROVIDERS_DESC,
  image: PROVIDERS_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{PROVIDERS_TITLE}</title>
    <meta name="description" content={PROVIDERS_DESC} />
    <link rel="canonical" href={PROVIDERS_URL} />
    <meta property="og:title" content={PROVIDERS_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={PROVIDERS_DESC} />
    <meta property="og:image" content={PROVIDERS_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={PROVIDERS_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={PROVIDERS_TITLE} />
    <meta name="twitter:description" content={PROVIDERS_DESC} />
    <meta name="twitter:image" content={PROVIDERS_OG_IMAGE} />
    <script type="application/ld+json">{PROVIDERS_SCHEMA}</script>
  </>
);
