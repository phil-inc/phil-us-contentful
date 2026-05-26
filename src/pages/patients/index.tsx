import React, { useState, useEffect, useCallback, useRef } from "react";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import {
  PATIENT_LOGIN_URL,
  HELP_CENTER_URL,
  STEPS,
  TESTIMONIALS,
  FAQS,
} from "./_data";
import * as classes from "./patients.module.css";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement) => void };
  }
}

// ─── Eyebrow ─────────────────────────────────────────────────────────────────

const Eyebrow = ({ text }: { text: string }) => (
  <div className={classes.eyebrow}>{text}</div>
);

// ─── Buttons ─────────────────────────────────────────────────────────────────

const BtnFilled = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${classes.btn} ${classes.btnFilled}`}
  >
    {children}
  </a>
);

const BtnOutlineGradient = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${classes.btn} ${classes.btnOutlineGradient}`}
  >
    {children}
  </a>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let clickTimer: ReturnType<typeof setTimeout>;

    const play = () => {
      stage.classList.add(classes.isPlaying);
      clearTimeout(clickTimer);
      clickTimer = setTimeout(
        () => stage.classList.add(classes.isClicking),
        2200,
      );
    };
    const reset = () => {
      clearTimeout(clickTimer);
      stage.classList.remove(classes.isPlaying, classes.isClicking);
    };

    const visual = stage.closest(`.${classes.heroVisual}`) as HTMLElement | null;
    visual?.addEventListener("mouseenter", play);
    visual?.addEventListener("mouseleave", reset);

    const autoTimer = setTimeout(() => {
      play();
      setTimeout(reset, 3200);
    }, 600);

    return () => {
      clearTimeout(autoTimer);
      clearTimeout(clickTimer);
      visual?.removeEventListener("mouseenter", play);
      visual?.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <header className={classes.hero}>
      <div className="xl-container">
        <div className={classes.heroGrid}>
          <div className={classes.heroCopy}>
            <Eyebrow text="For Patients" />
            <h1 className={classes.h1}>
              Easy, Affordable{" "}
              <span className={classes.h1Line2}>
                Prescriptions with{" "}
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
              </span>
            </h1>
            <p className={classes.heroCopy__lead}>
              We are on a mission to help you get your medications quickly and
              affordably. Our easy mobile experience helps get your prescriptions
              covered by insurance with free home delivery while providing
              real‑time updates and refill reminders.
            </p>
            <div className={classes.heroCta}>
              <BtnFilled href={PATIENT_LOGIN_URL}>Patient Login</BtnFilled>
              <BtnOutlineGradient href={HELP_CENTER_URL}>
                Visit Help Center
              </BtnOutlineGradient>
            </div>
          </div>

          <div className={classes.heroVisual} aria-hidden="true">
            <div className={classes.dotField} />
            <div className={classes.phoneStage} ref={stageRef}>
              <div className={classes.phone}>
                <div className={classes.phoneScreen}>
                  <div className={classes.phoneNotch} />
                  <div className={classes.phoneBrand}>PHILRx</div>
                  <div className={classes.phoneMeta}>Today at 12pm</div>
                  <div className={classes.bubble}>
                    Hi Sarah! Dr. Jones sent your Adaptrex® prescription to the
                    PHILRx pharmacy. Tap below to get started.
                  </div>
                  <div className={classes.checks}>
                    <div className={classes.checkRow}>
                      <span className={classes.check}>✓</span> Enroll in &lt; 1
                      min
                    </div>
                    <div className={classes.checkRow}>
                      <span className={classes.check}>✓</span> Fast, free
                      shipping
                    </div>
                    <div className={classes.checkRow}>
                      <span className={classes.check}>✓</span> Easy refills
                    </div>
                  </div>
                  <div className={classes.checksSpacer} />
                  <div className={classes.phoneCta}>
                    <span
                      className={classes.check}
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    >
                      ✓
                    </span>
                    Confirm &amp; enroll
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ─── Trustpilot Strip ─────────────────────────────────────────────────────────

const TrustpilotStrip = () => (
  <section className={classes.trust}>
    <div className="xl-container">
      <Eyebrow text="Trusted by Patients" />
      <h2 className={classes.trustTitle}>Hear from Happy PHILRx Patients</h2>
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="53aa8912dec7e10d38f59f36"
        data-businessunit-id="60e5837e95cb800001e58b14"
        data-style-height="240px"
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
  </section>
);

// ─── Steps ───────────────────────────────────────────────────────────────────

const StepsSection = () => (
  <section className={classes.steps__section}>
    <div className="xl-container">
      <div className={classes.sectionHead}>
        <h2>Getting Your Medications with PHILRx is Easy</h2>
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
      <div className={classes.stepsFooter}>
        <p>You're done! Getting your prescriptions from PHILRx is that simple.</p>
        <BtnFilled href={PATIENT_LOGIN_URL}>Patient Login</BtnFilled>
      </div>
    </div>
  </section>
);

// ─── Video ───────────────────────────────────────────────────────────────────

const VideoSection = () => (
  <section className={classes.video__section}>
    <div className="xl-container">
      <div className={classes.sectionHead}>
        <h2>How PHILRx Helps You Save on Your Prescriptions</h2>
      </div>
      <div className={classes.videoFrame}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/-yW2FBSAtd8?rel=0"
          title="How PHILRx Helps You Save on Your Prescriptions"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  </section>
);

// ─── Testimonials ─────────────────────────────────────────────────────────────

function getPerPage() {
  if (typeof window === "undefined") return 3;
  return window.innerWidth <= 640 ? 1 : 3;
}

const TestimonialsCarousel = () => {
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverRef = useRef(false);

  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const start = useCallback(() => {
    stop();
    timerRef.current = setInterval(() => {
      if (!hoverRef.current) {
        setPage((p) => (p + 1) % Math.ceil(TESTIMONIALS.length / getPerPage()));
      }
    }, 6500);
  }, [stop]);

  const goTo = useCallback(
    (idx: number) => {
      setPage((idx + totalPages) % totalPages);
      stop();
      start();
    },
    [totalPages, stop, start],
  );

  useEffect(() => {
    setPerPage(getPerPage());
  }, []);

  useEffect(() => {
    const onResize = () => {
      const next = getPerPage();
      setPerPage(next);
      setPage((p) =>
        Math.min(p, Math.ceil(TESTIMONIALS.length / next) - 1),
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const dotCount = Math.ceil(TESTIMONIALS.length / perPage);

  return (
    <section className={classes.testimonials__section}>
      <div className="xl-container">
        <div className={classes.sectionHead}>
          <h2>What Our Patients Say</h2>
        </div>

        <div
          className={classes.carousel}
          onMouseEnter={() => { hoverRef.current = true; }}
          onMouseLeave={() => { hoverRef.current = false; }}
        >
          <div
            className={classes.carouselTrack}
            style={{ transform: `translateX(${-(page * 100)}%)` }}
          >
            {TESTIMONIALS.map((t) => (
              <article key={t.name} className={classes.testimonialCard}>
                <span className={classes.quoteMark} aria-hidden="true">&ldquo;</span>
                <p className={classes.tQuote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={classes.tDivider} />
                <div className={classes.tAuthor}>
                  <span className={classes.tAvatar}>{t.initial}</span>
                  <div>
                    <div className={classes.tName}>{t.name}</div>
                    <div className={classes.tRole}>PHIL Patient</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className={classes.carouselControls}>
            <button className={classes.arrowBtn} aria-label="Previous" onClick={() => goTo(page - 1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className={classes.dots} role="tablist">
              {Array.from({ length: dotCount }, (_, i) => (
                <button
                  key={i}
                  className={`${classes.dot}${i === page ? ` ${classes.dotActive}` : ""}`}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button className={classes.arrowBtn} aria-label="Next" onClick={() => goTo(page + 1)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* TrustBox — Horizontal */}
          <div
            className={`trustpilot-widget ${classes.tpHorizontal}`}
            data-locale="en-US"
            data-template-id="5406e65db0d04a09e042d5fc"
            data-businessunit-id="60e5837e95cb800001e58b14"
            data-style-height="28px"
            data-style-width="100%"
            data-token="ad3b342b-7145-4316-9ca6-4f5a47f3d796"
          >
            <a href="https://www.trustpilot.com/review/phil.us" target="_blank" rel="noopener noreferrer">
              Trustpilot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className={classes.faq__section}>
      <div className="xl-container">
        <div className={classes.faqHeader}>
          <div className={classes.faqHeaderCopy}>
            <Eyebrow text="Frequently Asked Questions" />
            <h2 className={classes.faqH2}>Your Questions About PHILRx, Answered</h2>
          </div>
          <BtnOutlineGradient href={HELP_CENTER_URL}>Visit Help Center</BtnOutlineGradient>
        </div>

        <div className={classes.faqList}>
          {FAQS.map(({ q, aHtml }, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`${classes.faqItem}${isOpen ? ` ${classes.open}` : ""}`}
              >
                <button
                  className={classes.faqQ}
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  {q}
                  <span className={classes.faqToggle} aria-hidden="true" />
                </button>
                <div className={classes.faqA}>
                  {/* eslint-disable-next-line react/no-danger */}
                  <div
                    className={classes.faqAInner}
                    dangerouslySetInnerHTML={{ __html: aHtml }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Footer CTA ───────────────────────────────────────────────────────────────

const FooterCta = () => (
  <section className={classes.footerCta}>
    <div className="xl-container">
      <div className={classes.footerCtaInner}>
        <h2 className={classes.footerCtaTitle}>
          Get Affordable Medications with PHILRx
        </h2>
        <div className={classes.footerCtaButtons}>
          <a
            href={PATIENT_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${classes.btn} ${classes.btnFooterLight}`}
          >
            Patient Login
          </a>
          <a
            href={HELP_CENTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${classes.btn} ${classes.btnFooterOutline}`}
          >
            Visit Help Center
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const PatientsPage: React.FC = () => {
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
      script.src =
        "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
      script.onload = initWidgets;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <PageContext.Provider value={{ title: "Patients" }}>
      <Layout>
        <HeroSection />
        <TrustpilotStrip />
        <StepsSection />
        <VideoSection />
        <TestimonialsCarousel />
        <FaqSection />
        <FooterCta />
      </Layout>
    </PageContext.Provider>
  );
};

export default PatientsPage;

export const Head: HeadFC = () => (
  <>
    <title>Medication Access Services for Patients — PHIL</title>
    <meta
      name="description"
      content="Get your prescriptions quickly and affordably with PHILRx. Free home delivery, real-time updates, and easy refills."
    />
  </>
);
