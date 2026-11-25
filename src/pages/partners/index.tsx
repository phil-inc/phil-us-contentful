import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { getOgImage } from "utils/getOgImage";
import { webPageSchema } from "utils/seo/schema";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import pDotsLight from "assets/images/p-dots-light.png";
import {
  PARTNERS_TITLE,
  PARTNERS_DESC,
  PARTNERS_PATH,
  HERO_MESSAGES,
  GTN_STATS,
  MARQUEE_WORDS,
  OUTCOMES,
  HUB_NODES,
  JOURNEY_CHIPS,
  COVERAGE_ROWS,
  INSIGHT_BARS,
  ACCESS_PATHS,
  JOURNEY_STEPS,
  QUOTES,
  RESOURCES,
} from "./_data";
import * as classes from "./partners.module.css";

import dotsAccent from "./assets/dots-accent.png";
import phoneLogo from "./assets/phone-philrx-logo.png";
import hubCenterLogo from "./assets/hub-center-logo.png";
import iconCheck from "./assets/icon-check.png";
import iconCoverage from "./assets/icon-coverage.png";
import iconHcps from "./assets/icon-hcps.png";
import iconInsurance from "./assets/icon-insurance.png";
import iconManufacturers from "./assets/icon-manufacturers.png";
import iconPartner from "./assets/icon-partner.png";
import iconPatientJourney from "./assets/icon-patient-journey.png";
import iconPharmacy from "./assets/icon-pharmacy.png";
import iconCopay from "./assets/icon-copay.png";
import iconMedicationAccess from "./assets/icon-medication-access.png";

// The design's refill, data and insights icons were corrupt in the export (see SPEC.md);
// those slots render without a picture until replacements are supplied.
const PATH_ICONS: Record<string, string | undefined> = {
  insurance: iconInsurance,
  hcps: iconHcps,
  copay: iconCopay,
  medicationAccess: iconMedicationAccess,
  partner: iconPartner,
};

const HUB_ICONS: (string | undefined)[] = [
  iconPatientJourney,
  iconHcps,
  iconManufacturers,
  iconPharmacy,
  iconInsurance,
  undefined,
];

const PATH_COLORS = ["#00827E", "#09AAA5", "#00615E"];

// ─── Hooks ───────────────────────────────────────────────────────────────────

/** Fades `[data-reveal]` children of the page in as they scroll into view. */
function useReveal(root: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classes.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => {
      el.style.transitionDelay = `${el.dataset.reveal || 0}ms`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [root]);
}

/** Cycles 0..count-1 every `ms` milliseconds. */
function useTicker(count: number, ms: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % count), ms);
    return () => clearInterval(t);
  }, [count, ms]);
  return [i, setI] as const;
}

// ─── Sections ────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [msg] = useTicker(HERO_MESSAGES.length, 3200);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const h = ref.current;
    if (!h) return;
    const r = h.getBoundingClientRect();
    h.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    h.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    h.style.setProperty("--spx", `${e.clientX - r.left}px`);
    h.style.setProperty("--spy", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={ref} className={classes.hero} onMouseMove={onMove}>
      <div className={classes.heroGlowA} />
      <div className={classes.heroGlowB} />
      <div className={classes.heroSpot} />
      <div className={`xl-container ${classes.heroGrid}`}>
        <div className={classes.heroCopy}>
          <div className={classes.heroBadge}>
            <span className={classes.pulseDot} />
            For Life Sciences Manufacturers
          </div>
          <h1 className={classes.heroTitle}>
            Accelerate Brand Success with{" "}
            <span className={classes.heroUnderline}>
              PhilRx
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 14 Q150 -4 298 12" />
              </svg>
            </span>
          </h1>
          <p className={classes.heroLead}>
            Drive growth for your brand with a digital hub partner trusted by industry-leading brands.
          </p>
          <div className={classes.heroBtns}>
            <Link to="/demo/" className={classes.btnWhite}>
              Book Demo
            </Link>
            <a href="#gtn" className={classes.btnOutline}>
              Calculate GTN Potential
            </a>
          </div>
        </div>
        <div className={classes.heroVisual}>
          <div className={classes.phone}>
            <div className={classes.phoneScreen}>
              <div className={classes.phoneBar}>
                <img src={phoneLogo} alt="PHILRx" />
                <span>Messages</span>
              </div>
              <div className={classes.phoneMsgs}>
                {HERO_MESSAGES.slice(0, msg + 1).map((m) => (
                  <div key={m.title} className={classes.phoneMsg}>
                    <div className={classes.phoneMsgTitle}>{m.title}</div>
                    <div className={classes.phoneMsgBody}>{m.body}</div>
                    <div className={classes.phoneMsgCta}>{m.cta}</div>
                  </div>
                ))}
                <div className={classes.typing}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={classes.phoneNote}>*Adaptrex is a fictional product used for illustrative purposes only.</div>
            </div>
          </div>
          <div className={`${classes.floatCard} ${classes.floatCardA}`}>
            <img src={iconInsurance} alt="" />
            <div>
              <div className={classes.floatTitle}>99%+ plan coverage</div>
              <div className={classes.floatSub}>All 50 states &amp; territories</div>
            </div>
          </div>
          <div className={`${classes.floatCard} ${classes.floatCardB}`}>
            <div>
              <div className={classes.floatTitle}>Free Rx delivery</div>
              <div className={classes.floatSub}>From first fill to refill</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GtnSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1600);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="gtn" ref={ref} className={`${classes.band} ${classes.bandPaper}`}>
      <div className={`xl-container ${classes.gtnGrid}`}>
        <div data-reveal="0" className={classes.reveal}>
          <div className={classes.eyebrow}>GTN Performance Calculator</div>
          <h2 className={classes.h2}>
            See How Your Brand’s <span className={classes.accent}>Gross‑To‑Net Could Grow</span>
          </h2>
          <p className={classes.lead}>
            Your brand team is focused on improving starts, coverage, and adherence. See what’s possible when all three
            components kick into hyperdrive to multiply gross‑to‑net impact, with an alternative channel built to
            maximize commercial control and patient outcomes. Uncover your brand’s untapped potential.
          </p>
          <div className={classes.gtnStatsHead}>Capture your commercial potential</div>
          <div className={classes.gtnStats}>
            {GTN_STATS.map((g) => (
              <div key={g.label} className={classes.gtnStat}>
                <div className={classes.gtnStatValue}>{(g.value * progress).toFixed(1)}×</div>
                <div className={classes.gtnStatLabel}>{g.label}</div>
                <div className={classes.gtnStatSub}>vs. baseline</div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal="150" className={`${classes.reveal} ${classes.gtnCard}`}>
          <div className={classes.gtnCardEyebrow}>Run Your Numbers</div>
          <h3 className={classes.gtnCardTitle}>Your brand's commercial potential, modeled in a minute.</h3>
          <p className={classes.gtnCardText}>Gain a clear view of what's possible for your portfolio.</p>
          <Link to="/gtn/" className={classes.btnDark}>
            Calculate Your Potential
          </Link>
        </div>
      </div>
    </section>
  );
};

const MarqueeSection = () => (
  <section className={classes.marquee} aria-hidden="true">
    <div className={classes.marqueeTrack}>
      {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
        <div key={i} className={classes.marqueeItem}>
          {w}
          <span />
        </div>
      ))}
    </div>
  </section>
);

const ValueSection = () => (
  <section className={classes.valueBand}>
    <div className={`xl-container ${classes.valueGrid}`}>
      <div data-reveal="0" className={classes.reveal}>
        <div className={classes.eyebrow}>Maximize Value for Your Brand</div>
        <h2 className={`${classes.h2} ${classes.h2Lg} ${classes.flush}`}>
          Traditional access solutions address only part of the problem.
        </h2>
      </div>
      <p data-reveal="150" className={`${classes.reveal} ${classes.leadLg} ${classes.flush}`}>
        Overcome access, affordability, and adherence challenges. PhilRx offers a digital hub solution that is designed
        to improve access, coverage, and GTN.
      </p>
    </div>
    <div className="xl-container">
      <div data-reveal="0" className={`${classes.reveal} ${classes.outcomes}`}>
        <img src={dotsAccent} alt="" className={classes.outcomesDots} />
        <div className={classes.outcomesCopy}>
          <div className={`${classes.eyebrow} ${classes.eyebrowLight}`}>PhilRx vs. Traditional Channels</div>
          <h3 className={classes.outcomesTitle}>Measurable lift where brands feel it most.</h3>
          <div className={classes.legend}>
            <span>
              <span className={classes.legendPhil} />
              PhilRx
            </span>
            <span>
              <span className={classes.legendTrad} />
              Traditional
            </span>
          </div>
        </div>
        <div className={classes.outcomeGrid}>
          {OUTCOMES.map((o, i) => (
            <div key={o.label} className={classes.outcome}>
              <div className={classes.outcomeHead}>
                <div className={classes.outcomeLabel}>{o.label}</div>
                <div className={classes.outcomeArrow}>↑</div>
              </div>
              <div className={classes.outcomeBars}>
                {[
                  [o.phil, classes.barPhil],
                  [o.trad, classes.barTrad],
                ].map(([w, cls]) => (
                  <div key={cls} className={classes.barTrack}>
                    <div
                      className={cls as string}
                      style={{ width: `${w}%`, animationDelay: `${200 + i * 150}ms` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const HubSection = () => (
  <section className={classes.band}>
    <div className={`xl-container ${classes.hubGrid}`}>
      <div data-reveal="0" className={classes.reveal}>
        <div className={classes.eyebrow}>The Digital Hub</div>
        <h2 className={`${classes.h2} ${classes.h2Lg}`}>Everyone in the prescription journey, connected.</h2>
        <p className={`${classes.leadLg} ${classes.flush}`}>
          PHIL combines a technology-driven hub, integrated dispense network, and end-to-end data capabilities into one
          powerful platform, helping pharma brands maximize patient outcomes and commercial performance.
        </p>
      </div>
      <div data-reveal="150" className={`${classes.reveal} ${classes.orbit}`}>
        <svg viewBox="0 0 560 560" className={classes.orbitRings} aria-hidden="true">
          <circle cx="280" cy="280" r="207" className={classes.ringDash} />
          <circle cx="280" cy="280" r="135" className={classes.ringInner} />
          <circle cx="280" cy="280" r="262" className={classes.ringOuter} />
        </svg>
        <div className={classes.orbitSpin}>
          {HUB_NODES.map((label, i) => (
            <div
              key={label}
              className={classes.orbitArm}
              style={{ transform: `rotate(${i * 60}deg) translateX(var(--r)) rotate(-${i * 60}deg)` }}
            >
              <div className={classes.orbitCounter}>
                <div className={classes.orbitNode}>
                  <div className={classes.orbitIcon}>{HUB_ICONS[i] && <img src={HUB_ICONS[i]} alt="" />}</div>
                  <div className={classes.orbitLabel}>{label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.orbitCenter}>
          <img src={hubCenterLogo} alt="PHIL" />
        </div>
      </div>
    </div>
  </section>
);

const WhySection = () => {
  const [chip] = useTicker(JOURNEY_CHIPS.length, 1600);

  return (
    <section id="platform" className={`${classes.band} ${classes.bandPaper}`}>
      <div className="xl-container">
        <div data-reveal="0" className={`${classes.reveal} ${classes.whyHead}`}>
          <div className={classes.eyebrow}>Why Partner with Phil</div>
          <h2 className={`${classes.h2} ${classes.flush}`}>One platform. Every step of the prescription journey.</h2>
        </div>
        <div className={classes.whyGrid}>
          <div data-reveal="0" className={`${classes.reveal} ${classes.whyCard} ${classes.whyCardGreen}`}>
            <img src={pDotsLight} alt="" className={classes.whyDots} />
            <div className={classes.whyIcon}>
              <img src={iconPatientJourney} alt="" />
            </div>
            <div className={classes.whyBody}>
              <h3>Modernize the Patient Access Journey</h3>
              <p>
                Our platform allows brands to integrate an e-commerce-like journey for patients resulting in better
                access and adherence.
              </p>
            </div>
            <div className={classes.chips}>
              {JOURNEY_CHIPS.map((t, i) => (
                <span key={t} className={`${classes.chip} ${i <= chip ? classes.chipOn : ""}`}>
                  <span />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div data-reveal="120" className={`${classes.reveal} ${classes.whyCard} ${classes.whyCardWhite}`}>
            <div className={`${classes.whyIcon} ${classes.whyIconSlime}`}>
              <img src={iconCoverage} alt="" />
            </div>
            <div className={classes.whyBody}>
              <h3>Maximize Dispenses Covered by Payers</h3>
              <p>We’ve built unique capabilities to ensure brands can capitalize on formulary placements to improve GTN.</p>
            </div>
            <div className={classes.coverageRows}>
              {COVERAGE_ROWS.map((c) => (
                <div key={c.k} className={classes.coverageRow}>
                  <span>{c.k}</span>
                  <span className={classes.coverageVal}>
                    <img src={iconCheck} alt="" />
                    {c.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal="240" className={`${classes.reveal} ${classes.whyCard} ${classes.whyCardForest}`}>
            <div className={classes.whyIcon} />
            <div className={classes.whyBody}>
              <h3>Enhance Insight into the Drug Channel</h3>
              <p>
                Our platform generates comprehensive data that we translate into actionable insights to inform brand
                strategy.
              </p>
            </div>
            <div className={classes.bars}>
              {INSIGHT_BARS.map((h, i) => (
                <div
                  key={i}
                  className={classes.bar}
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 80}ms`,
                    background: i === INSIGHT_BARS.length - 1 ? "#fff" : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PathsSection = () => (
  <section id="paths" className={classes.band}>
    <div className={`xl-container ${classes.pathsGrid}`}>
      <div data-reveal="0" className={classes.reveal}>
        <div className={classes.eyebrow}>Flexible Program Design</div>
        <h2 className={classes.h2}>Build patient access paths based on patient and brand needs.</h2>
        <p className={`${classes.lead} ${classes.flush}`}>
          Every prescription is routed to the path that fits the patient’s coverage, so more patients start and stay on
          therapy.
        </p>
      </div>
      <div data-reveal="150" className={classes.reveal}>
        <div className={classes.treeRoot}>
          <div className={classes.treePill}>
            <span className={classes.pulseDot} />
            New Prescription
          </div>
        </div>
        <div className={classes.treeLines} aria-hidden="true" />
        <div className={classes.treeCols}>
          {ACCESS_PATHS.map((p, i) => (
            <div key={p.name} className={classes.treeCol}>
              <div className={classes.treeStem} aria-hidden="true" />
              <div className={classes.treeName} style={{ background: PATH_COLORS[i] }}>
                {p.name}
              </div>
              {p.items.map((it, k) => (
                <div
                  key={it.name}
                  className={classes.treeItem}
                  style={{ animationDelay: `${200 + i * 120 + k * 100}ms` }}
                >
                  <div
                    className={classes.treeIcon}
                    style={PATH_ICONS[it.icon] ? { backgroundImage: `url(${PATH_ICONS[it.icon]})` } : undefined}
                  />
                  {it.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const JourneySection = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const l = lineRef.current;
      if (!l) return;
      const r = l.getBoundingClientRect();
      setFill(Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (innerHeight * 0.6))));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="journey" className={`${classes.band} ${classes.journey}`}>
      <div className={`xl-container ${classes.relative}`}>
        <div data-reveal="0" className={`${classes.reveal} ${classes.eyebrow} ${classes.eyebrowLight}`}>
          How It Works
        </div>
        <h2 data-reveal="0" className={`${classes.reveal} ${classes.h2} ${classes.h2Lg} ${classes.journeyTitle}`}>
          With PHIL, every step of the prescription journey is supported.
        </h2>
        <div ref={lineRef} className={classes.journeyLine}>
          <div style={{ width: `${fill * 100}%` }} />
        </div>
        <div className={classes.steps}>
          {JOURNEY_STEPS.map((s, i) => (
            <div key={s.n} data-reveal={i * 120} className={`${classes.reveal} ${classes.step}`}>
              <span className={classes.stepDot} />
              <div className={classes.stepNum}>{s.n}</div>
              <div className={classes.stepTitle}>{s.title}</div>
              <div className={classes.stepBody}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersSection = () => (
  <section id="partners" className={classes.band}>
    <div className="xl-container">
      <div data-reveal="0" className={`${classes.reveal} ${classes.eyebrow}`}>
        Partners We Work With
      </div>
      <h2 data-reveal="0" className={`${classes.reveal} ${classes.h2} ${classes.h2Lg} ${classes.partnersTitle}`}>
        Our solution can enhance your strategic objectives and offerings
      </h2>
      <div className={classes.partnerGrid}>
        <div data-reveal="0" className={`${classes.reveal} ${classes.partnerCard} ${classes.partnerCardSlime}`}>
          <img src={iconPartner} alt="" className={classes.partnerIcon} />
          <h3>Expert Alliance Partners</h3>
          <p>
            Life sciences consultants, marketing agencies, and full-service commercial organizations that offer support
            and advisory services to biopharma manufacturers.
          </p>
        </div>
        <div data-reveal="150" className={`${classes.reveal} ${classes.partnerCard} ${classes.partnerCardDark}`}>
          <img src={dotsAccent} alt="" className={classes.partnerDots} />
          <div className={classes.partnerIcon} />
          <h3>Technology Alliance Partners</h3>
          <p>
            Health tech providers that offer solutions for biopharma manufacturers that are complementary to PhilRx,
            such as telehealth, adherence, or business intelligence.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const GtnCtaSection = () => (
  <section className={classes.band}>
    <div className="xl-container">
      <div data-reveal="0" className={`${classes.reveal} ${classes.gtnCta}`}>
        <div className={classes.relative}>
          <div className={classes.gtnCtaEyebrow}>GTN Calculator</div>
          <h2 className={`${classes.h2} ${classes.gtnCtaTitle}`}>
            Want to forecast your brand's GTN potential with PHIL?
          </h2>
          <p className={classes.gtnCtaText}>
            The calculator was built by PHIL's Commercial Insights architects to translate our sophisticated GTN
            modeling to provide a clear view into a brand's GTN potential.
          </p>
        </div>
        <div className={classes.relative}>
          <Link to="/gtn/" className={classes.btnWhite}>
            Calculate Your Potential
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const [q, setQ] = useTicker(QUOTES.length, 6500);
  const quote = QUOTES[q];

  return (
    <section className={`${classes.band} ${classes.bandPaper}`}>
      <div className={`xl-container ${classes.quotes}`}>
        <div className={`${classes.eyebrow} ${classes.quotesEyebrow}`}>What Partners and Patients Say</div>
        <div className={classes.quoteStage}>
          <div key={q} className={classes.quote}>
            <blockquote>“{quote.text}”</blockquote>
            <div className={classes.quoteWho}>{quote.who}</div>
            <div className={classes.quoteRole}>{quote.role}</div>
          </div>
        </div>
        <div className={classes.quoteDots}>
          {QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label="Show testimonial"
              className={i === q ? classes.quoteDotOn : classes.quoteDot}
              onClick={() => setQ(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const RESOURCE_VARIANTS = {
  webinar: { className: classes.resWebinar, motif: undefined },
  report: { className: classes.resReport, motif: pDotsLight },
  strategy: { className: classes.resStrategy, motif: dotsAccent },
};

const ResourcesSection = () => (
  <section id="resources" className={classes.band}>
    <div className="xl-container">
      <div className={classes.resHead}>
        <h2 data-reveal="0" className={`${classes.reveal} ${classes.h2} ${classes.h2Lg} ${classes.flush}`}>
          Resources from Phil
        </h2>
        <Link to="/resources/" className={classes.textLink}>
          View all resources →
        </Link>
      </div>
      <div className={classes.resGrid}>
        {RESOURCES.map((r, i) => {
          const variant = RESOURCE_VARIANTS[r.variant];
          return (
            <Link key={r.href} to={r.href} data-reveal={i * 120} className={`${classes.reveal} ${classes.resCard}`}>
              <div className={`${classes.resArt} ${variant.className}`}>
                {variant.motif && (
                  <div className={classes.resMotif} style={{ backgroundImage: `url(${variant.motif})` }} />
                )}
                <div className={classes.resChip}>{r.chip}</div>
                <div className={classes.resBig}>
                  {r.big}
                  <div className={classes.resBigSub}>{r.bigSub}</div>
                </div>
              </div>
              <div className={classes.resBody}>
                <div className={classes.resType}>{r.type}</div>
                <div className={classes.resTitle}>{r.title}</div>
                <div className={classes.resDesc}>{r.desc}</div>
                <div className={classes.resCta}>{r.cta} →</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section className={`${classes.band} ${classes.finalCta}`}>
    <div className={`xl-container ${classes.relative}`}>
      <h2 data-reveal="0" className={`${classes.reveal} ${classes.finalTitle}`}>
        Interested in Partnering?
      </h2>
      <p data-reveal="100" className={`${classes.reveal} ${classes.finalText}`}>
        Get in touch with our team to learn how we can work together to help life sciences manufacturers achieve their
        full access potential.
      </p>
      <div data-reveal="200" className={`${classes.reveal} ${classes.finalBtns}`}>
        <Link to="/demo/" className={classes.btnWhite}>
          Book Demo
        </Link>
        <Link to="/contact/" className={classes.btnOutline}>
          Get in Touch
        </Link>
      </div>
    </div>
  </section>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const PartnersPage = () => {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <PageContext.Provider value={{ title: "Partners" }}>
      <Layout>
        <div ref={root} className={classes.partnersPage}>
          <HeroSection />
          <GtnSection />
          <MarqueeSection />
          <ValueSection />
          <HubSection />
          <WhySection />
          <PathsSection />
          <JourneySection />
          <PartnersSection />
          <GtnCtaSection />
          <TestimonialsSection />
          <ResourcesSection />
          <FinalCta />
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default PartnersPage;

const PARTNERS_OG_IMAGE = getOgImage(null);
const PARTNERS_SCHEMA = webPageSchema({
  path: PARTNERS_PATH,
  name: PARTNERS_TITLE,
  description: PARTNERS_DESC,
  image: PARTNERS_OG_IMAGE,
});

export const Head: HeadFC = () => (
  <>
    <SeoMeta title={PARTNERS_TITLE} description={PARTNERS_DESC} path={PARTNERS_PATH} image={PARTNERS_OG_IMAGE} />
    <JsonLd data={PARTNERS_SCHEMA} />
  </>
);
