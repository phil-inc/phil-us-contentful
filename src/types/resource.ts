import type {Asset} from './asset';
import type {BodyType} from './section';

export type TResource = {
	id: string;
	heading: string;
	subHeading?: string;
	body: BodyType;
	asset?: Asset;
	buttonText?: string;
	linkTo?: string;
	author?: string;
	designation?: string;
};
