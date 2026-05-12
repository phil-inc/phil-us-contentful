import React from "react";
import * as classes from "./demoCta.module.css";

const DemoCta: React.FC = () => (
  <section className={classes.section}>
    <div className={classes.inner}>
      <div>
        <div className={classes.eyebrow}>Ready to simplify medication access?</div>
        <h2 className={classes.heading}>See how PHIL moves more patients to therapy, quickly and affordably</h2>
        <p className={classes.sub}>Take a tour of the PHIL platform and discover how we can help amplify starts, adherence, coverage, and commercial success.</p>
      </div>
      <div className={classes.actions}>
        <a href="https://phil.us/demo" className={classes.btn}>Book A Demo
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </div>
    </div>
  </section>
);

export default DemoCta;
