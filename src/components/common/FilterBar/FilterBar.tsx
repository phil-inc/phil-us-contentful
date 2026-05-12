import React from "react";
import * as classes from "./filterBar.module.css";

type FilterOption = { value: string; label: string };

export type FilterBarProps = {
  topics: FilterOption[];
  types: FilterOption[];
  topic: string;
  type: string;
  search: string;
  onTopicChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onSearchChange: (v: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ topics, types, topic, type, search, onTopicChange, onTypeChange, onSearchChange }) => (
  <div className={classes.bar}>
    <div className={classes.group}>
      <label>Topic</label>
      <select value={topic} onChange={e => onTopicChange(e.target.value)}>
        <option value="">I'm interested in…</option>
        {topics.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>
      <svg className={classes.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
    </div>
    <div className={classes.group}>
      <label>Type</label>
      <select value={type} onChange={e => onTypeChange(e.target.value)}>
        <option value="">All formats</option>
        {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>
      <svg className={classes.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
    </div>
    <div className={classes.group}>
      <label>Search</label>
      <input type="text" placeholder="I'm looking for…" value={search} onChange={e => onSearchChange(e.target.value)} />
      <svg className={classes.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
    </div>
  </div>
);

export default FilterBar;
