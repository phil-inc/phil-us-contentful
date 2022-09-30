import type {GatsbyImageProps} from 'gatsby-plugin-image';

export type Asset = {
	gatsbyImageData: GatsbyImageProps;
	publicUrl: string;
	title: string;
};
