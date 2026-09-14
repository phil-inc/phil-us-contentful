import type { GatsbyNode } from 'gatsby';
import { rm, writeFile } from 'fs/promises';
import * as path from 'path';
import { buildLlmsFull } from './src/utils/llmsFull';
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

// Gatsby onPostBuild API
// Writes llms-full.txt from the HTML this build just rendered (MRTG-1425).
// A failure is logged rather than thrown so it never blocks a site deploy, and
// any copy left in public/ by an earlier build is removed so it can't go stale.
export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ reporter }) => {
    const publicDir = path.join(process.cwd(), 'public');
    const target = path.join(publicDir, 'llms-full.txt');

    try {
        const { text, counts } = await buildLlmsFull(publicDir);
        await writeFile(target, text);
        reporter.info(
            `llms-full.txt: ${counts.included} pages included; skipped ${counts.noindex} noindex, ` +
                `${counts.excluded} excluded, ${counts.empty} empty`
        );
    } catch (error) {
        await rm(target, { force: true });
        reporter.warn(`llms-full.txt was not generated: ${error instanceof Error ? error.message : error}`);
    }
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

