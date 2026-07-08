import React from "react";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import * as classes from "./thankyou.module.css";

// Non-TAM confirmation page (MRTG-1438): hero + demo video.
// Reached from the demo form when the submitter's email domain is NOT a target account.

const VIDEO_ID = "dn-MvZkdHTU";

const TITLE = "Thank You | PHIL — Demo Request Received";
const DESC =
  "Thanks for your interest in PHIL. Our Sales team will be in touch shortly to schedule your walkthrough. Watch the solution demo while you wait.";

const IconCheck = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth={3.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const IconPlay = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#C6F3E4">
    <path d="M6 4l14 8-14 8z" />
  </svg>
);

const DemoThankYouPage = () => (
  <PageContext.Provider value={{ title: "Demo Request Received" }}>
    <Layout>
      <div className={classes.tyPage}>
        <header className={classes.tyHero}>
          <div className={classes.tyHeroDeco} />
          <div className="xl-container">
            <div className={classes.tyHeroInner}>
              {/* message */}
            <div className={classes.tyRise}>
              <div className={classes.tyEyebrow}>
                <span className={classes.tyCheck}>
                  <IconCheck />
                </span>
                Demo Request Received
              </div>
              <h1 className={classes.tyH1}>
                Thanks For Your Interest in Our Solution
              </h1>
              <p className={classes.tySub}>
                Our Sales team will be in touch shortly. Please check your inbox
                for a confirmation email with next steps. We look forward to
                connecting with you!
              </p>
            </div>

            {/* demo video */}
            <div
              className={`${classes.tyVideoWrap} ${classes.tyRise}`}
              style={{ animationDelay: "0.12s" }}
            >
              <div className={classes.tyVideoLabel}>
                <IconPlay /> See Our Solution
              </div>
              <div className={classes.tyVideoCard}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1&mute=1&playsinline=1`}
                  title="PHIL Solution Demo"
                  allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
            </div>
          </div>
        </header>
      </div>
    </Layout>
  </PageContext.Provider>
);

export default DemoThankYouPage;

export const Head: HeadFC = () => (
  <>
    <title>{TITLE}</title>
    <meta name="description" content={DESC} />
    <meta name="robots" content="noindex, follow" />
  </>
);
