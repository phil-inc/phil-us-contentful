export const groupBy = function <T>(xs: T[], key: string): Record<string, T[]> {
	return xs.reduce((rv: Record<string, T[]>, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};
