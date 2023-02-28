// Import jsonFromText from 'json-from-text';
import {documentToPlainTextString} from '@contentful/rich-text-plain-text-renderer';
import type {TResponse} from 'extract-json-from-string';
import extractJson from 'extract-json-from-string';
import {type Block, type Inline} from '@contentful/rich-text-types';

/**
 * Parse a rich text field for json from mixed string.
 * @param richScript Rich text body
 * @returns parsed json from rich text
 */
export const parseScript = (richScript: {raw: string}): TResponse[] => {
	const doc: unknown = JSON.parse(richScript.raw);

	const formString = documentToPlainTextString(doc as Block | Inline);

	return extractJson(formString);
};
