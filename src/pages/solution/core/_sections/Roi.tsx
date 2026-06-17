import React from 'react';
import { Link } from 'gatsby';

export const RoiSection: React.FC = () => (

<section className="band muted roi-band" data-screen-label="09 ROI Calculator">
  <div className="xl-container">
    <div className="roi-banner">
      <div className="roi-text">
        <h2>Calculate your GTN Performance Potential with PHIL</h2>
        <p>The calculator was build by Phil's Commercial Insights architects to translate our sophisticated GTN modeling to provide a clear view into a brand's GTN potential.</p>
      <Link className="btn-primary" to="/gtn/">Calculate Your Potential <span className="arr" aria-hidden="true"></span></Link>
      </div>
      <div className="calc-preview">
        <div className="calc-card-stack">
          <div className="calc-mini"><p className="l">New Scripts</p><p className="v">1,240<small>/ mo</small></p></div>
          <div className="calc-mini"><p className="l">Covered Dispenses</p><p className="v">2x+</p></div>
          <div className="calc-mini"><p className="l">PA Submission</p><p className="v">90%+</p></div>
          <div className="calc-mini"><p className="l">GTN Lift</p><p className="v">3x+</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
);
