import React from 'react';
import { Link } from 'gatsby';
import networkMap from '../assets/network-map.png';

export const JourneySection: React.FC = () => (

<section id="journey" className="band muted" data-screen-label="04 Prescription Journey">
  <div className="xl-container">
    <div className="jx2" id="jx2" style={{'--steps': '7'}}>
      <div className="jx2-track" id="jx2Track">
        <div className="jx2-triggers" id="jx2Triggers" aria-hidden="true">  
          <div className="jx2-spacer" style={{flex: '0 0 50vh'}}></div>
          <div className="jx2-trigger" data-i="0" style={{flex: '2.4 0 0'}}></div>
          <div className="jx2-trigger" data-i="1"></div>
          <div className="jx2-trigger" data-i="2"></div>
          <div className="jx2-trigger" data-i="3"></div>
          <div className="jx2-trigger" data-i="4"></div>
          <div className="jx2-trigger" data-i="5"></div>
          <div className="jx2-trigger" data-i="6"></div>
          <div className="jx2-spacer" style={{flex: '0 0 50vh'}}></div>
        </div>
        <div className="jx2-sticky">
          <div className="jx2-head">
            <h2>A Frictionless Path From Prescription to Fulfillment</h2>
            <p className="jx2-lead">PHIL Digital Hub is configured around your brand's unique patient population, payer landscape, and program goals. Work with our team to define the intake channels, pharmacy network, support model, and program economics that fit your strategy, and optimize as your program scales.</p>
          </div>
          <div className="jx2-grid">
              
              <div className="jx2-copy" id="jx2Copy">
                <p className="jx2-eyebrow jx2-anim">STEP <span id="jx2Num">1</span></p>
                <h3 className="jx2-anim" id="jx2Title">Versatile Intake</h3>
                <p className="jx2-anim" id="jx2Body">Seamless HCP workflow within existing EMRs, telemedicine intake, or prescription transfer requests.</p>
              </div>

              
              <div className="jx2-screen">
                <div className="jx2-frame" id="jx2Frame">
                  <div className="jx2-shot is-active" data-i="0"><div className="jx2-compose jx2-tele-compose">
                    <div className="th2-card" id="jx2ThCard">
                      <div className="jx-notch"></div>
                      <div className="th2-screen">
                        <div className="th2-brandrow"><span className="th2-brand">PHILRx</span><span className="th2-tagline">Rx at your fingertips</span></div>
                        <div className="th2-divider"></div>
                        <h4 className="th2-title">Telehealth Direct</h4>
                        <div className="th2-video">
                          <div className="th2-self"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0z" /></svg></div>
                          <div className="th2-avatar"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0z" /></svg></div>
                          <div className="th2-caption">
                            <div><p className="th2-name">Dr. Dhanang Prast</p><p className="th2-role">Telehealth</p></div>
                            <span className="th2-timer">06:11</span>
                          </div>
                        </div>
                        <div className="th2-controls">
                          <button className="th2-ctrl" type="button" aria-label="Chat"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></button>
                          <button className="th2-ctrl" type="button" aria-label="Speaker"><svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg></button>
                          <button className="th2-ctrl" type="button" aria-label="Mute microphone"><svg viewBox="0 0 24 24"><line x1="1" y1="1" x2="23" y2="23" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" /><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /><line x1="12" y1="19" x2="12" y2="23" /></svg></button>
                          <button className="th2-ctrl" type="button" aria-label="Video"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg></button>
                          <button className="th2-ctrl end" type="button" aria-label="End call"><svg viewBox="0 0 24 24"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" /><line x1="23" y1="1" x2="1" y2="23" /></svg></button>
                        </div>
                      </div>
                      <div className="jx2-erx-pop">
                      <div className="erx-head"><span>Send e-Prescription</span><span className="erx-x" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg></span></div>
                      <div className="erx-body">
                        <p className="erx-label">PHARMACY</p>
                        <div className="erx-select"><span>PhilRx</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></div>
                        <button className="erx-send" type="button">Send eRx</button>
                      </div>
                    </div>
                  </div></div></div>
                  <div className="jx2-shot" data-i="1"><div className="jx2-compose"><div className="phone-stage" id="jx2PhoneStage"><div className="phone">
                    <div className="jx-notch"></div>
                    <div className="phone-screen">
                      <div className="phone-brandrow"><span className="phone-brand">PHILRx</span><span className="phone-tagline">Rx at your fingertips</span></div>
                      <div className="bubble">Hi Sarah! Dr. Jones sent your Adaptrex® prescription to the PHILRx pharmacy. Tap below to get started.</div>
                      <div className="checks">
                        <div className="check-row"><span className="check">✓</span> Enroll in minutes</div>
                        <div className="check-row"><span className="check">✓</span> Fast, free shipping</div>
                        <div className="check-row"><span className="check">✓</span> Easy refills</div>
                      </div>
                      <div className="checks-spacer"></div>
                      <div className="phone-cta">Confirm &amp; Enroll</div>
                    </div>
                  </div></div></div></div>
                  <div className="jx2-shot" data-i="2"><div className="jx2-compose"><div className="rc-card" id="jx2RcCard">
                    <div className="rc-head">Flexible Routing &amp; Coverage Options</div>
                    <div className="rc-body">
                      <div className="rc-lead">Build patient access paths based on patient and brand needs.</div>
                      <button className="rc-option" type="button">
                        <span className="rc-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /></svg></span>
                        <span className="rc-opt-text"><span className="rc-opt-title">Insured</span><span className="rc-opt-sub">Covered, PA/Appeals, Copay Programs</span></span>
                      </button>
                      <button className="rc-option" type="button">
                        <span className="rc-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v8" /><path d="M8 12h8" /></svg></span>
                        <span className="rc-opt-text"><span className="rc-opt-title">Self-Pay</span><span className="rc-opt-sub">Cash program</span></span>
                      </button>
                      <button className="rc-option" type="button">
                        <span className="rc-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 11V6.5a1.5 1.5 0 0 0-3 0M15 10.5V5a1.5 1.5 0 0 0-3 0v1M12 6.5a1.5 1.5 0 0 0-3 0v6" /><path d="M9 12.5v-2a1.5 1.5 0 0 0-3 0v5.5a6 6 0 0 0 6 6h1.5a6 6 0 0 0 6-6V9.5a1.5 1.5 0 0 0-3 0V11" /></svg></span>
                        <span className="rc-opt-text"><span className="rc-opt-title">Other Non-Commercial</span><span className="rc-opt-sub">PAP, Bridge, Quick start</span></span>
                      </button>
                      <Link className="rc-start" to="/demo/">Get Started</Link>
                    </div>
                  </div></div></div>
                  <div className="jx2-shot" data-i="3"><div className="jx2-compose"><div className="tc-card" id="jx2TcCard">
                    <div className="jx-notch"></div>
                    <div className="tc-screen">
                      <div className="tc-brandrow"><span className="tc-brand">PHILRx</span><span className="tc-tagline">Rx at your fingertips</span></div>
                      <div className="tc-lead">We found your best price on Adaptrex®!</div>
                      <div className="tc-option">
                        <span className="tc-radio"></span>
                        <div><p className="tc-opt-title">Purchase a 30 Day Supply for $25</p><span className="tc-off">79% OFF</span></div>
                      </div>
                      <div className="tc-total"><span>Your total cost</span><span className="tc-amt">$25.00</span></div>
                      <div className="tc-gap"></div>
                      <button className="tc-next" type="button">Next</button>
                      <button className="tc-manage" type="button">Manage Prescription</button>
                    </div>
                  </div></div></div>
                  <div className="jx2-shot" data-i="4"><div className="jx2-compose"><div className="netmap" id="jx2NetMap">
                    <div className="nm-stage">
                      <img className="nm-img" src={networkMap} alt="Nationwide integrated pharmacy network — 50-state, 99%+ plan coverage" />
                      <div className="nm-badge" tabIndex="0"><span className="big">50-States</span><span className="amp">&amp;</span><span className="sub">99%+ Plan Coverage</span></div>
                      <span className="nm-pin" data-loc="ca-dc" style={{left: '10.8%', top: '41.5%'}}><span className="ring"></span></span>
                      <span className="nm-pin" data-loc="oh-dc" style={{left: '59.7%', top: '42.5%'}}><span className="ring"></span></span>
                      <span className="nm-pin" data-loc="oh-cash" style={{left: '71.0%', top: '57.0%'}}><span className="ring"></span></span>
                      <span className="nm-pin" data-loc="ky" style={{left: '58.3%', top: '68.2%'}}><span className="ring"></span></span>
                      <span className="nm-pin" data-loc="az" style={{left: '30.0%', top: '58.9%'}}><span className="ring"></span></span>
                      <span className="nm-dot" style={{left: '20.0%', top: '16.0%'}}></span>
                      <span className="nm-dot" style={{left: '51.4%', top: '23.8%'}}></span>
                      <span className="nm-dot" style={{left: '30.0%', top: '29.8%'}}></span>
                      <span className="nm-dot" style={{left: '61.0%', top: '30.9%'}}></span>
                      <span className="nm-dot" style={{left: '83.2%', top: '34.1%'}}></span>
                      <span className="nm-dot" style={{left: '10.8%', top: '41.5%'}}></span>
                      <span className="nm-dot" style={{left: '59.7%', top: '42.5%'}}></span>
                      <span className="nm-dot" style={{left: '41.4%', top: '46.6%'}}></span>
                      <span className="nm-dot" style={{left: '71.0%', top: '57.0%'}}></span>
                      <span className="nm-dot" style={{left: '30.0%', top: '58.9%'}}></span>
                      <span className="nm-dot" style={{left: '15.5%', top: '59.3%'}}></span>
                      <span className="nm-dot" style={{left: '58.3%', top: '68.2%'}}></span>
                      <span className="nm-dot" style={{left: '76.6%', top: '68.2%'}}></span>
                      <span className="nm-dot" style={{left: '42.4%', top: '70.1%'}}></span>
                      <span className="nm-dot" style={{left: '76.7%', top: '80.8%'}}></span>
                      <svg className="nm-lines" viewBox="0 0 1472 964" preserveAspectRatio="none" aria-hidden="true"><polyline className="nm-line2"></polyline><polyline className="nm-line1"></polyline></svg>
                    </div>
                    <div className="nm-legend">
                      <button className="nm-leg" type="button" data-loc="oh-dc ca-dc"><span className="nm-ico dark">P</span>PHIL Distribution Centers</button>
                      <button className="nm-leg" type="button" data-loc="ky oh-cash az"><span className="nm-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" /><circle cx="12" cy="9" r="2.6" fill="#fff" /></svg></span>PHIL Cash Pharmacies</button>
                      <button className="nm-leg" type="button" data-loc="network"><span className="nm-ico net"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" /><path d="M8.4 13.3l7.2 4.4M15.6 6.3l-7.2 4.4" /></svg></span>PHIL Pharmacy Partner Network</button>
                    </div>
                  </div></div></div>
                  <div className="jx2-shot" data-i="5"><div className="jx2-compose"><div className="sd-card" id="jx2SdCard">
                    <div className="jx-notch"></div>
                    <div className="sd-screen">
                      <div className="sd-brandrow"><span className="sd-brand">PHILRx</span><span className="sd-tagline">Rx at your fingertips</span></div>
                      <p className="sd-title">My prescriptions</p>
                      <div className="sd-rx">
                        <p className="sd-rx-name">Adaptrex®</p>
                        <p className="sd-rx-refills">3 refills remaining</p>
                        <p className="sd-rx-choose">Choose your preferred delivery option</p>
                      </div>
                      <div className="sd-gap"></div>
                      <button className="sd-btn-primary" type="button">Home Delivery</button>
                      <button className="sd-btn-ghost" type="button">Manage Prescription</button>
                    </div>
                  </div></div></div>
                  <div className="jx2-shot" data-i="6"><div className="jx2-compose"><div className="rf-card" id="jx2RfCard">
                    <div className="jx-notch"></div>
                    <div className="rf-screen">
                      <div className="rf-brandrow"><span className="rf-brand">PHILRx</span><span className="rf-tagline">Rx at your fingertips</span></div>
                      <p className="rf-title">My prescriptions</p>
                      <div className="rf-rx">
                        <p className="rf-rx-name">Adaptrex®</p>
                        <p className="rf-rx-refills">2 refills remaining</p>
                      </div>
                      <div className="rf-note">Your next refill is scheduled. Please confirm below.</div>
                      <div className="rf-gap"></div>
                      <button className="rf-btn-primary" type="button">Confirm Next Refill</button>
                      <button className="rf-btn-ghost" type="button">Manage Prescription</button>
                    </div>
                  </div></div></div>
                  <div className="jx2-progressbar" aria-hidden="true"><i id="jx2Bar"></i></div>
                </div>
              </div>

              
              <div className="jx2-rail" id="jx2Rail" role="tablist" aria-label="Prescription journey steps">
                <p className="jx2-rail-label">Scroll to Learn More <span className="jx2-cue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" /></svg></span></p>
                <button className="jx2-step active" type="button" data-i="0" role="tab"><span className="jx2-dot">1</span><span className="jx2-name">Versatile Intake</span></button>
                <button className="jx2-step" type="button" data-i="1" role="tab"><span className="jx2-dot">2</span><span className="jx2-name">Fast Enrollment</span></button>
                <button className="jx2-step" type="button" data-i="2" role="tab"><span className="jx2-dot">3</span><span className="jx2-name">Flexible Access Paths</span></button>
                <button className="jx2-step" type="button" data-i="3" role="tab"><span className="jx2-dot">4</span><span className="jx2-name">Transparent Cost</span></button>
                <button className="jx2-step" type="button" data-i="4" role="tab"><span className="jx2-dot">5</span><span className="jx2-name">Nationwide Pharmacy Reach</span></button>
                <button className="jx2-step" type="button" data-i="5" role="tab"><span className="jx2-dot">6</span><span className="jx2-name">Fast, Trackable Fulfillment</span></button>
                <button className="jx2-step" type="button" data-i="6" role="tab"><span className="jx2-dot">7</span><span className="jx2-name">Seamless Refill Management</span></button>
              </div>
            </div>
            <div className="jx2-skip-row">
              <a className="jx2-skip" id="jx2Skip" role="button" tabIndex={0}>
                <span className="pl-text">Continue to Next Section</span>
                <span className="pl-arrow" aria-hidden="true">
                  <svg viewBox="0 0 30 16"><path d="M1 8h25M21 3l5 5-5 5" /></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
</section>
);
