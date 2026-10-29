import React, { useCallback, useRef, useState } from "react";

import type { Finding } from "./types";
import { useScrollMeasure } from "./useScrollMeasure";
import * as classes from "./researchReport.module.css";

type KeyFindingsProps = {
  label: string;
  findings: Finding[];
};

/** Numbered findings; the row nearest the middle of the screen has its number highlighted. */
export const KeyFindings: React.FC<KeyFindingsProps> = ({ label, findings }) => {
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);

  const measure = useCallback(() => {
    const middle = window.innerHeight / 2;
    let closest: number | null = null;
    let closestDistance = Infinity;
    rows.current.forEach((row, i) => {
      if (!row) return;
      const r = row.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const distance = Math.abs(r.top + r.height / 2 - middle);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    setActive(closest);
  }, []);

  useScrollMeasure(measure);

  return (
    <section id="findings" className={classes.findings}>
      <p className={classes.label}>{label}</p>
      <div className={classes.findingsList}>
        {findings.map((finding, i) => (
          <div
            key={finding.title}
            ref={(el) => {
              rows.current[i] = el;
            }}
            className={classes.finding}
          >
            <div
              className={`${classes.findingNumber} ${classes.gradientNumber} ${active === i ? classes.findingNumberActive : ""}`}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className={classes.findingText}>
              <h3 className={classes.findingTitle}>{finding.title}</h3>
              <p className={classes.findingBody}>{finding.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
