type PageObjectContext = {
	id: string;
	title?: string;
	heading?: string;
	limit?: number;
	numPages?: number;
	skip?: number;
	currentPage?: number;
};

type PageObject = {
	path: string;
	component: string;
	context: PageObjectContext;
};

export const createPageObject = (path: string, component: string, context: PageObjectContext): PageObject => ({
	path,
	component,
	context,
});
