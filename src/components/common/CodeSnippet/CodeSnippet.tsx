import React from 'react';
import {type TResource} from 'types/resource';
import {extractString} from 'utils/parseScript';
import {Box} from '@mantine/core';
import {ParseContent} from './ParseContent';

type CodeSnippetType = {
	resource: TResource;
};

const CodeSnippet: React.FC<CodeSnippetType> = React.memo(({resource}) => {
	let snippet = '';
	const media = resource?.media;

	if (media?.emdedForm && media.emdedForm.raw !== '') {
		snippet = extractString(media.emdedForm as {raw: string});
	} else {
		snippet = extractString(resource.body as {raw: string});
	}

	return <ParseContent content={snippet} />;
});

export default CodeSnippet;
