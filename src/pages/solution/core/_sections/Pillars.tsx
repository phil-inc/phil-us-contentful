import React from 'react';
import { Link } from 'gatsby';

export const PillarsSection: React.FC = () => (

<section id="pillars" className="band" data-screen-label="03 PHIL Pillars">
  <div className="xl-container">
    <div className="section-head">
      <h2 className="h2--full">Advance Patient Outcomes and Brand Performance with a Flexible Digital Hub Solution</h2>
      <p className="lead lead--wide">Traditional access solutions address only part of the problem. PHIL Digital Hub delivers an end-to-end access platform designed to maximize patient outcomes and optimize gross-to-net performance in retail and specialty-lite. We build flexible access programs that evolve with your brand, bringing together human-first care and AI-driven outcomes into one powerful solution.</p>
    </div>
    <div className="pillar-grid">
      <article className="pillar-card t1">
        <div className="pc-spacer"></div>
        <div className="pc-title-row">
          <h3>Direct-to-Patient &amp; Program Flexibility</h3>
        </div>
        <p>Experience total flexibility to build coverage, cash-pay, or hybrid models. With custom program design and AI-driven workflows, expand your brand’s reach with our integrated Direct-to-Patient platform that seamlessly connects your brand assets into a hub, expanding intake, routing, and dispense options.</p>
      </article>
      <article className="pillar-card t2">
        <div className="pc-spacer"></div>
        <div className="pc-title-row">
          <h3>Advanced Digital Hub &amp; PA Process</h3>
        </div>
        <p>Maximize covered dispenses with PHIL’s digital hub and proprietary PA process. We help verify coverage needs and provide support for easy prior authorization submission, with a simple prescribing process that keeps HCPs in their existing workflows and provides timely updates, education, and support to drive ongoing engagement.</p>
      </article>
      <article className="pillar-card t3">
        <div className="pc-spacer"></div>
        <div className="pc-title-row">
          <h3>Pharmacy Network &amp; Fulfillment</h3>
        </div>
        <p>Leverage our nationwide dispense network with 99%+ plan coverage, streamlined wholesale distribution, and PHIL’s in-house cash pharmacy services. Our fully managed pharmacy network enables greater patient reach, transparent pricing with free shipping, and an optimal dispense experience for patients and brands.</p>
      </article>
      <article className="pillar-card t4">
        <div className="pc-spacer"></div>
        <div className="pc-title-row">
          <h3>End-to-End Data &amp; Insights</h3>
        </div>
        <p>Drive brand performance by connecting data from first touch through intake, fulfillment, and adherence. Leverage our AI-powered dashboards to surface commercial opportunities and reduce access friction, and partner with our dedicated PHIL Client Insights team to translate in-depth performance data into strategic program optimizations.</p>
      </article>
    </div>
    <div className="pillar-cta-row">
      <Link className="pillar-link" to="/solution/direct/">
        <span className="pl-text">Explore PHIL Direct</span>
        <span className="pl-arrow" aria-hidden="true"><svg viewBox="0 0 30 16"><path d="M1 8h25M21 3l5 5-5 5" /></svg></span>
      </Link>
    </div>
  </div>
</section>
);
