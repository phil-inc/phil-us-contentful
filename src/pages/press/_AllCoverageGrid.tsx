import React from "react";

import type { PressItem } from "./_data";
import * as classes from "./press.module.css";

type AllCoverageGridProps = {
  items: PressItem[];
};

/**
 * The All Coverage card grid on /press.
 *
 * The component stays pure, so a test renders it without Gatsby and without a
 * browser. Each card opens one article in a new tab. The underscore in the file
 * name keeps Gatsby from making a page from this file, like _data.ts does.
 */
export const AllCoverageGrid: React.FC<AllCoverageGridProps> = ({ items }) => (
  <div className={classes.pressGrid}>
    {items.map((item) => (
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
);

export default AllCoverageGrid;
