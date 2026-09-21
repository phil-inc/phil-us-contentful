import React from "react";
import type { HeadFC } from "gatsby";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import Pagination from "components/common/Pagination/Pagination";
import DemoCta from "components/common/DemoCta/DemoCta";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { getOgImage } from "utils/getOgImage";
import { webPageSchema } from "utils/seo/schema";
import { pagedPath, pageFromPagedPath } from "utils/pagedPath";

import { PRESS_DATA, PRESS_PER_PAGE, PRESS_TOTAL_PAGES } from "./_data";
import * as classes from "./press.module.css";

const FEATURED_RELEASES = PRESS_DATA.filter((d) => d.type === "Release").slice(0, 3);
const FEATURED_THOUGHT = PRESS_DATA.filter((d) => d.type === "Thought Leadership").slice(0, 3);

const THOUGHT_GRADIENTS: string[] = [classes.tidewater, classes.meadow, classes.forest];

// ─── Arrow SVG ───────────────────────────────────────────────────────────────

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const PressPage: React.FC = () => {
  // Each page number is its own static page (/press/page/n/, built by
  // gatsby-node.ts), so the page comes from the path, which the server also
  // sees: the HTML of each page carries that page's items for crawlers.
  const location = useLocation();
  const currentPage = Math.min(pageFromPagedPath(PRESS_PATH, location.pathname), PRESS_TOTAL_PAGES);
  const paged = PRESS_DATA.slice((currentPage - 1) * PRESS_PER_PAGE, currentPage * PRESS_PER_PAGE);

  return (
    <PageContext.Provider value={{ title: "Press" }}>
      <Layout>
        {/* Hero */}
        <section className={classes.hero}>
          <div className={classes.heroInner}>
            <div>
              <div className={classes.heroEyebrow}>Pressroom</div>
              <h1 className={classes.h1}>
                PHIL <span className={classes.accent}>in the Press</span>
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
            <Pagination
              currentPage={currentPage}
              totalPages={PRESS_TOTAL_PAGES}
              onPageChange={(p) => void navigate(pagedPath(PRESS_PATH, p))}
              getPageHref={(p) => pagedPath(PRESS_PATH, p)}
            />
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

const PRESS_TITLE = "Press | PHIL";
const PRESS_DESC =
  "Read PHIL's latest news, announcements, and thought leadership on pharmacy innovation and direct-to-patient programs.";

/**
 * This page and /insights/press-releases/ both return 200 with similar content,
 * so the canonical SeoMeta emits is what tells a crawler which of the two is
 * authoritative. Serves /press/ and every /press/page/n/: each page is its own
 * canonical, as Google asks of paginated listings.
 */
const PRESS_PATH = "/press/";
const PRESS_OG_IMAGE = getOgImage(null);

export const Head: HeadFC = ({ location }) => {
  const page = pageFromPagedPath(PRESS_PATH, location.pathname);
  const path = pagedPath(PRESS_PATH, page);
  const title = page > 1 ? `Press – Page ${page} of ${PRESS_TOTAL_PAGES} | PHIL` : PRESS_TITLE;

  return (
    <>
      <SeoMeta title={title} description={PRESS_DESC} path={path} image={PRESS_OG_IMAGE} />
      {/* CollectionPage rather than WebPage: this indexes press items rather than being an article itself. */}
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          path,
          name: title,
          description: PRESS_DESC,
          image: PRESS_OG_IMAGE,
        })}
      />
    </>
  );
};
