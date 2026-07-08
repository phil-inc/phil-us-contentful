import React from "react";
import type { HeadFC } from "gatsby";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import * as classes from "./thankyou.module.css";

// TAM confirmation page (MRTG-1438): hero + HubSpot Meetings auto-scheduler.
// Reached from the demo form when the submitter's email domain IS a target account.
// Note: the scheduler itself is HubSpot's cross-origin iframe — only the shell
// around it (.tySchedShell) is styled here; the calendar internals are HubSpot's.

const MEETINGS_SRC = "https://meetings.hubspot.com/jzeidman?embed=true";
const MEETINGS_SCRIPT =
  "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

const TITLE = "Book Your Demo | PHIL";
const DESC =
  "Thanks for your interest in PHIL. Pick a time that works for you and we'll walk you through the platform in about 30 minutes.";

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

const DemoSchedulePage = () => {
  const shellRef = React.useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState(false);

  // Load the HubSpot Meetings embed script after mount so it finds
  // .meetings-iframe-container and injects the scheduler iframe. Show a loader
  // until that injected iframe finishes loading.
  React.useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = MEETINGS_SCRIPT;
    s.async = true;
    document.body.appendChild(s);

    const container = shellRef.current?.querySelector(
      ".meetings-iframe-container",
    );
    const onIframeLoad = () => setLoaded(true);

    // The iframe is injected asynchronously; watch for it, then wait for its load.
    const attach = (iframe: HTMLIFrameElement) => {
      observer.disconnect();
      iframe.addEventListener("load", onIframeLoad);
    };
    const observer = new MutationObserver(() => {
      const iframe = container?.querySelector("iframe");
      if (iframe) attach(iframe as HTMLIFrameElement);
    });
    if (container) {
      const existing = container.querySelector("iframe");
      if (existing) attach(existing as HTMLIFrameElement);
      else observer.observe(container, { childList: true, subtree: true });
    }

    // Safety net: never leave the loader up indefinitely.
    const fallback = window.setTimeout(() => setLoaded(true), 8000);

    return () => {
      s.remove();
      observer.disconnect();
      container?.querySelector("iframe")?.removeEventListener("load", onIframeLoad);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <PageContext.Provider value={{ title: "Book Your Demo" }}>
      <Layout>
        <div className={classes.tyPage}>
          <header className={`${classes.tyHero} ${classes.tyHeroTam}`}>
            <div className={classes.tyHeroDeco} />
            <div
              className={`${classes.tyHeroInner} ${classes.tyHeroInnerTam} ${classes.tyRise}`}
            >
              <div className={classes.tyEyebrow}>
                <span className={classes.tyCheck}>
                  <IconCheck />
                </span>
                Book Your Demo
              </div>
              <h1 className={classes.tyH1}>
                Thanks For Your Interest in Our Solution
              </h1>
              <p className={classes.tySub}>
                Select a day and time that works for you to schedule a discovery
                call with our Sales team.
              </p>
            </div>
          </header>

          <section className={classes.tySchedSection}>
            <div
              ref={shellRef}
              className={`${classes.tySchedShell} ${classes.tyRise}`}
              style={{ animationDelay: "0.1s" }}
            >
              {!loaded && (
                <div className={classes.schedLoading} aria-live="polite">
                  <span className={classes.schedSpinner} />
                  <span>Loading the scheduler…</span>
                </div>
              )}
              {/* Start of Meetings Embed Script */}
              <div className="meetings-iframe-container" data-src={MEETINGS_SRC} />
              {/* End of Meetings Embed Script */}
            </div>
          </section>
        </div>
      </Layout>
    </PageContext.Provider>
  );
};

export default DemoSchedulePage;

export const Head: HeadFC = () => (
  <>
    <title>{TITLE}</title>
    <meta name="description" content={DESC} />
    <meta name="robots" content="noindex, follow" />
  </>
);
