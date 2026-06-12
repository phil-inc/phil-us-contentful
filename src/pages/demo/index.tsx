import React, { useEffect, useRef, useState } from "react";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import { getOgImage } from "utils/getOgImage";
import HubspotForm from "components/common/HubspotForm/HubspotForm";

import * as classes from "./demo.module.css";
import {
  DEMO_TITLE,
  DEMO_DESC,
  DEMO_URL,
  DEMO_HERO,
  DEMO_BULLETS,
  DEMO_STATS_EYEBROW,
  DEMO_STATS,
  DEMO_FORM,
} from "./_data";

// ─── Hooks ───────────────────────────────────────────────────────────────────

/** Reveals once when the element scrolls into view (with a safety fallback). */
function useInView(): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setInView(true);
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    // Fallback: reveal anyway if the observer never fires (e.g. backgrounded tab).
    const t = window.setTimeout(() => {
      reveal();
      io.disconnect();
    }, 700);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return [ref, inView];
}

/** Eased count-up from 0 to `end`, firing when `active` becomes true. */
function useCountUp(end: number, active: boolean, duration = 1400): number {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.hidden) {
      setVal(end);
      return;
    }
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);

  return val;
}

// ─── Small presentational pieces ─────────────────────────────────────────────

const IconCheck: React.FC<{ size?: number; color?: string; sw?: number }> = ({
  size = 14,
  color = "#fff",
  sw = 3.2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const AnimatedStat: React.FC<{
  value: number;
  suffix: string;
  label: string;
  sub: string;
  active: boolean;
}> = ({ value, suffix, label, sub, active }) => {
  const n = useCountUp(value, active);
  return (
    <div>
      <div className={classes.statNum}>
        {Math.round(n)}
        <span className={classes.statSuffix}>{suffix}</span>
      </div>
      <div className={classes.statLabel}>{label}</div>
      <div className={classes.statSub}>{sub}</div>
    </div>
  );
};

const TrustpilotStar: React.FC = () => (
  <span className={classes.tpStar}>
    <svg width={13} height={13} viewBox="0 0 24 24" fill="#fff">
      <path d="M12 2l2.95 6.18 6.8.78-5.02 4.6 1.36 6.7L12 17.6 5.91 20.3l1.36-6.7L2.25 8.96l6.8-.78z" />
    </svg>
  </span>
);

const TrustpilotStat: React.FC<{ active: boolean }> = ({ active }) => {
  const n = useCountUp(4.8, active);
  return (
    <div>
      <div className={classes.statNum}>
        {n.toFixed(1)}
        <span className={classes.statSuffix}>/5.0</span>
      </div>
      <div className={classes.statLabel}>Patient Satisfaction Score</div>
      <div className={classes.tpRow}>
        <span className={classes.tpExcellent}>Excellent</span>
        <span className={classes.tpStars}>
          {[0, 1, 2, 3, 4].map((i) => (
            <TrustpilotStar key={i} />
          ))}
        </span>
      </div>
    </div>
  );
};

// ─── Page ────────────────────────────────────────────────────────────────────

const DemoPage: React.FC = () => {
  const [statRef, statIn] = useInView();

  // Full-screen landing page: hide the shared navbar + promo banner so the hero
  // owns the entire viewport (see `canHideHeader` below and `height: 100vh` in
  // demo.module.css).
  return (
    <PageContext.Provider value={{ slug: "demo" }}>
      <Layout canHideHeader>
        <section className={classes.hero}>
          <div className={classes.depthA} />
          <div className={classes.depthB} />
          <img
            className={classes.deco}
            src="/images/demo-sidebar-circles.png"
            alt=""
            aria-hidden="true"
          />
          <div className={`${classes.orb} ${classes.orbA}`} />
          <div className={`${classes.orb} ${classes.orbB}`} />

          <div className={classes.stage}>
            <div className={`xl-container ${classes.grid}`}>
              {/* HEAD */}
              <div className={classes.head}>
                <img
                  className={classes.heroLogo}
                  src="/images/demo-phil-logo-white.png"
                  alt="PHIL"
                />
                <h1 className={classes.h1}>
                  {DEMO_HERO.headingLead}{" "}
                  <span className={classes.accent}>{DEMO_HERO.headingAccent}</span>
                </h1>
                <p className={classes.sub}>{DEMO_HERO.sub}</p>
              </div>

              {/* FORM */}
              <div className={classes.formCol}>
                <div className={classes.card}>
                  <h2 className={classes.cardHeading}>{DEMO_FORM.heading}</h2>
                  <p className={classes.cardSub}>{DEMO_FORM.sub}</p>
                  <HubspotForm
                    portalId={DEMO_FORM.portalId}
                    formId={DEMO_FORM.formId}
                    classname={classes.hsForm}
                  />
                </div>
              </div>

              {/* BULLETS */}
              <div className={classes.bullets}>
                {DEMO_BULLETS.map((b, i) => (
                  <div className={classes.bullet} key={i}>
                    <span
                      className={classes.checkCircle}
                      style={{ animationDelay: `${0.3 + i * 0.18}s` }}
                    >
                      <IconCheck />
                    </span>
                    <span className={classes.bulletText}>
                      <strong>{b.lead}</strong>
                      <span className={classes.bulletSub}>{b.rest}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* METRICS BAND */}
              <div ref={statRef} className={classes.metricsBand}>
                <div className={classes.eyebrow}>{DEMO_STATS_EYEBROW}</div>
                <div className={classes.stats}>
                  {DEMO_STATS.map((s, i) => (
                    <div className={classes.stat} key={i}>
                      <AnimatedStat {...s} active={statIn} />
                    </div>
                  ))}
                  <div className={classes.stat}>
                    <TrustpilotStat active={statIn} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </PageContext.Provider>
  );
};

export default DemoPage;

// ─── SEO ─────────────────────────────────────────────────────────────────────

const DEMO_OG_IMAGE = getOgImage(null);
const DEMO_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": DEMO_URL,
  url: DEMO_URL,
  name: DEMO_TITLE,
  description: DEMO_DESC,
  image: DEMO_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

export const Head: HeadFC = () => (
  <>
    <title>{DEMO_TITLE}</title>
    <meta name="description" content={DEMO_DESC} />
    <link rel="canonical" href={DEMO_URL} />
    <meta property="og:title" content={DEMO_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={DEMO_DESC} />
    <meta property="og:image" content={DEMO_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={DEMO_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={DEMO_TITLE} />
    <meta name="twitter:description" content={DEMO_DESC} />
    <meta name="twitter:image" content={DEMO_OG_IMAGE} />
    <script type="application/ld+json">{DEMO_SCHEMA}</script>
  </>
);
