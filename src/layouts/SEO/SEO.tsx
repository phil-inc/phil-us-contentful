import React from 'react';

type SEOProps = {
	title: string;
	children?: React.ReactNode;
};

type HeadProps = SEOProps;

const SEO: React.FC<SEOProps> = ({title, children}) => (
	<>
		<title>{title}</title>
		{children}
	</>
);

export const Head: React.FC<HeadProps> = ({title, children}) => <SEO title={title}>{children}</SEO>;
