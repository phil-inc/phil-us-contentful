import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";
import React from "react";
import { useId } from "@mantine/hooks";
import { Box, Center, Loader } from "@mantine/core";
import { navigate } from "gatsby";

const DEFAULT_REDIRECT = "/sharpen-your-access-and-commercialization-efforts";

type HubSpotFormProps = {
  portalId: string;
  formId: string;
  classname?: string;
  /**
   * Optional resolver to pick the post-submit destination based on the
   * submitted email (e.g. to branch target accounts to a scheduler page).
   * When omitted, the form keeps its default redirect.
   */
  getRedirectPath?: (ctx: { email?: string }) => string | Promise<string>;
};

const HubSpotForm: React.FC<HubSpotFormProps> = ({
  portalId,
  formId,
  classname = "",
  getRedirectPath,
}) => {
  const uuid = useId();
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);
  const emailRef = React.useRef<string | undefined>(undefined);

  // Capture the submitted email so the redirect can branch on the domain.
  // HubSpot dispatches a window `message` event for form lifecycle callbacks;
  // read the email from the submit payload (reliable + independent of the hook).
  React.useEffect(() => {
    const handler = (event: MessageEvent) => {
      const d: any = event?.data;
      if (!d || d.type !== "hsFormCallback") return;
      if (d.eventName !== "onFormSubmit" && d.eventName !== "onFormSubmitted") {
        return;
      }
      const fields = Array.isArray(d.data) ? d.data : d.data?.submissionValues;
      const email = Array.isArray(fields)
        ? fields.find((f: any) => f?.name === "email")?.value
        : fields?.email;
      if (email) emailRef.current = String(email).trim();
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const { error, formCreated, loaded } = useHubspotForm({
    target: `#${uuid}`,
    portalId,
    formId,
    cssClass: classname,
    // Secondary capture: read the email straight from the form DOM before submit.
    onFormSubmit() {
      try {
        const scope = document.getElementById(uuid);
        const input =
          (scope?.querySelector(
            'input[name="email"]',
          ) as HTMLInputElement | null) ??
          (scope?.querySelector(
            'input[type="email"]',
          ) as HTMLInputElement | null);
        if (input?.value) emailRef.current = input.value.trim();
      } catch {
        /* keep any value already captured via the message event */
      }
    },
    async onFormSubmitted() {
      try {
        const path = getRedirectPath
          ? await getRedirectPath({ email: emailRef.current })
          : DEFAULT_REDIRECT;
        navigate(path || DEFAULT_REDIRECT);
      } catch (err) {
        console.error("HubspotForm redirect resolution failed", err);
        navigate(DEFAULT_REDIRECT);
      }
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
