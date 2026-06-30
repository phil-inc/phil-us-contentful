import React from "react";
import { Link } from "gatsby";

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="4" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

export const ThoughtLeadershipSection: React.FC = () => (
  <section className="band band-tl" data-screen-label="07 Thought Leadership">
    <div className="xl-container">
      <div
        className="section-head section-head--center tl-head"
        style={{ margin: "24px auto 32px" }}
      >
        <h2 style={{ whiteSpace: "nowrap", fontSize: "40px" }}>
          Our Proven Approach to DTP Success
        </h2>
      </div>
    </div>

    {/* Scrolling resources marquee */}
    <div className="xl-container">
      <div
        className="res-marquee"
        role="region"
        aria-label="PHIL Direct-to-Patient resources and insights"
      >
        <button className="res-nav prev" type="button" aria-label="Previous resources">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 5 8 12 15 19" />
          </svg>
        </button>
        <div className="res-viewport">
          <div className="res-track">
            <article className="bt bt-quote is-grad-light sz-e">
              <p className="bt-eyebrow">Press Release</p>
              <p className="bt-text">
                Tenpoint and PHIL have partnered on a DTP program to improve
                access, reduce costs, and boost{" "}
                <b>long-term adherence</b>.
              </p>
              <a
                className="bt-link"
                href="https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable"
                target="_blank"
                rel="noopener"
              >
                Read announcement <Arrow />
              </a>
            </article>

            <article className="bt bt-quote is-grad bt-dots sz-a">
              <p className="bt-eyebrow">Thought Leadership</p>
              <p className="bt-text">
                How Flexible Direct-to-Patient Programs Power Best-In-Class
                Patient Experiences
              </p>
              <a
                className="bt-link"
                href="https://www.drugchannels.net/2026/02/beyond-dtp-20-how-flexible-direct-to.html"
                target="_blank"
                rel="noopener"
              >
                Read feature <Arrow />
              </a>
            </article>

            <article className="bt bt-quote is-pale sz-b">
              <p className="bt-eyebrow">Case Study</p>
              <p className="bt-text" style={{ color: "var(--phil-forest)" }}>
                Designing a Transformative Direct-to-Patient Program to Drive
                Brand Growth
              </p>
              <Link
                className="bt-link"
                to="/insights/case-studies/philrx-designs-transformative-telemedicine-channel-for-womens-health-brand/"
              >
                Read case study <Arrow />
              </Link>
            </article>

            <article
              className="bt bt-statement is-grad bt-dots sz-c"
              style={{ flexBasis: "397px", width: "397px" }}
            >
              <p className="bt-eyebrow">Thought Leadership</p>
              <h4>Why Direct-to-Patient Is Becoming Pharma&rsquo;s New Standard</h4>
              <a
                className="bt-link"
                href="https://www.lifescienceleader.com/doc/pharma-direct-to-patient-from-experiment-to-imperative-0001"
                target="_blank"
                rel="noopener"
              >
                Read feature <Arrow />
              </a>
            </article>

            <article
              className="bt bt-quote is-grad-light sz-a"
              style={{ flexBasis: "277px", width: "277px", minHeight: "330px" }}
            >
              <p className="bt-eyebrow">Press Release</p>
              <p className="bt-text">
                PHIL and Sprout Pharmaceuticals Expand Their Affordable
                Direct-to-Patient Access Program
              </p>
              <a
                className="bt-link"
                href="https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html"
                target="_blank"
                rel="noopener"
              >
                Read announcement <Arrow />
              </a>
            </article>

            <article className="bt bt-quote is-dark sz-b">
              <p className="bt-eyebrow">Fierce Pharma</p>
              <p className="bt-htitle">
                Patient Perspectives on Direct-to-Patient: Improving Access and
                Adherence
              </p>
              <a
                className="bt-link"
                href="https://www.fiercepharma.com/marketing/patients-want-price-transparency-e-commerce-experience-pharma-dtp-platforms-survey"
                target="_blank"
                rel="noopener"
              >
                Read feature <Arrow />
              </a>
            </article>

            <article
              className="bt bt-quote is-grad-light sz-c"
              style={{ flexBasis: "409px", width: "409px" }}
            >
              <p className="bt-eyebrow">Press Release</p>
              <p className="bt-text">
                PHIL Invests in State-of-the-Art Cash Dispense Capabilities
              </p>
              <a
                className="bt-link"
                href="https://www.businesswire.com/news/home/20260421670832/en/PHIL-Invests-in-State-of-the-Art-Cash-Dispense-Capabilities-Expanding-Direct-to-Patient-Fulfillment-for-Pharma"
                target="_blank"
                rel="noopener"
              >
                Read announcement <Arrow />
              </a>
            </article>

            <article
              className="bt bt-quote is-pale bt-hcp sz-d"
              style={{ flexBasis: "263px", width: "263px", minHeight: "302px" }}
            >
              <p className="bt-eyebrow">Featured Report</p>
              <p className="bt-htitle">
                What HCPs Want from Pharma's Digital Access Channels
              </p>
              <Link className="bt-link" to="/hcp-research/">
                Read report <Arrow />
              </Link>
            </article>
          </div>
        </div>
        <button className="res-nav next" type="button" aria-label="Next resources">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="9 5 16 12 9 19" />
          </svg>
        </button>
      </div>
    </div>

    <div className="xl-container" style={{ marginTop: "28px" }}>
      <div className="tl-grid">
        <div className="tl-pillar">
          <div className="tl-card">
            <div className="tl-cardhead">
              <span className="tl-num" aria-hidden="true">
                1
              </span>
              <h3 className="tl-title">Seamless Digital Access</h3>
            </div>
            <p className="tl-body">
              Deliver one seamless experience for prescribing, coverage,
              payment, and fulfillment that meets patients where they are,
              without handoffs or friction.
            </p>
          </div>
        </div>

        <div className="tl-pillar">
          <div className="tl-card">
            <div className="tl-cardhead">
              <span className="tl-num" aria-hidden="true">
                2
              </span>
              <h3 className="tl-title">Transparent Affordability</h3>
            </div>
            <p className="tl-body">
              Lead with transparent pricing that makes out-of-pocket costs
              clear, reducing financial uncertainty so patients can start and
              stay on therapy.
            </p>
          </div>
        </div>

        <div className="tl-pillar">
          <div className="tl-card">
            <div className="tl-cardhead">
              <span className="tl-num" aria-hidden="true">
                3
              </span>
              <h3 className="tl-title">Clear Path to Adherence</h3>
            </div>
            <p className="tl-body">
              Design the access experience to drive sustained adherence by
              combining convenient access with cost clarity and flexible refill
              management.
            </p>
          </div>
        </div>
      </div>

      {/* CTA bar — full library of resources */}
      <Link
        className="bt bt-cta bt-cta--full"
        to="/resources/?topic=direct"
        style={{ marginTop: "48px" }}
      >
        <h4>Explore our full library of DTP resources.</h4>
        <span className="bt-link">
          Explore All Resources <Arrow />
        </span>
      </Link>
    </div>
  </section>
);
