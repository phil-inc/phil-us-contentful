import React from 'react';
import {navigate} from 'gatsby';

// This page is here because we need to navigate to /white-papers/
// when we select navigation to Resources page from contentful
const Resources: React.FC = () => {
	React.useEffect(() => {
		void navigate('/resources/white-papers/');
	}, []);

	return null;
};

export default Resources;
