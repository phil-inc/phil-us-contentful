export const getColorFromStylingOptions = (color: string | undefined) => {
	if (color == undefined) {
		return 'transparent';
	}

	const start = color.indexOf('#');

	return color.substring(start, color.length - 1);
};
