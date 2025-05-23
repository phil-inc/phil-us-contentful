import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";
import React from "react";
import { useId } from "@mantine/hooks";
import { Box, Center, Loader } from "@mantine/core";
import { navigate } from "gatsby";

type HubSpotFormProps = {
  portalId: string;
  formId: string;
  classname?: string;
};

const HubSpotForm: React.FC<HubSpotFormProps> = ({
  portalId,
  formId,
  classname = "",
}) => {
  const uuid = useId();
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);

  const { error, formCreated, loaded } = useHubspotForm({
    target: `#${uuid}`,
    portalId,
    formId,
    cssClass: classname,
    onFormSubmitted() {
      navigate("/sharpen-your-access-and-commercialization-efforts");
    },
  });

  React.useEffect(() => {
    if (hasRendered) {
      const modalForm = document.querySelector(`#${uuid}`);

      if (modalForm) {
        const observer = new MutationObserver((mutationsList, observer) => {
          mutationsList.forEach((mutation) => {
            if (mutation.type === "childList") {
              const fieldsets: NodeList[] = (
                mutation.target as Element
              ).querySelectorAll(
                'fieldset div[style*="display: none"]',
              ) as unknown as NodeList[];
              fieldsets.forEach((fieldset) => {
                const { parentElement } = fieldset as unknown as HTMLDivElement;
                parentElement!.style.display = "none";
              });
            }
          });
        });
        observer.observe(modalForm, {
          attributes: true,
          childList: true,
          subtree: true,
        });

        return () => {
          observer.disconnect();
        };
      }
    }
  }, [hasRendered]);

  React.useEffect(() => {
    // Handle loader
    if (loaded && formCreated && !hasRendered) {
      setHasRendered(true);
    }
  }, [loaded, formCreated]);

  return (
    <>
      {hasRendered ? (
        <Box className={classname} id={uuid}></Box>
      ) : (
        <Center>
          <Loader mt={120} size="lg" />
        </Center>
      )}
    </>
  );
};

export default React.memo(HubSpotForm);
