import type { TAsset } from "./asset";
import type {
  RenderRichTextData,
  ContentfulRichTextGatsbyReference,
} from "gatsby-source-contentful/rich-text";
import type { TResource } from "./resource";

type SectionType = "Basic Section" | "Referenced Section" | "Text and Text Columns | Text and Text Columns with Footer";

export type BodyType = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export type BackgroundType = "Default" | "Grey";

export type MediaItem = {
  id: string;
  name?: string;
  media?: TAsset;
  youtubeLink?: string;
  emdedForm?: BodyType;
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
  sectionType: SectionType;
  header: string;
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
  canShowAssetImageAlignToWall?: boolean;
  sectionTitle?: string;
  showBottomBorder?: boolean;
  canShowTextColumnToRight?: boolean;
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
  "Card Section" = "Card Section",
  "Commitment Card" = "Commitment Card",
  "Featured Insights" = "Featured Insights",
  "Case Study" = "Case Study",
  "People Behind Phil" = "People Behind Phil",
}

export type ReferenceType = keyof typeof ReferenceTypeEnum;

export type Metadata = {
  tags: Array<{ id: string; name: string }>;
};

export type IReferencedSection = {
  [x: string]: any;
  id: string;
  title: string;
  metaDescription: string;
  hideHeader: boolean;
  referenceType: ReferenceTypeEnum | ResourceBlocksEnum;
  header: string;
  headerAlias?: string;
  subHeading: {
    id: string;
    subHeading: string;
  };
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
  renderOptions?: RenderOptions;
  backgroundAssetImage?: TAsset;
  canAlsoBeUseAsAutoCarousel?: boolean;
  showBottomBorder?: boolean;
  belowSubHeading?: {
    id: string;
    belowSubHeading: string;
  };
};

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
  heading: string;
  subHeadingText: string;
  body?: BodyType;
  leftColumn: ReferenceBodyType;
  rightColumn: ReferenceBodyType;
  addBorder: boolean;
  header: string;
  stylingOptions?: StylingOptions;
};

export type ITextandTextColumnsWithFooterSection = {
  id: string;
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
