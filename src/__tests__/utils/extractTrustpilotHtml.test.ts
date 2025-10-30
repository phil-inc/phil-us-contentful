import { BLOCKS, type Paragraph } from "@contentful/rich-text-types";

import { extractTrustpilotHtml } from '../../utils/extractTrustpilotHtml';

describe("extractTrustpilotHtml", () => {
  it("should return the HTML string when it contains 'trustpilot-widget'", () => {
    const node: Paragraph = {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: '<div class="trustpilot-widget">Trustpilot</div>',
          marks: [],
          data: {},
        },
      ],
    };

    const result = extractTrustpilotHtml(node);
    expect(result).toBe('<div class="trustpilot-widget">Trustpilot</div>');
  });

  it("should return null when text does not contain 'trustpilot-widget'", () => {
    const node: Paragraph = {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "<p>Hello World</p>",
          marks: [],
          data: {},
        },
      ],
    };

    const result = extractTrustpilotHtml(node);
    expect(result).toBeNull();
  });

  it("should return null when there is no text node", () => {
    const node: Paragraph = {
      nodeType: "paragraph",
      data: {},
      content: [
        {
          nodeType: "hyperlink",
          data: {},
          content: [],
        },
      ],
    } as any; // casting to `any` because Contentful's `Paragraph` type expects text nodes

    const result = extractTrustpilotHtml(node);
    expect(result).toBeNull();
  });
});
