export const isVideoContent = (contentType: string) => {
	const [mime] = contentType.split('/');

	if (mime === 'video') {
		return true;
	}

	return false;
};
