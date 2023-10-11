import type {TAsset} from './asset';
import type {RenderRichTextData, ContentfulRichTextGatsbyReference} from 'gatsby-source-contentful/rich-text';
import type {TResource} from './resource';

type SectionType = 'Basic Section' | 'Referenced Section';

export type BodyType = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export type BackgroundType = 'transparent' | '#F4F4F4';

export type ISection = {
	id: string;
	sectionType: SectionType;
	header: string;
	youtubeVideoUrl?: string;
	subHeader?: {subHeader: string};
	body: BodyType;
	isHubspotEmbed: boolean;
	isInsertSnippet: boolean;
	codeSnippet?: {codeSnippet: string};
	buttonText: string;
	internalLink: {
		id: string;
		page?: Array<{title: string}>;
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
	externalLink: string;
	asset: TAsset;
	subNavigationSection?: TResource[];
	isHidden: boolean;
	embedForm: BodyType;
	background: BackgroundType;
	automaticOrder: true;
};

export enum ResourceBlocksEnum {
	'Upcoming Events' = 'Upcoming Events',
	'Phil Blog' = 'Phil Blog',
	'Case Study' = 'Case Study',
	'White Paper' = 'White Paper',
}

export type ResourceBlocks = keyof typeof ResourceBlocksEnum;

export enum ReferenceTypeEnum {
	'Article' = 'Article',
	'Customer Story' = 'Customer Story',
	'Featured Resource' = 'Featured Resource',
	'Testimonial' = 'Testimonial',
	'Team Member' = 'Team Member',
	'Press Release' = 'Press Release',
	'Location' = 'Location',
	'Banner' = 'Banner',
	'Stats Card' = 'Stats Card',
	'Prescriber Journey' = 'Prescriber Journey',
	'Info Card' = 'Info Card',
	'FAQs' = 'FAQs',
	'Image Carousel' = 'Image Carousel',
	'Investors' = 'Investors',
	'Stats Card with Arrows' = 'Stats Card with Arrows',
	'Code Snippet' = 'Code Snippet',
}

export type ReferenceType = keyof typeof ReferenceTypeEnum;

export type IReferencedSection = {
	id: string;
	title: string;
	metaDescription: string;
	hideHeader: boolean;
	referenceType: ReferenceType | ResourceBlocks;
	header: string;
	subHeading: {
		id: string;
		subHeading: string;
	};
	references: TResource[];
	buttonText?: string;
	internalLink: {
		id: string;
		page?: Array<{title: string}>;
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
	featuredItems: Array<Pick<TResource, 'generateStaticPage' | 'id' | 'heading' | 'externalLink' | 'internalLink'>>;
};
