export type ColumnSection = {
	title: string;
	description: {
		description: string;
	};
	list: string[];
	button: string;
};

type Article = {
	title: string;
	description: string;
};

export type Testimonial = {
	author: string;
	designation: string;
	description: {
		description: string;
	};
};

type Featured = {
	title: string;
	description: {
		description: string;
	};
};

export type ContentfulHomePageType = {
	firstTwoColumnSection: ColumnSection;
	secondTwoColumnSection: ColumnSection;
	articleSection: Article[];
	testimonialsSection: Testimonial[];
	featuredSection: Featured[];
};
