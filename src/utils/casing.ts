export function toTitleCase(str: string) {
	const avoidList = new Set(['in', 'the', 'on', 'at', 'by', 'of', 'and', 'or', 'for', 'to', 'nor', 'a', 'an']);

	// Function to convert a single segment to title case
	const convertSegment = (segment: string) =>
		segment.replace(/\w\S*/g, (txt: string) => {
			const [firstLetter, ...remainingLetters] = Array.from<string>(txt);

			// Check if the word is in the 'avoid' list
			if (avoidList.has(txt.toLowerCase())) {
				return txt.toLowerCase();
			}

			// Check if the word has uppercase characters that are not the first character
			const hasInnerCaps = /[A-Z]/.test(remainingLetters.join(''));

			// Count the number of uppercase characters in the word
			const upperCaseCount = [...txt].filter(letter => letter === letter.toUpperCase()).length;

			// If the word has inner caps or the majority of characters are uppercase, return the word as-is
			if (hasInnerCaps || upperCaseCount > txt.length / 2) {
				return txt;
			}

			// Otherwise, convert to title case
			return `${firstLetter.toUpperCase()}${remainingLetters.join('').toLowerCase()}`;
		});

	// Split the string into segments based on quotes
	const segments = str.split(/(['"‘’])/);

	// Apply the title case conversion only to segments not within quotes
	let insideQuotes = false;
	return segments
		.map((segment, index) => {
			if (['\'', '"', '‘', '’'].includes(segment)) {
				insideQuotes = !insideQuotes;
				return segment;
			}

			return insideQuotes ? segment : convertSegment(segment);
		})
		.join('');
}
