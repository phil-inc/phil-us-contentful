import type {Asset} from './asset';
import type {BodyType} from './section';

export type TResource = {
	id: string;
	createdAt: string;
	heading: string;
	description?: string;
	subHeading?: {
		subHeading: string;
	};
	body: BodyType;
	asset?: Asset;
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
};
