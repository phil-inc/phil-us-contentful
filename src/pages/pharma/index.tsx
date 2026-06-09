import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "gatsby";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import { getOgImage } from "utils/getOgImage";
import {
  PHARMA_TITLE,
  PHARMA_DESC,
  PHARMA_URL,
  STATS,
  PARTNER_TABS,
  PARTNER_PANELS,
  STAKEHOLDERS,
  PATIENT_QUOTES,
  PROVIDER_QUOTES,
  FAQ_CATEGORIES,
  FAQ_ITEMS,
} from "./_data";
import * as classes from "./pharma.module.css";

import philCoreThumb from "./assets/phil-core-thumb.jpg";
import philDirectThumb from "./assets/phil-direct-thumb.jpg";

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement) => void };
  }
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3l5 5-5 5" />
  </svg>
);

const stakeholderIcons: Record<string, React.ReactNode> = {
  chart: (
    <svg viewBox="0 0 24 24"><path d="M3 20h18" /><path d="M6 16l4-5 3.5 3L20 6" /><path d="M15 6h5v5" /></svg>
  ),
  package: (
    <svg viewBox="0 0 24 24"><path d="M8 3 L15 6 L15 14 L8 17 L2 14 L2 6 Z" /><path d="M2 6 L8 9 L15 6" /><path d="M8 9 L8 17" /><path d="M13 17 L16 20 L21 15" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24"><path d="M3 8h13l1 4h4l-1 6H4z" /><circle cx="8" cy="19" r="1.6" /><circle cx="17" cy="19" r="1.6" /><path d="M3 8l-1-3H1" /></svg>
  ),
  people: (
    <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.2" /><path d="M3 19c.6-3 3.3-5 6-5s5.4 2 6 5" /><path d="M14.5 16.2c.7-1.4 2-2.2 3.5-2.2 2 0 3.5 1.3 4 3.5" /></svg>
  ),
  bulb: (
    <svg viewBox="0 0 24 24"><path d="M9.5 17v-2c-2-1-3-3-3-5a5.5 5.5 0 0 1 11 0c0 2-1 4-3 5v2" /><path d="M10 20h4" /><path d="M11 22h2" /></svg>
  ),
};

// ─── Count-up animation ─────────────────────────────────────────────────────

/** Parse "3×+" → { num: 3, decimals: 0, suffix: "×+" } */
function parseStatValue(raw: string) {
  const match = raw.match(/^([\d.]+)(.*)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { num, decimals, suffix: match[2] };
}

function AnimatedStat({ value }: { value: string }) {
  const parsed = parseStatValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(parsed ? "0" + (parsed.decimals > 0 ? "." + "0".repeat(parsed.decimals) : "") + parsed.suffix : value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!parsed || !ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const { num, decimals, suffix } = parsed;
          const duration = 1600;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * num;
            setDisplay(current.toFixed(decimals) + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed]);

  return <span ref={ref}>{display}</span>;
}

// ─── Variant class map ───────────────────────────────────────────────────────

const variantClass: Record<string, string> = {
  v1: classes.v1,
  v2: classes.v2,
  v3: classes.v3,
  v4: classes.v4,
  v5: classes.v5,
  v6: classes.v6,
};

// ─── SECTION 1: Hero ─────────────────────────────────────────────────────────

const HeroSection = () => (
  <section className={classes.hero}>
    <div className="xl-container">
      <p className={classes.eyebrow}>For Pharma Manufacturers</p>
      <h1 className={classes.heroH1}>
        Secure Commercial Success in <em>Retail and Specialty-Lite</em>
      </h1>
      <p className={classes.heroLead}>
        PHIL is the all-in-one access platform built for retail and specialty lite pharma brands to
        overcome access barriers, maximize outcomes, and drive measurable performance at every stage
        of the script journey. Turning enrollment into starts, starts into covered dispenses, and
        dispenses into long-term adherence.
      </p>

      <div>
        <h2 className={classes.statRowHead}>Unlock the Full Potential of Your Program</h2>
        <div className={classes.statRow}>
          <div className={classes.statTrack}>
            {[...STATS, ...STATS].map((stat, i) => (
              <article
                key={i}
                className={`${classes.statCard} ${variantClass[stat.variant]}`}
                aria-hidden={i >= STATS.length ? true : undefined}
              >
                <div>
                  <p className={classes.statNum}><AnimatedStat value={stat.value} /></p>
                  <p className={classes.statLabel}>{stat.label}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── SECTION 2: Our Partners ─────────────────────────────────────────────────

const PartnersSection = () => {
  const [activeTab, setActiveTab] = useState(PARTNER_TABS[0].key);

  return (
    <section className={`${classes.band} ${classes.partnerBg}`}>
      <div className="xl-container">
        <div className={classes.sectionHeadCenter}>
          <p className={classes.eyebrow}>Our Partners</p>
          <h2>Enhance Performance Across Your Patient Access Strategy at Any Stage</h2>
          <p className={classes.leadCenter}>
            PHIL partners with pharma brands of all sizes, from top global biopharma companies to
            emerging biotech launches, across every stage of the product lifecycle.
          </p>
        </div>

        <div className={classes.partnerTabs} role="tablist">
          {PARTNER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              className={activeTab === tab.key ? classes.partnerTabActive : classes.partnerTab}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {PARTNER_PANELS.map((panel) => (
          <article
            key={panel.key}
            className={activeTab === panel.key ? classes.partnerPanelActive : classes.partnerPanel}
            role="tabpanel"
          >
            <h3 className={classes.ppTitle}>{panel.title}</h3>
            <p className={classes.ppBody}>{panel.body}</p>
          </article>
        ))}

        <div className={classes.partnerCtas}>
          <Link className={classes.btnPrimary} to="/demo/">
            Book Demo
          </Link>
          <Link className={classes.btnText} to="/approach/">
            Learn About Our Approach &amp; Outcomes <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 3: Our Platform ─────────────────────────────────────────────────

const PlatformSection = () => (
  <section className={classes.band}>
    <div className="xl-container">
      <div className={classes.sectionHeadCenter}>
        <p className={classes.eyebrow}>Our Platform</p>
        <h2>Deliver a Seamless Medication Access Experience for Patients and Providers</h2>
        <p className={classes.leadCenter}>
          PHIL's platform pairs an innovative digital hub with a Direct-to-Patient solution, giving
          brands the flexibility to design the program that fits their commercial strategy while
          driving economic success at every step.
        </p>
      </div>

      <div className={classes.pfVideos}>
        <div className={classes.pfVideoCard}>
          <a
            className={classes.pfVideoThumb}
            href="https://www.youtube.com/watch?v=7Oyyt-tjrsE"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch PHIL Core video"
          >
            <img src={philCoreThumb} alt="PHIL Core video thumbnail" loading="lazy" />
            <span className={classes.pfVideoTag}>PHIL Digital Hub</span>
            <span className={classes.playOverlay} aria-hidden="true">
              <span className={classes.playBtn}>
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" /></svg>
              </span>
            </span>
          </a>
          <div className={classes.pfVideoBody}>
            <h3 className={classes.pfVideoTitle}>
              Experience Commercial Success with a Flexible Digital Hub Solution
            </h3>
            <p className={classes.pfVideoDesc}>
              With PHIL, every step of the prescription journey is supported. Automating prior
              authorization, benefits verification, and pharmacy routing, reduces potential
              prescription drop-off points and supports more patients when starting therapy.
            </p>
            <Link className={classes.btnText} to="/solution/core/">
              Explore PHIL Digital Hub <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className={classes.pfCombine} aria-hidden="true">
          <span className={classes.pfPlus}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M12 5v14" /><path d="M5 12h14" />
            </svg>
          </span>
        </div>

        <div className={classes.pfVideoCardFlipped}>
          <a
            className={classes.pfVideoThumb}
            href="https://www.youtube.com/watch?v=WmuyIuwHkgM"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch PHIL Direct video"
          >
            <img src={philDirectThumb} alt="PHIL Direct video thumbnail" loading="lazy" />
            <span className={classes.pfVideoTag}>PHIL Direct-to-Patient</span>
            <span className={classes.playOverlay} aria-hidden="true">
              <span className={classes.playBtn}>
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" /></svg>
              </span>
            </span>
          </a>
          <div className={classes.pfVideoBody}>
            <h3 className={classes.pfVideoTitle}>
              Create a Future-ready, Direct-to-Patient Experience with a Proven DTP Solution
            </h3>
            <p className={classes.pfVideoDesc}>
              PHIL Direct-to-Patient (DTP) connects intake, telemedicine, coverage routing, and
              fulfillment in one seamless experience, helping brands drive patient starts, maximize
              affordability, and promote adherence beyond the first fill.
            </p>
            <Link className={classes.btnText} to="/solution/direct/">
              Explore PHIL Direct-to-Patient <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── SECTION 4: Stakeholders ─────────────────────────────────────────────────

const StakeholdersSection = () => {
  const [activeKey, setActiveKey] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (STAKEHOLDERS.some((s) => s.key === hash)) return hash;
    }
    return STAKEHOLDERS[0].key;
  });
  const active = STAKEHOLDERS.find((s) => s.key === activeKey)!;

  const selectTab = (key: string) => {
    setActiveKey(key);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${key}`);
    }
  };

  return (
    <section className={`${classes.band} ${classes.stkBg}`}>
      <div className="xl-container">
        <div className={classes.sectionHeadCenter}>
          <p className={classes.eyebrow}>How We Help You</p>
          <h2>The Right Partner for Every Commercial Stakeholder</h2>
          <p className={classes.leadCenter}>
            Select your role to see the access challenges PHIL solves and how we drive measurable
            impact for your team.
          </p>
        </div>

        <div className={classes.stkWrap}>
          <div className={classes.stkRail} role="tablist" aria-label="Commercial stakeholders">
            {STAKEHOLDERS.map((s) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={activeKey === s.key}
                className={activeKey === s.key ? classes.stkTabActive : classes.stkTab}
                onClick={() => selectTab(s.key)}
              >
                <span className={classes.stkTabIcon} aria-hidden="true">
                  {stakeholderIcons[s.icon]}
                </span>
                <span>{s.name}</span>
                <span className={classes.stkTabArrow} aria-hidden="true">
                  <ChevronRight />
                </span>
              </button>
            ))}
          </div>

          <div className={classes.stkPanels}>
            {STAKEHOLDERS.map((s) => (
              <article
                key={s.key}
                className={activeKey === s.key ? classes.stkPanelActive : classes.stkPanel}
                role="tabpanel"
              >
                <div className={classes.stkPanelHead}>
                  <span className={classes.stkBigIcon} aria-hidden="true">
                    {stakeholderIcons[s.icon]}
                  </span>
                  <div>
                    <p className={classes.stkTag}>For You</p>
                    <h3 className={classes.stkPanelTitle}>{s.name}</h3>
                  </div>
                </div>

                <div className={classes.stkCols}>
                  <div className={classes.stkColProblem}>
                    <div className={classes.stkColHead}>
                      <span className={classes.stkPinProblem}>
                        <svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                      </span>
                      <p className={classes.stkColTagProblem}>The Problem</p>
                    </div>
                    <h4 className={classes.stkColH4}>{s.problem}</h4>
                  </div>
                  <div className={classes.stkColSolve}>
                    <div className={classes.stkColHead}>
                      <span className={classes.stkPinSolve}>
                        <svg viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" /></svg>
                      </span>
                      <p className={classes.stkColTagSolve}>PHIL's Solve</p>
                    </div>
                    <p className={classes.stkColP}>{s.solve}</p>
                  </div>
                </div>

                <Link className={classes.stkLearn} to={s.learnMoreHref}>
                  Learn More
                  <span aria-hidden="true">
                    <ArrowRight />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 5: PHIL Support (Reviews) ───────────────────────────────────────

const ReviewQuoteCard = ({
  quotes,
  label,
  variant,
}: {
  quotes: readonly { q: string; a: string }[];
  label: string;
  variant: "patients" | "providers";
}) => {
  const [idx, setIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(idx);
  idxRef.current = idx;

  const goTo = useCallback(
    (n: number) => {
      setLeaving(true);
      setTimeout(() => {
        setIdx(n % quotes.length);
        setLeaving(false);
      }, 280);
    },
    [quotes.length]
  );

  const start = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(idxRef.current + 1), 6000);
  }, [goTo]);

  useEffect(() => {
    start();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [start]);

  const cardClass = variant === "patients" ? classes.reviewCardPatients : classes.reviewCardProviders;

  return (
    <article
      className={cardClass}
      onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
      onMouseLeave={start}
    >
      <span className={classes.rcQuoteMark} aria-hidden="true">{"“"}</span>
      <p className={classes.rcTag}>{label}</p>
      <blockquote className={`${classes.rcQuote} ${leaving ? classes.rcQuoteLeaving : ""}`}>
        &ldquo;{quotes[idx].q}&rdquo;
      </blockquote>
      <p className={`${classes.rcAttr} ${leaving ? classes.rcAttrLeaving : ""}`}>
        {quotes[idx].a}
      </p>
      <div className={classes.rcDots} role="tablist">
        {quotes.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${classes.rcDot} ${i === idx ? classes.rcDotActive : ""}`}
            onClick={() => { goTo(i); start(); }}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </article>
  );
};

const SupportSection = () => {
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

  return (
    <section className={`${classes.band} ${classes.supportBg}`}>
      <div className="xl-container">
        <div className={classes.sectionHeadCenter}>
          <p className={classes.eyebrow}>PHIL Support</p>
          <h2>Improve Patient Outcomes and Provider Engagement While Driving Brand Performance</h2>
        </div>

        <div className={classes.reviewGrid}>
          <ReviewQuoteCard quotes={PATIENT_QUOTES} label="What Patients Say" variant="patients" />

          <article className={classes.reviewCardFeature}>
            <p className={classes.rcTag}>Customer Stories</p>
            <h3 className={classes.rcFeatureTitle}>Real brands. Real results.</h3>
            <p className={classes.rcFeatureDesc}>
              See how leading retail and specialty-lite brands are partnering with PHIL to drive
              measurable performance across patient access, affordability, and adherence.
            </p>
            <Link className={classes.rcCta} to="/resources/?type=casestudy">
              Read More
              <span className={classes.rcCtaArrow} aria-hidden="true">
                <svg viewBox="0 0 28 18"><path d="M2 9h22M18 3l6 6-6 6" /></svg>
              </span>
            </Link>
          </article>

          <ReviewQuoteCard quotes={PROVIDER_QUOTES} label="What Providers Say" variant="providers" />
        </div>

        <div className={classes.trustpilotStrip}>
          <div
            className="trustpilot-widget tp-horizontal"
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

// ─── SECTION 6: FAQ ──────────────────────────────────────────────────────────

const FaqSection = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [activeCat, setActiveCat] = useState(FAQ_CATEGORIES[0].key);
  const markerRef = useRef<HTMLSpanElement>(null);
  const sideListRef = useRef<HTMLUListElement>(null);

  const toggleItem = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const moveMarker = useCallback((cat: string) => {
    if (!markerRef.current || !sideListRef.current) return;
    const btn = sideListRef.current.querySelector(`[data-cat="${cat}"]`) as HTMLElement | null;
    if (!btn) return;
    const listRect = sideListRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    markerRef.current.style.top = `${btnRect.top - listRect.top}px`;
    markerRef.current.style.height = `${btnRect.height}px`;
    markerRef.current.classList.add(classes.faqSideMarkerReady);
  }, []);

  useEffect(() => {
    moveMarker(activeCat);
  }, [activeCat, moveMarker]);

  const handleCatClick = (cat: string) => {
    setActiveCat(cat);
    const anchor = document.getElementById(`cat-${cat}`);
    if (anchor) {
      const y = anchor.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-faq-cat-anchor]"));
    if (!anchors.length) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let current = anchors[0].dataset.faqCatAnchor!;
        for (const anchor of anchors) {
          if (anchor.getBoundingClientRect().top <= 140) {
            current = anchor.dataset.faqCatAnchor!;
          } else break;
        }
        setActiveCat(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={`${classes.band} ${classes.faqSection}`}>
      <div className="xl-container">
        <div className={classes.faqHeader}>
          <div>
            <p className={classes.eyebrow}>Frequently Asked Questions</p>
            <h2 className={classes.faqHeaderH2}>Everything Pharma Teams Want to Know</h2>
          </div>
          <Link className={classes.btnPrimary} to="/contact/">
            Talk to Our Team
          </Link>
        </div>

        <div className={classes.faqBody}>
          <aside className={classes.faqSide} aria-label="FAQ sections">
            <ul className={classes.faqSideList} ref={sideListRef}>
              <span className={classes.faqSideMarker} ref={markerRef} aria-hidden="true" />
              {FAQ_CATEGORIES.map((cat) => (
                <li key={cat.key}>
                  <button
                    type="button"
                    data-cat={cat.key}
                    className={activeCat === cat.key ? classes.faqSideLinkActive : classes.faqSideLink}
                    onClick={() => handleCatClick(cat.key)}
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className={classes.faqList}>
            {FAQ_CATEGORIES.map((cat) => (
              <React.Fragment key={cat.key}>
                <div id={`cat-${cat.key}`} data-faq-cat-anchor={cat.key} style={{ position: "relative", top: "-100px", visibility: "hidden", height: 0 }} />
                {FAQ_ITEMS.filter((item) => item.cat === cat.key).map((item, i) => {
                  const globalIdx = FAQ_ITEMS.indexOf(item);
                  const isOpen = openItems.has(globalIdx);
                  return (
                    <div key={globalIdx} className={classes.faqItem}>
                      <button
                        type="button"
                        className={`${classes.faqQ} ${activeCat === cat.key ? classes.faqQActive : ""}`}
                        onClick={() => toggleItem(globalIdx)}
                      >
                        {item.q}
                        <span className={`${classes.faqToggle} ${isOpen ? classes.faqToggleOpen : ""}`} aria-hidden="true" />
                      </button>
                      <div className={`${classes.faqA} ${isOpen ? classes.faqAOpen : ""}`}>
                        <div className={classes.faqAInner} dangerouslySetInnerHTML={{ __html: item.a.replace(/\n/g, "<br/>") }} />
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 7: Final CTA ────────────────────────────────────────────────────

const FinalCtaSection = () => (
  <section className={classes.finalCta}>
    <div className={`xl-container ${classes.finalCtaWrap}`}>
      <div>
        <h2 className={classes.finalCtaH2}>Streamline the Medication Access Experience</h2>
        <p className={classes.finalCtaP}>
          Discover how the PHIL platform can help your brands maximize coverage, adherence, and
          commercial performance.
        </p>
      </div>
      <div className={classes.finalCtaButtons}>
        <Link className={classes.btnOnDark} to="/demo/">
          Book Demo
        </Link>
      </div>
    </div>
  </section>
);

// ─── PAGE ────────────────────────────────────────────────────────────────────

const PharmaPage = () => (
  <PageContext.Provider value={{ slug: "pharma" }}>
    <Layout>
      <div className={classes.pharmaPage}>
        <HeroSection />
        <PartnersSection />
        <PlatformSection />
        <StakeholdersSection />
        <SupportSection />
        <FaqSection />
        <FinalCtaSection />
      </div>
    </Layout>
  </PageContext.Provider>
);

export default PharmaPage;

const PHARMA_OG_IMAGE = getOgImage(null);

export const Head: HeadFC = () => (
  <>
    <title>{PHARMA_TITLE}</title>
    <meta name="description" content={PHARMA_DESC} />
    <link rel="canonical" href={PHARMA_URL} />
    <meta property="og:title" content={PHARMA_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={PHARMA_DESC} />
    <meta property="og:image" content={PHARMA_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={PHARMA_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={PHARMA_TITLE} />
    <meta name="twitter:description" content={PHARMA_DESC} />
    <meta name="twitter:image" content={PHARMA_OG_IMAGE} />
  </>
);
