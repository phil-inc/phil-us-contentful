import React, { useEffect, useRef, useState } from "react";
import type { HeadFC } from "gatsby";
import { VisuallyHidden } from "@mantine/core";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { getOgImage } from "utils/getOgImage";
import { webPageSchema } from "utils/seo/schema";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import HubSpotFormV2 from "components/common/HubspotForm/HubspotFormV2";

import {
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
import type { HubNode, PathItem, ResourceCard } from "./_data";
import * as classes from "./partners.module.css";

import pDotsLight from "assets/images/p-dots-light.png";
import pDotsDark from "assets/images/p-dots-dark.png";
import dotsAccent from "./assets/dots-accent.png";
import circlesPrimary from "./assets/circles-primary.png";
import philrxLogo from "./assets/philrx-logo.png";
import hubCenterLogo from "./assets/hub-center-logo.png";
import iconNetwork from "./assets/icon-network.png";
import iconPatientJourney from "./assets/icon-patient-journey.png";
import iconProviders from "./assets/icon-providers.png";
import iconManufacturers from "./assets/icon-manufacturers.png";
import iconInsurance from "./assets/icon-insurance.png";
import iconCoverage from "./assets/icon-coverage.png";
import iconCheck from "./assets/icon-check.png";
import iconCopay from "./assets/icon-copay.png";
import iconMedicationAccess from "./assets/icon-medication-access.png";
import iconPartner from "./assets/icon-partner.png";
import iconRefill from "./assets/icon-refill.png";

const HUB_ICONS: Record<HubNode["icon"], string | undefined> = {
  patients: iconPatientJourney,
  providers: iconProviders,
  manufacturers: iconManufacturers,
  pharmacies: iconNetwork,
  payers: iconInsurance,
  insights: undefined,
};

const PATH_ICONS: Record<NonNullable<PathItem["icon"]>, string> = {
  insurance: iconInsurance,
  providers: iconProviders,
  copay: iconCopay,
  medicationAccess: iconMedicationAccess,
  partner: iconPartner,
  refill: iconRefill,
};

const RESOURCE_MOTIFS: Record<NonNullable<ResourceCard["motif"]>, string> = {
  circlesPrimary,
  pDotsLight,
  dotsAccent,
};

const HUBSPOT_PORTAL_ID = "20880193";
const GTN_FORM_ID = "a416c378-bb01-401d-a2d0-5c7d9369c8ee";

const delay = (ms: number) => ({ "--rd": `${ms}ms` }) as React.CSSProperties;

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Cycles 0..count-1 every `ms`, starting from `start`. */
const useTicker = (count: number, ms: number, start = 0) => {
  const [i, setI] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % count), ms);
    return () => clearInterval(t);
  }, [count, ms]);
  return [i, setI] as const;
};

/** Fades `[data-reveal]` elements in as they scroll into view. */
const useReveal = (root: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    el.setAttribute("data-reveal-ready", "true");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "true");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [root]);
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [msg] = useTicker(HERO_MESSAGES.length, 3200);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const h = ref.current;
      if (!h) return;
      const r = h.getBoundingClientRect();
      h.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      h.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      h.style.setProperty("--spx", `${e.clientX - r.left}px`);
      h.style.setProperty("--spy", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" ref={ref} className={classes.hero}>
      <div className={classes.heroGlowA} aria-hidden="true" />
      <div className={classes.heroGlowB} aria-hidden="true" />
      <div className={classes.heroSpot} aria-hidden="true" />
      <img src={circlesPrimary} alt="" className={classes.heroCircles} />
      <div className={`xl-container ${classes.heroGrid}`}>
        <div className={classes.heroCopy}>
          <div className={classes.heroPill}>
            <span className={classes.pulseDot} />
            For Life Sciences Manufacturers
          </div>
          <h1 className={classes.h1}>
            Accelerate Brand Success with{" "}
            <span className={classes.accent}>
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
            <a href="/demo/" className={`${classes.btn} ${classes.btnWhite}`}>
              Book Demo
            </a>
            <a href="#gtn" className={`${classes.btn} ${classes.btnOutlineWhite}`}>
              Calculate GTN Potential
            </a>
          </div>
        </div>

        <div className={classes.heroVisual}>
          <div className={classes.phone} aria-hidden="true">
            <div className={classes.phoneScreen}>
              <div className={classes.phoneHead}>
                <img src={philrxLogo} alt="" />
                <span>Messages</span>
              </div>
              <div className={classes.phoneBody}>
                {HERO_MESSAGES.slice(0, msg + 1).map((m) => (
                  <div key={m.title} className={classes.msg}>
                    <div className={classes.msgTitle}>{m.title}</div>
                    <div className={classes.msgBody}>{m.body}</div>
                    <div className={classes.msgCta}>{m.cta}</div>
                  </div>
                ))}
                <div className={classes.typing}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={classes.phoneNote}>
                *Adaptrex is a fictional product used for illustrative purposes only.
              </div>
            </div>
          </div>
          <div className={`${classes.float} ${classes.floatA}`}>
            <img src={iconNetwork} alt="" />
            <div>
              <div className={classes.floatTitle}>99%+ plan coverage</div>
              <div className={classes.floatSub}>All 50 states &amp; territories</div>
            </div>
          </div>
          <div className={`${classes.float} ${classes.floatB}`}>
            <img src={iconRefill} alt="" />
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

// ─── GTN calculator teaser ────────────────────────────────────────────────────

const GtnSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setProgress(1);
      return;
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = Date.now();
        timer = setInterval(() => {
          const p = Math.min(1, (Date.now() - t0) / 1600);
          setProgress(1 - Math.pow(1 - p, 3));
          if (p >= 1) clearInterval(timer);
        }, 30);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <section id="gtn" ref={ref} className={`${classes.band} ${classes.bgPaper} ${classes.gtn}`}>
      <img src={pDotsDark} alt="" className={classes.gtnDots} />
      <div className={`xl-container ${classes.gtnGrid}`}>
        <div data-reveal className={classes.gtnCopy}>
          <div className={classes.eyebrow}>GTN Performance Calculator</div>
          <h2 className={classes.h2}>
            See How Your Brand’s <span className={classes.green}>Gross‑To‑Net Could Grow</span>
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
                <div className={classes.gtnStatValue}>
                  <VisuallyHidden>{g.value.toFixed(1)}×</VisuallyHidden>
                  <span aria-hidden="true" data-llms-skip="true">
                    {(g.value * progress).toFixed(1)}×
                  </span>
                </div>
                <div className={classes.gtnStatLabel}>{g.label}</div>
                <div className={classes.gtnStatSub}>vs. baseline</div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal style={delay(150)} className={classes.gtnFormCard}>
          <div className={classes.gtnFormEyebrow}>Run Your Numbers</div>
          <h3 className={classes.gtnFormTitle}>Your brand's commercial potential, modeled in a minute.</h3>
          <p className={classes.gtnFormLead}>Gain a clear view of what's possible for your portfolio.</p>
          <HubSpotFormV2
            portalId={HUBSPOT_PORTAL_ID}
            formId={GTN_FORM_ID}
            classname={classes.gtnForm}
            disableHubspotCss
            formMinHeight="120px"
          />
          <p className={classes.gtnFormNote}>
            By submitting, you agree to PHIL's <a href="/privacy/">privacy policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

// ─── Marquee ──────────────────────────────────────────────────────────────────

const Marquee = () => (
  <section className={classes.marquee} aria-label="Outcomes PHIL improves">
    <div className={classes.marqueeTrack}>
      {MARQUEE_WORDS.concat(MARQUEE_WORDS).map((w, i) => (
        <div key={i} className={classes.marqueeItem} aria-hidden={i >= MARQUEE_WORDS.length || undefined}>
          {w}
          <span />
        </div>
      ))}
    </div>
  </section>
);

// ─── Intro + outcomes ─────────────────────────────────────────────────────────

const OutcomesSection = () => (
  <>
    <section className={classes.intro}>
      <div className={`xl-container ${classes.introGrid}`}>
        <div data-reveal>
          <div className={classes.eyebrow}>Maximize Value for Your Brand</div>
          <h2 className={classes.h2Lg}>Traditional access solutions address only part of the problem.</h2>
        </div>
        <p data-reveal style={delay(150)} className={classes.introLead}>
          Overcome access, affordability, and adherence challenges. PhilRx offers a digital hub solution that is
          designed to improve access, coverage, and GTN.
        </p>
      </div>
    </section>

    <section className={classes.outcomes}>
      <div className="xl-container">
        <div data-reveal className={classes.outcomesCard}>
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
                  <div className={classes.outcomeArrow} aria-hidden="true">
                    ↑
                  </div>
                </div>
                <div className={classes.outcomeBars} aria-hidden="true">
                  <div className={classes.track}>
                    <div className={classes.barPhil} style={{ width: `${o.phil}%`, animationDelay: `${200 + i * 150}ms` }} />
                  </div>
                  <div className={classes.track}>
                    <div className={classes.barTrad} style={{ width: `${o.trad}%`, animationDelay: `${200 + i * 150}ms` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

// ─── Digital hub orbit ────────────────────────────────────────────────────────

const HubSection = () => (
  <section className={`${classes.band} ${classes.hub}`}>
    <div className={`xl-container ${classes.hubGrid}`}>
      <div data-reveal>
        <div className={classes.eyebrow}>The Digital Hub</div>
        <h2 className={classes.h2Lg}>Everyone in the prescription journey, connected.</h2>
        <p className={classes.introLead}>
          PHIL combines a technology-driven hub, integrated dispense network, and end-to-end data capabilities into one
          powerful platform, helping pharma brands maximize patient outcomes and commercial performance.
        </p>
      </div>
      <div data-reveal style={delay(150)} className={classes.orbit}>
        <svg viewBox="0 0 560 560" className={classes.orbitRings} aria-hidden="true">
          <circle cx="280" cy="280" r="207" className={classes.ringDash} />
          <circle cx="280" cy="280" r="135" className={classes.ringInner} />
          <circle cx="280" cy="280" r="262" className={classes.ringOuter} />
        </svg>
        <ul className={classes.orbitSpin}>
          {HUB_NODES.map((n, i) => (
            <li key={n.label} className={classes.orbitArm} style={{ "--a": `${i * 60}deg` } as React.CSSProperties}>
              <div className={classes.orbitCounter}>
                <div className={classes.orbitNode}>
                  <div className={classes.orbitIcon}>{HUB_ICONS[n.icon] && <img src={HUB_ICONS[n.icon]} alt="" />}</div>
                  <div className={classes.orbitLabel}>{n.label}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={classes.orbitCenter}>
          <img src={hubCenterLogo} alt="PHIL" />
        </div>
      </div>
    </div>
  </section>
);

// ─── Why partner ──────────────────────────────────────────────────────────────

const WhySection = () => {
  const [chip] = useTicker(JOURNEY_CHIPS.length, 1600);

  return (
    <section id="platform" className={`${classes.band} ${classes.bgPaper}`}>
      <div className="xl-container">
        <div data-reveal className={classes.whyHead}>
          <div className={classes.eyebrow}>Why Partner with Phil</div>
          <h2 className={classes.h2}>One platform. Every step of the prescription journey.</h2>
        </div>
        <div className={classes.whyGrid}>
          <div data-reveal className={`${classes.whyCard} ${classes.whyGradient}`}>
            <img src={pDotsLight} alt="" className={classes.whyDots} />
            <div className={classes.whyIcon}>
              <img src={iconPatientJourney} alt="" />
            </div>
            <div className={classes.whyText}>
              <h3>Modernize the Patient Access Journey</h3>
              <p>
                Our platform allows brands to integrate an e-commerce-like journey for patients resulting in better
                access and adherence.
              </p>
            </div>
            <div className={classes.chips}>
              {JOURNEY_CHIPS.map((t, i) => (
                <span key={t} className={classes.chip} data-on={i <= chip || undefined}>
                  <span />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div data-reveal style={delay(120)} className={`${classes.whyCard} ${classes.whyWhite}`}>
            <div className={`${classes.whyIcon} ${classes.whyIconSlime}`}>
              <img src={iconCoverage} alt="" />
            </div>
            <div className={classes.whyText}>
              <h3>Maximize Dispenses Covered by Payers</h3>
              <p>
                We’ve built unique capabilities to ensure brands can capitalize on formulary placements to improve GTN.
              </p>
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

          <div data-reveal style={delay(240)} className={`${classes.whyCard} ${classes.whyForest}`}>
            <div className={classes.whyText}>
              <h3>Enhance Insight into the Drug Channel</h3>
              <p>
                Our platform generates comprehensive data that we translate into actionable insights to inform brand
                strategy.
              </p>
            </div>
            <div className={classes.bars} aria-hidden="true">
              {INSIGHT_BARS.map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 80}ms`,
                    background: i === INSIGHT_BARS.length - 1 ? "#fff" : "#5ABEA4",
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

// ─── Access paths ─────────────────────────────────────────────────────────────

const PathsSection = () => (
  <section id="paths" className={classes.band}>
    <div className={`xl-container ${classes.pathsGrid}`}>
      <div data-reveal>
        <div className={classes.eyebrow}>Flexible Program Design</div>
        <h2 className={classes.h2}>Build patient access paths based on patient and brand needs.</h2>
        <p className={classes.lead}>
          Every prescription is routed to the path that fits the patient’s coverage, so more patients start and stay on
          therapy.
        </p>
      </div>
      <div data-reveal style={delay(150)}>
        <div className={classes.treeRoot}>
          <div className={classes.treePill}>
            <span className={classes.pulseDot} />
            New Prescription
          </div>
        </div>
        <div className={classes.treeLines} aria-hidden="true" />
        <div className={classes.pathCols}>
          {ACCESS_PATHS.map((p, i) => (
            <div key={p.name} className={classes.pathCol}>
              <div className={classes.pathName} style={{ background: p.color }}>
                {p.name}
              </div>
              {p.items.map((it, k) => (
                <div key={it.name} className={classes.pathItem} style={{ animationDelay: `${200 + i * 120 + k * 100}ms` }}>
                  <span
                    className={classes.pathIcon}
                    style={it.icon ? { backgroundImage: `url(${PATH_ICONS[it.icon]})` } : undefined}
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

// ─── How it works ─────────────────────────────────────────────────────────────

const JourneySection = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const l = lineRef.current;
      if (!l) return;
      const r = l.getBoundingClientRect();
      setFill(Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (window.innerHeight * 0.6))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="journey" className={`${classes.band} ${classes.journey}`}>
      <img src={circlesPrimary} alt="" className={classes.journeyCircles} />
      <div className={`xl-container ${classes.journeyInner}`}>
        <div data-reveal className={`${classes.eyebrow} ${classes.eyebrowLight}`}>
          How It Works
        </div>
        <h2 data-reveal className={`${classes.h2Lg} ${classes.journeyTitle}`}>
          With PHIL, every step of the prescription journey is supported.
        </h2>
        <div ref={lineRef} className={classes.jline} aria-hidden="true">
          <div className={classes.jfill} style={{ width: `${fill * 100}%` }} />
        </div>
        <div className={classes.steps}>
          {JOURNEY_STEPS.map((s, i) => (
            <div key={s.n} data-reveal style={delay(i * 120)} className={classes.step}>
              <span className={classes.stepDot} />
              <div className={classes.stepNum}>{s.n}</div>
              <h3 className={classes.stepTitle}>{s.title}</h3>
              <p className={classes.stepBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Partner types ────────────────────────────────────────────────────────────

const PartnersSection = () => (
  <section id="partners" className={`${classes.band} ${classes.partners}`}>
    <div className="xl-container">
      <div data-reveal className={classes.eyebrow}>
        Partners We Work With
      </div>
      <h2 data-reveal className={`${classes.h2Lg} ${classes.partnersTitle}`}>
        Our solution can enhance your strategic objectives and offerings
      </h2>
      <div className={classes.partnerGrid}>
        <div data-reveal className={`${classes.partnerCard} ${classes.partnerSlime}`}>
          <img src={iconPartner} alt="" className={classes.partnerIcon} />
          <h3>Expert Alliance Partners</h3>
          <p>
            Life sciences consultants, marketing agencies, and full-service commercial organizations that offer support
            and advisory services to biopharma manufacturers.
          </p>
        </div>
        <div data-reveal style={delay(150)} className={`${classes.partnerCard} ${classes.partnerDark}`}>
          <img src={dotsAccent} alt="" className={classes.partnerDots} />
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

// ─── GTN banner ───────────────────────────────────────────────────────────────

const GtnBanner = () => (
  <section className={classes.gtnBannerBand}>
    <div className="xl-container">
      <div data-reveal className={classes.gtnBanner}>
        <img src={circlesPrimary} alt="" className={classes.gtnBannerCircles} />
        <div>
          <div className={classes.gtnBannerEyebrow}>GTN Calculator</div>
          <h2 className={classes.gtnBannerTitle}>Want to forecast your brand's GTN potential with PHIL?</h2>
          <p>
            The calculator was built by PHIL's Commercial Insights architects to translate our sophisticated GTN
            modeling to provide a clear view into a brand's GTN potential.
          </p>
        </div>
        <div>
          <a href="/gtn/" className={`${classes.btn} ${classes.btnWhite}`}>
            Calculate Your Potential
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TestimonialsSection = () => {
  const [q, setQ] = useTicker(QUOTES.length, 6500);
  const quote = QUOTES[q];

  return (
    <section className={`${classes.band} ${classes.bgPaper}`}>
      <div className={`xl-container ${classes.quotes}`}>
        <div className={classes.eyebrow}>What Partners and Patients Say</div>
        <div className={classes.quoteStage} aria-live="polite">
          <div key={q} className={classes.quote}>
            <blockquote>“{quote.text}”</blockquote>
            <div className={classes.quoteWho}>{quote.who}</div>
            {quote.role && <div className={classes.quoteRole}>{quote.role}</div>}
          </div>
        </div>
        <div className={classes.quoteDots}>
          {QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === q || undefined}
              onClick={() => setQ(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Resources ────────────────────────────────────────────────────────────────

const ResourcesSection = () => (
  <section id="resources" className={classes.band}>
    <div className="xl-container">
      <div className={classes.resHead}>
        <h2 data-reveal className={classes.h2Lg}>
          Resources from Phil
        </h2>
        <a href="/resources/" className={classes.resAll}>
          View all resources →
        </a>
      </div>
      <div className={classes.resGrid}>
        {RESOURCES.map((r, i) => (
          <a key={r.href} href={r.href} data-reveal style={delay(i * 120)} className={classes.resCard}>
            <div className={classes.resTop} style={{ background: r.bg }}>
              {r.motif && (
                <div className={classes.resMotif} style={{ backgroundImage: `url(${RESOURCE_MOTIFS[r.motif]})` }} />
              )}
              <div className={classes.resChip}>{r.chip}</div>
              <div className={classes.resBig} style={{ fontSize: r.bigSize }}>
                {r.big}
                <div className={classes.resBigSub}>{r.bigSub}</div>
              </div>
            </div>
            <div className={classes.resBody}>
              <div className={classes.resType}>{r.type}</div>
              <h3 className={classes.resTitle}>{r.title}</h3>
              <p className={classes.resDesc}>{r.desc}</p>
              <div className={classes.resCta}>{r.cta} →</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ─── Closing CTA ──────────────────────────────────────────────────────────────

const CtaSection = () => (
  <section className={`${classes.band} ${classes.cta}`}>
    <img src={circlesPrimary} alt="" className={classes.ctaCircles} />
    <div className={`xl-container ${classes.ctaInner}`}>
      <h2 data-reveal className={classes.ctaTitle}>
        Interested in Partnering?
      </h2>
      <p data-reveal style={delay(100)} className={classes.ctaLead}>
        Get in touch with our team to learn how we can work together to help life sciences manufacturers achieve their
        full access potential.
      </p>
      <div data-reveal style={delay(200)} className={classes.ctaBtns}>
        <a href="/demo/" className={`${classes.btn} ${classes.btnWhite}`}>
          Book Demo
        </a>
        <a href="/contact/" className={`${classes.btn} ${classes.btnOutlineWhite}`}>
          Get in Touch
        </a>
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const PartnersPage = () => {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <PageContext.Provider value={{ title: "Partners" }}>
      <Layout>
        <div ref={root} className={classes.page}>
          <HeroSection />
          <GtnSection />
          <Marquee />
          <OutcomesSection />
          <HubSection />
          <WhySection />
          <PathsSection />
          <JourneySection />
          <PartnersSection />
          <GtnBanner />
          <TestimonialsSection />
          <ResourcesSection />
          <CtaSection />
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default PartnersPage;

const PARTNERS_TITLE = "Pharma Partners — Accelerate Brand Success with PhilRx";
const PARTNERS_DESC =
  "Partner with PhilRx, the digital hub trusted by leading brands. Improve patient access, payer coverage and GTN, and turn channel data into brand insight.";
const PARTNERS_PATH = "/partners/";
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
