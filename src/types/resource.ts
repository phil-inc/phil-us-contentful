import type {TAsset} from './asset';
import type {BodyType} from './section';

export type TLink = {
	link: string;
	isExternal: boolean;
};

export type TResource = {
	id: string;
	createdAt: string;
	heading: string;
	description?: string;
	subHeading?: {
		subHeading: string;
	};
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
	author?: string;
	designation?: string;
	isHubspotEmbed?: boolean;
	hubspotEmbed?: BodyType;
	isGenerateStaticPage: boolean;
	isFaq: boolean;
};

export type TParsedString = {
	jsonResults: Array<{
		formId: string;
		portalId: string;
		region: string;
	}>;
};
