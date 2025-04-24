import React from "react";
import { Anchor, Button, Grid, Center, Loader, Text } from "@mantine/core";
import type { ISection } from "types/section";
import { parseScript } from "utils/parseScript";
import { useHubspotForm } from "@aaronhayes/react-use-hubspot-form";
import type { TResponse } from "extract-json-from-string";
import PageContext from "contexts/PageContext";
import { CONTACT_PAGE } from "constants/page";

import * as classes from "./contactForm.module.css";

const HubspotForm: React.FC<{
  formProps: TResponse;
  section?: ISection;
  formTag?: string;
}> = ({ formProps, section, formTag }) => {
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);
  const [isListenerAdded, setIsListenerAdded] = React.useState<boolean>(false);

  const context = React.useContext(PageContext);

  // Scroll to top on hubspot form submit
  React.useEffect(() => {
    const parentDiv = document.getElementById("hubspotContactForm");

    if (context.title === CONTACT_PAGE) {
      if (!isListenerAdded) {
        let observer: MutationObserver;

        // eslint-disable-next-line prefer-const
        observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            // Check if the added or removed nodes belong to a HubSpot form
            const addedNodes = Array.from(mutation.addedNodes);

            const isHubSpotFormAdded = addedNodes.some((node: Node) => {
              if (node instanceof Element) {
                return (
                  node.className.includes("hs-form") ||
                  node.id.includes("hs-form")
                );
              }

              return false;
            });

            if (isHubSpotFormAdded) {
              // Get the form element and the submit button element
              const form = (mutation.target as Element).querySelector(
                "form.hs-form",
              );

              const submitButton = form?.querySelector('input[type="submit"]');
              if (submitButton) {
                submitButton.addEventListener("click", () => {
                  observer.disconnect();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                });
                setIsListenerAdded(true);
              }
            }
          });
        });

        // Configure the observer to watch for changes in the parent of the button you want to find
        const observerConfig = {
          childList: true,
          subtree: true,
        };

        if (parentDiv?.parentNode) {
          observer.observe(parentDiv.parentNode, observerConfig);
        }

        return () => {
          observer.disconnect();
        };
      }
    }
  }, [hasRendered]);

  if (section?.isHubspotEmbed) {
    let options: { target: string; formId: string; portalId: string } = {
      target: "#hubspotContactForm",
      formId: "",
      portalId: "",
    };
    if (!formProps.custom) {
      options.formId = formProps.formId;
      options.portalId = formProps.portalId;
    }

    if (formTag === "hcp" && formProps.custom) {
      options = {
        ...options,
        formId: formProps.custom.forms.hcp.formId,
        portalId: formProps.custom.forms.hcp.portalId,
      };
    } else if (formTag === "manufacturer" && formProps.custom) {
      options = { ...options, ...formProps.custom.forms.manufacturer };
    } else if (formTag === "other" && formProps.custom) {
      options = { ...options, ...formProps.custom.forms.other };
    }

    const { loaded, formCreated } = useHubspotForm(options);

    // Handle loader
    if (loaded && formCreated && !hasRendered) {
      setHasRendered(true);
    }
  }

  return hasRendered ? (
    <div className={classes.hubspotContactForm} id="hubspotContactForm"></div>
  ) : (
    <Center>
      <Loader mt={0} size="lg" />
    </Center>
  );
};

const ContactForm: React.FC<{ section: ISection }> = ({ section }) => {
  const [formTag, setFormTag] = React.useState<string>("");

  const object: any = parseScript(section.body);

  const [formProps] = object as TResponse[];

  return formTag.length || Boolean(!formProps.custom) ? (
    <HubspotForm formProps={formProps} formTag={formTag} section={section} />
  ) : (
    <>
      <Text m={0} mb={16}>
        Who are you (select one below)
      </Text>

      <Grid gutter={"sm"}>
        <Grid.Col span={6}>
          <Anchor
            href="https://philhelp.zendesk.com/hc/en-us/p/faq"
            target="_blank"
            underline="never"
            className={classes.fullWidth}
          >
            <Button radius={0} variant="outline" color="dark" fullWidth>
              Patient/Caregiver
            </Button>
          </Anchor>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            radius={0}
            variant="outline"
            color="dark"
            onClick={() => {
              setFormTag("HCP".toLowerCase());
            }}
            fullWidth
          >
            HCP
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            radius={0}
            variant="outline"
            color="dark"
            onClick={() => {
              setFormTag("Manufacturer".toLowerCase());
            }}
            fullWidth
          >
            Manufacturer
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            radius={0}
            variant="outline"
            color="dark"
            onClick={() => {
              setFormTag("Other".toLowerCase());
            }}
            fullWidth
          >
            Other
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ContactForm;
