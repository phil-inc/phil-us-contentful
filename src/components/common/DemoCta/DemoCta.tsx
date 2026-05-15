import React from "react";
import { Link } from "gatsby";
import * as classes from "./demoCta.module.css";

type DemoCtaProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const DemoCta: React.FC<DemoCtaProps> = ({
  eyebrow = "Ready to simplify medication access?",
  heading,
  description,
  ctaLabel = "Book A Demo",
  ctaHref = "/demo",
}) => (
  <section className={classes.section}>
    <div className={classes.inner}>
      <div>
        {eyebrow && <div className={classes.eyebrow}>{eyebrow}</div>}
        <h2 className={classes.heading}>{heading}</h2>
        {description && <p className={classes.description}>{description}</p>}
      </div>
      <div className={classes.actions}>
        <Link to={ctaHref} className={classes.btnPrimary}>
          {ctaLabel}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

export default DemoCta;
