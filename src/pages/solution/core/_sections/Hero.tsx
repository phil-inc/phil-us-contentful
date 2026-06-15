import React from 'react';
import networkMap from '../assets/network-map.png';
import philLogo from 'assets/images/phil-logo-green.png';

export const HeroSection: React.FC = () => (

<section className="hero" data-screen-label="01 Introduction">
  <div className="xl-container hero-inner">
    <div className="hero-copy">
      <p className="eyebrow">PHIL Digital Hub</p>
      <h1>An End-to-End Access Solution that Maximizes <em>Commercial Success</em></h1>
      <p className="lead">PHIL combines a flexible digital hub, integrated pharmacy network, and script-level data to help brands improve patient outcomes while driving stronger commercial performance. By bringing these capabilities together, PHIL enables more efficient patient access, better adherence, and greater economic impact.</p>
      <div className="hero-cta-row">
        <a className="btn-primary" href="/demo">Book Demo</a>
      </div>
    </div>
    <div className="hero-art">
      <div className="hub">
        <div className="hub-inner" id="hubInner">
          <svg className="hub-ring" viewBox="0 0 500 500" aria-hidden="true">
            <circle className="ring-faint" cx="250" cy="250" r="215"></circle>
            <circle className="ring-inner" cx="250" cy="250" r="166"></circle>
            <circle className="ring-arc" cx="250" cy="250" r="215"></circle>
          </svg>

          <div className="hub-card hub-c1 hub-phone">
            <div className="hub-bezel">
              <div className="hub-ph-notch"></div>
              <div className="hub-screen">
                <div className="hub-ph-brand"><span className="hub-ph-logo">PHILRx</span></div>
                <div className="hub-ph-divider"></div>
                <h4 className="hub-ph-title">My prescriptions</h4>
                <div className="hub-ph-actions">
                  <div className="hub-ph-row"><span className="hub-ph-check"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg></span><span>Transparent Cost</span></div>
                  <div className="hub-ph-row"><span className="hub-ph-check"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg></span><span>Fast Shipping</span></div>
                  <div className="hub-ph-row"><span className="hub-ph-check"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg></span><span>Easy Management</span></div>
                </div>
                <div className="hub-ph-cta"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg><span>Get started</span></div>
              </div>
            </div>
          </div>

          <div className="hub-card hub-c2 hub-map">
            <div className="hub-map-stage">
              <img src={networkMap} alt="Nationwide pharmacy network — 50 states, 99%+ plan coverage" />
              <span className="hub-mdot" style={{left: '20.0%', top: '16.0%', animationDelay: '0s'}}></span>
              <span className="hub-mdot" style={{left: '51.4%', top: '23.8%', animationDelay: '0.4s'}}></span>
              <span className="hub-mdot" style={{left: '30.0%', top: '29.8%', animationDelay: '0.8s'}}></span>
              <span className="hub-mdot" style={{left: '61.0%', top: '30.9%', animationDelay: '1.2s'}}></span>
              <span className="hub-mdot" style={{left: '83.2%', top: '34.1%', animationDelay: '1.6s'}}></span>
              <span className="hub-mdot" style={{left: '10.8%', top: '41.5%', animationDelay: '2.0s'}}></span>
              <span className="hub-mdot" style={{left: '59.7%', top: '42.5%', animationDelay: '2.4s'}}></span>
              <span className="hub-mdot" style={{left: '41.4%', top: '46.6%', animationDelay: '0.6s'}}></span>
              <span className="hub-mdot" style={{left: '71.0%', top: '57.0%', animationDelay: '1.0s'}}></span>
              <span className="hub-mdot" style={{left: '30.0%', top: '58.9%', animationDelay: '1.4s'}}></span>
              <span className="hub-mdot" style={{left: '15.5%', top: '59.3%', animationDelay: '1.8s'}}></span>
              <span className="hub-mdot" style={{left: '58.3%', top: '68.2%', animationDelay: '2.2s'}}></span>
              <span className="hub-mdot" style={{left: '76.6%', top: '68.2%', animationDelay: '2.6s'}}></span>
              <span className="hub-mdot" style={{left: '42.4%', top: '70.1%', animationDelay: '0.2s'}}></span>
              <span className="hub-mdot" style={{left: '76.7%', top: '80.8%', animationDelay: '1.5s'}}></span>
              <div className="hub-map-badge"><span className="b1">99%+</span><span className="b2">Plan Coverage</span></div>
            </div>
          </div>

          <div className="hub-card hub-c3 hub-dash">
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
          </div>

          <div className="hub-card hub-c4 hub-ai" id="hubAi">
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
    </div>
  </div>
</section>
);
