import React from 'react';
import parse from 'html-react-parser';
import {sanitize} from 'isomorphic-dompurify';

type ParseContentProps = {content?: string | undefined};

export const ParseContent: React.FC<ParseContentProps> = ({content}) => {
	React.useEffect(() => {
		const ref = document.getElementById('phil-trustpilot-identifier');
		// If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
		// If it's not, it means the script you pasted into <head /> isn't loaded  just yet.
		// When it is, it will automatically load the TrustBox.
		if (ref && window.Trustpilot) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			window.Trustpilot.loadFromElement(ref, true);
		}
	}, []);

	return <div>{content && parse(sanitize(content))}</div>;
};
