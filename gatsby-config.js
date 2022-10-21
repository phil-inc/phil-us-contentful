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
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: 'gatsby-plugin-root-import',
			options: rootDirsConfig,
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: "1pss2or4ofp6",
				accessToken: "88s2VJPynpYJm5wtB5oRwE_eBc2nT-t_rHXn37oNUJA",
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
	],
};
