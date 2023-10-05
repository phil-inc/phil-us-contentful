import dotenv from 'dotenv';
import adapter from 'gatsby-adapter-netlify';
import fs from 'fs';
import path from 'path';
import { GatsbyConfig } from 'gatsby';

// load .environment variables
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

// source base
const srcDirs = fs.readdirSync(path.resolve(__dirname, 'src'));

// Add index signature to rootDirsConfig object
interface RootDirsConfig {
  [key: string]: string;
}

const rootDirsConfig: RootDirsConfig = {};



srcDirs.forEach((srcDir: string) => {
  rootDirsConfig[srcDir] = path.resolve(__dirname, 'src', srcDir);
});


// Handle plugins
const config: GatsbyConfig = {
  trailingSlash: 'always',
  siteMetadata: {
    siteUrl: `https://phil.us`,
  },
 adapter: adapter(),
  plugins: [
    `gatsby-plugin-netlify`,
    'gatsby-plugin-mantine',
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-inline-svg`,
    {
      resolve: `gatsby-plugin-advanced-sitemap-patch`,
      options: {
        exclude: [`/dev-404-page`, `/dev-404-page/`, `/404`, `/404/`, `/404.html`, `/field`],
        createLinkInHead: true,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100,
        },
        defaultQuality: 100,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: rootDirsConfig,
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENVIRONMENT,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-hubspot',
      options: {
        trackingCode: '20880193',
        respectDNT: false,
        productionOnly: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ['UA-71509531-1', 'AW-10844415925', 'G-0D2JJPD1QY'],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://phil.us',
        sitemap: 'https://phil.us/sitemap.xml',
        resolveEnv: () => process.env.NODE_ENV,
        env: {
          development: {
            policy: [{userAgent: '*', disallow: ['/']}],
          },
          production: {
            policy: [{userAgent: '*', allow: '/'}],
          },
        },
      },
    },
  ],
};

export default config;
