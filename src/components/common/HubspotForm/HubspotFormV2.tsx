import React from "react";
import { navigate } from "gatsby";
import { useId } from "@mantine/hooks";
import { Box, Center, Loader } from "@mantine/core";
import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";

type HubSpotFormProps = {
  portalId: string;
  formId: string;
  classname?: string;
};

// Inner component that only renders when DOM is ready
const HubSpotFormInner: React.FC<HubSpotFormProps & { targetId: string }> = ({
  portalId,
  formId,
  classname = "",
  targetId,
}) => {
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);

  const { error, formCreated, loaded } = useHubspotForm({
    target: `#${targetId}`,
    portalId,
    formId,
    cssClass: classname,
    onFormSubmitted() {
      navigate("/sharpen-your-access-and-commercialization-efforts");
    },
  });

  React.useEffect(() => {
    if (hasRendered) {
      const modalForm = document.querySelector(`#${targetId}`);

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
  }, [hasRendered, targetId]);

  React.useEffect(() => {
    if (loaded && formCreated && !hasRendered) {
      setHasRendered(true);
    }
  }, [loaded, formCreated]);

  return !hasRendered ? (
    <Center>
      <Loader mt={120} size="lg" />
    </Center>
  ) : null;
};

// Main component
const HubSpotFormV2: React.FC<HubSpotFormProps> = ({
  portalId,
  formId,
  classname = "",
}) => {
  const uuid = useId();
  const [shouldRenderForm, setShouldRenderForm] = React.useState<boolean>(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (elementRef.current) {
      // Ensure DOM element is available before rendering the inner component
      setShouldRenderForm(true);
    }
  }, []);

  return (
    <Box 
      ref={elementRef}
      className={classname} 
      id={uuid}
      style={{ minHeight: '200px' }}
    >
      {shouldRenderForm ? (
        <HubSpotFormInner
          portalId={portalId}
          formId={formId}
          classname={classname}
          targetId={uuid}
        />
      ) : (
        <Center>
          <Loader mt={120} size="lg" />
        </Center>
      )}
    </Box>
  );
};

export default React.memo(HubSpotFormV2);