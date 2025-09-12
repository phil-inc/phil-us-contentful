import type { IReferencedSection, ISection, ITextandTextColumnsWithFooterSection } from './section';
import { TAsset } from 'types/asset';

export type ContentfulPage = {
  id: string;
  description?: string;
  sections: Array<ISection | IReferencedSection | ITextandTextColumnsWithFooterSection>;
  title: string;
  displayTitle: string;
  noindex: boolean;
  slug: string;
  navbarTitle?: string;
};

export type ContenfulHeaderLogo = {
  nodes: Array<{
    id: string;
    title: string;
    logo: TAsset;
    whiteLogo?: TAsset;
  }>;
};
