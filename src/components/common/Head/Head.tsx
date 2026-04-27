import React from "react";
import { HOME } from "constants/page";
import { Script } from "gatsby";
import { SEO } from "layouts/SEO/SEO";
import slugify from "slugify";
import { ContentfulPage } from "types/page";
import { ISection } from "types/section";
import { isVideoContent } from "utils/isVideoContent";


type HelmetProps = {
  data: {
    contentfulPage: ContentfulPage;
  };
  location: { pathname: string };
};

const Head: React.FC<HelmetProps> = ({
  data: { contentfulPage },
  location,
}) => {
  const heroSection = contentfulPage.sections.find(
    (section) => section.sectionType === "Basic Section"
  ) as ISection;
  // Safely extract heroImage and heroImageV2
  const heroImage = heroSection?.asset?.file?.url || null;
  const heroImageV2 = heroSection?.mediaItem?.media?.file?.url || null;

  // Safely extract title with a fallback
  const title = contentfulPage?.displayTitle?.length
    ? contentfulPage.displayTitle
    : contentfulPage?.title || "";

  // Initialize image with heroImage as default
  let image = heroImage;

  // Check content type and update image accordingly
  if (
    heroSection?.mediaItem?.media?.file?.contentType &&
    !isVideoContent(heroSection.mediaItem.media.file.contentType)
  ) {
    image = heroImageV2 || heroImage;
  }

  const siteUrl = process.env.GATSBY_DEPLOY_URL ?? "https://www.phil.us";
  const FALLBACK_OG_IMAGE = `${siteUrl}/og-social-image.png`;
  const ogImage = image
    ? `https:${image}?w=1200&h=630&q=90&fm=webp&fit=fill`
    : FALLBACK_OG_IMAGE;

  const config = {
    slug: contentfulPage.slug,
  };

  if (!config.slug) {
    config.slug =
      contentfulPage.title === HOME
        ? "/"
        : `/${slugify(contentfulPage.title, { lower: true })}`;
  }

  return (
    <SEO title={title}>
      {image && (
        <link
          rel="preload"
          as="image"
          href={`https:${image}?w=1200&fm=webp&q=80`}
          type="image/webp"
        />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={contentfulPage.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="description" content={contentfulPage.description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={contentfulPage.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={`https://phil.us${config.slug}`} />
      <link rel="canonical" href={`https://phil.us${config.slug}`} />
      <Script
        defer
        async
        strategy="idle"
        charSet="utf-8"
        type="text/javascript"
        src="//js.hsforms.net/forms/embed/v2.js"
      ></Script>
      {contentfulPage.noindex && <meta name="robots" content="noindex" />}
      <Script
        defer
        async
        strategy="idle"
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
      ></Script>
    </SEO>
  );
};

  export default Head;