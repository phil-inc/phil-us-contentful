import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";

import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";

import { FORM, HUBSPOT_FORM_ID, HUBSPOT_PORTAL_ID, REPORT_ID } from "../_data";
import * as classes from "../pharmaDtpResearch.module.css";

/** Download tokens live 10 minutes; ask for a fresh one a minute early. */
const TOKEN_MAX_AGE_MS = 9 * 60 * 1000;

/** HubSpot only reports success; if it hasn't confirmed by then, treat the submission as failed. */
const CONFIRM_TIMEOUT_MS = 20 * 1000;

type DownloadLink = {
  href: string;
  issuedAt: number;
};

const isFresh = (link: DownloadLink | null): link is DownloadLink =>
  link !== null && Date.now() - link.issuedAt < TOKEN_MAX_AGE_MS;

/** Points a tab opened earlier at the report, cutting its link back to this page. */
function sendTab(tab: Window, href: string) {
  tab.opener = null;
  tab.location.href = href;
}

/**
 * A short-lived link to the report. The server only knows the file's real
 * address; this page never does (see src/utils/gatedReports.ts).
 */
async function requestDownloadLink(): Promise<DownloadLink> {
  const res = await fetch("/api/issue-download-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assetId: REPORT_ID }),
  });
  if (!res.ok) throw new Error(`status ${res.status}`);
  const { token } = (await res.json()) as { token?: string };
  if (!token) throw new Error("no_token");
  return {
    href: `/api/download-report/${REPORT_ID}/${encodeURIComponent(token)}`,
    issuedAt: Date.now(),
  };
}

type ReportFormProps = {
  /** Highlights the card after a "#download" link brings the visitor here. */
  glow: boolean;
};

export const ReportForm = forwardRef<HTMLElement, ReportFormProps>(({ glow }, ref) => {
  const [submitted, setSubmitted] = useState(false);
  // Whether the report reached its own tab, so the confirmation can say so truthfully.
  const [openedInTab, setOpenedInTab] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const download = useRef<DownloadLink | null>(null);
  // The tab opened at submit. It stays empty until HubSpot has saved the submission.
  const waitingTab = useRef<Window | null>(null);
  const confirmed = useRef(false);
  const confirmTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(confirmTimer.current), []);

  const closeWaitingTab = () => {
    waitingTab.current?.close();
    waitingTab.current = null;
  };

  // Sends the waiting tab to the report once both HubSpot's confirmation and the link are in.
  const releaseReport = useCallback(() => {
    const tab = waitingTab.current;
    const link = download.current;
    if (!tab || !confirmed.current || !link) return;
    window.clearTimeout(confirmTimer.current);
    waitingTab.current = null;
    sendTab(tab, link.href);
    setOpenedInTab(true);
  }, []);

  const handleFormSubmit = useCallback(() => {
    // Open the tab now: browsers only allow a new tab during the visitor's click,
    // and both HubSpot's confirmation and the link request finish after it.
    waitingTab.current = window.open("", "_blank");
    confirmed.current = false;
    setError(null);
    window.clearTimeout(confirmTimer.current);
    confirmTimer.current = window.setTimeout(() => {
      if (!confirmed.current) closeWaitingTab();
    }, CONFIRM_TIMEOUT_MS);

    requestDownloadLink()
      .then((link) => {
        download.current = link;
        releaseReport();
      })
      // No link: the confirmation offers the "Open Report" button, which asks again.
      .catch(closeWaitingTab);
  }, [releaseReport]);

  const handleFormSubmitted = useCallback(() => {
    confirmed.current = true;
    setSubmitted(true);
    releaseReport();
  }, [releaseReport]);

  const openReport = () => {
    setError(null);
    if (isFresh(download.current)) {
      window.open(download.current.href, "_blank", "noopener");
      return;
    }
    // No usable link: open the tab during this click, then send it on once a fresh link arrives.
    const tab = window.open("", "_blank");
    requestDownloadLink()
      .then((link) => {
        download.current = link;
        if (tab) sendTab(tab, link.href);
        // Pop-ups blocked entirely: open the report here rather than not at all.
        else window.location.assign(link.href);
      })
      .catch(() => {
        tab?.close();
        setError(FORM.error);
      });
  };

  return (
    <aside id="download" ref={ref} className={`${classes.formCard} ${glow ? classes.formCardGlow : ""}`}>
      <p className={classes.formEyebrow}>{FORM.eyebrow}</p>

      <div className={submitted ? classes.hidden : undefined}>
        <HubspotFormV2
          portalId={HUBSPOT_PORTAL_ID}
          formId={HUBSPOT_FORM_ID}
          classname={classes.hsForm}
          formMinHeight="280px"
          disableHubspotCss
          onFormSubmit={handleFormSubmit}
          callbackFn={handleFormSubmitted}
        />
      </div>

      {submitted && (
        <div className={classes.ready}>
          <p className={classes.readyTitle}>{FORM.readyTitle}</p>
          <p className={classes.readyBody}>{openedInTab ? FORM.readyBody : FORM.readyManual}</p>
          <button type="button" className={classes.openButton} onClick={openReport}>
            {FORM.openLabel}
          </button>
        </div>
      )}

      {error && (
        <p className={classes.formError} role="alert">
          {error}
        </p>
      )}

      {!submitted && <p className={classes.privacy}>{FORM.privacy}</p>}
    </aside>
  );
});

ReportForm.displayName = "ReportForm";
