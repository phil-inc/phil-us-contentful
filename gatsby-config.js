// Load env variables
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});

// Source base
const fs = require('fs');
const path = require('path');

const srcDirs = fs.readdirSync(path.resolve(__dirname, 'src'));

const rootDirsConfig = {};

srcDirs.forEach(srcDir => {
	rootDirsConfig[srcDir] = path.resolve(__dirname, 'src', srcDir);
});

// Handle plugins
module.exports = {
	siteMetadata: {
		siteUrl: `https://www.phil.us`,
	  },
	plugins: [
		'gatsby-plugin-mantine',
		`gatsby-plugin-image`,
		`gatsby-transformer-sharp`,
		`gatsby-transformer-inline-svg`,
		`gatsby-plugin-advanced-sitemap`,
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
			  defaults: {
				quality: 100,
			  },
			  defaultQuality: 100,
			}
		  },
		{
			resolve: 'gatsby-plugin-root-import',
			options: rootDirsConfig,
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.SPACE_ID,
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
			resolve: "gatsby-plugin-hubspot",
			options: {
			  trackingCode: "20880193",
			  respectDNT: false,
			  productionOnly: true,
			},
		  },
		  {
			resolve: `gatsby-plugin-google-gtag`,
			options: {
			  // You can add multiple tracking ids and a pageview event will be fired for all of them.
			  trackingIds: [
				"UA-71509531-1",
				"AW-10844415925"
			],
			  // This object is used for configuration specific to this plugin
			  pluginConfig: {
				// Puts tracking script in the head instead of the body
				head: true,
			  },
			},
		  },
	],
};
