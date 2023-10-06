import type { GatsbyNode } from 'gatsby';
import GenerateMainPages from './src/strategies/GenerateMainPages';
import GenerateStaticPages from './src/strategies/GenerateStaticPages';
import GenerateDownloadableResourcePages from './src/strategies/GenerateDownloadableResourcePages';
import GenerateEventRegistrationPages from './src/strategies/GenerateEventRegistrationPages';

export const createPages: GatsbyNode['createPages'] = async function ({ actions, graphql }) {
    const [resourceSubPages] = await Promise.all([
		        new Promise(resolve => GenerateMainPages({ actions, graphql }, resolve)),
        GenerateStaticPages({ actions, graphql }),
        GenerateDownloadableResourcePages({ actions, graphql }),
        GenerateEventRegistrationPages({ actions, graphql }),
    ]);


    // TODO: Refactor
    // create redirects for /resources page to the first sub page of resource
    const { createRedirect } = actions;

    // You might need to adjust this part based on how you've refactored your code to gather resourceSubPages
    const [firstSubPage] = resourceSubPages as string[];

    let redirectPath = '/';
    if (firstSubPage) {
        redirectPath = '/resources/' + firstSubPage + redirectPath;
    }

    createRedirect({
        fromPath: '/resources/',
        toPath: redirectPath,
        isPermanent: true,
    });

    createRedirect({
        fromPath: '/resources',
        toPath: redirectPath,
        isPermanent: true,
    });
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, loaders, stage }) => {
    if (stage === 'build-html' || stage === 'develop-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /react-pdf/,
                        use: loaders.null(),
                    },
                    {
                        test: /pdfjs-dist/,
                        use: loaders.null(),
                    },
                    {
                        test: /safer-buffer/,
                        use: loaders.null(),
                    },
                    {
                        test: /canvas/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }
};

