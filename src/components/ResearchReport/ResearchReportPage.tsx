import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import pDotsLight from "assets/images/p-dots-light.png";

import { StatsCard } from "./StatsCard";
import { KeyFindings } from "./KeyFindings";
import { ReportForm } from "./ReportForm";
import type { CtaCopy, Faq, Finding, FormConfig, HeroCopy, OverviewCopy, ReportTheme, Stat } from "./types";
import * as classes from "./researchReport.module.css";

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

type ResearchReportPageProps = {
  theme: ReportTheme;
  /** Handed to PageContext, which the site header reads. */
  pageTitle: string;
  hero: HeroCopy;
  stats: Stat[];
  overview: OverviewCopy;
  findingsLabel: string;
  findings: Finding[];
  /** The quote section: a QuoteSolo or a QuoteCarousel. */
  perspective: React.ReactNode;
  cta: CtaCopy;
  faqHeading: string;
  faqs: Faq[];
  form: FormConfig;
};

/**
 * A gated research report landing page: hero with a stats card, overview, numbered findings, a quote,
 * a demo call to action, FAQs, and a sticky card with the HubSpot form that releases the PDF.
 * /patient-dtp-research/ and /hcp-dtp-research/ pass their copy and colours; see SPEC.md.
 */
export const ResearchReportPage: React.FC<ResearchReportPageProps> = ({
  theme,
  pageTitle,
  hero,
  stats,
  overview,
  findingsLabel,
  findings,
  perspective,
  cta,
  faqHeading,
  faqs,
  form,
}) => {
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
      const card = formCardRef.current;
      if (!link || !card) return;
      event.preventDefault();

      const headerBottom = Math.max(document.querySelector("header")?.getBoundingClientRect().bottom ?? 0, 0);
      const offset = headerBottom + 24;
      const r = card.getBoundingClientRect();
      if (r.top < offset || r.bottom > window.innerHeight) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: window.scrollY + r.top - offset, behavior: reduceMotion ? "auto" : "smooth" });
      }

      window.clearTimeout(focusTimer);
      window.clearTimeout(glowTimer);
      setFormGlow(true);
      focusTimer = window.setTimeout(() => {
        card
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

  const themeClass = theme === "hcp" ? classes.themeHcp : classes.themePatient;

  return (
    <PageContext.Provider value={{ title: pageTitle }}>
      <Layout>
        <div className={`${classes.page} ${themeClass}`}>
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
                    <p className={classes.eyebrowPill}>{hero.eyebrow}</p>
                    <h1 className={classes.title}>
                      <span className={classes.titleLead}>
                        {hero.titleLead} <em className={classes.titleAccent}>{hero.titleAccent}</em>
                      </span>{" "}
                      <span className={classes.titleSub}>
                        {hero.subtitle.start}
                        {hero.subtitle.noWrap && <span className={classes.noWrap}>{hero.subtitle.noWrap}</span>}
                        {hero.subtitle.end}
                      </span>
                    </h1>
                    <p className={classes.intro}>{hero.intro}</p>
                    <a href="#download" className={classes.mobileCta}>
                      {hero.mobileCta}
                    </a>
                  </header>

                  <StatsCard ref={statsCardRef} stats={stats} />

                  <section id="overview" className={classes.overview}>
                    <h2 className={`${classes.sectionHeading} ${classes.overviewHeading}`}>
                      {overview.heading} <em>{overview.headingAccent}</em>
                    </h2>
                    <p className={classes.overviewBody}>{overview.body}</p>
                  </section>

                  <KeyFindings label={findingsLabel} findings={findings} />

                  {perspective}

                  <section className={classes.cta}>
                    <div className={classes.ctaCard}>
                      <img src={pDotsLight} alt="" aria-hidden="true" className={classes.ctaDots} />
                      <p className={classes.ctaEyebrow}>{cta.eyebrow}</p>
                      <h2 className={classes.ctaHeading}>{cta.heading}</h2>
                      <p className={classes.ctaBody}>{cta.body}</p>
                      <Link to={cta.href} className={classes.ctaButton}>
                        {cta.label}
                      </Link>
                    </div>
                  </section>

                  <section id="faqs" className={classes.faqs}>
                    <h2 className={`${classes.sectionHeading} ${classes.faqHeading}`}>{faqHeading}</h2>
                    <div className={classes.faqList}>
                      {faqs.map((faq, i) => (
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
                  <ReportForm ref={formCardRef} form={form} glow={formGlow} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PageContext.Provider>
  );
};
