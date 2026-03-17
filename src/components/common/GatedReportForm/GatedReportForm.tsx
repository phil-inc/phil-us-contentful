import * as React from "react";
import { Anchor, Box, Button, Text, Title } from "@mantine/core";

import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";
import { getHubspotFormDetails } from "utils/utils";

import * as classes from "./GatedReportForm.module.css";

const REPORT_FORM_SUBMITTED_KEY = "researchReportFormSubmitted";

type GatedReportFormProps = {
  column: any;
  fileUrl?: string;
  heading?: string;
  subHeadingText?: string;
  sectionEyebrow?: string;
};

export function GatedReportForm({
  column,
  fileUrl,
  heading,
  subHeadingText,
  sectionEyebrow = "WHAT'S INSIDE",
}: GatedReportFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const { formId, portalId } = getHubspotFormDetails(
    column?.raw ? { raw: column.raw } : undefined
  );

  React.useEffect(() => {
    if (sessionStorage.getItem(REPORT_FORM_SUBMITTED_KEY) === "true") {
      setIsSubmitted(true);
    }
  }, []);

  const handleFormSubmit = () => {
    sessionStorage.setItem(REPORT_FORM_SUBMITTED_KEY, "true");
    setIsSubmitted(true);
  };

  if (!formId || !portalId) return null;

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
          {fileUrl && (
            <Anchor href={fileUrl} target="_blank" referrerPolicy="no-referrer">
              <Button variant="philDefault" w="100%" mb="md">
                Access Report
              </Button>
            </Anchor>
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
        </>
      )}
    </Box>
  );
}
