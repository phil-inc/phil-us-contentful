import { AnnoucementReference } from "types/annoucementBar";
import { ContentfulPage } from "types/page";

export type TopInfoBarNode = {
  id: string;
  header?: string | null;
  reference: AnnoucementReference;
  pagesToShowInfoBar?: ContentfulPage[];
}

