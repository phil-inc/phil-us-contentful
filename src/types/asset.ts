import type {GatsbyImageProps} from 'gatsby-plugin-image';

type File = {
	contentType: string;
	url: string;
};

export type TAsset = {
	file: File;
	gatsbyImageData: GatsbyImageProps;
	publicUrl: string;
	title: string;
};
