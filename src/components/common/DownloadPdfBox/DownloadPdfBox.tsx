import * as React from "react";
import { Anchor, Box, Button, Divider, Text } from "@mantine/core";

import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";

import { BodyType } from "types/section";

import { getHubspotFormDetails } from "utils/utils";

import * as classes from "./DownloadPdfBox.module.css";

type IDownloadPdfBoxProps = {
  fileUrl?: string;
  embeddedForm?: BodyType;
};

export function DownloadPdfBox(props: IDownloadPdfBoxProps) {
  const { embeddedForm, fileUrl } = props;
  const [isHubspotSubmitted, setIsHubspotSubmitted] = React.useState(false);

  const { formId, portalId } = getHubspotFormDetails(embeddedForm);

  React.useEffect(() => {
    const already = sessionStorage.getItem("caseStudyEmailSubmitted");
    if (already === "true") {
      setIsHubspotSubmitted(true);
    }
  }, []);
  const handleDownload = () => {
    if (!fileUrl) return;
    window.open(fileUrl, "_blank", "noopener,noreferrer");
    setIsHubspotSubmitted(true);
    sessionStorage.setItem("caseStudyEmailSubmitted", "true");
  };

  return (
    <div>
      <Box p={24} className={classes.box}>
        <Text size="14px" fw={700} mb={20}>
          Get the PDF of this blog
        </Text>
        <Divider className={classes.divider} mt={8} />

        {isHubspotSubmitted ? (
          <Anchor href={fileUrl} target="_blank" referrerPolicy="no-referrer">
            <Button variant="philDefault" w={"100%"} mt={20}>
              Download PDF
            </Button>
          </Anchor>
        ) : (
          <div>
            <Text size="14px" fw={700} mb={18}>
              To Access the full case study
            </Text>
            {Boolean(embeddedForm) && (
              <HubspotFormV2
                formId={formId}
                portalId={portalId}
                callbackFn={handleDownload}
              />
            )}
          </div>
        )}
      </Box>
    </div>
  );
}
