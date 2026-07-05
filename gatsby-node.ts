import type { GatsbyNode } from 'gatsby';
import GenerateMainPages from './src/strategies/GenerateMainPages';
import GenerateStaticPages from './src/strategies/GenerateStaticPages';
import GenerateDownloadableResourcePages from './src/strategies/GenerateDownloadableResourcePages';
import GenerateEventRegistrationPages from './src/strategies/GenerateEventRegistrationPages';
import GenerateCaseStudyPages from './src/strategies/GenerateCaseStudyPages';

import {RedirectConfig, RedirectFactory} from './src/factories/redirectFactory';

// redirect configurations
const redirectConfigurations: Record<string, RedirectConfig> = {
    insights: {
        fromPaths: ['/insights/', '/insights'],
        toPath: (subPages: string[]) => {
            const [firstSubPage] = subPages;
            let redirectPath = '/';
            if (firstSubPage) {
                redirectPath = '/insights/' + firstSubPage + redirectPath;
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
        GenerateStaticPages({ actions, graphql }),
        GenerateDownloadableResourcePages({ actions, graphql }),
        GenerateEventRegistrationPages({ actions, graphql }),
        GenerateCaseStudyPages({ actions, graphql })
    ]);

    // Handle redirects
    const redirectFactory = new RedirectFactory(actions, redirectConfigurations);
    redirectFactory.createRedirects(resourceSubPages as string[]);
};


// Gatsby onCreateWebpackConfig API
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, loaders, stage }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@addyi': require('path').resolve(__dirname, 'src/pages/addyi'),
            },
        },
    });

    if (stage === 'build-html' || stage === 'develop-html') {
        actions.setWebpackConfig({
            // `undici` (pulled in via isomorphic-dompurify -> jsdom) references
            // several Node built-ins through the `node:` scheme (e.g. node:sqlite,
            // node:worker_threads, node:zlib). Webpack cannot resolve the `node:`
            // scheme and fails the SSR bundle. Since these are Node built-ins that
            // should never be bundled, externalize the whole scheme for the node
            // (SSR) build.
            externals: [
                ({ request }: { request?: string }, callback: (err?: Error | null, result?: string) => void) => {
                    if (request?.startsWith('node:')) {
                        return callback(null, 'commonjs ' + request);
                    }
                    return callback();
                },
            ],
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

