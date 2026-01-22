import type { TAsset } from "./asset";
import type {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
} from "gatsby-source-contentful/rich-text";
import type { TResource } from "./resource";
import { Hyperlink } from "types/modal";
import { ContentfulButton } from "layouts/Layout/CHeader/CHeader";

type SectionType = "Basic Section" | "Referenced Section" | "Text and Text Columns | Text and Text Columns with Footer" | "Section Group";

export type BodyType = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export type BackgroundType = "Default" | "Grey";

export type MediaItem = {
  id: string;
  name?: string;
  media?: TAsset;
  youtubeLink?: string;
  emdedForm?: BodyType;
  canShowMediaWidthFull?: boolean;
};

export type StylingOptions = {
  id: string;
  name: string;
  background: string;
  extraColor: string;
};

export type LayoutOptions = {
  id: string;
  name: string;
  numberOfColumns: number;
  shouldRenderCarousel: boolean;
};

export type RenderOptions = {
  id: string;
  name: string;
  layoutOptions: LayoutOptions;
};

export type ISection = {
  id: string;
  __typename?: string;
  sectionType: SectionType;
  header: string;
  canShowHeader?: boolean;
  youtubeVideoUrl?: string;
  title?:string;
  slug?: string;
  subHeader?: { subHeader: string };
  body: BodyType;
  isHubspotEmbed: boolean;
  isInsertSnippet: boolean;
  hideNavigationAnchor: boolean;
  codeSnippet?: { codeSnippet: string };
  buttonText?: string;
  internalLink?: {
    id: string;
    page?: Array<{ title: string }>;
    header?: string;
    heading?: string;
    title?: string;
    sys: {
      contentType: {
        sys: {
          id: string;
        };
      };
    };
  };
  externalLink?: string;
  asset?: TAsset;
  subNavigationSection?: TResource[];
  isHidden: boolean;
  embedForm?: BodyType;
  background?: BackgroundType;
  automaticOrder: boolean;

  mediaItem?: {
    id: string;
    name: string;
    media: TAsset;
    youtubeLink: string;
    emdedForm: BodyType;
  };
  
  stylingOptions?: StylingOptions;

  renderOptions?: RenderOptions;

  v2Flag: boolean;
  addBorder: boolean;
  isReverse: boolean;
  backgroundAssetImage?: TAsset;
  topBackgroundAsset?: TAsset;
  canShowAssetImageAlignToWall?: boolean;
  showBottomBorder?: boolean;
  canShowTextColumnToRight?: boolean;
  assetForMobile?: TAsset;
  assetCaption?: string;
  eyebrowHeading?: string;
  headerDescription?: { 
    headerDescription: string 
  }
};

export enum ResourceBlocksEnum {
  "Upcoming Events" = "Upcoming Events",
  "Phil Blog" = "Phil Blog",
  "Case Study" = "Case Study",
  "White Paper" = "White Paper",
}

export type ResourceBlocks = keyof typeof ResourceBlocksEnum;

export enum ReferenceTypeEnum {
  "Article" = "Article",
  "Customer Story" = "Customer Story",
  "Featured Resource" = "Featured Resource",
  "Testimonial" = "Testimonial",
  "Team Member" = "Team Member",
  "Press Release" = "Press Release",
  "Location" = "Location",
  "Banner" = "Banner",
  "Stats Card" = "Stats Card",
  "Prescriber Journey" = "Prescriber Journey",
  "Info Card" = "Info Card",
  "FAQs" = "FAQs",
  "Image Carousel" = "Image Carousel",
  "Investors" = "Investors",
  "Stats Card with Arrows" = "Stats Card with Arrows",
  "Code Snippet" = "Code Snippet",

  // V2 components
  "Card" = "Card",
  "Stepper Cards" = "Stepper Cards",
  "Brand Outcome Card" = "Brand Outcome Card",
  "Cell" = "Cell",
  "FAQ Accordion" = "FAQ Accordion",
  "FAQ Accordion Single" = "FAQ Accordion Single",
  "Card Section" = "Card Section",
  "Commitment Card" = "Commitment Card",
  "Featured Insights" = "Featured Insights",

  "Case Study" = "Case Study",
  "People Behind Phil" = "People Behind Phil",
  "Card Or Image" = "Card Or Image",
  "Image Connnect To Two Card" = "Image Connnect To Two Card",
  "Bullet list" = "Bullet list",
  "Metric card" = "Metric card",
  "Single line Metric card" = "Single line Metric card",
  "Promo Card" = "Promo Card",
  "MetricWith5Card" = "MetricWith5Card",
  "MetricWith3Card" = "MetricWith3Card",
}

export type ReferenceType = keyof typeof ReferenceTypeEnum;

export type Metadata = {
  tags: Array<{ id: string; name: string }>;
};

export type IReferencedSection = {
  [x: string]: any;
  id: string;
  __typename?: string;
  title: string;
  metaDescription: string;
  topAsset?: TAsset;
  hideHeader: boolean;
  referenceType: ReferenceTypeEnum | ResourceBlocksEnum;
  header: string;
  headerAlias?: string;
  subHeading: {
    id: string;
    subHeading: string;
  };
  asset?: TAsset;
  assetForMobile?: TAsset;
  assetCaption?: string;
  references: TResource[];
  metadata?: Metadata;
  buttonText?: string;
  internalLink: {
    slug?: string;
    id: string;
    page?: Array<{ title: string }>;
    header?: string;
    heading?: string;
    title?: string;
    sys: {
      contentType: {
        sys: {
          id: string;
        };
      };
    };
  };
  externalLink?: string;
  sectionType: SectionType;
  isHidden: boolean;
  hideNavigationAnchor: boolean;
  featuredItems: Array<
    Pick<
      TResource,
      "generateStaticPage" | "id" | "heading" | "externalLink" | "internalLink"
    >
  >;
  stylingOptions?: StylingOptions;
  addBorder: boolean;
  renderOptions?: RenderOptions;
  backgroundAssetImage?: TAsset;
  canAlsoBeUseAsAutoCarousel?: boolean;
  showBottomBorder?: boolean;
  belowSubHeading?: {
    id: string;
    belowSubHeading: string;
  };
  leftBackgroundAssetImage?: TAsset;
  divColorOfBtnParent?: StylingOptions;
  innerBackgroundStyling?: StylingOptions;
  referenceSecond?: TResource[];
  secondReferenceTitle?: string;
  secondReferenceType?: ReferenceType;
  referenceSecondRenderOptions?: RenderOptions;
  referenceThird?: TResource[];  
  thirdReferenceType?: ReferenceType;
  referenceThirdRenderOptions?: RenderOptions;
  referenceFourth?: TResource[];  
  fourthReferenceType?: ReferenceType;
  referenceFourthRenderOptions?: RenderOptions;
  eyebrowHeading?: string;
  announcementItems: AnnouncementItems
};

  export type AnnouncementItems = Array<
    Pick<
      TResource,
      | "generateStaticPage"
      | "id"
      | "heading"
      | "externalLink"
      | "internalLink"
      | "body"
      | "asset"
      | "buttonText"
    >
  >;
  


export type Reference = {
  id: string;
  heading: string;
};

export type ReferenceBodyType = {
  raw: string;
  references?: Reference[];
};

export type ITextandTextColumns = {
  id: string;
  __typename?: string;
  heading: string;
  subHeadingText: string;
  body?: BodyType;
  leftColumn: ReferenceBodyType;
  rightColumn: ReferenceBodyType;
  addBorder: boolean;
  header: string;
  stylingOptions?: StylingOptions;
  showBottomBorder?: boolean;
  sectionName?: string;
  link?: Hyperlink;
};

export type ITextandTextColumnsWithFooterSection = {
  id: string;
  __typename?: string;
  title?: string;
  stylingOptions?: StylingOptions;
  leftColumn: ReferenceBodyType;
  rightColumn?: ReferenceBodyType;
  leftWallBackgroundImage?:TAsset;
  rightWallBackgroundImage?:TAsset;
  footerColumn: ReferenceBodyType;
  resourceReferences?: TResource[];
  sectionType: SectionType;
};

export type ISectionsArray = Array <ISection | IReferencedSection >;

export type IContentfulList = {
  __typename: string;
  sys: {
    contentType: {
      sys: {
        type: string;
        id: string;
      };
    };
  };
  id: string;
  heading: string;
  subheading: string | null;
  choose: boolean;
  anchorLink: string;
}

export type ISys = {
    contentType: {
      sys: {
        type: string;
        id: string;
      };
    };
  };


export type IContentfulButtonGroup = {
  __typename: string;
  id: string;
  contentful_id: string;
  title: string;
  button1: ContentfulButton;
  button2: ContentfulButton;
  sys: ISys;
}

export type ISectionGroup = {
  id: string;
  __typename: string;
  title: string;
  sectionType: SectionType;
  canShowTopBorder: boolean;
  canShowBottomBorder:boolean;
  backgroundAssetImage1?: TAsset;
  backgroundAssetImage2?:  TAsset;
  sectionGroupReference?: Array<ISection>;
}
