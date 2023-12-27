import type { GatsbyNode } from 'gatsby';
import GenerateMainPages from './src/strategies/GenerateMainPages';
import GenerateStaticPages from './src/strategies/GenerateStaticPages';
import GenerateDownloadableResourcePages from './src/strategies/GenerateDownloadableResourcePages';
import GenerateEventRegistrationPages from './src/strategies/GenerateEventRegistrationPages';
import {RedirectConfig, RedirectFactory} from './src/factories/redirectFactory';

// redirect configurations
const redirectConfigurations: Record<string, RedirectConfig> = {
    resources: {
        fromPaths: ['/resources/', '/resources'],
        toPath: (subPages: string[]) => {
            const [firstSubPage] = subPages;
            let redirectPath = '/';
            if (firstSubPage) {
                redirectPath = '/resources/' + firstSubPage + redirectPath;
            }
            return redirectPath;
        }
    },
};

// Gatsby createPages API
export const createPages: GatsbyNode['createPages'] = async function ({ actions, graphql }) {

    // Handle static html creation
    const [resourceSubPages] = await Promise.all([
        new Promise(resolve => GenerateMainPages({ actions, graphql }, resolve)),
        // GenerateStaticPages({ actions, graphql }),
        // GenerateDownloadableResourcePages({ actions, graphql }),
        // GenerateEventRegistrationPages({ actions, graphql }),
    ]);

    // Handle redirects
    const redirectFactory = new RedirectFactory(actions, redirectConfigurations);
    redirectFactory.createRedirects(resourceSubPages as string[]);
};


// Gatsby onCreateWebpackConfig API
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

