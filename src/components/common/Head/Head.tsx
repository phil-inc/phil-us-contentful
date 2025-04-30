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
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={contentfulPage.description} />
      {image && (
        <meta
          name="twitter:image"
          content={`https:${image}?w=400&h=400&q=100&fm=webp&fit=scale`}
        />
      )}
      <meta name="description" content={contentfulPage.description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={"Page"} />
      <meta property="og:description" content={contentfulPage.description} />
      {image && (
        <meta
          property="og:image"
          content={`https:${image}?w=400&h=400&q=100&fm=webp&fit=scale`}
        />
      )}
      <meta property="og:url" content={`https://phil.us${config.slug}`} />
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