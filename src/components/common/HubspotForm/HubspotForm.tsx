import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";
import React from "react";
import { useId } from "@mantine/hooks";
import { Box, Center, Loader } from "@mantine/core";
import { navigate } from "gatsby";

const DEFAULT_REDIRECT = "/sharpen-your-access-and-commercialization-efforts";
// Fail-safe: hide the overlay if submit never confirms.
const OVERLAY_TIMEOUT_MS = 8000;

type HubSpotFormProps = {
  portalId: string;
  formId: string;
  classname?: string;
  /** Resolve the post-submit path from the email; omit to keep the default redirect. */
  getRedirectPath?: (ctx: { email?: string }) => string | Promise<string>;
  /** Submit-overlay label (only shown when getRedirectPath is set). */
  submittingLabel?: string;
};

const HubSpotForm: React.FC<HubSpotFormProps> = ({
  portalId,
  formId,
  classname = "",
  getRedirectPath,
  submittingLabel = "Capturing your demo request...",
}) => {
  const uuid = useId();
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const emailRef = React.useRef<string | undefined>(undefined);
  // Latest resolver, without re-binding the window listener.
  const getRedirectPathRef = React.useRef(getRedirectPath);
  getRedirectPathRef.current = getRedirectPath;
  // In-flight redirect decision (started on submit, awaited on confirm).
  const redirectPromiseRef = React.useRef<Promise<string> | null>(null);
  const overlayTimerRef = React.useRef<number | null>(null);

  // On submit: start the redirect decision in parallel with HubSpot's own
  // submission, and show the overlay so its inline message stays hidden.
  const startRedirect = React.useCallback((email?: string) => {
    if (!getRedirectPathRef.current) return;
    if (!redirectPromiseRef.current) {
      const fn = getRedirectPathRef.current;
      redirectPromiseRef.current = Promise.resolve()
        .then(() => fn({ email }))
        .then((path) => path || DEFAULT_REDIRECT)
        .catch(() => DEFAULT_REDIRECT);
    }
    setSubmitting(true);
    if (overlayTimerRef.current) window.clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = window.setTimeout(
      () => setSubmitting(false),
      OVERLAY_TIMEOUT_MS,
    );
  }, []);

  // Capture the submitted email from HubSpot's window `message` event.
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
      if (d.eventName === "onFormSubmit") startRedirect(emailRef.current);
    };
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
      if (overlayTimerRef.current) window.clearTimeout(overlayTimerRef.current);
    };
  }, [startRedirect]);

  const { error, formCreated, loaded } = useHubspotForm({
    target: `#${uuid}`,
    portalId,
    formId,
    cssClass: classname,
    // Backup email capture + start the redirect early.
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
      startRedirect(emailRef.current);
    },
    async onFormSubmitted() {
      try {
        if (!getRedirectPathRef.current) {
          navigate(DEFAULT_REDIRECT);
          return;
        }
        setSubmitting(true);
        // Await the decision started on submit (resolve fresh if needed).
        const path = await (redirectPromiseRef.current ??
          Promise.resolve(getRedirectPathRef.current({ email: emailRef.current })));
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

  const formBody = hasRendered ? (
    <Box className={classname} id={uuid}></Box>
  ) : (
    <Center>
      <Loader mt={120} size="lg" />
    </Center>
  );

  // No resolver → original markup (no wrapper/overlay); other pages unaffected.
  if (!getRedirectPath) return formBody;

  return (
    <div style={{ position: "relative" }}>
      {formBody}

      {submitting && (
        <div
          aria-live="polite"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            color: "#00615e",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          <Loader size="lg" />
          <span>{submittingLabel}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(HubSpotForm);
