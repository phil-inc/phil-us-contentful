export type Listing = {
	id: string;
	title: string;
	location: string;
	link: string;
};

export type ContentfulCareerPageType = {
	id: string;
	field: string;
	listings: Listing[];
};
