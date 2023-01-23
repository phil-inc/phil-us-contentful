import {ESocialShare} from 'types/social';
import {getWindowProperty} from './getWindowProperty';

/**
@function getShareLink - Generate share links to be used as href.
@param {ESocialShare} type - type of social share.
@returns {string} - returns the share link of the specified social media.
*/
export const getShareLink = (type: ESocialShare) => {
	let shareLink: string;
	const url = getWindowProperty('location.href', '#');
	const domain = getWindowProperty('location.hostname', 'phil.us');

	switch (type) {
		case ESocialShare.Facebook:
			shareLink = `https://facebook.com/sharer/sharer.php?u=${url}`;
			break;

		case ESocialShare.Twitter:
			shareLink = `https://twitter.com/intent/tweet?text=${url}`;
			break;

		case ESocialShare.Linkedin:
			shareLink = `http://www.linkedin.com/shareArticle?mini=true&url=${url}&source=${domain}`;
			break;

		case ESocialShare.CopyLink:
			shareLink = url;
			break;

		default:
			break;
	}

	return shareLink;
};
