import React from 'react';
import {type TResource} from 'types/resource';
import {extractString} from 'utils/parseScript';
import {Box} from '@mantine/core';
import {ParseContent} from './ParseContent';

type CodeSnippetType = {
	resource: TResource;
};

const CodeSnippet: React.FC<CodeSnippetType> = React.memo(({resource}) => {
	const snippet = extractString(resource.hubspotEmbed as {raw: string});

	return (
		<Box mt={30}>
			<ParseContent content={snippet} />
		</Box>
	);
});

export default CodeSnippet;
