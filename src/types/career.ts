type Listing = {
  id: string;
  department: string;
  title: string;
  url: string;
  location: string;
};

type JobListings = {
  status: string;
  data: { jobs: Listing[] };
};
