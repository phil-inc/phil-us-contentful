export const getTitle = (titleId: string, displayTitle: string) => {
	if (Boolean(displayTitle) && Boolean(displayTitle.length)) {
		return displayTitle;
	}

	return titleId;
};
