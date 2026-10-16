import React from "react";
import { navigate } from "gatsby";
import { useId } from "@mantine/hooks";
import { Box, Center, Loader } from "@mantine/core";
import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";

type HubSpotFormProps = {
  portalId: string;
  formId: string;
  classname?: string;
  callbackFn?: () => void;
  /** Runs when the visitor submits, before HubSpot sends the data — still inside their click. */
  onFormSubmit?: () => void;
  /** Turns off HubSpot's own stylesheet, for forms styled entirely by the page. */
  disableHubspotCss?: boolean;
  formMinHeight?: string;
};

// Inner component that only renders when DOM is ready
const HubSpotFormInner: React.FC<HubSpotFormProps & { targetId: string }> = ({
  portalId,
  formId,
  classname = "",
  targetId,
  callbackFn,
  onFormSubmit,
  disableHubspotCss,
}) => {
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);

  const formOptions = {
    target: `#${targetId}`,
    portalId,
    formId,
    cssClass: classname,
    ...(onFormSubmit ? { onFormSubmit: () => onFormSubmit() } : {}),
    // `css` is a HubSpot embed option the hook's type doesn't list; it passes options through as-is.
    ...(disableHubspotCss ? { css: "" } : {}),
    onFormSubmitted() {
      callbackFn ? callbackFn() : null;
    },
  };
  const { error, formCreated, loaded } = useHubspotForm(formOptions);

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
  callbackFn,
  onFormSubmit,
  disableHubspotCss,
  formMinHeight = "1px",
}) => {
  const uuid = useId();
  const [shouldRenderForm, setShouldRenderForm] =
    React.useState<boolean>(false);
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
      style={{ minHeight: formMinHeight }}
    >
      {shouldRenderForm ? (
        <HubSpotFormInner
          portalId={portalId}
          formId={formId}
          classname={classname}
          targetId={uuid}
          callbackFn={callbackFn}
          onFormSubmit={onFormSubmit}
          disableHubspotCss={disableHubspotCss}
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
