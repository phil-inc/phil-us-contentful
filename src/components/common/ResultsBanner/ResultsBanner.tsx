import React from "react";
import * as classes from "./resultsBanner.module.css";

export type ResultsBannerProps = {
  count: number;
  label: string;
  onClear: () => void;
};

const ResultsBanner: React.FC<ResultsBannerProps> = ({ count, label, onClear }) => (
  <div className={classes.banner}>
    <span className={classes.count}>{count} {count === 1 ? "resource" : "resources"}</span>
    <span className={classes.chip}>
      {label}
      <span className={classes.x} onClick={onClear} role="button" aria-label="Clear filter">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </span>
    </span>
    <span className={classes.clearAll} onClick={onClear}>Clear filter</span>
  </div>
);

export default ResultsBanner;
