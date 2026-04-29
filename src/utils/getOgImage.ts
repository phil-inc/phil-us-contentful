/**
 * Builds the og:image URL from a raw Contentful asset URL.
 * Falls back to the static og-social-image.png if no URL is provided.
 */
export const getOgImage = (rawImageUrl?: string | null): string => {
  const siteUrl = process.env.GATSBY_DEPLOY_URL ?? "https://phil.us";
  return rawImageUrl
    ? `https:${rawImageUrl}?w=1200&h=630&q=90&fm=webp&fit=fill`
    : `${siteUrl}/og-social-image.png`;
};
