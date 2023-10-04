import { TAsset } from "./asset";

export type Person = {
	id: string;
	name: string;
	image: TAsset;
	bio: string;
	role: string;
	company: string;
	type: string;
};
