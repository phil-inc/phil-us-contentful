export const groupBy = function <T>(xs: T[], key: string): Record<string, T[]> {
	return xs.reduce((rv: Record<string, T[]>, x) => {
		if (x[key] === '') {
			x = {...x, department: x[key].length === 0 ? 'Others' : (x[key] as unknown)};
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}

		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};
