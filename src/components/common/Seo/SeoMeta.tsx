import React from "react";

// Relative imports: Jest has no mapping for the gatsby-plugin-root-import aliases.
import { getOgImage } from "../../../utils/getOgImage";
import { toAbsoluteUrl } from "../../../utils/seo/url";

type SeoMetaProps = {
  title: string;
  description?: string | null;
  /** Page path or Contentful slug; normalized into the canonical URL. */
  path: string;
  /** Absolute social image URL. Defaults to the sitewide social card. */
  image?: string | null;
  type?: "website" | "article";
  noindex?: boolean;
};

/**
 * The head tags every page needs: title, description, canonical, Open Graph
 * and Twitter. Pages used to hand-write these, and the copies drifted — several
 * templates shipped with no canonical at all.
 *
 * Canonical and og:url come from the same toAbsoluteUrl call so they cannot
 * disagree. A noindex page gets no canonical: declaring an authoritative URL
 * for a page that asks not to be indexed sends crawlers mixed signals.
 */
export const SeoMeta: React.FC<SeoMetaProps> = ({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
}) => {
  const url = toAbsoluteUrl(path);
  const socialImage = image || getOgImage(null);
  const hasDescription = Boolean(description?.trim());

  return (
    <>
      <title>{title}</title>
      {hasDescription && <meta name="description" content={description!} />}
      {!noindex && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      {hasDescription && <meta property="og:description" content={description!} />}
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {hasDescription && <meta name="twitter:description" content={description!} />}
      <meta name="twitter:image" content={socialImage} />
    </>
  );
};
