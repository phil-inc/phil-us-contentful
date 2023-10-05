import {graphql, useStaticQuery} from 'gatsby';

type PageProps = {
	pages: {
		nodes: Array<{path: string; pageContext: {id: string}}>;
	};
};

type PathResponse = {
	path: string;
	id: string;
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

	return pages.nodes.map(node => ({path: node.path, id: node.pageContext.id}));
};
