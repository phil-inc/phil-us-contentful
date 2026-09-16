import React from "react";
import { HOME } from "constants/page";
import { Script } from "gatsby";
import slugify from "slugify";
import { SeoMeta } from "components/common/Seo/SeoMeta";
import { JsonLd } from "components/common/Seo/JsonLd";
import { ContentfulPage } from "types/page";
import { ISection } from "types/section";
import { isVideoContent } from "utils/isVideoContent";
import { getOgImage } from "utils/getOgImage";
import { webPageSchema } from "utils/seo/schema";


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

  const ogImage = getOgImage(image);

  const config = {
    slug: contentfulPage.slug,
  };

  if (!config.slug) {
    config.slug =
      contentfulPage.title === HOME
        ? "/"
        : `/${slugify(contentfulPage.title, { lower: true })}`;
  }

  const schema = webPageSchema({
    path: config.slug,
    name: title,
    description: contentfulPage.description,
    image: image && `https:${image}?w=1200&h=630&q=100&fm=webp`,
  });

  return (
    <>
      <SeoMeta
        title={title}
        description={contentfulPage.description}
        path={config.slug}
        image={ogImage}
        noindex={contentfulPage.noindex}
      />
      <JsonLd data={schema} />
      {image && (
        <link
          rel="preload"
          as="image"
          href={`https:${image}?w=1200&fm=webp&q=80`}
          type="image/webp"
        />
      )}
      <Script
        defer
        async
        strategy="idle"
        charSet="utf-8"
        type="text/javascript"
        src="//js.hsforms.net/forms/embed/v2.js"
      ></Script>
    </>
  );
};

  export default Head;