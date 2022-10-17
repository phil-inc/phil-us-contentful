import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {Options} from '@contentful/rich-text-react-renderer';
import {BLOCKS} from '@contentful/rich-text-types';
import type {BodyType} from 'types/section';
import jsonFromText from 'json-from-text';

/**
 * Parse a rich text field for json from mixed string.
 * @param richScript Rich text body
 * @returns parsed json from rich text
 */
export const parseScript = (richScript: BodyType) => {
	let formString: string;

	const options: Options = {
		renderNode: {
			[BLOCKS.PARAGRAPH](node, children) {
				formString = children[0] as string;
				return children;
			},
		},
	};

	renderRichText(richScript, options);

	return jsonFromText(formString);
};
