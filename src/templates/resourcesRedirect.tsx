import React from 'react';
import {navigate} from 'gatsby';

type ResourcesRedirectType = {
	pageContext: {
		redirectPath: string;
	};
};

const ResourcesRedirect: React.FC<ResourcesRedirectType> = ({pageContext}) => {
	const {redirectPath} = pageContext;

	React.useEffect(() => {
		if (redirectPath) {
			void navigate(redirectPath);
		}
	}, [redirectPath]);

	return null;
};

export default ResourcesRedirect;
