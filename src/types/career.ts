type Listing = {
	id: string;
	department: string;
	title: string;
	url: string;
	location: {location_str: string};
};

type JobListings = {
	status: string;
	data: {jobs: Listing[]};
};
