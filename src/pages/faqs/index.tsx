import React, { useState, useCallback } from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import {
  FAQ_TITLE,
  FAQ_DESC,
  FAQ_URL,
  PHARMA_CATEGORIES,
  PATIENT_FAQS,
  PROVIDER_CATEGORIES,
  type FaqCategory,
  type FlatFaqItem,
  type QAItem,
} from "./_data";
import * as classes from "./faqs.module.css";

// ─── Accordion helpers ────────────────────────────────────────────────────────

/** Toggle a key in a Set (returns new Set) */
function toggle(set: Set<string>, key: string): Set<string> {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}

// ─── Nested Q&A item ──────────────────────────────────────────────────────────

const QAAccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: QAItem;
  id: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <li className={classes.qaItem}>
    <button
      className={`${classes.qaQ} ${isOpen ? classes.qaQOpen : ""}`}
      aria-expanded={isOpen}
      onClick={onToggle}
    >
      <span>{item.question}</span>
      <span
        className={`${classes.qaChev} ${isOpen ? classes.qaChevOpen : ""}`}
        aria-hidden="true"
      />
    </button>
    <div className={`${classes.qaAWrap} ${isOpen ? classes.qaAWrapOpen : ""}`}>
      <div className={classes.qaAOverflow}>
        <div
          className={`${classes.qaA} ${classes.richText}`}
          dangerouslySetInnerHTML={{ __html: item.answer }}
        />
      </div>
    </div>
  </li>
);

// ─── Outer category accordion ─────────────────────────────────────────────────

const CategoryAccordion = ({
  categories,
  sectionId,
}: {
  categories: FaqCategory[];
  sectionId: string;
}) => {
  const [openCats, setOpenCats] = useState<Set<string>>(new Set());
  const [openQAs, setOpenQAs] = useState<Set<string>>(new Set());

  return (
    <ul className={classes.acc}>
      {categories.map((cat, ci) => {
        const catKey = `${sectionId}-cat-${ci}`;
        const isCatOpen = openCats.has(catKey);

        return (
          <li key={catKey} className={classes.accItem}>
            <button
              className={`${classes.accBtn} ${isCatOpen ? classes.accBtnOpen : ""}`}
              aria-expanded={isCatOpen}
              onClick={() => setOpenCats(toggle(openCats, catKey))}
            >
              <span>{cat.title}</span>
              <span
                className={`${classes.accChev} ${isCatOpen ? classes.accChevOpen : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`${classes.accBodyWrap} ${isCatOpen ? classes.accBodyWrapOpen : ""}`}
            >
              <div className={classes.accBodyOverflow}>
                <div className={classes.accBody}>
                  <ul className={classes.qa}>
                    {cat.items.map((item, qi) => {
                      const qaKey = `${catKey}-qa-${qi}`;
                      return (
                        <QAAccordionItem
                          key={qaKey}
                          item={item}
                          id={qaKey}
                          isOpen={openQAs.has(qaKey)}
                          onToggle={() => setOpenQAs(toggle(openQAs, qaKey))}
                        />
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

// ─── Flat accordion (Patients) ────────────────────────────────────────────────

const FlatAccordion = ({ items }: { items: FlatFaqItem[] }) => {
  const [open, setOpen] = useState<Set<string>>(new Set());

  return (
    <ul className={classes.acc}>
      {items.map((item, i) => {
        const key = `patient-${i}`;
        const isOpen = open.has(key);

        return (
          <li key={key} className={classes.accItem}>
            <button
              className={`${classes.accBtn} ${isOpen ? classes.accBtnOpen : ""}`}
              aria-expanded={isOpen}
              onClick={() => setOpen(toggle(open, key))}
            >
              <span>{item.question}</span>
              <span
                className={`${classes.accChev} ${isOpen ? classes.accChevOpen : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`${classes.accBodyWrap} ${isOpen ? classes.accBodyWrapOpen : ""}`}
            >
              <div className={classes.accBodyOverflow}>
                <div
                  className={`${classes.accBody} ${classes.accBodyFlat} ${classes.richText}`}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const SECTIONS = ["pharma", "patients", "providers"] as const;
type Section = (typeof SECTIONS)[number];

const FaqPage = () => {
  const [activeSection, setActiveSection] = useState<Section>("pharma");

  const handleJump = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, section: Section) => {
      e.preventDefault();
      setActiveSection(section);
      const el = document.getElementById(section);
      if (!el) return;

      // Calculate offset: navbar + info bar (if visible)
      const navbar = document.querySelector<HTMLElement>('.sticky-wrapper, [class*="MegaNav"]');
      const infoBar = document.getElementById("topInfoBar");
      let offset = 90; // fallback --navbar-height
      if (navbar) offset = navbar.offsetHeight;
      if (infoBar && infoBar.offsetHeight > 0) offset += infoBar.offsetHeight;

      const top = el.getBoundingClientRect().top + window.scrollY - offset + 40;
      window.scrollTo({ top, behavior: "smooth" });
    },
    []
  );

  return (
    <PageContext.Provider value={{ title: "FAQ" }}>
      <Layout>
        <div className={classes.pageWrap}>
        <div className={`xl-container`}>
          {/* ─── Hero ─── */}
          <section className={classes.hero}>
            <div className={classes.heroOrbs} aria-hidden="true">
              <span className={`${classes.orb} ${classes.orb1}`} />
              <span className={`${classes.orb} ${classes.orb2}`} />
              <span className={`${classes.orb} ${classes.orb3}`} />
            </div>

            <p className={classes.eyebrow}>
              <span className={classes.eyebrowRule} aria-hidden="true" />
              Need Help?
            </p>

            <h1 className={classes.heroTitle}>
              Frequently Asked Questions about{" "}
              <span className={classes.hl}>
                PHILRx
                <svg
                  className={classes.hlSquiggle}
                  viewBox="0 0 220 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9 C 40 1, 80 13, 120 7 S 200 1, 218 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <nav className={classes.jumps} aria-label="Jump to section">
              {SECTIONS.map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  className={`${classes.jumpsPill} ${activeSection === s ? classes.jumpsPillActive : ""}`}
                  onClick={(e) => handleJump(e, s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </a>
              ))}
            </nav>
          </section>

          {/* ─── Pharma ─── */}
          <section className={classes.section} id="pharma">
            <header className={classes.sectionHead}>
              <h2 className={classes.sectionTitle}>Pharma</h2>
            </header>
            <CategoryAccordion
              categories={PHARMA_CATEGORIES}
              sectionId="pharma"
            />
          </section>

          {/* ─── Patients ─── */}
          <section
            className={`${classes.section} ${classes.sectionPatients}`}
            id="patients"
          >
            <header className={`${classes.sectionHead} ${classes.sectionHeadRow}`}>
              <h2 className={classes.sectionTitle}>Patients</h2>
              <a
                className={classes.sectionCta}
                href="https://philhelp.zendesk.com/hc/en-us/requests/new?ticket_form_id=18810700002196"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Support
              </a>
            </header>
            <FlatAccordion items={PATIENT_FAQS} />
          </section>

          {/* ─── Providers ─── */}
          <section
            className={`${classes.section} ${classes.sectionProviders}`}
            id="providers"
          >
            <header className={classes.sectionHead}>
              <h2 className={classes.sectionTitle}>Providers</h2>
            </header>
            <CategoryAccordion
              categories={PROVIDER_CATEGORIES}
              sectionId="providers"
            />
          </section>
        </div>

        {/* ─── Bottom CTA ─── */}
        <section className={classes.footerCta}>
          <div className={`xl-container ${classes.footerCtaInner}`}>
            <div className={classes.footerCtaCopy}>
              <p className={classes.ctaEyebrow}>More Questions?</p>
              <h2 className={classes.footerCtaTitle}>
                We&rsquo;re here to help
              </h2>
              <p className={classes.ctaSub}>
                Whether you&rsquo;re a patient, caregiver, or provider looking
                for support, or a pharma manufacturer interested in a partnership
                with PHIL, our friendly team can help.
              </p>
            </div>
            <div className={classes.footerCtaButtons}>
              <Link className={classes.ctaBtn} to="/contact/">
                Contact Us
                <svg
                  viewBox="0 0 20 20"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10 H16 M11 5 L16 10 L11 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default FaqPage;

// ─── Head (SEO) ───────────────────────────────────────────────────────────────

const FAQ_OG = getOgImage(null);

export const Head: HeadFC = () => (
  <>
    <title>{FAQ_TITLE}</title>
    <meta name="description" content={FAQ_DESC} />
    <link rel="canonical" href={FAQ_URL} />
    <meta property="og:title" content={FAQ_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={FAQ_DESC} />
    <meta property="og:image" content={FAQ_OG} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={FAQ_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={FAQ_TITLE} />
    <meta name="twitter:description" content={FAQ_DESC} />
    <meta name="twitter:image" content={FAQ_OG} />
  </>
);
