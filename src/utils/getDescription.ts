import {documentToPlainTextString} from '@contentful/rich-text-plain-text-renderer';
import type {Document} from '@contentful/rich-text-types';

/**

Given a raw rich text field, this function extracts the first three sentences as a plain text string.

@param {string} rawRichTextField - The raw rich text field to extract the description from.

@return {string} - The first three sentences of the rich text field as a plain text string.
*/
export const getDescriptionFromRichtext = (rawRichTextField: string): string => {
	const document: Document = JSON.parse(rawRichTextField) as Document;

	const plainText = documentToPlainTextString(document);
	const re = /[.!?]\s/g;
	const sentences = plainText.split(re);
	const firstThreeSentences = sentences.slice(0, 3).join('. ');

	return firstThreeSentences;
};
