import React from 'react';
import philLogo from 'assets/images/phil-logo-green.png';

export const DataTabsSection: React.FC = () => (

<section id="data" className="band" data-screen-label="06 Data & Insights">
  <div className="xl-container">
    <div className="section-head">
      <h2 className="h2--full">Turn End-to-End Program Visibility into Stronger Patient Outcomes and Brand Performance</h2>
      <p className="lead lead--wide">Gain end-to-end visibility into the entire prescription journey, with AI-powered data capabilities that uncover improvement opportunities across patient engagement, market access, and payer dynamics. PHIL’s Client Insights Team serves as your dedicated strategic partner, delivering targeted recommendations to continually optimize brand performance.</p>
    </div>

    <div className="dx-wrap">
      <div className="di-pills" role="tablist" aria-label="Dashboard views">
        <button className="di-pill is-active" type="button" data-i="0" data-slug="ai-powered-insights" role="tab" aria-selected="true">Gain AI-Powered Insights</button>
        <button className="di-pill" type="button" data-i="1" data-slug="field-hcp-performance" role="tab" aria-selected="false">Elevate Field &amp; HCP Performance</button>
        <button className="di-pill" type="button" data-i="2" data-slug="script-quality" role="tab" aria-selected="false">Optimize Script Quality</button>
        <button className="di-pill" type="button" data-i="3" data-slug="end-to-end-visibility" role="tab" aria-selected="false">Access End-to-End Visibility</button>
      </div>

      <div className="di-stage">
        <div className="di-track" id="dxTrack">

          <article className="di-card" data-i="1" role="tabpanel">
            <div className="di-viz">
              <div className="dx-shot">
                <div className="sq-table-wrap sq-hcp sq-grouped sq-wide">
                  <table className="sq-table">
                    <thead>
                      <tr>
                        <th>Territory / Provider</th>
                        <th>Weekly NRx</th>
                        <th>Enrollment</th>
                        <th>PA Approvals</th>
                        <th>Refill Rate</th>
                        <th>PA Submissions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="sq-group"><td>Atlanta West, GA</td><td className="sq-avg"><span className="sq-avg-circle">97</span></td><td className="sq-avg"><span className="sq-avg-box">87%</span></td><td className="sq-avg"><span className="sq-avg-box">90%</span></td><td className="sq-avg"><span className="sq-avg-box">84%</span></td><td className="sq-avg"><span className="sq-avg-box">90%</span></td></tr>
                      <tr><td>Dr. Lauren Murray</td><td><span className="sq-circle">150</span></td><td><span className="sq-pill low">93%</span></td><td><span className="sq-pill low">93%</span></td><td><span className="sq-pill low sq-pop p1">96%</span></td><td><span className="sq-pill low">98%</span></td></tr>
                      <tr className="sq-alt"><td>Dr. Paul Brenner</td><td><span className="sq-circle">62</span></td><td><span className="sq-pill low">86%</span></td><td><span className="sq-pill low sq-pop p2">89%</span></td><td><span className="sq-pill high">68%</span></td><td><span className="sq-pill mid">75%</span></td></tr>
                      <tr><td>Dr. Kim Marshall</td><td><span className="sq-circle">78</span></td><td><span className="sq-pill mid sq-pop p3">83%</span></td><td><span className="sq-pill low">88%</span></td><td><span className="sq-pill low">88%</span></td><td><span className="sq-pill low">97%</span></td></tr>
                    </tbody>
                  </table>
                  <div className="sq-legend">
                    <span><i className="low"></i> Above 85%</span>
                    <span><i className="mid"></i> 70–85%</span>
                    <span><i className="high"></i> Below 70%</span>
                  </div>
                </div>
              </div>
              <div className="tq-pop">
                <div className="tq-head"><div className="tq-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.6c.5 5.2 3.9 8.6 9.1 9.1-5.2.5-8.6 3.9-9.1 9.1-.5-5.2-3.9-8.6-9.1-9.1 5.2-.5 8.6-3.9 9.1-9.1z" /></svg></div><div className="tq-headtext"><span className="tq-eyebrow">PHIL AI Insights</span><span className="tq-title">Optimization Opportunity</span></div></div>
                <p className="tq-body"><b>Atlanta West, GA</b> is up <span className="tq-hl">134%</span> in NRx this quarter, but 3 high-volume prescribers haven’t enrolled a patient in 30+ days.</p>
              </div>
            </div>
            <div className="di-copy">
              <h3>Elevate Field Performance and HCP Engagement</h3>
              <p className="di-body">PHIL’s integrated portal provides territory-level visibility into script quality, enrollment, and prescriber engagement, helping field teams identify success drivers and accelerate patient access.</p>
            </div>
          </article>

          <article className="di-card" data-i="2" role="tabpanel">
            <div className="di-viz">
              <div className="dx-shot">
                <div className="sq-table-wrap">
                  <table className="sq-table">
                    <thead>
                      <tr>
                        <th>Territory</th>
                        <th>% Missing Script Info</th>
                        <th>% Missing ICD-10</th>
                        <th>% Missing Sig</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Hartford West, CT</td><td><span className="sq-pill low sq-pop p1">2%</span></td><td><span className="sq-pill low">1%</span></td><td><span className="sq-pill low">1%</span></td></tr>
                      <tr><td>West Palm, FL</td><td><span className="sq-pill high">10%</span></td><td><span className="sq-pill high">6%</span></td><td><span className="sq-pill mid">4%</span></td></tr>
                      <tr><td>Atlanta West, GA</td><td><span className="sq-pill high">8%</span></td><td><span className="sq-pill mid">3%</span></td><td><span className="sq-pill mid sq-pop p2">5%</span></td></tr>
                      <tr><td>Irvine, CA</td><td><span className="sq-pill low sq-pop p3">1%</span></td><td><span className="sq-pill low">0%</span></td><td><span className="sq-pill low">1%</span></td></tr>
                      <tr><td>Oklahoma, OK</td><td><span className="sq-pill mid">5%</span></td><td><span className="sq-pill low">2%</span></td><td><span className="sq-pill mid">3%</span></td></tr>
                    </tbody>
                  </table>
                  <div className="sq-legend">
                    <span><i className="low"></i> Below 3%</span>
                    <span><i className="mid"></i> 3–5%</span>
                    <span><i className="high"></i> Above 5%</span>
                  </div>
                </div>
              </div>
              <div className="tq-pop">
                <div className="tq-head"><div className="tq-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.6c.5 5.2 3.9 8.6 9.1 9.1-5.2.5-8.6 3.9-9.1 9.1-.5-5.2-3.9-8.6-9.1-9.1 5.2-.5 8.6-3.9 9.1-9.1z" /></svg></div><div className="tq-headtext"><span className="tq-eyebrow">PHIL AI Insights</span><span className="tq-title">Optimization Opportunity</span></div></div>
                <p className="tq-body">Missing script information has gone down <span className="tq-hl">13%</span> in the last 30 days.</p>
              </div>
            </div>
            <div className="di-copy">
              <h3>Optimize Script Quality</h3>
              <p className="di-body">PHIL monitors incoming scripts with AI-driven quality checks to identify missing payer-required details and gives field teams insight into coverage gaps, while ensuring complete and accurate information maximizes support for payer-covered access to therapy.</p>
            </div>
          </article>

          <article className="di-card" data-i="3" role="tabpanel">
            <div className="di-viz">
              <div className="dx-shot">
                <div className="jt-wrap">
                  <div className="jt-track">
                    <div className="jt-ext jt-ext-left" aria-hidden="true"><i></i><i></i><i></i></div>
                    <div className="jt-ext jt-ext-right" aria-hidden="true"><i></i><i></i><i></i></div>

                    <div className="jt-col jt-above">
                      <div className="jt-visual"><div className="jt-insight" style={{'--jt-shift': '49px'}}><div className="jt-ins-head"><span className="jt-ins-ico"><svg viewBox="0 0 24 24"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 00-4.2 12.6c.5.4.8 1 .9 1.6l.1.8h6.4l.1-.8c.1-.6.4-1.2.9-1.6A7 7 0 0012 2z" /></svg></span><span className="jt-ins-ey">Insight</span></div><div className="jt-ins-tx"><span className="jt-tx-d">Understand intake channel conversion</span><span className="jt-tx-m">View intake conversion</span></div>
                      </div><div className="jt-circle"><span className="jt-icon">
                        <svg viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M5 4h2a2 2 0 012 2v0a2 2 0 002 2h2a2 2 0 002-2v0a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></svg>
                      </span></div></div>
                      <div className="jt-stem"></div>
                      <div className="jt-dot"></div>
                      <div className="jt-label">Intake</div>
                    </div>

                    <div className="jt-col jt-below">
                      <div className="jt-label">Patient Appointment</div>
                      <div className="jt-dot"></div>
                      <div className="jt-stem"></div>
                      <div className="jt-visual"><div className="jt-circle"><span className="jt-icon">
                        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5" /><line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5" /><line x1="16" y1="14" x2="16" y2="14" strokeWidth="2.5" /></svg>
                      </span></div></div>
                    </div>

                    <div className="jt-col jt-above">
                      <div className="jt-visual"><div className="jt-circle"><span className="jt-icon">
                        <svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="5" rx="1.5" /><rect x="5" y="7" width="14" height="15" rx="2" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="12" y1="11" x2="12" y2="17" /></svg>
                      </span></div></div>
                      <div className="jt-stem"></div>
                      <div className="jt-dot"></div>
                      <div className="jt-label">Prescription Generation</div>
                      <div className="jt-insight jt-insight--flip" style={{'--jt-shift': '-133px'}}><div className="jt-ins-head"><span className="jt-ins-ico"><svg viewBox="0 0 24 24"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 00-4.2 12.6c.5.4.8 1 .9 1.6l.1.8h6.4l.1-.8c.1-.6.4-1.2.9-1.6A7 7 0 0012 2z" /></svg></span><span className="jt-ins-ey">Insight</span></div><div className="jt-ins-tx">Analyze provider adoption</div></div>
                    </div>

                    <div className="jt-col jt-below">
                      <div className="jt-label">Prescriber Engagement</div>
                      <div className="jt-dot"></div>
                      <div className="jt-stem"></div>
                      <div className="jt-visual"><div className="jt-circle"><span className="jt-icon">
                        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /><line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="12" y2="14" /></svg>
                      </span></div></div>
                      <div className="jt-insight jt-insight--top" style={{'--jt-shift': '45px', top: '-104px'}}><div className="jt-ins-head"><span className="jt-ins-ico"><svg viewBox="0 0 24 24"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 00-4.2 12.6c.5.4.8 1 .9 1.6l.1.8h6.4l.1-.8c.1-.6.4-1.2.9-1.6A7 7 0 0012 2z" /></svg></span><span className="jt-ins-ey">Insight</span></div><div className="jt-ins-tx">Track payer responses</div></div>
                    </div>

                    <div className="jt-col jt-above">
                      <div className="jt-visual"><div className="jt-circle"><span className="jt-icon">
                        <svg viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 4.4-3.1 8.5-7 10C8.1 20.5 5 16.4 5 12V6l7-4z" /><polyline points="9 12 11 14 15 10" /></svg>
                      </span></div></div>
                      <div className="jt-stem"></div>
                      <div className="jt-dot"></div>
                      <div className="jt-label">Prior Authorization</div>
                    </div>

                    <div className="jt-col jt-below">
                      <div className="jt-label">Affordability Navigation</div>
                      <div className="jt-dot"></div>
                      <div className="jt-stem"></div>
                      <div className="jt-visual"><div className="jt-insight" style={{'--jt-shift': '-137px'}}><div className="jt-ins-head"><span className="jt-ins-ico"><svg viewBox="0 0 24 24"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 00-4.2 12.6c.5.4.8 1 .9 1.6l.1.8h6.4l.1-.8c.1-.6.4-1.2.9-1.6A7 7 0 0012 2z" /></svg></span><span className="jt-ins-ey">Insight</span></div><div className="jt-ins-tx">Get visibility into program utilization</div></div><div className="jt-circle"><span className="jt-icon">
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M15 9h-4.5a1.75 1.75 0 0 0 0 3.5h3a1.75 1.75 0 0 1 0 3.5H9" /><path d="M12 7.25v9.5" /></svg>
                      </span></div></div>
                    </div>

                    <div className="jt-col jt-above">
                      <div className="jt-visual"><div className="jt-circle"><span className="jt-icon">
                        <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><polyline points="16 2 12 7 8 2" /><line x1="2" y1="12" x2="22" y2="12" /></svg>
                      </span></div></div>
                      <div className="jt-stem"></div>
                      <div className="jt-dot"></div>
                      <div className="jt-label">Shipping &amp; Dispensing</div>
                    </div>

                    <div className="jt-col jt-below">
                      <div className="jt-label">Refills</div>
                      <div className="jt-dot"></div>
                      <div className="jt-stem"></div>
                      <div className="jt-visual"><div className="jt-circle"><span className="jt-icon">
                        <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>
                      </span></div></div>
                      <div className="jt-insight jt-insight--flip" style={{'--jt-shift': '-8px', top: '-104px'}}><div className="jt-ins-head"><span className="jt-ins-ico"><svg viewBox="0 0 24 24"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 00-4.2 12.6c.5.4.8 1 .9 1.6l.1.8h6.4l.1-.8c.1-.6.4-1.2.9-1.6A7 7 0 0012 2z" /></svg></span><span className="jt-ins-ey">Insight</span></div><div className="jt-ins-tx">Spot drop-off points</div></div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="tq-pop">
                <div className="tq-head"><div className="tq-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.6c.5 5.2 3.9 8.6 9.1 9.1-5.2.5-8.6 3.9-9.1 9.1-.5-5.2-3.9-8.6-9.1-9.1 5.2-.5 8.6-3.9 9.1-9.1z" /></svg></div><div className="tq-headtext"><span className="tq-eyebrow">PHIL AI Insights</span><span className="tq-title">Optimization Opportunity</span></div></div>
                <p className="tq-body">Refill adherence is up <span className="tq-hl">32%</span> over the last 60 days.</p>
              </div>
            </div>
            <div className="di-copy">
              <h3>Support the Entire Patient Journey with End-to-End Visibility</h3>
              <p className="di-body">PHIL captures the full script journey in one unified data stream, from intake through delivery, and adherence, giving brands clear visibility to optimize performance at every step.</p>
            </div>
          </article>

          <article className="di-card is-active" data-i="0" role="tabpanel">
            <div className="di-viz">
              <div className="aid-visual">
                <div className="aid-card aid-dash">
                  <div className="aid-head"><img src={philLogo} alt="PHIL" /></div>
                  <div className="aid-feat">
                    <div className="aid-feat-label">NRx</div>
                    <div className="aid-feat-row">
                      <div className="aid-feat-val">24,815</div>
                      <span className="aid-delta aid-feat-growth"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 14 12 8 18 14" /></svg>156%+</span>
                    </div>
                    <svg className="aid-bars" viewBox="0 0 294 54" preserveAspectRatio="none">
                      <rect x="0" y="46" width="22" height="8" rx="2" fill="#6DDFC1" />
                      <rect x="34" y="41" width="22" height="13" rx="2" fill="#6DDFC1" />
                      <rect x="68" y="43" width="22" height="11" rx="2" fill="#6DDFC1" />
                      <rect x="102" y="36" width="22" height="18" rx="2" fill="#5ABEA4" />
                      <rect x="136" y="30" width="22" height="24" rx="2" fill="#5ABEA4" />
                      <rect x="170" y="24" width="22" height="30" rx="2" fill="#5ABEA4" />
                      <rect x="204" y="17" width="22" height="37" rx="2" fill="#00827E" />
                      <rect x="238" y="9" width="22" height="45" rx="2" fill="#00827E" />
                      <rect x="272" y="4" width="22" height="50" rx="2" fill="#00615E" />
                    </svg>
                  </div>
                  <div className="aid-list">
                    <div className="aid-row"><span className="aid-row-label">Patient Starts</span><span className="aid-row-right"><span className="aid-row-val">94%</span><span className="aid-row-delta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 14 12 8 18 14" /></svg>88%</span></span></div>
                    <div className="aid-row"><span className="aid-row-label">PA Submissions</span><span className="aid-row-right"><span className="aid-row-val">87%</span><span className="aid-row-delta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 14 12 8 18 14" /></svg>67%</span></span></div>
                    <div className="aid-row"><span className="aid-row-label">Covered Dispenses</span><span className="aid-row-right"><span className="aid-row-val">92%</span><span className="aid-row-delta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 14 12 8 18 14" /></svg>34%</span></span></div>
                    <div className="aid-row"><span className="aid-row-label">Refill Adherence</span><span className="aid-row-right"><span className="aid-row-val">84%</span><span className="aid-row-delta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 14 12 8 18 14" /></svg>19%</span></span></div>
                  </div>
                </div>

                <div className="aid-card aid-ai" id="aidAi">
                  <div className="aid-ai-head">
                    <div className="tq-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.6c.5 5.2 3.9 8.6 9.1 9.1-5.2.5-8.6 3.9-9.1 9.1-.5-5.2-3.9-8.6-9.1-9.1 5.2-.5 8.6-3.9 9.1-9.1z" /></svg></div>
                    <div className="tq-headtext"><span className="tq-eyebrow">PHIL AI Insights</span><span className="tq-title">Optimization Opportunity</span></div>
                  </div>
                  <div className="aid-msg">
                    <span className="aid-q">"What's driving the lift in NRx?"</span>
                    <span className="aid-dots"><i></i><i></i><i></i></span>
                    <span className="aid-answer"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="di-copy">
              <h3>Gain AI-Driven Insights into Brand Performance</h3>
              <p className="di-body">PHIL's program dashboards give you end-to-end insights into your brand's performance, with a built-in agent that surfaces actionable program insights in real time.</p>
            </div>
          </article>

        </div>
      </div>

    </div>
  </div>
</section>
);
