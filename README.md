# Phil.us marketing website
This is the repo for phil marketing website hosted at [phil.us](https://phil.us)
The project uses Gatsby for SSG and Contentful as headless CMS.
The project uses [Mantine](https://mantine.dev) as UI library.  

## yarn scripts
- `yarn install` – install required packages
- `yarn start` – start project locally in development environment
- `yarn build` – export project for production
- `yarn serve` – serve production build locally

## Development Notes

- Ensure the `.env.development` file is correctly configured with the appropriate Contentful credentials.
- For production builds, use the `.env.production` file with production-specific credentials.

The project requires the following environment variables to be set:

- `CONTENTFUL_ACCESS_TOKEN`: Access token for Contentful API.
- `CONTENTFUL_SPACE_ID`: Space ID for Contentful.
- `CONTENTFUL_ENVIRONMENT`: Environment name in Contentful.

## Contentful Notes 

- When there is changes in the contentful, please run `yarn clean` to get the lastest clean data from contentful.


