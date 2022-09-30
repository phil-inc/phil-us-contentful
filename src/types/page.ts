import type {GatsbyImageProps} from 'gatsby-plugin-image';
import type {RenderRichTextData, ContentfulRichTextGatsbyReference} from 'gatsby-source-contentful/rich-text';

type Asset = {
	gatsbyImageData: GatsbyImageProps;
	publicUrl: string;
	title: string;
};

type Body = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export type ISection = {
	id: string;
	asset: Asset;
	body: Body;
	buttonText: string;
	header: string;
	subHeader?: string;
	linkTo: string;
};

export type ContentfulPage = {
	id: string;
	sections: ISection[];
	title: string;
};
