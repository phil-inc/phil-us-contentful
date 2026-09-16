import React from "react";

// Relative import: Jest has no mapping for the gatsby-plugin-root-import aliases.
import type { JsonLd as JsonLdNode } from "../../../utils/seo/schema";

// Built from strings so the source file never contains the raw separator
// characters, which editors and tooling tend to mangle.
const LINE_SEPARATOR = new RegExp("\\u2028", "g");
const PARAGRAPH_SEPARATOR = new RegExp("\\u2029", "g");

/**
 * Serializes JSON-LD so it is safe inside a <script> element.
 *
 * Gatsby's Head API renders head elements to HTML, re-parses them, and
 * re-emits script bodies from the parser's entity-decoded text
 * (gatsby/cache-dir/head/head-export-handler-for-ssr.js). React's escaping of
 * script children is therefore undone, and a CMS string containing
 * "</script>" would end the element early. Unicode-escaping <, > and & keeps
 * those characters out of the markup entirely; JSON parsers read the escapes
 * back as the original characters. The line and paragraph separators are
 * escaped because older JavaScript engines treat them as line terminators
 * inside strings.
 */
function serialize(node: JsonLdNode): string {
  return JSON.stringify(node)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(LINE_SEPARATOR, "\\u2028")
    .replace(PARAGRAPH_SEPARATOR, "\\u2029");
}

type JsonLdProps = {
  data: JsonLdNode | JsonLdNode[];
};

/** Renders one application/ld+json script per schema.org node. */
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  const nodes = Array.isArray(data) ? data : [data];

  return (
    <>
      {nodes.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(node) }}
        />
      ))}
    </>
  );
};
