import React from 'react';
import {type TResource} from 'types/resource';
import {extractString} from 'utils/parseScript';
import DOMPurify from 'dompurify';
import {Box} from '@mantine/core';

type CodeSnippetType = {
	resource: TResource;
};

const CodeSnippet: React.FC<CodeSnippetType> = React.memo(({resource}) => {
	const snippet = extractString(resource.hubspotEmbed as {raw: string});
	const cleaned = DOMPurify.sanitize(snippet);

	return (
		<Box
			mt={30}
			dangerouslySetInnerHTML={{
				__html: cleaned,
			}}
		></Box>
	);
});

export default CodeSnippet;
