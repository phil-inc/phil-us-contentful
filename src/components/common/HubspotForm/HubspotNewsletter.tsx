import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";
import React from "react";
import { useId } from "@mantine/hooks";

const HubSpotNewsletter = () => {
  const uuid = useId();

  const newsletterForm = useHubspotForm({
    target: `#${uuid}`,
    portalId: "20880193",
    formId: "af4535b2-dc53-4b71-b711-a7e546233d81",
  });

  return <div id={uuid}></div>;
};

export default React.memo(HubSpotNewsletter);
