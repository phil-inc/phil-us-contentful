import React from "react";
import { Link } from "gatsby";
import * as classes from "./demoCta.module.css";

type DemoCtaProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

const DemoCta: React.FC<DemoCtaProps> = ({
  eyebrow = "Ready to simplify medication access?",
  heading,
  description,
  ctaLabel = "Book A Demo",
  ctaHref = "/demo",
  className,
}) => (
  <section className={`${classes.section} ${className || ''}`}>
    <div className={classes.inner}>
      <div>
        {eyebrow && <div className={classes.eyebrow}>{eyebrow}</div>}
        <h2 className={classes.heading}>{heading}</h2>
        {description && <p className={classes.description}>{description}</p>}
      </div>
      <div className={classes.actions}>
        <Link to={ctaHref} className={classes.btnPrimary}>
          {ctaLabel}
        </Link>
      </div>
    </div>
  </section>
);

export default DemoCta;
