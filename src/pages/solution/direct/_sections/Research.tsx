import React from "react";
import { Link } from "gatsby";

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="4" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

export const ResearchSection: React.FC = () => (
  <section className="band research-section" data-screen-label="08 Patient & Provider Needs">
    <div className="xl-container">
      <div className="section-head section-head--center research-head">
        <h2>What Patients and Providers Want From Pharma's DTP Programs</h2>
        <p className="lead">
          PHIL conducted first-party research with over 1,000 U.S. patients and
          200+ healthcare providers to better understand what&rsquo;s driving
          medication access, abandonment, and adherence, revealing key insights
          for designing more effective DTP programs.
        </p>
      </div>

      <div className="report-grid">
        <article className="report-card">
          <div className="rc-head">
            <div className="rc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="9" cy="7" r="3.6" />
                <path d="M2.5 21c0-3.8 2.9-6.2 6.5-6.2s6.5 2.4 6.5 6.2" />
                <path d="M16 3.8a3.6 3.6 0 0 1 0 6.6" />
                <path d="M21.5 21c0-2.9-1.6-5-4.2-5.8" />
              </svg>
            </div>
            <p className="rc-eyebrow">Patient Research</p>
          </div>
          <h3>What Pharma Needs to Know About Today's Patients</h3>
          <p>
            PHIL surveyed 1,049 U.S. patients. The findings highlight the most
            pressing needs, challenges, and preferences of today's patients, and
            what the next generation of DTP programs must deliver.
          </p>
          <Link className="rc-link" to="/dtp-research/">
            Read Report <Arrow />
          </Link>
        </article>

        <div className="research-mid">
          <p className="metric-label">Key Findings From Patients</p>
          <div
            className="metric-wrap"
            tabIndex={0}
            aria-roledescription="carousel"
            aria-label="Key research findings"
          >
            <button className="mc-nav prev" type="button" aria-label="Previous finding">
              <svg viewBox="0 0 24 24">
                <polyline points="15 5 8 12 15 19" />
              </svg>
            </button>
            <div className="mc-stage">
              <article className="mc-card">
                <p className="mc-stat">32%</p>
                <p className="mc-text">
                  of patients want a fully online or hybrid medication access
                  experience
                </p>
              </article>
              <article className="mc-card">
                <p className="mc-stat">65%</p>
                <p className="mc-text">
                  would use DTP programs if they offer the lowest medication cost
                </p>
              </article>
              <article className="mc-card">
                <p className="mc-stat">95%</p>
                <p className="mc-text">
                  of patients want DTP programs to mirror ecommerce experiences
                </p>
              </article>
              <article className="mc-card">
                <p className="mc-stat">1 in 3</p>
                <p className="mc-text">
                  patients won't pursue a medication they're interested in if
                  they can't go through their preferred access experience
                </p>
              </article>
            </div>
            <button className="mc-nav next" type="button" aria-label="Next finding">
              <svg viewBox="0 0 24 24">
                <polyline points="9 5 16 12 9 19" />
              </svg>
            </button>
            <div className="mc-dots" role="tablist" aria-label="Select finding">
              <button className="mc-dot is-active" type="button" aria-label="Finding 1" />
              <button className="mc-dot" type="button" aria-label="Finding 2" />
              <button className="mc-dot" type="button" aria-label="Finding 3" />
              <button className="mc-dot" type="button" aria-label="Finding 4" />
            </div>
          </div>
        </div>

        <article className="report-card">
          <div className="rc-head">
            <div className="rc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M9 3.5h6v3H9z" />
                <rect x="5" y="5" width="14" height="16" rx="2.5" />
                <path d="M8.5 13l2 2 4.5-4.5" />
              </svg>
            </div>
            <p className="rc-eyebrow">Provider Research</p>
          </div>
          <h3>What HCPs Think About Pharma's Direct-to-Patient Programs</h3>
          <p>
            New research from PHIL uncovers what healthcare providers need from
            pharma's digital access and direct-to-patient programs, and what
            pharma can do to improve patient outcomes.
          </p>
          <Link className="rc-link" to="/hcp-research/">
            Read Report <Arrow />
          </Link>
        </article>
      </div>
    </div>
  </section>
);
