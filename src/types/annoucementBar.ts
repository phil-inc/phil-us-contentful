import { BodyType, StylingOptions } from "types/section";

type ContentfulLink = {
    contentful_id: string;
    id: string;
    externalUrl?: string;
    linkLabel: string;
    name: string;

    internalContent: {
      slug?: string;
      id: string;
      page: Array<{ title: string }>;
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
  };


export type AnnoucementReference  = {
  id: string;
  header?: string | null;
  startDate?: string | null;
  canDisplay?: boolean | null;
  hyperlink?: ContentfulLink | null;
  stylingOptions?: StylingOptions
  body: BodyType
}

export type TopAnnouncementBarNode = {
  id: string;
  header?: string | null;
  reference: AnnoucementReference;
}

