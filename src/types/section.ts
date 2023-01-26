import type {TAsset} from './asset';
import type {RenderRichTextData, ContentfulRichTextGatsbyReference} from 'gatsby-source-contentful/rich-text';
import type {TResource} from './resource';

type SectionType = 'Basic Section' | 'Referenced Section';

export type BodyType = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export type ISection = {
	id: string;
	sectionType: SectionType;
	header: string;
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
};

export type ResourceBlocks = 'Upcoming Events' | 'Phil Blog' | 'Case Study' | 'White Paper';

type ReferenceType =
	| 'Article'
	| 'Customer Story'
	| 'Featured Resource'
	| 'Testimonial'
	| 'Team Member'
	| 'Press Release'
	| 'Location'
	| 'Banner'
	| 'Stats Card'
	| 'Prescriber Journey'
	| 'Info Card'
	| 'FAQs'
	| 'Image Carousel'
	| 'Investors'
	| 'Stats Card with Arrows'
	| ResourceBlocks;

export type IReferencedSection = {
	id: string;
	hideHeader: boolean;
	referenceType: ReferenceType;
	header: string;
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
};
