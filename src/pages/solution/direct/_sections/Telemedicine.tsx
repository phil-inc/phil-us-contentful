import React from "react";
import { Link } from "gatsby";

// tcdPick is attached to window by interactions.ts (ported from the design script).
const pickTcd = (e: React.MouseEvent<HTMLDivElement>) =>
  (window as any).tcdPick?.(e.currentTarget);
const keyTcd = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    (window as any).tcdPick?.(e.currentTarget);
  }
};

export const TelemedicineSection: React.FC = () => (
  <section className="band band-tele tele-section" data-screen-label="04 Telemedicine">
    <div className="xl-container">
      <div className="section-head section-head--center">
        <h2>Enable Every Path to Your Patient with a Fully Customizable Solution</h2>
        <p className="lead">
          PHIL Direct delivers a flexible Direct-to-Patient experience that
          meets patients where they are, with a seamless and affordable path to
          therapy. Our custom program design supports branded and white-labeled
          experiences with hybrid, cash-pay and coverage models.
        </p>
      </div>

      <div className="tele-showcase">
        <div className="tele-journey-head">
          <p className="tele-journey-eyebrow">Design Your DTP Program with PHIL Direct</p>
          <div className="tele-journey-tabs" role="tablist" aria-label="Choose a journey">
            <button className="tjt is-active" type="button" role="tab" aria-selected="true" data-journey="0">
              Telemed DTP
            </button>
            <button className="tjt" type="button" role="tab" aria-selected="false" data-journey="1">
              In-Office DTP
            </button>
            <button className="tjt" type="button" role="tab" aria-selected="false" data-journey="2">
              Patient Request
            </button>
          </div>
        </div>

        {/* ===================== JOURNEY 0 — Telemed DTP ===================== */}
        <div className="tele-journey is-active" data-journey="0">
          <div className="tele-stage">
            <div className="tele-copy">
              <p className="tj-eyebrow">Patient Journey</p>
              <h3 className="tj-step-title">Advertisement Click</h3>
              <p className="tj-step-desc">
                Enable an immediate start to the patient journey the moment they
                click, transforming interest into action instantly while
                capturing data from first touch through dispense.
              </p>
              <Link className="btn-solid tele-copy-cta" to="/solution/core/">
                Explore PHIL Digital Hub{" "}
                <span className="btn-solid-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
            <div className="tele-main">
              {/* Screen 0 — social ad placement */}
              <div className="tp is-shown" data-i="0">
                <div className="tp-mhead">
                  <span className="tp-mnum">1</span>
                  <span className="tp-mtitle">Advertisement Click</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="ig-top">
                      <div className="ig-logo">
                        Instagram
                        <svg className="chev" viewBox="0 0 24 24">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      <div className="ig-top-r">
                        <svg viewBox="0 0 24 24">
                          <path d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.6z" />
                        </svg>
                        <svg viewBox="0 0 24 24">
                          <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1 1 21 11.5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ig-stories">
                      <div className="ig-story">
                        <div className="ig-ring me">
                          <svg className="ig-plus" viewBox="0 0 24 24">
                            <line x1="12" y1="6" x2="12" y2="18" />
                            <line x1="6" y1="12" x2="18" y2="12" />
                          </svg>
                        </div>
                        <small>Your Story</small>
                      </div>
                      <div className="ig-story">
                        <div className="ig-ring g1">
                          <svg className="ig-person" viewBox="0 0 24 24">
                            <circle cx="12" cy="9" r="3.4" />
                            <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0z" />
                          </svg>
                        </div>
                        <small>Emmanuelle</small>
                      </div>
                      <div className="ig-story">
                        <div className="ig-ring g2">
                          <svg className="ig-person" viewBox="0 0 24 24">
                            <circle cx="12" cy="9" r="3.4" />
                            <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0z" />
                          </svg>
                        </div>
                        <small>Rogers.Sm</small>
                      </div>
                      <div className="ig-story">
                        <div className="ig-ring g3">
                          <svg className="ig-person" viewBox="0 0 24 24">
                            <circle cx="12" cy="9" r="3.4" />
                            <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0z" />
                          </svg>
                        </div>
                        <small>Kevin_John</small>
                      </div>
                    </div>
                    <div className="ig-posthead">
                      <div className="ig-av">
                        <svg className="ig-person" viewBox="0 0 24 24">
                          <circle cx="12" cy="9" r="3.4" />
                          <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0z" />
                        </svg>
                      </div>
                      <div className="ig-pn">
                        <b>Adaptrex</b>
                        <em>Sponsored</em>
                      </div>
                      <span className="ig-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                    <div className="ig-creative ig-creative--ad">
                      <div className="ig-bottle" aria-hidden="true">
                        <div className="cap" />
                        <div className="neck" />
                        <div className="body">
                          <div className="label">
                            <span className="cross" />
                            <i className="l1" />
                            <i className="l2" />
                          </div>
                        </div>
                      </div>
                      <h5>
                        Take control of
                        <br />
                        your health today
                      </h5>
                      <div className="ig-btn">Get the treatment you need</div>
                    </div>
                    <div className="ig-actions">
                      <svg viewBox="0 0 24 24">
                        <path d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.6z" />
                      </svg>
                      <svg viewBox="0 0 24 24">
                        <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1 1 21 11.5z" />
                      </svg>
                      <svg viewBox="0 0 24 24">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      <svg className="last" viewBox="0 0 24 24">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="ig-likes">100 Likes</div>
                    <div className="ig-nav">
                      <svg className="on" viewBox="0 0 24 24">
                        <path d="M3 11l9-8 9 8" />
                        <path d="M5 10v10h5v-6h4v6h5V10" />
                      </svg>
                      <svg viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.5" y2="16.5" />
                      </svg>
                      <svg viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      <svg viewBox="0 0 24 24">
                        <path d="M6 8h12l-1 12H7z" />
                        <path d="M9 8a3 3 0 0 1 6 0" />
                      </svg>
                      <span className="dot" />
                    </div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Expands digital intake while capturing data to track patient
                  journeys from first click through dispense.
                </p>
              </div>

              {/* Screen 1 — Adaptrex landing page */}
              <div className="tp" data-i="1">
                <div className="tp-mhead">
                  <span className="tp-mnum">2</span>
                  <span className="tp-mtitle">Brand Website</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="adx-head">
                      <b>Adaptrex</b>
                    </div>
                    <div className="adx-hero tp-bokeh">
                      <h5>
                        Learn if Adaptrex
                        <br />
                        may be right for you
                      </h5>
                    </div>
                    <div className="adx-pill">
                      Enjoy savings, pay as low as <b>$0</b>
                    </div>
                    <div className="adx-bens">
                      <div className="adx-ben">
                        <span className="ic">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <b>FDA approved treatment</b>
                      </div>
                      <div className="adx-ben">
                        <span className="ic">
                          <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" />
                            <polyline points="12 7 12 12 15 14" />
                          </svg>
                        </span>
                        <b>Quick online consultation</b>
                      </div>
                      <div className="adx-ben">
                        <span className="ic">
                          <svg viewBox="0 0 24 24">
                            <path d="M12 3l7 3v5c0 4.6-3.1 7.7-7 9-3.9-1.3-7-4.4-7-9V6z" />
                          </svg>
                        </span>
                        <b>Private &amp; confidential</b>
                      </div>
                    </div>
                    <div className="adx-cta">Start your online visit</div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Delivers a consistent, on-brand experience while strengthening
                  engagement and improving conversion.
                </p>
              </div>

              {/* Screen 2 — telehealth visit intake */}
              <div className="tp" data-i="2">
                <div className="tp-mhead">
                  <span className="tp-mnum">3</span>
                  <span className="tp-mtitle">Telemedicine Appointment</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="tin-screen">
                      <div className="tin-head">
                        <b>PHILRx</b>
                      </div>
                      <div className="tin-hero tp-bokeh">
                        <p className="tin-htitle">Telemedicine Questionnaire</p>
                        <p className="tin-hsub">Let's see if Adaptrex is right for you</p>
                      </div>
                      <div className="tin-scroll">
                        <div className="tin-field">
                          <label className="tin-label">Date of Birth</label>
                          <div className="tin-row">
                            <div className="tin-box">
                              <span>MM</span>
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
                                <line x1="3" y1="9.5" x2="21" y2="9.5" />
                                <line x1="8" y1="2.5" x2="8" y2="6.5" />
                                <line x1="16" y1="2.5" x2="16" y2="6.5" />
                              </svg>
                            </div>
                            <div className="tin-box">
                              <span>DD</span>
                            </div>
                            <div className="tin-box wide">
                              <span>YYYY</span>
                            </div>
                          </div>
                        </div>
                        <div className="tin-field">
                          <label className="tin-label">Weight</label>
                          <div className="tin-row">
                            <div className="tin-input">Enter weight</div>
                            <div className="tin-unit">lbs</div>
                          </div>
                        </div>
                        <div className="tin-field">
                          <label className="tin-label">
                            Have you tried any of the following medications?
                          </label>
                          <div className="tin-select" id="tin-med-trigger">
                            <span id="tin-med-val">Select all that apply</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </div>
                        </div>
                        <div className="tin-field">
                          <label className="tin-label">
                            Have you been diagnosed with any of the following?
                          </label>
                          <div className="tin-select" id="tin-diag-trigger">
                            <span id="tin-diag-val">Select all that apply</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </div>
                        </div>
                        <div className="tin-btns">
                          <button className="tin-primary" type="button">
                            Submit interest form
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Creates a seamless, integrated care experience from
                  consultation to prescription.
                </p>
              </div>

              {/* Screen 3 — PHILRx enrollment */}
              <div className="tp" data-i="3">
                <div className="tp-mhead">
                  <span className="tp-mnum">4</span>
                  <span className="tp-mtitle">Into PHIL&rsquo;s Platform</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="enr-screen">
                      <div className="enr-brand">
                        <b>PHILRx</b>
                        <span className="ph-tag">Rx at your fingertips</span>
                      </div>
                      <div className="enr-bubble">
                        Hi Sarah! Dr. Jones sent your Adaptrex prescription
                        to the PHILRx pharmacy. Tap below to get started.
                      </div>
                      <div className="enr-checks">
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Enroll in
                          minutes
                        </div>
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Fast, free
                          shipping
                        </div>
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Easy refills
                        </div>
                      </div>
                      <div className="enr-spacer" />
                      <div className="enr-cta">Confirm &amp; enroll</div>
                    </div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Extends the brand experience with an optional white-labeled
                  program that feels fully integrated, even as patients move from
                  the manufacturer site through PHIL.
                </p>
              </div>
            </div>
            <div className="tele-select">
              <p className="tj-kicker">Example Paths</p>
              <div className="tj-progress">
                <span className="tj-progress-fill" />
              </div>
              <div className="tele-rows">
                <div
                  className="tele-row is-active"
                  data-i="0"
                  data-title="Advertisement Click"
                  data-desc="Enable an immediate start to the patient journey the moment they click, transforming interest into action instantly while capturing data from first touch through dispense."
                >
                  <button className="tele-thumb" type="button" data-i="0" aria-label="View social ad placement" />
                  <span className="tj-num">1</span>
                  <span className="tj-label">Advertisement Click</span>
                </div>
                <div
                  className="tele-row"
                  data-i="1"
                  data-title="Brand Website"
                  data-desc="Keep patients in a trusted, on-brand experience that reduces friction and builds trust and empowers them to request a consultation and confidently move toward treatment."
                >
                  <button className="tele-thumb" type="button" data-i="1" aria-label="View Adaptrex landing page" />
                  <span className="tj-num">2</span>
                  <span className="tj-label">Brand Website</span>
                </div>
                <div
                  className="tele-row"
                  data-i="2"
                  data-title="Telemedicine Appointment"
                  data-desc="Create a seamless consult-to-script journey through a virtual telemedicine visit, chat, or form-based intake, allowing a licensed provider to evaluate the patients and determine therapy appropriateness."
                >
                  <button className="tele-thumb" type="button" data-i="2" aria-label="View telehealth visit" />
                  <span className="tj-num">3</span>
                  <span className="tj-label">Telemedicine Appointment</span>
                </div>
                <div
                  className="tele-row"
                  data-i="3"
                  data-title="Connect the Journey into PHIL&rsquo;s Platform"
                  data-desc="Extend your brand experience with an optional white-labeled program that feels fully integrated as patients move across every step of the journey."
                >
                  <button className="tele-thumb" type="button" data-i="3" aria-label="View enrollment screen" />
                  <span className="tj-num">4</span>
                  <span className="tj-label">Into PHIL&rsquo;s Platform</span>
                </div>
              </div>
              <p className="tele-disclaimer">
                *Adaptrex is a fictional product used for illustrative purposes
                only.
              </p>
            </div>
          </div>
        </div>

        {/* ===================== JOURNEY 1 — In-Office DTP ===================== */}
        <div className="tele-journey" data-journey="1">
          <div className="tele-stage">
            <div className="tele-copy">
              <p className="tj-eyebrow">Patient Journey</p>
              <h3 className="tj-step-title">In-Office Visit</h3>
              <p className="tj-step-desc">
                Keep patients supported across varied entry points by enabling
                in-office visits where providers can diagnose, select therapy,
                and initiate a fully supported treatment journey.
              </p>
              <Link className="btn-solid tele-copy-cta" to="/solution/core/">
                Explore PHIL Digital Hub{" "}
                <span className="btn-solid-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
            <div className="tele-main">
              {/* Screen 0 — in-office visit */}
              <div className="tp tp--card is-shown" data-i="0">
                <div className="tp-mhead">
                  <span className="tp-mnum">1</span>
                  <span className="tp-mtitle">In-Office Visit</span>
                </div>
                <div className="ipv-box">
                  <div className="ipv-scene">
                    <svg
                      className="ipv-building"
                      viewBox="0 0 300 320"
                      role="img"
                      aria-label="In-person visit to a healthcare provider"
                    >
                      <rect className="bld-base" x="14" y="300" width="272" height="16" rx="4" />
                      <rect className="bld-body" x="8" y="150" width="78" height="156" rx="7" />
                      <rect className="bld-win" x="29" y="170" width="32" height="26" rx="4" />
                      <rect className="bld-win" x="29" y="206" width="32" height="26" rx="4" />
                      <rect className="bld-win" x="29" y="242" width="32" height="26" rx="4" />
                      <rect className="bld-body" x="214" y="150" width="78" height="156" rx="7" />
                      <rect className="bld-win" x="239" y="170" width="32" height="26" rx="4" />
                      <rect className="bld-win" x="239" y="206" width="32" height="26" rx="4" />
                      <rect className="bld-win" x="239" y="242" width="32" height="26" rx="4" />
                      <rect className="bld-body" x="78" y="38" width="144" height="268" rx="9" />
                      <rect className="bld-win" x="100" y="58" width="30" height="30" rx="4" />
                      <rect className="bld-win" x="170" y="58" width="30" height="30" rx="4" />
                      <circle className="bld-circle" cx="150" cy="140" r="46" />
                      <path className="bld-cross" d="M144 118h12v16h16v12h-16v16h-12v-16h-16v-12h16z" />
                      <rect className="bld-win" x="102" y="200" width="30" height="28" rx="4" />
                      <rect className="bld-win" x="168" y="200" width="30" height="28" rx="4" />
                      <rect className="bld-door" x="126" y="250" width="48" height="56" rx="4" />
                      <line className="bld-doorline" x1="150" y1="252" x2="150" y2="306" />
                    </svg>
                    <div className="cal" role="img" aria-label="Appointment scheduled">
                      <div className="cal-pegs">
                        <span />
                        <span />
                      </div>
                      <div className="cal-card">
                        <div className="cal-head" />
                        <div className="cal-grid">
                          <span className="cal-cell d" />
                          <span className="cal-cell d" />
                          <span className="cal-cell d p1" />
                          <span className="cal-cell d" />
                          <span className="cal-cell d" />
                          <span className="cal-cell l" />
                          <span className="cal-cell d" />
                          <span className="cal-cell l p2" />
                          <span className="cal-cell d" />
                          <span className="cal-cell l" />
                          <span className="cal-cell d" />
                          <span className="cal-cell l" />
                          <span className="cal-cell d p3" />
                          <span className="cal-cell l" />
                          <span className="cal-cell d" />
                          <span className="cal-cell l" />
                          <span className="cal-cell d" />
                          <span className="cal-cell l check">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span className="cal-cell d" />
                          <span className="cal-cell l" />
                        </div>
                      </div>
                      <span className="cal-add" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <circle cx="12" cy="9.2" r="3.9" />
                          <path d="M5 19.6a7 7 0 0 1 14 0z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <p className="tp-mdesc">
                  Starting the patient journey with an in person visit to their
                  local healthcare provider where the doctor determines a
                  specific therapy is required.
                </p>
              </div>

              {/* Screen 1 — HCP e-prescription (laptop / EHR) */}
              <div className="tp tp--laptop" data-i="1">
                <div className="tp-mhead">
                  <span className="tp-mnum">2</span>
                  <span className="tp-mtitle">HCP e-prescription</span>
                </div>
                <div className="lap">
                  <div className="lap-lid">
                    <div className="lap-cam" />
                    <div className="lap-screen">
                      <div className="ehr">
                        <div className="ehr-bar">
                          <span className="ehr-logo">EHR</span>
                          <span className="ehr-dots">
                            <i />
                            <i />
                            <i />
                          </span>
                        </div>
                        <div className="ehr-body">
                          <div className="ehr-side">
                            <span className="ehr-nav on" />
                            <span className="ehr-nav" />
                            <span className="ehr-nav" />
                            <span className="ehr-nav" />
                          </div>
                          <div className="ehr-main">
                            <div className="ehr-patient">
                              <div className="ehr-av">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                  <circle cx="12" cy="8" r="4" />
                                  <path d="M4 21a8 8 0 0 1 16 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="ehr-name">Sarah Mitchell</p>
                              </div>
                            </div>
                            <div className="ehr-line">
                              <span>Allergies</span>
                              <b>None on file</b>
                            </div>
                            <div className="ehr-rx">
                              <span className="ehr-rx-label">New Prescription</span>
                              <b className="ehr-rx-name">Adaptrex</b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lap-base" />
                  <div className="lerx">
                    <div className="lerx-head">
                      <span>Send e-Prescription</span>
                      <span className="lerx-x" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </span>
                    </div>
                    <div className="lerx-body">
                      <p className="lerx-label">PHARMACY</p>
                      <div className="lerx-select">
                        <span>Manufacturer RX</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                      <button className="lerx-send" type="button">
                        Send eRx
                      </button>
                    </div>
                  </div>
                </div>
                <p className="tp-mdesc">
                  Delivers a consistent, on-brand experience while strengthening
                  engagement and improving conversion.
                </p>
              </div>

              {/* Screen 2 — patient digital enrollment */}
              <div className="tp" data-i="2">
                <div className="tp-mhead">
                  <span className="tp-mnum">3</span>
                  <span className="tp-mtitle">Patient Digital Enrollment</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="enr-screen">
                      <div className="enr-brand">
                        <b>PHILRx</b>
                        <span className="ph-tag">Rx at your fingertips</span>
                      </div>
                      <div className="enr-bubble">
                        Hi Sarah! Dr. Jones sent your Adaptrex prescription
                        to the Manufacturer Rx pharmacy. Tap below to get started.
                      </div>
                      <div className="enr-checks">
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Enroll in
                          minutes
                        </div>
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Fast, free
                          shipping
                        </div>
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Easy refills
                        </div>
                      </div>
                      <div className="enr-spacer" />
                      <div className="enr-cta">Confirm &amp; enroll</div>
                    </div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Extends the brand experience with an optional white-labeled
                  program that feels fully integrated, even as patients move from
                  the manufacturer site through PHIL.
                </p>
              </div>

              {/* Screen 3 — payment & dispense */}
              <div className="tp" data-i="3">
                <div className="tp-mhead">
                  <span className="tp-mnum">4</span>
                  <span className="tp-mtitle">And into PHIL&rsquo;s Platform</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="tcd-screen">
                      <div className="tcd-brand">
                        <b>PHILRx</b>
                        <span>Rx at your fingertips</span>
                      </div>
                      <div className="tcd-lead">
                        We found your best price on Adaptrex!
                      </div>
                      <div className="tcd-option" role="button" tabIndex={0} onClick={pickTcd} onKeyDown={keyTcd}>
                        <span className="tcd-radio is-empty" />
                        <div>
                          <p className="tcd-opt-title">
                            30 Day Supply with Copay Offer for $25
                          </p>
                          <span className="tcd-off">79% OFF</span>
                        </div>
                      </div>
                      <div className="tcd-option is-selected" role="button" tabIndex={0} onClick={pickTcd} onKeyDown={keyTcd}>
                        <span className="tcd-radio" />
                        <div>
                          <p className="tcd-opt-title">
                            30 Day Supply with
                            <br />
                            Cash Price for $50
                          </p>
                          <span className="tcd-off">58% OFF</span>
                        </div>
                      </div>
                      <div className="tcd-spacer" />
                      <button className="tcd-next" type="button">
                        Next
                      </button>
                      <button className="tcd-manage" type="button">
                        Manage prescription
                      </button>
                    </div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Creates a seamless, integrated care experience from
                  consultation to prescription.
                </p>
              </div>
            </div>
            <div className="tele-select">
              <p className="tj-kicker">Example Paths</p>
              <div className="tj-progress">
                <span className="tj-progress-fill" />
              </div>
              <div className="tele-rows">
                <div
                  className="tele-row is-active"
                  data-i="0"
                  data-title="In-Office Visit"
                  data-desc="Keep patients supported across varied entry points by enabling in-office visits where providers can diagnose, select therapy, and initiate a fully supported treatment journey."
                >
                  <button className="tele-thumb" type="button" data-i="0" aria-label="View in-office visit" />
                  <span className="tj-num">1</span>
                  <span className="tj-label">In-Office Visit</span>
                </div>
                <div
                  className="tele-row"
                  data-i="1"
                  data-title="HCP e-prescription"
                  data-desc="Enable HCPs to easily submit prescriptions directly within their EHR using a white-labeled, manufacturer-designated option, ensuring brand consistency and a seamless experience."
                >
                  <button className="tele-thumb" type="button" data-i="1" aria-label="View HCP e-prescription" />
                  <span className="tj-num">2</span>
                  <span className="tj-label">HCP e-prescription</span>
                </div>
                <div
                  className="tele-row"
                  data-i="2"
                  data-title="Patient Digital Enrollment"
                  data-desc="Simplify enrollment with a triggered SMS text to the patient the moment the electronic script is sent, making it easy to enroll and access the treatment they need."
                >
                  <button className="tele-thumb" type="button" data-i="2" aria-label="View patient digital enrollment" />
                  <span className="tj-num">3</span>
                  <span className="tj-label">Patient Digital Enrollment</span>
                </div>
                <div
                  className="tele-row"
                  data-i="3"
                  data-title="Payment and Dispense"
                  data-desc="Provide a clear, affordable cash price, then ship medication directly to the patient&rsquo;s door for a seamless experience."
                >
                  <button className="tele-thumb" type="button" data-i="3" aria-label="View payment and dispense" />
                  <span className="tj-num">4</span>
                  <span className="tj-label">Payment and Dispense</span>
                </div>
              </div>
              <p className="tele-disclaimer">
                *Adaptrex is a fictional product used for illustrative purposes
                only.
              </p>
            </div>
          </div>
        </div>

        {/* ===================== JOURNEY 2 — Patient Request ===================== */}
        <div className="tele-journey" data-journey="2">
          <div className="tele-stage">
            <div className="tele-copy">
              <p className="tj-eyebrow">Patient Journey</p>
              <h3 className="tj-step-title">Branded Direct Intake</h3>
              <p className="tj-step-desc">
                Empower patients to take action directly from the brand website,
                whether initiating a prescription request with their doctor or
                transferring an existing script into PHIL, creating a connected,
                seamless path to access.
              </p>
              <Link className="btn-solid tele-copy-cta" to="/solution/core/">
                Explore PHIL Digital Hub{" "}
                <span className="btn-solid-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
            <div className="tele-main">
              {/* Screen 0 — branded direct intake */}
              <div className="tp is-shown" data-i="0">
                <div className="tp-mhead">
                  <span className="tp-mnum">1</span>
                  <span className="tp-mtitle">Branded Direct Intake</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="adx-head">
                      <b>Adaptrex</b>
                    </div>
                    <div className="adx-hero tp-bokeh">
                      <h5>
                        Begin your path to
                        <br />
                        Adaptrex
                      </h5>
                    </div>
                    <div className="adx-pill">
                      Enjoy savings, pay as low as <b>$0</b>
                    </div>
                    <div className="adx-bens">
                      <div className="adx-ben">
                        <span className="ic">
                          <svg viewBox="0 0 24 24">
                            <path d="M12 3l7 3v5c0 4.6-3.1 7.7-7 9-3.9-1.3-7-4.4-7-9V6z" />
                          </svg>
                        </span>
                        <b>Private &amp; confidential</b>
                      </div>
                      <div className="adx-ben">
                        <span className="ic">
                          <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" />
                            <polyline points="12 7 12 12 15 14" />
                          </svg>
                        </span>
                        <b>Interest request shared directly to your doctor</b>
                      </div>
                    </div>
                    <div className="adx-cta">Request an Rx</div>
                    <div className="adx-cta adx-cta--ghost">Transfer a script</div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Expands digital intake while capturing data to track patient
                  journeys from first click through dispense.
                </p>
              </div>

              {/* Screen 1 — patient digital enrollment */}
              <div className="tp" data-i="1">
                <div className="tp-mhead">
                  <span className="tp-mnum">2</span>
                  <span className="tp-mtitle">Patient Digital Enrollment</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="enr-screen">
                      <div className="enr-brand">
                        <b>PHILRx</b>
                        <span className="ph-tag">Rx at your fingertips</span>
                      </div>
                      <div className="enr-bubble">
                        Hi Sarah! Dr. Jones sent your Adaptrex prescription
                        to the PHILRx pharmacy. Tap below to get started.
                      </div>
                      <div className="enr-checks">
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Enroll in
                          minutes
                        </div>
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Fast, free
                          shipping
                        </div>
                        <div className="enr-row">
                          <span className="enr-check">&#10003;</span> Easy refills
                        </div>
                      </div>
                      <div className="enr-spacer" />
                      <div className="enr-cta">Confirm &amp; enroll</div>
                    </div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Creates a seamless, integrated care experience from
                  consultation to prescription.
                </p>
              </div>

              {/* Screen 2 — PA & affordability optimization */}
              <div className="tp" data-i="2">
                <div className="tp-mhead">
                  <span className="tp-mnum">3</span>
                  <span className="tp-mtitle">PA &amp; Affordability Optimization</span>
                </div>
                <div className="tp-frame">
                  <div className="tp-notch" />
                  <div className="tp-screen">
                    <div className="tcd-screen">
                      <div className="tcd-brand">
                        <b>PHILRx</b>
                        <span>Rx at your fingertips</span>
                      </div>
                      <div className="tcd-lead">
                        We found your best price on Adaptrex!
                      </div>
                      <div className="tcd-option is-selected" role="button" tabIndex={0} onClick={pickTcd} onKeyDown={keyTcd}>
                        <span className="tcd-radio" />
                        <div>
                          <p className="tcd-opt-title">
                            30 Day Supply with Insurance Copay for $125
                          </p>
                          <span className="tcd-off">5% OFF</span>
                        </div>
                      </div>
                      <div className="tcd-option" role="button" tabIndex={0} onClick={pickTcd} onKeyDown={keyTcd}>
                        <span className="tcd-radio is-empty" />
                        <div>
                          <p className="tcd-opt-title">
                            30 Day Supply with
                            <br />
                            Cash Price for $50
                          </p>
                          <span className="tcd-off">58% OFF</span>
                        </div>
                      </div>
                      <div className="tcd-spacer" />
                      <button className="tcd-next" type="button">
                        Next
                      </button>
                      <button className="tcd-manage" type="button">
                        Manage prescription
                      </button>
                    </div>
                    <div className="tp-home" />
                  </div>
                </div>
                <p className="tp-mdesc">
                  Extends the brand experience with an optional white-labeled
                  program that feels fully integrated, even as patients move from
                  the manufacturer site through PHIL.
                </p>
              </div>
            </div>
            <div className="tele-select">
              <p className="tj-kicker">Example Paths</p>
              <div className="tj-progress">
                <span className="tj-progress-fill" />
              </div>
              <div className="tele-rows">
                <div
                  className="tele-row is-active"
                  data-i="0"
                  data-title="Branded Direct Intake"
                  data-desc="Empower patients to take action directly from the brand website, whether initiating a prescription request with their doctor or transferring an existing script into PHIL, creating a connected, seamless path to access."
                >
                  <button className="tele-thumb" type="button" data-i="0" aria-label="View branded direct intake" />
                  <span className="tj-num">1</span>
                  <span className="tj-label">Branded Direct Intake</span>
                </div>
                <div
                  className="tele-row"
                  data-i="1"
                  data-title="Patient Digital Enrollment"
                  data-desc="Simplify enrollment with a triggered SMS text to the patient the moment the electronic script is sent, making it easy to enroll and access the treatment they need."
                >
                  <button className="tele-thumb" type="button" data-i="1" aria-label="View patient digital enrollment" />
                  <span className="tj-num">2</span>
                  <span className="tj-label">Patient Digital Enrollment</span>
                </div>
                <div
                  className="tele-row"
                  data-i="2"
                  data-title="PA & Affordability Optimization"
                  data-desc="Secure an affordable price for the patient, with streamlined tools for HCPs to make prior authorization submission simple, helping secure coverage and provide smooth access to therapy."
                >
                  <button className="tele-thumb" type="button" data-i="2" aria-label="View PA and affordability optimization" />
                  <span className="tj-num">3</span>
                  <span className="tj-label">PA &amp; Affordability Optimization</span>
                </div>
              </div>
              <p className="tele-disclaimer">
                *Adaptrex is a fictional product used for illustrative purposes
                only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
