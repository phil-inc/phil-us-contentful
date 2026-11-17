import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { getOgImage } from "utils/getOgImage";
import { webPageSchema } from "utils/seo/schema";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import {
  DEMO_URL,
  GTN_URL,
  TRUSTPILOT_REVIEW_URL,
  HERO,
  INTRO,
  VALUE_CARDS,
  PARTNER_CARDS,
  PATIENT_QUOTES,
  RESOURCE_CARDS,
  CLOSING_CTA,
} from "./_data";
import * as classes from "./partners.module.css";

import heroGraphic from "./assets/hero-graphic.png";

// Stagger delays (ms) used by the design's scroll reveal, per card position.
const REVEAL_DELAYS = [0, 120, 240];

/**
 * Fades `[data-reveal]` elements in as they scroll into view, each after its
 * own `data-reveal` delay in ms. Mirrors the design's reveal script.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window === "undefined") return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(classes.revealed);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => {
      el.style.transitionDelay = `${el.dataset.reveal ?? 0}ms`;
      el.classList.add(classes.reveal);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

const PartnersPage: React.FC = () => {
  const rootRef = useReveal<HTMLDivElement>();

  return (
    <PageContext.Provider value={{ title: "Partners" }}>
      <Layout>
        <div ref={rootRef} className={classes.page}>
          {/* ── Hero ── */}
          <section className={classes.hero}>
            <img src={heroGraphic} alt="" className={classes.heroGraphic} />
            <div className="xl-container">
              <div className={classes.heroInner}>
                <div className={classes.heroEyebrow}>{HERO.eyebrow}</div>
                <h1 className={classes.heroTitle}>{HERO.title}</h1>
                <p className={classes.heroLead}>{HERO.lead}</p>
                <div className={classes.heroActions}>
                  <Link to={DEMO_URL} className={`${classes.btn} ${classes.btnWhite}`}>
                    Book Demo
                  </Link>
                  <Link to={GTN_URL} className={`${classes.btn} ${classes.btnOutlineWhite}`}>
                    Calculate GTN Potential
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── Intro ── */}
          <section className={classes.band}>
            <div className={`xl-container ${classes.twoCol}`}>
              <h2 data-reveal="0" className={classes.h2}>
                {INTRO.title}
              </h2>
              <p className={classes.introBody}>{INTRO.body}</p>
            </div>
          </section>

          {/* ── Why Partner ── */}
          <section id="value" className={`${classes.band} ${classes.bandMuted}`}>
            <div className="xl-container">
              <h2 data-reveal="0" className={`${classes.h2} ${classes.headSpaced}`}>
                Why Partner with Phil
              </h2>
              <div className={classes.grid280}>
                {VALUE_CARDS.map((card, i) => (
                  <div
                    key={card.title}
                    data-reveal={REVEAL_DELAYS[i]}
                    className={`${classes.card} ${classes.valueCard}`}
                  >
                    <img src={card.icon} alt="" className={classes.valueIcon} />
                    <h3 className={classes.h3}>{card.title}</h3>
                    <p className={classes.cardBody}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Partners We Work With ── */}
          <section id="partners" className={classes.band}>
            <div className="xl-container">
              <h2 data-reveal="0" className={`${classes.h2} ${classes.headTight}`}>
                Partners We Work With
              </h2>
              <p className={classes.subhead}>
                Our solution can enhance your strategic objectives and offerings
              </p>
              <div className={classes.grid300}>
                {PARTNER_CARDS.map((card) => (
                  <div
                    key={card.title}
                    data-reveal={card.dark ? 0 : 150}
                    className={`${classes.partnerCard} ${
                      card.dark ? classes.partnerCardDark : classes.partnerCardLight
                    }`}
                  >
                    <h3 className={classes.partnerTitle}>{card.title}</h3>
                    <p className={classes.partnerBody}>{card.body}</p>
                  </div>
                ))}
              </div>
              <Link to={DEMO_URL} className={`${classes.btn} ${classes.btnBlack} ${classes.afterGrid}`}>
                Get in Touch
              </Link>
            </div>
          </section>

          {/* ── What Our Patients Say ── */}
          <section className={`${classes.band} ${classes.bandMuted}`}>
            <div className="xl-container">
              <h2 data-reveal="0" className={`${classes.h2} ${classes.headSpaced}`}>
                What Our Patients Say
              </h2>
              <div className={classes.grid300}>
                {PATIENT_QUOTES.map((quote, i) => (
                  <figure
                    key={quote.a}
                    data-reveal={REVEAL_DELAYS[i]}
                    className={`${classes.card} ${classes.quoteCard}`}
                  >
                    <blockquote className={classes.quote}>“{quote.q}”</blockquote>
                    <figcaption className={classes.quoteAuthor}>{quote.a}</figcaption>
                  </figure>
                ))}
              </div>
              <a
                href={TRUSTPILOT_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.textLink}
              >
                Read reviews on Trustpilot →
              </a>
            </div>
          </section>

          {/* ── Resources ── */}
          <section id="resources" className={classes.band}>
            <div className="xl-container">
              <h2 data-reveal="0" className={`${classes.h2} ${classes.headSpaced}`}>
                Resources from Phil
              </h2>
              <div className={classes.grid300}>
                {RESOURCE_CARDS.map((card, i) => (
                  <div
                    key={card.href}
                    data-reveal={REVEAL_DELAYS[i]}
                    className={`${classes.card} ${classes.resourceCard}`}
                  >
                    <div className={classes.resourceTag}>{card.tag}</div>
                    <h3 className={`${classes.h3} ${classes.resourceTitle}`}>{card.title}</h3>
                    <p className={classes.resourceBody}>{card.body}</p>
                    <Link to={card.href} className={classes.resourceLink}>
                      {card.linkLabel} →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Closing CTA ── */}
          <section className={`${classes.band} ${classes.closing}`}>
            <div className={`xl-container ${classes.closingInner}`}>
              <div>
                <h2 data-reveal="0" className={`${classes.h2} ${classes.closingTitle}`}>
                  {CLOSING_CTA.title}
                </h2>
                <p className={classes.closingBody}>{CLOSING_CTA.body}</p>
              </div>
              <div>
                <Link to={DEMO_URL} className={`${classes.btn} ${classes.btnWhite}`}>
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

export default PartnersPage;

const PARTNERS_TITLE = "Partner with PHIL — Digital Hub for Life Sciences Brands";
const PARTNERS_DESC =
  "Partner with PHIL to improve patient access, payer coverage, and GTN for your brand with a digital hub trusted by industry-leading life sciences manufacturers.";
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
    <SeoMeta
      title={PARTNERS_TITLE}
      description={PARTNERS_DESC}
      path={PARTNERS_PATH}
      image={PARTNERS_OG_IMAGE}
    />
    <JsonLd data={PARTNERS_SCHEMA} />
  </>
);
