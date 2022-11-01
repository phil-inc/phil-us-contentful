export const groupBy = function <T>(xs: T[], key: string): Record<string, T[]> {
	return xs.reduce((rv: Record<string, T[]>, x) => {
		if (x[key] === '') {
			x = {...x, key: x[key] === '' ? 'Others' : (x[key] as unknown)};
			(rv[x[key]] = rv[x[key]] || []).push(x);
			return rv;
		}

		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};
