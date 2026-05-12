import React from "react";
import * as classes from "./pressHighlights.module.css";
import { Link } from "gatsby";

type PressItem = { title: string; publication: string; href: string; topics: string[] };

export type PressHighlightsProps = { items: PressItem[] };

const ARTS = ["a", "b", "c", "d"] as const;

const PressHighlights: React.FC<PressHighlightsProps> = ({ items }) => (
  <section className={classes.section}>
    <div className={classes.inner}>
      <div className={classes.header}>
        <div>
          <div className={classes.eyebrow}>In the news</div>
          <h2 className={classes.heading}>PHIL in the press</h2>
          <p className={classes.sub}>Recent thought leadership in renowned industry publications and outlets.</p>
        </div>
      </div>
      <div className={classes.grid}>
        {items.map((item, i) => (
          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className={classes.card}>
            <div className={`${classes.art} ${classes[ARTS[i % 4]]}`} />
            <div className={classes.body}>
              <div className={classes.logo}>{item.publication}</div>
              <h4 className={classes.title}>{item.title}</h4>
              <span className={classes.ctaBtn}>Read feature
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </div>
          </a>
        ))}
      </div>
      <div className={classes.ctaRow}>
        <Link to="/press" className={classes.cta}>View Press
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </div>
  </section>
);

export default PressHighlights;
