import React from "react";
import * as classes from "./pager.module.css";

export type PagerProps = {
  current: number;
  total: number;
  perPage: number;
  count: number;
  onPage: (p: number) => void;
};

const Pager: React.FC<PagerProps> = ({ current, total, perPage, count, onPage }) => {
  const totalPages = Math.max(1, Math.ceil(count / perPage));
  const start = count === 0 ? 0 : (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, count);

  const pages = Array.from(new Set([1, totalPages, current, current - 1, current + 1]))
    .filter(p => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  return (
    <div className={classes.row}>
      <div className={classes.countText}>
        Showing <em>{start}–{end}</em> of <em>{count}</em> resources
      </div>
      <div className={classes.pager}>
        <button disabled={current === 1} onClick={() => onPage(current - 1)} aria-label="Previous page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        {pages.map((p, i) => (
          <React.Fragment key={p}>
            {i > 0 && p - pages[i - 1] > 1 && <span className={classes.ellipsis}>…</span>}
            <button className={p === current ? classes.active : undefined} onClick={() => onPage(p)}>{p}</button>
          </React.Fragment>
        ))}
        <button disabled={current >= totalPages} onClick={() => onPage(current + 1)} aria-label="Next page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Pager;
