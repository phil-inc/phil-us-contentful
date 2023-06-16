import {navigate} from 'gatsby';

export const generateSearchParams = (filterOptions: string[], searchTerm: string): string => {
	const searchParams = new URLSearchParams();
	searchParams.set('q', searchTerm);

	filterOptions.forEach(filter => {
		if (filter.trim() !== '') {
			searchParams.append('filter', filter);
		}
	});

	const link = `?${searchParams.toString()}`;

	return link;
};

export const searchSubmitCallback = (searchText: string, filterOptions: string[]) => {
	if (!searchText.length) {
		return;
	}

	const path = generateSearchParams(filterOptions, searchText);

	void navigate('/resources/search/' + path);
};
