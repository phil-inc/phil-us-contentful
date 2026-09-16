import { htmlToText } from "../../utils/seo/htmlToText";
import {
  PATIENT_FAQ_ITEMS,
  PHARMA_FAQ_GROUPS,
  PROVIDER_FAQ_GROUPS,
} from "../../data/faq-content";

/**
 * FAQ answers are hand-written HTML; the FAQPage JSON-LD needs them as text.
 */

describe("htmlToText", () => {
  test("keeps link text and drops the markup", () => {
    expect(
      htmlToText('<p>See <a href="/demo/" target="_blank">our <strong>demo</strong></a>.</p>'),
    ).toBe("See our demo.");
  });

  test("puts each block on its own line", () => {
    expect(htmlToText("<p>Steps:</p><ol><li>One</li><li>Two</li></ol><p>Done.</p>")).toBe(
      "Steps:\nOne\nTwo\nDone.",
    );
  });

  test("keeps definition terms apart from their descriptions", () => {
    expect(htmlToText("<dl><dt>Pricing</dt><dd>Low.</dd></dl>")).toBe("Pricing\nLow.");
  });

  test("separates adjacent inline cells", () => {
    expect(
      htmlToText('<ul class="phone-list"><li><span>Spanish</span><span>855-970-5222</span></li></ul>'),
    ).toBe("Spanish 855-970-5222");
  });

  test("decodes common entities", () => {
    expect(htmlToText("<p>Q&amp;A &lt;fast&gt; &quot;free&quot; it&#39;s&nbsp;here</p>")).toBe(
      "Q&A <fast> \"free\" it's here",
    );
  });

  test("collapses whitespace from multi-line source", () => {
    expect(htmlToText("<p>\n  one\n  two  </p>\n\n<p>three</p>")).toBe("one two\nthree");
  });

  test("leaves no tags or entities in any published FAQ answer", () => {
    const answers = [
      ...PHARMA_FAQ_GROUPS.flatMap((group) => group.items),
      ...PATIENT_FAQ_ITEMS,
      ...PROVIDER_FAQ_GROUPS.flatMap((group) => group.items),
    ].map((item) => item.answer);

    expect(answers.length).toBeGreaterThan(20);
    answers.forEach((answer) => {
      const text = htmlToText(answer);

      expect(text.length).toBeGreaterThan(0);
      expect(text).not.toMatch(/<\/?[a-z][^>]*>/i);
      expect(text).not.toMatch(/&[#a-z0-9]+;/i);
    });
  });
});
