# RADAR Launch frontend

Built with Next.js, Privy, tailwindcss, and wagmi

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

## TODO

- Tidy up file structure
- Remove devlink global.css
- Refactoring work
  - toast contract behaviour
  - Make components more atomic, less reliant on user-related hooks
