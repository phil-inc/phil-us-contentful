import React, { useState, useMemo } from "react";
import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";
import ResourceHubHero from "components/common/ResourceHubHero/ResourceHubHero";
import FeaturedCard from "components/common/FeaturedCard/FeaturedCard";
import FilterBar from "components/common/FilterBar/FilterBar";
import ResultsBanner from "components/common/ResultsBanner/ResultsBanner";
import CardGrid from "components/common/CardGrid/CardGrid";
import ResourceHubCard from "components/common/ResourceHubCard/ResourceHubCard";
import Pager from "components/common/Pager/Pager";
import DemoCta from "components/common/DemoCta/DemoCta";
import data from "data/resource-hub.json";

import * as classes from "./press.module.css";

const PER_PAGE = 9;

const PressPage: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.pressPage.cards.filter(c => {
      if (topic && !c.topics.includes(topic)) return false;
      if (q && !c.title.toLowerCase().includes(q) && !(c.description && c.description.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [topic, search]);

  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const isFiltering = !!(topic || search);

  const filterLabel = [
    topic && data.filters.topics.find(t => t.value === topic)?.label,
    search && `"${search}"`,
  ].filter(Boolean).join(" · ");

  const clearFilters = () => { setTopic(""); setSearch(""); setPage(1); };

  return (
    <PageContext.Provider value={{ title: "Press", slug: "press" }}>
      <Layout>
        <ResourceHubHero
          eyebrow="Press"
          title={<>PHIL in the <span className="accent">press</span></>}
          subtitle="Industry coverage, partnerships, and thought leadership from PHIL across leading publications."
        />

        <section className={classes.featured}>
          <div className={classes.featuredHead}>
            <div className={classes.featuredEyebrow}>Featured Press</div>
          </div>
          <div className={classes.featuredGrid}>
            {data.pressPage.featured.map((f, i) => (
              <FeaturedCard key={i} title={f.title} cta={f.cta} href={f.href} color={f.color as "tidewater" | "meadow" | "forest"} />
            ))}
          </div>
        </section>

        <FilterBar
          topics={data.filters.topics}
          types={[]}
          topic={topic}
          type=""
          search={search}
          onTopicChange={(v) => { setTopic(v); setPage(1); }}
          onTypeChange={() => {}}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
        />

        {isFiltering && <ResultsBanner count={filtered.length} label={filterLabel} onClear={clearFilters} />}

        <section className={classes.library}>
          <CardGrid>
            {visible.map((card, i) => (
              <ResourceHubCard key={i} title={card.title} type={card.type} href={card.href} cta={card.cta} index={(page - 1) * PER_PAGE + i} />
            ))}
          </CardGrid>
        </section>

        <Pager current={page} total={Math.ceil(filtered.length / PER_PAGE)} perPage={PER_PAGE} count={filtered.length} onPage={setPage} />
        <DemoCta />
      </Layout>
    </PageContext.Provider>
  );
};

export default PressPage;

export const Head = () => (
  <>
    <title>Press | Phil</title>
    <meta name="description" content="Industry coverage, partnerships, and thought leadership from PHIL across leading publications." />
  </>
);
