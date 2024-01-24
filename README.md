# RADAR Launch frontend

## Getting Started

1. Install dependencies

```bash
yarn install
```

2. Update .env file with your own values (see [environment variables below](#environment-variables) for more information)

```bash
cp .env.example .env
```

3. Start the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

| Variable | Description | Default |
| -------- | ----------- | ------- |
| VITE_INFURA_KEY | Infura API key for RPC with wagmi | |
| BACKEND_URL | Backend endpoint | <https://api.radardao.xyz/launch> |
| TINYMCE_API_KEY | TinyMCE API key for input fields | |
| LIVEPEER_API_KEY | Livepeer API key for uploading livepeer videos | |
| NEXT_PUBLIC_PRIVY_APP_ID | Privy API key for wallet | |
| GRAPHQL_ENDPOINT | TheGraph API endpoint for retrieving events | <https://api.studio.thegraph.com/query/54950/radar-launch/v0.0.2> |
| WHITELISTED_ADDRESSES | Whitelisted addresses with admin view of certain pages | |
| FEATURED_PROJECT_ID | ID of the featured project | |
| ALCHEMY_API_KEY | Alchemy API key for querying Alchemy | |
| PAPER_API_KEY | Paper API key used for fiat / crypto checkouts | |
| DEVLINK_AUTH_TOKEN | Devlink Auth token used to convert Webflow components | |

## Architecture

```sh
root
├───abi           # contains ABI files of contracts
├───components
│   ├───XXXPage   # contains components used in XXXPage
│   ├───Layout    # contains components used in overall layout of the site
│   ├───Providers # contains React providers used in the site
│   └───ui        # contains reusable UI components
├───constants     # contains constants used in the site
├───devlink       # contains devlink components converted from Webflow, should be removed in the future
├───hooks         # contains custom hooks used in the site
├───lib           # contains general functions used in the site
├───pages
│   ├───api       # contains API endpoints
│   └───XXX       # contains XXX page
├───public        # contains public assets
├───styles        # contains global styles
└───types         # contains types used in the site
```

Built with Next.js, Privy, tailwindcss, and wagmi

## TODO

- Tidy up file structure
- Remove devlink global.css
- Refactoring work
  - toast contract behaviour
  - Make components more atomic, less reliant on user-related hooks
