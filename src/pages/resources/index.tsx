import React, { useState, useMemo, useCallback, useRef } from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import DemoCta from "components/common/DemoCta/DemoCta";
import Pagination from "components/common/Pagination/Pagination";

import { RESOURCES_DATA, ResourceItem } from "./_data";
import * as classes from "./resources.module.css";

/* ─── Custom Dropdown ─── */

type DropdownProps = {
  options: { key: string; label: string }[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, placeholder, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      >
        {selected ? (
          <span>{selected.label}</span>
        ) : (
          <span className={classes.dropdownPlaceholder}>{placeholder}</span>
        )}
      </button>
      <svg className={classes.filterIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
      {open && (
        <div className={classes.dropdownPanel}>
          <button
            type="button"
            className={`${classes.dropdownOption} ${!value ? classes.dropdownOptionActive : ""}`}
            onClick={() => { onChange(""); setOpen(false); }}
          >
            {placeholder}
          </button>
          {options.map((o) => (
            <button
              key={o.key}
              type="button"
              className={`${classes.dropdownOption} ${value === o.key ? classes.dropdownOptionActive : ""}`}
              onClick={() => { onChange(o.key); setOpen(false); }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CARD_ART_CYCLE = [classes.cardArtForest, classes.cardArtMeadow, classes.cardArtHeritage, classes.cardArtTidewater];
const PER_PAGE = 9;

const TOPICS = [
  { key: "direct", label: "Direct-to-Patient" },
  { key: "access", label: "Access Strategy & Channel Design" },
  { key: "patient", label: "Patient Experience, Support & Assistance" },
  { key: "utilization", label: "Utilization Management" },
  { key: "field", label: "Field Enablement & HCP Engagement" },
  { key: "data", label: "Data, Technology & Optimization" },
  { key: "commercial", label: "Commercial Performance" },
];

const TYPES = [
  { key: "report", label: "Reports" },
  { key: "webinar", label: "Webinars" },
  { key: "blog", label: "Blog" },
  { key: "press", label: "Press" },
  { key: "casestudy", label: "Case Studies" },
];

const PRESS_CARDS = [
  { outlet: "Drug Channels", title: "Beyond DTP 2.0: How Flexible FTP Programs Power Superior Patient Experiences", url: "https://www.drugchannels.net/2025/02/from-data-gaps-to-revenue-gains.html", art: classes.pressArtA },
  { outlet: "Fierce Pharma", title: "The Hidden GTN Drain: Why Streamlining the PA Process is Key to Commercial Success", url: "https://www.fiercepharma.com/sponsored/hidden-gtn-drain-why-specialty-lite-brands-need-streamline-their-pa-process-optimal", art: classes.pressArtB },
  { outlet: "Life Science Leader", title: "Pharma Direct-To-Patient 2.0: From Experiment to Imperative", url: "https://www.lifescienceleader.com/doc/pharma-direct-to-patient-from-experiment-to-imperative-0001", art: classes.pressArtC },
  { outlet: "BioPharma Dive", title: "Bridging Data Gaps that Impact Retail and Specialty-lite Success", url: "https://www.biopharmadive.com/spons/bridging-the-data-gaps-that-impact-retail-and-specialty-lite-success/747704/", art: classes.pressArtD },
];

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
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      if (topic && !item.topics.includes(topic)) return false;
      if (type && item.type !== type) return false;
      if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [topic, type, search]);

  const isFiltered = topic || type || search;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleFilterChange = useCallback(() => setPage(1), []);
  const setTopicFilter = (v: string) => { setTopic(v); handleFilterChange(); setTimeout(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); };
  const setTypeFilter = (v: string) => { setType(v); handleFilterChange(); };
  const setSearchFilter = (v: string) => { setSearch(v); handleFilterChange(); };
  const clearFilters = () => { setTopic(""); setType(""); setSearch(""); setPage(1); };

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
                Insights to move <span className={classes.accent}>your access strategy</span> forward
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
              <button key={t.key} className={classes.topicChip} onClick={() => setTopicFilter(t.key)}>
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
            <button className={classes.topicChip} onClick={() => setTypeFilter("casestudy")}>
              <span className={classes.topicGlyph}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
                  <path d="M7 4h10v3.5a5 5 0 0 1-10 0V4z" /><path d="M17 5h2.5a1.5 1.5 0 0 1 1.5 1.5V8a3 3 0 0 1-3 3h-.7" /><path d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5V8a3 3 0 0 0 3 3h.7" /><path d="M12 12.5V16" /><path d="M9 20h6" /><path d="M10 16h4l.5 4h-5l.5-4z" />
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

        {/* All Resources */}
        <section className={classes.section}>
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
