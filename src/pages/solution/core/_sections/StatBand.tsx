import React from 'react';

export const StatBandSection: React.FC = () => (

<section className="stat-section" data-screen-label="02 Where Brands Win">
  <div className="stat-bar">
    <div className="xl-container">
      <div className="section-head stat-bar-head">
        <h2>Where Brands Win with PHIL</h2>
        <p className="lead" style={{maxWidth: 'none', whiteSpace: 'nowrap'}}>PHIL offers 10+ years experience building technology-driven access programs for branded retail and specialty-lite therapies.</p>
      </div>
    </div>
  </div>
  <div className="xl-container">
    <div className="stat-banner" id="statBanner">
      <div className="stat-item"><p className="stat-num" data-target="2" data-suffix="x+">2x+</p><p className="stat-label">Patient Starts <span className="stat-vs">vs. Traditional Channels</span></p></div>
      <div className="stat-item"><p className="stat-num" data-target="2" data-suffix="x+">2x+</p><p className="stat-label">Covered Dispenses <span className="stat-vs">vs. Traditional Channels</span></p></div>
      <div className="stat-item"><p className="stat-num" data-target="3" data-suffix="x+">3x+</p><p className="stat-label">Refill Adherence <span className="stat-vs">vs. Traditional Channels</span></p></div>
      <div className="stat-item"><p className="stat-num" data-target="3" data-suffix="x+">3x+</p><p className="stat-label">Gross-to-Net <span className="stat-vs">vs. Traditional Channels</span></p></div>
      <div className="stat-item"><p className="stat-num" data-target="4.8" data-decimals="1" data-suffix="/5.0">4.8/5.0</p><p className="stat-label">Patient Satisfaction Score</p>
        
        <div className="trustpilot-widget stat-trustpilot" data-locale="en-US" data-template-id="5406e65db0d04a09e042d5fc" data-businessunit-id="60e5837e95cb800001e58b14" data-style-height="28px" data-style-width="100%" data-token="aef95708-e9c9-48b3-a7b6-2defc6c49f2e">
          <a href="https://www.trustpilot.com/review/phil.us" target="_blank" rel="noopener">Trustpilot</a>
        </div>
        
      </div>
    </div>
  </div>
</section>
);
