import React, { forwardRef, useCallback, useRef, useState } from "react";

import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";

import { FORM, HUBSPOT_FORM_ID, HUBSPOT_PORTAL_ID, REPORT_ID } from "../_data";
import * as classes from "../pharmaDtpResearch.module.css";

/** Download tokens live 10 minutes; ask for a fresh one a minute early. */
const TOKEN_MAX_AGE_MS = 9 * 60 * 1000;

type DownloadLink = {
  href: string;
  issuedAt: number;
};

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
  const [error, setError] = useState<string | null>(null);
  const download = useRef<DownloadLink | null>(null);

  const handleFormSubmit = useCallback(() => {
    // Open the tab now: browsers only allow a new tab during the visitor's
    // click, and the link request below finishes after that moment.
    const tab = window.open("", "_blank");
    setError(null);
    requestDownloadLink()
      .then((link) => {
        download.current = link;
        if (!tab) return;
        tab.opener = null;
        tab.location.href = link.href;
      })
      .catch(() => {
        tab?.close();
        setError(FORM.error);
      });
  }, []);

  const handleFormSubmitted = useCallback(() => setSubmitted(true), []);

  const openReport = async () => {
    const link = download.current;
    if (link && Date.now() - link.issuedAt < TOKEN_MAX_AGE_MS) {
      window.open(link.href, "_blank", "noopener");
      return;
    }
    // The link has expired: fetch a new one and open it here, since a new tab
    // is no longer allowed once the request has finished.
    setError(null);
    try {
      const fresh = await requestDownloadLink();
      download.current = fresh;
      window.location.assign(fresh.href);
    } catch {
      setError(FORM.error);
    }
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
          <p className={classes.readyBody}>{FORM.readyBody}</p>
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
