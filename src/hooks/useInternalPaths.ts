import {graphql, useStaticQuery} from 'gatsby';

type PageProps = {
	pages: {
		nodes: Array<{path: string; pageContext: {title: string}}>;
	};
};

type PathResponse = {
	path: string;
	title: string;
};

export const useInternalPaths = (): PathResponse[] => {
	const {pages}: PageProps = useStaticQuery(graphql`
		{
			pages: allSitePage {
				nodes {
					path
					pageContext
				}
			}
		}
	`);

	return pages.nodes.map(node => ({path: node.path, title: node.pageContext.title}));
};
