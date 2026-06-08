import React, { useState, useMemo, useCallback, useRef } from "react";
import type { HeadFC } from "gatsby";
import { Link, navigate } from "gatsby";
import { useLocation } from "@reach/router";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import DemoCta from "components/common/DemoCta/DemoCta";
import Pagination from "components/common/Pagination/Pagination";

import { RESOURCES_DATA, TOPICS, TYPES } from "./_data";
import { PRESS_DATA } from "../press/_data";
import {
  parseFiltersFromSearch,
  filterResources,
  buildFilterUrl,
  serializeFiltersToSearch,
  titleForSelection,
  descriptionForSelection,
} from "./_urlFilters";
import * as classes from "./resources.module.css";

/* ─── Custom Dropdown ─── */

type DropdownProps = {
  options: readonly { key: string; label: string }[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

let dropdownUid = 0;

const Dropdown: React.FC<DropdownProps> = ({ options, value, placeholder, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef(`dropdown-${++dropdownUid}`);
  const listId = `${idRef.current}-list`;

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.key === value);

  return (
    <div className={classes.dropdown} ref={ref}>
      <button
        type="button"
        className={`${classes.dropdownTrigger} ${open ? classes.dropdownTriggerOpen : ""}`}
        onClick={() => setOpen(!open)}
        title={selected ? selected.label : placeholder}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
      >
        {selected ? (
          <span>{selected.label}</span>
        ) : (
          <span className={classes.dropdownPlaceholder}>{placeholder}</span>
        )}
      </button>
      <svg className={classes.filterIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      {open && (
        <div className={classes.dropdownPanel} role="listbox" id={listId} aria-label={placeholder}>
          <div
            role="option"
            aria-selected={!value}
            className={`${classes.dropdownOption} ${!value ? classes.dropdownOptionActive : ""}`}
            onClick={() => { onChange(""); setOpen(false); }}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(""); setOpen(false); } }}
          >
            {placeholder}
          </div>
          {options.map((o) => (
            <div
              key={o.key}
              role="option"
              aria-selected={value === o.key}
              className={`${classes.dropdownOption} ${value === o.key ? classes.dropdownOptionActive : ""}`}
              onClick={() => { onChange(o.key); setOpen(false); }}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange(o.key); setOpen(false); } }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CARD_ART_CYCLE = [classes.cardArtForest, classes.cardArtMeadow, classes.cardArtHeritage, classes.cardArtTidewater];
const PER_PAGE = 9;

const PRESS_ART_CYCLE = [classes.pressArtA, classes.pressArtB, classes.pressArtC, classes.pressArtD];
const PRESS_CARDS = PRESS_DATA
  .filter((d) => d.type === "Thought Leadership")
  .slice(0, 4)
  .map((d, i) => ({ outlet: d.outlet, title: d.title, url: d.url, art: PRESS_ART_CYCLE[i] }));

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 3v14M5 12l7 7 7-7M5 21h14" /></svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><polygon points="6 4 20 12 6 20 6 4" /></svg>
);

function getCtaIcon(label: string) {
  if (label === "Download") return <DownloadIcon />;
  if (label === "Watch") return <PlayIcon />;
  return <ArrowIcon />;
}

function isInternal(url: string) {
  return url.startsWith("https://phil.us/") || url.startsWith("https://www.phil.us/");
}

function toRelative(url: string) {
  return url.replace(/^https?:\/\/(www\.)?phil\.us/, "");
}

function CardLink({ url, className, children }: { url: string; className: string; children: React.ReactNode }) {
  if (isInternal(url)) {
    return <Link to={toRelative(url)} className={className}>{children}</Link>;
  }
  return <a href={url} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

const ResourcesPage: React.FC = () => {
  const location = useLocation();

  // Lazy initializer runs once on mount. On the server `location.search` is ""
  // so we start unfiltered (matches the static HTML). On the client's first
  // render it reads the real query string and applies the filter immediately.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initial = useMemo(() => parseFiltersFromSearch(location.search), []);

  const [hadUnavailableFilter, setHadUnavailableFilter] = useState(() => {
    let rawTopic = "";
    let rawType = "";
    try {
      const params = new URLSearchParams(location.search.replace(/^\?/, ""));
      rawTopic = params.get("topic") ?? "";
      rawType = params.get("type") ?? "";
    } catch {
      return false;
    }
    const topicUnavailable = rawTopic !== "" && initial.topic === "";
    const typeUnavailable = rawType !== "" && initial.type === "";
    return topicUnavailable || typeUnavailable;
  });

  const [topic, setTopic] = useState(initial.topic);
  const [type, setType] = useState(initial.type);
  const [search, setSearch] = useState(initial.search);
  const [page, setPage] = useState(initial.page);
  const gridRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (initial.topic || initial.type || initial.search) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(
    () => filterResources(RESOURCES_DATA, { topic, type, search }),
    [topic, type, search],
  );

  // Single source of URL sync for all filter dimensions (topic, type, search,
  // page). Each navigate() rewrites the whole query string, so one effect owns
  // it to avoid two effects clobbering each other's params. This effect is
  // keyed on STATE only (not location), so it reacts to the user changing a
  // filter — not to the URL changing underneath it (Back/Forward is handled by
  // the reconciliation effect below).
  //
  // Strategy by what changed:
  // - Only the free-text `search` differs from the URL → DEBOUNCED + REPLACE,
  //   so typing a word doesn't flood history with one entry per keystroke.
  // - Anything else (topic, type, page) → IMMEDIATE + PUSH, so each discrete
  //   choice is its own history entry and Back restores it.
  // Never navigates when the canonical target already equals the current URL,
  // which prevents loops and no-ops on mount.
  React.useEffect(() => {
    const sel = { topic, type, search, page };
    const targetSearch = serializeFiltersToSearch(sel);
    const currentSearch = location.search === "?" ? "" : location.search;
    if (targetSearch === currentSearch) {
      return;
    }

    const target = buildFilterUrl(location.pathname, sel);
    const current = parseFiltersFromSearch(location.search);
    const onlySearchDiffers =
      current.topic === topic &&
      current.type === type &&
      current.page === page &&
      current.search !== search;

    if (onlySearchDiffers) {
      const handle = setTimeout(() => {
        void navigate(target, { replace: true });
      }, 400);
      return () => clearTimeout(handle);
    }

    void navigate(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, type, search, page]);

  // Reconcile state FROM the URL when the browser location changes without a
  // local state change — i.e. the Back/Forward buttons. Reach-router keeps this
  // page mounted across same-path query changes, so `useState` does not reset on
  // its own; without this, pressing Back would change the URL but leave the
  // filters stale (and the sync effect above would fight it). We only set state
  // when it actually differs from the parsed URL, so the two effects settle in a
  // single pass rather than ping-ponging. (Navigating away to a card and back
  // remounts the page, where the lazy initializer already restores state.)
  React.useEffect(() => {
    const parsed = parseFiltersFromSearch(location.search);
    if (parsed.topic !== topic) setTopic(parsed.topic);
    if (parsed.type !== type) setType(parsed.type);
    if (parsed.search !== search) setSearch(parsed.search);
    if (parsed.page !== page) setPage(parsed.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Layer dynamic, filter-aware metadata on top of the static `Head` export.
  // Runs only on the client (a `useEffect` never executes during SSR/SSG), so
  // crawlers fetching raw HTML still see the build-time base title/description,
  // while human visitors and JS-rendering crawlers get the filtered values.
  // The helpers apply topic-over-type precedence and return the base defaults
  // for an empty/invalid selection, so this restores defaults when no valid
  // filter is active (R8.1–R8.7).
  React.useEffect(() => {
    const title = titleForSelection({ topic, type });
    const description = descriptionForSelection({ topic, type });
    document.title = title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, [topic, type]);

  const isFiltered = topic || type || search;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleFilterChange = useCallback(() => {
    setPage(1);
    setHadUnavailableFilter(false);
  }, []);

  // Smooth-scroll the results into view. Used only by the "Explore topics"
  // chips, which sit far above the results grid — so clicking one brings the
  // filtered results into view. The dropdown/search controls deliberately do
  // NOT scroll, since the user is already at the filter bar.
  //
  // We wait two animation frames so the scroll measures the layout AFTER React
  // commits the new render and the browser lays it out — protecting against any
  // filter-bar height change (e.g. a long selected label) shifting the target.
  const scrollToResults = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  // Dropdown / search handlers — update in place, no scroll.
  const setTopicFilter = (v: string) => { setTopic(v); handleFilterChange(); };
  const setTypeFilter = (v: string) => { setType(v); handleFilterChange(); };
  const setSearchFilter = (v: string) => { setSearch(v); handleFilterChange(); };

  // "Explore topics" chip handlers — set the filter, then scroll to results.
  const selectTopicChip = (v: string) => { setTopicFilter(v); scrollToResults(); };
  const selectCaseStudiesChip = () => { setTypeFilter("casestudy"); scrollToResults(); };

  // Clear ALL active filters — topic, type, AND the free-text search — and reset
  // pagination. The topic/type sync effect drives the URL back toward the base,
  // and the debounced search effect clears the `search` param, so the URL ends
  // at the bare Base_Resources_URL. If nothing was active, the serialized target
  // already equals the current search and no navigation occurs.
  const clearFilters = () => { setTopic(""); setType(""); setSearch(""); setPage(1); setHadUnavailableFilter(false); };

  const filterLabel = [
    topic && TOPICS.find((t) => t.key === topic)?.label,
    type && TYPES.find((t) => t.key === type)?.label,
    search && `"${search}"`,
  ].filter(Boolean).join(" · ");

  return (
    <PageContext.Provider value={{ title: "Resources" }}>
      <Layout>
        {/* Hero */}
        <section className={classes.hero}>
          <div className={classes.heroInner}>
            <div>
              <div className={classes.heroEyebrow}>Resource Hub</div>
              <h1 className={classes.h1}>
                Insights to Move <span className={classes.accent}>Your Access Strategy</span> Forward
              </h1>
              <p className={classes.heroDesc}>
                A curated library of research, thought leadership, and expert perspectives for pharma manufacturers that want to drive best-in-class results.
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

        {/* Featured */}
        <section className={classes.featured}>
          <div className={classes.featuredEyebrow}>Featured Resources</div>
          <div className={classes.featuredGrid}>
            <CardLink url="https://phil.us/dtp-research/" className={`${classes.featCard} ${classes.tidewater}`}>
              <div className={classes.featCardEyebrow}>Featured Report</div>
              <div>
                <h3 className={classes.featCardTitle}>Patient Perspectives on Direct-to-Patient: Improving Access and Adherence</h3>
                <span className={classes.featCta}>Read report <ArrowIcon /></span>
              </div>
            </CardLink>
            <CardLink url="https://phil.us/hcp-research/" className={`${classes.featCard} ${classes.meadow}`}>
              <div className={classes.featCardEyebrow}>Featured Report</div>
              <div>
                <h3 className={classes.featCardTitle}>HCP Perspectives on Direct-to-Patient: Engaging Providers in the Digital Era</h3>
                <span className={classes.featCta}>Read report <ArrowIcon /></span>
              </div>
            </CardLink>
            <CardLink url="https://phil.us/key-success-factors-to-drive-brand-excellence/" className={`${classes.featCard} ${classes.forest}`}>
              <div className={classes.featCardEyebrow}>Featured Report</div>
              <div>
                <h3 className={classes.featCardTitle}>5 Key Success Factors to Drive Brand Excellence</h3>
                <span className={classes.featCta}>Read report <ArrowIcon /></span>
              </div>
            </CardLink>
          </div>
        </section>

        {/* Explore Topics */}
        <section className={classes.topics}>
          <div className={classes.topicsEyebrow}>Explore topics</div>
          <div className={classes.topicsGrid}>
            {TOPICS.map((t) => (
              <button key={t.key} className={classes.topicChip} onClick={() => selectTopicChip(t.key)}>
                <span className={classes.topicGlyph}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
                  </svg>
                </span>
                <span className={classes.topicLabel}>{t.label}</span>
                <svg className={classes.topicArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ))}
            <button className={classes.topicChip} onClick={() => selectCaseStudiesChip()}>
              <span className={classes.topicGlyph}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
                </svg>
              </span>
              <span className={classes.topicLabel}>Customer Success Stories</span>
              <svg className={classes.topicArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Filter bar */}
        <div className={classes.filterBar} ref={gridRef}>
          <div className={classes.filterGroup}>
            <label className={classes.filterLabel}>Topic</label>
            <Dropdown options={TOPICS} value={topic} placeholder="I'm interested in…" onChange={setTopicFilter} />
          </div>
          <div className={classes.filterGroup}>
            <label className={classes.filterLabel}>Type</label>
            <Dropdown options={TYPES} value={type} placeholder="All formats" onChange={setTypeFilter} />
          </div>
          <div className={classes.filterGroup}>
            <label className={classes.filterLabel}>Search</label>
            <input className={classes.filterInput} type="text" placeholder="I'm looking for…" value={search} onChange={(e) => setSearchFilter(e.target.value)} />
            <svg className={classes.filterIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          </div>
        </div>

        {/* Results banner */}
        {isFiltered && (
          <div className={`${classes.resultsBanner} ${classes.resultsBannerActive}`}>
            <span className={classes.resultsCount}>{filtered.length} {filtered.length === 1 ? "resource" : "resources"}</span>
            <span className={classes.filterChip}>
              <span>{filterLabel}</span>
              <button className={classes.chipX} onClick={clearFilters} title="Clear filter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </span>
            <button className={classes.clearAll} onClick={clearFilters}>Clear filter</button>
          </div>
        )}

        {/* Filter-unavailable notice — shown only when the opening URL carried a
            non-empty topic/type value that no longer resolves to a valid key (R7.4). */}
        {hadUnavailableFilter && (
          <div className={classes.filterNotice} role="status">
            <div className={classes.filterNoticeInner}>
              The requested filter is unavailable, showing all resources.
            </div>
          </div>
        )}

        {/* All Resources */}
        <section className={classes.section}>
          {filtered.length === 0 ? (
            <div className={classes.emptyState} role="status">
              <p className={classes.emptyStateTitle}>No resources match your filters.</p>
              <p className={classes.emptyStateHint}>Try clearing a filter or adjusting your search.</p>
            </div>
          ) : (
            <div className={classes.cardGrid}>
              {paged.map((item, i) => (
                <CardLink key={item.url} url={item.url} className={classes.card}>
                  <div className={`${classes.cardArt} ${CARD_ART_CYCLE[(i + (currentPage - 1) * PER_PAGE) % 4]}`} />
                  <div className={classes.cardBody}>
                    <span className={classes.cardType}>{item.type}</span>
                    <h3 className={classes.cardTitle}>{item.title}</h3>
                    <span className={classes.cardBtn}>{item.buttonLabel} {getCtaIcon(item.buttonLabel)}</span>
                  </div>
                </CardLink>
              ))}
            </div>
          )}
        </section>

        {/* Show more / pagination */}
        <div className={classes.showMoreRow}>
          <div className={classes.countText}>
            Showing <em className={classes.countTextBold}>{Math.min((currentPage - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * PER_PAGE, filtered.length)}</em> of <em className={classes.countTextBold}>{filtered.length}</em> resources
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </div>

        {/* Press section */}
        <section className={classes.pressSection}>
          <div className={classes.pressInner}>
            <div className={classes.pressEyebrow}>In the news</div>
            <h2 className={classes.pressH2}>PHIL in the press</h2>
            <p className={classes.pressDesc}>Recent thought leadership in renowned industry publications and outlets.</p>
            <div className={classes.pressGrid}>
              {PRESS_CARDS.map((card) => (
                <a key={card.url} className={classes.pressCard} href={card.url} target="_blank" rel="noopener noreferrer">
                  <div className={`${classes.pressArt} ${card.art}`} />
                  <div className={classes.pressBody}>
                    <div className={classes.pressLogo}>{card.outlet}</div>
                    <h4 className={classes.pressCardTitle}>{card.title}</h4>
                    <span className={classes.pressCtaBtn}>Read feature <ArrowIcon /></span>
                  </div>
                </a>
              ))}
            </div>
            <div className={classes.pressCtaRow}>
              <Link to="/press" className={classes.pressCta}>View Press <ArrowIcon /></Link>
            </div>
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

export default ResourcesPage;

export const Head: HeadFC = () => (
  <>
    <title>Resources | PHIL</title>
    <meta name="description" content="Explore PHIL's library of reports, webinars, blogs, and press coverage on patient access, direct-to-patient programs, and pharmaceutical commercialization." />
  </>
);
