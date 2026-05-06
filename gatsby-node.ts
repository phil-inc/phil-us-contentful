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
                // undici (Gatsby dep) statically references node:sqlite (Node 22+ only).
                // Webpack can't resolve node: URI scheme in browser bundles on Node ≤18.
                // Map to false = empty module for ALL build stages.
                'node:sqlite': false,
            },
        },
    });

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
                    {
                        // isomorphic-dompurify → jsdom → webidl-conversions crashes on Node ≤18
                        // (ArrayBuffer.prototype.resizable is Node 20+ only).
                        // Null it out in SSR; sanitization runs client-side in the browser.
                        test: /isomorphic-dompurify/,
                        use: loaders.null(),
                    },
                ],
            },
        });

        // undici statically references node:sqlite (Node 22+ only) in its runtime-features
        // module. Mark all node: built-ins as external so webpack doesn't try to bundle them.
        // At runtime undici wraps the require in try/catch and fails gracefully on Node 18.
        actions.setWebpackConfig({
            externalsPresets: { node: true },
        });
    }
};

