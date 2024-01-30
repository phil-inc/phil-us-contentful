import type {TAsset} from './asset';
import type {BodyType, MediaItem, Metadata, StylingOptions} from './section';

export type TLink = {
	link: string;
	isExternal: boolean;
};

export type TAuthor = {
	id: string;
	name: string;
	authorTitle: string;
	bio: BodyType;
	avatar: TAsset;
};

export type TResource = {
	id: string;
	createdAt: string;
	heading: string;
	subheading: string;
	noindex?: boolean;
	metadata?: Metadata;
	description: {
		id: string;
		description: string;
	};
	metaDescription: string;
	body: BodyType;
	asset?: TAsset;
	buttonText?: string;
	externalLink?: string;
	internalLink: {
		slug?: string;
		id: string;
		page: Array<{title: string}>;
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

	hyperlink?: {
		contentful_id: string;
		id: string;
		externalLink?: string;
		linkLabel: string;
		name: string;

		internalContent: {
			slug?: string;
			id: string;
			page: Array<{title: string}>;
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

	author?: TAuthor;
	designation?: string;
	isHubspotEmbed?: boolean;
	hubspotEmbed?: BodyType;
	isInsertSnippet: boolean;
	codeSnippet?: {codeSnippet: string};
	generateStaticPage: boolean;
	isFaq: boolean;
	banners?: TResource[];
	relatesTo: {
		id: string;
		header: string;
		page: {
			id: string;
			title: string;
		};
	};
	slug?: string; // Populates only for static pages

	stylingOptions: StylingOptions;
	media: MediaItem;
};

export type DownloadableAsset = {
	id: string;
	file: {
		url: string;
		contentType: string;
	};
};

export type TDownloadableResource = Pick<
	TResource,
	| 'slug'
	| 'id'
	| 'noindex'
	| 'heading'
	| 'buttonText'
	| 'internalLink'
	| 'externalLink'
	| 'metaDescription'
	| 'body'
	| 'author'
> & {
	type: string;
	image: TResource['asset'];
	downloadableAsset: DownloadableAsset;
	description: string;
	banner: TResource;
};
