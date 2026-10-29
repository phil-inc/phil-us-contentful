import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";

import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";

import type { FormConfig } from "./types";
import * as classes from "./researchReport.module.css";

/** Download tokens live 10 minutes; ask for a fresh one a minute early. */
const TOKEN_MAX_AGE_MS = 9 * 60 * 1000;

/** HubSpot only reports success; if it hasn't confirmed by then, treat the submission as failed. */
const CONFIRM_TIMEOUT_MS = 20 * 1000;

/**
 * Remembers a submission until the tab closes, like the other research pages
 * (components/common/GatedReportForm), so a refresh shows "Open Report" instead of the form.
 */
const submittedKey = (reportId: string) => `researchReportFormSubmitted_${reportId}`;

function wasSubmitted(reportId: string): boolean {
  try {
    return sessionStorage.getItem(submittedKey(reportId)) === "true";
  } catch {
    return false; // storage blocked: show the form
  }
}

function rememberSubmitted(reportId: string) {
  try {
    sessionStorage.setItem(submittedKey(reportId), "true");
  } catch {
    // storage blocked: the form shows again on the next visit
  }
}

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
async function requestDownloadLink(reportId: string): Promise<DownloadLink> {
  const res = await fetch("/api/issue-download-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assetId: reportId }),
  });
  if (!res.ok) throw new Error(`status ${res.status}`);
  const { token } = (await res.json()) as { token?: string };
  if (!token) throw new Error("no_token");
  return {
    href: `/api/download-report/${reportId}/${encodeURIComponent(token)}`,
    issuedAt: Date.now(),
  };
}

/**
 * HubSpot hands `onFormReady` a plain form element on current embeds and a jQuery-wrapped one on older ones.
 * Check for an element first: indexing a form element (`form[0]`) returns its first field, not the form.
 */
function formRoot(form: unknown): ParentNode | null {
  if (form instanceof Element) return form;
  const first = (form as ArrayLike<unknown> | null)?.[0];
  return first instanceof Element ? first : null;
}

/** The email field reads "Business Email" in the designs: HubSpot's own label and placeholder are replaced. */
function relabelEmail(form: unknown, text: string) {
  const input = formRoot(form)?.querySelector<HTMLInputElement>("input[type=email], input[name=email]");
  if (!input) return;
  input.placeholder = text;
  const label = input.id ? document.querySelector<HTMLElement>(`label[for="${input.id}"]`) : null;
  const target = label?.querySelector<HTMLElement>("span:not(.hs-form-required)") ?? label;
  if (target) target.textContent = text;
}

type ReportFormProps = {
  form: FormConfig;
  /** Highlights the card after a "#download" link brings the visitor here. */
  glow: boolean;
};

export const ReportForm = forwardRef<HTMLElement, ReportFormProps>(({ form, glow }, ref) => {
  const { reportId } = form;
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

  useEffect(() => {
    if (wasSubmitted(reportId)) setSubmitted(true);
  }, [reportId]);

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

    requestDownloadLink(reportId)
      .then((link) => {
        download.current = link;
        releaseReport();
      })
      // No link: the confirmation offers the "Open Report" button, which asks again.
      .catch(closeWaitingTab);
  }, [releaseReport, reportId]);

  const handleFormSubmitted = useCallback(() => {
    confirmed.current = true;
    rememberSubmitted(reportId);
    setSubmitted(true);
    releaseReport();
  }, [releaseReport, reportId]);

  // Stable, like the other callbacks: HubSpot's embed is created from these options.
  const emailLabel = form.emailLabel;
  const handleFormReady = useCallback((hubspotForm: unknown) => relabelEmail(hubspotForm, emailLabel), [emailLabel]);

  const openReport = () => {
    setError(null);
    if (isFresh(download.current)) {
      window.open(download.current.href, "_blank", "noopener");
      return;
    }
    // No usable link: open the tab during this click, then send it on once a fresh link arrives.
    const tab = window.open("", "_blank");
    requestDownloadLink(reportId)
      .then((link) => {
        download.current = link;
        if (tab) sendTab(tab, link.href);
        // Pop-ups blocked entirely: open the report here rather than not at all.
        else window.location.assign(link.href);
      })
      .catch(() => {
        tab?.close();
        setError(form.error);
      });
  };

  return (
    <aside id="download" ref={ref} className={`${classes.formCard} ${glow ? classes.formCardGlow : ""}`}>
      <p className={classes.formEyebrow}>{form.eyebrow}</p>

      <div className={submitted ? classes.hidden : undefined}>
        <HubspotFormV2
          portalId={form.portalId}
          formId={form.formId}
          classname={classes.hsForm}
          formMinHeight="280px"
          disableHubspotCss
          onFormSubmit={handleFormSubmit}
          onFormReady={handleFormReady}
          callbackFn={handleFormSubmitted}
        />
      </div>

      {submitted && (
        <div className={classes.ready}>
          <p className={classes.readyTitle}>{form.readyTitle}</p>
          <p className={classes.readyBody}>{openedInTab ? form.readyBody : form.readyManual}</p>
          <button type="button" className={classes.openButton} onClick={openReport}>
            {form.openLabel}
          </button>
        </div>
      )}

      {error && (
        <p className={classes.formError} role="alert">
          {error}
        </p>
      )}

      {!submitted && <p className={classes.privacy}>{form.privacy}</p>}
    </aside>
  );
});

ReportForm.displayName = "ReportForm";
