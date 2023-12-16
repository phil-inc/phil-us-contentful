import React from 'react';

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
