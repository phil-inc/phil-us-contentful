import React from "react";
import * as classes from "./resourceHubHero.module.css";

export type ResourceHubHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
};

const ResourceHubHero: React.FC<ResourceHubHeroProps> = ({ eyebrow, title, subtitle }) => (
  <section className={classes.hero}>
    <div className={classes.inner}>
      <div>
        <div className={classes.eyebrow}>{eyebrow}</div>
        <h1 className={classes.heading}>{title}</h1>
        <p className={classes.sub}>{subtitle}</p>
      </div>
      <div className={classes.art} aria-hidden="true">
        <div className={classes.ring} />
        <div className={`${classes.ring} ${classes.ringInner}`} />
        <div className={`${classes.blob} ${classes.blobA}`} />
        <div className={`${classes.blob} ${classes.blobB}`} />
        <div className={`${classes.blob} ${classes.blobC}`} />
        <div className={classes.pdot}>P</div>
      </div>
    </div>
  </section>
);

export default ResourceHubHero;
