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
				spaceId: "2h91ja0efsni",
				accessToken: "CFPAT-gmpivhof0VmKsTaZcjGYU-LGDtVZF3AkZEndUFh6OBI",
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
