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
	plugins: [
		'gatsby-plugin-mantine',
		`gatsby-plugin-image`,
		{
			resolve: 'gatsby-plugin-root-import',
			options: rootDirsConfig,
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.SPACE_ID,
				accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
			},
		},
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				implementation: require('node-sass'),
			},
		},
	],
};
