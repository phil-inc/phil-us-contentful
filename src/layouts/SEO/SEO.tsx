import {Script} from 'gatsby';
import React from 'react';
import {isProduction} from 'utils/isProduction';

type SEOProps = {
	title: string;
	children?: React.ReactNode;
};

export const SEO: React.FC<SEOProps> = ({title, children}) => (
	<>
		<title>{title}</title>
		{children}
	</>
);
