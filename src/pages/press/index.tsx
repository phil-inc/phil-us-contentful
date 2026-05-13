import React, { useState } from "react";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import Pagination from "components/common/Pagination/Pagination";
import DemoCta from "components/common/DemoCta/DemoCta";

import * as classes from "./press.module.css";

// ─── Data ────────────────────────────────────────────────────────────────────

interface PressItem {
  title: string;
  description?: string;
  outlet: string;
  type: "Release" | "Thought Leadership";
  url: string;
}

const PRESS_DATA: PressItem[] = [
  {
    title: "PHIL Invests in State-of-the-Art Cash Dispense Capabilities, Expanding Direct-to-Patient Fulfillment for Pharma",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.businesswire.com/news/home/20260421670832/en/PHIL-Invests-in-State-of-the-Art-Cash-Dispense-Capabilities-Expanding-Direct-to-Patient-Fulfillment-for-Pharma",
  },
  {
    title: "Tenpoint Therapeutics Ltd and PHIL Partner to Launch YUVEZZI\u2122 Direct-to-Patient Cash Program",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable",
  },
  {
    title: "Sprout Pharmaceuticals and PHIL Expand Their Affordable Direct-to-Patient Access Program for Addyi",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html",
  },
  {
    title: "The Hidden GTN Drain: Why Specialty-Lite Brands Need To Streamline The PA Process",
    description: "For retail and specialty-lite pharmaceutical brands, the path from prescription to profit has never been more treacherous.",
    outlet: "Fierce Pharma",
    type: "Thought Leadership",
    url: "https://www.fiercepharma.com/sponsored/hidden-gtn-drain-why-specialty-lite-brands-need-streamline-their-pa-process-optimal",
  },
  {
    title: "Pharma Direct-To-Patient 2.0: From Experiment To Imperative",
    description: "Policy pressure, affordability gaps, and consumer expectations are reshaping how pharma companies think about direct to patient access.",
    outlet: "Life Science Leader",
    type: "Thought Leadership",
    url: "https://www.lifescienceleader.com/doc/pharma-direct-to-patient-from-experiment-to-imperative-0001",
  },
  {
    title: "Harnessing the Power of Comprehensive Data to Drive GTN",
    description: "Growing market access barriers are compelling retail and specialty-lite pharmaceutical manufacturers to seek new approaches to optimize revenue and enhance patient access.",
    outlet: "Drug Channels",
    type: "Thought Leadership",
    url: "https://www.drugchannels.net/2025/02/from-data-gaps-to-revenue-gains.html",
  },
  {
    title: "Redefining Commercial Success in Specialty-Lite",
    description: "Specialty-lite products occupy a complex middle ground in pharmaceutical commercialization.",
    outlet: "Biopharma Dive",
    type: "Thought Leadership",
    url: "https://www.biopharmadive.com/spons/redefining-commercial-success-in-specialty-lite-with-alternative-channels/753650/",
  },
  {
    title: "Bridging Data Gaps that Impact Retail and Specialty-Lite Success",
    description: "Retail and specialty-lite brand teams are facing a paradox \u2013 they\u2019re drowning in data yet struggling to gain actionable insight.",
    outlet: "Biopharma Dive",
    type: "Thought Leadership",
    url: "https://www.biopharmadive.com/spons/bridging-the-data-gaps-that-impact-retail-and-specialty-lite-success/747704/",
  },
  {
    title: "PHIL Launches Direct-to-Patient 2.0 Platform to Transform Access, Affordability, and Adherence in Pharma",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.businesswire.com/news/home/20250922836527/en/PHIL-Launches-Direct-to-Patient-2.0-Platform-to-Transform-Access-Affordability-and-Adherence-in-Pharma",
  },
  {
    title: "Phil Secures $60 Million Growth Capital Facility from K2 HealthVentures to Accelerate AI Integration",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.prnewswire.com/news-releases/phil-secures-60-million-growth-capital-facility-from-k2-healthventures-to-accelerate-ai-integration-302499313.html",
  },
  {
    title: "Phil Inc. Adds Duchesnay USA\u2019s Women\u2019s Healthcare Product to Its Patient Access Platform",
    outlet: "Press Release",
    type: "Release",
    url: "https://www.businesswire.com/news/home/20230109005280/en/Phil-Inc.-Adds-Duchesnay-USAs-Womens-Healthcare-Product-to-Its-Patient-Access-Platform",
  },
];

const FEATURED_RELEASES = PRESS_DATA.filter((d) => d.type === "Release").slice(0, 3);
const FEATURED_THOUGHT = PRESS_DATA.filter((d) => d.type === "Thought Leadership").slice(0, 3);

const ITEMS_PER_PAGE = 6;
const TOTAL_PAGES = Math.ceil(PRESS_DATA.length / ITEMS_PER_PAGE);

const THOUGHT_GRADIENTS: string[] = [classes.tidewater, classes.meadow, classes.forest];

// ─── Arrow SVG ───────────────────────────────────────────────────────────────

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const PressPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const paged = PRESS_DATA.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <PageContext.Provider value={{ title: "Press" }}>
      <Layout>
        {/* Hero */}
        <section className={classes.hero}>
          <div className={classes.heroInner}>
            <div>
              <div className={classes.heroEyebrow}>Pressroom</div>
              <h1 className={classes.h1}>
                PHIL <span className={classes.accent}>in the press</span>
              </h1>
              <p className={classes.heroDesc}>
                Read our latest news, announcements, and thought leadership.
              </p>
            </div>
            <div className={classes.heroArt} aria-hidden="true">
              <div className={classes.ring} />
              <div className={`${classes.ring} ${classes.ringInner}`} />
              <div className={`${classes.blob} ${classes.blobA}`} />
              <div className={`${classes.blob} ${classes.blobB}`} />
              <div className={`${classes.blob} ${classes.blobC}`} />
              <div className={classes.pdot}>P</div>
            </div>
          </div>
        </section>

        {/* Latest Announcements */}
        <section className={classes.featured}>
          <div className={classes.featuredEyebrow}>Latest Announcements</div>
          <div className={classes.featuredGrid}>
            {FEATURED_RELEASES.map((item) => (
              <a
                key={item.url}
                className={`${classes.featCard} ${classes.heritage}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <h3 className={classes.featCardTitle}>{item.title}</h3>
                  <span className={classes.featCta}>
                    Read announcement <ArrowIcon />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Featured Thought Leadership */}
        <section className={classes.featured}>
          <div className={classes.featuredEyebrow}>Featured Thought Leadership</div>
          <div className={classes.featuredGrid}>
            {FEATURED_THOUGHT.map((item, i) => (
              <a
                key={item.url}
                className={`${classes.featCard} ${THOUGHT_GRADIENTS[i]}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={classes.featCardTitle} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "Lato, sans-serif" }}>
                  {item.outlet}
                </div>
                <div>
                  <h3 className={classes.featCardTitle}>{item.title}</h3>
                  <span className={classes.featCta}>
                    Read feature <ArrowIcon />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* All Coverage */}
        <section className={classes.pressSection}>
          <div className={classes.pressInner}>
            <div className={classes.pressEyebrow}>All Coverage</div>
            <div className={classes.pressGrid}>
              {paged.map((item) => (
                <a
                  key={item.url}
                  className={classes.pressCard}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={classes.pressArt} />
                  <div className={classes.pressBody}>
                    <div className={classes.pressLogo}>{item.outlet}</div>
                    <h4 className={classes.pressCardTitle}>{item.title}</h4>
                  </div>
                </a>
              ))}
            </div>
            <Pagination currentPage={page} totalPages={TOTAL_PAGES} onPageChange={setPage} />
          </div>
        </section>

        {/* Demo CTA */}
        <DemoCta
          heading="See how PHIL moves more patients to therapy, quickly and affordably"
          description="Take a tour of the PHIL platform and discover how we can help amplify starts, adherence, coverage, and commercial success."
        />
      </Layout>
    </PageContext.Provider>
  );
};

export default PressPage;

export const Head: HeadFC = () => (
  <>
    <title>Press | PHIL</title>
    <meta
      name="description"
      content="Read PHIL's latest news, announcements, and thought leadership on pharmacy innovation and direct-to-patient programs."
    />
  </>
);
