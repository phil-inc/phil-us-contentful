declare module 'extract-json-from-string' {
	import * as extractJson from 'extract-json-from-string';

	type TResponse = {
		portalId: string;
		formId: string;
		region?: string;
	};

	/**
	 * ExtractJson extracts json from mixed string.
	 * @param mixedString string to extract json from
	 */
	export default function extractJson(mixedString: string): TResponse[];
}
