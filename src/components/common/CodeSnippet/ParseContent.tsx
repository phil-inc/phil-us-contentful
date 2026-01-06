import React, { useEffect, type FC, type ReactNode, ReactElement } from "react";
import parse, {
  type Element,
  type HTMLReactParserOptions,
  attributesToProps,
} from "html-react-parser";
import { sanitize } from "isomorphic-dompurify";
import { PHIL_TRUSTPILOT_IDENTIFIER } from "constants/identifiers";

import TrustpilotWidget from "components/common/TrustpilotWidget/TrustPilotWidget";

import { extractTrustpilotHtmlFromString } from "utils/extractTrustpilotHtml";

type ParseContentProps = {
  content?: string;
};

type ElementWithId = {
  id?: string;
};

// Function to safely retrieve ID from a parsed JSX element or an array of elements
const extractIdFromElement = (element: ReactNode): string | undefined => {
  if (typeof element === "string") {
    return;
  }

  if (React.isValidElement(element)) {
    const { id } = element.props as ElementWithId;
    return id ?? undefined;
  }

  if (Array.isArray(element)) {
    const validElements = element.filter(React.isValidElement);
    for (const child of validElements) {
      const id = extractIdFromElement(child);
      if (id) {
        return id;
      }
    }
  }

  return undefined;
};

export const ParseContent: FC<ParseContentProps> = ({ content }) => {
  const parsingOptions: HTMLReactParserOptions = {
    replace(domNode: Element) {
      if (domNode.attribs) {
        const props = attributesToProps(domNode.attribs);
        return <div {...props} />;
      }
    },
  };

  const sanitizedContent = sanitize(content ?? "");
  const parsedContent = parse(sanitizedContent, parsingOptions);
  const trustpilotHtml = extractTrustpilotHtmlFromString(sanitizedContent);

  useEffect(() => {
    const elementId = extractIdFromElement(parsedContent);

    if (elementId) {
      const element = document.getElementById(elementId);

      if (
        elementId === PHIL_TRUSTPILOT_IDENTIFIER &&
        element &&
        window?.Trustpilot
      ) {
        window.Trustpilot?.loadFromElement(element, true);
      }
    }
  }, [parsedContent]);

  return <div>
         {trustpilotHtml 
         ?<>
            <TrustpilotWidget />
              <div
                dangerouslySetInnerHTML={{ __html: trustpilotHtml }}
                data-trustpilot-rendered
              />
          </>
        :parsedContent
        }
    </div>;
};
