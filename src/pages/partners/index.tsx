import React, { useEffect, useRef } from "react";
import type { HeadFC } from "gatsby";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { getOgImage } from "utils/getOgImage";
import { webPageSchema } from "utils/seo/schema";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import { PATIENT_QUOTES } from "../pharma/_data";
import {
  PARTNERS_TITLE,
  PARTNERS_DESC,
  PARTNERS_PATH,
  VALUE_CARDS,
  PARTNER_TYPES,
  RESOURCES,
} from "./_data";
import * as classes from "./partners.module.css";
import heroGraphic from "./assets/hero-graphic.png";
import iconJourney from "./assets/icon-journey.png";
import iconCoverage from "./assets/icon-coverage.png";
import iconInsight from "./assets/icon-insight.png";

const REVEAL_DELAYS = [0, 120, 240];
const VALUE_ICONS = [iconJourney, iconCoverage, iconInsight];

// Fades [data-reveal] elements up as they scroll into view (design's reveal script).
const useReveal = (root: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    el.classList.add(classes.revealReady);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classes.revealed);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    el.querySelectorAll("[data-reveal]").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [root]);
};

const revealProps = (i: number) => ({
  "data-reveal": "",
  style: { transitionDelay: `${REVEAL_DELAYS[i % REVEAL_DELAYS.length]}ms` },
});

const PartnersPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <PageContext.Provider value={{ title: "Partners" }}>
      <Layout>
        <div ref={rootRef} className={classes.page}>
          <section className={classes.hero}>
            <img src={heroGraphic} alt="" className={classes.heroGraphic} />
            <div className={`xl-container ${classes.heroInner}`}>
              <div className={classes.heroCopy}>
                <div className={classes.eyebrow}>For Life Sciences Manufacturers</div>
                <h1 className={classes.h1}>Accelerate Brand Success with PhilRx</h1>
                <p className={classes.heroLead}>
                  Drive growth for your brand with a digital hub partner trusted by industry-leading brands.
                </p>
                <div className={classes.ctaRow}>
                  <a href="/demo/" className={`${classes.btn} ${classes.btnWhite}`}>
                    Book Demo
                  </a>
                  <a href="/gtn/" className={`${classes.btn} ${classes.btnOutlineWhite}`}>
                    Calculate GTN Potential
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className={classes.band}>
            <div className={`xl-container ${classes.intro}`}>
              <h2 className={classes.h2} {...revealProps(0)}>
                Maximize Value for Your Brand
              </h2>
              <p className={classes.introText}>
                Overcome access, affordability, and adherence challenges. PhilRx offers a digital hub solution
                that is designed to improve access, coverage, and GTN.
              </p>
            </div>
          </section>

          <section id="value" className={`${classes.band} ${classes.bandMuted}`}>
            <div className="xl-container">
              <h2 className={`${classes.h2} ${classes.sectionTitle}`} {...revealProps(0)}>
                Why Partner with Phil
              </h2>
              <div className={classes.grid}>
                {VALUE_CARDS.map((card, i) => (
                  <div key={card.title} className={`${classes.card} ${classes.cardWhite}`} {...revealProps(i)}>
                    <img src={VALUE_ICONS[i]} alt="" className={classes.cardIcon} />
                    <h3 className={classes.h3}>{card.title}</h3>
                    <p className={classes.cardText}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="partners" className={classes.band}>
            <div className="xl-container">
              <h2 className={`${classes.h2} ${classes.partnersTitle}`} {...revealProps(0)}>
                Partners We Work With
              </h2>
              <p className={classes.sectionLead}>Our solution can enhance your strategic objectives and offerings</p>
              <div className={classes.grid}>
                {PARTNER_TYPES.map((partner, i) => (
                  <div
                    key={partner.title}
                    className={`${classes.card} ${classes.partnerCard} ${
                      partner.variant === "dark" ? classes.partnerDark : classes.partnerLight
                    }`}
                    {...revealProps(i)}
                  >
                    <h3 className={classes.partnerTitle}>{partner.title}</h3>
                    <p className={classes.partnerText}>{partner.body}</p>
                  </div>
                ))}
              </div>
              <a href="/demo/" className={`${classes.btn} ${classes.btnBlack} ${classes.afterGrid}`}>
                Get in Touch
              </a>
            </div>
          </section>

          <section className={`${classes.band} ${classes.bandMuted}`}>
            <div className="xl-container">
              <h2 className={`${classes.h2} ${classes.sectionTitle}`} {...revealProps(0)}>
                What Our Patients Say
              </h2>
              <div className={classes.grid}>
                {PATIENT_QUOTES.map((quote, i) => {
                  const [name, role] = quote.a.split(", ");
                  return (
                    <figure key={quote.a} className={`${classes.card} ${classes.quoteCard}`} {...revealProps(i)}>
                      <blockquote className={classes.quote}>“{quote.q}”</blockquote>
                      <figcaption className={classes.quoteName}>
                        {name}
                        <div className={classes.quoteRole}>{role}</div>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
              <a
                href="https://www.trustpilot.com/review/phil.us"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.textLink}
              >
                Read reviews on Trustpilot →
              </a>
            </div>
          </section>

          <section id="resources" className={classes.band}>
            <div className="xl-container">
              <h2 className={`${classes.h2} ${classes.sectionTitle}`} {...revealProps(0)}>
                Resources from Phil
              </h2>
              <div className={classes.grid}>
                {RESOURCES.map((resource, i) => (
                  <div key={resource.title} className={classes.card} {...revealProps(i)}>
                    <div className={classes.resourceTag}>{resource.tag}</div>
                    <h3 className={classes.h3}>{resource.title}</h3>
                    <p className={classes.resourceText}>{resource.body}</p>
                    <a href={resource.href} className={classes.resourceLink}>
                      {resource.cta} →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`${classes.band} ${classes.finalCta}`}>
            <div className={`xl-container ${classes.finalInner}`}>
              <div>
                <h2 className={`${classes.h2} ${classes.finalTitle}`} {...revealProps(0)}>
                  Interested in Partnering?
                </h2>
                <p className={classes.finalText}>
                  Get in touch with our team to learn how we can work together to help life sciences
                  manufacturers achieve their full access potential.
                </p>
              </div>
              <div>
                <a href="/demo/" className={`${classes.btn} ${classes.btnWhite}`}>
                  Book Demo
                </a>
              </div>
            </div>
          </section>
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
    <SeoMeta
      title={PARTNERS_TITLE}
      description={PARTNERS_DESC}
      path={PARTNERS_PATH}
      image={PARTNERS_OG_IMAGE}
    />
    <JsonLd data={PARTNERS_SCHEMA} />
  </>
);
