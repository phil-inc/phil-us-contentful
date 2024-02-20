import React from 'react';
import {type TResource} from 'types/resource';
import {extractString, parseScript} from 'utils/parseScript';
import {ParseContent} from './ParseContent';
import HubspotForm from '../HubspotForm/HubspotForm';

import * as classes from './codeSnippet.module.css';
import {Box, Divider, Group, Title} from '@mantine/core';

type CodeSnippetType = {
	resource: TResource;
};

const CodeSnippet: React.FC<CodeSnippetType> = React.memo(({resource}) => {
	let snippet = '';
	const media = resource?.media;

	const isNewsletterComponent = resource.metadata?.tags.some(tag => tag.name === 'Newsletter Component');

	// TODO: resource can be mediaitem
	if (isNewsletterComponent && resource?.embedCode) {
		const [formProps] = parseScript(resource.embedCode);

		const {formId} = formProps;
		const {portalId} = formProps;

		return (
			<>
				<Box className={classes.box} mb={80}>
					<Title order={2} size={'28px'}>
						Get latest updates
					</Title>
					<HubspotForm formId={formId} portalId={portalId} classname={classes.newsletter} />
				</Box>
			</>
		);
	}

	// TODO: Handle this better
	if (resource?.sys?.contentType?.sys?.id === 'mediaItem') {
		snippet = extractString(resource?.embedCode);
	} else if (media?.emdedForm && media.emdedForm.raw !== '') {
		snippet = extractString(media.emdedForm as {raw: string});
	} else {
		snippet = extractString(resource.body as {raw: string});
	}

	return <ParseContent content={snippet} />;
});

export default CodeSnippet;
