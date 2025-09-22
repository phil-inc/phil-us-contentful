import { TAsset } from "types/asset";
import { BodyType } from "types/section";

type SysContentType = {
  contentType: {
    sys: {
      type: string;
      id: string;
    };
  };
};

type InternalContentPage = {
  slug: string;
  id: string;
  title: string;
  sys: SysContentType;
};

export type Hyperlink = {
  id: string;
  linkLabel: string;
  internalContent?: InternalContentPage | null;
};

type ModalPageToDisplay = {
  __typename: string;
  slug: string;
  id: string;
  title: string;
  sys: SysContentType;
};

export type ContentfulModal = {
  id: string;
  body: BodyType;
  logo?: TAsset | null;
  hyperlink?: Hyperlink | null;
  image?: TAsset | null;
  pagesToDisplay?: ModalPageToDisplay[] | null;
  canDisplayModal?: boolean;
};


// Root query result
export type AllContentfulModalQuery = {
    nodes: ContentfulModal[];
};
