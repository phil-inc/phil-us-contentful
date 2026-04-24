import * as React from "react";
import { Anchor, Box, Button, Text, Title } from "@mantine/core";

import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";
import { getHubspotFormDetails } from "utils/utils";

import * as classes from "./GatedReportForm.module.css";

const SUBMITTED_KEY = "researchReportFormSubmitted";

type GatedReportFormProps = {
  column: any;
  assetId?: string;
  heading?: string;
  subHeadingText?: string;
  sectionEyebrow?: string;
};

export function GatedReportForm({
  column,
  assetId,
  heading,
  subHeadingText,
  sectionEyebrow = "WHAT'S INSIDE",
}: GatedReportFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [downloadToken, setDownloadToken] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const inFlightRef = React.useRef(false);

  const { formId, portalId } = getHubspotFormDetails(
    column?.raw ? { raw: column.raw } : undefined
  );

  // On mount: restore submitted state only — don't auto-request token
  React.useEffect(() => {
    if (sessionStorage.getItem(SUBMITTED_KEY) === "true") {
      setIsSubmitted(true);
    }
  }, []);

  const requestDownloadToken = React.useCallback(async () => {
    if (!assetId) {
      setError("Missing asset reference. Please refresh and try again.");
      return;
    }
    setError(null);
    try {
      const res = await fetch("/api/issue-download-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const { token } = (await res.json()) as { token?: string };
      if (!token) throw new Error("no_token");
      setDownloadToken(token);
    } catch {
      setError("We couldn't generate your download link. Please try again.");
    }
  }, [assetId]);

  const handleFormSubmit = () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    sessionStorage.setItem(SUBMITTED_KEY, "true");
    setIsSubmitted(true);
    void requestDownloadToken().finally(() => {
      inFlightRef.current = false;
    });
  };

  const handleGetLink = () => {
    void requestDownloadToken();
  };

  if (!formId || !portalId) return null;

  const downloadHref =
    assetId && downloadToken
      ? `/api/download-report/${assetId}?token=${encodeURIComponent(downloadToken)}`
      : null;

  return (
    <Box className={classes.form}>
      {isSubmitted ? (
        <Box className={classes.submitted}>
          {sectionEyebrow && (
            <Text className={classes.submittedEyebrow}>
              {sectionEyebrow.toUpperCase()}
            </Text>
          )}
          {heading && (
            <Title order={2} className={classes.submittedTitle}>
              {heading}
            </Title>
          )}
          {subHeadingText && (
            <Text className={classes.submittedDesc}>
              {subHeadingText}
            </Text>
          )}

          {downloadHref ? (
            <Anchor
              href={downloadHref}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
            >
              <Button variant="philDefault" w="100%" mb="md">
                Access Report
              </Button>
            </Anchor>
          ) : (
            <>
              <Text fz="sm" c="dimmed" mb="sm">
                You&apos;ve already submitted. Click below to get your download link.
              </Text>
              <Button
                variant="philDefault"
                w="100%"
                mb="md"
                onClick={handleGetLink}
              >
                Get Download Link
              </Button>
              {error && (
                <Text c="red" fz="sm" mb="sm">
                  {error}
                </Text>
              )}
            </>
          )}

          <Text className={classes.submittedPrivacy} component="p">
            By submitting this form, you agree to PHIL&apos;s{" "}
            <Anchor
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.privacyLink}
            >
              Privacy Policy
            </Anchor>
            . We&apos;ll only use your information to send you relevant content.
          </Text>
        </Box>
      ) : (
        <>
          <Text fw={700} fz="sm" mb={4}>
            Get the full report
          </Text>
          <Text fz="xs" c="dimmed" mb="xs">
            Fill out the form below to download the PDF.
          </Text>
          <hr />
          <HubspotFormV2
            formId={formId}
            portalId={portalId}
            formMinHeight="200px"
            callbackFn={handleFormSubmit}
          />
          {error && (
            <Text c="red" fz="sm" mt="sm">
              {error}
            </Text>
          )}
        </>
      )}
    </Box>
  );
}
