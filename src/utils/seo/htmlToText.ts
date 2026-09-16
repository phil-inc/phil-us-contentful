const BLOCK_END = /<\/(p|li|dt|dd|ol|ul|dl|h[1-6]|div)>|<br\s*\/?>/gi;
const ANY_TAG = /<[^>]+>/g;

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

/**
 * Flattens the hand-written answer HTML in src/data/faq-content.ts into plain
 * text for JSON-LD. Search engines ignore most tags inside `Answer.text`, and
 * AI crawlers read the markup literally, so structure is kept only as line
 * breaks between blocks.
 *
 * This is for trusted, repo-owned markup, not arbitrary HTML.
 */
export function htmlToText(html: string): string {
  return html
    // Source line breaks are formatting, not content; only block ends break lines.
    .replace(/\s+/g, " ")
    .replace(BLOCK_END, "\n")
    // Adjacent inline cells, e.g. the language/number pairs in the phone list.
    .replace(/<\/span>/gi, " ")
    .replace(ANY_TAG, "")
    .replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (entity) => ENTITIES[entity])
    .split("\n")
    .map((line) => line.replace(/ {2,}/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}
