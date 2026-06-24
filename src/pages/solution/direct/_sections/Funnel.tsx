import React from "react";
import { Link } from "gatsby";

export const FunnelSection: React.FC = () => (
  <section className="band band-funnel funnel-section" data-screen-label="05 Full-Funnel Visibility">
    <div className="xl-container">
      <div className="section-head section-head--center">
        <h2>Transform Full-Funnel Visibility Into Measurable Commercial Impact</h2>
        <p className="lead">
          PHIL gives manufacturers real-time, end-to-end visibility across the
          prescription journey, from first engagement through fulfillment and
          adherence. Brands can see which channels drive patients to initiate
          care, monitor appointment completion, and link new prescriptions back
          to their originating source. This unified foundation enables proactive
          identification of friction points, continuous optimization, and tighter
          alignment between commercial strategy and outcomes.
        </p>
      </div>

      <div className="insights-card">
        <h3 className="insights-title">Full-Funnel Program Insights</h3>

        <div className="it-tabs" role="tablist" aria-label="Program insight sections">
          <button type="button" className="it-tab is-active" role="tab" aria-selected="true" data-panel="funnel" id="ittab-funnel">
            <span className="it-tab-label">Explore End-to-End Journey Data</span>
          </button>
          <button type="button" className="it-tab" role="tab" aria-selected="false" data-panel="metrics" id="ittab-metrics">
            <span className="it-tab-label">Access Key Metrics</span>
          </button>
          <button type="button" className="it-tab" role="tab" aria-selected="false" data-panel="ai" id="ittab-ai">
            <span className="it-tab-label">Leverage AI Insights</span>
          </button>
        </div>

        <div className="it-stage">
          {/* AI Insights */}
          <div className="it-panel" role="tabpanel" aria-labelledby="ittab-ai" data-panel="ai" hidden>
            <div className="ai-shell">
              <div className="ai-card ai-card--full">
                <div className="ai-head">
                  <span className="ai-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M12 1.6l1.95 6.45L20.4 10l-6.45 1.95L12 18.4l-1.95-6.45L3.6 10l6.45-1.95L12 1.6z" />
                      <path d="M18.6 14.4l.75 2.45L21.8 17.6l-2.45.75L18.6 20.8l-.75-2.45L15.4 17.6l2.45-.75L18.6 14.4z" />
                    </svg>
                  </span>
                  <p className="ai-eyebrow">PHIL AI Insights</p>
                </div>
                <p className="ai-title">Optimization Opportunity</p>
                <p className="ai-text" data-typewriter>
                  Speed to First Fill rate increased 28% after implementing the
                  new bridge program.
                </p>
              </div>
              <p className="ai-aside">
                PHIL's AI-powered program dashboard leverages a built-in agent
                that helps surface actionable program insights across the
                patient's journey.
              </p>
            </div>
          </div>

          {/* Patient Journey funnel */}
          <div className="it-panel" role="tabpanel" aria-labelledby="ittab-funnel" data-panel="funnel">
            <div className="funnel-card funnel-card--full">
              <div className="funnel-head">
                <h4>Follow the Patient Journey</h4>
                <span className="fh-plus" aria-hidden="true">
                  +
                </span>
                <p className="fi-title">Access Data to Identify</p>
              </div>
              <div className="funnel-layout">
                <div className="funnel">
                  <div className="funnel-seg s1">Patient Clicks</div>
                  <div className="funnel-seg s2">Doctor Appts</div>
                  <div className="funnel-seg s3">Prescriptions</div>
                  <div className="funnel-seg s4">Covered Dispenses</div>
                  <div className="funnel-seg s5">Refills</div>
                </div>
                <div className="funnel-insights">
                  <ul className="fi-list">
                    <li className="fi-item">
                      <span className="fi-check">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <polyline points="5 12 10 17 19 7" />
                        </svg>
                      </span>
                      <span className="fi-text">Drop-off points</span>
                    </li>
                    <li className="fi-item">
                      <span className="fi-check">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <polyline points="5 12 10 17 19 7" />
                        </svg>
                      </span>
                      <span className="fi-text">Friction areas</span>
                    </li>
                    <li className="fi-item">
                      <span className="fi-check">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <polyline points="5 12 10 17 19 7" />
                        </svg>
                      </span>
                      <span className="fi-text">Affordability impact</span>
                    </li>
                    <li className="fi-item">
                      <span className="fi-check">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <polyline points="5 12 10 17 19 7" />
                        </svg>
                      </span>
                      <span className="fi-text">Adherence trends</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="it-panel" role="tabpanel" aria-labelledby="ittab-metrics" data-panel="metrics" hidden>
            <div className="ifm-list ifm-list--full">
              <div className="ifm-card">
                <div className="ifm-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    <path d="M13 13l6 6" />
                  </svg>
                </div>
                <div className="ifm-body">
                  <p className="ifm-label">Patient Drop-off Rate</p>
                  <div className="ifm-value ifm-nocount" id="dropoffValue">
                    <span className="dropoff-num">0%</span>
                    <span className="dropoff-arrow" aria-hidden="true" hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 7 8.5 13.5 13.5 8.5 22 17" />
                        <polyline points="16 17 22 17 22 11" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="ifm-card">
                <div className="ifm-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <polyline points="9 16 11 18 15 14" />
                  </svg>
                </div>
                <div className="ifm-body">
                  <p className="ifm-label">Consultation with Prescription to Enrollment Rate</p>
                  <div className="ifm-value ifm-nocount" id="enrollValue">
                    <span className="dropoff-num">0%</span>
                    <span className="dropoff-arrow" aria-hidden="true" hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 17 8.5 10.5 13.5 15.5 22 7" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="ifm-card">
                <div className="ifm-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div className="ifm-body">
                  <p className="ifm-label">Speed to First Fill Rate</p>
                  <div className="ifm-value ifm-nocount" id="speedValue">
                    <span className="dropoff-num">0%</span>
                    <span className="dropoff-arrow" aria-hidden="true" hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2 17 8.5 10.5 13.5 15.5 22 7" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="it-dots" aria-hidden="true">
          <button className="it-dot is-active" data-panel="funnel" tabIndex={-1} />
          <button className="it-dot" data-panel="metrics" tabIndex={-1} />
          <button className="it-dot" data-panel="ai" tabIndex={-1} />
        </div>
      </div>

      <div className="funnel-cta">
        <Link className="btn-text" to="/solution/core/">
          Access Full End-to-End Data Insights{" "}
          <svg viewBox="0 0 28 24" aria-hidden="true">
            <line x1="2" y1="12" x2="23" y2="12" />
            <polyline points="17 6 23 12 17 18" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);
