export function headingToTitleCase(str: string) {
	const avoidList = new Set([
		'in',
		'the',
		'on',
		'at',
		'by',
		'of',
		'and',
		'or',
		'for',
		'to',
		'nor',
		'a',
		'an',
		'as',
		'are',
		'be',
	]);

	let isFirstWord = true; // Flag to identify the first word in the entire string
	let insideQuotes = false; // Flag to identify if we are inside quotes

	return str.replace(/\w\S*|['"‘’]/g, (txt, index: number, fullText: string) => {
		if (['\'', '"', '‘', '’'].includes(txt)) {
			// Toggle insideQuotes flag only if there's a matching quote later in the string
			const remainingText = fullText.slice(index + 1);
			if (remainingText.includes(txt)) {
				insideQuotes = !insideQuotes;
			}

			return txt;
		}

		if (insideQuotes) {
			// Skip title-casing for text inside quotes
			return txt;
		}

		const [firstLetter, ...remainingLetters] = Array.from(txt);
		const upperCaseCount = [...txt].filter(letter => letter === letter.toUpperCase()).length;

		if (isFirstWord) {
			isFirstWord = false; // Reset the flag
			if (upperCaseCount <= txt.length / 2) {
				return `${firstLetter.toUpperCase()}${remainingLetters.join('').toLowerCase()}`;
			}

			return txt;
		}

		if (avoidList.has(txt.toLowerCase())) {
			return txt.toLowerCase();
		}

		const hasInnerCaps = /[A-Z]/.test(remainingLetters.join(''));

		if (hasInnerCaps || upperCaseCount > txt.length / 2) {
			return txt;
		}

		return `${firstLetter.toUpperCase()}${remainingLetters.join('').toLowerCase()}`;
	});
}
