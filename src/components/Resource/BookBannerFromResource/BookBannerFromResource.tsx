import React from "react";

import { IReferencedSection, ISection } from "types/section";

import BasicSection from "components/section/BasicSection/BasicSection";

type Props = {
  bookBannerSection: IReferencedSection;
};

const BookBannerFromResource = ({ bookBannerSection }: Props) => {
  const demoResource = bookBannerSection.references[0];

  if (!demoResource) {
    return null;
  }

  const dataForBasicSection: ISection = {
    id: demoResource.id,
    sectionType: "Basic Section",
    header: demoResource.heading,
    body: demoResource.body,
    isHubspotEmbed: false,
    isInsertSnippet: false,
    hideNavigationAnchor: false,
    isHidden: false,
    automaticOrder: false,
    v2Flag: true,
    addBorder: false,
    isReverse: false,
    backgroundAssetImage: demoResource?.asset || undefined,
    stylingOptions: demoResource.stylingOptions,
    renderOptions: demoResource.renderOptions,
  };

  return (
    <BasicSection
      section={dataForBasicSection}
      index={0}
      isEmbedFormTemplate={false}
    />
  );
};

export default BookBannerFromResource;
