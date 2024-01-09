export const isVideoContent = (contentType: string) => {
	if (!contentType) {
		return false;
	}
	
	const [mime] = contentType.split('/');

	if (mime === 'video') {
		return true;
	}

	return false;
};

export const isPDFContent = (contentType: string) => {
	const [mime, type] = contentType.split('/');

	if (mime === 'application' && type === 'pdf') {
		return true;
	}

	return false;
};
