import React, { useEffect, useRef, useState } from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { getOgImage } from "utils/getOgImage";
import { articleSchema, webPageSchema, type JsonLd as JsonLdNode } from "utils/seo/schema";
import { ORGANIZATION_ID } from "utils/seo/constants";
import { toAbsoluteUrl } from "utils/seo/url";
import pDotsLight from "assets/images/p-dots-light.png";

import {
  CTA,
  FAQ_HEADING,
  FAQS,
  FINDINGS,
  FINDINGS_LABEL,
  HERO,
  OVERVIEW,
  PAGE_PATH,
  PUBLISHED_AT,
  SEO,
  STATS,
  type Faq,
} from "./_data";
import { StatsCard } from "./_sections/StatsCard";
import { KeyFindings } from "./_sections/KeyFindings";
import { Perspective } from "./_sections/Perspective";
import { ReportForm } from "./_sections/ReportForm";
import * as classes from "./pharmaDtpResearch.module.css";

const GLOW_MS = 2000;
const FOCUS_DELAY_MS = 450;

const renderAnswer = ({ answer, formLinkText }: Faq) => {
  if (!formLinkText) return answer;
  const [before, after] = answer.split(formLinkText);
  return (
    <>
      {before}
      <a href="#download">{formLinkText}</a>
      {after}
    </>
  );
};

const PharmaDtpResearchPage: React.FC = () => {
  const heroBandRef = useRef<HTMLDivElement>(null);
  const statsCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLElement>(null);
  const [formGlow, setFormGlow] = useState(false);

  // The hero's gradient band ends halfway down the stats card, wherever the card lands.
  useEffect(() => {
    const band = heroBandRef.current;
    const card = statsCardRef.current;
    if (!band || !card) return;
    const sync = () => {
      const top = band.getBoundingClientRect().top;
      const r = card.getBoundingClientRect();
      band.style.height = `${Math.round(r.top - top + r.height * 0.5)}px`;
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(card);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  // Every "#download" link scrolls to the form, makes it glow and focuses its first field.
  useEffect(() => {
    let focusTimer = 0;
    let glowTimer = 0;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href="#download"]');
      const form = formCardRef.current;
      if (!link || !form) return;
      event.preventDefault();

      const headerBottom = Math.max(document.querySelector("header")?.getBoundingClientRect().bottom ?? 0, 0);
      const offset = headerBottom + 24;
      const r = form.getBoundingClientRect();
      if (r.top < offset || r.bottom > window.innerHeight) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: window.scrollY + r.top - offset, behavior: reduceMotion ? "auto" : "smooth" });
      }

      window.clearTimeout(focusTimer);
      window.clearTimeout(glowTimer);
      setFormGlow(true);
      focusTimer = window.setTimeout(() => {
        form
          .querySelector<HTMLInputElement>("input:not([type=hidden]):not([type=submit])")
          ?.focus({ preventScroll: true });
      }, FOCUS_DELAY_MS);
      glowTimer = window.setTimeout(() => setFormGlow(false), GLOW_MS);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(focusTimer);
      window.clearTimeout(glowTimer);
    };
  }, []);

  return (
    <PageContext.Provider value={{ title: "Pharma DTP Research" }}>
      <Layout>
        <div className={classes.page}>
          <div className={classes.progress} aria-hidden="true" />
          <div className={classes.blooms} aria-hidden="true">
            <span className={`${classes.bloom} ${classes.bloomA}`} />
            <span className={`${classes.bloom} ${classes.bloomB}`} />
            <span className={`${classes.bloom} ${classes.bloomC}`} />
          </div>

          <div className={`${classes.content} ${classes.hero}`}>
            <div ref={heroBandRef} className={classes.heroBand} aria-hidden="true">
              <span className={classes.heroGlowA} />
              <span className={classes.heroGlowB} />
            </div>

            <div className={`xl-container ${classes.inner}`}>
              <div className={classes.columns}>
                <div className={classes.main}>
                  <header className={classes.header}>
                    <p className={classes.eyebrowPill}>{HERO.eyebrow}</p>
                    <h1 className={classes.title}>
                      <span className={classes.titleLead}>
                        {HERO.titleLead} <em className={classes.titleAccent}>{HERO.titleAccent}</em>
                      </span>{" "}
                      <span className={classes.titleSub}>
                        {HERO.subtitle.start}
                        <span className={classes.noWrap}>{HERO.subtitle.noWrap}</span>
                        {HERO.subtitle.end}
                      </span>
                    </h1>
                    <p className={classes.intro}>{HERO.intro}</p>
                    <a href="#download" className={classes.mobileCta}>
                      {HERO.mobileCta}
                    </a>
                  </header>

                  <StatsCard ref={statsCardRef} stats={STATS} />

                  <section id="overview" className={classes.overview}>
                    <h2 className={`${classes.sectionHeading} ${classes.overviewHeading}`}>
                      {OVERVIEW.heading} <em>{OVERVIEW.headingAccent}</em>
                    </h2>
                    <p className={classes.overviewBody}>{OVERVIEW.body}</p>
                  </section>

                  <KeyFindings label={FINDINGS_LABEL} findings={FINDINGS} />

                  <Perspective />

                  <section className={classes.cta}>
                    <div className={classes.ctaCard}>
                      <img src={pDotsLight} alt="" aria-hidden="true" className={classes.ctaDots} />
                      <p className={classes.ctaEyebrow}>{CTA.eyebrow}</p>
                      <h2 className={classes.ctaHeading}>{CTA.heading}</h2>
                      <p className={classes.ctaBody}>{CTA.body}</p>
                      <Link to={CTA.href} className={classes.ctaButton}>
                        {CTA.label}
                      </Link>
                    </div>
                  </section>

                  <section id="faqs" className={classes.faqs}>
                    <h2 className={`${classes.sectionHeading} ${classes.faqHeading}`}>{FAQ_HEADING}</h2>
                    <div className={classes.faqList}>
                      {FAQS.map((faq, i) => (
                        <details key={faq.question} className={classes.faqItem} open={i === 0}>
                          <summary>
                            {faq.question}
                            <span className={classes.faqPlus} aria-hidden="true">
                              +
                            </span>
                          </summary>
                          <p className={classes.faqAnswer}>{renderAnswer(faq)}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                </div>

                <div className={classes.aside}>
                  <ReportForm ref={formCardRef} glow={formGlow} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default PharmaDtpResearchPage;

const PAGE_URL = toAbsoluteUrl(PAGE_PATH);
const OG_IMAGE = getOgImage(null);

// The report itself, for search engines and AI assistants: what it is, who
// published it and when. The publication date lives only here and in the
// article:published_time tag; the page does not show it.
const REPORT_SCHEMA: JsonLdNode = {
  ...articleSchema({
    type: "Report",
    path: PAGE_PATH,
    headline: `${HERO.titleLead} ${HERO.titleAccent} ${HERO.subtitle.start}${HERO.subtitle.noWrap}${HERO.subtitle.end}`,
    description: OVERVIEW.body,
    image: OG_IMAGE,
    datePublished: PUBLISHED_AT,
  }),
  "@id": `${PAGE_URL}#report`,
  name: "The DTP Breakthrough",
  author: { "@id": ORGANIZATION_ID },
  inLanguage: "en-US",
  about: "Direct-to-patient (DTP) programs in the pharmaceutical and biotechnology industry",
  keywords: [
    "direct-to-patient",
    "DTP",
    "pharma",
    "biotech",
    "patient access",
    "life sciences survey",
    "AI in DTP",
  ].join(", "),
  abstract:
    "PHIL's October 2026 survey of 74 U.S. life sciences leaders found that 3 in 4 consider direct-to-patient (DTP) a mission-critical or very important strategic priority, 70% say DTP has already had a transformative or significant impact on patient access, and 89% are using or actively exploring AI in DTP programs.",
};

const PAGE_SCHEMA: JsonLdNode = {
  ...webPageSchema({
    path: PAGE_PATH,
    name: SEO.title,
    description: SEO.description,
    image: OG_IMAGE,
    mainEntity: REPORT_SCHEMA,
  }),
  datePublished: PUBLISHED_AT,
};

export const Head: HeadFC = () => (
  <>
    {/* Temporary: live but unlinked before launch, so search engines must not index it yet.
        Remove noindex in the launch release (Oct 20). */}
    <SeoMeta
      title={SEO.title}
      description={SEO.description}
      path={PAGE_PATH}
      image={OG_IMAGE}
      type="article"
      noindex
    />
    <meta property="article:published_time" content={PUBLISHED_AT} />
    <JsonLd data={[PAGE_SCHEMA, REPORT_SCHEMA]} />
  </>
);
