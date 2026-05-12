import React from "react";
import { Link } from "gatsby";
import * as classes from "./resourceHubCard.module.css";

const COLORS = ["forest", "meadow", "heritage", "tidewater"] as const;

export type ResourceHubCardProps = {
  title: string;
  type: string;
  href: string;
  cta: string;
  index: number;
};

const ResourceHubCard: React.FC<ResourceHubCardProps> = ({ title, type, href, cta, index }) => {
  const color = COLORS[index % COLORS.length];
  const isExternal = !href.startsWith("/");
  const content = (
    <div className={classes.card}>
      <div className={`${classes.cardArt} ${classes[color]}`} />
      <div className={classes.cardBody}>
        <span className={classes.cardType}>{type}</span>
        <h3 className={classes.cardTitle}>{title}</h3>
        <span className={classes.cardBtn}>{cta}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </span>
      </div>
    </div>
  );

  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={classes.link}>{content}</a>;
  }
  return <Link to={href} className={classes.link}>{content}</Link>;
};

export default ResourceHubCard;
