import React, { useState, useMemo, useRef } from "react";
import type { HeadFC } from "gatsby";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import Pagination from "components/common/Pagination/Pagination";
import DemoCta from "components/common/DemoCta/DemoCta";

import { PRESS_DATA } from "./_data";
import * as classes from "./press.module.css";

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

function parsePageFromSearch(search: string): number {
  try {
    const params = new URLSearchParams(search.replace(/^\?/, ""));
    const raw = params.get("page");
    if (!raw) return 1;
    const parsed = Number(raw);
    return Number.isInteger(parsed) && parsed >= 1 ? parsed : 1;
  } catch {
    return 1;
  }
}

function serializePageToSearch(page: number): string {
  if (page <= 1) return "";
  return `?page=${page}`;
}

const PressPage: React.FC = () => {
  const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialPage = useMemo(() => parsePageFromSearch(location.search), []);
  const [page, setPage] = useState(initialPage);
  const gridRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (initialPage > 1) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state → URL
  React.useEffect(() => {
    const targetSearch = serializePageToSearch(page);
    const currentSearch = location.search === "?" ? "" : location.search;
    if (targetSearch === currentSearch) return;
    const target = `${location.pathname}${targetSearch}`;
    void navigate(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Sync URL → state (Back/Forward)
  React.useEffect(() => {
    const parsed = parsePageFromSearch(location.search);
    if (parsed !== page) setPage(parsed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const currentPage = Math.min(page, TOTAL_PAGES);
  const paged = PRESS_DATA.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
        <section className={classes.pressSection} ref={gridRef}>
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
            <Pagination currentPage={currentPage} totalPages={TOTAL_PAGES} onPageChange={setPage} />
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
