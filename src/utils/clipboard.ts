import {getWindowProperty} from './getWindowProperty';

const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error: unknown) {
		return false;
	}
};

export const copyLocationToClipboard = async () => {
	const url = getWindowProperty('location.href', '#');

	await copyToClipboard(url);
};