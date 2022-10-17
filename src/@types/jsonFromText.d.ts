declare module 'json-from-text' {
	import * as jsonFromText from 'json-from-text';

	type TResult = {
		fullResults: any[];
		jsonResults: any[];
		textResults: any[];
	};

	export default function jsonFromText(mixedString: string): TResult;
}
