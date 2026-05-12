import React from "react";
import { Link } from "gatsby";
import * as classes from "./featuredCard.module.css";

export type FeaturedCardProps = {
  title: string;
  cta: string;
  href: string;
  color: "tidewater" | "meadow" | "forest";
};

const FeaturedCard: React.FC<FeaturedCardProps> = ({ title, cta, href, color }) => {
  const isExternal = !href.startsWith("/");
  const inner = (
    <div className={`${classes.card} ${classes[color]}`}>
      <div className={classes.eyebrow}>Featured Report</div>
      <div>
        <h3 className={classes.title}>{title}</h3>
        <span className={classes.cta}>{cta}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </span>
      </div>
    </div>
  );
  if (isExternal) return <a href={href} target="_blank" rel="noopener noreferrer" className={classes.link}>{inner}</a>;
  return <Link to={href} className={classes.link}>{inner}</Link>;
};

export default FeaturedCard;
