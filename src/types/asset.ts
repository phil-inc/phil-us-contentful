import type { GatsbyImageProps } from "gatsby-plugin-image";

type File = {
  contentType: string;
  url: string;
};

export type TAsset = {
  id: string;
  file: File;
  gatsbyImageData: GatsbyImageProps & { height: number; width: number };
  publicUrl: string;
  title: string;
};
