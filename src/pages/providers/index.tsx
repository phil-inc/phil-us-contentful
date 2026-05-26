import React, { useState, useEffect, useCallback, useRef } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import {
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  HELP_CENTER_URL,
  CONTACT_PAGE_URL,
  STEPS,
  PATIENT_TESTIMONIALS,
  PROVIDER_TESTIMONIALS,
  FAQ_CATEGORIES,
} from "./_data";
import * as classes from "./providers.module.css";

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
            Affordable Medications for Your Patients with{" "}
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
            PHIL makes it easy for your patients to get their medication at an
            affordable price, with free home delivery and PA support for your
            office.
          </p>
          <div className={classes.heroHelp}>
            <a
              href="#faq"
              className={`${classes.btn} ${classes.btnFilled}`}
            >
              Read FAQs
            </a>
            <div className={classes.heroContact}>
              <div className={classes.heroContactIcon} aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className={classes.heroContactText}>
                <span className={classes.heroContactLabel}>
                  Need help or have questions?
                </span>
                Contact the PHILRx Clinical Support Team
                <br />
                at <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a> or{" "}
                <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a>.
              </div>
            </div>
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
                Drive Affordable Medication Access For Your Patients
              </h3>
              <div className={classes.wfSteps}>
                {[
                  "Quick, app‑free enrollment in < 1 minute for your patients",
                  "In‑workflow prescribing and 1‑click PA submissions for your office",
                  "Affordable copay cost and free home delivery for your patients",
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

// ─── Trustpilot Strip ─────────────────────────────────────────────────────────

const TrustpilotStrip = () => (
  <section className={classes.trust}>
    <div className="xl-container">
      <div className={classes.trustHead}>
        <Eyebrow text="Trusted by Patients" />
        <h2 className={classes.trustTitle}>Hear from Happy PHILRx Patients</h2>
      </div>
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="53aa8912dec7e10d38f59f36"
        data-businessunit-id="60e5837e95cb800001e58b14"
        data-style-height="140px"
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

// ─── Steps ────────────────────────────────────────────────────────────────────

const StepsSection = () => (
  <section className={classes.stepsSection}>
    <div className="xl-container">
      <div className={classes.sectionHead}>
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
      <div className={classes.sectionHead}>
        <h2>Sending a Script to PHILRx is Easy</h2>
      </div>
      <div className={classes.videoFrame}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/Fkq1ncdE2ug?rel=0&modestbranding=1"
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

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverRef = useRef(false);
  const maxCount = Math.max(
    PATIENT_TESTIMONIALS.length,
    PROVIDER_TESTIMONIALS.length,
  );

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const start = useCallback(() => {
    stop();
    timerRef.current = setInterval(() => {
      if (!hoverRef.current) {
        setIdx((i) => (i + 1) % maxCount);
      }
    }, 2975);
  }, [stop, maxCount]);

  const goTo = useCallback(
    (n: number) => {
      setIdx(((n % maxCount) + maxCount) % maxCount);
      stop();
      start();
    },
    [maxCount, stop, start],
  );

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const renderCard = (
    eyebrow: string,
    testimonials: typeof PATIENT_TESTIMONIALS,
  ) => {
    const cardIdx = idx % testimonials.length;
    return (
      <article
        className={classes.testimonialCard}
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
          start();
        }}
      >
        <span className={classes.quoteMark} aria-hidden="true">
          &ldquo;
        </span>
        <div className={classes.tEyebrow}>{eyebrow}</div>
        <div className={classes.tQuoteStack}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`${classes.tSlide}${i === cardIdx ? ` ${classes.tSlideActive}` : ""}`}
            >
              <p className={classes.tQuote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={classes.tAuthor}>{t.author}</div>
            </div>
          ))}
        </div>
        <div className={classes.tSegments} role="tablist">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Quote ${i + 1}`}
              className={`${classes.tSeg}${i === cardIdx ? ` ${classes.tSegActive}` : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </article>
    );
  };

  return (
    <section className={classes.testimonialsSection}>
      <div className="xl-container">
        <div className={classes.sectionHead}>
          <h2>What Our Patients &amp; Providers Say</h2>
        </div>
        <div className={classes.testimonialPair}>
          {renderCard("What Patients Say", PATIENT_TESTIMONIALS)}
          {renderCard("What Providers Say", PROVIDER_TESTIMONIALS)}
        </div>
        <div
          className={`trustpilot-widget ${classes.tpHorizontal}`}
          data-locale="en-US"
          data-template-id="5406e65db0d04a09e042d5fc"
          data-businessunit-id="60e5837e95cb800001e58b14"
          data-style-height="28px"
          data-style-width="100%"
          data-token="ad3b342b-7145-4316-9ca6-4f5a47f3d796"
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
      const probe = 140;
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
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
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
    <div className="xl-container">
      <div className={classes.footerCtaInner}>
        <h2 className={classes.footerCtaTitle}>
          Get MD Support from the PHILRx Team
        </h2>
        <div className={classes.footerCtaButtons}>
          <a
            href={CONTACT_PAGE_URL}
            className={`${classes.btn} ${classes.btnFooterLight}`}
          >
            Contact PHILRx Support
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
        <TrustpilotStrip />
        <StepsSection />
        <VideoSection />
        <TestimonialsSection />
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
