import type {TAsset} from './asset';
import type {BodyType} from './section';

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
	author?: TAuthor;
	designation?: string;
	isHubspotEmbed?: boolean;
	hubspotEmbed?: BodyType;
	isInsertSnippet: boolean;
	codeSnippet?: {codeSnippet: string};
	generateStaticPage: boolean;
	isFaq: boolean;
	banners?: TResource[];
};
