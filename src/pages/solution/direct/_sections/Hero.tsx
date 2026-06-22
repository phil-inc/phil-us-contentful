import React from "react";
import { Link } from "gatsby";

export const HeroSection: React.FC = () => (
  <section className="hero" data-screen-label="01 Introduction">
    <div className="xl-container hero-inner">
      <div className="hero-copy">
        <p className="eyebrow">PHIL Direct-to-Patient</p>
        <h1>
          Create a Seamless Access Experience with a Proven{" "}
          <em>Direct-to-Patient</em> Solution
        </h1>
        <p className="lead">
          PHIL Direct delivers a future-ready, ecommerce-like Direct-to-Patient
          experience, combining intake, fulfillment, and analytics into one
          flexible solution that grows with your brand, boosts performance, and
          expands affordable access to medications with coverage, cash-pay, and
          hybrid programs.
        </p>
        <div className="hero-cta-row">
          <Link className="btn-primary" to="/demo/">
            Book Demo
          </Link>
        </div>
      </div>

      <div className="dtp-art" aria-hidden="true">
        <svg className="dtp-ring" viewBox="0 0 500 500">
          <circle className="r-faint" cx="250" cy="250" r="218" />
          <circle className="r-inner" cx="250" cy="250" r="168" />
          <circle className="r-arc" cx="250" cy="250" r="218" />
        </svg>
        <span className="dtp-blob b1" />
        <span className="dtp-blob b2" />

        {/* Floating: shipping status */}
        <div className="dtp-float ship">
          <div className="dtp-ship-head">
            <span className="dtp-ship-ico">
              <svg viewBox="0 0 24 24">
                <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
                <path d="M3 7l9 4 9-4" />
                <path d="M12 11v10" />
              </svg>
            </span>
            <div>
              <p className="dtp-ship-title">Out for delivery</p>
              <p className="dtp-ship-sub">Arrives today by 5 PM</p>
            </div>
          </div>
          <div className="dtp-track">
            <span className="node done" />
            <span className="seg fill" />
            <span className="node done" />
            <span className="seg fill" />
            <span className="node" />
          </div>
          <div className="dtp-track-labels">
            <span className="on">Ordered</span>
            <span className="on">Shipped</span>
            <span>Delivered</span>
          </div>
        </div>

        {/* Phone: ecommerce checkout */}
        <div className="dtp-phone">
          <div className="dtp-bezel">
            <div className="dtp-notch" />
            <div className="dtp-screen">
              <div className="dtp-brand">
                <span className="dtp-logo">PHILRx</span>
              </div>
              <div className="dtp-div" />
              <div className="dtp-prod">
                <div className="dtp-prod-img">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                  </svg>
                </div>
                <div className="dtp-prod-info">
                  <p className="dtp-prod-name">Adaptrex&reg;</p>
                  <p className="dtp-prod-sub">30-day supply</p>
                  <span className="dtp-instock">
                    <i /> In stock &middot; ships free
                  </span>
                </div>
              </div>
              <div className="dtp-price">
                <span className="dtp-now">$25</span>
                <span className="dtp-was">$119</span>
                <span className="dtp-off">79% OFF</span>
              </div>
              <div className="dtp-benes">
                <div className="dtp-bene">
                  <span className="chk">
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{" "}
                  Free shipping
                </div>
                <div className="dtp-bene">
                  <span className="chk">
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{" "}
                  Affordable cost
                </div>
              </div>
              <div className="dtp-checkout">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>{" "}
                Secure Checkout
              </div>
            </div>
          </div>
        </div>

        {/* Floating: savings badge */}
        <div className="dtp-float save">
          <span className="dtp-save-badge">
            <svg viewBox="0 0 24 24">
              <path d="M20.6 3.4a2 2 0 0 0-1.4-.6H13a2 2 0 0 0-1.4.6l-8.2 8.2a2 2 0 0 0 0 2.8l5.6 5.6a2 2 0 0 0 2.8 0l8.2-8.2a2 2 0 0 0 .6-1.4V4.8a2 2 0 0 0-.4-1z" />
              <circle cx="16.5" cy="7.5" r="1.2" fill="#fff" stroke="none" />
            </svg>
          </span>
          <div>
            <p className="dtp-save-title">You saved $94</p>
            <p className="dtp-save-sub">on this prescription</p>
          </div>
        </div>
      </div>

    </div>
  </section>
);
